// @flow
import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {ButtonView, Text, TextInput} from '..';
import styles from './styles';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import util from '../../util';

const SelectBox = props => {
  const {
    customTextInputStyle,
    array,
    label,
    isDate,
    time,
    blackLabel,
    isRightIcon,
    icon,
    iconStyles,
    setData,
    error,
    ...rest
  } = props;

  const [isSelectSeasonVisble, setSelectSeasonVisble] = useState(false);

  return (
    <View style={{zIndex: 99}}>
      <TextInput
        placeholder="Select"
        placeholderTextColor={Colors.grey4}
        returnKeyType="next"
        underlineColorAndroid="#f000"
        label={label}
        lableColor={blackLabel ? Colors.black : Colors.white}
        style={
          customTextInputStyle
            ? customTextInputStyle
            : {
                borderBottomColor: Colors.grey1,
                borderBottomWidth: 1,
                paddingVertical: 12,
                marginTop: 8,
                fontFamily: Fonts.type.base,
                color: blackLabel ? Colors.black : Colors.white,
                fontSize: Fonts.size.normal,
                lineHeight: Fonts.size.normal,
                flexGrow: 1,
                textTransform: 'capitalize',
              }
        }
        // ref={selectSeasonRef}
        containerStyle={AppStyles.mBottom10}
        icon={
          icon && {
            url: icon,
            width: 19.75,
            height: 18,
          }
        }
        iconStyles={iconStyles}
        iconOnRight={isRightIcon ? true : false}
        {...rest}
      />

      {isSelectSeasonVisble && (
        <Modal
          onBackdropPress={() => setSelectSeasonVisble(false)}
          isVisible={isSelectSeasonVisble}
          backdropOpacity={0.4}>
          <View style={styles.mainView}>
            <Text
              textAlign="center"
              color={Colors.blue}
              type={Fonts.type.medium}
              bold="600"
              style={{
                backgroundColor: Colors.grey1,
                ...AppStyles.pTop10,
                ...AppStyles.pBottom10,
                borderBottomWidth: 1,
                borderColor: Colors.gray11,
              }}>
              Select {label}
            </Text>
            {array.map((item, index) => {
              const isFirstItem = index === 0;
              return (
                <ButtonView
                  onPress={() => {
                    setData(item.name ? item.name : item);
                    setSelectSeasonVisble(false);
                  }}
                  style={[styles.view, isFirstItem && {borderTopWidth: 0}]}>
                  {isDate && 
                    <Text
                      style={[styles.text, time && {textTransform: 'uppercase'}]}>
                      {util.getFormattedDateTime(item, 'MM/DD/YYYY')}
                    </Text>
                  }
                  {!isDate && 
                    <Text
                      style={[styles.text, time && {textTransform: 'uppercase'}]}>
                      {item.name
                        ? item.name
                        : time
                        ? util.convertTimeInto12(item)
                        : item}
                    </Text>
                  }
                </ButtonView>
              );
            })}
          </View>
        </Modal>
      )}

      {!_.isEmpty(error) && !_.isUndefined(error) && !_.isNull(error) && (
        <Text
          type="medium"
          size="small"
          color={Colors.red}
          style={[AppStyles.mTop5, AppStyles.mBottom5]}>
          {error}
        </Text>
      )}

      <ButtonView
        onPress={() => setSelectSeasonVisble(!isSelectSeasonVisble)}
        style={styles.tap}></ButtonView>
    </View>
  );
};

SelectBox.propTypes = {
  array: PropTypes.array.isRequired,
  label: PropTypes.string,
  isRightIcon: PropTypes.bool,
  isDate: PropTypes.bool,
  icon: PropTypes.string,
  errors: PropTypes.string,
  setData: PropTypes.func.isRequired,
};
SelectBox.defaultProps = {
  label: '',
  isRightIcon: false,
  isDate: false,
  icon: '',
  error: '',
};

export default SelectBox;
