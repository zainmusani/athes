import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Image, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Actions} from 'react-native-router-flux';
import {ButtonView, ScreenWrapper} from '../../';
import {Colors, Images} from '../../../theme';
import util from '../../../util';
import Text from '../../Text';
import VideoComponent from '../../VideoComponent';
import styles from './styles';

const InLargeView = props => {
  const {src, thumbnail} = props;
  const [videoRatio, setVideoRatio] = useState(1);
  
  const renderInLargeView = () => (
    <View style={styles.postImgWrap}>
      <View style={styles.post}>
        {src?.includes('.mp4') || src?.includes('.webm') ? (
          <VideoComponent
            thumbnail={thumbnail}
            videoUrl={src}
            hideBtn={true}
            shouldPlay={true}
            hideControl
            setVideoRatio={setVideoRatio}
            cover
          />
        ) : (
          <FastImage
            style={{flex: 1}}
            source={{
              uri: src,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      </View>
    </View>
  );

  return (
    <ScreenWrapper pageBackground={Colors.black} hideNav>
      <ButtonView style={styles.backBtn} onPress={() => Actions.pop()}>
        <Image
          source={Images.crossIconBlack}
          style={{tintColor: Colors.white}}
        />
      </ButtonView>

      {util.isEmptyValue(src) || util.isFieldNil(src) ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: Colors.white}}>There is nothing to show</Text>
        </View>
      ) : (
        renderInLargeView()
      )}
    </ScreenWrapper>
  );
};

InLargeView.propTypes = {
  // src: PropTypes.object || PropTypes.string,
  thumbnail: PropTypes.string,
  hasIntroVideo: PropTypes.bool,
};
InLargeView.defaultProps = {
  // src: {} || '',
  thumbnail: '',
  hasIntroVideo: false,
};

export default InLargeView;
