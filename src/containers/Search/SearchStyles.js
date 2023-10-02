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
    maxHeight: 200,
    position: 'absolute',
    // top: '90%',
    // width: '100%',
  },

  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 40,
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

  headingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    ...AppStyles.paddingHorizontalBase,
  },

  heading: {
    fontSize: 16,
    color: '#8F8E93',
  },

  moreButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  moreButtonImage: {
    height: 8,
    width: 8,
    tintColor: '#8F8E93',
    marginLeft: 8,
    marginTop: 2,
  },

  actionPostMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    width: '110%',
    marginLeft: '-5%',
    paddingHorizontal: 22,
    paddingVertical: 15,
    marginTop: 10,
  },

  actionPostView: {
    flexDirection: 'row',
  },

  actionPostHeading: {
    color: '#252529',
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
    fontSize: 15,
  },

  actionPostDescription: {
    color: '#252529',
    fontWeight: '400',
    fontSize: 13,
  },

  undoButtonView: {
    backgroundColor: '#FAF5FF',
    borderColor: '#E9D8FD',
    borderWidth: 1,
    borderRadius: 42,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },

  undoButton: {
    color: '#553C9A',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: Fonts.type.medium,
  },
  keywords: {
    paddingBottom: 30,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    backgroundColor: Colors.graybrown,
    // maxHeight: 200,
    // position: 'absolute',
    // top: '90%',
    // width: '100%',
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  defualtDataText: {
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
});
