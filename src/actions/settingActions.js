import {CHANGE_PASSWORD, SETTING_PAGES, SUPPORT} from './ActionTypes';

export function getSettingPagesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SETTING_PAGES.REQUEST,
  };
}

export function getSettingPagesSuccess(data) {
  return {
    data,
    type: SETTING_PAGES.SUCCESS,
  };
}

export function supportRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SUPPORT.REQUEST,
  };
}

export function supportSuccess(data) {
  return {
    data,
    type: SUPPORT.SUCCESS,
  };
}

export function ChangePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHANGE_PASSWORD.REQUEST,
  };
}

export function ChangePasswordSuccess(data) {
  return {
    data,
    type: CHANGE_PASSWORD.SUCCESS,
  };
}
