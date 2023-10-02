import React from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import {Images} from '../../../../src/theme';
const HIT_SLOP = {top: 16, left: 16, bottom: 16, right: 16};
const ImageDefaultHeader = ({onRequestClose, onThreeDots, user}) => (
  <SafeAreaView style={styles.root}>
    {user?.isAdmin ? (
      <Text size={10} color={'#FFF'} style={{alignSelf: 'center'}}>
        @Sponsored
      </Text>
    ) : (
      <TouchableOpacity
        style={styles.closeButton}
        onPress={onThreeDots ? onThreeDots : onRequestClose}
        hitSlop={HIT_SLOP}>
        {onThreeDots ? (
          <Image
            source={Images.dots}
            size={{width: 10, height: 16}}
            style={{tintColor: '#fff'}}
            resizeMode="contain"
          />
        ) : (
          <Image source={Images.cancel} style={styles.closeText} />
        )}
      </TouchableOpacity>
    )}
    {onThreeDots && (
      <TouchableOpacity
        style={styles.closeButton1}
        onPress={onRequestClose}
        hitSlop={HIT_SLOP}>
        <Image source={Images.cancel} style={styles.closeText} />
      </TouchableOpacity>
    )}
  </SafeAreaView>
);
const styles = StyleSheet.create({
  root: {
    alignItems: 'flex-end',
  },
  closeButton: {
    marginRight: 8,
    marginTop: 8,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22.5,
    backgroundColor: '#00000077',
  },
  closeButton1: {
    marginRight: 8,
    top: Platform.OS == 'ios' ? 55 : 10,
    width: 45,
    height: 45,
    left: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22.5,
    backgroundColor: '#00000077',
    // backgroundColor: 'red',
  },
  closeText: {
    height: 25,
    width: 25,
    tintColor: '#FFF',
  },
});
export default ImageDefaultHeader;
