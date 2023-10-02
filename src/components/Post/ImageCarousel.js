import React, {useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {AppStyles, Colors, Metrics} from '../../theme';
import VideoComponent from '../VideoComponent';
const {width} = Dimensions.get('window');
import FastImage from 'react-native-fast-image';
import Lightbox from '../Lightbox';
import ImageCarouselFullScreen from './ImageCarouselFullScreen';

const SPACING = 5;
const ITEM_LENGTH = width;

const ImageCarousel = ({
  checkVisible,
  setPostViewIndex,
  postViewIndex,
  media,
}) => {
  const ref = React.useRef();
  const [dotValue, setDotValue] = useState(0);
  const [videoRatio, setVideoRatio] = useState(1);

  const widthArray = Array.from({length: media.length}, (_, i) =>
    Math.floor(width * i),
  );

  React.useEffect(() => {
    setTimeout(() => {
      ref?.current?.scrollTo({
        x: postViewIndex * Metrics.screenWidth,
        y: 0,
        animated: false,
      });
    });
  }, [postViewIndex]);

  return (
    <View style={[styles.container]}>
      <ScrollView
        horizontal
        ref={ref}
        showsHorizontalScrollIndicator={false}
        snapToInterval={Metrics.screenWidth}
        snapToAlignment={'center'}
        scrollEventThrottle={1000}
        pagingEnabled
        onScroll={({nativeEvent}) => {
          if (widthArray.includes(Math.floor(nativeEvent.contentOffset.x))) {
            setDotValue(
              widthArray.indexOf(Math.floor(nativeEvent.contentOffset.x)),
            );
            setPostViewIndex(
              widthArray.indexOf(Math.floor(nativeEvent.contentOffset.x)),
            );
          }
        }}
        disableIntervalMomentum={true}>
        {media.map((item, index) => {
          return (
            <Lightbox
              key={index}
              swipeToDismiss={false}
              renderContent={() => (
                <ImageCarouselFullScreen
                  media={media}
                  postViewIndex={index}
                  setPostViewIndex={setPostViewIndex}
                  checkVisible
                />
              )}>
              <View
                style={[
                  {width: ITEM_LENGTH},
                  item.uri?.includes('.mp4') && {
                    minHeight: Metrics.screenWidth / videoRatio,
                  },
                ]}>
                {item.uri?.includes('.mp4') || item.uri?.includes('.webm') ? (
                  <VideoComponent
                    thumbnail={item.media_thumbnail}
                    videoUrl={item.uri}
                    hideBtn={true}
                    shouldPlay={dotValue === index && checkVisible}
                    hideControl
                    muted
                    setVideoRatio={setVideoRatio}
                    cover={false}
                  />
                ) : (
                  <View style={styles.itemContent}>
                    <FastImage
                      style={[styles.itemImage]}
                      source={{
                        uri: item.uri,
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                )}
              </View>
            </Lightbox>
          );
        })}
      </ScrollView>
      {media.length > 1 && (
        <View
          style={{
            marginTop: -45,
            ...AppStyles.flexRow,
            ...AppStyles.centerInner,
          }}>
          {media.map((_, idx) => (
            <View
              key={`dots-${idx}`}
              style={{
                backgroundColor: dotValue == idx ? Colors.grey : Colors.white,
                width: 7,
                height: 7,
                borderRadius: 7,
                marginHorizontal: 2,
              }}></View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  itemContent: {
    // marginHorizontal: SPACING * 3,
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  itemText: {
    fontSize: 24,
    position: 'absolute',
    bottom: SPACING * 2,
    right: SPACING * 2,
    color: 'white',
    fontWeight: '600',
  },
  itemImage: {
    width: '100%',
    height: ITEM_LENGTH,
    resizeMode: 'cover',
  },
});

export default React.memo(ImageCarousel, (prevProps, nextProps) => {
  return prevProps.checkVisible === nextProps.checkVisible; // Don't re-render!
});
