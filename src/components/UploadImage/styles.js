import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  uploadImage: {
    borderColor: Colors.white,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderRadius: 13,
    backgroundColor: Colors.graybrown,
    ...AppStyles.padding15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...AppStyles.mTop30,
    ...AppStyles.mBottom20,
  },
  uploadPhotoTxt: {
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.bold,
    color: Colors.white,
    marginBottom: 2,
  },
  uploadSizeTxt: {
    fontSize: Fonts.size.xSmall,
    fontFamily: Fonts.type.base,
    color: Colors.grey2,
  },
  // close: {transform: [{rotate: '45deg'}]},
  //Image Upload Styles End
  uploadedImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  bottomSheetWrapper: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: Colors.white,
    overflow: 'visible',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    shadowColor: Colors.black,
  },

  bottomSheetItem: {
    padding: 10,
    marginHorizontal: 30,
    marginTop: 15,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 5,
    backgroundColor: Colors.black,
    ...AppStyles.flexRow,
    alignItems: 'center',
    ...AppStyles.pLeft25,
  },
  bottomSheetItemText: {
    textAlign: 'center',
    fontSize: Fonts.size.xSmall,
    ...AppStyles.mLeft15,
  },
  viewManage: {
    height: 50,
    backgroundColor: '#253340',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pleaseAllowPermissionText: {
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.small,
    color: Colors.green1,
    textAlign: 'center',
    ...AppStyles.marginHorizontalBase,
    ...AppStyles.marginVerticalBase,
  },
  permissionTextCont: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  grandIssueTxtManage: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.small,
  },
});
