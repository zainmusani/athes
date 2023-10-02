// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  modalView: {
    backgroundColor: Colors.white,
    paddingVertical: 50,
    paddingHorizontal: 40,
    alignItems: 'center',
    borderRadius: 18,
  },

  modalHeading: {
    fontSize: 20,
    color: '#1E1E1E',
    fontFamily: Fonts.type.medium,
    marginTop: 30,
  },

  modalDescription: {
    color: '#2c2929cc',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
  },
});
