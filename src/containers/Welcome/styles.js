// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...AppStyles.centerInner,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
