import React, { useRef, useState } from 'react';
import { Image, ImageBackground, StatusBar, View } from 'react-native';
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
import {Actions} from 'react-native-router-flux';

const ForgotPasswordView = props => {
  const { emailValue, setEmailValue, errors, _onSubmit } = props;
  const email = useRef(null);

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      leftBtnImage={Images.back_btn}
      leftBtnPress={() => Actions.reset('login')}
      headerTitle={strings.FORGOTPASSWORD}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.topArea}>
            <Text
              size={Fonts.size.large}
              textAlign="center"
              type={Fonts.type.bold}
              bold="700"
              color={Colors.white}
              style={styles.title}>
              Enter your email and we will send you a recovery code{' '}
            </Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              placeholder="User@example.com" //12345
              placeholderTextColor={Colors.grey4}
              returnKeyType="next"
              autoCapitalize="none"
              underlineColorAndroid="#f000"
              label="Email"
              keyboardType="email-address"
              autoFocus
              ref={email}
              containerStyle={AppStyles.mBottom20}
              onSubmitEditing={() => {
                _onSubmit();
              }}
              icon={{
                url: Images.userIcon,
                width: 12,
                height: 18,
              }}
              error={errors.email}
              value={emailValue}
              onChangeText={value => {
                value = value.replace(' ', '');
                setEmailValue(value);
              }}
            />
          </View>

          <View style={styles.loginBtnArea}>
            <View style={styles.loginDivider}></View>
            <Button
              icon="righArrowIcon"
              onlyIcon
              background={Colors.black}
              color="#FFF"
              onPress={() => {
                _onSubmit();
              }}
            />
            <View style={styles.loginDivider}></View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Loader loading={props.loading} />
    </ScreenWrapper>
  );
};

export default ForgotPasswordView;

// refrence link = https://aboutreact.com/react-native-video/
