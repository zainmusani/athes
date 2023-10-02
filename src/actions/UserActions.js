// @flow

import {
  USER_SIGNUP,
  USER_SIGNIN,
  USER_SIGNOUT,
  SOCIAL_LOGIN,
  CONFIRM_OTP,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_OTP,
  FORGOT_CHANGE_PASSWORD,
  GET_ROLES,
  UPDATE_ROLE,
  GET_CURRENT_ROLE,
  GET_SPORT_INTREST,
  UPDATE_SPORT_INTREST,
  SIGNUP_ADDITIONAL_INFO,
  GET_FACILITY_LIST,
  UPDATE_FACILITY_LIST,
  GET_PUBLIC_USERS,
  FOLLOWING_REQUEST,
  GET_FOLLOWERS,
  GET_FOLLOWINGS,
  BACK_SCREEN,
  GET_HASHTAGS_LIST,
  GET_INVITE_LIST,
  USER_DELETE,
  AGREE_TERMS,
  GET_USER_DETAIL_BY_ID,
  REFRESH_TOKEN,
} from './ActionTypes';

export function userSignupRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNUP.REQUEST,
  };
}

export function userSignupSuccess(data) {
  return {
    data,
    type: USER_SIGNUP.SUCCESS,
  };
}

export function confirmOTPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CONFIRM_OTP.REQUEST,
  };
}

export function confirmOTPSuccess(data) {
  return {
    data,
    type: CONFIRM_OTP.SUCCESS,
  };
}

export function userSigninRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_SIGNIN.REQUEST,
  };
}

export function userSigninSuccess(data) {
  return {
    data,
    type: USER_SIGNIN.SUCCESS,
  };
}

export function forgotPasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: FORGOT_PASSWORD.REQUEST,
  };
}

export function forgotPasswordSuccess(data) {
  return {
    data,
    type: FORGOT_PASSWORD.SUCCESS,
  };
}

export function forgotPasswordOTPRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: FORGOT_PASSWORD_OTP.REQUEST,
  };
}

export function forgotPasswordOTPSuccess(data) {
  return {
    data,
    type: FORGOT_PASSWORD_OTP.SUCCESS,
  };
}

export function forgotChangePasswordRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: FORGOT_CHANGE_PASSWORD.REQUEST,
  };
}

export function forgotChangePasswordSuccess(data) {
  return {
    data,
    type: FORGOT_CHANGE_PASSWORD.SUCCESS,
  };
}

export function socialLoginRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SOCIAL_LOGIN.REQUEST,
  };
}

export function socialLoginSuccess(data) {
  return {
    data,
    type: SOCIAL_LOGIN.SUCCESS,
  };
}

export function getRolesRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_ROLES.REQUEST,
  };
}

export function getRolesSuccess(data) {
  return {
    data,
    type: GET_ROLES.SUCCESS,
  };
}

export function getCurrentRoleRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_CURRENT_ROLE.REQUEST,
  };
}

export function getCurrentRoleSuccess(data) {
  return {
    data,
    type: GET_CURRENT_ROLE.SUCCESS,
  };
}

export function updateRoleRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_ROLE.REQUEST,
  };
}

export function updateRoleSuccess(data) {
  return {
    data,
    type: UPDATE_ROLE.SUCCESS,
  };
}

export function userSignOutRequest(responseCallback) {
  return {
    responseCallback,
    type: USER_SIGNOUT.REQUEST,
  };
}

export function userSignOutSuccess() {
  return {
    type: USER_SIGNOUT.SUCCESS,
  };
}

export function getFacilityListRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_FACILITY_LIST.REQUEST,
  };
}

export function getFacilityListSuccess(data) {
  return {
    data,
    type: GET_FACILITY_LIST.SUCCESS,
  };
}

export function updateFacilityListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_FACILITY_LIST.REQUEST,
  };
}

export function updateFacilityListSuccess(data) {
  return {
    data,
    type: UPDATE_FACILITY_LIST.SUCCESS,
  };
}

export function getSportIntrestRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_SPORT_INTREST.REQUEST,
  };
}

export function getSportIntrestSuccess(data) {
  return {
    data,
    type: GET_SPORT_INTREST.SUCCESS,
  };
}

export function updateSportIntrestRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_SPORT_INTREST.REQUEST,
  };
}

export function updateSportIntrestSuccess(data) {
  return {
    data,
    type: UPDATE_SPORT_INTREST.SUCCESS,
  };
}

export function signupAdditionalInfoRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: SIGNUP_ADDITIONAL_INFO.REQUEST,
  };
}

export function signupAdditionalInfoSuccess(data) {
  return {
    data,
    type: SIGNUP_ADDITIONAL_INFO.SUCCESS,
  };
}

export function getPublicUsersRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_PUBLIC_USERS.REQUEST,
  };
}

export function getPublicUsersSuccess(data) {
  return {
    data,
    type: GET_PUBLIC_USERS.SUCCESS,
  };
}

export function followingRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: FOLLOWING_REQUEST.REQUEST,
  };
}

export function followingSuccess(data) {
  return {
    data,
    type: FOLLOWING_REQUEST.SUCCESS,
  };
}

export function getFollowersRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_FOLLOWERS.REQUEST,
  };
}

export function getFollowersSuccess(data) {
  return {
    data,
    type: GET_FOLLOWERS.SUCCESS,
  };
}

export function getFollowingsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_FOLLOWINGS.REQUEST,
  };
}

export function getFollowingsSuccess(data) {
  return {
    data,
    type: GET_FOLLOWINGS.SUCCESS,
  };
}

export function backScreen(payload) {
  return {
    payload,
    type: BACK_SCREEN,
  };
}

export function getHashtagsListRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_HASHTAGS_LIST.REQUEST,
  };
}

export function getHashtagsListSuccess(data) {
  return {
    data,
    type: GET_HASHTAGS_LIST.SUCCESS,
  };
}

export function getInviteListRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_INVITE_LIST.REQUEST,
  };
}

export function getInviteListSuccess(data) {
  return {
    data,
    type: GET_INVITE_LIST.SUCCESS,
  };
}

export function deleteUserRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: USER_DELETE.REQUEST,
  };
}

export function deleteUserSuccess(data) {
  return {
    data,
    type: USER_DELETE.SUCCESS,
  };
}

export function agreeTermsRequest(responseCallback) {
  return {
    responseCallback,
    type: AGREE_TERMS.REQUEST,
  };
}

export function getUserDetailByIdRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: GET_USER_DETAIL_BY_ID.REQUEST,
  };
}

export function getUserDetailByIdSuccess(data) {
  return {
    data,
    type: GET_USER_DETAIL_BY_ID.SUCCESS,
  };
}


export function refreshToken(data) {
  return {
    data,
    type: REFRESH_TOKEN,
  };
}
