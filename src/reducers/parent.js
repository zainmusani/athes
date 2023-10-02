// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  DELETE_CHILD,
  GET_CHILD,
  PARENT_VERIFICATION_STATUS,
  USER_SIGNOUT,
} from '../actions/ActionTypes';

const initialState = Immutable({
  childs: [],
  isVerifiedParent: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHILD.SUCCESS: {
      return Immutable.merge(state, {
        childs: action.data,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    case DELETE_CHILD.SUCCESS: {
      const child_list = _.cloneDeep(state.childs);

      child_list.splice(
        state.childs.findIndex(res => res.id == action.data),
        1,
      );

      return Immutable.merge(state, {
        childs: child_list,
      });
    }

    case PARENT_VERIFICATION_STATUS.SUCCESS: {
      return Immutable.merge(state, {
        isVerifiedParent: action.data.isVerfied,
      });
    }

    default:
      return state;
  }
};
