import React, {useEffect, useState} from 'react';
import {strings, UserRoles} from '../../constants';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {setSelectedTab, setUserRole} from '../../actions/GeneralActions';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  ButtonView,
  Loader,
  ScreenWrapper,
  Text,
} from '../../components';
import styles from './styles';
import util from '../../util';
import {
  backScreen,
  getRolesRequest,
  updateRoleRequest,
} from '../../actions/UserActions';
import FastImage from 'react-native-fast-image';

const ChoiceRole = props => {
  const [selectBtn, setSelectBtn] = useState({});

  const [loading, setLoading] = useState(false);

  const roles = useSelector(state => state.user.roles);

  const dispatch = useDispatch(null);

  useEffect(() => {
    if (roles.length == 0) {
      setLoading(true);
      dispatch(
        getRolesRequest(res => {
          setLoading(false);
          if (res) {
          }
        }),
      );
    }
  }, []);

  var backgroundColor = '';
  var borderColor = (backgroundColor = Colors.lightPurple);
  var tintColor = Colors.purple1;

  if (Object.keys(selectBtn).length > 0) {
    (tintColor = '#042747'), (borderColor = backgroundColor = Colors.white);
  }

  const selectedStyles = StyleSheet.flatten({
    borderColor: borderColor,
    backgroundColor: backgroundColor,
  });

  const goNext = () => {
    setLoading(true);
    if (Object.keys(selectBtn).length > 0) {
      dispatch(
        updateRoleRequest({role_id: selectBtn.id}, res => {
          setLoading(false);
          if (res) {
            if (selectBtn.tag === 'Parent') {
              dispatch(backScreen('parentStep'));
              return Actions.parentStep();
            } else if (selectBtn.tag === 'Athlete') {
              dispatch(backScreen('athleteStep'));
              return Actions.athleteStep();
            } else if (selectBtn.tag === 'Coach') {
              dispatch(backScreen('coachStep'));
              return Actions.coachStep();
            } else if (selectBtn.tag === 'Facility') {
              dispatch(backScreen('facilityStep'));
              return Actions.facilityStep();
            } else if (selectBtn.tag === 'Organization') {
              dispatch(backScreen('organizationStep'));
              return Actions.organizationStep();
            } else if (selectBtn.tag === 'Team') {
              dispatch(backScreen('teamStep'));
              return Actions.teamStep();
            }
          }
        }),
      );
    } else {
      return 'Please select one.';
    }
  };

  return (
    <ScreenWrapper pageBackground={Colors.black} headerTitle={' '}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <View style={styles.topView}>
            <Image source={Images.Logo1} style={{width: 319, height: 50}} />
            <Text
              color={Colors.white}
              type={Fonts.type.bold}
              bold="700"
              size={Fonts.size.large}
              style={{...AppStyles.mTop20}}>
              {strings.CHOOSE_YOUR_ROLE}
            </Text>
          </View>
          <View style={styles.batchsArea}>
            {roles.map((data, key) => {
              return (
                <ButtonView
                  key={key}
                  style={[
                    styles.batch,
                    selectBtn.tag === data.tag ? selectedStyles : '',
                  ]}
                  onPress={() => setSelectBtn(data)}>
                  <Image
                    style={{
                      ...AppStyles.marginVerticalBase,
                      minWidth: 65,
                      minHeight: 55,
                      tintColor:
                        selectBtn.tag === data.tag ? tintColor : '#042747',
                    }}
                    resizeMode="contain"
                    source={{uri: data.icon}}
                  />
                  <Text
                    color={selectBtn.tag === data.tag ? tintColor : '#042747'}
                    size={Fonts.size.xxxSmall}
                    type={Fonts.type.bold}
                    bold="700">
                    {util.capitalizeFirstLetter(data.tag)}
                  </Text>
                </ButtonView>
              );
            })}
          </View>
          <Button
            onPress={() => goNext()}
            disabled={Object.keys(selectBtn).length <= 0}
            icon="righArrowIcon"
            iconRight
            raised
            style={{
              ...AppStyles.mLeft30,
              ...AppStyles.mRight30,
              ...AppStyles.mBottom20,
            }}>
            {strings.GET_STARTED.toUpperCase()}
          </Button>
        </View>
      </ScrollView>
      <Loader onPress={() => {}} loading={loading} disabled />
    </ScreenWrapper>
  );
};

export default ChoiceRole;
