import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BlurView} from '@react-native-community/blur';
import {useState} from 'react';

import {Colors} from '../../theme';
import MusicTrimIcon from '../../components/SvgIcons/MusicTrimIcon';
import VideoPreviewIcon from '../../components/SvgIcons/VideoPreviewIcon';
import VolumeAdjustIcon from '../../components/SvgIcons/VolumeAdjustIcon';
import VoiceOverIcon from '../../components/SvgIcons/VoiceOverIcon';
import {MusicTrim} from './Tools/MusicTrim';
import {VideoPreview} from './Tools/VideoPreview';
import {Volume} from './Tools/Volume';
import {VoiceOver} from './Tools/VoiceOver';
import {useVideoEditor} from '../../contexts';

const ToolType = {
  MusicTrime: 0,
  VideoPreview: 1,
  Volume: 2,
  VoiceOver: 3,
};

export const EditingFooter = React.memo(
  ({
    playing = false,
    thumbnail = undefined,
    audioFile = undefined,
    onTogglePlay = () => {},
    onChangeEditingTab = () => {},
  }) => {
    const insets = useSafeAreaInsets();
    const [toolHeight, setToolHeight] = useState(0);
    const [selectedTool, setSelectedTool] = useState();
    const {
      processingVideo,
      videoDuration,
      originAudioDuration,
      editedAudioDuration,
      savingAudio,
      audioClip,
      audioOffset,
      volumes,
      voiceUrl,
      voiceDuration,
      voiceOffset,
      onPickAudioFile,
      onTrimAudio,
      setAudioClip,
      setAudioOffset,
      setVolumes,
      setVoiceUrl,
      setVoiceOffset,
    } = useVideoEditor();

    React.useEffect(() => {
      if (audioFile) {
        setSelectedTool(ToolType.MusicTrime);
      } else {
        setSelectedTool(undefined);
      }
    }, [audioFile, setAudioClip]);

    React.useEffect(() => {
      onChangeEditingTab();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTool]);

    return (
      <View style={styles.container}>
        <View style={styles.toolsPanel}>
          <BlurView blurType="dark" style={StyleSheet.absoluteFillObject} />
          <View style={[styles.footerPanel, {paddingBottom: toolHeight}]}>
            <View>
              {selectedTool === ToolType.MusicTrime && (
                <MusicTrim
                  savingAudio={savingAudio}
                  audioFile={audioFile}
                  audioClip={audioClip}
                  videoDuration={videoDuration}
                  audioDuration={originAudioDuration}
                  setAudioClip={clip => setAudioClip(clip)}
                  onSaveAudio={() => onTrimAudio()}
                />
              )}
              {selectedTool === ToolType.VideoPreview && (
                <VideoPreview
                  videoDuration={videoDuration}
                  audioDuration={editedAudioDuration}
                  thumbnail={thumbnail}
                  playing={playing}
                  processingVideo={processingVideo}
                  audioOffset={audioOffset}
                  setAudioOffset={setAudioOffset}
                  onTogglePlay={onTogglePlay}
                />
              )}
              {selectedTool === ToolType.Volume && (
                <Volume volumes={volumes} setVolumes={setVolumes} />
              )}
              {selectedTool === ToolType.VoiceOver && (
                <VoiceOver
                  voiceUrl={voiceUrl}
                  thumbnail={thumbnail}
                  playing={playing}
                  processingVideo={processingVideo}
                  voiceDuration={voiceDuration}
                  voiceOffset={voiceOffset}
                  savingAudio={savingAudio}
                  videoDuration={videoDuration}
                  setVoiceUrl={setVoiceUrl}
                  onTogglePlay={onTogglePlay}
                  setVoiceOffset={setVoiceOffset}
                />
              )}
            </View>
          </View>
        </View>
        <View
          style={styles.toolsContainer}
          onLayout={e => setToolHeight(e.nativeEvent.layout.height)}>
          <BlurView style={StyleSheet.absoluteFillObject} />
          <View style={[styles.footer, {paddingBottom: insets.bottom}]}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                if (audioFile) {
                  setSelectedTool(ToolType.MusicTrime);
                } else {
                  onPickAudioFile();
                }
              }}>
              <MusicTrimIcon height={29} />
              <Text style={styles.actionText}>Music Trim</Text>
              {selectedTool === ToolType.MusicTrime && (
                <View style={styles.activeBar} />
              )}
              <View />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setSelectedTool(ToolType.VideoPreview)}>
              <VideoPreviewIcon height={29} />
              <Text style={styles.actionText}>Video Preview</Text>
              {selectedTool === ToolType.VideoPreview && (
                <View style={styles.activeBar} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setSelectedTool(ToolType.Volume)}>
              <VolumeAdjustIcon height={29} />
              <Text style={styles.actionText}>Volume</Text>
              {selectedTool === ToolType.Volume && (
                <View style={styles.activeBar} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setSelectedTool(ToolType.VoiceOver)}>
              <VoiceOverIcon height={29} />
              <Text style={styles.actionText}>Voice Over</Text>
              {selectedTool === ToolType.VoiceOver && (
                <View style={styles.activeBar} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
  },
  toolsContainer: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  toolsPanel: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11, 19, 25, 0.5)',
  },
  footerPanel: {
    // backgroundColor: '#ffffff40',
  },
  actionButton: {
    paddingVertical: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    color: Colors.white,
    fontSize: 10,
    marginTop: 4,
  },
  activeBar: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    height: 3,
    left: '30%',
    right: '30%',
    bottom: '10%',
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
});
