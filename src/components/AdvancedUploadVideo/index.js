import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {ButtonView, Text, VideoComponent} from '..';
import {Actions} from 'react-native-router-flux';

import {
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';
import {AppStyles, Colors} from '../../theme';
import styles from './styles';

import PropTypes from 'prop-types';
import util from '../../util';
import {strings} from '../../constants';
import {useSelector} from 'react-redux';

const AdvancedUploadVideo = props => {
  const {
    style,
    postImages,
    parentImages,
    uKey,
    title,
    setPermissionResult,
    hasAdvancedVideo,
  } = props;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        style={styles.selfCenter}>
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
            util.areValuesEqual(cameraPermission, 'granted')
              ? Actions.push('record_video')
              : openSettings().catch(() => console.log('Cannot open settings'))
          }>
          <View style={styles.flexGrow}>
            {addingPost?.uplaoding === uKey &&
            Object.keys(addingPost).length > 0 ? (
              <Text
                style={styles.uploadPhotoTxt}>{`Uploading ${title}...`}</Text>
            ) : (
              <>
                <Text style={styles.uploadPhotoTxt}>{`Upload ${title}`}</Text>
              </>
            )}
          </View>
          <View style={[styles.loadingView]}>
            {addingPost?.uplaoding === uKey &&
            Object.keys(addingPost).length > 0 ? (
              <ActivityIndicator color={Colors.grey2} animating size="small" />
            ) : (
              <>
                {uploadedImages.length > 0 && hasAdvancedVideo && (
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
                                  style={[styles.ml20, styles.overflowHidden]}>
                                  <VideoComponent
                                    videoUrl={res}
                                    hideBtn={true}
                                    hideControl={true}
                                    shouldPlay
                                    muted
                                    thumbnail={res.media_thumbnail}
                                    videoStyle={[
                                      styles.uploadedImage,
                                      // {marginLeft: -40},
                                    ]}
                                  />
                                </View>
                              ) : (
                                <Image
                                  key={idx}
                                  source={{uri: res}}
                                  style={[styles.uploadedImage, styles.ml20]}
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
    </>
  );
};
AdvancedUploadVideo.propTypes = {
  style: PropTypes.object,
  postImages: PropTypes.array,
  onImagesUpdate: PropTypes.func,
  shouldSelectMultipleImages: PropTypes.bool,
  shouldReturnSelectedImageUri: PropTypes.bool,
  getSelectedImageUri: PropTypes.func,
  uKey: PropTypes.string,
  title: PropTypes.string,
  onlyOpenGallery: PropTypes.bool,
  isPhotoCamera: PropTypes.bool,
  isVideoCamera: PropTypes.bool,
  all: PropTypes.bool,
  hasAdvancedVideo: PropTypes.bool,
};

AdvancedUploadVideo.defaultProps = {
  style: {},
  postImages: [],
  onImagesSavedSuccessfully: () => {},
  shouldSelectMultipleImages: true,
  shouldReturnSelectedImageUri: false,
  getSelectedImageUri: () => {},
  uKey: '',
  title: 'Advanced Video',
  onlyOpenGallery: false,
  isPhotoCamera: false,
  isVideoCamera: false,
  all: false,
  hasAdvancedVideo: false,
};

export default AdvancedUploadVideo;
