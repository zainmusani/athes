import {
  CREATE_NEW_GROUP,
  GET_CHAT_CONTACTS_LIST,
  GET_RECENT_CHAT_LISTING,
  GET_ROOM_CHAT,
  ON_CHAT_MESSAGE_RECIEVE,
  SAVE_LAST_MSG_UNIX_TIME_OF_EACH_ROOM,
  SEARCH_CONTACTS_LIST,
  SEND_CHAT_MESSAGE,
  SET_CURRENT_ACTIVE_ROOM_ID,
  SOCKET_KEY,
} from './ActionTypes';

export function saveSocketKeyIntoReducer(socket) {
  return {
    type: SOCKET_KEY,
    data: socket,
  };
}

export function getRecentChatListRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_RECENT_CHAT_LISTING.REQUEST,
  };
}

export function getRecentChatListSuccess(data) {
  return {
    data,
    type: GET_RECENT_CHAT_LISTING.SUCCESS,
  };
}

export function getChatContactsList(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_CHAT_CONTACTS_LIST.REQUEST,
  };
}

export function getChatContactsListSuccess(data) {
  return {
    data,
    type: GET_CHAT_CONTACTS_LIST.SUCCESS,
  };
}

export function getSearchChatContactsListRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: SEARCH_CONTACTS_LIST.REQUEST,
  };
}

export function getSearchContactsListSuccess(data) {
  return {
    data,
    type: SEARCH_CONTACTS_LIST.SUCCESS,
  };
}

export function getRoomChatRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_ROOM_CHAT.REQUEST,
  };
}

export function getRoomChatSuccess(data) {
  return {
    data,
    type: GET_ROOM_CHAT.SUCCESS,
  };
}

export function createNewChatGroupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_NEW_GROUP.REQUEST,
  };
}

export function createNewChatGroupSuccess(data) {
  return {
    data,
    type: CREATE_NEW_GROUP.SUCCESS,
  };
}

export function onChatMessageReceiveAction(data) {
  return {
    data,
    type: ON_CHAT_MESSAGE_RECIEVE,
  };
}

export function onSendChatMessageAction(data) {
  return {
    data,
    type: SEND_CHAT_MESSAGE,
  };
}

export function saveLastFetchedUnixTimeOfEachRoom(data) {
  return {
    data,
    type: SAVE_LAST_MSG_UNIX_TIME_OF_EACH_ROOM,
  };
}

export function setCurrentActiveRoomID(data) {
  return {
    data,
    type: SET_CURRENT_ACTIVE_ROOM_ID,
  };
}
