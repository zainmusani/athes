// @flow
import _ from 'lodash';
import {connect, useDispatch} from 'react-redux';
import {View, Image, ImageBackground, ScrollView} from 'react-native';
import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {getSettingPagesRequest} from '../../actions/settingActions';

import {
  INVALID_NAME_ERROR,
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  strings,
} from '../../constants';
import {
  getCurrentRoleRequest,
  socialLoginRequest,
  userSignupRequest,
} from '../../actions/UserActions';
import {
  Text,
  ButtonView,
  TextInput,
  Loader,
  Button,
  ScreenWrapper,
  CheckBox,
} from '../../components';
import {Images, AppStyles, Colors, Metrics, Fonts} from '../../theme';
import styles from './styles';
import util from '../../util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FBLogin} from '../../helpers/FBLoginHelper';
import {appleSignIn} from '../../helpers/AppleLoginHelper';
import {GoogleLogin} from '../../helpers/GoogleLoginHelper';

const Sigup = props => {
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    phone: null,
    confirmPassword: null,
  });
  const [loading, setLoading] = useState(() => false);

  const [fullNameValue, setFullNameValue] = useState(() => '');
  const [emailValue, setEmailValue] = useState(() => '');
  const [passValue, setPassValue] = useState(() => '');
  const [confirmPassValue, setConfirmPassValue] = useState('');

  const [countryCode, setCountryCode] = useState(() => 'US');
  const [phoneValue, setPhoneValue] = useState(() => '');
  const [checked, setChecked] = useState(() => false);
  const dispatch = useDispatch(null);

  const fullName = useRef(null);
  const email = useRef(null);
  const pass = useRef(null);
  const confirmPassword = useRef(null);
  const phone = useRef(null);

  const _validateForm = () => {
    const errors = {};

    if (_.isEmpty(fullNameValue)) {
      // email is required
      errors.name = util.isRequiredErrorMessage('User name');
    } else if (!util.isValidName(fullNameValue)) {
      // invalid email
      errors.name = INVALID_NAME_ERROR;
    }

    if (_.isEmpty(emailValue)) {
      // email is required
      errors.email = util.isRequiredErrorMessage('email');
    } else if (!util.isEmailValid(emailValue)) {
      // invalid email
      errors.email = INVALID_EMAIL_ERROR;
    }

    if (_.isEmpty(passValue)) {
      // password is required
      errors.password = util.isRequiredErrorMessage('password');
    } else if (!util.isPasswordValid(passValue)) {
      // invalid password
      errors.password = INVALID_PASSWORD_ERROR;
    }

    if (_.isEmpty(confirmPassValue)) {
      // password is required
      errors.confirmPassword = util.isRequiredErrorMessage('conform-password');
    }

    if (passValue !== confirmPassValue) {
      errors.confirmPassword = util.passwordNotMatch('password');
    }

    if (!_.isEmpty(phoneValue) && !phone.current.isValidNumber(phoneValue)) {
      errors.phone = 'please enter valid phone number';
    }
      if (!checked) {
        errors.checked =
          'Please read and agree to the privacy policy and terms and conditions.';
      }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const _onSubmit = () => {
    if (_validateForm()) {
      setLoading(true);
      const payload = {
        fullName: fullNameValue,
        email: emailValue,
        password: passValue,
        countryCode: countryCode,
        phone: phoneValue,
      };
      dispatch(
        userSignupRequest({email: emailValue}, res => {
          if (res) {
            Actions.reset('otp', payload);
          }
          setLoading(false);
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
              if (res1) {
                Actions.replace('getstarted');
              }
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
              if (res1) {
                Actions.reset('getstarted');
              }
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

  const renderForm = () => {
    return (
      <>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Full Name"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Full Name"
            ref={fullName}
            onSubmitEditing={() => {
              email.current.focus();
            }}
            containerStyle={AppStyles.mBottom10}
            icon={{
              url: Images.userIcon,
              width: 12,
              height: 18,
            }}
            value={fullNameValue}
            error={errors?.name}
            onChangeText={value => {
              setFullNameValue(value);
            }}
          />

          <TextInput
            placeholder="User@example.com"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            autoCapitalize="none"
            underlineColorAndroid="#f000"
            label="Email address"
            keyboardType="email-address"
            ref={email}
            containerStyle={AppStyles.mBottom10}
            onSubmitEditing={() => {
              pass.current.focus();
            }}
            icon={{
              url: Images.mail,
              width: 18,
              height: 15,
            }}
            value={emailValue}
            error={errors?.email}
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
            ref={pass}
            containerStyle={AppStyles.mBottom10}
            onSubmitEditing={() => {
              confirmPassword.current.focus();
            }}
            icon={{
              url: Images.lockIcon,
              width: 18,
              height: 21,
            }}
            value={passValue}
            error={errors?.password}
            onChangeText={value => {
              setPassValue(value);
            }}
          />

          <TextInput
            password
            placeholder=". . . . . . . ." //12345
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Confirm Password"
            ref={confirmPassword}
            containerStyle={AppStyles.mBottom20}
            onSubmitEditing={() => {
              confirmPassword.current.blur();
            }}
            icon={{
              url: Images.lockIcon,
              width: 18,
              height: 21,
            }}
            error={errors?.confirmPassword}
            value={confirmPassValue}
            onChangeText={value => {
              setConfirmPassValue(value);
            }}
          />

          <TextInput
            placeholder="xxxxxxxx"
            placeholderTextColor={Colors.grey4}
            underlineColorAndroid="#f000"
            keyboardType="numeric"
            label="Contact Number (Optional)"
            phone
            ref={phone}
            defaultValue={phoneValue}
            error={errors?.phone}
            onChangeCountry={value => {
              setCountryCode(value.cca2);
            }}
            onChangeText={value => {
              setPhoneValue(value);
            }}
          />
          <CheckBox
            checked={checked}
            error={errors?.checked}
            setChecked={setChecked}
            text={`I agree to the`}
            firstLinkText={`Terms & Conditions`}
            firstLink={() => {
              dispatch(getSettingPagesRequest());
              Actions.terms_and_condition();
            }}
            secondLinkText={`Privacy Policy.`}
            secondLink={() => {
              dispatch(getSettingPagesRequest());
              Actions.privacy_policy();
            }}
            customStyle={{marginTop: 20, padding: 0}}
          />
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
            Already have an account?{' '}
          </Text>
          <ButtonView
            style={{...AppStyles.padding10, ...AppStyles.pLeft0}}
            onPress={() => {
              Actions.login();
            }}>
            <Text
              size={Fonts.size.small}
              color={Colors.white}
              type={Fonts.type.bold}
              bold="700">
              {strings.SIGNIN}
            </Text>
          </ButtonView>
        </View>
      </>
    );
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      headerTitle={strings.CREATE_ACCOUNT}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}>
          <View style={{minHeight: Metrics.screenHeight - 100}}>
            <View style={{flex: 1}}>{renderForm()}</View>
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

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(Sigup);
