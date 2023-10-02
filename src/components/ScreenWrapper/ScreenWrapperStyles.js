// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: Metrics.statusBarHeight,
    backgroundColor: Colors.graybrown,
  },
  headerContainer: {
    paddingTop: Metrics.statusBarHeight,
    width: Metrics.screenWidth,
    paddingHorizontal: Metrics.smallMargin,
    height: Metrics.navBarHeight,
    justifyContent: 'center',
  },
  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey1,
  },
  btnImage: {
    width: 10,
    height: 16,
  },
  btnWrapper: {
    padding: Metrics.smallMargin,
    justifyContent: 'center',
    minWidth: 45,
    minHeight: 45,
    ...AppStyles.centerInner,
    flexDirection: 'row',
  },
  rightBtn: {
    backgroundColor: Colors.white,
    paddingVertical: 0,
    paddingHorizontal: 10,
    minHeight: 20,
    height: 25,
    borderRadius: 5,
    marginTop: 5,
    marginRight: 5,
  },
  searchHeader: {
    height: Metrics.navBarHeight + 50,
  },
  DrawerTitle: {
    alignItems: 'center',
    ...AppStyles.mTop25,
    ...AppStyles.mBottom25,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    ...AppStyles.pTop10,
    ...AppStyles.pBottom10,
    ...AppStyles.mTop10,
    ...AppStyles.mBottom10,
  },

  gradientStyles: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: Metrics.screenWidth,
    paddingTop: 30,
  },

  minimize: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 2,
  },
  frontPageStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    overflow: 'hidden',
    zIndex: 1,
  },
  backBtn: {
    tintColor: Colors.black,
    width: 5,
    height: 9,
    transform: [{rotate: '180deg'}],
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...AppStyles.padding20,
    paddingHorizontal: 30,
  },
  logoutBtnWrap: {
    borderRadius: 40,
    overflow: 'hidden',
    ...AppStyles.mBottom30,
    ...AppStyles.marginHorizontalBase,
  },
  sideMenu: {
    flexGrow: 1,
    ...AppStyles.pLeft10,
    ...AppStyles.mTop20,
  },

  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  chatIconView: {
    position: 'absolute',
    top: 13,
    right: 40,
    alignItems: 'flex-end',
    width: 30,
    height: 30,
  },
  notificationsCount: {
    backgroundColor: Colors.red,
    position: 'absolute',
    right: 3,
    top: -7,
    alignItems: 'center',
    width: 15,
    height: 15,
    borderRadius: 7.5,
    justifyContent: 'center',
  },
  countTxt: {
    alignSelf: 'center',
    color: Colors.white
  },
});
