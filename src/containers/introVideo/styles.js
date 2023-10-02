// @flow
import { StyleSheet } from "react-native";
import { Colors, Metrics, AppStyles, Fonts } from "../../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtn: {
    width: 120,
    color: Colors.black,
    backgroundColor: Colors.white,
    borderRadius: 8,
    overflow: 'hidden',
    ...AppStyles.centerInner,
    paddingHorizontal: 30,
    height: 40,
  },
  dots: {width: 15, height: 5, backgroundColor: Colors.grey5, left: -130},
  activeDots: {backgroundColor: Colors.white},
});