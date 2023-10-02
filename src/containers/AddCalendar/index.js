// @flow
import _ from 'lodash';
import React, {Component, useEffect, useRef, useState} from 'react';
import {ScreenWrapper} from '../../components';
import {Colors} from '../../theme';
import {strings, UserRoles} from '../../constants';
import CoachCalendar from './CoachCalendar';
import {useSelector} from 'react-redux';

const AddCalendar = props => {
  const {role: user_role, id: loggedInUserId} = useSelector(
    state => state.user.data,
  );
  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.ADD_CALENDAR}>
      {user_role === UserRoles.coach && <CoachCalendar {...props} />}
      {/* {user_role === UserRoles.team && <TeamCalendar {...props} />} */}
    </ScreenWrapper>
  );
};

export default AddCalendar;
