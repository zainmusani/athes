import _ from 'lodash';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {ScreenWrapper, Text} from '../../components';
import {Colors} from '../../theme';
import styles from './styles';

const DeepLinkScreen = props => {
  const {isComingFromDeepLinkUrl, done} = props;

  useEffect(() => {
    if (done) {
      Actions.reset('athes_tab');
    }

    if (isComingFromDeepLinkUrl) {
      Actions.push('paymentWebView', {...props});
    }

    // if (redirectLogin && !isComingFromDeepLinkUrl && !done) {
    //   Actions.reset('login');
    // }
  }, []);
  return (
    <ScreenWrapper pageBackground={Colors.black}>
      <View style={styles.container}>
        <Text color={Colors.black}>Athes</Text>
      </View>
    </ScreenWrapper>
  );
};

export default DeepLinkScreen;
