import {call, fork, put, take} from 'redux-saga/effects';
import {
  ADD_POST,
  ADD_POST_REACTION,
  DELETE_POST,
  EDIT_POST,
  GET_CHILD_POSTS_LIST,
  GET_GALLERY,
  GET_OWN_POSTS_LIST,
  GET_POST_REACTIONS,
  GET_SEARCH_POSTS_LIST,
  GET_SEASON_POSTS,
  GET_VIDEO_SIGNED_URL,
  GET_WALL_POSTS_LIST,
  HIDE_POST,
  REPORT_POST,
  SHARE_POST,
  SINGLE_POST_BY_ID,
  SNOOZE_POST,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';

import {
  ADD_POST as ADD_POST_URL,
  ADD_POST_REACTION as ADD_POST_REACTION_URL,
  callRequest,
  DELETE_POST as DELETE_POST_URL,
  EDIT_POST as EDIT_POST_URL,
  GET_CHILD_POSTS_LIST as GET_CHILD_POSTS_LIST_URL,
  GET_GALLERY as GET_GALLERY_URL,
  GET_OWN_POSTS_LIST as GET_OWN_POSTS_LIST_URL,
  GET_POST_REACTIONS as GET_POST_REACTIONS_URL,
  GET_SEARCH_POSTS_LIST as GET_SEARCH_POSTS_LIST_URL,
  GET_SEASON_POSTS as GET_SEASON_POSTS_URL,
  GET_VIDEO_SIGNED_URL as GET_VIDEO_SIGNED_URL_URL,
  GET_WALL_POSTS_LIST as GET_WALL_POSTS_LIST_URL,
  HIDE_POST as HIDE_POST_URL,
  REPORT_POST as REPORT_POST_URL,
  SHARE_POST as SHARE_POST_URL,
  SINGLE_POST_BY_ID as SINGLE_POST_BY_ID_URL,
  SNOOZE_POST as SNOOZE_POST_URL,
} from '../config/WebService';

import {
  addPostSuccess,
  addReactionSuccess,
  deletePostSuccess,
  editPostSuccess,
  getGallerySuccess,
  getOwnPostsListSuccess,
  getPostReactionsSuccess,
  getSearchPostsListSuccess,
  getSeasonPostsSuccess,
  getVideoSignedUrlSuccess,
  getWallPostsListSuccess,
  getWallTopUsersSuccess,
  hidePostSuccess,
} from '../actions/PostActions';
import {
  manipulateGalleryData,
  manipulatePostData,
  manipulatePostListData,
  manipulatePostReactsData,
} from '../helpers/PostListHelper';
import ApiSauce from '../services/ApiSauce';
import DataHandler from '../services/DataHandler';
import util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* addPost() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_POST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_POST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (DataHandler.getStore().getState().user.data.role) {
          yield put(addPostSuccess(manipulatePostData(response.data)));
        }
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

function* editPost() {
  while (true) {
    const {payload, responseCallback} = yield take(EDIT_POST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        EDIT_POST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (DataHandler.getStore().getState().user.data.role) {
          if (payload.child) {
            response.data.child = payload.child;
          }
          yield put(editPostSuccess(manipulatePostData(response.data)));
        } else {
          yield put(deletePostSuccess(response.data.id));
        }
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

function* deletePost() {
  while (true) {
    const {parameter, responseCallback} = yield take(DELETE_POST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_POST_URL,
        '',
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deletePostSuccess(parameter));
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

function* getOwnPostsList() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_OWN_POSTS_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_OWN_POSTS_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getOwnPostsListSuccess(manipulatePostListData(response.data)),
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

function* getChildPostsList() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_CHILD_POSTS_LIST.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_CHILD_POSTS_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getOwnPostsListSuccess(manipulatePostListData(response.data)),
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

function* getWallPostsList() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_WALL_POSTS_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_WALL_POSTS_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        let wallPostData = {
          offset: payload?.offset,
          posts: manipulatePostListData(response.data?.post),
        };
        yield put(getWallPostsListSuccess(wallPostData));
        yield put(getWallTopUsersSuccess(response.data?.topUser));
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

function* getSignedVideoUrl() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_VIDEO_SIGNED_URL.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_VIDEO_SIGNED_URL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getVideoSignedUrlSuccess(response.data));
        if (responseCallback) responseCallback(response);
      } else {
        if (responseCallback) responseCallback(false, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* getSearchPostsList() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_SEARCH_POSTS_LIST.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_SEARCH_POSTS_LIST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getSearchPostsListSuccess(manipulatePostListData(response.data.post)),
        );
        if (responseCallback) responseCallback(response.data.post);
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

function* hidePost() {
  while (true) {
    const {payload, responseCallback} = yield take(HIDE_POST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        HIDE_POST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(hidePostSuccess(response.data));
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

function* snoozePost() {
  while (true) {
    const {payload, responseCallback} = yield take(SNOOZE_POST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SNOOZE_POST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(addReactionSuccess(response.data));
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

function* addPostReaction() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_POST_REACTION.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_POST_REACTION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(addReactionSuccess(response.data));
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

function* reportPost() {
  while (true) {
    const {payload, responseCallback} = yield take(REPORT_POST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        REPORT_POST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(snoozePostSuccess(response.data));
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

function* getGallery() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_GALLERY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_GALLERY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getGallerySuccess(manipulateGalleryData(response.data)));
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

function* getPostReactions() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_POST_REACTIONS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_POST_REACTIONS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getPostReactionsSuccess(manipulatePostReactsData(response.data)),
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

function* sharePostRequest() {
  while (true) {
    const {payload, responseCallback} = yield take(SHARE_POST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SHARE_POST_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        // yield put(sharePostSuccess(manipulatePostReactsData(response.data)));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert('Noman Ghani ' + err.message);
    }
  }
}

function* getSeasonPosts() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_SEASON_POSTS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_SEASON_POSTS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getSeasonPostsSuccess(manipulatePostListData(response.data)));
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
function* getPostById() {
  while (true) {
    const {params, responseCallback} = yield take(SINGLE_POST_BY_ID.REQUEST);
    try {
      const response = yield call(
        callRequest,
        SINGLE_POST_BY_ID_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(false, null);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(addPost);
  yield fork(editPost);
  yield fork(deletePost);
  yield fork(getOwnPostsList);
  yield fork(getChildPostsList);
  yield fork(addPostReaction);
  yield fork(getPostReactions);
  yield fork(getWallPostsList);
  yield fork(getSearchPostsList);
  yield fork(hidePost);
  yield fork(snoozePost);
  yield fork(reportPost);
  yield fork(getGallery);
  yield fork(sharePostRequest);
  yield fork(getSeasonPosts);
  yield fork(getPostById);
  yield fork(getSignedVideoUrl);
}
