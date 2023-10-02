import _ from 'lodash';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Text, TextInput } from '..';
import { AppStyles, Colors, Images } from '../../theme';
import styles from './styles';

const QuantityInput = props => {
  const {label, quantity, setQuantity, maxQuantity, error} = props;

  handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity(prevQuantity => Number(prevQuantity) + 1);
    }
  };

  handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => Number(prevQuantity) - 1);
    }
  };

  return (
    <View style={[styles.incrementWrap]}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.quantityView]}>
        <TextInput
          placeholder="0"
          value={quantity.toString()}
          onChangeText={value => setQuantity(value)}
          keyboardType="numeric"
          style={{
            color: Colors.white,
            height: 45,
            width: '96%',
            marginLeft: -10,
          }}
        />
      </View>

      <TouchableOpacity
        style={[styles.plusWrapper]}
        onPress={handleIncrement}
        activeOpacity={0.5}>
        <Image
          source={Images.RightIcon}
          style={styles.topIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.minusWrapper]} onPress={handleDecrement}>
        <Image
          source={Images.RightIcon}
          style={styles.bottomIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
        <Text
          type="medium"
          size="small"
          color={Colors.red}
          style={[AppStyles.mTop5, AppStyles.mBottom5]}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default QuantityInput;
