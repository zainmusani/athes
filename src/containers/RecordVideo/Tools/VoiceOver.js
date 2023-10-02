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
import IonIcon from 'react-native-vector-icons/Ionicons';

import {Colors, Metrics} from '../../../theme';
import util from '../../../util';
import Slider from 'react-native-slider';
import CircleIcon from '../../../components/SvgIcons/CircleIcon';
import {useAudioRecorderPlayer} from '../../../contexts/useAudioRecorderPlayer';

export const VoiceOver = ({
  thumbnail,
  savingAudio,
  videoDuration,
  voiceUrl,
  voiceOffset,
  playing,
  processingVideo,
  voiceDuration,
  setVoiceUrl,
  setVoiceOffset,
  onTogglePlay,
}) => {
  const [audio, setAudio] = React.useState({
    start: true,
    pause: false,
    stop: false,
    isRecording: false,
    isPlaying: false,
  });

  const [audioBarWidthPercent, setAudioBarWidthPercent] = React.useState(
    (voiceDuration > videoDuration ? 1 : voiceDuration / videoDuration) * 100,
  );
  const [disableSlider, setDisableSlider] = React.useState(
    voiceDuration > videoDuration || !voiceDuration,
  );

  React.useEffect(() => {
    if (!voiceUrl) {
      setAudioBarWidthPercent(0);
      setDisableSlider(true);
    }
  }, [voiceUrl]);

  const {onStartRecord, onStopRecord, state} = useAudioRecorderPlayer();

  const handleStartAudioRecorder = async () => {
    if (audio.isRecording) {
      await handleStopAudioRecorder();
      return;
    }
    if (await onStartRecord()) {
      setAudio({...audio, pause: true, start: false, isRecording: true});
    }
  };

  React.useEffect(() => {
    if (Number(state.recordSecs) / 1000 > 30) {
      handleStopAudioRecorder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.recordSecs]);

  const handleStopAudioRecorder = async () => {
    const resultPath = await onStopRecord();
    if (resultPath?.length < 1) {
      return;
    }

    const audioDuration = Number(state.recordSecs) / 1000;
    const percent =
      (audioDuration > videoDuration ? 1 : audioDuration / videoDuration) * 100;
    setAudioBarWidthPercent(percent);
    setDisableSlider(audioDuration > videoDuration || !audioDuration);
    setAudio({
      ...audio,
      pause: false,
      start: false,
      stop: true,
      isRecording: false,
    });
    setVoiceUrl(resultPath);
  };

  const handleRestartRecorder = async () => {
    await onStopRecord();
    setAudio({
      ...audio,
      pause: false,
      start: true,
      stop: false,
      isRecording: false,
    });
    setAudioBarWidthPercent(0);
    setDisableSlider(true);
    setVoiceUrl(undefined);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {savingAudio && <ActivityIndicator color="white" />}
      </View>
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
      <View style={styles.videoOverlay}>
        <Image source={{uri: thumbnail}} style={styles.videoThumnail} />
        <Slider
          style={styles.slider}
          minimumValue={0}
          disabled={disableSlider}
          maximumValue={videoDuration}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="#ffc90180"
          thumbTouchSize={{height: 40, width: Metrics.screenWidth}}
          thumbStyle={[styles.thumb, {width: `${audioBarWidthPercent}%`}]}
          value={voiceOffset}
          onSlidingComplete={value => setVoiceOffset(value)}
        />
      </View>
      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>00:00</Text>
        <Text style={styles.durationText}>
          {util.getFromattedDuration(videoDuration)}
        </Text>
      </View>
      <View style={styles.recordingContainer}>
        <View style={styles.undoAction}>
          <TouchableOpacity onPress={handleRestartRecorder}>
            <IonIcon name="ios-arrow-undo-sharp" color="white" size={24} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleStartAudioRecorder}
          style={[
            styles.recordButton,
            audio.isRecording && {borderColor: Colors.red},
          ]}>
          <CircleIcon width={33} height={33} />
          {!!state.recordSecs && (
            <View style={styles.durationTextContainer}>
              <Text style={styles.duration}>
                {util.getFromattedDuration(state.recordSecs / 1000)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.undoAction}>
          {/* <TouchableOpacity>
            <IonIcon name="ios-arrow-redo-sharp" color="white" size={24} />
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: Colors.white,
    fontSize: 17,
    marginTop: 4,
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
    marginVertical: 20,
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
  recordingContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 20,
  },
  recordButton: {
    borderWidth: 3,
    borderColor: Colors.white,
    padding: 4,
    borderRadius: 62,
    width: 62,
    height: 62,
    backgroundColor: '#ffffff40',
    justifyContent: 'center',
    alignItems: 'center',
  },
  undoAction: {
    width: 24,
  },
  durationTextContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  duration: {
    color: Colors.white,
    fontSize: 10,
  },
});
