import {take, put, call, fork} from 'redux-saga/effects';
import {
  ADD_MEETING,
  BOOK_MEETING,
  CANCEL_MEETING,
  DELETE_MEETING,
  GET_MEETING,
  GET_MEETINGS_LIST,
  RESCHEDULE_MEETING,
  SCHEDULE_MEETING,
  UPDATE_MEETING,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';

import {
  ADD_MEETING as ADD_MEETING_URL,
  GET_MEETING as GET_MEETING_URL,
  GET_MEETINGS_LIST as GET_MEETINGS_LIST_URL,
  BOOK_MEETING as BOOK_MEETING_URL,
  DELETE_MEETING as DELETE_MEETING_URL,
  UPDATE_MEETING as UPDATE_MEETING_URL,
  SCHEDULE_MEETING as SCHEDULE_MEETING_URL,
  RESCHEDULE_MEETING as RESCHEDULE_MEETING_URL,
  CANCEL_MEETING as CANCEL_MEETING_URL,
  callRequest,
} from '../config/WebService';

import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {
  addMeetingSuccess,
  bookMeetingSuccess,
  cancelMeetingSuccess,
  deleteMeetingSuccess,
  getMeetingsListSuccess,
  getMeetingSuccess,
  updateMeetingSuccess,
} from '../actions/MeetingsActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* addMeeting() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_MEETING.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_MEETING_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(addMeetingSuccess(response.data));
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

function* getMeeting() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_MEETING.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_MEETING_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getMeetingSuccess(response.data));
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

function* getMeetingList() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_MEETINGS_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_MEETINGS_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getMeetingsListSuccess(response.data));
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

function* updateMeeting() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_MEETING.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_MEETING_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(updateMeetingSuccess(response.data));
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

function* deleteMeeting() {
  while (true) {
    const {parameter, responseCallback} = yield take(DELETE_MEETING.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_MEETING_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteMeetingSuccess(response.data));
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

function* bookMeeting() {
  while (true) {
    const {payload, responseCallback} = yield take(BOOK_MEETING.REQUEST);
    try {
      const response = yield call(
        callRequest,
        BOOK_MEETING_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(bookMeetingSuccess(response.data));
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

function* scheduleMeeting() {
  while (true) {
    const {payload, responseCallback} = yield take(SCHEDULE_MEETING.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SCHEDULE_MEETING_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(bookMeetingSuccess(response.data));
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

function* rescheduleMeeting() {
  while (true) {
    const {payload, responseCallback} = yield take(RESCHEDULE_MEETING.REQUEST);
    try {
      const response = yield call(
        callRequest,
        RESCHEDULE_MEETING_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(bookMeetingSuccess(response.data));
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

function* cancelMeeting() {
  while (true) {
    const {parameter, responseCallback} = yield take(CANCEL_MEETING.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CANCEL_MEETING_URL,
        parameter,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(cancelMeetingSuccess(response.data));
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
  yield fork(addMeeting);
  yield fork(getMeeting);
  yield fork(getMeetingList);
  yield fork(updateMeeting);
  yield fork(deleteMeeting);
  yield fork(bookMeeting);
  yield fork(scheduleMeeting);
  yield fork(rescheduleMeeting);
  yield fork(cancelMeeting);
}
