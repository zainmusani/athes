// @flow

import {
  ADD_CHILD,
  DELETE_CHILD,
  EDIT_CHILD,
  GET_CHILD,
  GET_CHILD_FOR_ENROLL,
  PARENT_VERIFICATION_STATUS,
} from './ActionTypes';

export function addChildRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_CHILD.REQUEST,
  };
}

export function addChildSuccess(data) {
  return {
    data,
    type: ADD_CHILD.SUCCESS,
  };
}

export function editChildRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EDIT_CHILD.REQUEST,
  };
}

export function editChildSuccess(data) {
  return {
    data,
    type: EDIT_CHILD.SUCCESS,
  };
}

export function deleteChildRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: DELETE_CHILD.REQUEST,
  };
}

export function deleteChildSuccess(data) {
  return {
    data,
    type: DELETE_CHILD.SUCCESS,
  };
}

export function getChildRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_CHILD.REQUEST,
  };
}

export function getChildSuccess(data) {
  return {
    data,
    type: GET_CHILD.SUCCESS,
  };
}

export function parentVerificationStatusRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: PARENT_VERIFICATION_STATUS.REQUEST,
  };
}

export function parentVerificationStatusSuccess(data) {
  return {
    data,
    type: PARENT_VERIFICATION_STATUS.SUCCESS,
  };
}