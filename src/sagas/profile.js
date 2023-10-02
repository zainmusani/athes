import { call, fork, put, take } from 'redux-saga/effects';
import { GET_PROFILE } from '../actions/ActionTypes';
import { getProfileSuccess } from '../actions/ProfileActions';
import {
    callRequest, GET_PROFILE as GET_PROFILE_URL
} from '../config/WebService';
import { SAGA_ALERT_TIMEOUT } from '../constants';
import {manipulateUserProfileData} from '../helpers/userHelper';
import ApiSauce from '../services/ApiSauce';
import util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getProfileSuccess(manipulateUserProfileData(response.data)));
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

export default function* root() {
    yield fork(getProfile);
}
