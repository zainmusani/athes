import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import {
  getMediaDuration,
  mergeAudioIntoVideo,
  trimAudio,
} from '../helpers/mediaHelper';

export const VideoEditorContext = React.createContext();

export const VideoEditorProvider = props => {
  const {videoDuration, videoPath} = props;
  const [editedVideoUrl, setEditedVideoUrl] = React.useState(videoPath);
  const [processingVideo, setProcessingVideo] = React.useState(false);
  const [originAudio, setOriginAudio] = React.useState();
  const [originAudioDuration, setOriginAudioDuration] = React.useState(0);
  const [editedAudioUrl, setEditedAudioUrl] = React.useState();
  const [editedAudioDuration, setEditedAudioDuration] = React.useState(0);
  const [voiceUrl, setVoiceUrl] = React.useState();
  const [voiceDuration, setVoiceDuration] = React.useState(0);
  const [savingAudio, setSavingAudio] = React.useState(false);
  const [audioClip, setAudioClip] = React.useState({start: 0, end: 0});
  const [audioOffset, setAudioOffset] = React.useState(0);
  const [voiceOffset, setVoiceOffset] = React.useState(0);
  const [volumes, setVolumes] = React.useState({
    origin: 1,
    added: 0.5,
    voice: 1,
  });

  const clearAudioInputs = React.useCallback(() => {
    setOriginAudio(undefined);
    setOriginAudioDuration(0);
    setEditedVideoUrl(undefined);
    setEditedAudioUrl(undefined);
    setEditedAudioDuration(0);
    setAudioClip({start: 0, end: 0});
    setAudioOffset(0);
  }, []);

  // audio file offset
  const fullAudioWidth =
    editedAudioDuration > videoDuration || !editedAudioDuration;
  const audioStartTime = fullAudioWidth
    ? 0
    : audioOffset - (audioOffset * editedAudioDuration) / videoDuration;

  // voice recording offset
  const fullVoiceWidth = voiceDuration > videoDuration || !voiceDuration;
  const voiceStartTime = fullVoiceWidth
    ? 0
    : voiceOffset - (voiceOffset * voiceDuration) / videoDuration;

  const onPickAudioFile = React.useCallback(() => {
    DocumentPicker.pickSingle({
      type: DocumentPicker.types.audio,
      allowMultiSelection: false,
      copyTo: 'documentDirectory',
    })
      .then(file => {
        setOriginAudio({
          ...file,
          uri: file.fileCopyUri || file.uri,
        });
      })
      .catch(() => {});
  }, []);

  React.useEffect(() => {
    (async () => {
      if (originAudio) {
        (async () => {
          const value = await getMediaDuration(originAudio.uri);
          setOriginAudioDuration(value);
          setAudioClip(prev => ({...prev, start: 0, end: value}));
          setSavingAudio(true);
          const res = await trimAudio(originAudio.uri, 0, value);
          setEditedAudioDuration(value);
          setEditedAudioUrl(res);
          setSavingAudio(false);
        })();
      } else {
        setOriginAudioDuration(0);
      }
    })();
  }, [originAudio]);

  const onTrimAudio = React.useCallback(async () => {
    if (originAudio) {
      setSavingAudio(true);
      const res = await trimAudio(
        originAudio.uri,
        audioClip.start,
        audioClip.end,
      );
      const value = await getMediaDuration(res);
      setEditedAudioDuration(value);
      setEditedAudioUrl(res);
      setSavingAudio(false);
    }
  }, [originAudio, audioClip]);

  const onProcessVideo = React.useCallback(async () => {
    try {
      setProcessingVideo(true);
      setEditedVideoUrl(undefined);
      const res = await mergeAudioIntoVideo(
        videoPath,
        editedAudioUrl,
        audioStartTime,
        voiceUrl,
        voiceStartTime,
        volumes,
      );
      setEditedVideoUrl(res?.includes('file://') ? res : `file://${res}`);
      setProcessingVideo(false);
    } catch (error) {
      setProcessingVideo(false);
    }
  }, [
    audioStartTime,
    editedAudioUrl,
    videoPath,
    voiceStartTime,
    voiceUrl,
    volumes,
  ]);

  const saveVoiceUrlMeta = React.useCallback(async url => {
    if (!url) {
      setVoiceDuration(0);
      setVoiceUrl(undefined);
      setVoiceOffset(0);
      return;
    }
    try {
      setSavingAudio(false);
      const value = await getMediaDuration(url);
      setVoiceDuration(Number(value));
      setVoiceUrl(url);
      setSavingAudio(false);
    } catch (error) {
      setSavingAudio(false);
    }
  }, []);

  return (
    <VideoEditorContext.Provider
      value={{
        videoDuration,
        originAudio,
        editedAudioUrl,
        savingAudio,
        audioClip,
        originAudioDuration,
        editedAudioDuration,
        audioOffset,
        editedVideoUrl,
        processingVideo,
        volumes,
        voiceUrl,
        voiceOffset,
        voiceDuration,
        setOriginAudio,
        onPickAudioFile,
        onTrimAudio,
        setAudioClip,
        setAudioOffset,
        onProcessVideo,
        setVolumes,
        setVoiceUrl: saveVoiceUrlMeta,
        setVoiceOffset,
        clearAudioInputs,
      }}>
      {props.children}
    </VideoEditorContext.Provider>
  );
};

export const useVideoEditor = () => {
  return React.useContext(VideoEditorContext);
};
