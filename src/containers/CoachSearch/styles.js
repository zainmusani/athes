// @flow
import {Platform, StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },

  emptyScreenView: {
    alignItems: 'center',
    marginTop: 70,
  },

  emptyScreenText1: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: Fonts.type.medium,
    marginTop: 30,
  },

  emptyScreenText2: {
    color: '#656F77',
    fontSize: 14,
    fontFamily: Fonts.type.medium,
    marginTop: 5,
  },

  profileHeader: {
    backgroundColor: Colors.graybrown,
    paddingBottom: 30,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    zIndex: 1,
    position: 'absolute',
    width: Metrics.screenWidth,
  },

  searchView: {
    // flex: 1,
    paddingHorizontal: 15,
  },

  search: {
    width: '95%',
    paddingRight: 10,
    color: Colors.white,
    fontSize: 20,
    lineHeight: 20,
    height: 45,
  },

  categoryMainView: {
    marginTop: 10,
    borderRadius: 20,
    marginRight: 8,
  },

  categoryView: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 20,
  },

  categoryViewSelected: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 20,
  },

  categoryText: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: Fonts.type.bold,
  },

  categoryTextSelected: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: Fonts.type.bold,
  },

  categoryMainView: {
    marginTop: 10,
    borderRadius: 20,
    marginRight: 8,
  },

  categoryView: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 20,
  },

  categoryViewSelected: {
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 20,
  },

  categoryText: {
    color: Colors.black,
    fontSize: 15,
    fontFamily: Fonts.type.bold,
  },

  eventMainView: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },

  eventView: {
    marginLeft: 10,
    flex: 1,
  },

  eventDate: {
    fontSize: 12,
    fontFamily: Fonts.type.bold,
    color: Colors.grey4,
  },

  eventName: {
    fontSize: 20,
    fontFamily: Fonts.type.bold,
    color: Colors.white,
    minHeight: 25,
  },

  eventAddress: {
    fontSize: 12,
    fontFamily: Fonts.type.bold,
    color: Colors.grey4,
  },
  reset: {
    ...AppStyles.alignItemsCenter,
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    top: -40,
    right: 10,
    zIndex: 99999,
  },
});
