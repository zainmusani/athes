// @flow
import {AppState, StyleSheet, FlatList} from 'react-native';
import {AppStyles, Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  // selected interest
  hiddenTap: {
    position: 'absolute',
    height: 50,
    width: '100%',
    left: 0,
    top: 40,
    margin: 'auto',
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 0,
  },

  selectedItem: {
    backgroundColor: '#efefef',
    width: '48%',
    borderRadius: 8,
    alignItems: 'center',
    ...AppStyles.padding10,
    ...AppStyles.mTop10,
  },
});
