// @flow

import { ADD_COMMENT_REACTION, CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, EDIT_COMMENTS, GET_COMMENTS, GET_COMMENT_REACTIONS } from './ActionTypes';

export function createCommentRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: CREATE_COMMENT.REQUEST,
    };
}

export function createCommentSuccess(data) {
    return {
        data,
        type: CREATE_COMMENT.SUCCESS,
    };
}

export function getCommentRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_COMMENTS.REQUEST,
    };
}

export function getCommentSuccess(data) {
    return {
        data,
        type: GET_COMMENTS.SUCCESS,
    };
}

export function editCommentRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: EDIT_COMMENT.REQUEST,
    };
}

export function editCommentSuccess(data) {
    return {
        data,
        type: EDIT_COMMENT.SUCCESS,
    };
}

export function deleteCommentRequest(parameter, responseCallback) {
    return {
        parameter,
        responseCallback,
        type: DELETE_COMMENT.REQUEST,
    };
}

export function deleteCommentSuccess(data) {
    return {
        data,
        type: DELETE_COMMENT.SUCCESS,
    };
}

export function addCommentReactionRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: ADD_COMMENT_REACTION.REQUEST,
    };
}

export function addCommentReactionSuccess(data) {
    return {
        data,
        type: ADD_COMMENT_REACTION.SUCCESS,
    };
}


export function getCommentReactionsRequest(payload, responseCallback) {
    return {
        payload,
        responseCallback,
        type: GET_COMMENT_REACTIONS.REQUEST,
    };
}

export function getCommentReactionsSuccess(data) {
    return {
        data,
        type: GET_COMMENT_REACTIONS.SUCCESS,
    };
}