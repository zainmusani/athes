// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.statusBarHeight,
    ...AppStyles.pBottom0,
  },
  topArea: {
    padding: Metrics.baseMargin,
  },
  loginTitle: {
    fontSize: 30,
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 3,
  },
  subtTitle: {
    fontSize: 16,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    color: Colors.white,
  },
  borderBottom: {
    height: 6,
    width: 40,
    backgroundColor: Colors.white,
    marginTop: 10,
    borderRadius: 3,
  },
  // Form Styling
  formContainer: {
    paddingHorizontal: 60,
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginTop: -10,
  },
  forgotTxt: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.base,
    color: Colors.white,
  },
  loginBtnArea: {
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 40,
  },
  loginDivider: {
    width: 100,
    height: 1,
    backgroundColor: Colors.white,
  },
  signUpTxt: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    lineHeight: 20,
    color: Colors.white,
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
  },
  socialIcon: {
    ...AppStyles.mLeft10,
    ...AppStyles.mRight10,
    width: 53,
    height: 48,
  },
});
