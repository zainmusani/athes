// @flow

import {
  ADD_EVENT,
  GET_EVENT_BY_ID,
  GET_OWN_EVENT,
  DELETE_EVENT_BY_ID,
  GET_PUBLIC_EVENT,
  UPDATE_EVENT,
  ENROLL_EVENT,
  ENROLL_EVENT_DELETE,
  ENROLL_EVENT_GET,
  EVENT_INVITE,
  EVENT_ATTENDEES,
  ENROLLED_EVENTS
} from './ActionTypes';

export function addEventRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_EVENT.REQUEST,
  };
}

export function addEventSuccess(data) {
  return {
    data,
    type: ADD_EVENT.SUCCESS,
  };
}

export function getOwnEventsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_OWN_EVENT.REQUEST,
  };
}

export function getOwnEventsSuccess(data) {
  return {
    data,
    type: GET_OWN_EVENT.SUCCESS,
  };
}

export function getPublicEventsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_PUBLIC_EVENT.REQUEST,
  };
}

export function getPublicEventsSuccess(data) {
  return {
    data,
    type: GET_PUBLIC_EVENT.SUCCESS,
  };
}

export function updateEventRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_EVENT.REQUEST,
  };
}

export function updateEventSuccess(data) {
  return {
    data,
    type: UPDATE_EVENT.SUCCESS,
  };
}

export function getEventByIdRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: GET_EVENT_BY_ID.REQUEST,
  };
}

export function getEventByIdSuccess(data) {
  return {
    data,
    type: GET_EVENT_BY_ID.SUCCESS,
  };
}

export function deleteEventByIdRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: DELETE_EVENT_BY_ID.REQUEST,
  };
}

export function deleteEventByIdSuccess(data) {
  return {
    data,
    type: DELETE_EVENT_BY_ID.SUCCESS,
  };
}

export function enrollEventRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ENROLL_EVENT.REQUEST,
  };
}

export function enrollEventSuccess(data) {
  return {
    data,
    type: ENROLL_EVENT.SUCCESS,
  };
}

export function eventAttendeesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EVENT_ATTENDEES.REQUEST,
  };
}

export function eventAttendeesSuccess(data) {
  return {
    data,
    type: EVENT_ATTENDEES.SUCCESS,
  };
}

export function enrollEventDeleteRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ENROLL_EVENT_DELETE.REQUEST,
  };
}

export function enrollEventDeleteSuccess(data) {
  return {
    data,
    type: ENROLL_EVENT_DELETE.SUCCESS,
  };
}

export function eventInviteRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EVENT_INVITE.REQUEST,
  };
}

export function eventInviteSuccess(data) {
  return {
    data,
    type: EVENT_INVITE.SUCCESS,
  };
}

export function enrolledEventsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ENROLLED_EVENTS.REQUEST,
  };
}

export function enrolledEventsSuccess(data) {
  return {
    data,
    type: ENROLLED_EVENTS.SUCCESS,
  };
}