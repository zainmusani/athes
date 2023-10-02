// @flow
import { AppState, StyleSheet, FlatList } from 'react-native';
import { AppStyles, Colors, Metrics, Fonts } from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  inner: {
    ...AppStyles.shadow1,
    ...AppStyles.flexRow,
    backgroundColor: Colors.graybrown,
    ...AppStyles.centerInner,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  tab: {
    width: Metrics.screenWidth / 5.2,
    height: Platform.OS === 'ios' ? 75 : 60,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingBottom: 13,
  },
  iconImage: {
    maxHeight: 20,
    maxWidth: 20,
  },
  iconActive: {
    tintColor: Colors.white,
  },
  activeTop: {
    position: 'absolute',
    top: -3,
    height: 5,
    width: 20,
    backgroundColor: Colors.white,
    borderRadius: 3,
  },
  tabTextWrap: {
    ...AppStyles.flexRow,
    // width: '100%',
    // height: 30,
    ...AppStyles.centerInner,
    // backgroundColor: 'red',
  },
});
