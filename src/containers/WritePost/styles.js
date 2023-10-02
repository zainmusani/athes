// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    // flex: 1,
    ...AppStyles.paddingHorizontalBase,
    justifyContent: 'space-between',
    ...AppStyles.paddingVerticalBase,
  },
  postText: {
    width: '100%',
    height: 220,
    borderWidth: 1,
    borderColor: Colors.grey2,
    borderRadius: 10,
    backgroundColor: Colors.white,
    color: Colors.black,
    textAlignVertical: 'top',
    paddingTop: 20,
    ...AppStyles.padding20,
  },
  //Image Upload Styles Start
  uploadImage: {
    borderColor: Colors.black,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderRadius: 13,
    backgroundColor: Colors.white,
    ...AppStyles.padding15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  close: {transform: [{rotate: '45deg'}]},
  //Image Upload Styles End
  uploadedImage: {width: 40, height: 40, borderRadius: 20},
  hiddenTap: {
    position: 'absolute',
    height: 50,
    width: '100%',
    left: 0,
    top: 40,
    margin: 'auto',
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 0,
  },

  selectedItem: {
    backgroundColor: Colors.purple1,
    width: '48%',
    borderRadius: 8,
    alignItems: 'center',
    ...AppStyles.padding10,
    ...AppStyles.mTop10,
  },
  viewManage: {
    height: 50,
    backgroundColor: '#253340',
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtmanageHeader: {
    marginLeft: 10,
    color: Colors.white,
    fontFamily: Fonts.type.base,
    paddingRight: 20,
    fontSize: Fonts.size.xxSmall,
  },
  txtManage: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },
  grandIssueTxtManage: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.medium,
  },
  pleaseAllowPermissionText: {
    fontFamily: Fonts.type.Asap,
    fontSize: Fonts.size.medium,
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
});
