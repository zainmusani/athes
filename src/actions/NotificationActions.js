import {
  DEVICE_TOKEN_NOTIFICATION,
  GET_NOTIFICATIONS_LIST,
  INCREASE_DECREASE_NOTIFICATION_COUNT,
  NOTIFICATIONS_COUNT,
  NOTIFICATION_COUNT_READ,
  UNREAD_NOTIFICATIONS_COUNT,
  GET_NOTIFICATIONS,
  EMPTY_LIST_NOTIFICATION,
  INCREASE_COUNT_NOTIFICATION,
} from './ActionTypes';
export function deviceTokenNotificationRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DEVICE_TOKEN_NOTIFICATION.REQUEST,
  };
}

export function deviceTokenNotificationsSuccess(data, responseCallback) {
  return {
    data,
    responseCallback,
    type: DEVICE_TOKEN_NOTIFICATION.SUCCESS,
  };
}

export function getNotificationsList(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_NOTIFICATIONS.REQUEST,
  };
}

export function getNotificationsListSuccess(data) {
  return {
    data,
    type: GET_NOTIFICATIONS.SUCCESS,
  };
}

export function notificationsCountRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: NOTIFICATIONS_COUNT.REQUEST,
  };
}

export function notificationsCountSuccess(data) {
  return {
    data,
    type: NOTIFICATIONS_COUNT.SUCCESS,
  };
}
export function notificationCountIncDec(data) {
  return {
    data,
    type: INCREASE_DECREASE_NOTIFICATION_COUNT,
  };
}
export function notificationCountRead(data) {
  return {
    data,
    type: NOTIFICATION_COUNT_READ,
  };
}
export function emptyListNotification(data) {
  return {
    data,
    type: EMPTY_LIST_NOTIFICATION,
  };
}

export function increaseCountNotification(data) {
  return {
    data,
    type: INCREASE_COUNT_NOTIFICATION,
  };
}