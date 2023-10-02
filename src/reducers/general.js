// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  AFTERWITHDRAWCARD,
  ATHES_CART,
  COACHING_SEARCH,
  EARNINGS,
  GET_SEARCH_KEYWORDS,
  INVESTMENTS,
  SAVE_DEVICE_TOKEN,
  SET_CURRENT_ACTIVE_SCREEN_NAME,
  SET_SELECTED_TAB,
  SET_USER_ROLE,
  USER_SIGNOUT,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  selectedIndex: 0,
  user_role: '',
  keywordsList: [],
  investments: [],
  earnings: null,
  coaching: null,
  cart: {},
  currentActiveScreenName: '',
  device_token: ''
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_KEYWORDS.SUCCESS: {
      return Immutable.merge(state, {
        keywordsList: action.data,
      });
    }
    case SET_SELECTED_TAB: {
      return Immutable.merge(state, {
        selectedIndex: action.data,
      });
    }

    case SET_USER_ROLE: {
      return Immutable.merge(state, {
        user_role: action.data,
      });
    }

    case INVESTMENTS.SUCCESS: {
      return Immutable.merge(state, {
        investments: action.data,
      });
    }
    case EARNINGS.SUCCESS: {
      return Immutable.merge(state, {
        earnings: action.data,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case AFTERWITHDRAWCARD: {
      let stateData = util.cloneDeep(state.earnings);
      let actionData = action.data;
      stateData['hasAccount'] = actionData;
      return Immutable.merge(state, {
        earnings: stateData,
      });
    }

    case COACHING_SEARCH.SUCCESS: {
      return Immutable.merge(state, {
        coaching: action.data,
      });
    }
    case ATHES_CART: {
      return Immutable.merge(state, {
        cart: action.data,
      });
    }

    case SET_CURRENT_ACTIVE_SCREEN_NAME: {
      return Immutable.merge(state, {
        currentActiveScreenName: action.data,
      });
    }
    case SAVE_DEVICE_TOKEN: {
      return Immutable.merge(state, {
        device_token: action.data,
      });
    }
    default:
      return state;
  }
};
