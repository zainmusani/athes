import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import RangeSlider from 'rn-range-slider';

import {Colors} from '../../../theme';
import AudioWave from '../../../components/SvgIcons/AudioWave';
import util from '../../../util';

export const MusicTrim = ({
  savingAudio,
  audioClip,
  audioDuration = 0,
  setAudioClip = () => {},
  onSaveAudio = () => {},
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.actionButton}
          disabled={savingAudio}
          onPress={() => onSaveAudio()}>
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
        {savingAudio && <ActivityIndicator />}
      </View>
      <View style={styles.durationContainer}>
        <Text style={{color: Colors.white}}>
          {util.getFromattedDuration(0)}/
          {util.getFromattedDuration(audioDuration)}
        </Text>
      </View>
      {React.useMemo(() => {
        if (!audioDuration) {
          return null;
        }
        return (
          <RangeSlider
            style={styles.slider}
            min={0}
            max={Number(audioDuration)}
            low={Number(audioClip.start)}
            high={Number(audioClip.end)}
            step={1}
            renderThumb={() => <View style={styles.sliderThumb} />}
            renderRail={() => (
              <View style={styles.waveContainer}>
                <AudioWave />
                <AudioWave />
              </View>
            )}
            renderRailSelected={() => (
              <View style={[styles.waveContainer, styles.mask]} />
            )}
            onValueChanged={(data1, data2, fromUser) => {
              if (fromUser) {
                setAudioClip({start: data1, end: data2});
              }
            }}
          />
        );
      }, [audioClip, audioDuration, setAudioClip])}
      <Text style={styles.selectedDurationText}>
        {util.getFromattedDuration(audioClip.end - audioClip.start)} Selected
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 19, 25, 0.5)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  slider: {
    paddingVertical: 10,
  },
  sliderThumb: {
    width: 4,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 2,
  },
  durationContainer: {
    flexDirection: 'row',
  },
  waveContainer: {
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
  },
  mask: {
    backgroundColor: '#fec90180',
    height: 60,
  },
  selectedDurationText: {
    color: Colors.white,
    marginBottom: 8,
  },
});
