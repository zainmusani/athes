// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },

  inviteView: {
    backgroundColor: Colors.white,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    width: 70,
    elevation: 2,
    zIndex: 2,
  },

  invitetext: {
    fontSize: 12,
    fontFamily: Fonts.type.bold,
  },

  heading: {
    width: 260,
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
    color: Colors.grey2,
    fontFamily: Fonts.type.medium,
    fontSize: 16,
    textTransform: 'capitalize',
  },

  DetailText2: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    fontSize: 12,
  },

  organizerDetailMainView: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
    alignItems: 'center',
  },

  organizerDetailView: {
    flexDirection: 'row',
  },

  followButtonView: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 7,
    ...AppStyles.centerInner,
  },

  followButtonText: {
    color: Colors.black,
    fontSize: 12,
    fontFamily: Fonts.type.bold,
  },

  organizerTextName: {
    fontSize: 15,
    color: Colors.white,
    fontFamily: Fonts.type.bold,
  },

  organizerText: {
    color: '#706E8F',
    fontSize: 12,
    fontFamily: Fonts.type.bold,
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
    backgroundColor: Colors.graybrown,
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
    backgroundColor: Colors.white,
    height: 18.77,
    borderRadius: 40,
  },

  coachText1: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
  },

  coachText2: {
    color: Colors.white,
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
