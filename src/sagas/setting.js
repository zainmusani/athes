import { call, fork, put, take } from 'redux-saga/effects';
import {CHANGE_PASSWORD, SETTING_PAGES, SUPPORT} from '../actions/ActionTypes';
import {
  getSettingPagesSuccess,
  supportSuccess,
} from '../actions/settingActions';
import {
  SETTING_PAGES as SETTING_PAGES_URL,
  SUPPORT as SUPPORT_URL,
  CHANGE_PASSWORD as CHANGE_PASSWORD_URL,
  callRequest,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import ApiSauce from '../services/ApiSauce';
import util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getSettingPages() {
  while (true) {
    const {payload, responseCallback} = yield take(SETTING_PAGES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SETTING_PAGES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getSettingPagesSuccess(response.data));
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

function* support() {
  while (true) {
    const {payload, responseCallback} = yield take(SUPPORT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SUPPORT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(supportSuccess(response.data));
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

function* change_password() {
  while (true) {
    const {payload, responseCallback} = yield take(CHANGE_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHANGE_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(forgotChangePasswordSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(getSettingPages);
  yield fork(support);
  yield fork(change_password);
}
