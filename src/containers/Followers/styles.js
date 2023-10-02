// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...AppStyles.paddingHorizontalBase,
  },
  fetchingDataLoader: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: Metrics.doubleBaseMargin,
  },
});
