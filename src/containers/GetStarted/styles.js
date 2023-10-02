// @flow
import { StyleSheet } from "react-native";
import {Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.doubleBaseMargin,
    paddingTop: Metrics.statusBarHeight,
    justifyContent: "space-between",
  },
  topView: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: '25%',
    ...AppStyles.mTop40,
  },
  bottomView: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  getStartBtn: {
    shadowOffset: {
      width: 0,
      height: 16
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 60
  },
  signInBtn: {
    shadowOffset: {
      width: 0,
      height: 16
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 60
  },
});