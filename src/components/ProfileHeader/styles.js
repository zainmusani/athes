import {Platform, StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  topArea: {
    ...AppStyles.flexRow,
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 0 : 40,
  },
  profileHeader: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
    ...AppStyles.shadow1,
    // height: 238,
  },
  profileImg: {
    width: 129,
    height: 129,
    borderRadius: 129,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  bgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  profileBGImage: {
    ...AppStyles.pLeft20,
    ...AppStyles.pRight20,
    paddingTop: Metrics.statusBarHeight,
  },
  profileHeaderInner: {
    ...AppStyles.flexRow,
    ...AppStyles.mLeft20,
    ...AppStyles.mRight20,
  },
  btnWrapper: {
    marginLeft: -5,
    width: 20,
  },
  btnImage: {
    width: 10,
    height: 16,
  },
  seprator: {
    width: 1,
    height: '100%',
    backgroundColor: Colors.whiteGrey,
    marginHorizontal: 10,
  },
  editBtn: {
    // width: '100%',
    flexGrow: 1,
    height: 33,
    backgroundColor: Colors.whiteGrey,
    ...AppStyles.centerInner,
    borderRadius: 5,
    overflow: 'hidden',
  },
  feedText: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    position: 'absolute',
    top: -38,
    left: 40,
  },
  profileName: {
    // ...AppStyles.mBottom10,
  },

  commentContainer: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    shadowColor: Colors.black,
    paddingTop: 30,
  },
  commentClose: {
    width: 40,
    height: 60,
    position: 'absolute',
    right: 0,
    top: 6,
    justifyContent: 'center',
  },
  sheetItem: {
    ...AppStyles.pLeft30,
    ...AppStyles.pRight30,
    ...AppStyles.paddingVerticalBase,
    ...AppStyles.flexRow,
  },
});
