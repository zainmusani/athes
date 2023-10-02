import {call, fork, put, take} from 'redux-saga/effects';
import {
  COACHING_SEARCH,
  EARNINGS,
  GET_SEARCH_KEYWORDS,
  INVESTMENTS,
  PRIVO,
  WITHDRAWAL,
} from '../actions/ActionTypes';
import {
  coachingSearchSuccess,
  earningsSuccess,
  getSearchKeywordsSuccess,
  investmentSuccess,
  privoSuccess,
  withdrawalSuccess,
} from '../actions/GeneralActions';
import {parentVerificationStatusSuccess} from '../actions/ParentActions';
import {
  callRequest,
  GET_SEARCH_KEYWORDS as GET_SEARCH_KEYWORDS_URL,
  PRIVO as PRIVO_URL,
  INVESTMENTS as INVESTMENTS_URL,
  EARNINGS as EARNINGS_URL,
  WITHDRAWAL as WITHDRAWAL_URL,
  COACHING_SEARCH as COACHING_SEARCH_URL,
} from '../config/WebService';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {manipulateInvestmentData} from '../helpers/paymentHelper';
import ApiSauce from '../services/ApiSauce';
import util from '../util';

import {manipulatePublicUsersList} from '../helpers/userHelper';
import {manipulateEventsListData} from '../helpers/EventsHelpers';
import {manipulateSessionsListData} from '../helpers/SessionHelpers';
import {manipulateSeasonsListData} from '../helpers/SeasonHelpers';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* searchKeywords() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_SEARCH_KEYWORDS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SEARCH_KEYWORDS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getSearchKeywordsSuccess(response.data));
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

function* privo() {
  while (true) {
    const {payload, responseCallback} = yield take(PRIVO.REQUEST);
    try {
      const response = yield call(
        callRequest,
        PRIVO_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(parentVerificationStatusSuccess({isVerfied: true}));
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

function* investments() {
  while (true) {
    const {parameter, responseCallback} = yield take(INVESTMENTS.REQUEST);

    try {
      const response = yield call(
        callRequest,
        INVESTMENTS_URL,
        parameter,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(investmentSuccess(manipulateInvestmentData(response.data)));

        if (responseCallback) responseCallback(true, null);
      } else {
        yield put(investmentSuccess([]));
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}
function* earnings() {
  while (true) {
    const {parameter, responseCallback} = yield take(EARNINGS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EARNINGS_URL,
        parameter,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(earningsSuccess(response.data));
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
function* withdrawal() {
  while (true) {
    const {payload, responseCallback} = yield take(WITHDRAWAL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        WITHDRAWAL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(withdrawalSuccess(response.data));
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

function* coachingSearch() {
  while (true) {
    const {payload, responseCallback} = yield take(COACHING_SEARCH.REQUEST);
    try {
      const response = yield call(
        callRequest,
        COACHING_SEARCH_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        response.data.coaches = manipulatePublicUsersList(
          response.data.coaches,
        );
        response.data.event = manipulateEventsListData(response.data.event);
        response.data.session = manipulateSessionsListData(
          response.data.session,
        );
        response.data.season = manipulateSeasonsListData(response.data.season);
        yield put(coachingSearchSuccess(response.data));
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
  yield fork(searchKeywords);
  yield fork(privo);
  yield fork(investments);
  yield fork(earnings);
  yield fork(withdrawal);
  yield fork(coachingSearch);
}
