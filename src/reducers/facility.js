// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_FACILITIES,
  GET_FACILITY_BY_ID,
  GET_OWN_FACILITIES,
  USER_SIGNOUT,
} from '../actions/ActionTypes';

const initialState = Immutable({
    facilitiesList: [],
    ownFacilitiesList: [],
    ownFacility: {},
    bookedDates: [],
});

export default (state = initialState, action) => {
    switch (action.type) {
      case GET_FACILITIES.SUCCESS: {
        return Immutable.merge(state, {
          facilitiesList: action.data,
        });
      }
      case USER_SIGNOUT.SUCCESS: {
        return Immutable.merge(state, initialState);
      }
      case GET_OWN_FACILITIES.SUCCESS: {
        return Immutable.merge(state, {
          ownFacilitiesList: action.data,
        });
      }
      case GET_FACILITY_BY_ID.SUCCESS: {
        return Immutable.merge(state, {
          ownFacility: action.data.facility,
          bookedDates: action.data.bookedDates,
        });
      }
      default:
        return state;
    }
};
