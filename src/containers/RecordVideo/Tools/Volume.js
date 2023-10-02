import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Slider from 'react-native-slider';
import {Colors} from '../../../theme';

export const Volume = ({volumes, setVolumes}) => {
  const [values, setValues] = React.useState(volumes);
  const [isChanged, setIsChanged] = React.useState(false);
  const {origin, added, voice} = values;

  React.useEffect(() => {
    setIsChanged(
      values.origin !== volumes.origin ||
        values.added !== volumes.added ||
        values.voice !== volumes.voice,
    );
  }, [volumes, values]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isChanged && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setVolumes(values)}>
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.optionText}>Original Sound</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          minimumTrackTintColor="#ffc901"
          thumbTintColor="#fff"
          thumbStyle={styles.thumb}
          value={origin}
          onSlidingComplete={value =>
            setValues({...values, origin: parseFloat(value.toFixed(1))})
          }
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.optionText}>Added Sound</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          minimumTrackTintColor="#ffc901"
          thumbTintColor="#fff"
          thumbStyle={styles.thumb}
          value={added}
          onSlidingComplete={value =>
            setValues({...values, added: parseFloat(value.toFixed(1))})
          }
        />
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.optionText}>Voice Sound</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          minimumTrackTintColor="#ffc901"
          thumbTintColor="#fff"
          thumbStyle={styles.thumb}
          value={voice}
          onSlidingComplete={value =>
            setValues({...values, voice: parseFloat(value.toFixed(1))})
          }
        />
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {width: '60%'},
  thumb: {width: 12, height: 12},
  optionText: {
    color: Colors.white,
    fontSize: 12,
  },
});
