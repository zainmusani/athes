// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  skipButton: {
    position: 'absolute',
    top: -40,
    right: 20,
  },

  skipButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '600',
    fontFamily: Fonts.type.bold,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  searchView: {
    backgroundColor: '#E3E4F2',
    borderRadius: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  textInput: {
    paddingVertical: 10,
    marginLeft: 10,
    width: '97%',
    borderRadius: 12,
    paddingRight: 15,
    paddingLeft: 5,
    fontSize: 18,
    color: Colors.black,
    height: 40,
  },

  totalPeopleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  peopleText: {
    fontFamily: Fonts.type.bold,
    fontSize: 18,
    color: Colors.white,
  },

  selectAllText: {
    fontSize: 18,
    fontFamily: Fonts.type.medium,
    color: Colors.white,
  },

  selectAllView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radioBoxView: {
    height: 16,
    width: 16,
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 50,
    marginLeft: 12,
    marginTop: 3,
    ...AppStyles.centerInner,
  },

  radioBox: {
    height: 10,
    width: 10,
    borderRadius: 50,
    backgroundColor: Colors.white,
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
    color: Colors.white,
  },
});
