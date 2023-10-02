// @flow
import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyView: {
    flex: 1,
    ...AppStyles.centerInner,
    // marginTop: 60,
  },
  emptyHeading: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    fontWeight: '600',
    fontSize: 24,
    marginTop: 35,
  },
  emptyDescription: {
    color: Colors.grey2,
    fontSize: 14,
    marginTop: 5,
  },
  addBg: {
    backgroundColor: Colors.white,
    width: 59,
    height: 59,
    borderRadius: 59,
    alignItems: 'center',
    justifyContent: 'center',
    ...AppStyles.mTop30,
  },
  addImg: {
    width: 20,
    height: 20,
    tintColor: Colors.black,
  },
});
