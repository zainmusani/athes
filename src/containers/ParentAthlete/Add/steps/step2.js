import React, {useRef} from 'react';
import {View} from 'react-native';
import {AppStyles, Colors, Fonts, Images} from '../../../../theme';
import {
  Button,
  Loader,
  RadioButton,
  Text,
  TextInput,
} from '../../../../components';
import _ from 'lodash';
import util from '../../../../util';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {INVALID_PASSWORD_ERROR} from '../../../../constants';

import styles from './styles';

const step2 = props => {
  const {
    errors,
    setErrors,
    userName,
    setUserName,
    password,
    setPassword,
    onNext,
    onBack,
    loading,
    setLoading,
    privacy,
    setPrivacy,
  } = props;

  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  //Validate Fields
  const _validateForm = () => {
    const errors = {};

    if (_.isEmpty(userName)) {
      // email is required
      errors.name = util.isRequiredErrorMessage('username');
    }

    if (_.isEmpty(password)) {
      // email is required
      errors.password = util.isRequiredErrorMessage('password');
    } else if (!util.isPasswordValid(password)) {
      // invalid password
      errors.password = INVALID_PASSWORD_ERROR;
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const _onSubmit = () => {
    if (_validateForm()) {
      setErrors({});

      onNext();
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Enter username"
          placeholderTextColor={Colors.grey4}
          returnKeyType="next"
          underlineColorAndroid="#f000"
          label="Username"
          lableColor={Colors.white}
          autoFocus
          ref={userNameRef}
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          containerStyle={AppStyles.mBottom10}
          value={userName}
          error={errors?.name}
          onChangeText={value => {
            value = value.replace(' ', '');
            setUserName(value);
          }}
        />
        <TextInput
          password
          placeholder=". . . . . . . ." //12345
          placeholderTextColor={Colors.grey4}
          returnKeyType="next"
          underlineColorAndroid="#f000"
          label="Password"
          lableColor={Colors.white}
          ref={passwordRef}
          onSubmitEditing={() => {
            passwordRef.current.blur();
          }}
          containerStyle={AppStyles.mBottom10}
          icon={{
            url: Images.lockIcon,
            width: 18,
            height: 21,
          }}
          value={password}
          error={errors?.password}
          onChangeText={value => {
            setPassword(value);
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            ...AppStyles.mTop25,
          }}>
          <RadioButton
            buttonStyles={styles.radioButtonStyles}
            privacy={privacy}
            setPrivacy={setPrivacy}
            values={[
              {
                key: 'private',
                text: 'Private',
                selected: false,
              },
              {
                key: 'public',
                text: 'Public',
                selected: true,
              },
            ]}
          />
        </View>

        {/* <Text
          size={Fonts.size.xSmall}
          color={Colors.blue1}
          type={Fonts.type.base}
          style={{...AppStyles.mBottom40}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text> */}
      </View>
      <View
        style={[
          styles.loginBtnArea,
          AppStyles.mBottom30,
          {paddingVertical: 40},
        ]}>
        <View style={styles.loginDivider}></View>

        <Button
          background={Colors.black}
          icon="righArrowIcon"
          onlyIcon
          color="#FFF"
          onPress={onBack}
          style={styles.backBtn}
        />
        <Button
          background={Colors.black}
          icon="righArrowIcon"
          onlyIcon
          color="#FFF"
          onPress={_onSubmit}
        />

        <View style={styles.loginDivider}></View>
      </View>
      <Loader loading={loading} />
    </KeyboardAwareScrollView>
  );
};

export default step2;
