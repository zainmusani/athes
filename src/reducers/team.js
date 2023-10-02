// @flow
import Immutable from 'seamless-immutable';
import {
  GET_TEAM_EVENT_BY_ID,
  TEAM_MEMBERS_LIST,
  USER_TEAMS_LIST,
} from '../actions/ActionTypes';

const initialState = Immutable({
  teamMembersList: [],
  userTeamsList: [],
  teamEvent: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case TEAM_MEMBERS_LIST.SUCCESS: {
      return Immutable.merge(state, {
        teamMembersList: action.data,
      });
    }
    case USER_TEAMS_LIST.SUCCESS: {
      return Immutable.merge(state, {
        userTeamsList: action.data,
      });
    }
    case GET_TEAM_EVENT_BY_ID.SUCCESS: {
      return Immutable.merge(state, {
        teamEvent: action.data,
      });
    }
    default:
      return state;
  }
};