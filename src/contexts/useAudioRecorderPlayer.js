import * as React from 'react';
import {Platform, PermissionsAndroid, Alert} from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import {openSettings, PERMISSIONS, request} from 'react-native-permissions';

let audioRecorderPlayer = new AudioRecorderPlayer();

export const useAudioRecorderPlayer = () => {
  const [state, setState] = React.useState({
    recordSecs: 0,
    recordTime: '00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00',
    duration: '00:00',
  });

  const onStartRecord = async audioName => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use the recorder');
        } else {
          Alert.alert(
            'Sorry',
            'Please allow microphone permission to record your voice.',
            [
              {text: 'Cancel'},
              {text: 'Open Settings', onPress: () => openSettings()},
            ],
          );
          return false;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    } else {
      const granted = await request(PERMISSIONS.IOS.MICROPHONE);
      if (granted === 'granted') {
        console.log('You can use the recorder');
      } else {
        Alert.alert(
          'Sorry',
          'Please allow microphone permission to record your voice.',
          [
            {text: 'Cancel'},
            {text: 'Open Settings', onPress: () => openSettings()},
          ],
        );
        return false;
      }
    }

    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };

    const result = await audioRecorderPlayer.startRecorder(undefined, audioSet);

    audioRecorderPlayer.addRecordBackListener(e => {
      setState({
        ...state,
        ...{
          recordSecs: e.currentPosition,
          recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        },
      });
      return;
    });
    return result;
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer = new AudioRecorderPlayer();
    audioRecorderPlayer.removeRecordBackListener();
    setState({
      ...state,
      ...{
        recordSecs: 0,
        recordTime: '00:00',
      },
    });
    return result;
  };

  const onStartPlay = async (uri, token) => {
    await onStopPlay();
    await audioRecorderPlayer.startPlayer(uri);

    audioRecorderPlayer.addPlayBackListener(e => {
      setState(s => ({
        ...s,
        currentPositionSec: Math.abs(e.currentPosition / 1000),
        currentDurationSec: e.duration / 1000,
        playTime: audioRecorderPlayer.mmssss(Math.abs(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(e.duration),
      }));
      return;
    });
  };

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
  };

  const onResumePlay = async () => {
    await audioRecorderPlayer.resumePlayer();
  };

  const onStopPlay = async () => {
    await audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    setState({
      ...state,
      ...{
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00',
        duration: '00:00',
      },
    });
  };

  const onPauseRecord = async () => {
    await audioRecorderPlayer.pauseRecorder();
  };

  const onResumeRecord = async () => {
    await audioRecorderPlayer.resumeRecorder();
  };

  const onSeek = async time => {
    await audioRecorderPlayer.seekToPlayer(time);
  };

  return {
    state,
    onSeek,
    onStartRecord,
    onStopRecord,
    onPauseRecord,
    onResumeRecord,
    onStartPlay,
    onPausePlay,
    onResumePlay,
    onStopPlay,
  };
};
