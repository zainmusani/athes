// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_PROFILE,
  SIGNUP_ADDITIONAL_INFO,
  USER_SIGNOUT,
} from '../actions/ActionTypes';

const initialState = Immutable({
  profileDetail: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE.SUCCESS: {
      return Immutable.merge(state, {
        profileDetail: action.data,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case SIGNUP_ADDITIONAL_INFO.SUCCESS: {
      const user = _.clone(state.profileDetail);
      user.detail = action.data;

      return Immutable.merge(state, {
        profileDetail: {...state.profileDetail, ...user},
      });
    }
    default:
      return state;
  }
};