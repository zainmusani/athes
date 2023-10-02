import React, {useRef, useState} from 'react';
import {Image, ImageBackground, StatusBar, View} from 'react-native';
import styles from './ForgotPasswordStyles';
import {
  Button,
  ButtonView,
  ScreenWrapper,
  Loader,
  Text,
  TextInput,
} from '../../components';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {strings} from '../../constants';

const NewPasswordView = props => {
  const password = useRef(null);
  const confirmPassword = useRef(null);

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.NEWPASSWORD}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.newPassContainer}>
            <TextInput
              password
              placeholder=". . . . . . . ." //12345
              placeholderTextColor={Colors.grey4}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              label="New Password"
              autoFocus
              ref={password}
              containerStyle={AppStyles.mBottom20}
              onSubmitEditing={() => {
                confirmPassword.current.focus();
              }}
              icon={{
                url: Images.lockIcon,
                width: 18,
                height: 21,
              }}
              error={props.errors.password}
              value={props.passValue}
              onChangeText={value => {
                props.setPassValue(value);
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
                props.changePassword();
              }}
              icon={{
                url: Images.lockIcon,
                width: 18,
                height: 21,
              }}
              error={props.errors.confirmPassword}
              value={props.confirmPassValue}
              onChangeText={value => {
                props.setConfirmPassValue(value);
              }}
            />
          </View>

          <Button
            onPress={() => props.changePassword()}
            disabled={false}
            icon="righArrowIcon"
            iconRight
            raised
            style={{...AppStyles.mLeft30, ...AppStyles.mRight30}}>
            {'Continue'.toUpperCase()}
          </Button>
        </View>
      </KeyboardAwareScrollView>
      <Loader loading={props.loading} />
    </ScreenWrapper>
  );
};

export default NewPasswordView;

// refrence link = https://aboutreact.com/react-native-video/
