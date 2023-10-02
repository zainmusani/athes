// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  tap: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
  },

  mainView: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 10,
    // position: 'absolute',
    // top: 80,
    // left: 0,
    // right: 0,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    // shadow
  },

  view: {
    zIndex: 9,
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.gray11,
  },

  text: {
    color: '#333333',
    textTransform: 'capitalize',
  },
});
