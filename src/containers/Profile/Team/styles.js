// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...AppStyles.paddingHorizontalBase,
  },

  profileTabs: {
    // borderBottomWidth: 1,
    backgroundColor: Colors.graybrown,
    zIndex: 1,
    height: 70,
    ...AppStyles.paddingHorizontalBase,
    flexDirection: 'row',
  },

  tab: {
    ...AppStyles.paddingHorizontalBase,
    ...AppStyles.centerInner,
  },
  activeTabBottom: {
    position: 'absolute',
    bottom: -3,
    height: 5,
    width: 20,
    backgroundColor: Colors.white,
    borderRadius: 3,
    overflow: 'hidden',
    zIndex: 3,
  },

  eventDetailMainView1: {
    backgroundColor: '#04284A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    borderRadius: 11,
    marginRight: 20,
    marginTop: 15,
  },

  eventDetailView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageBg: {
    backgroundColor: Colors.white,
    width: 24,
    height: 24,
    borderRadius: 8,
    ...AppStyles.centerInner,
  },

  eventImg: {
    transform: [{rotate: '180deg'}],
    tintColor: 'black',
  },

  eventDate: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    marginLeft: 10,
  },

  eventName: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
    marginTop: 30,
    marginRight: 10,
  },

  profileContainer: {
    backgroundColor: Colors.black,
    flex: 1,
  },

  invitePeopleMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  invitePeopleView: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },

  invitePeopleText: {
    marginLeft: 20,
    fontSize: 18,
    fontFamily: Fonts.type.bold,
    color: Colors.white,
    fontWeight: '700',
  },

  // team rbsheet
  commentContainer: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: Colors.white,
    width: '100%',
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
  atheleteDetailArea: {
    // ...AppStyles.mTop10,
    ...AppStyles.padding25,
  },
  postHeader: {
    ...AppStyles.pLeft30,
    ...AppStyles.pRight30,
    ...AppStyles.pTop30,
    flex: 1,
    backgroundColor: '#F6F6F5',
  },
  downArrowTop: {
    position: 'absolute',
    right: 30,
    top: 15,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
});
