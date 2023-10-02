// @flow
import { StyleSheet } from 'react-native';
import { Colors, Metrics, AppStyles, Fonts } from '../../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },

  header: {
    backgroundColor: Colors.graybrown,
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerText1: {
    color: Colors.white,
    fontSize: 25,
    fontFamily: Fonts.type.medium,
  },

  headerText2: {
    color: Colors.grey2,
    fontSize: 14,
    fontFamily: Fonts.type.base,
    marginTop: 8,
  },

  heading: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: Fonts.type.medium,
    marginTop: 25,
    marginBottom: 15,
  },

  athleteMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 2,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  athleteView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  athleteName: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    color: '#2C2929',
  },

  enrollText: {
    color: '#011B34',
    fontSize: 14,
    fontFamily: Fonts.type.medium,
  },

  paymentView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },

  paymentText1: {
    color: Colors.grey2,
    fontSize: 14,
    fontFamily: Fonts.type.medium,
  },

  paymentText2: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.type.medium,
  },

  RBSheetContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 15,
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

  RBSheetButton: {},

  RBSheetButtonText: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: Fonts.type.medium,
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
