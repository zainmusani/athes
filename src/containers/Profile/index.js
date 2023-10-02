// @flow
import _, {isNull, isUndefined} from 'lodash';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  getGalleryRequest,
  getOwnPostsListRequest,
} from '../../actions/PostActions';
import {getProfileRequest} from '../../actions/ProfileActions';
import {ScreenWrapper} from '../../components';
import {UserRoles} from '../../constants';
import {Colors} from '../../theme';
import Athlete from './Athlete';
import Coach from './Coach';
import Facility from './Facility';
import Organization from './Organization';
import Parent from './Parent';
import ParentAthlete from './ParentAthlete';
import Team from './Team';
import styles from './style';

const Profile = props => {
  const {
    userId,
    isParentAthleteManagementView,
    user_role,
    requested_role,
    child_data = {},
  } = props;

  const [role, setRole] = useState(user_role);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {data: loggedInUser} = useSelector(state => state.user);

  useEffect(() => {
    if (requested_role) {
      setRole(requested_role);
    } else {
      if (!_.isUndefined(requested_role)) {
        setRole(null);
      }
    }
    let payload  = {limit: 300, offset: 0, userId: userId}
    if (!role) {
      payload.status = 1;
    }
    dispatch(getOwnPostsListRequest(payload, res => {}));

    dispatch(getGalleryRequest({userId: userId}, res => {}));
  }, []);

  useEffect(() => {
    // dispatch(getProfileSuccess([]));

    setLoading(true);
    let id = userId;
    if (isNull(userId) || isUndefined(userId)) {
      id = loggedInUser.id;
    }

    let payload = {
      userId: id,
      check: Math.random(),
    };
    dispatch(
      getProfileRequest(payload, res => {
        setLoading(false);
      }),
    );
  }, []);

  
  return (
    <ScreenWrapper pageBackground={Colors.black} hideNav>
      {!loading && (
        <>
          {(role === UserRoles.coach || role === UserRoles.parent) &&
            isParentAthleteManagementView === true && (
              <ParentAthlete user_role={role} {...props} />
            )}

          {role === UserRoles.parent && !isParentAthleteManagementView && (
            <Parent user_role={role} {...props} />
          )}

          {role === UserRoles.athlete && (
            <Athlete user_role={role} {...props} />
          )}

          {role === UserRoles.parent_athlete && (
            <ParentAthlete user_role={role} {...props} />
          )}

          {role === UserRoles.coach && !isParentAthleteManagementView && (
            <Coach user_role={role} {...props} />
          )}

          {role === UserRoles.facility && (
            <Facility user_role={role} {...props} />
          )}

          {role === UserRoles.organization && (
            <Organization user_role={role} {...props} />
          )}

          {role === UserRoles.team && <Team user_role={role} {...props} />}
        </>
      )}
      {loading && (
        <View style={styles.fetchingDataLoader}>
          <ActivityIndicator color={Colors.white} />
        </View>
      )}
    </ScreenWrapper>
  );
};

Profile.propTypes = {
  userId: PropTypes.bool,
};
Profile.defaultProps = {
  userId: null,
};

const mapStateToProps = ({user}) => ({
  user_role: user.data.role,
});

const actions = {};

export default connect(mapStateToProps, actions)(Profile);
