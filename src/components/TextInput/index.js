// @flow
import _ from 'lodash';
import React, {useState, forwardRef} from 'react';
import PropTypes from 'prop-types';
import {
  TextInput as RNTextInput,
  ViewPropTypes,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {Text, ButtonView} from '../';
import {Colors, AppStyles, Images, Fonts} from '../../theme';
import styles from './styles';
import PhoneInput from 'react-native-phone-number-input';
import util from '../../util';

const TextInput = forwardRef((props: Object, ref) => {
  const {
    label,
    lableColor,
    error,
    containerStyle,
    onPress,
    multiline,
    imageUrl,
    icon,
    iconStyles,
    password,
    refFun,
    customStyle,
    phone,
    iconOnRight,
    ...rest
  } = props;

  const [showPass, setShowPass] = useState(password);
  const iconStyle = StyleSheet.flatten([
    iconOnRight
      ? {position: 'absolute', right: 0, margin: 0}
      : styles.inputIcon,
    {
      tintColor: Colors.white,
      width: !_.isNil(icon) ? icon.width : 10,
      height: !_.isNil(icon) ? icon.height : 10,
    },
    !_.isNil(icon) ? icon.style : {},
    iconStyles,
  ]);

  return (
    <View style={containerStyle}>
      {!_.isEmpty(label) && (
        <Text
          color={lableColor}
          style={[AppStyles.mTop10]}
          allowFontScaling={false}>
          {label}
        </Text>
      )}
      {phone ? (
        <PhoneInput
          ref={ref ? ref : reff => refFun(reff)}
          textProps={{
            placeholder: 'Enter a phone number...',
          }}
          defaultCode="US"
          layout="first"
          withDarkTheme
          disableArrowIcon
          codeTextStyle={{
            color: Colors.white,
            height: 22,
            fontSize: util.getContactNumberInputFontSize(),
          }}
          containerStyle={styles.textInputCont}
          flagButtonStyle={styles._flagStyle}
          textInputStyle={styles._textInputStyle}
          textContainerStyle={styles._textContainerStyle}
          countryPickerProps={{withAlphaFilter: true}}
          excludeCountries={['PK']}
          textInputProps={{
            allowFontScaling:false,
            selectionColor: Colors.whiteMain,
            paddingBottom: 2,
            allowFontScaling: false,
          }}
          {...rest}
        />
      ) : (
        <View style={styles.inputWrapper}>
          {!_.isNull(icon) && (
            <Image source={icon.url} style={iconStyle} resizeMode={'contain'} />
          )}
          <RNTextInput
            ref={ref ? ref : reff => refFun(reff)}
            secureTextEntry={showPass}
            style={
              !_.isNull(customStyle)
                ? customStyle
                : [
                    styles.input,
                    multiline ? styles.multilineInput : {},
                    !_.isNull(icon) && !iconOnRight
                      ? AppStyles.pLeft40
                      : AppStyles.pLeft0,
                    iconOnRight ? AppStyles.pRight40 : AppStyles.pRight0,
                    password ? AppStyles.pRight30 : '',
                  ]
            }
            blurOnSubmit={false}
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize={'none'}
            autoComplete={'off'}
            selectionColor={Colors.whiteMain}
            multiline={multiline}
            maxLength={180}
            allowFontScaling={false}
            {...rest}
          />
          {password && (
            <ButtonView
              onPress={() => {
                setShowPass(!showPass);
              }}
              style={styles.eyeIconWrap}>
              <Image
                source={showPass ? Images.eyeIcon : Images.eyeCloseIcon}
                style={showPass ? styles.eyeIconStyle : styles.eyeHideIconStyle}
              />
            </ButtonView>
          )}
        </View>
      )}

      {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
        <Text
          type="medium"
          size="small"
          color={Colors.red}
          allowFontScaling={false}
          style={[AppStyles.mTop5, AppStyles.mBottom5]}>
          {error}
        </Text>
      )}
    </View>
  );
});

TextInput.defaultProps = {
  error: '',
  label: '',
  lableColor: Colors.white,
  containerStyle: {},
  icon: null,
  onPress: null,
  multiline: false,
  password: false,
  customStyle: null,
  phone: false,
  iconOnRight: false,
  refFun: () => {},
};

TextInput.propTypes = {
  label: ViewPropTypes.style,
  lableColor: PropTypes.string,
  error: PropTypes.string,
  containerStyle: ViewPropTypes.style,
  icon: PropTypes.object,
  onPress: PropTypes.func,
  multiline: PropTypes.bool,
  password: PropTypes.bool,
  customStyle: PropTypes.object,
  refFun: PropTypes.func,
  phone: PropTypes.bool,
  iconOnRight: PropTypes.bool,
};

export default TextInput;
