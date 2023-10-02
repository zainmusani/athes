// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  USER_SIGNIN,
  USER_SIGNUP,
  USER_SIGNOUT,
  FORGOT_PASSWORD_OTP,
  GET_ROLES,
  UPDATE_ROLE,
  GET_CURRENT_ROLE,
  GET_SPORT_INTREST,
  GET_FACILITY_LIST,
  GET_PUBLIC_USERS,
  FOLLOWING_REQUEST,
  BACK_SCREEN,
  SIGNUP_ADDITIONAL_INFO,
  GET_HASHTAGS_LIST,
  GET_USER_DETAIL_BY_ID,
  GET_PROFILE,
  REFRESH_TOKEN,
} from '../actions/ActionTypes';

const initialState = Immutable({
  data: {},
  accessToken: null,
  backScreen: '',
  email: '',
  roles: [],
  sportIntrests: [],
  facilityList: [],
  hastagsList: [],
  publicUsers: [],
  userByIdDetail: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case BACK_SCREEN: {
      return Immutable.merge(state, {
        backScreen: action.payload,
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case USER_SIGNIN.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }

    case REFRESH_TOKEN: {
      let newData = _.cloneDeep(state.data);
      newData.access_token = action.data.access_token;
      newData.refresh_token = action.data.refresh_token;

      return Immutable.merge(state, {
        data: newData,
      });
    }

    case USER_SIGNUP.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case GET_PROFILE.SUCCESS: {
      const user = _.cloneDeep(state.data);

      if (action.data.user.id == user.id && user.role != null) {
        user.name = action.data.user.name;
        if (action.data.role_id == 4) {
          user.name = action.data.user.detail.team_name;
        }
        if (action.data.role_id == 5) {
          user.name = action.data.user.detail.organization_name;
        }

        user.image = action.data.user?.image;
      }
      return Immutable.merge(state, {
        data: {...state.data, ...user},
      });
    }

    case SIGNUP_ADDITIONAL_INFO.SUCCESS: {
      const user = _.clone(state.data);
      user.image = action.data.photo;
      return Immutable.merge(state, {
        data: {...state.data, ...user},
      });
    }

    case FORGOT_PASSWORD_OTP.SUCCESS: {
      return Immutable.merge(state, {
        accessToken: action.data.token,
        email: action.data.email,
      });
    }
    case GET_ROLES.SUCCESS: {
      return Immutable.merge(state, {
        roles: action.data,
      });
    }
    case GET_CURRENT_ROLE.SUCCESS: {
      if (action.data.role_id) {
        return Immutable.merge(state, {
          data: {...state.data, role: action.data.role_id},
        });
      }
    }
    case UPDATE_ROLE.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, role: action.data.role_id},
      });
    }
    case GET_SPORT_INTREST.SUCCESS: {
      return Immutable.merge(state, {
        sportIntrests: action.data,
      });
    }
    case GET_FACILITY_LIST.SUCCESS: {
      return Immutable.merge(state, {
        facilityList: action.data,
      });
    }
    case GET_HASHTAGS_LIST.SUCCESS: {
      return Immutable.merge(state, {
        hastagsList: action.data,
      });
    }

    case GET_PUBLIC_USERS.SUCCESS: {
      return Immutable.merge(state, {
        publicUsers: action.data,
      });
    }

    case FOLLOWING_REQUEST.SUCCESS: {
      const public_users = _.clone(state.publicUsers);

      public_users.splice(
        state.publicUsers.findIndex(res => res.userId == action.data.userId),
        1,
        action.data,
      );

      if (action.data)
        return Immutable.merge(state, {
          publicUsers: public_users || [],
        });
    }

    case GET_USER_DETAIL_BY_ID.SUCCESS: {
      return Immutable.merge(state, {
        userByIdDetail: action.data,
      });
    }

    default:
      return state;
  }
};
