// @flow

import {
  SET_USER_ROLE,
  SET_SELECTED_TAB,
  GET_SEARCH_KEYWORDS,
  PRIVO,
  INVESTMENTS,
  EARNINGS,
  WITHDRAWAL,
  AFTERWITHDRAWCARD,
  COACHING_SEARCH,
  ATHES_CART,
  SET_CURRENT_ACTIVE_SCREEN_NAME,
  SAVE_DEVICE_TOKEN,
} from './ActionTypes';

export function setSelectedTab(data) {
  return {
    data,
    type: SET_SELECTED_TAB,
  };
}

export function setUserRole(data) {
  return {
    data,
    type: SET_USER_ROLE,
  };
}

export function getSearchKeywordsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_SEARCH_KEYWORDS.REQUEST,
  };
}

export function getSearchKeywordsSuccess(data) {
  return {
    data,
    type: GET_SEARCH_KEYWORDS.SUCCESS,
  };
}

export function privoRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: PRIVO.REQUEST,
  };
}

export function privoSuccess(data) {
  return {
    data,
    type: PRIVO.SUCCESS,
  };
}

export function investmentRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: INVESTMENTS.REQUEST,
  };
}

export function investmentSuccess(data) {
  return {
    data,
    type: INVESTMENTS.SUCCESS,
  };
}

export function earningsRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: EARNINGS.REQUEST,
  };
}

export function earningsSuccess(data) {
  return {
    data,
    type: EARNINGS.SUCCESS,
  };
}

export function withdrawalRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: WITHDRAWAL.REQUEST,
  };
}

export function withdrawalSuccess(data) {
  return {
    data,
    type: WITHDRAWAL.SUCCESS,
  };
}

export function afterAddWithdrawCard(data) {
  return {
    data,
    type: AFTERWITHDRAWCARD,
  };
}

export function coachingSearchRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: COACHING_SEARCH.REQUEST,
  };
}

export function coachingSearchSuccess(data) {
  return {
    data,
    type: COACHING_SEARCH.SUCCESS,
  };
}

export function athesCartData(data) {
  return {
    data,
    type: ATHES_CART,
  };
}

export function saveDeviceToken(data) {
  return {
    data,
    type: SAVE_DEVICE_TOKEN,
  };
}

export function setCurrentActiveScreenName(data) {
  return {
    data,
    type: SET_CURRENT_ACTIVE_SCREEN_NAME,
  };
}
