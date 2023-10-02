import React, {useState, useRef} from 'react'
import _ from "lodash";
import ForgotPasswordView from './ForgotPasswordView'
import NewPasswordView from './NewPasswordView';
import {connect, useDispatch} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {INVALID_EMAIL_ERROR, INVALID_PASSWORD_ERROR} from '../../constants';
import util from '../../util';
import {
  forgotChangePasswordRequest,
  forgotPasswordRequest,
} from '../../actions/UserActions';

const ForgotPasswordController = props => {
  const {accessToken, email} = props;

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({
    password: null,
    confirmPassword: null,
  });
  const [emailValue, setEmailValue] = useState('');
  const [passValue, setPassValue] = useState('');
  const [confirmPassValue, setConfirmPassValue] = useState('');
  const [loading, setLoading] = useState(false);

  const _onSubmit = () => {
    if (_validateEmail()) {
      setLoading(true);
      dispatch(
        forgotPasswordRequest({email: emailValue}, res => {
          setLoading(false);
          if (res) {
            const payload = {
              fullName: 'test',
              email: emailValue,
              password: '',
              countryCode: 'US',
              phone: '12321323123',
              forgotPassword: true,
            };
            Actions.otp(payload, {forgotpassword: true});
          }
        }),
      );
    }
  };

  const changePassword = () => {
    if (_validateNewPass()) {
      setLoading(true);
      const payload = {
        email: email,
        password: passValue,
        token: accessToken,
      };
      dispatch(
        forgotChangePasswordRequest(payload, res => {
          setLoading(false);
          if (res) {
            util.topAlert('Your password have changed successfully');
            Actions.login();
          }
        }),
      );
    }
  };

  const _validateEmail = () => {
    const errors = {};

    if (_.isEmpty(emailValue)) {
      // password is required
      errors.email = util.isRequiredErrorMessage('email');
    } else if (!util.isEmailValid(emailValue)) {
      // invalid email
      errors.email = INVALID_EMAIL_ERROR;
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const _validateNewPass = () => {
    const errors = {};

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

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  return (
    <>
      {props.otpDone ? (
        <NewPasswordView
          changePassword={() => changePassword()}
          errors={errors}
          loading={loading}
          passValue={passValue}
          confirmPassValue={confirmPassValue}
          setPassValue={setPassValue}
          setConfirmPassValue={setConfirmPassValue}
        />
      ) : (
        <ForgotPasswordView
          _onSubmit={() => _onSubmit()}
          loading={loading}
          errors={errors}
          emailValue={emailValue}
          setEmailValue={setEmailValue}
        />
      )}
    </>
  );
};

const mapStateToProps = ({user}) => ({
  accessToken: user.accessToken,
  email: user.email,
});

const actions = {};

export default connect(
    mapStateToProps,
    actions
  )(ForgotPasswordController);
