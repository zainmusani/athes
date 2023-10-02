// @flow
import { StyleSheet } from 'react-native';
import { Colors, Metrics, AppStyles, Fonts } from '../../../../theme';

export default StyleSheet.create({
  eventDetailMainView1: {
    backgroundColor: '#04284A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    borderRadius: 11,
    marginRight: 20,
    marginTop: 15,
  },

  eventDetailView1: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageBg: {
    backgroundColor: Colors.white,
    width: 24,
    height: 24,
    borderRadius: 8,
    ...AppStyles.centerInner,
  },

  eventImg: {
    transform: [{ rotate: '180deg' }],
    tintColor: 'black',
  },

  eventDate: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
    marginLeft: 10,
  },

  eventName: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: Fonts.type.bold,
    fontWeight: '700',
    marginTop: 30,
    marginRight: 10,
  },
  bgImage: {
    width: 105,
    height: 122
  }
});
