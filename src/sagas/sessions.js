import {take, put, call, fork} from 'redux-saga/effects';
import {
  ADD_SESSION,
  DELETE_SESSION_BY_ID,
  ENROLL_SESSION,
  GET_OWN_SESSION,
  GET_PUBLIC_SESSION,
  GET_SESSION_BY_ID,
  UPDATE_SESSION,
  ENROLL_SESSION_DELETE,
  SESSION_INVITE,
  SESSION_ATTENDEES,
  ENROLLED_SESSION,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';

import {
  ADD_SESSION as ADD_SESSION_URL,
  GET_OWN_SESSION as GET_OWN_SESSION_URL,
  GET_PUBLIC_SESSION as GET_PUBLIC_SESSION_URL,
  GET_SESSION_BY_ID as GET_SESSION_BY_ID_URL,
  DELETE_SESSION_BY_ID as DELETE_SESSION_BY_ID_URL,
  UPDATE_SESSION as UPDATE_SESSION_URL,
  ENROLL_SESSION as ENROLL_SESSION_URL,
  ENROLL_SESSION_DELETE as ENROLL_SESSION_DELETE_URL,
  SESSION_ATTENDEES as SESSION_ATTENDEES_URL,
  SESSION_INVITE as SESSION_INVITE_URL,
  ENROLLED_SESSION as ENROLLED_SESSION_URL,
  callRequest,
} from '../config/WebService';

import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {
  enrolledSessionSuccess,
  enrollSessionDeleteSuccess,
  enrollSessionRequest,
  enrollSessionSuccess,
  getOwnSessionsSuccess,
  getPublicSessionsSuccess,
  getSessionByIdSuccess,
  sessionAttendeesSuccess,
  sessionInviteSuccess,
  updateSessionSuccess,
} from '../actions/SessionsActions';
import {
  manipulateEnrolledSessionsList,
  manipulateSessionsListData,
} from '../helpers/SessionHelpers';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* addEvent() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_SESSION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_SESSION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(userSignupSuccess(response.data.data));
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

function* getOwnSessions() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_OWN_SESSION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_OWN_SESSION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getOwnSessionsSuccess(manipulateSessionsListData(response.data)),
        );
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

function* getPublicSessions() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_PUBLIC_SESSION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PUBLIC_SESSION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getPublicSessionsSuccess(manipulateSessionsListData(response.data)),
        );
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

function* getSessionById() {
  while (true) {
    const {parameter, responseCallback} = yield take(GET_SESSION_BY_ID.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SESSION_BY_ID_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getSessionByIdSuccess(response.data));
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

function* updateSessionById() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_SESSION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_SESSION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(updateSessionSuccess(response.date));
        if (responseCallback) responseCallback(true, null);
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

function* deleteSessionById() {
  while (true) {
    const {parameter, responseCallback} = yield take(
      DELETE_SESSION_BY_ID.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_SESSION_BY_ID_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getSessionByIdSuccess(parameter));
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

function* enrollSession() {
  while (true) {
    const {payload, responseCallback} = yield take(ENROLL_SESSION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ENROLL_SESSION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(enrollSessionSuccess(response.data));
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

function* enrollSessionDelete() {
  while (true) {
    const {payload, responseCallback} = yield take(
      ENROLL_SESSION_DELETE.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        ENROLL_SESSION_DELETE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(enrollSessionDeleteSuccess(response.data));
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

function* sessionAttendees() {
  while (true) {
    const {payload, responseCallback} = yield take(SESSION_ATTENDEES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SESSION_ATTENDEES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(sessionAttendeesSuccess(response.data));
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

function* sessionInvite() {
  while (true) {
    const {payload, responseCallback} = yield take(SESSION_INVITE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SESSION_INVITE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(sessionInviteSuccess(response.data));
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

function* enrolledSession() {
  while (true) {
    const {payload, responseCallback} = yield take(ENROLLED_SESSION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ENROLLED_SESSION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          enrolledSessionSuccess(manipulateEnrolledSessionsList(response.data)),
        );
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

export default function* root() {
  yield fork(addEvent);
  yield fork(getOwnSessions);
  yield fork(getPublicSessions);
  yield fork(getSessionById);
  yield fork(updateSessionById);
  yield fork(deleteSessionById);
  yield fork(enrollSession);
  yield fork(enrollSessionDelete);
  yield fork(sessionAttendees);
  yield fork(sessionInvite);
  yield fork(enrolledSession);
}
