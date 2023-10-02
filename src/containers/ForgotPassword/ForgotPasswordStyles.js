// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Metrics.statusBarHeight,
    height: Metrics.screenHeight,
    // justifyContent: "space-between",
    ...AppStyles.pBottom0,
  },
  topArea: {
    alignItems: 'center',
  },
  title: {
    maxWidth: '75%',
    width: '100%',
    ...AppStyles.marginVerticalBase,
    ...AppStyles.mBottom30,
  },

  // Form Styling
  formContainer: {
    flex: 0.5,
    paddingHorizontal: 60,
  },

  newPassContainer: {
    flex: 0.8,
    paddingHorizontal: 60,
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
});