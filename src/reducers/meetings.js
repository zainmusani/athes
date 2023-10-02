// @flow
import Immutable from 'seamless-immutable';
import { GET_MEETING, GET_MEETINGS_LIST } from '../actions/ActionTypes';

const initialState = Immutable({
    meetingsList: [],
    meeting: {},
});

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MEETING.SUCCESS: {
            return Immutable.merge(state, {
                meeting: action.data.availablity,
            });
        }
        case GET_MEETINGS_LIST.SUCCESS: {
            return Immutable.merge(state, {
                meetingsList: action.data,
            });
        }
        default:
            return state;
    }
};