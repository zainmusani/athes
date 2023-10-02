import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';
import {Keyboard, Platform, View} from 'react-native';
import {
  // requestCode,
  confirmOTPRequest,
  forgotPasswordOTPRequest,
  forgotPasswordRequest,
  userSignupRequest,
} from '../../actions/UserActions';
import { connect, useDispatch } from 'react-redux';
import { SOMETHING_WRONG, strings } from '../../constants';
import { Actions } from 'react-native-router-flux';
import {
  ButtonView,
  CodeInput,
  Loader,
  ModalView,
  ScreenWrapper,
  Text,
} from '../../components';
import { AppStyles, Colors, Fonts, Images } from '../../theme';

const OTP = props => {
  const {fullName, email, password, countryCode, phone, forgotPassword} = props;

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [attempt, setAttempt] = useState(1);
  const [reSendActive, setReSendActive] = useState(false);
  const [timer, setTimer] = useState(90);
  const [increment, setIncrement] = useState(90);
  const [showError, setShowError] = useState(false);
  const dispatch = useDispatch(null);

  useEffect(() => {
    setTimeout(() => {
      if (timer > 0) {
        setTimer(prevTimer => prevTimer - 1);
      } else {
        setReSendActive(true);
      }
    }, 1000);
  }, [timer]);

  useEffect(() => {
    setTimeout(() => {
      setModalVisible(true);
    }, 800);
  }, []);

  useEffect(() => {
    if (attempt > 1 && attempt % 3 == 0) {
      resendPress()
    }
  }, [attempt])
  

  const resendPress = () => {
    setLoading(true);
    const payload = {
      email: email,
    };

    if (forgotPassword) {
      dispatch(
        forgotPasswordRequest(payload, res => {
          setLoading(false);
          if (res) {
            setTimer(increment * attempt);
            setReSendActive(false);
          }
        }),
      );
    } else {
      dispatch(
        userSignupRequest(payload, res => {
          setLoading(false);
          if (res) {
            setTimer(increment * attempt);
            setReSendActive(false);
          }
        }),
      );
    }
    // if (attempt <= 3) {
      
    // } else {
    //   setShowError(true);
    //   setReSendActive(false);
    // }
  };

  const codeSubmit = (code, ref) => {
    Keyboard.dismiss();
    setLoading(true);

    const payload = {
      email: email,
      name: fullName,
      password: password,
      otp: code,
      countryCode: countryCode,
      phone: phone,
    };

    //check if user enter 4 digit then loading start

    if (code.toString().length === 6) {
      setAttempt(prevAttempt => prevAttempt + 1);

      if (forgotPassword) {
        dispatch(
          forgotPasswordOTPRequest(payload, res => {
            setLoading(false);

            if (res) {
              setTimer(increment * attempt);
              
              setReSendActive(false);

              

              Actions.reset('forgotpassword', {otpDone: true});
            } else {
              ref.current.clear();
            }
          }),
        );
      } else {
        dispatch(
          confirmOTPRequest(payload, res => {
            setLoading(false);
            if (res) {
              setTimer(increment * attempt);

              setReSendActive(false);

              Actions.reset('choicerole');
            } else {
              ref.current.clear();
            }
          }),
        );
      }
    }
  };

  var minutes = Math.floor(timer / 60);
  var seconds = timer - minutes * 60;

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      // hasBack
      headerTitle={strings.VERIFY_EMAIL}>
      <View style={styles.container}>
        <View
          style={styles.content}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <Text
            color={Colors.white}
            size={Fonts.size.medium}
            style={{...AppStyles.mBottom30}}>
            {strings.ENTER4DIGITSCODE}
          </Text>

          <CodeInput
            {...props}
            codeSubmit={codeSubmit}
            isModalVisible={isModalVisible}
          />

          <Text
            size={Fonts.size.xSmall}
            type={Fonts.type.bold}
            color={Colors.white}
            style={styles.counterTime}>
            {`${('0' + minutes).slice(-2)} : ${('0' + seconds).slice(-2)}`}
          </Text>
          <Text
            size={Fonts.size.xSmall}
            type={Fonts.type.medium}
            bold="600"
            color={Colors.white}
            style={styles.email}>
            {email}
          </Text>

          <View style={styles.resendParent}>
            <Text
              size={Fonts.size.xSmall}
              type={Fonts.type.medium}
              bold="600"
              color={Colors.white}
              style={{...AppStyles.mRight5}}>
              {strings.DONT_RECEIVED_CODE}
            </Text>
            <ButtonView
              onPress={() => {
                reSendActive ? resendPress() : {};
              }}
              activeOpacity={reSendActive ? 0 : 9}>
              <Text
                size={Fonts.size.xSmall}
                type={Fonts.type.bold}
                color={reSendActive ? Colors.white : '#7e7e7e'}
                style={{fontWeight: '700'}}>
                {strings.RESEND_CODE}
              </Text>
            </ButtonView>
          </View>
          <ButtonView
            onPress={() => {
              if (forgotPassword) {
                Actions.reset('forgotpassword');
              } else {
                Actions.reset('signup');
              }
            }}
            style={{...AppStyles.mBottom25}}>
            <Text
              size={Fonts.size.xSmall}
              color={Colors.white}
              type={Fonts.type.bold}
              style={{fontWeight: '700'}}>
              {strings.WRONG_EMAIL}
            </Text>
          </ButtonView>

          {showError && (
            <View style={styles.errorParent}>
              <Text color={'red'}>{SOMETHING_WRONG}</Text>
            </View>
          )}
        </View>

        <ModalView
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          modalButtonPress={() => setModalVisible(false)}
          image={Images.modalIcon}
          heading={`Validation Code Sent`}
          description={`Please check your email (${email}) for Validation Code.`}
          buttonText={'Done'}
        />

        <Loader onPress={() => {}} loading={loading} disabled />
      </View>
    </ScreenWrapper>
  );
};

OTP.propTypes = {
  email: PropTypes.string.isRequired,
  forgotPassword: PropTypes.bool,
};

OTP.defaultProps = {
  fullName: '',
  email: '',
  password: '',
  phone: '',
  forgotPassword: false,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(OTP);
