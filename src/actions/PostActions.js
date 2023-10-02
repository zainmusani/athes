// @flow

import {
  ADD_POST,
  ADD_POST_REACTION,
  DELETE_POST,
  EDIT_POST,
  GET_CHILD_POSTS_LIST,
  GET_GALLERY,
  GET_OWN_POSTS_LIST,
  GET_POST_REACTIONS,
  GET_SEARCH_POSTS_LIST,
  GET_SEASON_POSTS,
  GET_VIDEO_SIGNED_URL,
  GET_WALL_POSTS_LIST,
  GET_WALL_TOP_USERS,
  HIDE_POST,
  IS_ADDING,
  REPORT_POST,
  SHARE_POST,
  SINGLE_POST_BY_ID,
  SNOOZE_POST,
} from './ActionTypes';

export function addPostRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_POST.REQUEST,
  };
}

export function addPostSuccess(data) {
  return {
    data,
    type: ADD_POST.SUCCESS,
  };
}

export function editPostRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: EDIT_POST.REQUEST,
  };
}

export function editPostSuccess(data) {
  return {
    data,
    type: EDIT_POST.SUCCESS,
  };
}

export function deletePostRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: DELETE_POST.REQUEST,
  };
}

export function deletePostSuccess(data) {
  return {
    data,
    type: DELETE_POST.SUCCESS,
  };
}

export function isAddingPost(payload) {
  return {
    payload,
    type: IS_ADDING,
  };
}

export function getOwnPostsListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_OWN_POSTS_LIST.REQUEST,
  };
}

export function getOwnPostsListSuccess(data) {
  return {
    data,
    type: GET_OWN_POSTS_LIST.SUCCESS,
  };
}

export function getChildPostsListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_CHILD_POSTS_LIST.REQUEST,
  };
}

export function getChildPostsListSuccess(data) {
  return {
    data,
    type: GET_CHILD_POSTS_LIST.SUCCESS,
  };
}

export function addReactionRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_POST_REACTION.REQUEST,
  };
}

export function addReactionSuccess(data) {
  return {
    data,
    type: ADD_POST_REACTION.SUCCESS,
  };
}

export function getWallPostsListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_WALL_POSTS_LIST.REQUEST,
  };
}

export function getWallPostsListSuccess(data) {
  return {
    data,
    type: GET_WALL_POSTS_LIST.SUCCESS,
  };
}

export function getSearchPostsListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_SEARCH_POSTS_LIST.REQUEST,
  };
}

export function getSearchPostsListSuccess(data) {
  return {
    data,
    type: GET_SEARCH_POSTS_LIST.SUCCESS,
  };
}

export function getWallTopUsersSuccess(data) {
  return {
    data,
    type: GET_WALL_TOP_USERS.SUCCESS,
  };
}

export function getPostReactionsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_POST_REACTIONS.REQUEST,
  };
}

export function getPostReactionsSuccess(data) {
  return {
    data,
    type: GET_POST_REACTIONS.SUCCESS,
  };
}

export function hidePostRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: HIDE_POST.REQUEST,
  };
}

export function hidePostSuccess(data) {
  return {
    data,
    type: HIDE_POST.SUCCESS,
  };
}

export function snoozePostRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SNOOZE_POST.REQUEST,
  };
}

export function snoozePostSuccess(data) {
  return {
    data,
    type: SNOOZE_POST.SUCCESS,
  };
}

export function reportPostRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REPORT_POST.REQUEST,
  };
}

export function getGalleryRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_GALLERY.REQUEST,
  };
}

export function getGallerySuccess(data) {
  return {
    data,
    type: GET_GALLERY.SUCCESS,
  };
}

export function sharePostRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SHARE_POST.REQUEST,
  };
}

export function sharePostSuccess(data) {
  return {
    data,
    type: SHARE_POST.SUCCESS,
  };
}

export function getSeasonPostsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_SEASON_POSTS.REQUEST,
  };
}

export function getSeasonPostsSuccess(data) {
  return {
    data,
    type: GET_SEASON_POSTS.SUCCESS,
  };
}
export function getSinglePostByIdRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: SINGLE_POST_BY_ID.REQUEST,
  };
}

export function getSinglePostByIdSuccess(data) {
  return {
    data,
    type: SINGLE_POST_BY_ID.SUCCESS,
  };
}
export function getVideoSignedUrlRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_VIDEO_SIGNED_URL.REQUEST,
  };
}

export function getVideoSignedUrlSuccess(data) {
  return {
    data,
    type: GET_VIDEO_SIGNED_URL.SUCCESS,
  };
}
