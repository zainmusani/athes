// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    flex: 1,
  },

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
    backgroundColor: Colors.purple1,
    width: '48%',
    borderRadius: 8,
    alignItems: 'center',
    ...AppStyles.padding10,
    ...AppStyles.mTop10,
  },

  loginBtnArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 60,
  },
  loginDivider: {
    width: 100,
    height: 1,
    backgroundColor: Colors.white,
  },
});
