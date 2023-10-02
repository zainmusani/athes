import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1},
  content: {
    paddingHorizontal: Metrics.ratio(20),
    paddingTop: 20,
    flex: 1,
    alignItems: 'center'
  },
  resendParent: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  counterTime: {
    ...AppStyles.marginVerticalBase,
    fontWeight: "700"
  },
  errorParent: {
    marginTop: 10,
  },
});
