// @flow

import { ADD_MEETING, BOOK_MEETING, CANCEL_MEETING, DELETE_MEETING, GET_MEETING, GET_MEETINGS_LIST, RESCHEDULE_MEETING, SCHEDULE_MEETING, UPDATE_MEETING } from './ActionTypes';

export function addMeetingRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: ADD_MEETING.REQUEST,
    };
}

export function addMeetingSuccess(data) {
    return {
        data,
        type: ADD_MEETING.SUCCESS,
    };
}

export function getMeetingRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_MEETING.REQUEST,
    };
}

export function getMeetingSuccess(data) {
    return {
        data,
        type: GET_MEETING.SUCCESS,
    };
}

export function getMeetingsListRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_MEETINGS_LIST.REQUEST,
    };
}

export function getMeetingsListSuccess(data) {
    return {
        data,
        type: GET_MEETINGS_LIST.SUCCESS,
    };
}

export function updateMeetingRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: UPDATE_MEETING.REQUEST,
    };
}

export function updateMeetingSuccess(data) {
    return {
        data,
        type: UPDATE_MEETING.SUCCESS,
    };
}

export function bookMeetingRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: BOOK_MEETING.REQUEST,
    };
}

export function bookMeetingSuccess(data) {
    return {
        data,
        type: BOOK_MEETING.SUCCESS,
    };
}

export function deleteMeetingRequest(parameter, responseCallback) {
    return {
        parameter,
        responseCallback,
        type: DELETE_MEETING.REQUEST,
    };
}

export function deleteMeetingSuccess(data) {
    return {
        data,
        type: DELETE_MEETING.SUCCESS,
    };
}

export function scheduleMeetingRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: SCHEDULE_MEETING.REQUEST,
    };
}

export function scheduleMeetingSuccess(data) {
    return {
        data,
        type: SCHEDULE_MEETING.SUCCESS,
    };
}

export function rescheduleMeetingRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: RESCHEDULE_MEETING.REQUEST,
    };
}

export function rescheduleMeetingSuccess(data) {
    return {
        data,
        type: RESCHEDULE_MEETING.SUCCESS,
    };
}

export function cancelMeetingRequest(parameter, responseCallback) {
    return {
        parameter,
        responseCallback,
        type: CANCEL_MEETING.REQUEST,
    };
}

export function cancelMeetingSuccess(data) {
    return {
        data,
        type: CANCEL_MEETING.SUCCESS,
    };
}