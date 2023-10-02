// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  ADD_EVENT,
  DELETE_EVENT_BY_ID,
  ENROLL_EVENT_GET,
  GET_EVENT_BY_ID,
  GET_OWN_EVENT,
  GET_PUBLIC_EVENT,
  EVENT_ATTENDEES,
  ENROLLED_EVENTS,
  USER_SIGNOUT,
} from '../actions/ActionTypes';

const initialState = Immutable({
  eventList: [],
  searchEvents: [],
  event: {},
  attendeesList: [],
  enrolledEvents: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case GET_OWN_EVENT.SUCCESS: {
      return Immutable.merge(state, {
        eventList: action.data,
      });
    }
    case GET_PUBLIC_EVENT.SUCCESS: {
      return Immutable.merge(state, {
        searchEvents: action.data,
      });
    }
    case GET_EVENT_BY_ID.SUCCESS: {
      return Immutable.merge(state, {
        event: action.data,
      });
    }
    case EVENT_ATTENDEES.SUCCESS: {
      return Immutable.merge(state, {
        attendeesList: action.data,
      });
    }
    case DELETE_EVENT_BY_ID.SUCCESS: {
      const event_list = _.cloneDeep(state.eventList);
      event_list.splice(
        state.eventList.findIndex(res => res.eventId == action.data),
        1,
      );
      return Immutable.merge(state, {
        eventList: event_list,
      });
    }
    case ENROLLED_EVENTS.SUCCESS: {
      return Immutable.merge(state, {
        enrolledEvents: action.data,
      });
    }
    default:
      return state;
  }
};
