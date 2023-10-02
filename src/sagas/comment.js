import { take, put, call, fork } from 'redux-saga/effects';
import {
    ADD_CHILD,
    ADD_COMMENT_REACTION,
    CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, GET_COMMENTS, GET_COMMENT_REACTIONS
} from '../actions/ActionTypes';
import { SAGA_ALERT_TIMEOUT } from '../constants';

import {
    CREATE_COMMENT as CREATE_COMMENT_URL,
    GET_COMMENTS as GET_COMMENTS_URL,
    EDIT_COMMENT as EDIT_COMMENT_URL,
    DELETE_COMMENT as DELETE_COMMENT_URL,
    GET_COMMENT_REACTIONS as GET_COMMENT_REACTIONS_URL,
    ADD_COMMENT_REACTION as ADD_COMMENT_REACTION_URL,
    callRequest,
} from '../config/WebService';

import { manipulatePostReactsData } from '../helpers/PostListHelper';

import ApiSauce from '../services/ApiSauce';
import util from '../util';
import {
  addCommentReactionSuccess,
  createCommentSuccess,
  deleteCommentSuccess,
  editCommentSuccess,
  getCommentReactionsSuccess,
  getCommentSuccess,
} from '../actions/commentAction';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* createComment() {
    while (true) {
        const { payload, responseCallback } = yield take(CREATE_COMMENT.REQUEST);
        try {
            const response = yield call(
                callRequest,
                CREATE_COMMENT_URL,
                payload,
                '',
                {},
                ApiSauce,
            );
            if (response.status) {
                yield put(createCommentSuccess(response.data));
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

function* getComments() {
    while (true) {
        const { payload, responseCallback } = yield take(GET_COMMENTS.REQUEST);
        try {
            const response = yield call(
                callRequest,
                GET_COMMENTS_URL,
                payload,
                '',
                {},
                ApiSauce,
            );
            if (response.status) {
                yield put(getCommentSuccess(response.data));
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

function* editComments() {
    while (true) {
        const { payload, responseCallback } = yield take(EDIT_COMMENT.REQUEST);
        try {
            const response = yield call(
                callRequest,
                EDIT_COMMENT_URL,
                payload,
                '',
                {},
                ApiSauce,
            );
            if (response.status) {
                yield put(editCommentSuccess(response.data));
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


function* deleteComment() {
    while (true) {
        const { parameter, responseCallback } = yield take(DELETE_COMMENT.REQUEST);
        try {
            const response = yield call(
                callRequest,
                DELETE_COMMENT_URL,
                '',
                parameter,
                {},
                ApiSauce,
            );
            if (response.status) {
                yield put(deleteCommentSuccess(response.data));
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

function* addCommentReaction() {
    while (true) {
        const { payload, responseCallback } = yield take(ADD_COMMENT_REACTION.REQUEST);
        try {
            const response = yield call(
                callRequest,
                ADD_COMMENT_REACTION_URL,
                payload,
                '',
                {},
                ApiSauce,
            );
            if (response.status) {
                yield put(addCommentReactionSuccess(response.data));
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


function* getCommentReactions() {
    while (true) {
        const { payload, responseCallback } = yield take(GET_COMMENT_REACTIONS.REQUEST);
        try {
            const response = yield call(
                callRequest,
                GET_COMMENT_REACTIONS_URL,
                payload,
                '',
                {},
                ApiSauce,
            );
            if (response.status) {
                yield put(getCommentReactionsSuccess(manipulatePostReactsData(response.data)));
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
    yield fork(createComment);
    yield fork(getComments);
    yield fork(editComments);
    yield fork(deleteComment);
    yield fork(addCommentReaction);
    yield fork(getCommentReactions);
}
