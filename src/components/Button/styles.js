// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.defaultUIHeight,
    borderRadius: Metrics.borderRadius,
    overflow: 'visible',
  },
  buttonInner: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.borderRadius,
    backgroundColor: Colors.transparent,
  },
  spinner: {
    alignSelf: 'center',
  },
  opacity: {
    opacity: 0.5,
  },
  iconWrap: {
    position: 'absolute',
    backgroundColor: Colors.black,
    ...AppStyles.padding10,
    borderRadius: 20,
  },
  icon: {
    width: Metrics.icon.small,
    height: Metrics.icon.small,
  },
  onlyIcon: {
    position: 'absolute',
    width: Metrics.icon.normal,
    height: Metrics.icon.normal,
    marginLeft: -15,
  },
  followFollowingText: {
    textAlign: 'center',
    fontSize: Fonts.size.xSmall,
    fontFamily: Fonts.type.bold,
    color: Colors.black,
  },
});
