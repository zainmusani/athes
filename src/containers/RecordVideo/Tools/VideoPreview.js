import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Slider from 'react-native-slider';

import {Colors, Metrics} from '../../../theme';
import util from '../../../util';
import AudioWave from '../../../components/SvgIcons/AudioWave';

export const VideoPreview = ({
  videoDuration,
  audioDuration = 0,
  processingVideo,
  playing,
  thumbnail,
  audioOffset,
  setAudioOffset,
  onTogglePlay = () => {},
}) => {
  const audioBarWidthPercent =
    (audioDuration > videoDuration ? 1 : audioDuration / videoDuration) * 100;
  const disableSilder = audioDuration > videoDuration || !audioDuration;

  return (
    <View style={styles.container}>
      <View style={styles.playButtonContainer}>
        <TouchableOpacity style={styles.bigPlayButton} onPress={onTogglePlay}>
          {processingVideo && <ActivityIndicator color="white" />}
          {!processingVideo && (
            <>
              <Icon
                name={playing ? 'pause' : 'play'}
                color="#ffffff80"
                size={24}
                style={styles.bigPlayIcon}
              />
              <View style={styles.smallPlayButtonWrapper}>
                {!playing && !processingVideo && (
                  <Icon name="play" color={Colors.white} size={16} />
                )}
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>00:00</Text>
        <Text style={styles.durationText}>
          {util.getFromattedDuration(videoDuration)}
        </Text>
      </View>
      <View style={styles.videoOverlay}>
        <Image source={{uri: thumbnail}} style={styles.videoThumnail} />
        <Slider
          style={styles.slider}
          minimumValue={0}
          disabled={disableSilder}
          maximumValue={videoDuration}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="#ffc90180"
          thumbTouchSize={{height: 40, width: Metrics.screenWidth}}
          thumbStyle={[styles.thumb, {width: `${audioBarWidthPercent}%`}]}
          value={audioOffset}
          onSlidingComplete={value => setAudioOffset(value)}
        />
      </View>
      <View style={styles.waveContainer}>
        <AudioWave />
        <AudioWave />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  durationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  durationText: {
    color: Colors.white,
    fontSize: 10,
  },
  videoOverlay: {
    height: 40,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 4,
    overflow: 'hidden',
    width: '100%',
  },
  videoThumnail: {
    width: '100%',
    height: '100%',
  },
  waveContainer: {
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
    marginVertical: 20,
  },
  playButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallPlayButtonWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigPlayButton: {
    marginTop: 8,
  },
  bigPlayIcon: {
    ...StyleSheet.absoluteFillObject,
    left: 2,
  },
  slider: {
    ...StyleSheet.absoluteFillObject,
  },
  thumb: {height: '100%', borderRadius: 0},
});
