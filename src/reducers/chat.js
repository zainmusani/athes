// @flow
import Immutable from 'seamless-immutable';
import {
  CREATE_NEW_GROUP,
  GET_RECENT_CHAT_LISTING,
  GET_ROOM_CHAT,
  ON_CHAT_MESSAGE_RECIEVE,
  SAVE_LAST_MSG_UNIX_TIME_OF_EACH_ROOM,
  SEND_CHAT_MESSAGE,
  SET_CURRENT_ACTIVE_ROOM_ID,
  SOCKET_KEY,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  socketKey: {},
  recentChatListing: [], //store recent chat list data
  chatMessages: {}, //store all messages data by message id(in key value pair)
  unixTimeOfEachRoom: undefined,
  currentActiveRoomID: '',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case SOCKET_KEY: {
      return {...state, socketKey: action.data.socket};
    }
    case ON_CHAT_MESSAGE_RECIEVE: {
      const {recentChatListing, chatMessages} = state;
      let chatMessagesObjClone = util.cloneDeep(chatMessages);
      let recentChatMessagesListClone = util.cloneDeepArray(recentChatListing);

      const mData = action.data;
      const {id, roomID, createdDate} = mData;

      const mFormattedDate = util.formatDate(createdDate);

      if (util.hasObjectWithKey(chatMessagesObjClone, roomID)) {
        let mChatArr = chatMessagesObjClone[roomID]?.chats ?? [];

        const mChatArrIndex = util.findIndex(mChatArr, item =>
          util.areValuesEqual(item.title, mFormattedDate),
        );

        if (mChatArrIndex != -1) {
          // if found
          let isMsgIdAlreadyExists = false;
          if (!util.isArrayEmpty(chatMessagesObjClone[roomID]?.chats ?? [])) {
            isMsgIdAlreadyExists =
              chatMessagesObjClone[roomID]?.chats[mChatArrIndex]?.data[0]
                ?.id === id;
          }
          if (!isMsgIdAlreadyExists) {
            chatMessagesObjClone[roomID].chats[mChatArrIndex].data.unshift(
              mData,
            );
          }
        } else {
          // if not found
          let mDataArr = [];
          mDataArr.push(mData);
          const mObj = {
            title: mFormattedDate,
            data: mDataArr,
          };
          chatMessagesObjClone[roomID].chats.unshift(mObj);
        }
      }

      // set new message in recent messages chat listing
      const mIndex = util.findIndex(
        recentChatMessagesListClone,
        item => item.roomID == roomID,
      );
      if (mIndex != -1) {
        // if found
        recentChatMessagesListClone.splice(mIndex, 1);
      }
      recentChatMessagesListClone.unshift(mData);

      return Immutable.merge(state, {
        chatMessages: chatMessagesObjClone,
        recentChatListing: recentChatMessagesListClone,
      });
    }
    case GET_RECENT_CHAT_LISTING.SUCCESS: {
      const response = action.data;
      const recentChatMessagesListClone = util.cloneDeepArray(
        state.recentChatListing,
      );
      let mData = [];

      mData = [...recentChatMessagesListClone, ...response];

      return Immutable.merge(state, {
        recentChatListing: mData,
      });
    }
    case CREATE_NEW_GROUP.SUCCESS: {
      let recentChatMessagesListArr = util.cloneDeepArray(
        state.recentChatListing,
      );

      recentChatMessagesListArr.unshift(action.data);

      return Immutable.merge(state, {
        recentChatListing: recentChatMessagesListArr,
      });
    }
    case GET_ROOM_CHAT.SUCCESS: {
      const data = action.data;
      let chatMessagesClone = util.cloneDeep(state.chatMessages);
      const {roomID} = data;

      chatMessagesClone[roomID] = data;
      return Immutable.merge(state, {
        chatMessages: chatMessagesClone,
      });
    }
    case SEND_CHAT_MESSAGE: {
      const mData = action.data;
      const {
        id,
        created_at,
        message,
        room_id,
        sender_id,
        sender_name,
        is_my_msg = true,
        image,
      } = mData || {};
      let chatMessagesClone = util.cloneDeep(state.chatMessages);

      if (util.hasObjectWithKey(chatMessagesClone, room_id)) {
        const mFormattedDate = util.formatDate(created_at);
        const mIndex = util.findIndex(chatMessagesClone[room_id].chats, item =>
          util.areValuesEqual(item.title, mFormattedDate),
        );
        const mObj = {
          id: id,
          createdDate: created_at,
          image: image,
          isMyMsg: is_my_msg,
          message: message,
          name: sender_name,
        };

        if (mIndex != -1) {
          chatMessagesClone[room_id].chats[mIndex].data.unshift(mObj);
        }
        console.log({chatMessagesClone, room_id, mIndex, mObj});
      }
      return Immutable.merge(state, {
        chatMessages: chatMessagesClone,
      });
    }

    case SAVE_LAST_MSG_UNIX_TIME_OF_EACH_ROOM: {
      const {roomID, unixTime} = action.data;
      let cloneUnixTimesObj = util.cloneDeep(state.unixTimeOfEachRoom);

      cloneUnixTimesObj = {
        ...cloneUnixTimesObj,
        [roomID]: unixTime,
      };

      return Immutable.merge(state, {
        unixTimeOfEachRoom: cloneUnixTimesObj,
      });
    }
    case SET_CURRENT_ACTIVE_ROOM_ID: {
      return Immutable.merge(state, {
        currentActiveRoomID: action.data,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};
