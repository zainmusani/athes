import _ from 'lodash';
import React from 'react';
import {View} from 'react-native';
import {Text, ScreenWrapper} from '../../components';
import {Colors, Fonts} from '../../theme';
import styles from './styles';

const Store = props => {
  return (
    <ScreenWrapper pageBackground={Colors.black} headerTitle="Store">
      <View style={styles.container}>
        <Text
          color={Colors.white}
          size={48}
          style={{textTransform: 'uppercase'}}>
          Coming Soon
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default Store;
