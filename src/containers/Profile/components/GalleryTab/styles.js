// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../../../theme';

export default StyleSheet.create({
  multiImage: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 15,
    height: 15,
  },

  textView: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    ...AppStyles.flexRow,
    ...AppStyles.alignItemsCenter,
  },

  text: {
    color: Colors.grey4,
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
  },

  viewAllText: {
    color: Colors.grey4,
    fontFamily: Fonts.type.base,
    fontSize: 13,
    fontWeight: '400',
  },

  image: {
    marginRight: 15,
    marginTop: 20,
    width: 136.77,
    height: 135.92,
  },
});
