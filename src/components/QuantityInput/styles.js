import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  incrementWrap: {
    borderRadius: 6,
    marginTop: 15,
  },

  label: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    marginBottom: 10,
  },

  minusWrapper: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },

  plusWrapper: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    position: 'absolute',
    right: 0,
    top: 27,
  },

  quantityView: {
    width: '100%',
    paddingLeft: 0,
    borderBottomColor: Colors.grey1,
    borderBottomWidth: 1,
    alignItems: 'flex-start',
  },

  topIcon: {
    transform: [{rotate: '-90deg'}],
    width: 9.59,
    height: 16,
    tintColor: Colors.white,
  },

  bottomIcon: {
    transform: [{rotate: '90deg'}],
    width: 9.59,
    height: 16,
    tintColor: Colors.white,
  },
});
