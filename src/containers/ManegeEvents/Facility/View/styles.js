// @flow
import { StyleSheet } from 'react-native';
import { Colors, Metrics, AppStyles, Fonts } from '../../../../theme';

export default StyleSheet.create({
  container: {
    paddingTop: 20,
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
    marginTop: 10,
  },

  invitetext: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },

  heading: {
    flex: 1,
    flexGrow: 1,
    fontSize: 35,
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
    color: Colors.white,
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
    color: Colors.white,
    fontFamily: Fonts.type.medium,
    fontSize: 16,
  },

  DetailText2: {
    color: Colors.grey2,
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
    paddingTop: 60,
  },

  aboutText: {
    color: Colors.grey2,
    fontSize: 18,
    fontFamily: Fonts.type.medium,
  },

  aboutDescription: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    marginTop: 5,
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
});
