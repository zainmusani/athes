// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    // height: Metrics.screenHeight,
    justifyContent: 'space-between',
    ...AppStyles.pBottom0,
  },
  // Form Styling
  formContainer: {
    paddingHorizontal: 50,
  },

  loginBtnArea: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    ...AppStyles.mTop10,
  },
  loginDivider: {
    width: 100,
    height: 1,
    backgroundColor: Colors.white,
  },
  signUpView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 40,
    backgroundColor: Colors.black,
  },
  socialIconBg: {
    width: 53,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    ...AppStyles.mLeft10,
    ...AppStyles.mRight10,
  },
  socialIcon: {
    ...AppStyles.mLeft10,
    ...AppStyles.mRight10,
    width: 53,
    height: 48,
  },
  radioButtonStyles: {
    ...AppStyles.mBottom20,
    borderWidth: 1,
    borderColor: Colors.grey2,
    flexDirection: 'row',
    alignItems: 'center',
    ...AppStyles.padding10,
    borderRadius: 10,
    width: '48%',
  },
});
