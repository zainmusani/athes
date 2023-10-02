// @flow
import Immutable from "seamless-immutable";
import _ from "lodash";
import {
  ADD_COMMENT_REACTION,
  GET_COMMENTS, GET_COMMENT_REACTIONS,
} from "../actions/ActionTypes";

const initialState = Immutable({
  postCommentsList: [],
  commentReactions: {},
  commentReactionsCount: 0
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS.SUCCESS: {
      return Immutable.merge(state, {
        postCommentsList: action.data,
      });
    }
    case GET_COMMENT_REACTIONS.SUCCESS: {
      return Immutable.merge(state, {
        commentReactions: action.data,
      });
    }
    case ADD_COMMENT_REACTION.SUCCESS: {
      var postCommentsList = _.cloneDeep(state.postCommentsList);

      postCommentsList = postCommentsList.filter(obj => {
        if (obj.comment.id === action.data.reaction.commentId) {
          obj.comment.react = action.data.count;
        } else {
          obj.child.filter(obj => {
            if (obj.id === action.data.reaction.commentId) obj.react = action.data.count;
          });
        };
        return obj;
      });

      return Immutable.merge(state, {
        postCommentsList: postCommentsList,
      });
    }
    default:
      return state;
  }
};