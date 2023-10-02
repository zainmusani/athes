// @flow
import {AppState, StyleSheet, FlatList} from 'react-native';
import {AppStyles, Colors, Metrics, Fonts} from '../../theme';

export default StyleSheet.create({
  approvalTabsMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginVertical: 15,
    backgroundColor: '#F9F9F9',
    paddingTop: 6,
    paddingBottom: 8,
    borderRadius: 16,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    width: 333,
  },

  approvalTabsViewSelected: {
    backgroundColor: Colors.white,
    width: 100,
    height: 32,
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 8,
    borderRadius: 12,
    ...AppStyles.shadow1,
    ...AppStyles.centerInner,
  },

  approvalTabsViewSelectedMoreTabs: {
    backgroundColor: Colors.white,
    width: 80,
    height: 32,
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 8,
    borderRadius: 12,
    ...AppStyles.shadow1,
    ...AppStyles.centerInner,
  },

  approvalTabsView: {
    backgroundColor: 'transparent',
    width: 100,
    height: 32,
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 8,
    borderRadius: 12,
    ...AppStyles.centerInner,
  },

  approvalTabsViewMoreTabs: {
    backgroundColor: 'transparent',
    width: 80,
    height: 32,
    paddingHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 8,
    borderRadius: 12,
    ...AppStyles.centerInner,
  },

  approvalTabsText: {
    color: '#010101',
    fontSize: 12,
    fontFamily: Fonts.type.medium,
    fontWeight: '600',
    textAlign: 'center',
  },
});
