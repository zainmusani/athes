// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  commentClose: {
    width: 40,
    height: 50,
    position: 'absolute',
    right: 10,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentContainer: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: Colors.white,
    width: '94%',
    margin: 'auto',
    overflow: 'visible',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    shadowColor: Colors.black,
  },
  threeDotsMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'pink',
    marginTop: 10,
    paddingBottom: 15,
  },

  threeDotsView: {
    marginLeft: 15,
    flex: 1,
  },

  threeDotsName: {
    fontSize: 15,
    color: '#252529',
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
  },

  threeDotsDescription: {
    fontSize: 13,
    color: '#252529',
    fontFamily: Fonts.type.base,
  },
});
