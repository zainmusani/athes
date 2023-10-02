// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  // Post Style
  post: {
    ...AppStyles.mTop40,
    justifyContent: 'center',
    ...AppStyles.paddingVerticalBase,
    // backgroundColor: Colors.grey2,
    flex: 0.85,
  },
  postContent: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    ...AppStyles.paddingHorizontalBase,
  },
  postImgWrap: {
    flex: 1,
    width: Metrics.screenWidth,
    alignItems: 'center',
  },
  postImg: {
    width: Metrics.screenWidth,
    maxHeight: 380,
  },
  postActionsArea: {
    ...AppStyles.mTop20,
    borderRadius: 105,
    backgroundColor: Colors.white,
    ...AppStyles.padding20,
    ...AppStyles.pLeft30,
    ...AppStyles.pRight30,
    flexDirection: 'row',
    width: 290,
    justifyContent: 'space-between',
    // alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 40,
    elevation: 40,
    shadowColor: 'rgba(0,0,0,0.12)',
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionTxt: {
    ...AppStyles.mLeft10,
  },

  thumbsActions: {
    width: 350,
    ...AppStyles.pLeft15,
    ...AppStyles.pRight15,
    marginBottom: 70,
    shadowColor: 'rgba(0,0,0,1)',
  },
  innerActionWrap: {
    position: 'absolute',
    top: 0,
    bottom: 90,
    zIndex: 9,
    justifyContent: 'flex-end',
  },
  innerActionBtn: {
    paddingHorizontal: 5,
  },
  // Comment Style
  commentClose: {
    width: 40,
    height: 60,
    position: 'absolute',
    right: 0,
    top: 0,
    justifyContent: 'center',
  },
  commentContainer: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: Colors.white,
    width: '94%',
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
  comments: {
    ...AppStyles.padding20,
  },
  commentAvator: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  commentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#C8C7CC',
    ...AppStyles.pTop10,
    ...AppStyles.pBottom10,
  },
  commentDetail: {
    flexGrow: 1,
    ...AppStyles.pLeft10,
    ...AppStyles.pRight10,
  },
  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shareSearchView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    backgroundColor: 'rgba(142, 142, 147, 0.05)',
    width: '80%',
    marginRight: 7,
    paddingHorizontal: 10,
    borderRadius: 15,
    height: 36,
  },

  shareMainView: {
    marginBottom: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  shareSearch: {
    alignItems: 'flex-start',
    width: '95%',
    color: Colors.black,
  },

  shareView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  shareProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  shareTextView: {
    marginLeft: 15,
  },

  shareTextName: {
    color: '#2D3748',
    fontSize: 16,
  },

  shareTextAthlete: {
    color: '#A0AEC0',
    fontSize: 12,
  },

  shareSendButtonView: {
    borderColor: '#04294D',
    borderWidth: 1,
    borderRadius: 42,
    height: 26,
    alignSelf: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#FAF5FF',
    ...AppStyles.centerInner,
  },

  shareSendButtonText: {
    color: '#553C9A',
    fontFamily: Fonts.type.medium,
    fontSize: 10,
  },

  threeDotsMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
  },

  threeDotsView: {
    marginLeft: 15,
    flex: 1,
  },

  threeDotsName: {
    fontSize: 15,
    color: '#252529',
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
  },

  threeDotsDescription: {
    fontSize: 13,
    color: '#252529',
    fontFamily: Fonts.type.base,
  },

  pendingMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 10,
    ...AppStyles.paddingVerticalBase,
  },

  pendingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  pendingMsg: {
    color: '#3B3B3B',
    fontSize: 18,
    fontFamily: Fonts.type.medium,
    fontWeight: '600',
    marginLeft: 10,
  },

  // link styles
});
