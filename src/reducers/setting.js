// @flow
import Immutable from 'seamless-immutable';
import { SETTING_PAGES } from '../actions/ActionTypes';

const initialState = Immutable({
    settingPages: {},
});

export default (state = initialState, action) => {
    switch (action.type) {
        case SETTING_PAGES.SUCCESS: {
            return Immutable.merge(state, {
                settingPages: action.data,
            });
        }
        default:
            return state;
    }
};