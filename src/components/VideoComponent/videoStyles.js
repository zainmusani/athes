import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    borderColor: 'white',
  },
  flex1: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    width: Metrics.screenWidth,
    height: '100%',
  },
  closeWrap: {position: 'absolute', top: 50, right: 20, zIndex: 9},
  closeIcon: {
    tintColor: Colors.white,
    height: 25,
    width: 25,
    transform: [{rotate: '45deg'}],
  },
  loaderStyle: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.transparent,
  },
});
