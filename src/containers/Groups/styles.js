// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    borderRadius: 19,
    overflow: 'hidden',
  },

  bgImage: {
    height: 175,
    borderRadius: 19,
    overflow: 'hidden',
    marginTop: 10,
  },

  textView: {
    paddingVertical: 20,
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    zIndex: 1,
  },

  title: {
    color: '#F9F9F9',
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
  },

  subTitle: {
    color: '#F9F9F9',
    fontSize: 12,
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
    marginTop: 3,
  },

  date: {
    color: '#F9F9F9',
    fontSize: 12,
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
    flex: 1,
    textAlign: 'right',
  },

  shadow: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    right: 0,
    left: 0,
    bottom: 0,
  },
  addbg: {
    backgroundColor: Colors.white,
    width: 59,
    height: 59,
    borderRadius: 59,
    alignItems: 'center',
    justifyContent: 'center',
    ...AppStyles.mTop30,
  },
  addImg: {
    tintColor: Colors.black,
    width: 20,
    height: 20,
  },
});
