// @flow
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Image, View} from 'react-native';
import {Text} from '..';
import styles from './styles';
import {AppStyles, Images} from '../../theme';
import {ButtonView} from '../../components';

const PaymentOption = props => {
  const {item, radioBoxCheck, setRadioBoxCheck} = props;
  const {image, title, description} = item;

  return (
    <ButtonView
      style={styles.container}
      onPress={() => setRadioBoxCheck(title)}>
      <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
        <Image source={image} style={{width: 42}} resizeMode={'contain'} />

        <View style={AppStyles.mLeft15}>
          <Text style={styles.heading}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      <View style={styles.RadioBox}>
        {radioBoxCheck === title && <View style={styles.RadioBoxCheck}></View>}
      </View>
    </ButtonView>
  );
};

export default PaymentOption;
