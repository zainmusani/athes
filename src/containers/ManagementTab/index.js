// @flow
import React, {useEffect} from 'react';
import {connect, useSelector} from 'react-redux';
import styles from './styles';
import {AppStyles, Colors} from '../../theme';
import {Text, ScreenWrapper} from '../../components';
import {UserRoles} from '../../constants';
import {setSelectedTab} from '../../actions/GeneralActions';
import Athlete from './Athlete';
import ParentAthlete from './ParentAthlete';
import Coach from './Coach';
import Parent from './Parent';
import Facility from './Facility';
import Organization from './Organization';
import Team from './Team';
import {StatusBar, View} from 'react-native';

const ManagementTab = props => {
  const user_role = useSelector(state => state.user.data.role);

  return (
    <ScreenWrapper pageBackground={Colors.black} hideNav>
      <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
      {user_role === UserRoles.athlete && <Athlete {...props} />}

      {user_role === UserRoles.parent_athlete && <ParentAthlete {...props} />}

      {user_role === UserRoles.coach && <Coach {...props} />}

      {user_role === UserRoles.parent && <Parent {...props} />}

      {user_role === UserRoles.facility && <Facility {...props} />}

      {user_role === UserRoles.organization && <Organization {...props} />}

      {user_role === UserRoles.team && <Team {...props} />}
      <View style={{...AppStyles.mBottom20}}></View>
    </ScreenWrapper>
  );
};

const mapStateToProps = ({general}) => ({
  selectedIndex: general.selectedIndex,
});

const actions = {setSelectedTab};

export default connect(mapStateToProps, actions)(ManagementTab);
