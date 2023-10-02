import { take, put, call, fork } from 'redux-saga/effects';
import { GET_CALENDAR_LIST } from '../actions/ActionTypes';
import { SAGA_ALERT_TIMEOUT } from '../constants';

import {
    GET_CALENDAR_LIST as GET_CALENDAR_LIST_URL,
    callRequest
} from '../config/WebService';

import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {getCalendarListSuccess} from '../actions/CalendarActions';
import {manipulateCalendarListData} from '../helpers/calendarHelper';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* getCalendarList() {
    while (true) {
        const { payload, responseCallback } = yield take(GET_CALENDAR_LIST.REQUEST);
        try {
            const response = yield call(
                callRequest,
                GET_CALENDAR_LIST_URL,
                payload,
                '',
                {},
                ApiSauce,
            );
            if (response.status) {
                yield put(getCalendarListSuccess(manipulateCalendarListData(response.data)));
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
    yield fork(getCalendarList);
}
