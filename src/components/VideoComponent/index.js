//Media Controls to control Play/Pause/Seek and full screen
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
// import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import Video from 'react-native-fast-video';
import {Actions} from 'react-native-router-flux';
import {ButtonView} from '..';
import {Colors, Images} from '../../theme';
import styles from './videoStyles';

const VideoComponent = props => {
  const {videoUrl, hideBtn, videoStyle, shouldPlay, thumbnail, cover, muted} =
    props;
  const videoPlayer = useRef(0);
  const [isLoading, setIsLoading] = useState(true);
  const localMuted = useRef(false);

  const onSeek = useCallback(() => {
    videoPlayer.current.seek(seek);
  }, []);

  const renderVideoComponent = useMemo(() => {
    console.log('videoUrl ', videoUrl);
    return (
      <Video
        ref={videoPlayer}
        source={{
          // uri: 'https://cdn.flowplayer.com/a30bd6bc-f98b-47bc-abf5-97633d4faea0/hls/de3f6ca7-2db3-4689-8160-0f574a5996ad/playlist.m3u8',
          // uri: 'https://d2of6bhnpl91ni.cloudfront.net/cms/vertical-video-story-ad-b7093b9783.mp4',
          uri: videoUrl,
          cache: true,
        }}
        cacheName={`athes_video_${Math.random(10)}`}
        resizeMode={cover ? 'contain' : 'cover'}
        playInBackground={false}
        paused={!shouldPlay}
        playWhenInactive={false}
        repeat={true}
        disableFocus={true}
        poster={thumbnail}
        posterResizeMode={cover ? 'contain' : 'cover'}
        muted={localMuted.current || muted}
        controls={false}
        fullscreen={false}
        onBuffer={data => {
          setIsLoading(data.isBuffering);
          return shouldPlay;
        }}
        onProgress={() => {
          setIsLoading(false);
        }}
        onReadyForDisplay={() => {
          setIsLoading(false);
        }}
        onSeek={onSeek}
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
        }}
        maxBitRate={50000}
        style={[styles.mediaPlayer, videoStyle]}
      />
      // <>
      //   {shouldPlay ? (
      //   ) : (
      //     <FastImage
      //       style={[styles.itemImage]}
      //       source={{
      //         uri: thumbnail,
      //         priority: FastImage.priority.high,
      //       }}
      //       resizeMode={FastImage.resizeMode.cover}
      //     />
      //   )}
      // </>
    );
  }, [shouldPlay, cover]);

  return (
    <>
      <View style={[styles.container, styles.flex1]}>
        {!hideBtn && (
          <ButtonView onPress={() => Actions.pop()} style={styles.closeWrap}>
            <Image source={Images.add} style={styles.closeIcon} />
          </ButtonView>
        )}

        <TouchableWithoutFeedback
          disabled={!cover}
          onPress={() => {
            localMuted.current = !localMuted.current;
          }}>
          {renderVideoComponent}
          
        </TouchableWithoutFeedback>

        {isLoading && (
          <View style={styles.loaderStyle}>
            <ActivityIndicator animating size="small" color={Colors.white} />
          </View>
        )}
      </View>
    </>
  );
};

VideoComponent.propTypes = {
  shouldPlay: PropTypes.bool,
  muted: PropTypes.bool,
};

VideoComponent.defaultProps = {
  shouldPlay: false,
  muted: false,
};


export default React.memo(VideoComponent, (prevProps, nextProps) => {
  return prevProps.shouldPlay === nextProps.shouldPlay; // Don't re-render!
});
