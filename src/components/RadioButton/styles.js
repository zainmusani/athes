import {StyleSheet } from 'react-native';
import { AppStyles, Colors, Fonts, Metrics } from '../../theme';


export default StyleSheet.create({
  container: {},
  radioText: {
    ...AppStyles.mLeft10,
    fontSize: Fonts.size.normal,
    color: Colors.white,
  },
  radioCircle: {
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 5,
    backgroundColor: Colors.grey1,
    borderColor: Colors.grey1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: Colors.black,
    borderWidth: 5,
    borderColor: Colors.white,
  },
});