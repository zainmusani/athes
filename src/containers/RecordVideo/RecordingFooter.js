import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../theme';
import BackIcon from '../../components/SvgIcons/BackIcon';
import RightArrowIcon from '../../components/SvgIcons/RightArrowIcon';
import CircleIcon from '../../components/SvgIcons/CircleIcon';
import {CircleProgress} from '../../components/CircleProgress';
import {MAX_DURATION} from '.';

export const RecordingFooter = ({
  recording = false,
  recordingSec = 0,
  url = undefined,
  openGallery = () => {},
  onStartRecording = () => {},
  onStopRecording = () => {},
  onReset = () => {},
  onTogglePlay = () => {},
  onEditMode = () => {},
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.footer, {bottom: insets.bottom + 10}]}>
      {!!url && (
        <View style={styles.footerLeftContainer}>
          <TouchableOpacity
            style={{transform: [{rotate: '180deg'}]}}
            onPress={onReset}>
            <BackIcon />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.footerRightContainer}>
        {!!url && (
          <TouchableOpacity style={styles.nextStepButton} onPress={onEditMode}>
            <RightArrowIcon />
            <Text style={styles.nextStepText}>Next Step</Text>
          </TouchableOpacity>
        )}
        {!url && (
          <TouchableOpacity
            style={[styles.nextStepButton]}
            onPress={openGallery}>
            <Icon name="image-outline" size={36} color="white" />
            <Text style={styles.nextStepText}>Album</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.recordButtonContainer}>
        {!url && (
          <TouchableOpacity
            style={[styles.recordButton]}
            onPress={() =>
              !recording
                ? url
                  ? onTogglePlay()
                  : onStartRecording()
                : onStopRecording()
            }>
            <CircleIcon
              width={!recording && !url ? 72 : 46}
              height={!recording && !url ? 72 : 46}
            />
            <CircleProgress
              style={styles.circleContainer}
              value={recordingSec}
              maxValue={MAX_DURATION}
              initialValue={0}
              radius={43}
              activeStrokeColor="#FFAD0E"
              activeStrokeWidth={5}
              inActiveStrokeColor={url ? '#FFAD0E' : 'white'}
              inActiveStrokeWidth={5}
              duration={recording ? 1000 : 0}
              textColor="#fff"
              fontSize={10}
              showProgressValue={false}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  audioContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  audioButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  audioText: {
    color: Colors.white,
    fontWeight: '600',
    paddingVertical: 8,
  },
  backButton: {
    paddingLeft: '6%',
    marginRight: 'auto',
  },
  footer: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonContainer: {
    width: 86,
    height: 86,
  },
  recordButton: {
    borderColor: Colors.white,
    borderRadius: 86,
    width: 86,
    height: 86,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLeftContainer: {
    ...StyleSheet.absoluteFillObject,
    right: undefined,
    justifyContent: 'center',
    left: '10%',
  },
  footerRightContainer: {
    ...StyleSheet.absoluteFillObject,
    left: undefined,
    justifyContent: 'center',
    right: '10%',
  },
  nextStepButton: {
    alignItems: 'center',
    marginTop: 12,
  },
  nextStepText: {
    color: Colors.white,
    fontSize: 8,
    marginTop: 8,
  },
  galleryImage: {
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 4,
    width: 36,
    height: 36,
  },
  circleContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
