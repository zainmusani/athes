// @flow
import {connect, useDispatch} from 'react-redux';
import _ from 'lodash';
import React, {Component, useState, useRef} from 'react';
import {Text, View, FlatList, ImageBackground} from 'react-native';
import styles from './styles';
import {
  Button,
  ButtonView,
  ModalView,
  ScreenWrapper,
  TextInput,
} from '../../../components';
import {AppStyles, Colors, Images} from '../../../theme';
import {setSelectedTab, setUserRole} from '../../../actions/GeneralActions';
import {Actions} from 'react-native-router-flux';
import {strings, UserRoles} from '../../../constants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import util from '../../../util';
import {ChangePasswordRequest} from '../../../actions/settingActions';

const ResetPassword = props => {
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setModalVisible] = useState(() => false);

  const [oldPassword, setOldPassword] = useState('');

  const [newPassword, setNewPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({
    oldPasswordError: null,
    newPasswordError: null,
    confirmPasswordError: null,
  });

  const dispatch = useDispatch();

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const validation = () => {
    const errors = {};

    if (_.isEmpty(oldPassword)) {
      errors.oldPasswordError = util.isRequiredErrorMessage('Old Password');
    } else if (!util.isPasswordValid(oldPassword)) {
      errors.oldPasswordError = 'Invalid old password';
    }

    if (_.isEmpty(newPassword)) {
      errors.newPasswordError = util.isRequiredErrorMessage('New Password');
    } else if (!util.isPasswordValid(newPassword)) {
      errors.newPasswordError = 'Invalid new password';
    } else if (oldPassword === newPassword) {
      errors.newPasswordError = 'You have entered your old same password.';
    }

    if (_.isEmpty(confirmPassword)) {
      errors.confirmPasswordError =
        util.isRequiredErrorMessage('Confirm Password');
    } else if (newPassword !== confirmPassword) {
      errors.confirmPasswordError = util.passwordNotMatch('password');
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (validation()) {
      let payload = {
        password: newPassword,
        current_password: oldPassword,
      };
      dispatch(
        ChangePasswordRequest(payload, res => {
          if (res) {
            setOldPassword('');
            setConfirmPassword('');
            setNewPassword('');
            setLoading(false);
            setModalVisible(true);
          }
        }),
      );
      // Actions.pop();
    }
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      headerTitle={strings.PASSWORD}
      hasBack>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={AppStyles.flex}>
          <TextInput
            password
            placeholder=". . . . . . . ." //12345
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Old Password"
            ref={oldPasswordRef}
            containerStyle={AppStyles.mBottom20}
            onSubmitEditing={() => {
              newPasswordRef.current.focus();
            }}
            icon={{
              url: Images.lockIcon,
              width: 18,
              height: 21,
            }}
            error={errors.oldPasswordError}
            value={oldPassword}
            onChangeText={value => {
              setOldPassword(value);
            }}
          />
          <TextInput
            password
            placeholder=". . . . . . . ." //12345
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="New Password"
            ref={newPasswordRef}
            containerStyle={AppStyles.mBottom20}
            onSubmitEditing={() => {
              confirmPasswordRef.current.focus();
            }}
            icon={{
              url: Images.lockIcon,
              width: 18,
              height: 21,
            }}
            error={errors.newPasswordError}
            value={newPassword}
            onChangeText={value => {
              setNewPassword(value);
            }}
          />
          <TextInput
            password
            placeholder=". . . . . . . ." //12345
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Confirm Password"
            ref={confirmPasswordRef}
            containerStyle={AppStyles.mBottom20}
            onSubmitEditing={() => {
              validation();
            }}
            icon={{
              url: Images.lockIcon,
              width: 18,
              height: 21,
            }}
            error={errors.confirmPasswordError}
            value={confirmPassword}
            onChangeText={value => {
              setConfirmPassword(value);
            }}
          />
        </KeyboardAwareScrollView>

        <Button
          background={Colors.white}
          onPress={() => onSubmit()}
          icon="righArrowIcon"
          iconRight
          raised
          style={{
            ...AppStyles.mLeft20,
            ...AppStyles.mRight20,
            ...AppStyles.mBottom20,
          }}>
          {strings.UPDATE.toUpperCase()}
        </Button>
      </View>
      <ModalView
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        modalButtonPress={() => {}}
        heading={'Password Updated.'}
        buttonText={'Done'}
        isProfileView
      />
    </ScreenWrapper>
  );
};

const mapStateToProps = () => ({});

const actions = {setSelectedTab, setUserRole};

export default connect(mapStateToProps, actions)(ResetPassword);
