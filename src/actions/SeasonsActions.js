// @flow

import {
  ADD_SEASON,
  GET_OWN_SEASON,
  GET_SEASON_BY_ID,
  DELETE_SEASON_BY_ID,
  GET_PUBLIC_SEASON,
  UPDATE_SEASON,
  ENROLL_SEASON,
  ENROLL_SEASON_GET,
  CANCLE_ENROLL_SEASON,
  ENROLLED_SEASON,
  SEASON_ATTENDEES,
  SEASON_INVITE,
  GET_SEASON_POSTS,
} from './ActionTypes';

export function addSeasonRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_SEASON.REQUEST,
  };
}

export function addSeasonSuccess(data) {
  return {
    data,
    type: ADD_SEASON.SUCCESS,
  };
}

export function getOwnSeasonsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_OWN_SEASON.REQUEST,
  };
}

export function getOwnSeasonsSuccess(data) {
  return {
    data,
    type: GET_OWN_SEASON.SUCCESS,
  };
}

export function getPublicSeasonsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_PUBLIC_SEASON.REQUEST,
  };
}

export function getPublicSeasonsSuccess(data) {
  return {
    data,
    type: GET_PUBLIC_SEASON.SUCCESS,
  };
}

export function getSeasonByIdRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: GET_SEASON_BY_ID.REQUEST,
  };
}

export function getSeasonByIdSuccess(data) {
  return {
    data,
    type: GET_SEASON_BY_ID.SUCCESS,
  };
}

export function updateSeasonRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_SEASON.REQUEST,
  };
}

export function updateSeasonSuccess(data) {
  return {
    data,
    type: UPDATE_SEASON.SUCCESS,
  };
}

export function deleteSeasonByIdRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: DELETE_SEASON_BY_ID.REQUEST,
  };
}

export function deleteSeasonByIdSuccess(data) {
  return {
    data,
    type: DELETE_SEASON_BY_ID.SUCCESS,
  };
}

export function enrollSeasonGetRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: ENROLL_SEASON_GET.REQUEST,
  };
}

export function enrollSeasonGetSuccess(data) {
  return {
    data,
    type: ENROLL_SEASON_GET.SUCCESS,
  };
}

export function enrollSeasonRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ENROLL_SEASON.REQUEST,
  };
}

export function enrollSeasonSuccess(data) {
  return {
    data,
    type: ENROLL_SEASON.SUCCESS,
  };
}

export function cancelEnrollSeasonRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CANCLE_ENROLL_SEASON.REQUEST,
  };
}

export function cancelEnrollSeasonSuccess(data) {
  return {
    data,
    type: CANCLE_ENROLL_SEASON.SUCCESS,
  };
}

export function enrolledSeasonRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ENROLLED_SEASON.REQUEST,
  };
}

export function enrolledSeasonSuccess(data) {
  return {
    data,
    type: ENROLLED_SEASON.SUCCESS,
  };
}

export function seasonAttendeesRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SEASON_ATTENDEES.REQUEST,
  };
}

export function seasonAttendeesSuccess(data) {
  return {
    data,
    type: SEASON_ATTENDEES.SUCCESS,
  };
}

export function seasonInviteRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SEASON_INVITE.REQUEST,
  };
}

export function seasonInviteSuccess(data) {
  return {
    data,
    type: SEASON_INVITE.SUCCESS,
  };
}

