// @flow
import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts, Metrics} from '../../../theme';

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
    marginBottom: 20,
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
  totalPeopleView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  peopleText: {
    fontFamily: Fonts.type.bold,
    fontSize: 18,
  },
  selectAllText: {
    fontSize: 18,
    fontFamily: Fonts.type.medium,
  },
  selectAllView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBoxView: {
    height: 16,
    width: 16,
    borderWidth: 1,
    borderRadius: 50,
    marginLeft: 12,
    marginTop: 3,
    ...AppStyles.centerInner,
    borderColor: Colors.white,
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
  newGroupBtnSec: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    backgroundColor: '#1427D8',
  },
  profilePic: {
    borderRadius: 50,
    resizeMode: 'cover',
    height: 40,
    width: 40,
  },
  newGroupBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    justifyContent: 'flex-start',
  },
  newGroupProfileIcon: {},
  fetchingDataLoader: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: Metrics.doubleBaseMargin,
  },
});
