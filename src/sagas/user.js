import {take, put, call, fork} from 'redux-saga/effects';
import {
  USER_SIGNUP,
  CONFIRM_OTP,
  USER_SIGNIN,
  USER_SIGNOUT,
  SOCIAL_LOGIN,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_OTP,
  FORGOT_CHANGE_PASSWORD,
  GET_ROLES,
  GET_CURRENT_ROLE,
  UPDATE_ROLE,
  GET_SPORT_INTREST,
  UPDATE_SPORT_INTREST,
  SIGNUP_ADDITIONAL_INFO,
  GET_FACILITY_LIST,
  UPDATE_FACILITY_LIST,
  GET_PUBLIC_USERS,
  FOLLOWING_REQUEST,
  GET_FOLLOWERS,
  GET_FOLLOWINGS,
  GET_HASHTAGS_LIST,
  GET_INVITE_LIST,
  USER_DELETE,
  AGREE_TERMS,
  GET_USER_DETAIL_BY_ID,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {
  followingSuccess,
  forgotPasswordOTPSuccess,
  getCurrentRoleSuccess,
  getFacilityListSuccess,
  getHashtagsListSuccess,
  getPublicUsersSuccess,
  getRolesSuccess,
  getSportIntrestSuccess,
  signupAdditionalInfoSuccess,
  updateRoleSuccess,
  userSigninSuccess,
  userSignOutSuccess,
  getUserDetailByIdSuccess,
  userSignOutRequest,
} from '../actions/UserActions';
import {
  USER_SIGNUP as USER_SIGNUP_URL,
  USER_DELETE as USER_DELETE_URL,
  USER_SIGNIN as USER_SIGNIN_URL,
  FORGOT_PASSWORD as FORGOT_PASSWORD_URL,
  SOCIAL_LOGIN as SOCIAL_LOGIN_URL,
  CONFIRM_OTP as CONFIRM_OTP_URL,
  FORGOT_PASSWORD_OTP as FORGOT_PASSWORD_OTP_URL,
  FORGOT_CHANGE_PASSWORD as FORGOT_CHANGE_PASSWORD_URL,
  GET_ROLES as GET_ROLES_URL,
  GET_CURRENT_ROLE as GET_CURRENT_ROLE_URL,
  UPDATE_ROLE as UPDATE_ROLE_URL,
  GET_SPORT_INTREST as GET_SPORT_INTREST_URL,
  UPDATE_SPORT_INTREST as UPDATE_SPORT_INTREST_URL,
  SIGNUP_ADDITIONAL_INFO as SIGNUP_ADDITIONAL_INFO_URL,
  GET_FACILITY_LIST as GET_FACILITY_LIST_URL,
  UPDATE_FACILITY_LIST as UPDATE_FACILITY_LIST_URL,
  GET_PUBLIC_USERS as GET_PUBLIC_USERS_URL,
  FOLLOWING_REQUEST as FOLLOWING_REQUEST_URL,
  GET_FOLLOWERS as GET_FOLLOWERS_URL,
  GET_FOLLOWINGS as GET_FOLLOWINGS_URL,
  GET_INVITE_LIST as GET_INVITE_LIST_URL,
  GET_HASHTAGS_LIST as GET_HASHTAGS_LIST_URL,
  AGREE_TERMS as AGREE_TERMS_URL,
  GET_USER_DETAIL_BY_ID as GET_USER_DETAIL_BY_ID_URL,
  USER_SIGNOUT as USER_SIGNOUT_URL,
  callRequest,
} from '../config/WebService';

import ApiSauce from '../services/ApiSauce';
import {
  manipulateFacilityListData,
  manipulateHashtagsData,
  manipulateLoggedInUserData,
  manipulatePublicUsersList,
  manipulateSportIntrestData,
  manipulateUerRolesData,
} from '../helpers/userHelper';
import util from '../util';
import {Actions} from 'react-native-router-flux';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* signup() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        // yield put(userSigninSuccess(manipulateLoggedInUserData(response.data)));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      // alert(err.message);
    }
  }
}

function* deleteUser() {
  while (true) {
    const {parameter, responseCallback} = yield take(USER_DELETE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_DELETE_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          userSignOutRequest(res => {
            if (res) Actions.reset('login');
          }),
        );
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* confirm_otp() {
  while (true) {
    const {payload, responseCallback} = yield take(CONFIRM_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CONFIRM_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(userSigninSuccess(manipulateLoggedInUserData(response.data)));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}

function* signin() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(userSigninSuccess(manipulateLoggedInUserData(response.data)));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* forgot_password() {
  while (true) {
    const {payload, responseCallback} = yield take(FORGOT_PASSWORD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        FORGOT_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(
        //   userSigninSuccess(manipulateLoggedInUserData(response.data.data)),
        // );
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* forgot_password_otp() {
  while (true) {
    const {payload, responseCallback} = yield take(FORGOT_PASSWORD_OTP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        FORGOT_PASSWORD_OTP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        let newPayload = {email: payload.email, token: response.data};
        yield put(forgotPasswordOTPSuccess(newPayload));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}

function* forgot_change_password() {
  while (true) {
    const {payload, responseCallback} = yield take(
      FORGOT_CHANGE_PASSWORD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        FORGOT_CHANGE_PASSWORD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(forgotChangePasswordSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, err);
      alert(err.message);
    }
  }
}

function* getRoles() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_ROLES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ROLES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getRolesSuccess(manipulateUerRolesData(response.data)));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      alert(err.message);
    }
  }
}

function* getCurrentRole() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_CURRENT_ROLE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_CURRENT_ROLE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getCurrentRoleSuccess(response.data[0]));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      // alert(err.message);
    }
  }
}

function* updateRole() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_ROLE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_ROLE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(updateRoleSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      alert(err.message);
    }
  }
}

function* socialLogin() {
  while (true) {
    const {payload, responseCallback} = yield take(SOCIAL_LOGIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SOCIAL_LOGIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(userSigninSuccess(manipulateLoggedInUserData(response.data)));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
        yield put(
          userSignOutRequest(res => {
            if (res) Actions.reset('login');
          }),
        );
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, null);
      alert(err.message);
      yield put(
        userSignOutRequest(res => {
          if (res) Actions.reset('login');
        }),
      );
    }
  }
}

function* getFacilityList() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_FACILITY_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_FACILITY_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getFacilityListSuccess(manipulateFacilityListData(response.data)),
        );
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      alert(err.message);
    }
  }
}

function* updateFacilityList() {
  while (true) {
    const {payload, responseCallback} = yield take(
      UPDATE_FACILITY_LIST.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        UPDATE_FACILITY_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        // yield put(updateRoleSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      alert(err.message);
    }
  }
}

function* getSportIntrest() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_SPORT_INTREST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SPORT_INTREST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getSportIntrestSuccess(manipulateSportIntrestData(response.data)),
        );
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      alert(err.message);
    }
  }
}

function* updateSportIntrest() {
  while (true) {
    const {payload, responseCallback} = yield take(
      UPDATE_SPORT_INTREST.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        UPDATE_SPORT_INTREST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        // yield put(updateRoleSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      alert(err.message);
    }
  }
}

function* signupAdditionalInfo() {
  while (true) {
    const {payload, responseCallback} = yield take(
      SIGNUP_ADDITIONAL_INFO.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        SIGNUP_ADDITIONAL_INFO_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(signupAdditionalInfoSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      alert(err.message);
    }
  }
}

function* getPublicUsers() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_PUBLIC_USERS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PUBLIC_USERS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getPublicUsersSuccess(manipulatePublicUsersList(response.data)),
        );
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      // alert(err.message);
    }
  }
}

function* followingRequest() {
  while (true) {
    const {payload, responseCallback} = yield take(FOLLOWING_REQUEST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        FOLLOWING_REQUEST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(followingSuccess(payload));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      // alert(err.message);
    }
  }
}

function* getFollowers() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_FOLLOWERS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_FOLLOWERS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getPublicUsersSuccess(manipulatePublicUsersList(response.data)),
        );
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      // alert(err.message);
    }
  }
}

function* getFollowings() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_FOLLOWINGS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_FOLLOWINGS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getPublicUsersSuccess(manipulatePublicUsersList(response.data)),
        );
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      // alert(err.message);
    }
  }
}

function* getInviteList() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_INVITE_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_INVITE_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getPublicUsersSuccess(manipulatePublicUsersList(response.data)),
        );
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      // alert(err.message);
    }
  }
}

function* getHashtagsList() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_HASHTAGS_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_HASHTAGS_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getHashtagsListSuccess(manipulateHashtagsData(response.data)),
        );
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      alert(err.message);
    }
  }
}

function* agreeTerms() {
  while (true) {
    const {responseCallback} = yield take(AGREE_TERMS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        AGREE_TERMS_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      alert(err.message);
    }
  }
}

function* getUserDetailById() {
  while (true) {
    const {parameter, responseCallback} = yield take(
      GET_USER_DETAIL_BY_ID.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_USER_DETAIL_BY_ID_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(getUserDetailByIdSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
      // alert(err.message);
    }
  }
}

function* signoutUser() {
  while (true) {
    const {responseCallback} = yield take(USER_SIGNOUT.REQUEST);
    const payload = {
      token: util.getCurrentUserAccessToken(),
      device_token: util.getDeviceToken(),
    };
    try {
      const response = yield call(
        callRequest,
        USER_SIGNOUT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(userSignOutSuccess());
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false, {});
    }
  }
}

export default function* root() {
  yield fork(signup);
  yield fork(signoutUser);
  yield fork(deleteUser);
  yield fork(confirm_otp);
  yield fork(signin);
  yield fork(forgot_password);
  yield fork(forgot_password_otp);
  yield fork(forgot_change_password);
  yield fork(getRoles);
  yield fork(getCurrentRole);
  yield fork(updateRole);
  yield fork(socialLogin);
  yield fork(getFacilityList);
  yield fork(updateFacilityList);
  yield fork(getSportIntrest);
  yield fork(updateSportIntrest);
  yield fork(signupAdditionalInfo);
  yield fork(getPublicUsers);
  yield fork(followingRequest);
  yield fork(getFollowers);
  yield fork(getFollowings);
  yield fork(getInviteList);
  yield fork(getHashtagsList);
  yield fork(agreeTerms);
  yield fork(getUserDetailById);
}
