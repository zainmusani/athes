import {
  CREATE_GROUP,
  DELETE_GROUP_BY_ID,
  GET_GROUP_BY_ID,
  GET_GROUP_POSTS,
  GET_OWN_GROUPS,
  GROUP_MEMBERS_LIST,
  INVITES_IN_GROUP,
  JOIN_GROUP_BY_NOTIFICATION,
  REMOVE_GROUP_MEMBER,
  UPDATE_GROUP,
} from './ActionTypes';

export function createGroupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_GROUP.REQUEST,
  };
}

export function createGroupSuccess(data) {
  return {
    data,
    type: CREATE_GROUP.SUCCESS,
  };
}

export function updateGroupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_GROUP.REQUEST,
  };
}

export function updateGroupSuccess(data) {
  return {
    data,
    type: UPDATE_GROUP.SUCCESS,
  };
}

export function deleteGroupByIdRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: DELETE_GROUP_BY_ID.REQUEST,
  };
}

export function deleteGroupByIdSuccess(data) {
  return {
    data,
    type: DELETE_GROUP_BY_ID.SUCCESS,
  };
}

export function getOwnGroupsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_OWN_GROUPS.REQUEST,
  };
}

export function getOwnGroupsSuccess(data) {
  return {
    data,
    type: GET_OWN_GROUPS.SUCCESS,
  };
}

export function getGroupByIdRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: GET_GROUP_BY_ID.REQUEST,
  };
}

export function getGroupByIdSuccess(data) {
  return {
    data,
    type: GET_GROUP_BY_ID.SUCCESS,
  };
}

export function invitesInGroupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: INVITES_IN_GROUP.REQUEST,
  };
}

export function invitesInGroupSuccess(data) {
  return {
    data,
    type: INVITES_IN_GROUP.SUCCESS,
  };
}

export function groupMembersListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GROUP_MEMBERS_LIST.REQUEST,
  };
}

export function groupMembersListSuccess(data) {
  return {
    data,
    type: GROUP_MEMBERS_LIST.SUCCESS,
  };
}

export function getGroupPostsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_GROUP_POSTS.REQUEST,
  };
}

export function getGroupPostsSuccess(data) {
  return {
    data,
    type: GET_GROUP_POSTS.SUCCESS,
  };
}

export function removeGroupMemberRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: REMOVE_GROUP_MEMBER.REQUEST,
  };
}

export function removeGroupMemberSuccess(data) {
  return {
    data,
    type: REMOVE_GROUP_MEMBER.SUCCESS,
  };
}

export function joinGroupByNotificationRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: JOIN_GROUP_BY_NOTIFICATION.REQUEST,
  };
}

export function joinGroupByNotificationSucces(data) {
  return {
    data,
    type: JOIN_GROUP_BY_NOTIFICATION.SUCCESS,
  };
}
