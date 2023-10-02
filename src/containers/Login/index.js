// @flow
import _, { reduce } from 'lodash';
import { connect, useDispatch, useSelector } from 'react-redux';
import { View, Image, Platform, ImageBackground } from 'react-native';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { INVALID_PASSWORD_ERROR, strings } from '../../constants';
import {
  userSigninRequest,
  socialLoginRequest,
  getCurrentRoleRequest,
} from '../../actions/UserActions';
import {
  Text,
  ButtonView,
  TextInput,
  Loader,
  Button,
  ScreenWrapper,
} from '../../components';
import { Images, AppStyles, Colors, Metrics, Fonts } from '../../theme';
import styles from './styles';
import util from '../../util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GoogleLogin} from '../../helpers/GoogleLoginHelper';
import {FBLogin} from '../../helpers/FBLoginHelper';
import {appleSignIn} from '../../helpers/AppleLoginHelper';

const Login = props => {
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const [loading, setLoading] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passValue, setPassValue] = useState('');
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);  

  const _validateForm = () => {
    const errors = {};

    if (_.isEmpty(emailValue)) {
      // email is required

      errors.email = util.isRequiredErrorMessage('Email / Username');
    }

    if (_.isEmpty(passValue)) {
      // password is required
      errors.password = util.isRequiredErrorMessage('password');
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const _onSubmit = () => {
    if (_validateForm()) {
      const payload = {
        email: emailValue.trim(),
        password: passValue.trim(),
        device_type: Platform.OS,
      };
      setLoading(true);
      dispatch(
        userSigninRequest(payload, res => {
          setLoading(false);
          if (res) {
            Actions.replace('getstarted');
          }
        }),
      );
    }
  };
  // Login with social platform
  // This function will store token and user to reducer
  const loginWithSocialPlatform = data => {
    const {token, token_type} = data;

    setLoading(true);

    const payload = {
      token: token,
      tokenType: token_type,
    };
    dispatch(
      socialLoginRequest(payload, res => {
        if (res) {
          dispatch(
            getCurrentRoleRequest(res1 => {
              setLoading(false);
              Actions.replace('getstarted');
            }),
          );
        } else {
          setLoading(false);
        }
      }),
    );
  };

  const loginWithIOS = details => {
    const {data, token, token_type} = details;
    const {name, email} = data;

    setLoading(true);

    const payload = {
      name: name,
      email: email,
      token: token,
      tokenType: token_type,
    };

    dispatch(
      socialLoginRequest(payload, res => {
        if (res) {
          dispatch(
            getCurrentRoleRequest(res1 => {
              setLoading(false);
              Actions.replace('getstarted');
            }),
          );
        }
      }),
    );
  };

  // Social Signin Errors
  const socialLoginError = (error = null, token_type) => {
    let errorText = '';
    if (error === null) {
      // this.setLoadingState(token_type);
      return true;
    } else if (error && _.isString(error)) {
      errorText = error;
    } else {
      errorText = strings.SOMETHING_WENT_WRONG;
    }
    util.topAlert(errorText, 'error');
  };

  return (
    <ScreenWrapper pageBackground={Colors.black} hideNav>
      <View style={styles.container}>
        <View style={[AppStyles.paddingVerticalBase, styles.topArea]}>
          <Text style={styles.loginTitle}>{strings.LOGIN}</Text>
          <Text style={styles.subtTitle}>Please enter the details below.</Text>
          <View style={styles.borderBottom}></View>
        </View>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1, justifyContent: 'space-between'}}>
          <View>
            <View style={styles.formContainer}>
              <TextInput
                placeholder="User@example.com" //12345
                placeholderTextColor={Colors.grey4}
                returnKeyType="next"
                autoCapitalize="none"
                underlineColorAndroid="#f000"
                label="Email / Username"
                keyboardType="email-address"
                ref={email}
                containerStyle={AppStyles.mBottom20}
                onSubmitEditing={() => {
                  password.current.focus();
                }}
                icon={{
                  url: Images.userIcon,
                  width: 12,
                  height: 18,
                }}
                error={emailValue ? '' : errors.email}
                value={emailValue}
                onChangeText={value => {
                  value = value.replace(' ', '');
                  setEmailValue(value);
                }}
              />

              <TextInput
                password
                placeholder=". . . . . . . ." //12345
                placeholderTextColor={Colors.grey4}
                returnKeyType="next"
                underlineColorAndroid="#f000"
                label="Password"
                ref={password}
                containerStyle={AppStyles.mBottom20}
                onSubmitEditing={() => {
                  _onSubmit();
                }}
                icon={{
                  url: Images.lockIcon,
                  width: 18,
                  height: 21,
                }}
                error={passValue ? '' : errors.password}
                value={passValue}
                onChangeText={value => {
                  setPassValue(value);
                }}
              />

              <ButtonView
                onPress={() => {
                  Actions.forgotpassword();
                }}
                style={styles.forgotLink}>
                <Text style={[styles.forgotTxt, AppStyles.mBottom20]}>
                  {strings.FORGOTPASSWORD}
                </Text>
              </ButtonView>
            </View>
            <View style={styles.loginBtnArea}>
              <View style={styles.loginDivider}></View>
              <Button
                icon="righArrowIcon"
                onlyIcon
                background={Colors.black}
                color={Colors.white}
                onPress={() => {
                  _onSubmit();
                }}
              />
              <View style={styles.loginDivider}></View>
            </View>
            <View
              style={[
                AppStyles.mBottom10,
                AppStyles.centerInner,
                AppStyles.flexRow,
              ]}>
              <Text size={Fonts.size.small} color={Colors.white}>
                Don’t have an account?{' '}
              </Text>
              <ButtonView
                style={{...AppStyles.padding10, ...AppStyles.pLeft0}}
                onPress={() => {
                  Actions.signup({fromLogin: true});
                }}>
                <Text
                  size={Fonts.size.small}
                  color={Colors.white}
                  type={Fonts.type.bold}
                  bold="700">
                  {strings.SIGNUP}
                </Text>
              </ButtonView>
            </View>
          </View>

          <View>
            <ImageBackground
              source={Images.authBottomBg}
              style={{
                width: Metrics.screenWidth,
                height: 180,
                marginBottom: -90,
              }}></ImageBackground>
            <View style={styles.socialIcons}>
              <ButtonView
                onPress={() => {
                  GoogleLogin(loginWithSocialPlatform, socialLoginError);
                }}>
                <Image source={Images.google} style={styles.socialIcon} />
              </ButtonView>
              <ButtonView
                onPress={() => {
                  FBLogin(loginWithSocialPlatform, socialLoginError);
                }}>
                <Image source={Images.facebook} style={styles.socialIcon} />
              </ButtonView>
              {Platform.OS == 'ios' && (
                <ButtonView
                  onPress={() => {
                    appleSignIn(loginWithIOS, socialLoginError);
                  }}>
                  <Image source={Images.apple} style={styles.socialIcon} />
                </ButtonView>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Loader loading={loading} />
      </View>
    </ScreenWrapper>
  );
};

export default Login;
