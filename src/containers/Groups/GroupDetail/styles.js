// @flow
import { StyleSheet } from 'react-native';
import { Colors, Metrics, AppStyles, Fonts } from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    // marginBottom: 80,
    paddingHorizontal: 20,
  },

  inviteMainView: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: -30,
    marginBottom: -30,
    // shadow
    shadowColor:
      Platform.OS === 'ios'
        ? 'rgba(78, 79, 114, 0.25)'
        : 'rgba(78, 79, 114, 1)',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    zIndex: 9,
  },

  inviteView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inviteView1Text: {
    color: '#011B34',
    fontSize: 15,
    fontFamily: Fonts.type.medium,
    marginLeft: 7,
  },

  inviteView: {
    backgroundColor: '#011B34',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 7,
  },

  invitetext: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },

  heading: {
    fontSize: 35,
    fontFamily: Fonts.type.bold,
    color: '#120D26',
  },

  eventDetailView: {
    flexDirection: 'row',
  },

  DetailView: {
    marginLeft: 10,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },

  DetailText1: {
    color: '#120D26',
    fontFamily: Fonts.type.medium,
    fontSize: 16,
  },

  DetailText2: {
    color: '#747688',
    fontFamily: Fonts.type.bold,
    fontSize: 12,
  },

  organizerDetailMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
    alignItems: 'center',
  },

  organizerDetailView: {
    flexDirection: 'row',
  },

  followButtonView: {
    backgroundColor: '#011b341f',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 7,
    ...AppStyles.centerInner,
  },

  followButtonText: {
    color: '#011B34',
    fontSize: 12,
    fontFamily: Fonts.type.bold,
  },

  organizerTextName: {
    fontSize: 15,
    color: '#0D0C26',
    fontFamily: Fonts.type.bold,
  },

  organizerText: {
    color: '#706E8F',
    fontSize: 12,
    fontFamily: Fonts.type.bold,
  },

  linearGradientView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
  },

  aboutText: {
    color: '#120d26d6',
    fontSize: 18,
    fontFamily: Fonts.type.medium,
  },

  aboutDescription: {
    color: '#120d26d6',
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    marginTop: 5,
  },

  tabMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-evenly',
    justifyContent: 'center',
    paddingBottom: 15,
  },

  tabView: {
    backgroundColor: '#E8ECFC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 7,
    marginHorizontal: 10,
    width: 115,
    alignItems: 'center',
  },

  tabViewSelected: {
    backgroundColor: '#011B34',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 7,
    marginHorizontal: 10,
    width: 115,
    alignItems: 'center',
  },

  tabText: {
    color: '#616D9A',
    fontSize: 17,
    fontFamily: Fonts.type.medium,
  },

  tabTextSelected: {
    color: Colors.white,
    fontSize: 17,
    fontFamily: Fonts.type.medium,
  },

  coachMainView: {
    backgroundColor: '#E9EBFA',
    paddingBottom: 25,
    marginBottom: 15,
  },

  coachView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },

  border: {
    width: 4.42,
    backgroundColor: '#011B34',
    height: 18.77,
    borderRadius: 40,
  },

  coachText1: {
    color: '#011B34',
    fontSize: 16,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
  },

  coachText2: {
    color: '#011B34',
    fontSize: 12,
    fontFamily: Fonts.type.medium,
    fontWeight: '700',
    marginTop: 2,
  },

  RBSheetMainContainer: {
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    backgroundColor: Colors.white,
    width: '100%',
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

  RBSheetContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  deleteEventHeading: {
    color: '#252529',
    fontSize: 18,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
    textAlign: 'center',
  },

  RBSheetHeading: {
    color: '#052F56',
    fontSize: 24,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 15,
  },

  RBSheetDate: {
    color: '#052F56',
    fontSize: 14,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    textAlign: 'center',
    opacity: 0.4,
    marginTop: 5,
  },
  writeArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    backgroundColor: Colors.white,
  },
  writeLeftImage: {
    width: 38,
    height: 38,
    borderRadius: 38,
    overflow: 'hidden',
  },
  writeRightImage: {
    marginRight: 15,
  },
  writeField: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  membersImages: {
    borderRadius: 100,
    height: 35,
    width: 35,
  },
});
