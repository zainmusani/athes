import { GET_CALENDAR_LIST } from './ActionTypes'
    ;

export function getCalendarListRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_CALENDAR_LIST.REQUEST,
    };
}

export function getCalendarListSuccess(data) {
    return {
        data,
        type: GET_CALENDAR_LIST.SUCCESS,
    };
}
