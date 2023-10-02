// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  notificationHeading: {
    color: Colors.grey2,
    fontSize: 15,
    paddingHorizontal: 10,
    fontWeight: '400',
  },

  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaeb',
    marginBottom: 15,
    marginTop: 20,
  },

  newNotificationMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    paddingHorizontal: 10,
  },

  newNotificationView: {
    flexDirection: 'row',
    // alignItems: 'center',
    flex: 1,
  },

  userNameView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    flex: 1,
    marginRight: 10,
  },

  userText: {
    color: Colors.white,
    fontSize: 13,
  },

  border1: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaeb',
    marginBottom: 15,
  },

  likeButtonView: {
    marginLeft: 8,
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  replyText: {
    color: Colors.grey2,
    fontSize: 11,
    marginTop: 2,
    marginLeft: 8,
  },

  selectionListView: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  selectionListStyle: {
    paddingHorizontal: 20,
    paddingLeft: 20,

    backgroundColor: Colors.black,
  },
  newView: {
    height: 0.4,
  },
  newTxt: {
    color: Colors.white,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.semiBold,
    marginTop: 20,
  },
  earlierView: {
    height: 0.4,
    // backgroundColor: 'rgba(60, 60, 67, 0.29)',
    marginTop: 30,
  },
  itemLikeView: {
    flexDirection: 'row',
    marginTop: 15,
    // alignItems: 'center',
  },
  img: {width: 30, height: 30, borderRadius: 15},
  imgNoView: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.headerTitle,
  },
  itemTxt: {
    color: Colors.white,
    alignSelf: 'center',

    fontSize: 17,
    fontFamily: Fonts.type.semiBold,
  },
  itemMessageTxt: {
    color: Colors.gray10,
  },
  userName: {
    flex: 0.7,
    alignItems: 'flex-start',

    marginLeft: 10,
  },
  hrsTxt: {
    color: Colors.gray7,
    marginTop: 2,
  },
  postImg: {
    width: 44,
    height: 44,
    position: 'absolute',

    right: 10,
  },
  emptyNotificationList: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  fetchingDataLoader: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: Metrics.doubleBaseMargin,
  },
});
