
import { GET_PROFILE } from './ActionTypes';

export function getProfileRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_PROFILE.REQUEST,
    };
}

export function getProfileSuccess(data) {
    return {
        data,
        type: GET_PROFILE.SUCCESS,
    };
}