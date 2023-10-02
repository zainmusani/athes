// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_NOTIFICATIONS_LIST,
  USER_SIGNOUT,
  UNREAD_NOTIFICATIONS_COUNT,
  GET_NOTIFICATIONS,
  NOTIFICATIONS_COUNT,
  NOTIFICATION_COUNT_READ,
  EMPTY_LIST_NOTIFICATION,
  INCREASE_COUNT_NOTIFICATION,
} from '../actions/ActionTypes';
import util from '../util';

const initialState = Immutable({
  notification: [],
  count: 0,
  notificationList: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case GET_NOTIFICATIONS.SUCCESS: {
      const stateNotifications = util.cloneDeepArray(
        state?.notificationList ?? [],
      );

      const actionNotifications = util.cloneDeepArray(action?.data);

      const mergeArray = util.unionById(
        actionNotifications,
        stateNotifications,
      );

      return Immutable.merge(state, {
        notificationList: mergeArray,
      });
    }
    case NOTIFICATIONS_COUNT.SUCCESS: {
      return Immutable.merge(state, {
        count: action.data,
      });
    }
    case NOTIFICATION_COUNT_READ: {
      return Immutable.merge(state, {
        count: 0,
      });
    }
    case EMPTY_LIST_NOTIFICATION: {
      return Immutable.merge(state, {
        notificationList: [],
      });
    }
    case INCREASE_COUNT_NOTIFICATION: {
      const countTMP = util.cloneDeepArray(state.count);
      return Immutable.merge(state, {
        count: countTMP + action.data,
      });
    }
    default:
      return state;
  }
};
