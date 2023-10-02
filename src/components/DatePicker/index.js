// @flow
import React, {useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import {Button, TextInput} from '..';
import {View} from 'react-native';
import styles from './styles';
import {AppStyles, Colors} from '../../theme';
import PropTypes from 'prop-types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import util from '../../util';

const DatePicker = props => {
  const {
    label,
    visible,
    minimumDate,
    maximumDate,
    dobValue,
    setDobValue,
    error,
    ...rest
  } = props;

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(visible);


  const dobRef = useRef();

  const handleConfirm = date => {
    var dateObj = date;
    setDobValue(dateObj);
    setIsDatePickerVisible(false);
  };

  return (
    <View>
      <TextInput
        placeholder="MM/DD/YYYY" //12345
        placeholderTextColor={Colors.grey4}
        returnKeyType="next"
        underlineColorAndroid="#f000"
        label={label}
        lableColor={Colors.white}
        ref={dobRef}
        editable={false}
        caretHidden={true}
        containerStyle={AppStyles.mBottom10}
        onSubmitEditing={() => {
          dobRef.current.blur();
        }}
        onPress={() => setIsDatePickerVisible(true)}
        value={
          !_.isNull(dobValue)
            ? util.getFormattedDateTime(dobValue, 'MM/DD/YYYY')
            : ''
        }
        error={error}
        onChangeText={value => {
          setDobValue(value);
        }}
      />
      <Button
        style={styles.hiddenTap}
        background="transparent"
        onPress={() => setIsDatePickerVisible(true)}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={date => handleConfirm(date)}
        onCancel={() => setIsDatePickerVisible(false)}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        {...rest}
      />
    </View>
  );
};;

DatePicker.propTypes = {
  selectedValue: PropTypes.array,
  setSelectedValue: PropTypes.func,
  minimumDate: PropTypes.object,
  maximumDate: PropTypes.object,
  label: PropTypes.string,
};

DatePicker.defaultProps = {
  selectedValue: [],
  setSelectedValue: () => {},
  minimumDate: null,
  maximumDate: null,
  label: 'Date of Birth',
};
export default DatePicker;
