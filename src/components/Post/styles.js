// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  // Post Style
  post: {
    ...AppStyles.paddingVerticalBase,
    flex: 1,
    alignItems: 'center',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...AppStyles.pTop10,
    ...AppStyles.pBottom10,
  },
  headerLeft: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  postOptions: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  dotsImg: {
    width: 6,
    height: 20,
    tintColor: Colors.white,
  },
  profileImage: {
    width: 51,
    height: 51,
    overflow: 'hidden',
    ...AppStyles.mRight15,
    borderRadius: 51,
  },
  postIntro: {
    justifyContent: 'center',
  },
  postContent: {
    ...AppStyles.pBottom20,
  },
  postImgWrap: {
    width: '100%',
    alignItems: 'center',
  },
  postImg: {
    width: Metrics.screenWidth,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  postActionsArea: {
    marginTop: -20,
    borderRadius: 40,
    backgroundColor: Colors.black,
    ...AppStyles.pLeft10,
    ...AppStyles.pRight10,
    flexDirection: 'row',
    maxWidth: 180,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  actionTxt: {
    ...AppStyles.mLeft5,
    color: Colors.white,
  },
  actionImg: {
    tintColor: Colors.white,
    width: 17,
    height: 17,
  },

  innerActionWrap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 9,
    justifyContent: 'flex-end',
  },
  innerActionBtn: {
    paddingHorizontal: 5,
  },

  pendingMainView: {
    // backgroundColor: 'purple',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 10,
    ...AppStyles.paddingVerticalBase,
    // width: 300,
  },

  pendingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  pendingMsg: {
    color: Colors.white,
    fontSize: Fonts.size.xSmall,
    fontFamily: Fonts.type.bold,
    marginLeft: 10,
  },
  modalBottomComp: {
    display: 'flex',
    ...AppStyles.padding10,
    alignItems: 'center',
  },

  childPostText: {
    ...AppStyles.paddingHorizontalBase,
    width: '94%',
    margin: 'auto',
    borderColor: Colors.grey1,
    borderWidth: 1,
    borderRadius: 10,
  },
  userName: {
    fontSize: Fonts.size.semiMedium,
    fontFamily: Fonts.type.bold,
    color: Colors.white,
  },
  postTimeText: {
    fontSize: Fonts.size.xxxSmall,
    fontFamily: Fonts.type.bold,
    color: Colors.grey3,
  },
  sponsoredText: {
    fontSize: Fonts.size.xxSmall,
    fontFamily: Fonts.type.bold,
    color: Colors.grey3,
    alignSelf: 'center',
  },
});
