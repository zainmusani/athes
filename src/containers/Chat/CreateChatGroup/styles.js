// @flow
import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts} from '../../../theme';

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
    borderColor: Colors.white,
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
  createBtnStyle: {
    ...AppStyles.mLeft30,
    ...AppStyles.mRight30,
    ...AppStyles.mBottom15,
    ...AppStyles.mTop15,
  },
  toggleBtnCont: {
    width: 56,
    height: 26,
    borderRadius: 25,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.presetColors.primary[1],
  },
  toggleInnerCircle: {
    width: 18,
    height: 18,
    borderRadius: 18,
  },
  disableGroupChatTextStyle: {
    color: Colors.white,
    alignSelf: 'center',
    fontSize: 15,
    paddingLeft: 5,
  },
});
