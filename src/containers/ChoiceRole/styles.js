// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    ...AppStyles.pLeft30,
    ...AppStyles.pRight30,
    paddingTop: Metrics.statusBarHeight,
    justifyContent: 'space-between',
    height: Metrics.screenHeight - Metrics.navBarHeight,
    ...AppStyles.pBottom30,
  },
  topView: {
    ...AppStyles.pBottom20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomView: {
    justifyContent: 'space-around',
    paddingVertical: 40,
    alignItems: 'center',
  },
  batchsArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    ...AppStyles.mTop30,
    ...AppStyles.mBottom30,
  },
  batch: {
    width: '31.3%',
    backgroundColor: '#6C7491',
    alignItems: 'center',
    ...AppStyles.padding10,
    ...AppStyles.borderRadius,
    ...AppStyles.mBottom10,
    borderWidth: 2,
    borderColor: '#6C7491',
    paddingBottom: 20,
  },
});