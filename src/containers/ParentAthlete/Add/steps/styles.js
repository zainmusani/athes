import { Platform, StyleSheet } from "react-native";
import { AppStyles, Colors, Fonts, Metrics } from "../../../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    // minHeight: (Metrics.screenHeight - Metrics.navBarHeight) - Metrics.navBarHeight * (Platform.OS === "ios" ? 2.3 : 3),
    justifyContent: 'space-between',
    // alignItems: "flex-end",
    // borderWidth: 1,
  },
  backBtn: {
    transform: [{rotate: '180deg'}],
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    ...AppStyles.pTop20,
  },
  // Form Styling
  formContainer: {
    paddingHorizontal: 50,
    ...AppStyles.pTop20,
  },
  hiddenTap: {
    position: 'absolute',
    top: 10,
    height: 60,
    width: '100%',
    left: 0,
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  selectedItem: {
    backgroundColor: Colors.purple1,
    width: '48%',
    borderRadius: 8,
    ...AppStyles.padding10,
    alignItems: 'center',
    ...AppStyles.mTop10,
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
  loginBtnArea: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  loginDivider: {
    width: 70,
    height: 1,
    backgroundColor: Colors.grey1,
  },
  profileImageWrap: {
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    ...AppStyles.marginVerticalBase,
  },
  profileCheck: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    backgroundColor: '#14D84B',
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});