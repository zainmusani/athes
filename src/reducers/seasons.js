// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  DELETE_SEASON_BY_ID,
  ENROLLED_SEASON,
  ENROLL_SEASON_GET,
  GET_OWN_SEASON,
  GET_PUBLIC_SEASON,
  GET_SEASON_BY_ID,
  SEASON_ATTENDEES,
  USER_SIGNOUT,
} from '../actions/ActionTypes';

const initialState = Immutable({
  seasonList: [],
  searchSeasons: [],
  enrollSeasonGetList: [],
  attendeesList: [],
  season: {},
  enrolledSeasons: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case GET_OWN_SEASON.SUCCESS: {
      return Immutable.merge(state, {
        seasonList: action.data,
      });
    }
    case GET_PUBLIC_SEASON.SUCCESS: {
      return Immutable.merge(state, {
        searchSeasons: action.data,
      });
    }
    case GET_SEASON_BY_ID.SUCCESS: {
      return Immutable.merge(state, {
        season: action.data,
      });
    }
    case ENROLL_SEASON_GET.SUCCESS: {
      return Immutable.merge(state, {
        enrollSeasonGetList: action.data,
      });
    }
    case SEASON_ATTENDEES.SUCCESS: {
      return Immutable.merge(state, {
        attendeesList: action.data,
      });
    }
    case DELETE_SEASON_BY_ID.SUCCESS: {
      const season_list = _.cloneDeep(state.seasonList);
      season_list.splice(
        state.seasonList.findIndex(res => res.eventId == action.data),
        1,
      );
      return Immutable.merge(state, {
        seasonList: season_list,
      });
    }
    case ENROLLED_SEASON.SUCCESS: {
      return Immutable.merge(state, {
        enrolledSeasons: action.data,
      });
    }

    default:
      return state;
  }
};
