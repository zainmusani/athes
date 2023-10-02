// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles, Fonts } from "../../../theme";

export default StyleSheet.create({
  mainBg: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  stepsHeader: {
    backgroundColor: Colors.graybrown,
    ...AppStyles.padding20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  stepsBtn: {
    flexDirection: 'row',
    padding: 3,
    flexGrow: 1,
    marginHorizontal: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
  stepCount: {
    borderRadius: 33,
    width: 33,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.white,
    ...AppStyles.mRight10,
  },
  stepText: {
    color: Colors.grey,
  },
  backBtn: {
    transform: [{rotate: '180deg'}],
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    ...AppStyles.pTop20,
  },
});