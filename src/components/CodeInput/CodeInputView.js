import React, {useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './CodeInputStyles';
import {Text, Button} from '../index';
import CodeInput from 'react-native-confirmation-code-input';
import {Colors, AppStyles, Fonts} from '../../theme';
import {useRef} from 'react';
export default function CodeInputView(props) {
  const {isModalVisible} = props;
  const ref = useRef();

  useEffect(() => {
    ref.current.clear();
  }, [isModalVisible]);

  return (
    <View style={[AppStyles.centerInner]}>
      <View
        style={{
          paddingStart: 12,
          height: 80,
          alignItems: 'center',
        }}>
        <CodeInput
          ref={ref}
          space={20}
          size={40}
          codeInputStyle={styles.codeInput}
          codeLength={props.codeLength}
          inputPosition="left"
          activeColor={Colors.black}
          inactiveColor={'#7e7e7e'}
          onFulfill={code => props.codeSubmit(code, ref)}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
}
