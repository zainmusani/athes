
import {
  CREATE_TEAM_EVENTS,
  DELETE_TEAM_EVENT_BY_ID,
  DELETE_TEAM_MEMBER,
  EDIT_TEAM_EVENTS,
  ENROLL_TEAM_EVENT,
  GET_TEAM_EVENT_BY_ID,
  INVITE_TEAM,
  INVITE_TEAM_EVENT,
  JOIN_TEAM,
  TEAM_MEMBERS_LIST,
  UPDATE_TEAM_MEMBER_STATUS,
  USER_TEAMS_LIST,
} from './ActionTypes';

export function userTeamsListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_TEAMS_LIST.REQUEST,
  };
}

export function userTeamsListSuccess(data) {
  return {
    data,
    type: USER_TEAMS_LIST.SUCCESS,
  };
}

export function teamMembersListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: TEAM_MEMBERS_LIST.REQUEST,
  };
}

export function teamMembersListSuccess(data) {
  return {
    data,
    type: TEAM_MEMBERS_LIST.SUCCESS,
  };
}

export function joinTeamRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: JOIN_TEAM.REQUEST,
  };
}

export function joinTeamSuccess(data) {
  return {
    data,
    type: JOIN_TEAM.SUCCESS,
  };
}

export function inviteTeamRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: INVITE_TEAM.REQUEST,
  };
}

export function inviteTeamSuccess(data) {
  return {
    data,
    type: INVITE_TEAM.SUCCESS,
  };
}

export function updateTeamMemberStatusRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_TEAM_MEMBER_STATUS.REQUEST,
  };
}

export function updateTeamMemberStatusSuccess(data) {
  return {
    data,
    type: UPDATE_TEAM_MEMBER_STATUS.SUCCESS,
  };
}

export function deleteTeamMemberRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: DELETE_TEAM_MEMBER.REQUEST,
  };
}

export function deleteTeamMemberSuccess(data) {
  return {
    data,
    type: DELETE_TEAM_MEMBER.SUCCESS,
  };
}

export function createTeamEventRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_TEAM_EVENTS.REQUEST,
  };
}

export function createTeamEventSuccess(data) {
  return {
    data,
    type: CREATE_TEAM_EVENTS.SUCCESS,
  };
}

export function getTeamEventByIdRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_TEAM_EVENT_BY_ID.REQUEST,
  };
}

export function getTeamEventByIdSuccess(data) {
  return {
    data,
    type: GET_TEAM_EVENT_BY_ID.SUCCESS,
  };
}

export function editTeamEventRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EDIT_TEAM_EVENTS.REQUEST,
  };
}

export function editTeamEventSuccess(data) {
  return {
    data,
    type: EDIT_TEAM_EVENTS.SUCCESS,
  };
}
export function deleteTeamEventByIdRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: DELETE_TEAM_EVENT_BY_ID.REQUEST,
  };
}

export function deleteTeamEventByIdSuccess(data) {
  return {
    data,
    type: DELETE_TEAM_EVENT_BY_ID.SUCCESS,
  };
}

export function teamEventInviteRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: INVITE_TEAM_EVENT.REQUEST,
  };
}

export function teamEventInviteSuccess(data) {
  return {
    data,
    type: INVITE_TEAM_EVENT.SUCCESS,
  };
}

export function enrollTeamEventRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ENROLL_TEAM_EVENT.REQUEST,
  };
}

export function enrollTeamEventSuccess(data) {
  return {
    data,
    type: ENROLL_TEAM_EVENT.SUCCESS,
  };
}