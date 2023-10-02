// @flow
import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Image, View, Keyboard, FlatList} from 'react-native';
import styles from './styles';
import {Text, ScreenWrapper, ButtonView} from '../../../../components';
import {AppStyles, Colors, Images, Metrics} from '../../../../theme';
import ImageView from 'react-native-image-viewing';
import { Actions } from 'react-native-router-flux';
import FastImage from 'react-native-fast-image';

const GalleryTab = props => {
  const {array, title, viewAllOnPress, homeLayout = false} = props;

  const [imageInlarge, setImageInlarge] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <>
      <View style={{flex: 1}}>
        {homeLayout && (
          <View style={styles.textView}>
            <Text style={styles.text}>{title}</Text>

            <ButtonView onPress={viewAllOnPress}>
              <Text style={styles.viewAllText}>View All</Text>
            </ButtonView>
          </View>
        )}

        <FlatList
          data={array}
          numColumns={homeLayout ? false : 3}
          style={AppStyles.flex}
          horizontal={homeLayout}
          contentContainerStyle={homeLayout ? AppStyles.pLeft20 : {}}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            const isMultiImage = item.length > 1;
            return (
              <>
                <ButtonView
                  onPress={() => {
                    setImageInlarge(true);
                    setImageIndex(index);
                  }}
                  style={
                    !homeLayout
                      ? {
                          width: '33.33%',
                          borderWidth: 0.3,
                          borderColor: Colors.gray10,
                          backgroundColor: Colors.black,
                        }
                      : styles.image
                  }>
                  <FastImage
                    style={{width: '100%', height: 135.92}}
                    source={{
                      uri: item[0].uri?.includes('.mp4')
                        ? item[0]?.media_thumbnail
                        : item[0]?.uri,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                  {!item[0].uri?.includes('.mp4') && isMultiImage && (
                    <Image
                      source={Images.multiImagesIcon}
                      style={styles.multiImage}
                    />
                  )}
                  {item[0].uri?.includes('.mp4') && (
                    <Image source={Images.playIcon} style={styles.multiImage} />
                  )}
                </ButtonView>
              </>
            );
          }}
        />

        <ImageView
          images={array[imageIndex]}
          imageIndex={0}
          visible={imageInlarge}
          onRequestClose={() => setImageInlarge(false)}
          swipeToCloseEnabled={true}
        />
      </View>
    </>
  );
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(GalleryTab);
