import _ from 'lodash';
import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {Image, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {openSettings} from 'react-native-permissions';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {addPostRequest, editPostRequest} from '../../actions/PostActions';
import {getHashtagsListRequest} from '../../actions/UserActions';
import {
  AdvancedUploadVideo,
  Button,
  ButtonView,
  Loader,
  MultiSelectBox,
  ScreenWrapper,
  Text,
  TextInput,
  UploadImage,
} from '../../components';
import {strings} from '../../constants';
import {BackgroundTaskHelper} from '../../helpers/BackgroundTaskHelper';
import {AppStyles, Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const WritePost = props => {
  const {editProfile, editedVideo, fromDashboad, post_id, seasonId, groupId} =
    props;
  const postTextRef = useRef(null);
  const sportsInterestRef = useRef(null);
  const [hasAdvancedVideo, setHasAdvancedVideo] = useState(false);

  const {hastagsList} = useSelector(state => state.user);

  const {postsList, wallPosts, seasonPosts, groupPostsList} = useSelector(
    state => state.post,
  );
  const [disabled, setDisabled] = useState(true);
  const [postText, setPostText] = useState('');
  const [loading, setLoading] = useState(false);
  const [permissionResult, setPermissionResult] = useState(() => '');
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState();
  const [imageUploaded, setIsImageUpload] = useState(false);
  const SPORTSINTRESTDATA = useSelector(state => state.user.sportIntrests);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editedVideo) {
      setImages([]);
      setTimeout(() => {
        setImages([{path: editedVideo}]);
        setIsImageUpload(true);
        setDisabled(false);
      }, 100);
    }
    setHasAdvancedVideo(!!editedVideo);
  }, [editedVideo, fromDashboad]);

  useEffect(() => {
    if (_.isEmpty(selectedHashtags)) {
      setLoading(true);
      dispatch(getHashtagsListRequest(res => {}));

      if (post_id && hastagsList.length > 0) {
        let imgs = [];
        let hashtags_id = [];
        let hashtags_value = [];
        let saveIntrests = [];

        setDisabled(false);

        if (wallPosts.length > 0) {
          wallPosts.forEach(res => {
            if (res.id == post_id) {
              setPostText(res.post_text);
              if (res?.postInterests && res?.postInterests.length > 0) {
                saveIntrests = res?.postInterests;
              }
              if (res?.postTags && res?.postTags.length > 0) {
                res?.postTags.forEach(tg => {
                  hastagsList.forEach(spt => {
                    if (tg.tag == spt.title) {
                      hashtags_id.push(spt.id);
                      hashtags_value.push(spt);
                    }
                  });
                });
              }

              if (res?.media.length > 0) {
                res.media.forEach(img => {
                  imgs.push(img.uri);
                });
              }
            }
          });
        }

        if (postsList.length > 0) {
          postsList.forEach(res => {
            if (res.id == post_id) {
              setPostText(res.post_text);
              if (res?.postInterests && res?.postInterests.length > 0) {
                saveIntrests = res?.postInterests;
              }
              if (res?.postTags && res?.postTags.length > 0) {
                res?.postTags.forEach(tg => {
                  hastagsList.forEach(spt => {
                    if (tg.tag == spt.title) {
                      hashtags_id.push(spt.id);
                      hashtags_value.push(spt);
                    }
                  });
                });
              }

              if (res.media.length > 0) {
                res.media.forEach(img => {
                  imgs.push(img.uri);
                });
              }
            }
          });
        }

        if (seasonPosts.length > 0) {
          seasonPosts.forEach(res => {
            if (res.id == post_id) {
              setPostText(res.post_text);
              if (res?.postInterests && res?.postInterests.length > 0) {
                saveIntrests = res?.postInterests;
              }
              if (res?.postTags && res?.postTags.length > 0) {
                res?.postTags.forEach(tg => {
                  hastagsList.forEach(spt => {
                    if (tg.tag == spt.title) {
                      hashtags_id.push(spt.id);
                      hashtags_value.push(spt);
                    }
                  });
                });
              }

              if (res.media.length > 0) {
                res.media.forEach(img => {
                  imgs.push(img.uri);
                });
              }
            }
          });
        }

        if (groupPostsList.length > 0) {
          groupPostsList.forEach(res => {
            if (res.id == post_id) {
              setPostText(res.post_text);
              if (res?.postInterests && res?.postInterests.length > 0) {
                saveIntrests = res?.postInterests;
              }
              if (res?.postTags && res?.postTags.length > 0) {
                res?.postTags.forEach(tg => {
                  hastagsList.forEach(spt => {
                    if (tg.tag == spt.title) {
                      hashtags_id.push(spt.id);
                      hashtags_value.push(spt);
                    }
                  });
                });
              }

              if (res.media.length > 0) {
                res.media.forEach(img => {
                  imgs.push(img.uri);
                });
              }
            }
          });
        }

        hashtags_id = [...new Set(hashtags_id)];
        hashtags_value = [...new Set(hashtags_value)];
        imgs = [...new Set(imgs)];

        setSelectedHashtags(hashtags_value);

        setUploadedImages(imgs);
        if (SPORTSINTRESTDATA.length > 0) {
          const newData = SPORTSINTRESTDATA.filter(res1 => {
            if (
              saveIntrests?.length > 0 &&
              saveIntrests?.includes(res1.title)
            ) {
              return res1;
            }
          });
          setSelectedInterests(newData);
        }

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      if (!post_id) {
        setLoading(false);
      }
    }
  }, []);

  const getSelectedImageUri = imgs => {
    setImages(imgs);
    setIsImageUpload(true);
    if (imgs.length > 0) {
      setDisabled(false);
    }
  };

  const _validateForm = () => {
    const errors = {};

    if (_.isEmpty(postText) && images.length == 0) {
      errors.postText = util.isRequiredErrorMessage(
        'Please type something or upload media for post.',
      );
    }

    if (_.isEmpty(selectedInterests)) {
      errors.sportInterest = 'Sports Interests is required';
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const onFinish = async () => {
    if (!_validateForm) return;
    let selectedInterest = util.getTitlesFromSelectArray(selectedInterests);

    const payload = {
      sportIntrests: selectedInterest,
      post_text: postText,
      media_urls: [],
      tags: [],
    };
    if (!_.isEmpty(selectedHashtags)) {
      payload.tags = selectedHashtags?.map(o => o?.id);
    }
    if (seasonId) {
      payload.seasonId = seasonId;
    }
    if (groupId) {
      payload.groupId = groupId;
    }

    let url = addPostRequest;

    if (post_id) {
      if (!imageUploaded) {
        payload.media_urls = uploadedImages;
      }
      payload.post_id = post_id;

      url = editPostRequest;
    }

    BackgroundTaskHelper(
      images,
      setImages,
      imageUploaded,
      payload,
      url,
      setLoading,
      dispatch,
    );

    if (fromDashboad) {
      Actions.jump('dashboard', {hasPostAdded: true});
    } else {
      Actions.pop();
    }
  };

  const renderHeaderPermissionSelected = () => {
    return (
      <View style={styles.viewManage}>
        <View style={{flex: 0.8}}>
          <Text style={styles.txtmanageHeader}>{strings.MANAGEHEADER}</Text>
        </View>
        <View style={{flex: 0.2, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() =>
              openSettings().catch(() => console.log('Cannot open settings'))
            }>
            <Text style={styles.txtManage}>{strings.MANAGE}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      leftBtnImage={Images.back_btn}
      leftBtnPress={() =>
        fromDashboad
          ? Actions.jump('dashboard', {refreshNow: new Date()})
          : Actions.pop()
      }
      headerTitle={editProfile ? strings.EDIT_POST : strings.CREATE_POST}
      titleColor={Colors.black}>
      {util.areValuesEqual(permissionResult, 'limited') &&
        renderHeaderPermissionSelected()}

      {!loading && (
        <View style={{flex: 1}}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}>
            <View>
              <TextInput
                placeholder="POST"
                placeholderTextColor={Colors.grey4}
                multiline
                autoFocus
                numberOfLines={10}
                customStyle={styles.postText}
                ref={postTextRef}
                value={postText}
                error={errors?.postText}
                onChangeText={value => {
                  setPostText(value);
                  setDisabled(images.length == 0 && _.isEmpty(value));
                }}
                selectionColor={Colors.grey2}
              />
              {!hasAdvancedVideo && (
                <UploadImage
                  parentImages={images}
                  postImages={post_id ? uploadedImages : []}
                  shouldReturnSelectedImageUri={true}
                  getSelectedImageUri={getSelectedImageUri}
                  shouldSelectMultipleImages={true}
                  onlyOpenGallery={false}
                  title={`Media`}
                  all
                  setPermissionResult={setPermissionResult}
                />
              )}
              <AdvancedUploadVideo
                parentImages={images}
                postImages={post_id ? uploadedImages : []}
                shouldReturnSelectedImageUri={true}
                getSelectedImageUri={getSelectedImageUri}
                shouldSelectMultipleImages={true}
                title="Advanced Video"
                hasAdvancedVideo={hasAdvancedVideo}
                style={[hasAdvancedVideo && {marginTop: 30}]}
                setPermissionResult={setPermissionResult}
              />
            </View>

            <MultiSelectBox
              data={hastagsList}
              label={`Hashtags`}
              selectedValue={selectedHashtags}
              setSelectedValue={setSelectedHashtags}
            />

            <MultiSelectBox
              label={`Sports Interests`}
              error={errors?.sportInterest}
              selectedValue={selectedInterests}
              setSelectedValue={setSelectedInterests}
            />

            <Button
              background={Colors.white}
              onPress={() => onFinish()}
              icon="righArrowIcon"
              iconRight
              raised
              disabled={disabled}
              style={{
                ...AppStyles.mLeft30,
                ...AppStyles.mRight30,
                ...AppStyles.mBottom45,
                // marginBottom: 60,
              }}>
              {editProfile
                ? strings.EDIT.toUpperCase()
                : strings.POST.toUpperCase()}
            </Button>
          </KeyboardAwareScrollView>
        </View>
      )}
      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

WritePost.propTypes = {
  editProfile: PropTypes.bool,
  fromDashboad: PropTypes.bool,
};

WritePost.defaultProps = {
  editProfile: false,
  fromDashboad: false,
  post_id: null,
};

export default WritePost;
