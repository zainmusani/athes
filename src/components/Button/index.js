// @flow
import _ from 'lodash';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Platform,
  StyleSheet,
  ViewPropTypes,
  Text as TextRN,
  TouchableOpacity,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '../';
import styles from './styles';
import {Metrics, Images, Colors} from '../../theme';

const Button = props => {
  const {
    style,
    color,
    size,
    type,
    bold,
    icon,
    onlyIcon,
    iconWithoutBG,
    raised,
    iconRight,
    iconStyles,
    children,
    disabled,
    textAlign,
    isLoading,
    textStyle,
    hasLinear,
    background,
    indicatorColor,
    ...rest
  } = props;

  const renderInnerText = (
    title,
    color,
    size,
    type,
    textStyle,
    isLoading,
    indicatorColor,
    textAlign,
  ) => {
    if (isLoading) {
      return (
        <ActivityIndicator
          animating
          size="small"
          style={styles.spinner}
          color={indicatorColor}
        />
      );
    }

    return (
      <Text
        color={color}
        size={size}
        type={type}
        textAlign={textAlign}
        style={textStyle}>
        {title}
      </Text>
    );
  };

  const renderIcon = (
    icon,
    iconRight,
    onlyIcon,
    iconWithoutBG,
    disabled,
    iconStyles,
  ) => {
    if (!icon) {
      return null;
    }

    let positionStyle = {left: Metrics.doubleBaseMargin};
    if (iconRight) {
      positionStyle = {right: Metrics.doubleBaseMargin};
    }
    let icon_custom_style = !onlyIcon ? styles.icon : styles.onlyIcon;

    if (onlyIcon) {
      return (
        <Image
          resizeMode="contain"
          source={Images[icon]}
          style={[icon_custom_style, positionStyle, iconStyles]}
        />
      );
    }

    return (
      <View
        style={[
          styles.iconWrap,
          positionStyle,
          disabled && {backgroundColor: Colors.gray12},
          iconWithoutBG && {backgroundColor: 'transparent'},
        ]}>
        <Image
          resizeMode="contain"
          source={Images[icon]}
          style={[icon_custom_style]}
        />
      </View>
    );
  };

  const buttonStyle = StyleSheet.flatten([
    styles.button,
    raised && {
      shadowOffset: {
        width: 0,
        height: 16,
      },
      shadowOpacity: 1,
      shadowRadius: 10,
      elevation: 60,
    },
    !hasLinear && {
      backgroundColor: Colors.background[background] || background,
    },
    onlyIcon && {
      width: Metrics.defaultUIHeight,
      height: Metrics.defaultUIHeight,
      borderRadius: Metrics.defaultUIHeight,
      borderWidth: 4,
      borderColor: '#F3F3FD',
      borderStyle: 'solid',
    },

    Platform.OS === 'ios' && {
      shadowColor: 'rgba(78, 79, 114, 0.18)',
    },
    Platform.OS === 'android' && {
      shadowColor: 'rgba(78, 79, 114, 1.18)',
    },
    style,
    disabled && styles.opacity,
  ]);

  let pressed = false;
  const onPress = (...args) => {
    if (pressed) return;
    pressed = true;
    setTimeout(() => {
      pressed = false;
    }, 1000);

    props.onPress && props.onPress(...args);
  };

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback disabled={disabled} {...rest} onPress={onPress}>
        <View style={buttonStyle}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0.5, y: 0.25}}
            colors={
              disabled
                ? [Colors.grey2, Colors.grey2]
                : hasLinear
                ? Colors.presetColors.primary
                : [background, background]
            }
            style={[
              styles.buttonInner,
              onlyIcon ? {borderRadius: Metrics.defaultUIHeight} : {},
            ]}>
            {!onlyIcon &&
              renderInnerText(
                children,
                color,
                size,
                type,
                textStyle,
                isLoading,
                indicatorColor,
                textAlign,
                iconRight,
              )}
            {renderIcon(
              icon,
              iconRight,
              onlyIcon,
              iconWithoutBG,
              disabled,
              iconStyles,
            )}
          </LinearGradient>
        </View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={buttonStyle}
      disabled={disabled}
      {...rest}
      onPress={onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0.5, y: 0.25}}
        colors={
          disabled
            ? [Colors.grey2, Colors.grey2]
            : hasLinear
            ? Colors.presetColors.primary
            : [background, background]
        }
        style={[
          styles.buttonInner,
          onlyIcon ? {borderRadius: Metrics.defaultUIHeight} : {},
        ]}>
        {!onlyIcon &&
          renderInnerText(
            children,
            color,
            size,
            type,
            textStyle,
            isLoading,
            indicatorColor,
            textAlign,
            iconRight,
          )}
        {renderIcon(
          icon,
          iconRight,
          onlyIcon,
          iconWithoutBG,
          disabled,
          iconStyles,
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  background: PropTypes.string,
};

Button.defaultProps = {
  background: Colors.white,
};

export default Button;
