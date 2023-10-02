import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import SwitchToggle from 'react-native-switch-toggle';
import {useDispatch, useSelector} from 'react-redux';
import {getSettingPagesRequest} from '../../actions/settingActions';
import {
  userSignOutRequest,
  userSignOutSuccess,
} from '../../actions/UserActions';
import {ButtonView, ScreenWrapper, Text} from '../../components';
import {strings} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';

const Setting = props => {
  const [notificationEnable, setNotificationEnable] = useState(() => true);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);

  useEffect(() => {
    dispatch(getSettingPagesRequest());
  }, []);

  return (
    <ScreenWrapper
      pageBackground={Colors.transparent}
      headerGradientBG
      headerTitle={strings.SETTINGS}
      headerTitleColor={Colors.white}
      hasBack>
      <View style={styles.contentAreaWrap}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 0.25}}
          colors={[Colors.graybrown, Colors.black]}
          style={styles.blueRoundBG}></LinearGradient>

        <View style={styles.contentArea}>
          <View style={styles.topArea}>
            <Text
              color={Colors.gray7}
              size={Fonts.size.medium}
              style={{...AppStyles.mBottom30}}>
              {strings.ACCOUNT_SETTINGS}
            </Text>
            <View style={styles.contentRow}>
              <Text color={Colors.black} size={Fonts.size.medium}>
                {strings.PUSH_NOTIFICATION}
              </Text>
              <SwitchToggle
                switchOn={notificationEnable}
                onPress={() => setNotificationEnable(!notificationEnable)}
                containerStyle={{
                  width: 56,
                  height: 29,
                  borderRadius: 25,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: Colors.presetColors.primary[1],
                }}
                circleStyle={{
                  width: 22,
                  height: 22,
                  borderRadius: 20,
                }}
                circleColorOff={Colors.presetColors.primary[1]}
                circleColorOn={Colors.white}
                backgroundColorOn={Colors.presetColors.primary[1]}
                backgroundColorOff={Colors.white}
              />
            </View>
            <ButtonView
              onPress={() => {
                Actions.resetPassword();
              }}
              style={{...AppStyles.mBottom30}}>
              <Text color={Colors.black} size={Fonts.size.medium}>
                {strings.PASSWORD}
              </Text>
            </ButtonView>
            <ButtonView
              onPress={() => {
                dispatch(
                  userSignOutRequest(res => {
                    if (res) Actions.reset('login');
                  }),
                );
              }}
              style={{...AppStyles.mBottom30}}>
              <Text color={Colors.black} size={Fonts.size.medium}>
                {strings.LOGOUT}
              </Text>
            </ButtonView>
          </View>
          <View style={styles.centerArea}>
            <Text
              color={Colors.gray7}
              size={Fonts.size.medium}
              style={{...AppStyles.mBottom30}}>
              {strings.MORE}
            </Text>

            <ButtonView
              style={styles.contentRow}
              onPress={() => Actions.investments()}>
              <Text color={Colors.black} size={Fonts.size.medium}>
                {strings.INVESTMENTS}
              </Text>
              <Image source={Images.back_btn} style={styles.arrowIcon} />
            </ButtonView>

            {(user.role == 3 || user.role == 5 || user.role == 6) && (
              <>
                {/* <ButtonView
                  style={styles.contentRow}
                  onPress={() =>
                    Actions.jump('stripeCardList', {
                      isSetting: true,
                    })
                  }>
                  <Text color={Colors.black} size={Fonts.size.medium}>
                    {strings.PAYMENT_METHODS}
                  </Text>
                  <Image source={Images.back_btn} style={styles.arrowIcon} />
                </ButtonView> */}
                <ButtonView
                  style={styles.contentRow}
                  onPress={() => Actions.earnings()}>
                  <Text color={Colors.black} size={Fonts.size.medium}>
                    {strings.EARNINGS}
                  </Text>
                  <Image source={Images.back_btn} style={styles.arrowIcon} />
                </ButtonView>
              </>
            )}

            <ButtonView
              style={styles.contentRow}
              onPress={() => Actions.about_us()}>
              <Text color={Colors.black} size={Fonts.size.medium}>
                {strings.ABOUT_US}
              </Text>
              <Image source={Images.back_btn} style={styles.arrowIcon} />
            </ButtonView>
            <ButtonView
              style={styles.contentRow}
              onPress={() => Actions.privacy_policy()}>
              <Text color={Colors.black} size={Fonts.size.medium}>
                {strings.PRIVACY_POLICY}
              </Text>
              <Image source={Images.back_btn} style={styles.arrowIcon} />
            </ButtonView>
            <ButtonView
              style={styles.contentRow}
              onPress={() => Actions.terms_and_condition()}>
              <Text color={Colors.black} size={Fonts.size.medium}>
                {strings.TERMS_AND_CONDITION}
              </Text>
              <Image source={Images.back_btn} style={styles.arrowIcon} />
            </ButtonView>
            <ButtonView
              style={styles.contentRow}
              onPress={() => Actions.support()}>
              <Text color={Colors.black} size={Fonts.size.medium}>
                {strings.SUPPORT}
              </Text>
              <Image source={Images.back_btn} style={styles.arrowIcon} />
            </ButtonView>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Setting;
