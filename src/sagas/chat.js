import {take, put, call, fork, takeLatest} from 'redux-saga/effects';
import {
  CREATE_NEW_GROUP,
  GET_CHAT_CONTACTS_LIST,
  GET_RECENT_CHAT_LISTING,
  GET_ROOM_CHAT,
  SEARCH_CONTACTS_LIST,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {
  GET_RECENT_CHAT_LISTING as GET_RECENT_CHAT_LISTING_URL,
  GET_CHAT_CONTACTS_LIST as GET_CHAT_CONTACTS_LIST_URL,
  GET_ROOM_CHAT as GET_ROOM_CHAT_URL,
  CREATE_NEW_GROUP as CREATE_NEW_GROUP_URL,
  callRequest,
  callRequestChat,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import {
  createNewChatGroupSuccess,
  getChatContactsListSuccess,
  getRecentChatListSuccess,
  getRoomChatSuccess,
  getSearchContactsListSuccess,
} from '../actions/ChatActions';
import {
  manipulateChatContactsList,
  manipulateRecentChatListingData,
  manipulateRoomChatListing,
  manipulateSingleObjOfChat,
} from '../helpers/chatHelper';
import Util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getRecentChatList() {
  while (true) {
    const {params, responseCallback} = yield take(
      GET_RECENT_CHAT_LISTING.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_RECENT_CHAT_LISTING_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        const mManipulatedData = manipulateRecentChatListingData(response.data);
        yield put(getRecentChatListSuccess(mManipulatedData));
        if (responseCallback) responseCallback(true, mManipulatedData);
      } else {
        if (responseCallback) responseCallback(false, []);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* createNewChatGroup() {
  while (true) {
    const {payload, responseCallback} = yield take(CREATE_NEW_GROUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CREATE_NEW_GROUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        const data = response.data;
        const {is_group} = data;
        if (is_group) {
          yield put(
            createNewChatGroupSuccess(manipulateSingleObjOfChat(response.data)),
          );
        }
        if (responseCallback)
          responseCallback(true, manipulateSingleObjOfChat(response.data));
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* getChatListing() {
  while (true) {
    const {params, responseCallback} = yield take(GET_ROOM_CHAT.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_ROOM_CHAT_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getRoomChatSuccess(manipulateRoomChatListing(response.data)));
        if (responseCallback)
          responseCallback(true, response?.data?.chats ?? []);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* getChatContactsList() {
  while (true) {
    const {params, responseCallback} = yield take(
      GET_CHAT_CONTACTS_LIST.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_CHAT_CONTACTS_LIST_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getChatContactsListSuccess(manipulateChatContactsList(response.data)),
        );
        if (responseCallback)
          responseCallback(true, manipulateChatContactsList(response.data));
      } else {
        if (responseCallback) responseCallback(false, []);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* searchContactsList(action) {
  const {params, responseCallback} = action;

  try {
    const response = yield call(
      callRequest,
      GET_CHAT_CONTACTS_LIST_URL,
      {},
      params,
      {},
      ApiSauce,
    );

    if (response.status) {
      yield put(
        getSearchContactsListSuccess(manipulateChatContactsList(response.data)),
      );
      if (responseCallback)
        responseCallback(true, manipulateChatContactsList(response.data));
    } else {
      if (responseCallback) responseCallback(false, []);
    }
  } catch (err) {
    if (responseCallback) responseCallback(null, err);
    alert(err.message);
  }
}

export default function* root() {
  yield fork(getRecentChatList);
  yield fork(createNewChatGroup);
  yield fork(getChatListing);
  yield fork(getChatContactsList);
  yield takeLatest(SEARCH_CONTACTS_LIST.REQUEST, searchContactsList);
}
