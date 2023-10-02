// @flow
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  paymentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },

  paymentText1: {
    color: '#2c2929cc',
    fontSize: 14,
    fontFamily: Fonts.type.medium,
  },

  paymentText2: {
    color: '#1E1E1E',
    fontSize: 16,
    fontFamily: Fonts.type.medium,
  },

  RBSheetContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },

  payNowText: {
    color: '#1E1E20',
    fontSize: 18,
    fontFamily: Fonts.type.medium,
  },

  RBSheetDescription: {
    color: 'rgba(172, 172, 176, 0.8);',
    fontSize: 12,
    marginTop: 15,
  },

  RBSheetTextInputLabel: {
    color: 'rgba(172, 172, 176, 0.8);',
    fontSize: 12,
  },

  RBSheetTextInput: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    color: '#3E3E3E',
    height: 48,
  },

  expiryDateView: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  termsAndServiceView: {
    fontSize: 12,
    textAlign: 'center',
    color: ' rgba(172, 172, 176, 0.8)',
  },

  termsAndService: {
    color: '#1E1E20',
    fontSize: 12,
  },

  RBSheetButtonView: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 5,
  },

  RBSheetButton: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    marginTop: 20,
  },

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

  unTickView: {
    width: 24.22,
    height: 24.22,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: '#011B34',
  },
});
