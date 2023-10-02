// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    ...AppStyles.paddingHorizontalBase,
  },

  leftArea: {
    padding: 10,
    paddingRight: 15,
    borderRightWidth: 2,
    borderRightColor: '#f5f5f5',
  },

  meetingMainView: {
    marginTop: 9,
    marginLeft: 10,
    paddingLeft: 15,
    backgroundColor: Colors.white,
    flex: 1,
    marginBottom: 10,
    borderRadius: 16,
    marginRight: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  titleText: {
    color: '#212525',
    fontFamily: Fonts.type.medium,
    fontSize: 16,
  },

  titleTextActive: {
    color: Colors.white,
    fontFamily: Fonts.type.medium,
    fontSize: 16,
  },

  timing: {
    color: '#212525',
    fontFamily: Fonts.type.medium,
    fontSize: 12,
    marginTop: 5,
  },
  view_more: {
    marginTop: 5,
    backgroundColor: Colors.blue,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4

  },
  timingActive: {
    color: Colors.white,
    fontFamily: Fonts.type.medium,
    fontSize: 12,
    marginTop: 5,
  },

  addressView: {
    ...AppStyles.flexRow,
    ...AppStyles.alignItemsCenter,
    ...AppStyles.mBottom10,
  },

  addressText: {
    color: '#212525',
    fontSize: 12,
  },

  addressTextActive: {
    color: Colors.white,
    fontSize: 12,
  },

  headingView: {
    position: 'absolute',
    top: 100,
    left: 0,
    zIndex: 9,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.black,
    paddingLeft: 25,
    width: '120%',
  },

  heading: {
    fontSize: 14,
    color: Colors.white,
    fontFamily: Fonts.type.medium,
    marginBottom: 15,
  },

  RBSheetContainer: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: '#F6F6F5',
    // paddingVertical: 10,
    margin: 'auto',
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

  RBSheetHeadingView: {
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },

  RBSheetHeading: {
    color: '#212525',
    fontFamily: Fonts.type.bold,
    fontSize: 16,
  },

  downArrowView: {
    position: 'absolute',
    top: 28,
    right: 30,
    height: 25,
    width: 25,
  },

  RBSheetMainView2: {
    backgroundColor: '#F6F6F5',
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },

  peopleText: {
    color: '#3B3B3B',
    fontFamily: Fonts.type.bold,
    fontSize: 16,
    marginTop: 10,
  },

  RBSheetView2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  userDetailMainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  userDetailView: {
    marginLeft: 12,
  },

  userDetailText2: {
    color: '#3B3B3B',
    fontSize: 16,
    fontFamily: Fonts.type.bold,
  },

  userDetailText3: {
    color: '#2C2929',
    fontSize: 10,
  },

  userDetailMainView2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  userDetailText: {
    color: '#212525',
    fontFamily: Fonts.type.bold,
    fontSize: 16,
  },

  RBSheetMainView3: {
    backgroundColor: '#F6F6F5',
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonView: {
    borderWidth: 2,
    borderColor: '#053460',
    borderRadius: 17,
    marginHorizontal: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    minWidth: '35%',
  },

  cancelButtonText: {
    color: '#04294D',
    fontSize: 16,
    fontFamily: Fonts.type.medium,
  },

  reasonText: {
    color: '#3B3B3B',
    fontFamily: Fonts.type.bold,
    fontSize: 16,
  },

  reasonTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#05315A',
    width: '100%',
    color: '#000',
    fontSize: 16,
    height: 50,
  },

  cancelViewcancelButtonView: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    // backgroundColor: 'red',
    paddingHorizontal: 50,
    backgroundColor: '#F6F6F5',
    paddingVertical: 13,
  },

  dateTextInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#05315A',
    width: '100%',
    color: '#212525',
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    height: 50,
  },

  hiddenTap: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    left: 0,
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  fetchingDataLoader: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    height:
      Metrics.screenHeight - Metrics.navBarHeight - Metrics.statusBarHeight,
  },
});
