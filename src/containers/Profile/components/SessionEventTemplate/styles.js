// @flow
import { StyleSheet } from 'react-native';
import { Colors, Metrics, AppStyles, Fonts } from '../../../../theme';

export default StyleSheet.create({
  eventDetailMainView3: {
    width: 216,
    height: 145,
    marginRight: 20,
  },
  eventDetailImg: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  eventDetailView3: {
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },

  yearView: {
    width: 45,
    height: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...AppStyles.centerInner,
  },

  yearViewEven: {
    width: 45,
    height: 20,
    backgroundColor: '#3F3F3F',
    borderRadius: 10,
    ...AppStyles.centerInner,
  },

  yearText: {
    color: '#2648D1',
    fontSize: 12,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
  },

  yearTextEven: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
  },

  seasonName: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
  },
});
