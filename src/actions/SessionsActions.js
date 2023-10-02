// @flow

import {
  ADD_SESSION,
  GET_OWN_SESSION,
  GET_SESSION_BY_ID,
  DELETE_SESSION_BY_ID,
  GET_PUBLIC_SESSION,
  UPDATE_SESSION,
  ENROLL_SESSION,
  ENROLL_SESSION_DELETE,
  SESSION_INVITE,
  SESSION_ATTENDEES,
  ENROLLED_SESSION,
} from './ActionTypes';

export function addSessionRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_SESSION.REQUEST,
  };
}

export function addSessionSuccess(data) {
  return {
    data,
    type: ADD_SESSION.SUCCESS,
  };
}

export function getOwnSessionsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_OWN_SESSION.REQUEST,
  };
}

export function getOwnSessionsSuccess(data) {
  return {
    data,
    type: GET_OWN_SESSION.SUCCESS,
  };
}

export function getPublicSessionsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_PUBLIC_SESSION.REQUEST,
  };
}

export function getPublicSessionsSuccess(data) {
  return {
    data,
    type: GET_PUBLIC_SESSION.SUCCESS,
  };
}

export function getSessionByIdRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: GET_SESSION_BY_ID.REQUEST,
  };
}

export function getSessionByIdSuccess(data) {
  return {
    data,
    type: GET_SESSION_BY_ID.SUCCESS,
  };
}

export function updateSessionRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_SESSION.REQUEST,
  };
}

export function updateSessionSuccess(data) {
  return {
    data,
    type: UPDATE_SESSION.SUCCESS,
  };
}

export function deleteSessionByIdRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: DELETE_SESSION_BY_ID.REQUEST,
  };
}

export function deleteSessionByIdSuccess(data) {
  return {
    data,
    type: DELETE_SESSION_BY_ID.SUCCESS,
  };
}

export function sessionAttendeesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SESSION_ATTENDEES.REQUEST,
  };
}

export function sessionAttendeesSuccess(data) {
  return {
    data,
    type: SESSION_ATTENDEES.SUCCESS,
  };
}

export function enrollSessionRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ENROLL_SESSION.REQUEST,
  };
}

export function enrollSessionSuccess(data) {
  return {
    data,
    type: ENROLL_SESSION.SUCCESS,
  };
}


export function enrollSessionDeleteRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ENROLL_SESSION_DELETE.REQUEST,
  };
}

export function enrollSessionDeleteSuccess(data) {
  return {
    data,
    type: ENROLL_SESSION_DELETE.SUCCESS,
  };
}

export function sessionInviteRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SESSION_INVITE.REQUEST,
  };
}

export function sessionInviteSuccess(data) {
  return {
    data,
    type: SESSION_INVITE.SUCCESS,
  };
}

export function enrolledSessionRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ENROLLED_SESSION.REQUEST,
  };
}

export function enrolledSessionSuccess(data) {
  return {
    data,
    type: ENROLLED_SESSION.SUCCESS,
  };
}