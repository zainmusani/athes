// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    marginTop: 20,
    flex: 1,
  },

  hiddenTap: {
    position: 'absolute',
    bottom: 10,
    height: 55,
    width: '100%',
    left: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 0,
  },

  selectedItem: {
    backgroundColor: Colors.purple1,
    width: '48%',
    borderRadius: 8,
    alignItems: 'center',
    ...AppStyles.padding10,
    ...AppStyles.mTop10,
  },
});
