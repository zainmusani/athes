// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../../theme';

export default StyleSheet.create({
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
    color: '#212525',
    height: 40,
  },

  peopleText: {
    fontFamily: Fonts.type.bold,
    fontSize: 18,
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
