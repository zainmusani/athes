import { call, fork, put, take } from 'redux-saga/effects';
import {
  JOIN_TEAM,
  INVITE_TEAM,
  DELETE_TEAM_MEMBER,
  USER_TEAMS_LIST,
  TEAM_MEMBERS_LIST,
  UPDATE_TEAM_MEMBER_STATUS,
  CREATE_TEAM_EVENTS,
  GET_TEAM_EVENT_BY_ID,
  EDIT_TEAM_EVENTS,
  DELETE_TEAM_EVENT_BY_ID,
  INVITE_TEAM_EVENT,
  ENROLL_TEAM_EVENT,
} from '../actions/ActionTypes';
import {
  createTeamEventSuccess,
  deleteTeamEventByIdSuccess,
  deleteTeamMemberSuccess,
  editTeamEventSuccess,
  enrollTeamEventSuccess,
  getTeamEventByIdSuccess,
  joinTeamSuccess,
  teamEventInviteSuccess,
  teamMembersListSuccess,
  updateTeamMemberStatusSuccess,
  userTeamsListSuccess,
} from '../actions/TeamActions';
import {
  callRequest,
  USER_TEAMS_LIST as USER_TEAMS_LIST_URL,
  JOIN_TEAM as JOIN_TEAM_URL,
  INVITE_TEAM as INVITE_TEAM_URL,
  DELETE_TEAM_MEMBER as DELETE_TEAM_MEMBER_URL,
  TEAM_MEMBERS_LIST as TEAM_MEMBERS_LIST_URL,
  UPDATE_TEAM_MEMBER_STATUS as UPDATE_TEAM_MEMBER_STATUS_URL,
  CREATE_TEAM_EVENTS as CREATE_TEAM_EVENTS_URL,
  EDIT_TEAM_EVENTS as EDIT_TEAM_EVENTS_URL,
  GET_TEAM_EVENT_BY_ID as GET_TEAM_EVENT_BY_ID_URL,
  DELETE_TEAM_EVENT_BY_ID as DELETE_TEAM_EVENT_BY_ID_URL,
  INVITE_TEAM_EVENT as INVITE_TEAM_EVENT_URL,
  ENROLL_TEAM_EVENT as ENROLL_TEAM_EVENT_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {manipulateTeamMembersList, manipulateUserTeamsList} from '../helpers/userHelper';
import ApiSauce from '../services/ApiSauce';
import util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getTeamList() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_TEAMS_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_TEAMS_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(userTeamsListSuccess(manipulateUserTeamsList(response.data)));
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

function* getTeamMember() {
  while (true) {
    const {payload, responseCallback} = yield take(TEAM_MEMBERS_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        TEAM_MEMBERS_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(teamMembersListSuccess(manipulateTeamMembersList(response.data)));
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

function* inviteTeamMember() {
  while (true) {
    const {payload, responseCallback} = yield take(INVITE_TEAM.REQUEST);
    try {
      const response = yield call(
        callRequest,
        INVITE_TEAM_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(teamMembersListSuccess(response.data));
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

function* createTeamMember() {
  while (true) {
    const {payload, responseCallback} = yield take(JOIN_TEAM.REQUEST);
    try {
      const response = yield call(
        callRequest,
        JOIN_TEAM_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(joinTeamSuccess(response.data));
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

function* updateTeamMember() {
  while (true) {
    const {payload, responseCallback} = yield take(
      UPDATE_TEAM_MEMBER_STATUS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        UPDATE_TEAM_MEMBER_STATUS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(updateTeamMemberStatusSuccess(response.data));
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

function* deleteTeamMember() {
  while (true) {
    const {parameter, responseCallback} = yield take(
      DELETE_TEAM_MEMBER.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_TEAM_MEMBER_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteTeamMemberSuccess(response.data));
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

function* createTeamEvent() {
  while (true) {
    const {payload, responseCallback} = yield take(CREATE_TEAM_EVENTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CREATE_TEAM_EVENTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(createTeamEventSuccess(response.data));
        if (responseCallback) responseCallback(response.data, null);
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

function* editTeamEvent() {
  while (true) {
    const {payload, responseCallback} = yield take(EDIT_TEAM_EVENTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EDIT_TEAM_EVENTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(editTeamEventSuccess(response.data));
        if (responseCallback) responseCallback(response.data, null);

        alert(`${response.data.title} updated successfully`, 'success');
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

function* getTeamEventById() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_TEAM_EVENT_BY_ID.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_TEAM_EVENT_BY_ID_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getTeamEventByIdSuccess(response.data));
        if (responseCallback) responseCallback(response.data, null);
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

function* deleteTeamEventById() {
  while (true) {
    const {parameter, responseCallback} = yield take(
      DELETE_TEAM_EVENT_BY_ID.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_TEAM_EVENT_BY_ID_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteTeamEventByIdSuccess(parameter));
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

function* eventInvite() {
  while (true) {
    const {payload, responseCallback} = yield take(INVITE_TEAM_EVENT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        INVITE_TEAM_EVENT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(teamEventInviteSuccess(response.data));
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

function* enrollEvent() {
  while (true) {
    const {payload, responseCallback} = yield take(ENROLL_TEAM_EVENT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ENROLL_TEAM_EVENT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(enrollTeamEventSuccess(response.data));
        if (responseCallback) responseCallback(response.data);
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
  yield fork(getTeamList);
  yield fork(getTeamMember);
  yield fork(inviteTeamMember);
  yield fork(createTeamMember);
  yield fork(updateTeamMember);
  yield fork(deleteTeamMember);
  yield fork(createTeamEvent);
  yield fork(editTeamEvent);
  yield fork(getTeamEventById);
  yield fork(deleteTeamEventById);
  yield fork(eventInvite);
  yield fork(enrollEvent);
}
