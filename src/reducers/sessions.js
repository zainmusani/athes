// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  DELETE_SESSION_BY_ID,
  ENROLLED_SESSION,
  ENROLL_SESSION_GET,
  GET_OWN_SESSION,
  GET_PUBLIC_SESSION,
  GET_SESSION_BY_ID,
  SESSION_ATTENDEES,
  USER_SIGNOUT,
} from '../actions/ActionTypes';

const initialState = Immutable({
  sessionList: [],
  searchSessions: [],
  attendeesList: [],
  session: {},
  enrolledSessions: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case GET_OWN_SESSION.SUCCESS: {
      return Immutable.merge(state, {
        sessionList: action.data,
      });
    }
    case GET_PUBLIC_SESSION.SUCCESS: {
      return Immutable.merge(state, {
        searchSessions: action.data,
      });
    }
    case GET_SESSION_BY_ID.SUCCESS: {
      return Immutable.merge(state, {
        session: action.data,
      });
    }
    case SESSION_ATTENDEES.SUCCESS: {
      return Immutable.merge(state, {
        attendeesList: action.data,
      });
    }
    case DELETE_SESSION_BY_ID.SUCCESS: {
      const session_list = _.cloneDeep(state.sessionList);
      session_list.splice(
        state.sessionList.findIndex(res => res.eventId == action.data),
        1,
      );
      return Immutable.merge(state, {
        sessionList: session_list,
      });
    }
    case ENROLLED_SESSION.SUCCESS: {
      return Immutable.merge(state, {
        enrolledSessions: action.data,
      });
    }

    default:
      return state;
  }
};
