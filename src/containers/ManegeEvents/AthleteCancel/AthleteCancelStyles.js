// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },

  headerTitleStyle: {
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
  },

  header: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: Colors.graybrown,
  },

  headerText1: {
    color: Colors.white,
    fontSize: 25,
    fontFamily: Fonts.type.medium,
  },

  headerText2: {
    color: Colors.grey2,
    fontSize: 14,
    fontFamily: Fonts.type.base,
    marginTop: 8,
  },

  heading: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: Fonts.type.medium,
    marginTop: 25,
    marginBottom: 15,
  },

  athleteMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 2,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  athleteView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  athleteName: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    color: '#2C2929',
  },

  enrollText: {
    color: '#011B34',
    fontSize: 14,
    fontFamily: Fonts.type.medium,
  },

  unSelectedItem: {
    borderWidth: 1,
    borderColor: '#011B34',
    width: 24.22,
    height: 24.22,
    borderRadius: 50,
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

  detailHeading: {
    color: '#1E1E1E',
    fontSize: 20,
    fontWeight: '500',
    fontFamily: Fonts.type.medium,
    marginTop: 10,
  },

  seasonHeading: {
    color: '#052F56',
    fontSize: 24,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
    marginTop: 10,
  },

  date: {
    color: '#052f5666',
    fontSize: 14,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    marginTop: 4,
  },

  successMsgText: {
    color: '#052F56',
    fontSize: 24,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
    textAlign: 'center',
  },
  atheletePic: {
    width: 39,
    height: 39,
    borderRadius: 14,
  },
});
