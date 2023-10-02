import {take, put, call, fork} from 'redux-saga/effects';
import {
  ADD_SEASON,
  DELETE_SEASON_BY_ID,
  ENROLL_SEASON,
  GET_OWN_SEASON,
  GET_PUBLIC_SEASON,
  GET_SEASON_BY_ID,
  UPDATE_SEASON,
  ENROLL_SEASON_GET,
  CANCLE_ENROLL_SEASON,
  ENROLLED_SEASON,
  SEASON_ATTENDEES,
  SEASON_INVITE,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';

import {
  ADD_SEASON as ADD_SEASON_URL,
  GET_OWN_SEASON as GET_OWN_SEASON_URL,
  GET_PUBLIC_SEASON as GET_PUBLIC_SEASON_URL,
  GET_SEASON_BY_ID as GET_SEASON_BY_ID_URL,
  DELETE_SEASON_BY_ID as DELETE_SEASON_BY_ID_URL,
  UPDATE_SEASON as UPDATE_SEASON_URL,
  ENROLL_SEASON as ENROLL_SEASON_URL,
  ENROLL_SEASON_GET as ENROLL_SEASON_GET_URL,
  CANCLE_ENROLL_SEASON as CANCLE_ENROLL_SEASON_URL,
  ENROLLED_SEASON as ENROLLED_SEASON_URL,
  SEASON_ATTENDEES as SEASON_ATTENDEES_URL,
  SEASON_INVITE as SEASON_INVITE_URL,
  callRequest,
} from '../config/WebService';

import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {
  cancelEnrollSeasonSuccess,
  enrolledSeasonSuccess,
  enrollSeasonGetSuccess,
  enrollSeasonRequest,
  getOwnSeasonsSuccess,
  getPublicSeasonsSuccess,
  getSeasonByIdSuccess,
  seasonAttendeesSuccess,
  seasonInviteSuccess,
  updateSeasonSuccess,
} from '../actions/SeasonsActions';
import {
  manipulateEnrolledSeasonsList,
  manipulateSeasonsListData,
} from '../helpers/SeasonHelpers';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* addSeason() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_SEASON.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_SEASON_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(userSignupSuccess(response.data.data));
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

function* getOwnSeasons() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_OWN_SEASON.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_OWN_SEASON_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getOwnSeasonsSuccess(manipulateSeasonsListData(response.data)),
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

function* getPublicSeasons() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_PUBLIC_SEASON.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_PUBLIC_SEASON_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getPublicSeasonsSuccess(manipulateSeasonsListData(response.data)),
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

function* getSeasonById() {
  while (true) {
    const {parameter, responseCallback} = yield take(GET_SEASON_BY_ID.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SEASON_BY_ID_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getSeasonByIdSuccess(response.data));
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

function* updateSeasonById() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_SEASON.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_SEASON_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(updateSeasonSuccess(response.date));
        if (responseCallback) responseCallback(true, null);
        alert(`${response.data.title} updated successfully`, 'success');
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

function* deleteSeasonById() {
  while (true) {
    const {parameter, responseCallback} = yield take(
      DELETE_SEASON_BY_ID.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        DELETE_SEASON_BY_ID_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getSeasonByIdSuccess(parameter));
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

function* enrollSeason() {
  while (true) {
    const {payload, responseCallback} = yield take(ENROLL_SEASON.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ENROLL_SEASON_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(enrollSeasonRequest(response.data));
        if (responseCallback) responseCallback(response.data);
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

function* enrollSeasonGet() {
  while (true) {
    const {parameter, responseCallback} = yield take(ENROLL_SEASON_GET.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ENROLL_SEASON_GET_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(enrollSeasonGetSuccess(response.data));
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

function* cancelEnrollSeason() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CANCLE_ENROLL_SEASON.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CANCLE_ENROLL_SEASON_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(cancelEnrollSeasonSuccess(response.data));
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

function* enrolledSeason() {
  while (true) {
    const {payload, responseCallback} = yield take(ENROLLED_SEASON.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ENROLLED_SEASON_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          enrolledSeasonSuccess(manipulateEnrolledSeasonsList(response.data)),
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

function* seasonAttendees() {
  while (true) {
    const {payload, responseCallback} = yield take(SEASON_ATTENDEES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SEASON_ATTENDEES_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(seasonAttendeesSuccess(response.data));
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

function* seasonInvite() {
  while (true) {
    const {payload, responseCallback} = yield take(SEASON_INVITE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SEASON_INVITE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(seasonInviteSuccess(response.data));
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
  yield fork(addSeason);
  yield fork(getOwnSeasons);
  yield fork(getPublicSeasons);
  yield fork(getSeasonById);
  yield fork(updateSeasonById);
  yield fork(deleteSeasonById);
  yield fork(enrollSeason);
  yield fork(enrollSeasonGet);
  yield fork(cancelEnrollSeason);
  yield fork(enrolledSeason);
  yield fork(seasonAttendees);
  yield fork(seasonInvite);
}
