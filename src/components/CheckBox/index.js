import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, Image} from 'react-native';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import {ButtonView, Text} from '..';
import _ from 'lodash';

const CheckBox = props => {
  const {
    checked,
    error,
    setChecked,
    text,
    firstLinkText,
    firstLink,
    secondLinkText,
    secondLink,
    customStyle,
  } = props;

  return (
    <>
      <ButtonView
        onPress={() => setChecked(!checked)}
        style={[
          {
            ...AppStyles.flexRow,
            ...AppStyles.paddingVerticalBase,

            width: '100%',
          },
          customStyle,
        ]}>
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.white,
            height: 20,
            width: 20,
            ...AppStyles.centerInner,
            marginRight: 10,
            marginTop: 5,
          }}>
          {checked && (
            <Image source={Images.check} style={{tintColor: Colors.white}} />
          )}
        </View>
        <View style={{...AppStyles.flexRow, flexWrap: 'wrap', width: '100%'}}>
          <Text size={Fonts.size.normal} style={{color: Colors.white}}>
            {text}
          </Text>
          <ButtonView style={{marginHorizontal: 5}} onPress={firstLink}>
            <Text size={Fonts.size.normal} style={{color: '#2063a5'}}>
              {firstLinkText}
            </Text>
          </ButtonView>
          {secondLinkText && (
            <Text size={Fonts.size.normal} style={{color: Colors.white}}>
              and the
            </Text>
          )}

          <ButtonView style={{marginHorizontal: 5}} onPress={secondLink}>
            <Text size={Fonts.size.normal} style={{color: '#2063a5'}}>
              {secondLinkText}
            </Text>
          </ButtonView>
        </View>
      </ButtonView>
      {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
        <Text
          type="medium"
          size="small"
          color={Colors.red}
          style={[AppStyles.mTop5, AppStyles.mBottom5]}>
          {error}
        </Text>
      )}
    </>
  );
};

CheckBox.propTypes = {
  text: PropTypes.string,
  error: PropTypes.string,
  firstLinkText: PropTypes.string,
  firstLink: PropTypes.func,
  secondLinkText: PropTypes.string,
  secondLink: PropTypes.func,
  customStyle: PropTypes.object,
};

CheckBox.defaultProps = {
  text: '',
  error: '',
  firstLinkText: '',
  firstLink: () => {},
  secondLinkText: '',
  secondLink: () => {},
  customStyle: {},
};
export default CheckBox;
