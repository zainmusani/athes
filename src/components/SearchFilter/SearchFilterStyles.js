import {Platform, StyleSheet} from 'react-native';
import {AppStyles, Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrics.doubleBaseMargin,
    justifyContent: 'flex-start',
  },
  buttonView: {
    ...AppStyles.centerInner,
    marginVertical: 20,
  },

  defualtDataText: {
    fontSize: 16,
    marginVertical: 7,
    paddingHorizontal: 10,
  },

  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
