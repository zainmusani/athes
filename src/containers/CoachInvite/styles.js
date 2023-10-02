// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.graybrown,
    marginHorizontal: 15,
    paddingHorizontal: 18,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 5,
  },

  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  achievementText: {
    color: '#E0E1EB',
    fontSize: 14,
    fontFamily: Fonts.type.base,
    fontWeight: '300',
    textTransform: 'capitalize',
  },

  eventName: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: Fonts.type.base,
    color: Colors.white,
    marginTop: 6,
    lineHeight: 24,
  },

  matchPointsMainView: {
    backgroundColor: 'rgba(221, 126, 6, 0.16);',
    borderWidth: 1,
    borderColor: 'rgba(221, 126, 6, 0.6)',
    borderRadius: 4,
    paddingVertical: 5,
    paddingRight: 20,
    paddingLeft: 12,
  },

  matchPointsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },

  matchText: {
    color: '#E0E1EB',
    fontSize: 12,
    fontFamily: Fonts.type.base,
    fontWeight: '300',
  },

  pointsText: {
    color: '#DD7E06',
    fontSize: 12,
    fontWeight: '300',
    fontFamily: Fonts.type.base,
    marginLeft: 5,
  },

  coachProfileMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },

  coachName: {
    color: '#E0E1EB',
    fontSize: 14,
    fontFamily: Fonts.type.base,
    fontWeight: '300',
  },

  coachText: {
    color: '#A6A9B8',
    fontSize: 12,
    fontFamily: Fonts.type.base,
    fontWeight: '300',
  },

  inviteText: {
    color: '#F9F9F9',
    fontSize: 15,
    fontWeight: '700',
    fontFamily: Fonts.type.bold,
  },

  invitedMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: Colors.white,
    marginVertical: 10,
  },

  coachInviteText1: {
    color: '#252529',
    fontSize: 15,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
  },

  coachInviteText2: {
    color: '#252529',
    fontSize: 13,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
  },

  sendButtonView: {
    backgroundColor: '#FAF5FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 42,
    borderWidth: 1,
    borderColor: '#E9D8FD',
  },

  sendButton: {
    color: '#553C9A',
    fontSize: 10,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
  },
});
