import {take, put, call, fork} from 'redux-saga/effects';
import {
  ADD_EVENT,
  DELETE_EVENT_BY_ID,
  GET_EVENT_BY_ID,
  GET_OWN_EVENT,
  GET_PUBLIC_EVENT,
  UPDATE_EVENT,
  ENROLL_EVENT,
  ENROLL_EVENT_DELETE,
  EVENT_ATTENDEES,
  EVENT_INVITE,
  ENROLLED_EVENTS,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';

import {
  ADD_EVENT as ADD_EVENT_URL,
  GET_OWN_EVENT as GET_OWN_EVENT_URL,
  GET_PUBLIC_EVENT as GET_PUBLIC_EVENT_URL,
  GET_EVENT_BY_ID as GET_EVENT_BY_ID_URL,
  DELETE_EVENT_BY_ID as DELETE_EVENT_BY_ID_URL,
  UPDATE_EVENT as UPDATE_EVENT_URL,
  ENROLL_EVENT as ENROLL_EVENT_URL,
  ENROLL_EVENT_DELETE as ENROLL_EVENT_DELETE_URL,
  EVENT_ATTENDEES as EVENT_ATTENDEES_URL,
  EVENT_INVITE as EVENT_INVITE_URL,
  ENROLLED_EVENTS as ENROLLED_EVENTS_URL,
  callRequest,
} from '../config/WebService';

import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {
  addEventSuccess,
  deleteEventByIdSuccess,
  enrolledEventsSuccess,
  enrollEventDeleteSuccess,
  enrollEventSuccess,
  eventAttendeesSuccess,
  eventInviteSuccess,
  getEventByIdSuccess,
  getOwnEventsSuccess,
  getPublicEventsSuccess,
  updateEventSuccess,
} from '../actions/EventsActions';
import {
  manipulateEnrolledEventsList,
  manipulateEventsListData,
  manipulateEventsSingleData,
} from '../helpers/EventsHelpers';
import {updateWith} from 'lodash';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* addEvent() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_EVENT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_EVENT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(manipulateEventsSingleData(response.data));
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

function* getOwnEvents() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_OWN_EVENT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_OWN_EVENT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getOwnEventsSuccess(manipulateEventsListData(response.data)));
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

function* getPublicEvents() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_PUBLIC_EVENT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PUBLIC_EVENT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getPublicEventsSuccess(manipulateEventsListData(response.data)),
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

function* getEventById() {
  while (true) {
    const {parameter, responseCallback} = yield take(GET_EVENT_BY_ID.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_EVENT_BY_ID_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getEventByIdSuccess(response.data));
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

function* deleteEventById() {
  while (true) {
    const {parameter, responseCallback} = yield take(
      DELETE_EVENT_BY_ID.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_EVENT_BY_ID_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteEventByIdSuccess(parameter));
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

function* updateEvent() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_EVENT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_EVENT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(updateEventSuccess(response.data));
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

function* enrollEvent() {
  while (true) {
    const {payload, responseCallback} = yield take(ENROLL_EVENT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ENROLL_EVENT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(enrollEventSuccess(response.data));
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

function* enrollEventDelete() {
  while (true) {
    const {payload, responseCallback} = yield take(ENROLL_EVENT_DELETE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ENROLL_EVENT_DELETE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(enrollEventDeleteSuccess(response.data));
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

function* eventAttendees() {
  while (true) {
    const {payload, responseCallback} = yield take(EVENT_ATTENDEES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EVENT_ATTENDEES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(eventAttendeesSuccess(response.data));
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
    const {payload, responseCallback} = yield take(EVENT_INVITE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EVENT_INVITE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(eventInviteSuccess(response.data));
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

function* enrolledEvents() {
  while (true) {
    const {payload, responseCallback} = yield take(ENROLLED_EVENTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ENROLLED_EVENTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          enrolledEventsSuccess(manipulateEnrolledEventsList(response.data)),
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
  yield fork(getOwnEvents);
  yield fork(getPublicEvents);
  yield fork(getEventById);
  yield fork(updateEvent);
  yield fork(deleteEventById);
  yield fork(enrollEvent);
  yield fork(enrollEventDelete);
  yield fork(eventAttendees);
  yield fork(eventInvite);
  yield fork(enrolledEvents);
}
