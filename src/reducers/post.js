// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  ADD_POST,
  ADD_POST_REACTION,
  CREATE_COMMENT,
  DELETE_COMMENT,
  DELETE_POST,
  HIDE_POST,
  EDIT_POST,
  FOLLOWING_REQUEST,
  GET_GALLERY,
  GET_GROUP_POSTS,
  GET_OWN_POSTS_LIST,
  GET_POST_REACTIONS,
  GET_SEASON_POSTS,
  GET_WALL_POSTS_LIST,
  GET_SEARCH_POSTS_LIST,
  GET_WALL_TOP_USERS,
  IS_ADDING,
  USER_SIGNOUT,
  SAVE_RECENT_POSTS,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  addingPost: {},
  wallPosts: [],
  recentPosts: [],
  searchPosts: [],
  topUsers: [],
  postsList: [],
  gallery: [],
  postReactions: {},
  seasonPosts: [],
  groupPostsList: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_ADDING: {
      return Immutable.merge(state, {
        addingPost: action.payload,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    case ADD_POST.SUCCESS: {
      if (action.data.group_id) {
        return Immutable.merge(state, {
          groupPostsList: [action.data, ...state.groupPostsList],
        });
      }

      if (action.data.seasonId) {
        return Immutable.merge(state, {
          seasonPosts: [action.data, ...state.seasonPosts],
        });
      }

      if (!action.data.parent_id) {
        return Immutable.merge(state, {
          postsList: [action.data, ...state.postsList],
          wallPosts: [action.data, ...state.wallPosts],
        });
      }
    }

    case EDIT_POST.SUCCESS: {
      if (action.data.group_id) {
        const group_posts = _.cloneDeep(state.groupPostsList);
        group_posts.splice(
          state.groupPostsList.findIndex(res => res.id == action.data.id),
          1,
          action.data,
        );
        return Immutable.merge(state, {
          groupPostsList: group_posts,
        });
      }

      if (action.data.seasonId) {
        const season_posts = _.cloneDeep(state.seasonPosts);
        season_posts.splice(
          state.seasonPosts.findIndex(res => res.id == action.data.id),
          1,
          action.data,
        );
        return Immutable.merge(state, {
          seasonPosts: season_posts,
        });
      }

      const post_list = _.cloneDeep(state.postsList);
      const wall_list = _.cloneDeep(state.wallPosts);

      post_list.splice(
        state.postsList.findIndex(res => res.id == action.data.id),
        1,
        action.data,
      );

      wall_list.splice(
        state.wallPosts.findIndex(res => res.id == action.data.id),
        1,
        action.data,
      );

      return Immutable.merge(state, {
        postsList: post_list,
        wallPosts: wall_list,
      });
    }

    case DELETE_POST.SUCCESS: {
      const post_list = _.cloneDeep(state.postsList);
      const wall_list = _.cloneDeep(state.wallPosts);
      const season_posts = _.cloneDeep(state.seasonPosts);
      const group_posts = _.cloneDeep(state.groupPostsList);

      post_list.splice(
        state.postsList.findIndex(res => res.id == action.data),
        1,
      );

      wall_list.splice(
        state.wallPosts.findIndex(res => res.id == action.data),
        1,
      );

      season_posts.splice(
        state.seasonPosts.findIndex(res => res.id == action.data.id),
        1,
        action.data,
      );

      group_posts.splice(
        state.groupPostsList.findIndex(res => res.id == action.data.id),
        1,
        action.data,
      );

      return Immutable.merge(state, {
        postsList: post_list,
        wallPosts: wall_list,
        seasonPosts: season_posts,
        groupPostsList: group_posts,
      });
    }

    case HIDE_POST.SUCCESS: {
      const post_list = _.cloneDeep(state.postsList);
      const wall_list = _.cloneDeep(state.wallPosts);
      const season_posts = _.cloneDeep(state.seasonPosts);
      const group_posts = _.cloneDeep(state.groupPostsList);

      post_list.splice(
        state.postsList.findIndex(res => res.id == action.data.postId),
        1,
      );
      wall_list.splice(
        state.wallPosts.findIndex(res => res.id == action.data.postId),
        1,
      );
      season_posts.splice(
        state.seasonPosts.findIndex(res => res.id == action.data.postId),
        1,
        action.data,
      );
      group_posts.splice(
        state.groupPostsList.findIndex(res => res.id == action.data.postId),
        1,
        action.data,
      );

      return Immutable.merge(state, {
        postsList: post_list,
        wallPosts: wall_list,
        seasonPosts: season_posts,
        groupPostsList: group_posts,
      });
    }

    case GET_OWN_POSTS_LIST.SUCCESS: {
      return Immutable.merge(state, {
        postsList: action.data,
      });
    }

    case GET_SEARCH_POSTS_LIST.SUCCESS: {
      return Immutable.merge(state, {
        searchPosts: action.data,
      });
    }

    case GET_WALL_POSTS_LIST.SUCCESS: {
      const statePosts = util.cloneDeepArray(state?.wallPosts);

      const actionData = util.cloneDeepArray(action?.data);
      let recentPosts = util.cloneDeepArray(state?.recentPosts);

      let mergeArray = actionData.posts;
      const {offset} = actionData;

      if (offset > 0) {
        mergeArray = util.unionById(statePosts, actionData.posts);
      }

      if (offset === 0) {
        recentPosts = actionData.posts;
      }

      return Immutable.merge(state, {
        wallPosts: mergeArray,
        recentPosts: recentPosts,
      });
    }

    case FOLLOWING_REQUEST.SUCCESS: {
      if (action.data.follow == 1) {
        return Immutable.merge(state, {
          wallPosts: state.wallPosts,
          topUsers: state.topUsers,
        });
      }

      const wall_list = _.cloneDeep(state.wallPosts);

      const top_users = _.cloneDeep(state.topUsers);

      wall_list.splice(
        state.wallPosts.findIndex(res => res.id == action.data.following_id),
        1,
      );

      top_users.splice(
        state.wallPosts.findIndex(res => res.id == action.data.following_id),
        1,
      );
      return Immutable.merge(state, {
        wallPosts: wall_list,
        topUsers: top_users,
      });
    }

    case GET_WALL_TOP_USERS.SUCCESS: {
      return Immutable.merge(state, {
        topUsers: action.data,
      });
    }

    case GET_GALLERY.SUCCESS: {
      return Immutable.merge(state, {
        gallery: action.data,
      });
    }

    case GET_POST_REACTIONS.SUCCESS: {
      return Immutable.merge(state, {
        postReactions: action.data,
      });
    }

    case ADD_POST_REACTION.SUCCESS: {
      var post_list = _.cloneDeep(state.postsList);
      var wall_list = _.cloneDeep(state.wallPosts);
      var season_posts = _.cloneDeep(state.seasonPosts);

      wall_list = wall_list.filter(obj => {
        if (obj.id === action.data.reaction.postId) {
          obj.react = action.data.count;
        }
        return obj;
      });

      post_list = post_list.filter(obj => {
        if (obj.id === action.data.reaction.postId) {
          obj.react = action.data.count;
        }
        return obj;
      });

      season_posts = season_posts.filter(obj => {
        if (obj.id === action.data.reaction.postId) {
          obj.react = action.data.count;
        }
        return obj;
      });

      return Immutable.merge(state, {
        wallPosts: wall_list,
        postsList: post_list,
        seasonPosts: season_posts,
      });
    }

    case CREATE_COMMENT.SUCCESS: {
      var post_list = _.cloneDeep(state.postsList);
      var wall_list = _.cloneDeep(state.wallPosts);
      var season_posts = _.cloneDeep(state.seasonPosts);

      wall_list = wall_list.filter(obj => {
        if (obj.id === action.data.post_id) {
          obj.comment = action.data.count;
        }
        return obj;
      });

      post_list = post_list.filter(obj => {
        if (obj.id === action.data.post_id) {
          obj.comment = action.data.count;
        }
        return obj;
      });

      season_posts = season_posts.filter(obj => {
        if (obj.id === action.data.post_id) {
          obj.comment = action.data.count;
        }
        return obj;
      });

      return Immutable.merge(state, {
        wallPosts: wall_list,
        postsList: post_list,
        seasonPosts: season_posts,
      });
    }

    case DELETE_COMMENT.SUCCESS: {
      var post_list = _.cloneDeep(state.postsList);
      var wall_list = _.cloneDeep(state.wallPosts);
      var season_posts = _.cloneDeep(state.seasonPosts);

      wall_list = wall_list.filter(obj => {
        if (obj.id === action.data.post_id) {
          obj.comment = action.data.count;
        }
        return obj;
      });

      post_list = post_list.filter(obj => {
        if (obj.id === action.data.post_id) {
          obj.comment = action.data.count;
        }
        return obj;
      });

      season_posts = season_posts.filter(obj => {
        if (obj.id === action.data.post_id) {
          obj.comment = action.data.count;
        }
        return obj;
      });

      return Immutable.merge(state, {
        wallPosts: wall_list,
        postsList: post_list,
        seasonPosts: season_posts,
      });
    }

    case GET_SEASON_POSTS.SUCCESS: {
      return Immutable.merge(state, {
        seasonPosts: action.data,
      });
    }

    case GET_GROUP_POSTS.SUCCESS: {
      return Immutable.merge(state, {
        groupPostsList: action.data,
      });
    }

    default:
      return state;
  }
};

// .count
// .post_id
