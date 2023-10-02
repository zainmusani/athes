import {call, fork, put, take} from 'redux-saga/effects';
import {
  DEVICE_TOKEN_NOTIFICATION,
  GET_NOTIFICATIONS,
  NOTIFICATIONS_COUNT,
} from '../actions/ActionTypes';
import {createCommentSuccess} from '../actions/commentAction';
import {
  getNotificationsListSuccess,
  notificationsCountSuccess,
} from '../actions/NotificationActions';
import {
  callRequest,
  DEVICE_TOKEN_NOTIFICATION as DEVICE_TOKEN_NOTIFICATION_URL,
  GET_NOTIFICATIONS as GET_NOTIFICATIONS_URL,
  NOTIFICATIONS_COUNT as NOTIFICATIONS_COUNT_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import {manipulateNotificationList} from '../helpers/NotificationHelper';
import {saveDeviceToken} from '../actions/GeneralActions';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getNotification() {
  while (true) {
    const {params, responseCallback} = yield take(GET_NOTIFICATIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_NOTIFICATIONS_URL,
        '',
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getNotificationsListSuccess(
            manipulateNotificationList(response.data),
          ),
        );
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
    }
  }
}

function* deviceTokenNotification() {
  while (true) {
    const {payload, responseCallback} = yield take(
      DEVICE_TOKEN_NOTIFICATION.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DEVICE_TOKEN_NOTIFICATION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(saveDeviceToken(payload.device_token))
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
function* getCountNotification() {
  while (true) {
    const {payload, responseCallback} = yield take(NOTIFICATIONS_COUNT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        NOTIFICATIONS_COUNT_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(notificationsCountSuccess(response?.data[0]?.count));
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
  yield fork(deviceTokenNotification);
  yield fork(getNotification);
  yield fork(getCountNotification);
}
