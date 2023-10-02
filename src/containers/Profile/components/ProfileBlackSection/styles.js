// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../../../theme';

export default StyleSheet.create({
  eventDetailMainView2: {
    backgroundColor: Colors.graybrown,
    marginLeft: 20,
    marginTop: 15,
    paddingLeft: 20,
    paddingVertical: 25,
    borderTopLeftRadius: 11,
    borderBottomLeftRadius: 11,
  },

  teamText: {
    color: Colors.white,
    fontSize: 22,
    fontFamily: Fonts.type.base,
    fontWeight: '400',
  },
  teamIcon: {
    marginRight: 10,
    marginTop: 20,
    width: 60,
    height: 60,
    borderRadius: 60,
    overflow: 'hidden',
  },
  teamIconImg: {
    width: 60,
    height: 60,
    borderRadius: 60,
    overflow: 'hidden',
  },
  innerRound: {
    width: 50,
    height: 50,
    backgroundColor: Colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 20,
    marginTop: 20,
  },
});
