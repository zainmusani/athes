// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },

  bgImage: {
    height: 175,
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
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
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: 10,
  },
});
