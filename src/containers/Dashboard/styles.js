// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  
  emptyArea: {
    // flex: 1,
    height: Metrics.screenHeight - 265,
    justifyContent: 'center',
    alignItems: 'center',
    ...AppStyles.paddingVerticalBase,
  },

  addbg: {
    backgroundColor: Colors.white,
    width: 59,
    height: 59,
    borderRadius: 59,
    alignItems: 'center',
    justifyContent: 'center',
    ...AppStyles.mTop10,
  },
  addImg: {
    width: 20,
    height: 20,
  },

  // Post Style
  post: {
    ...AppStyles.paddingVerticalBase,
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
    width: '100%',
    borderRadius: 40,
  },
  postActionsArea: {
    marginTop: -30,
    borderRadius: 105,
    backgroundColor: Colors.white,
    ...AppStyles.padding20,
    ...AppStyles.pLeft30,
    ...AppStyles.pRight30,
    flexDirection: 'row',
    width: 290,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionTxt: {
    ...AppStyles.mLeft10,
  },
});
