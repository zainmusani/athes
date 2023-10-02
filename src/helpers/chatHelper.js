import {
  createNewChatGroupSuccess,
  onChatMessageReceiveAction,
  saveSocketKeyIntoReducer,
} from '../actions/ChatActions';
import {CHAT_BASE_URL, PROJECT_TOKEN} from '../config/WebService';
import {EMIT_TO_SERVER_TYPES, LISTEN_FROM_SERVER_TYPES} from '../constants';
import DataHandler from '../services/DataHandler';
import util from '../util';
import SocketIOClient from 'socket.io-client';

let socket = {};

export const connectSocket = () => {
  socket = DataHandler.getStore().getState().chat?.socketKey;
  const {
    AUTHENTICATED,
    CONNECT,
    DISCONNECT,
    RECEIVE_MESSAGE,
    ROOM_CREATED,
    PONG,
  } = LISTEN_FROM_SERVER_TYPES;

  const {access_token} = DataHandler.getStore().getState().user?.data;

  if (!socket.connected) {
    socket = SocketIOClient(CHAT_BASE_URL, {
      query: 'token=' + PROJECT_TOKEN + `&user=${access_token}`,
      transports: ['websocket'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity,
    });

    socket.on(CONNECT, () => {
      setSocketKeyIntoReducer(socket);
      emitToServer(EMIT_TO_SERVER_TYPES.PING);
    });

    socket.on(AUTHENTICATED, function (token, rooms) {
      const {JOIN_ROOM} = EMIT_TO_SERVER_TYPES;
      if (!util.isArrayEmpty(rooms)) {
        for (var index = 0; index < rooms.length; index++) {
          emitToServer(JOIN_ROOM, {room_id: rooms[index].id});
        }
      }
    });

    socket.on(DISCONNECT, reason => {
      setSocketKeyIntoReducer({
        disconnect: reason,
        connected: false,
      });
      console.log({DISCONNECT: reason});
    });

    socket.on(RECEIVE_MESSAGE, function (dataObj) {
      console.log({RECEIVE_MESSAGE: dataObj});
      let mObj = manipulateSingleObjOfChat(dataObj);

      const {id: loggedInUserID} = DataHandler.getStore().getState().user?.data;
      const {is_group, recipients = []} = dataObj || {};

      const filteredArr = util.filterArray(
        recipients,
        item => item.user_id != loggedInUserID,
      );

      if (!is_group && !util.isArrayEmpty(filteredArr)) {
        const {name, image} = filteredArr[0] || {};
        mObj['name'] = name;
        mObj['image'] = image;
      }

      DataHandler.getStore().dispatch(onChatMessageReceiveAction(mObj));
    });

    socket.on(ROOM_CREATED, function (dataObj) {
      console.log({ROOM_CREATED: dataObj});
      createNewChatGroupSuccess(manipulateSingleObjOfChat(dataObj));
    });

    socket.on(PONG, function (dataObj) {
      // console.log({PONGPONGPONGPONGPONG: dataObj});
    });
  }
};

export const emitToServer = (type, data = {}) => {
  const {
    SEND_MESSAGE,
    CREATE_GROUP_ROOM,
    JOIN_ROOM,
    OFFLINE_USER,
    ROOM_CREATED,
    PING,
  } = EMIT_TO_SERVER_TYPES;
  const {access_token} = DataHandler.getStore().getState().user?.data;
  const mData = {
    access_token,
    ...data,
  };
  switch (type) {
    case SEND_MESSAGE: {
      socket.emit(SEND_MESSAGE, mData, (err, data) => {
        console.log({SEND_MESSAGE: data});
      });
      break;
    }
    case CREATE_GROUP_ROOM: {
      socket.emit(CREATE_GROUP_ROOM, mData, (err, data) => {});
      break;
    }
    case JOIN_ROOM: {
      socket.emit(JOIN_ROOM, mData, (err, data) => {});
      break;
    }
    case ROOM_CREATED: {
      console.log({ROOMCREATED: mData});
      socket.emit(ROOM_CREATED, mData, (err, data) => {});
      break;
    }
    case PING: {
      setInterval(() => {
        // console.log({PINGPINGPINGPING: socket.id});
        socket.emit(PING, new Date());
      }, 5000);
      break;
    }
    case OFFLINE_USER: {
      socket.emit(OFFLINE_USER, mData, (err, data) => {});
      break;
    }
  }
};

export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};

const setSocketKeyIntoReducer = socket => {
  DataHandler.getStore().dispatch(saveSocketKeyIntoReducer({socket}));
};

export const manipulateRecentChatListingData = data => {
  let recentChatListing = [];
  data.map(item => {
    const manipulatedItem = manipulateSingleObjOfChat(item);
    recentChatListing.push(manipulatedItem);
  });
  return recentChatListing;
};

export const manipulateChatContactsList = data => {
  if (util.isArrayEmpty(data)) return [];

  let mcontactList = [];
  data.map(item => {
    const {id, name, image} = item;
    let mContact = {};

    mContact.id = id;
    mContact.name = name;
    mContact.image = image;

    mcontactList.push(mContact);
  });
  return mcontactList;
};

export const manipulateRoomChatListing = data => {
  const {room_id, chats} = data;
  const chatListObjectsClone =
    DataHandler.getStore().getState().chat.chatMessages;
  let mObj = {};
  if (util.hasObjectWithKey(chatListObjectsClone, room_id)) {
    // if key already exists (i.e. some chat messages of this id are already fetched)
    const mOlderChatsArr = chatListObjectsClone?.[room_id]?.chats ?? [];
    const manipulatedArr = manipulateChatArr(chats, mOlderChatsArr);
    mObj = {
      ...chatListObjectsClone[room_id],
      chats: manipulatedArr,
    };
  } else {
    const chatArr = manipulateChatArr(chats);
    // if no chat messages exists yet
    const mData = manipulateSingleObjOfChat(data);
    mObj['chats'] = chatArr;
    mObj = {
      ...mObj,
      ...mData,
    };
  }
  return mObj;
};

const manipulateChatArr = (newChats, olderChats = []) => {
  const mChatArr = newChats.reverse();
  let mFinalArr = util.cloneDeepArray(olderChats);
  mChatArr.map(item => {
    const {created_at} = item;
    let mSingleObj = {};

    const formattedDate = util.formatDate(created_at + 'Z');

    const mIndex = util.findIndex(mFinalArr, item =>
      util.areValuesEqual(item.title, formattedDate),
    );
    const manipulatedChatObj = manipulateSingleObjOfChat(item);

    if (mIndex != -1) {
      let mExistingObj = util.findDataFromArray(mFinalArr, item =>
        util.areValuesEqual(item.title, formattedDate),
      );

      const index = util.findIndexById(
        mExistingObj.data,
        manipulatedChatObj.id,
      );
      // if not found
      if (index == -1) {
        mExistingObj['data'] = [...mExistingObj.data, manipulatedChatObj];
        mFinalArr[mIndex] = mExistingObj;
      }
    } else {
      mSingleObj['title'] = formattedDate;
      mSingleObj['data'] = [manipulatedChatObj];
      mFinalArr.push(mSingleObj);
    }
  });
  return mFinalArr;
};

export const manipulateSingleObjOfChat = item => {
  const {id: loggedInUserID} = DataHandler.getStore().getState().user?.data;
  const {
    id,
    created_at,
    name,
    image = null,
    is_my_message,
    message,
    disable_chat_for_all_members,
    is_private_member,
    is_group,
    room_id,
    created_by,
    sender_id,
    message_author_details,
    sender_name,
    user_id,
    created_at_unix,
    firestoreRoomId,
    role_id,
  } = item || {};
  let mObj = {};
  
  const {
    id: msgAuthorID,
    name: msgAuthorName,
    image: msgAuthorImage,
  } = message_author_details || {};

  const msgAuthorDetails = {
    id: msgAuthorID,
    name: msgAuthorName,
    image: msgAuthorImage,
  };

  let mName = name;
  let mImage = image;

  mObj['id'] = id;
  mObj['image'] = mImage;
  mObj['name'] = mName;
  mObj['message'] = message;
  mObj['createdDate'] = created_at + 'Z';
  mObj['createdDateUnix'] = created_at_unix;
  mObj['isMyMsg'] = util.isFieldNil(is_my_message)
    ? loggedInUserID == sender_id
    : is_my_message;
  mObj['isGroup'] = is_group;
  mObj['groupAuthorId'] = created_by;
  mObj['disableChat'] = disable_chat_for_all_members;
  mObj['isPrivateMember'] = is_private_member;
  mObj['roomID'] = room_id;
  mObj['msgAuthorDetails'] = msgAuthorDetails;
  mObj['roleID'] = role_id;
  mObj['senderName'] = sender_name;
  mObj['userID'] = user_id;
  mObj['firestoreRoomId'] = firestoreRoomId;

  return mObj;
};
