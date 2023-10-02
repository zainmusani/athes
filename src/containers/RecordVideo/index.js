import {View, StyleSheet, Alert} from 'react-native';
import React, {useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import LinearGradient from 'react-native-linear-gradient';
import ImageCropPicker from 'react-native-image-crop-picker';

import {RecordingOverlay} from './RecordingOverlay';
import {Colors} from '../../theme';
import {useState} from 'react';
import Video from 'react-native-fast-video';
import {createVideoThumbnail} from '../../helpers/mediaHelper';
import {VideoEditorContext, VideoEditorProvider} from '../../contexts';

export const MAX_DURATION = 30;
let interval = null;

const RecordVideo = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const [url, setUrl] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [recording, setRecording] = useState(false);
  const [recordingSec, setRecordingSec] = React.useState(0);
  const [playing, setPlaying] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  React.useEffect(() => {
    if (recording) {
      if (recordingSec === MAX_DURATION) {
        stopRecording();
        return;
      }
      interval = setInterval(() => {
        setRecordingSec(seconds => seconds + 1);
      }, 1000);
    } else if (!recording && recordingSec !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recording, recordingSec]);

  const recordVideo = async () => {
    setUrl(undefined);
    setRecording(true);
    camera?.current?.startRecording({
      onRecordingFinished: video => setUrl(video.path),
      onRecordingError: error => console.error(error),
    });
  };
  const stopRecording = async () => {
    await camera?.current?.stopRecording();
    setRecording(false);
    setRecordingSec(0);
  };

  const openGallery = async () => {
    ImageCropPicker.openPicker({
      multiple: false,
      compressVideoPreset: 'Passthrough',
      mediaType: 'video',
    }).then(async media => {
      if (media?.duration > MAX_DURATION * 1000) {
        Alert.alert('Error', 'Maximum duration is 30 seconds');
        return;
      }
      if (media && media.path) {
        setUrl(media.path);
        const thumbnailRes = await createVideoThumbnail(media.path);
        setThumbnail(thumbnailRes);
      }
    });
  };

  // simulator testing
  // if (device == null) {
  //   return null;
  // }

  return (
    <VideoEditorProvider videoDuration={videoDuration} videoPath={url}>
      <VideoEditorContext.Consumer>
        {({editedVideoUrl}) => (
          <View style={styles.container}>
            {!!device?.id && (
              <Camera
                ref={camera}
                device={device}
                style={StyleSheet.absoluteFillObject}
                video
                audio
                enableZoomGesture
                isActive={!url}
              />
            )}
            {!!url && (
              <Video
                source={{
                  uri: editedVideoUrl || url,
                }}
                paused={!playing}
                repeat={!editMode}
                onLoad={data => setVideoDuration(data.duration)}
                style={[
                  StyleSheet.absoluteFillObject,
                  {backgroundColor: Colors.black},
                ]}
              />
            )}
            <LinearGradient
              colors={['#00000080', '#00000000']}
              style={styles.topGradient}
            />
            <LinearGradient
              colors={['#00000000', '#00000080']}
              style={styles.bottomGradient}
            />
            <RecordingOverlay
              recording={recording}
              recordingSec={recordingSec}
              playing={playing}
              url={url}
              thumbnail={thumbnail}
              editMode={editMode}
              openGallery={() => openGallery()}
              onStartRecording={recordVideo}
              onStopRecording={stopRecording}
              onReset={() => {
                setUrl(undefined);
                setRecordingSec(0);
                setRecording(false);
              }}
              onTogglePlay={() => setPlaying(!playing)}
              onEditMode={() => setEditMode(true)}
              onChangeEditingTab={() => setPlaying(false)}
            />
          </View>
        )}
      </VideoEditorContext.Consumer>
    </VideoEditorProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  topGradient: {
    ...StyleSheet.absoluteFillObject,
    bottom: undefined,
    height: '15%',
  },
  bottomGradient: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    height: '15%',
  },
});

export default RecordVideo;
