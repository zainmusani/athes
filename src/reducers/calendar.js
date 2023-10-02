// @flow
import Immutable from 'seamless-immutable';
import {GET_CALENDAR_LIST, USER_SIGNOUT} from '../actions/ActionTypes';

const initialState = Immutable({
    calendarList: {},
});

export default (state = initialState, action) => {
    switch (action.type) {
      case GET_CALENDAR_LIST.SUCCESS: {
        return Immutable.merge(state, {
          calendarList: action.data,
        });
      }
      case USER_SIGNOUT.SUCCESS: {
        return Immutable.merge(state, initialState);
      }
      default:
        return state;
    }
};