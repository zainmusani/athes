// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../../theme';
import util from '../../../util';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.black,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrics.statusBarHeight + 20,
  },
  backButtonView: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    borderColor: '#CBCBCB',
    height: 44,
    width: 44,
    borderRadius: 10,
    ...AppStyles.centerInner,
  },
  profilePic: {
    height: 46,
    width: 46,
    borderRadius: 50,
    marginHorizontal: 15,
  },
  profileName: {
    fontSize: 18,
    fontFamily: Fonts.type.medium,
    fontWeight: '600',
    color: Colors.white,
  },
  userName: {
    color: '#010101',
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
    marginTop: 10,
  },
  msgViewSec: {
    maxWidth: Metrics.screenWidth - 80,
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    backgroundColor: Colors.background.othersMsgBg,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  othersMsgViewSec: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.background.myMsgBg,
  },
  myMsgText: {
    color: Colors.black,
  },
  othersMsgText: {
    color: Colors.white,
  },
  timeText: {
    color: Colors.black,
    fontSize: Fonts.size.xxSmall,
    alignSelf: 'flex-end',
    top: 5,
  },
  othersMsgTimeText: {
    color: Colors.white,
  },
  sendTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingBottom: 20,
  },
  sendText: {
    backgroundColor: '#F0F4F7',
    borderRadius: 19.5,
    paddingHorizontal: 15,
    height: 52,
    flex: 1,
    marginRight: 10,
    color: Colors.black,
  },
  sendButtonView: {},
  header: {
    color: Colors.white,
    alignSelf: 'center',
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.medium,
  },
  loaderStyle: {
    flex: 1,
    marginVertical: '80%',
  },
  fetchingMoreDataLoaderStyle: {
    marginVertical: '10%',
  },
  fetchingChatLoader: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: Metrics.doubleBaseMargin,
  },
  onlyGroupAdminCanSendMsgSec: {
    backgroundColor: Colors.background.primary,
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    marginBottom: util.isPlatformAndroid() ? 0 : 25,
  },
  onlyGroupAdminCanSendMsgText: {
    color: Colors.black,
    alignSelf: 'center',
    fontSize: Fonts.size.normal,
    fontFamily: Fonts.type.medium,
  },
});
