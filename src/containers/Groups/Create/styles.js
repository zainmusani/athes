// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 35,
    justifyContent: 'space-between',
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
  uploadImage: {
    borderColor: Colors.black,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderRadius: 13,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...AppStyles.padding15,
    ...AppStyles.mTop30,
    ...AppStyles.mBottom30,
  },
  uploadPhotoTxt: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.base,
    color: Colors.darkgrey,
  },
  uploadSizeTxt: {
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.base,
    color: Colors.grey2,
  },

  //Image Upload Styles End
  uploadedImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
