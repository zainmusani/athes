import {Platform, StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  actionPostMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    width: '110%',
    marginLeft: '-5%',
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginTop: 10,
  },

  actionPostView: {
    flexDirection: 'row',
  },

  actionPostHeading: {
    color: '#252529',
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
    fontSize: 15,
  },

  actionPostDescription: {
    color: '#252529',
    fontWeight: '400',
    fontSize: 13,
  },

  undoButtonView: {
    backgroundColor: '#FAF5FF',
    borderColor: '#E9D8FD',
    borderWidth: 1,
    borderRadius: 42,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },

  undoButton: {
    color: '#553C9A',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: Fonts.type.medium,
  },
});
