// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  approvalTabsMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
    marginVertical: 15,
    backgroundColor: '#D7D9E9',
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

  approvalTabsText: {
    color: '#010101',
    fontSize: 12,
    fontFamily: Fonts.type.medium,
    fontWeight: '600',
  },

  addIconButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    backgroundColor: Colors.black,
    borderRadius: 50,
  },
});
