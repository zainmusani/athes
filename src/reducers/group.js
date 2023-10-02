// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_GROUP_BY_ID,
  GET_OWN_GROUPS,
  GROUP_MEMBERS_LIST,
} from '../actions/ActionTypes';

const initialState = Immutable({
  ownGroupsList: [],
  groupMemberList: [],

  ownGroup: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_OWN_GROUPS.SUCCESS: {
      return Immutable.merge(state, {
        ownGroupsList: action.data,
      });
    }
    case GET_GROUP_BY_ID.SUCCESS: {
      return Immutable.merge(state, {
        ownGroup: action.data.group,
      });
    }
    case GROUP_MEMBERS_LIST.SUCCESS: {
      return Immutable.merge(state, {
        groupMemberList: action.data,
      });
    }

    default:
      return state;
  }
};