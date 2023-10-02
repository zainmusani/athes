import {take, put, call, fork} from 'redux-saga/effects';
import {
  ADD_FACILITY,
  DELETE_FACILITY_BY_ID,
  UPDATE_FACILITY,
  GET_OWN_FACILITIES,
  GET_FACILITY_BY_ID,
  BOOK_FACILITY,
  UNBOOK_FACILITY,
  GET_FACILITIES,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';

import {
  ADD_FACILITY as ADD_FACILITY_URL,
  UPDATE_FACILITY as UPDATE_FACILITY_URL,
  DELETE_FACILITY_BY_ID as DELETE_FACILITY_BY_ID_URL,
  GET_OWN_FACILITIES as GET_OWN_FACILITIES_URL,
  GET_FACILITIES as GET_FACILITIES_URL,
  GET_FACILITY_BY_ID as GET_FACILITY_BY_ID_URL,
  BOOK_FACILITY as BOOK_FACILITY_URL,
  UNBOOK_FACILITY as UNBOOK_FACILITY_URL,
  callRequest,
} from '../config/WebService';

import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {deleteSessionByIdSuccess} from '../actions/SessionsActions';
import {
  addFacilitySuccess,
  bookFacilityRequest,
  bookFacilitySuccess,
  getFacilitiesSuccess,
  getFacilityByIdSuccess,
  getOwnFacilitiesSuccess,
  unBookFacilitySuccess,
  updateFacilitySuccess,
} from '../actions/Facility';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* addFacility() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_FACILITY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_FACILITY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(addFacilitySuccess(response.data));
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

function* updateFacility() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_FACILITY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_FACILITY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(updateFacilitySuccess(response.data));
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

function* getFacilities() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_FACILITIES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_FACILITIES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getFacilitiesSuccess(response.data));
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

function* getOwnFacilities() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_OWN_FACILITIES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_OWN_FACILITIES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getOwnFacilitiesSuccess(response.data));
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

function* bookFacility() {
  while (true) {
    const {payload, responseCallback} = yield take(BOOK_FACILITY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        BOOK_FACILITY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(bookFacilitySuccess(response.data));
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

function* unBookFacility() {
  while (true) {
    const {parameter, responseCallback} = yield take(UNBOOK_FACILITY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UNBOOK_FACILITY_URL,
        parameter,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(unBookFacilitySuccess(response.data));
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

function* deleteFacilityById() {
  while (true) {
    const {parameter, responseCallback} = yield take(
      DELETE_FACILITY_BY_ID.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_FACILITY_BY_ID_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteSessionByIdSuccess(response.data));
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

function* getFacilityById() {
  while (true) {
    const {parameter, responseCallback} = yield take(
      GET_FACILITY_BY_ID.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_FACILITY_BY_ID_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getFacilityByIdSuccess(response.data));
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
  yield fork(addFacility);
  yield fork(updateFacility);
  yield fork(deleteFacilityById);
  yield fork(getOwnFacilities);
  yield fork(getFacilityById);
  yield fork(bookFacility);
  yield fork(unBookFacility);
  yield fork(getFacilities);
}
