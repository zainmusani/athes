// @flow
import PropTypes from 'prop-types';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Text} from '..';
import {AppStyles, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const PaymentComponent = props => {
  const {
    item,
    selectedPaymentId,
    isSecurityScreen,
    onDeleteIconPress,
    selectedId,
    isSettingScreen,
  } = props;
  const {
    id,
    brand,
    complete,
    country,
    expiryMonth,
    expiryYear,
    last4,
    postalCode,
    cvc,
    isSelected,
  } = item;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={() => {
        selectedId(id);
      }}>
      <View style={styles.radioBoxMainView}>
        <View style={styles.radioBoxView}>
          {selectedPaymentId === id && <View style={styles.radioBox} />}
        </View>
      </View>
      <View style={[AppStyles.mBottom10, AppStyles.mBottom0]}>
        <Image
          source={util.getCreditCardImage(brand)}
          style={styles.cardIcon}
        />
      </View>
      <View style={[styles.view]}>
        <View style={[AppStyles.mLeft5]}>
          <Text style={styles.cardNumber}>{`**** **** **** ${last4}`}</Text>
        </View>
      </View>

      {!!isSettingScreen && (
        <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => onDeleteIconPress(id)}>
            <Image source={Images.deleteDark} />
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

PaymentComponent.propTypes = {
  isSecurityScreen: PropTypes.bool,
  onDeleteIconPress: PropTypes.func,
  selectedId: PropTypes.func,
};

PaymentComponent.defaultProps = {
  isSecurityScreen: false,
  onDeleteIconPress: Function(),
  selectedId: Function(),
};

export default PaymentComponent;
