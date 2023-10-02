// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    ...AppStyles.paddingHorizontalBase,
  },

  profileTabs: {
    // borderBottomWidth: 1,
    backgroundColor: Colors.graybrown,
    zIndex: 1,
    height: 70,
    ...AppStyles.paddingHorizontalBase,
    flexDirection: 'row',
  },

  tab: {
    ...AppStyles.paddingHorizontalBase,
    ...AppStyles.centerInner,
  },
  activeTabBottom: {
    position: 'absolute',
    bottom: -3,
    height: 5,
    width: 20,
    backgroundColor: Colors.white,
    borderRadius: 3,
    overflow: 'hidden',
    zIndex: 3,
  },

  eventText: {
    color: 'rgba(0,0,0,.40)',
    paddingHorizontal: 20,
    marginTop: 20,
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
  },

  profileContainer: {
    flex: 1,
  },

  approvalContainer: {
    flex: 1,
    ...AppStyles.paddingHorizontalBase,
    ...AppStyles.pBottom30
  },

  pendingRequestMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '110%',
    marginLeft: '-5%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.white,
  },

  pendingRequestHeading: {
    color: '#252529',
    fontSize: 15,
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
  },

  pendingRequestSubheading: {
    color: '#252529',
    fontSize: 13,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
  },

  undoButtonView: {
    backgroundColor: '#FAF5FF',
    borderWidth: 1,
    borderColor: '#E9D8FD',
    borderRadius: 42,
    paddingVertical: 8,
    paddingHorizontal: 17,
  },

  undoButtonText: {
    color: '#553C9A',
    fontSize: 10,
    fontWeight: '500',
    fontFamily: Fonts.type.medium,
  },

  eventContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  seasonContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
