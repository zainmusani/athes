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
    flex: 1,
  },

  eventHeadingView: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  eventHeading1: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
  },

  eventHeading2: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: 13,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
  },
});
