import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ButtonView, Text, VideoComponent} from '..';
// import {strings} from '../../constants';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {strings} from '../../constants';
import util from '../../util';
import styles from './styles';
import FastImage from 'react-native-fast-image';

const UploadImage = props => {
  const {
    style,
    postImages,
    parentImages,
    shouldReturnSelectedImageUri,
    getSelectedImageUri,
    shouldSelectMultipleImages,
    onlyOpenGallery,
    isPhotoCamera,
    isVideoCamera,
    all,
    uKey,
    title,
    subTitle,
    setPermissionResult,
    user_id,
  } = props;

  const bottomSheetRef = useRef(null);

  const [uploadedImages, setUploadedImages] = useState([]);
  const [permissionResultState, setPermissionResultState] = useState(() => '');
  const [cameraPermission, setCameraPermission] = useState(() => '');
  const {addingPost} = useSelector(state => state.post);

  useEffect(() => {
    setUploadedImages(parentImages?.map(({path}) => path) || []);
  }, [parentImages]);

  useEffect(() => {
    if (postImages.length > 0) {
      setUploadedImages(postImages);
    }

    request(
      util.isPlatformAndroid()
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY,
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE: {
            setPermissionResult(result);
            setPermissionResultState(result);
            break;
          }
          case RESULTS.DENIED: {
            setPermissionResult(result);
            setPermissionResultState(result);
            break;
          }
          case RESULTS.LIMITED: {
            setPermissionResult(result);
            setPermissionResultState(result);
            break;
          }
          case RESULTS.GRANTED: {
            setPermissionResult(result);
            setPermissionResultState(result);
            break;
          }
          case RESULTS.BLOCKED: {
            setPermissionResult(result);
            setPermissionResultState(result);
            break;
          }
        }
      })
      .catch(error => {
        // …
      });

    request(
      util.isPlatformAndroid()
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA,
    )
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE: {
            setCameraPermission(result);
            break;
          }
          case RESULTS.DENIED: {
            setCameraPermission(result);
            break;
          }
          case RESULTS.LIMITED: {
            setCameraPermission(result);
            break;
          }
          case RESULTS.GRANTED: {
            setCameraPermission(result);
            break;
          }
          case RESULTS.BLOCKED: {
            setCameraPermission(result);
            break;
          }
        }
      })
      .catch(error => {
        // …
      });
  }, []);

  const onGalleryPress = () => {
    !onlyOpenGallery && bottomSheetRef.current?.close();

    setTimeout(() => {
      ImagePicker.openPicker({
        width: 400,
        height: 400,
        multiple: shouldSelectMultipleImages,
        maxFiles: 30,
        compressVideoPreset: 'Passthrough',
        mediaType: isVideoCamera ? 'video' : isPhotoCamera ? 'photo' : 'any',
      }).then(async images => {
        if (!util.isArrayEmpty(images) && images.length > 30) {
          util.topAlertError(
            'Selected files limit should not be more than 30.',
          );
        } else if (!util.isArrayEmpty(images)) {
          let path = null;
          if (_.isArray(images)) {
            path = _.map(images, 'path');
          } else {
            path = [images.path];
          }

          setUploadedImages(path);
          if (shouldReturnSelectedImageUri) {
            getSelectedImageUri(images);
          }
        }
      });
    }, 500);
  };

  const onCameraPress = (type = 'any') => {
    bottomSheetRef.current?.close();
    setTimeout(() => {
      ImagePicker.openCamera({
        width: 300,
        height: 800,
        mediaType: isVideoCamera ? 'video' : type,
        // compressImageMaxWidth: 400,
        // compressImageMaxHeight: 400,
        // compressImageQuality: 0.7,
        // compressVideoPreset: 'LowQuality',
      }).then(async images => {
        if (images) {
          let path = null;
          if (_.isArray(images)) {
            path = _.map(images, 'path');
          } else {
            path = [images.path];

            if (shouldSelectMultipleImages) {
              images = [images];
            }
          }
          setUploadedImages(path);

          if (shouldReturnSelectedImageUri) {
            getSelectedImageUri(images);
          }
        }
      });
    }, 500);
  };

  const renderPleaseAllowPermissionView = () => (
    <View style={styles.permissionTextCont}>
      <Text style={styles.pleaseAllowPermissionText}>
        {util.isPlatformAndroid()
          ? strings.PLEASE_ALLOW_GALLERY_PERMISSION_ANDROID
          : strings.PLEASE_ALLOW_GALLERY_PERMISSION}
      </Text>
      <TouchableOpacity
        onPress={() =>
          openSettings().catch(() => console.log('Cannot open settings'))
        }
        style={{alignSelf: 'center'}}>
        <Text style={styles.grandIssueTxtManage}>
          {strings.ENABLE_PHOTO_ACCESS}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      {util.areValuesEqual(permissionResultState, 'blocked') ? (
        renderPleaseAllowPermissionView()
      ) : (
        <ButtonView
          style={[styles.uploadImage, style]}
          onPress={() =>
            !onlyOpenGallery ? bottomSheetRef.current.open() : onGalleryPress()
          }>
          <View style={{flexGrow: 1}}>
            {addingPost?.uplaoding === uKey &&
            addingPost?.ids.includes(user_id) &&
            Object.keys(addingPost).length > 0 ? (
              <Text
                style={styles.uploadPhotoTxt}>{`Uploading ${title}...`}</Text>
            ) : (
              <>
                <Text style={styles.uploadPhotoTxt}>
                  {uploadedImages.length > 0
                    ? `Change ${title}`
                    : `Upload ${title}`}
                </Text>
                {!_.isEmpty(subTitle) && (
                  <Text style={styles.uploadSizeTxt}>{`${subTitle}`}</Text>
                )}
              </>
            )}
          </View>
          <View
            style={{
              ...AppStyles.flexRow,
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
              alignContent: 'center',
              width: 'auto',
              height: 40,
            }}>
            {addingPost?.uplaoding === uKey &&
            addingPost?.ids.includes(user_id) &&
            Object.keys(addingPost).length > 0 ? (
              <ActivityIndicator color={Colors.grey2} animating size="small" />
            ) : (
              <>
                {uploadedImages.length == 0 && (
                  <Image
                    source={Images.add}
                    style={{tintColor: Colors.white}}
                  />
                )}
                {uploadedImages.length > 0 && (
                  <>
                    {uploadedImages.map((res, idx) => {
                      return (
                        <>
                          {idx < 4 && (
                            <>
                              {res?.includes('.mp4') ||
                              res?.includes('.webm') ||
                              res?.includes('.mov') ? (
                                <View
                                  style={[
                                    {marginLeft: -20, overflow: 'hidden'},
                                  ]}>
                                  <VideoComponent
                                    videoUrl={res}
                                    hideBtn={true}
                                    hideControl={true}
                                    shouldPlay={true}
                                    muted
                                    thumbnail={res.media_thumbnail}
                                    videoStyle={[
                                      styles.uploadedImage,
                                      // {marginLeft: -40},
                                    ]}
                                  />
                                </View>
                              ) : (
                                <FastImage
                                  key={idx}
                                  style={[
                                    styles.uploadedImage,
                                    {marginLeft: -20},
                                  ]}
                                  source={{
                                    uri: res,
                                    priority: FastImage.priority.normal,
                                  }}
                                  resizeMode={FastImage.resizeMode.cover}
                                />
                              )}
                            </>
                          )}
                        </>
                      );
                    })}
                    {uploadedImages.length > 4 && (
                      <Text style={AppStyles.mLeft5} color={Colors.white}>
                        ...
                      </Text>
                    )}
                  </>
                )}
              </>
            )}
          </View>
        </ButtonView>
      )}
      {!onlyOpenGallery && (
        <RBSheet
          ref={bottomSheetRef}
          height={
            all
              ? Platform.OS === 'ios'
                ? 280
                : 260
              : Platform.OS === 'ios'
              ? 220
              : 200
          }
          openDuration={250}
          onClose={() => {
            bottomSheetRef.current?.close;
          }}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,0.2)',
            },
            container: styles.bottomSheetWrapper,
          }}>
          <View
            style={{
              ...AppStyles.pTop20,
            }}>
            <Text
              textAlign="center"
              size={Fonts.size.normal}
              type={Fonts.type.medium}
              bold="500"
              style={{marginBottom: 10}}>
              UPLOAD
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              {(isPhotoCamera || all) && (
                <ButtonView
                  style={styles.bottomSheetItem}
                  onPress={() =>
                    util.areValuesEqual(cameraPermission, 'granted')
                      ? onCameraPress('photo')
                      : openSettings().catch(() =>
                          console.log('Cannot open settings'),
                        )
                  }>
                  <Icon name="camera-retro" size={25} color={Colors.white} />
                  <Text color={Colors.white} style={styles.bottomSheetItemText}>
                    Capture Photo
                  </Text>
                </ButtonView>
              )}

              {(isVideoCamera || all) && (
                <ButtonView
                  style={styles.bottomSheetItem}
                  onPress={() =>
                    util.areValuesEqual(cameraPermission, 'granted')
                      ? onCameraPress('video')
                      : openSettings().catch(() =>
                          console.log('Cannot open settings'),
                        )
                  }>
                  <Icon name="video-camera" size={25} color={Colors.white} />
                  <Text color={Colors.white} style={styles.bottomSheetItemText}>
                    Capture Video
                  </Text>
                </ButtonView>
              )}

              <ButtonView
                style={styles.bottomSheetItem}
                onPress={() => onGalleryPress()}>
                <Icon name="image" size={25} color={Colors.white} />
                <Text color={Colors.white} style={styles.bottomSheetItemText}>
                  Upload from Gallery
                </Text>
              </ButtonView>
            </ScrollView>
          </View>
        </RBSheet>
      )}
    </>
  );
};
UploadImage.propTypes = {
  style: PropTypes.object,
  postImages: PropTypes.array,
  onImagesUpdate: PropTypes.func,
  shouldSelectMultipleImages: PropTypes.bool,
  shouldReturnSelectedImageUri: PropTypes.bool,
  getSelectedImageUri: PropTypes.func,
  uKey: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onlyOpenGallery: PropTypes.bool,
  isPhotoCamera: PropTypes.bool,
  isVideoCamera: PropTypes.bool,
  all: PropTypes.bool,
  user_id: PropTypes.string,
};

UploadImage.defaultProps = {
  style: {},
  postImages: [],
  onImagesSavedSuccessfully: () => {},
  shouldSelectMultipleImages: true,
  shouldReturnSelectedImageUri: false,
  getSelectedImageUri: () => {},
  uKey: '',
  title: 'Photo',
  subTitle: 'Upload one or more files',
  onlyOpenGallery: false,
  isPhotoCamera: false,
  isVideoCamera: false,
  all: false,
  user_id: '',
};

export default UploadImage;
