import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {Colors} from '../../theme';
import BackIcon from '../../components/SvgIcons/BackIcon';
import {RecordingFooter} from './RecordingFooter';
import {EditingFooter} from './EditingFooter';
import {useVideoEditor} from '../../contexts';

export const RecordingOverlay = ({
  recording = false,
  recordingSec = 0,
  playing,
  url = undefined,
  thumbnail = undefined,
  editMode = false,
  openGallery = () => {},
  onStartRecording = () => {},
  onStopRecording = () => {},
  onReset = () => {},
  onEditMode = () => {},
  onTogglePlay = () => {},
  onChangeEditingTab = () => {},
}) => {
  const insets = useSafeAreaInsets();
  const {
    originAudio,
    onPickAudioFile,
    onProcessVideo,
    clearAudioInputs,
    editedVideoUrl,
  } = useVideoEditor();

  const audioFileName = originAudio
    ? originAudio.name?.slice(0, 5) +
      '...' +
      originAudio.name?.slice(originAudio.name?.length - 5)
    : 'Add Music';

  const playEditedVideo = async () => {
    if (!playing) {
      await onProcessVideo();
      onTogglePlay();
    } else {
      onTogglePlay();
    }
  };

  const onPostVideo = async () => {
    await onProcessVideo();
    Actions.replace('write_post', {
      editedVideo: editedVideoUrl || url,
      fromDashboad: true,
    });
  };

  return (
    <TouchableOpacity
      pointerEvents="box-none"
      disabled={editMode}
      style={[styles.container]}
      activeOpacity={1}
      onPress={() => (editedVideoUrl || url) && onTogglePlay()}>
      <View style={[styles.header, {top: insets.top + 10}]}>
        <View style={styles.audioContainer}>
          <View style={styles.audioNameContainer}>
            <TouchableOpacity
              style={styles.audioButton}
              onPress={() => !originAudio && onPickAudioFile()}>
              <Text style={styles.audioText}>{audioFileName}</Text>
            </TouchableOpacity>
            {!!originAudio && (
              <TouchableOpacity
                style={styles.audioDelete}
                onPress={clearAudioInputs}>
                <Icon name="close" color="white" size={18} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => Actions.pop()}>
          <BackIcon />
        </TouchableOpacity>
        {(!!editedVideoUrl || !!url) && (
          <TouchableOpacity style={styles.postButton} onPress={onPostVideo}>
            <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>
        )}
      </View>
      {!editMode && (
        <RecordingFooter
          recording={recording}
          recordingSec={recordingSec}
          url={url}
          openGallery={openGallery}
          onTogglePlay={onTogglePlay}
          onStartRecording={onStartRecording}
          onStopRecording={onStopRecording}
          onReset={onReset}
          onEditMode={onEditMode}
        />
      )}
      {editMode && (
        <EditingFooter
          playing={playing}
          thumbnail={thumbnail}
          audioFile={originAudio}
          onTogglePlay={playEditedVideo}
          onChangeEditingTab={onChangeEditingTab}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
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
  audioNameContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  audioButton: {
    backgroundColor: '#00000080',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  audioText: {
    color: Colors.white,
    fontWeight: '600',
  },
  audioDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    backgroundColor: '#00000080',
    height: '100%',
    marginLeft: 1,
  },
  backButton: {
    paddingLeft: '6%',
    marginRight: 'auto',
  },
  postButton: {
    marginLeft: 'auto',
  },
  postText: {
    color: Colors.white,
    paddingHorizontal: '6%',
    fontSize: 17,
  },
  footer: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButton: {
    borderWidth: 3,
    borderColor: Colors.white,
    padding: 2,
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
});
