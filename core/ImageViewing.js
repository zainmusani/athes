import React, {useCallback, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  VirtualizedList,
  Modal,
} from 'react-native';
import ImageItem from './components/ImageItem/ImageItem';
import ImageDefaultHeader from './components/ImageDefaultHeader';
import StatusBarManager from './components/StatusBarManager';
import useAnimatedComponents from './hooks/useAnimatedComponents';
import useImageIndexChange from './hooks/useImageIndexChange';
import useRequestClose from './hooks/useRequestClose';
const DEFAULT_ANIMATION_TYPE = 'fade';
const DEFAULT_BG_COLOR = '#000';
const DEFAULT_DELAY_LONG_PRESS = 800;
const SCREEN = Dimensions.get('screen');
const SCREEN_WIDTH = SCREEN.width;
function ImageViewing({
  images,
  keyExtractor,
  imageIndex,
  visible,
  hideControl,
  user,
  onRequestClose,
  onThreeDots,
  onLongPress = () => {},
  onImageIndexChange,
  animationType = DEFAULT_ANIMATION_TYPE,
  backgroundColor = DEFAULT_BG_COLOR,
  presentationStyle,
  swipeToCloseEnabled,
  doubleTapToZoomEnabled,
  delayLongPress = DEFAULT_DELAY_LONG_PRESS,
  HeaderComponent,
  FooterComponent,
}) {
  const imageList = React.createRef();

  const [opacity, onRequestCloseEnhanced] = useRequestClose(onRequestClose);
  const [currentImageIndex, onScroll] = useImageIndexChange(imageIndex, SCREEN);
  const [headerTransform, footerTransform, toggleBarsVisible] =
    useAnimatedComponents();
  useEffect(() => {
    if (onImageIndexChange) {
      onImageIndexChange(currentImageIndex);
    }
  }, [currentImageIndex]);
  const onZoom = useCallback(
    isScaled => {
      var _a, _b;
      // @ts-ignore
      (_b =
        (_a = imageList) === null || _a === void 0 ? void 0 : _a.current) ===
        null || _b === void 0
        ? void 0
        : _b.setNativeProps({scrollEnabled: !isScaled});
      toggleBarsVisible(!isScaled);
    },
    [imageList],
  );
  if (!visible) {
    return null;
  }
  return (
    <Modal
      transparent={presentationStyle === 'overFullScreen'}
      visible={visible}
      presentationStyle={presentationStyle}
      animationType={animationType}
      onRequestClose={onRequestCloseEnhanced}
      supportedOrientations={['portrait']}
      hardwareAccelerated>
      <StatusBarManager presentationStyle={presentationStyle} />
      <View style={[styles.container, {opacity, backgroundColor}]}>
        {images.length > 1 && (
          <View
            style={{
              position: 'absolute',
              bottom: typeof FooterComponent !== 'undefined' ? 100 : 0,
              left: 0,
              right: 0,

              zIndex: 99999,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {images.map((_, idx) => (
              <View
                key={`dots-${idx}`}
                style={{
                  backgroundColor:
                    currentImageIndex == idx ? '#B0B7BB' : '#FFFFFF',
                  width: 7,
                  height: 7,
                  borderRadius: 7,
                  marginHorizontal: 2,
                }}></View>
            ))}
          </View>
        )}
        <Animated.View style={[styles.header, {transform: headerTransform}]}>
          {typeof HeaderComponent !== 'undefined' ? (
            React.createElement(HeaderComponent, {
              imageIndex: currentImageIndex,
            })
          ) : onThreeDots ? (
            <ImageDefaultHeader
              onThreeDots={onThreeDots}
              onRequestClose={onRequestCloseEnhanced}
              user={user}
            />
          ) : (
            <ImageDefaultHeader
              onRequestClose={onRequestCloseEnhanced}
              user={user}
            />
          )}
        </Animated.View>

        <VirtualizedList
          ref={imageList}
          data={images}
          horizontal
          pagingEnabled
          windowSize={2}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          initialScrollIndex={imageIndex}
          getItem={(_, index) => images[index]}
          getItemCount={() => images.length}
          getItemLayout={(_, index) => ({
            length: SCREEN_WIDTH,
            offset: SCREEN_WIDTH * index,
            index,
          })}
          renderItem={({item: imageSrc, index}) => (
            <ImageItem
              onZoom={onZoom}
              hideControl={hideControl}
              imageSrc={imageSrc}
              onRequestClose={onRequestCloseEnhanced}
              onLongPress={onLongPress}
              delayLongPress={delayLongPress}
              swipeToCloseEnabled={swipeToCloseEnabled}
              doubleTapToZoomEnabled={doubleTapToZoomEnabled}
              shouldPlay={currentImageIndex === index}
            />
          )}
          onMomentumScrollEnd={onScroll}
          //@ts-ignore
          keyExtractor={(imageSrc, index) =>
            keyExtractor
              ? keyExtractor(imageSrc, index)
              : imageSrc.uri || `${imageSrc}`
          }
        />

        {typeof FooterComponent !== 'undefined' && (
          <Animated.View style={[styles.footer, {transform: footerTransform}]}>
            {React.createElement(FooterComponent, {
              imageIndex: currentImageIndex,
            })}
          </Animated.View>
        )}
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  header: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    top: 0,
  },
  footer: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    bottom: 40,
  },
});
const EnhancedImageViewing = props => (
  <ImageViewing key={props.imageIndex} {...props} />
);
export default EnhancedImageViewing;
