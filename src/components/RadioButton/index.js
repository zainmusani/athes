import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {View} from 'react-native';
import {ButtonView, Text} from '../';
import styles from './styles';

const RadioButton = (props: Object) => {
  const {values, buttonStyles, privacy, setPrivacy} = props;

  const [value, setValue] = useState(privacy);

  return (
    <>
      {values.map(res => {
        return (
          <ButtonView
            key={res.key}
            style={[styles.container, props.buttonStyles]}
            onPress={() => {
              setValue(res.key);
              setPrivacy(res.key);
            }}>
            <View style={styles.radioCircle}>
              {value === res.key && <View style={styles.selectedRb} />}
            </View>
            <Text style={styles.radioText}>{res.text}</Text>
          </ButtonView>
        );
      })}
    </>
  );
};

RadioButton.propTypes = {
  values: PropTypes.array,
};

RadioButton.defaultProps = {
  values: [],
  buttonStyles: {},
};
export default RadioButton;
