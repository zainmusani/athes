import {Platform, StyleSheet} from 'react-native';
import {AppStyles, Colors, Fonts, Metrics} from '../../../theme';

export default StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 10,
    right: 0,
    zIndex: 1,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Post Style
  post: {
    justifyContent: 'center',
    flex: 1,
    maxHeight: Metrics.screenHeight,
    width: Metrics.screenWidth,
  },
  postImgWrap: {
    flex: 1,
    height: Metrics.screenHeight,
    maxHeight: Metrics.screenHeight,
    width: Metrics.screenWidth,
    alignItems: 'center',
  },
  postImg: {
    width: '100%',
    height: '100%',
  },
});
