import {take, put, call, fork} from 'redux-saga/effects';
import {
  CREATE_GROUP,
  DELETE_GROUP_BY_ID,
  GET_GROUP_BY_ID,
  GET_GROUP_POSTS,
  GET_OWN_GROUPS,
  GROUP_MEMBERS_LIST,
  INVITES_IN_GROUP,
  JOIN_GROUP_BY_NOTIFICATION,
  REMOVE_GROUP_MEMBER,
  UPDATE_GROUP,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {
  manipulateGroupListData,
  manipulatePostListData,
} from '../helpers/PostListHelper';
import {
  CREATE_GROUP as CREATE_GROUP_URL,
  UPDATE_GROUP as UPDATE_GROUP_URL,
  GET_OWN_GROUPS as GET_OWN_GROUPS_URL,
  GET_GROUP_BY_ID as GET_GROUP_BY_ID_URL,
  DELETE_GROUP_BY_ID as DELETE_GROUP_BY_ID_URL,
  INVITES_IN_GROUP as INVITES_IN_GROUP_URL,
  GROUP_MEMBERS_LIST as GROUP_MEMBERS_LIST_URL,
  GET_GROUP_POSTS as GET_GROUP_POSTS_URL,
  REMOVE_GROUP_MEMBER as REMOVE_GROUP_MEMBER_URL,
  JOIN_GROUP_BY_NOTIFICATION as JOIN_GROUP_BY_NOTIFICATION_URL,
  callRequest,
} from '../config/WebService';

import {
  createGroupSuccess,
  deleteGroupByIdSuccess,
  getGroupByIdSuccess,
  getGroupPostsSuccess,
  getOwnGroupsSuccess,
  groupMembersListSuccess,
  invitesInGroupSuccess,
  removeGroupMemberSuccess,
  updateGroupSuccess,
} from '../actions/Group';

import ApiSauce from '../services/ApiSauce';
import util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* createGroup() {
  while (true) {
    const {payload, responseCallback} = yield take(CREATE_GROUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CREATE_GROUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(createGroupSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* updateGroup() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_GROUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_GROUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(updateGroupSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* deleteGroupById() {
  while (true) {
    const {parameter, responseCallback} = yield take(
      DELETE_GROUP_BY_ID.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_GROUP_BY_ID_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteGroupByIdSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* getOwnGroups() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_OWN_GROUPS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_OWN_GROUPS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getOwnGroupsSuccess(manipulateGroupListData(response.data)));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* getGroupById() {
  while (true) {
    const {parameter, responseCallback} = yield take(GET_GROUP_BY_ID.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_GROUP_BY_ID_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getGroupByIdSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* invitesInGroup() {
  while (true) {
    const {payload, responseCallback} = yield take(INVITES_IN_GROUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        INVITES_IN_GROUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(invitesInGroupSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* groupMembersList() {
  while (true) {
    const {payload, responseCallback} = yield take(GROUP_MEMBERS_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GROUP_MEMBERS_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(groupMembersListSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* getGroupPosts() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_GROUP_POSTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_GROUP_POSTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getGroupPostsSuccess(manipulatePostListData(response.data)));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* removeGroupMember() {
  while (true) {
    const {parameter, responseCallback} = yield take(
      REMOVE_GROUP_MEMBER.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        REMOVE_GROUP_MEMBER_URL,
        parameter,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(removeGroupMemberSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}
function* joinByNotification() {
  while (true) {
    const {payload, responseCallback} = yield take(
      JOIN_GROUP_BY_NOTIFICATION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        JOIN_GROUP_BY_NOTIFICATION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true, null);
        alert(response.massage);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(createGroup);
  yield fork(updateGroup);
  yield fork(deleteGroupById);
  yield fork(getOwnGroups);
  yield fork(getGroupById);
  yield fork(invitesInGroup);
  yield fork(groupMembersList);
  yield fork(getGroupPosts);
  yield fork(removeGroupMember);
  yield fork(joinByNotification);
}
