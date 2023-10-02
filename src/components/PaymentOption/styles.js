// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05335E',
    marginTop: 8,
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  heading: {
    fontSize: 15,
    color: '#FCFCFC',
    fontFamily: Fonts.type.medium,
    fontWeight: '500',
  },

  description: {
    fontSize: 9,
    color: '#FCFCFC',
    fontWeight: '400',
    marginTop: 2,
  },

  RadioBox: {
    borderWidth: 2,
    borderColor: '#fff',
    width: 17.5,
    height: 17.5,
    borderRadius: 50,
    ...AppStyles.centerInner,
  },

  RadioBoxCheck: {
    backgroundColor: '#fff',
    width: 9,
    height: 9,
    borderRadius: 50,
  },
});
