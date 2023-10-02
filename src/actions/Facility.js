// @flow

import { ADD_FACILITY, BOOK_FACILITY, DELETE_FACILITY_BY_ID, GET_FACILITIES, GET_FACILITY_BY_ID, GET_OWN_FACILITIES, UNBOOK_FACILITY, UPDATE_FACILITY } from './ActionTypes';

export function getFacilitiesRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_FACILITIES.REQUEST,
    };
}

export function getFacilitiesSuccess(data) {
    return {
        data,
        type: GET_FACILITIES.SUCCESS,
    };
}

export function addFacilityRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: ADD_FACILITY.REQUEST,
    };
}

export function addFacilitySuccess(data) {
    return {
        data,
        type: ADD_FACILITY.SUCCESS,
    };
}

export function updateFacilityRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: UPDATE_FACILITY.REQUEST,
    };
}

export function updateFacilitySuccess(data) {
    return {
        data,
        type: UPDATE_FACILITY.SUCCESS,
    };
}


export function deleteFacilityByIdRequest(parameter, responseCallback) {
    return {
        parameter,
        responseCallback,
        type: DELETE_FACILITY_BY_ID.REQUEST,
    };
}

export function deleteFacilityByIdSuccess(data) {
    return {
        data,
        type: DELETE_FACILITY_BY_ID.SUCCESS,
    };
}

export function getOwnFacilitiesRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_OWN_FACILITIES.REQUEST,
    };
}

export function getOwnFacilitiesSuccess(data) {
    return {
        data,
        type: GET_OWN_FACILITIES.SUCCESS,
    };
}

export function bookFacilityRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: BOOK_FACILITY.REQUEST,
    };
}

export function bookFacilitySuccess(data) {
    return {
        data,
        type: BOOK_FACILITY.SUCCESS,
    };
}

export function unBookFacilityRequest(parameter, responseCallback) {
    return {
        parameter,
        responseCallback,
        type: UNBOOK_FACILITY.REQUEST,
    };
}

export function unBookFacilitySuccess(data) {
    return {
        data,
        type: UNBOOK_FACILITY.SUCCESS,
    };
}

export function getFacilityByIdRequest(parameter, responseCallback) {
    return {
        parameter,
        responseCallback,
        type: GET_FACILITY_BY_ID.REQUEST,
    };
}

export function getFacilityByIdSuccess(data) {
    return {
        data,
        type: GET_FACILITY_BY_ID.SUCCESS,
    };
}