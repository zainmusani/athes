import { take, put, call, fork } from 'redux-saga/effects';
import {
  ADD_CHILD,
  DELETE_CHILD,
  EDIT_CHILD,
  GET_CHILD,
  PARENT_VERIFICATION_STATUS,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';

import {
  ADD_CHILD as ADD_CHILD_URL,
  EDIT_CHILD as EDIT_CHILD_URL,
  DELETE_CHILD as DELETE_CHILD_URL,
  GET_CHILD as GET_CHILD_URL,
  PARENT_VERIFICATION_STATUS as PARENT_VERIFICATION_STATUS_URL,
  callRequest,
} from '../config/WebService';

import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {
  deleteChildSuccess,
  getChildForEnrollSuccess,
  getChildSuccess,
  parentVerificationStatusSuccess,
} from '../actions/ParentActions';
import {manipulateChildListData} from '../helpers/parentHelper';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* addChild() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_CHILD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_CHILD_URL,
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

function* editChild() {
  while (true) {
    const {payload, responseCallback} = yield take(EDIT_CHILD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EDIT_CHILD_URL,
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

function* deleteChild() {
  while (true) {
    const {parameter, responseCallback} = yield take(DELETE_CHILD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_CHILD_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteChildSuccess(parameter));
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

function* getChild() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_CHILD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_CHILD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getChildSuccess(manipulateChildListData(response.data)));
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

function* parentVerificationStatus() {
  while (true) {
    const {payload, responseCallback} = yield take(
      PARENT_VERIFICATION_STATUS.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        PARENT_VERIFICATION_STATUS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(parentVerificationStatusSuccess(response.data));
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
  yield fork(addChild);
  yield fork(editChild);
  yield fork(deleteChild);
  yield fork(getChild);
  yield fork(parentVerificationStatus);
}
