// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles, Fonts } from "../../theme";

export default StyleSheet.create({
  contentAreaWrap: {
    height: Metrics.screenHeight,
    alignItems: "center",
    justifyContent: "flex-end",
    overflow: 'hidden',
    backgroundColor: Colors.white
  },
  blueRoundBG: {
    width: 525,
    height: 235,
    position: "absolute",
    top: 0,
    borderBottomLeftRadius: 165,
    borderBottomRightRadius: 165,
  },
  contentArea: {
    width: '90%',
    backgroundColor: Colors.white,
    minHeight: "94%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 33,
    shadowOffset: {
      width: 0,
      height: 16
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 60,
    shadowColor: Platform.OS === "ios" ? "rgba(78, 79, 114, 0.18)" : "rgba(78, 79, 114, 1.18)",
  },
  topArea: {
    paddingHorizontal: 25,
    ...AppStyles.pBottom10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey1,
  },
  centerArea: {
    paddingTop: 33,
    paddingHorizontal: 25,
  },
  arrowIcon: {
    width: 8,
    height: 12,
    transform: [{ rotate: "180deg" }]
  },
  contentRow: {
    ...AppStyles.flexRow, 
    ...AppStyles.spaceBetween, 
    ...AppStyles.mBottom30,
    alignItems: "center"
  }
});