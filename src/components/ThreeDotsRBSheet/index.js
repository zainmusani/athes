import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Image, Platform, View, FlatList} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {connect, useDispatch} from 'react-redux';
import {ButtonView, Text} from '../';
import {AppStyles, Images} from '../../theme';
import styles from './styles';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {
  deletePostRequest,
  getWallPostsListSuccess,
  hidePostRequest,
  snoozePostRequest,
} from '../../actions/PostActions';
import {
  followingRequest,
  getPublicUsersRequest,
} from '../../actions/UserActions';
import ModalView from '../ModalView';

const ThreeDotsRBSheet = props => {
  const {
    single,
    showDotsSheet,
    setShowDotsSheet,
    handleActionsOfPost,
    isProfileView,
    post_id,
    post_user,
    // setIsVisible,
  } = props;


  const [item, setItem] = useState();
  const [isModalVisible, setModalVisible] = useState(() => false);

  const threeDotsArray = [
    {
      id: 1,
      icon: Images.eyeIcon2,
      name: 'Hide Post',
      route: null,
      description: 'See fewer post like this',
    },
    {
      id: 2,
      icon: Images.snoozeIcon,
      name: `Snooze ${post_user.name} for 30 days`,
      route: null,
      description: 'Temporarily stop seeing post.',
    },
    {
      id: 3,
      icon: Images.unfollowIcon,
      name: `${post_user?.isfollow ? 'Unfollow' : 'Follow'} ${post_user.name}`,
      route: null,
      description: `${post_user?.isfollow ? 'Stop' : 'Start'} following ${
        post_user.name
      }.`,
    },
    {
      id: 4,
      icon: Images.report,
      name: 'Report',
      route: 'report',
      description: 'Report this post.',
    },
  ];

  const threeDotsProfileViewArray = [
    {
      id: 5,
      icon: Images.deleteIconBlack,
      name: 'Delete Post',
      route: null,
      description: 'Your post will be delete.',
    },
    {
      id: 6,
      icon: Images.editIcon,
      name: 'Edit Post',
      route: 'write_post',
      description: 'Edit Post',
    },
  ];
  const dispatch = useDispatch();
  const sheetRef = useRef(null);

  useEffect(() => {
    if (showDotsSheet) {
      sheetRef.current.open();
    }
  });

  const deletePostConfirmHandler = () => {
    item.name = 'Post Deleted';
    item.description = 'Your post has been deleted.';
    dispatch(
      deletePostRequest(post_id.toString(), res => {
        if (res) {
          // setIsVisible(false);
          setShowDotsSheet(false);
          setModalVisible(false);

          handleActionsOfPost(item);
        }
      }),
    );
  };

  const handleActionButton = item => {
    if (item.route) {
      setShowDotsSheet(false);
      sheetRef.current?.close();
      // setIsVisible(false);
      Actions.push(item.route, {
        post_id: post_id,
        editProfile: true,
      });
      return true;
    }

    if (item.id == 1) {
      item.name = 'Hide Post';
      item.description = 'This Post Is Now Hidden';
      let payload = {
        hide: 1,
        post_id: post_id,
      };
      dispatch(
        hidePostRequest(payload, res => {
          if (res) {
            handleActionsOfPost(item);
            // setIsVisible(false);
          }
        }),
      );
    }

    if (item.id == 2) {
      item.name = 'User Snoozed';
      item.description = 'This user is snoozed now for 30 days.';
      let payload = {
        snoozed: 1,
        following_id: post_user.id,
      };
      dispatch(
        snoozePostRequest(payload, res => {
          if (res) {
            handleActionsOfPost(item);
          }
        }),
      );
    }

    if (item.id == 3) {
      item.name = `${post_user?.isfollow ? 'Unfollowed' : 'Follow'} ${
        post_user.name
      }`;
      item.description = `You have successfully ${
        post_user?.isfollow ? 'unfollow' : 'follow'
      } ${post_user.name}.`;
      let payload = {
        following_id: post_user.id,
        follow: post_user?.isfollow ? 0 : 1,
      };
      dispatch(
        followingRequest(payload, res => {
          if (res) {
            dispatch(getPublicUsersRequest());
            dispatch(getWallPostsListSuccess([]));
            handleActionsOfPost(item);
          }
        }),
      );
    }

    if (item.id == 5) {
      setModalVisible(true);
      setItem(item);
      return;
    }

    setShowDotsSheet(false);
    sheetRef.current?.close();
    if (single) {
      Actions.pop();
    }
  };

  return (
    <RBSheet
      ref={sheetRef}
      height={
        isProfileView
          ? Platform.OS === 'ios'
            ? 200
            : 190
          : Platform.OS === 'ios'
          ? 300
          : 290
      }
      openDuration={250}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
        },
        container: styles.commentContainer,
      }}>
      <ModalView
        deleteConfirmHandler={deletePostConfirmHandler}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        image={Images.deleteIcon}
        isConfirmModal={true}
        heading={'Delete Post'}
        description={'Are you sure you want to delete this Post ?'}
        buttonText={'Confirm'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          ...AppStyles.pTop10,
        }}>
        <ButtonView
          style={styles.commentClose}
          onPress={() => {
            setShowDotsSheet(false);
            sheetRef.current?.close();
          }}>
          <Image source={Images.close} />
        </ButtonView>
      </View>

      <View style={[AppStyles.paddingHorizontalBase, AppStyles.mTop30]}>
        <ModalView
          deleteConfirmHandler={deletePostConfirmHandler}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          image={Images.deleteIcon}
          isConfirmModal={true}
          heading={'Delete Post'}
          description={'Are you sure you want to delete this Post ?'}
          buttonText={'Confirm'}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={isProfileView ? threeDotsProfileViewArray : threeDotsArray}
          renderItem={({item}) => {
            return (
              <ButtonView
                style={styles.threeDotsMainView}
                onPress={() => handleActionButton(item)}>
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={{width: 30, maxHeight: 30}}
                />

                <View style={styles.threeDotsView}>
                  <Text style={styles.threeDotsName}>{item.name}</Text>
                  <Text style={styles.threeDotsDescription}>
                    {item.description}
                  </Text>
                </View>
              </ButtonView>
            );
          }}
        />
      </View>
    </RBSheet>
  );
};

ThreeDotsRBSheet.propTypes = {
  handleActionsOfPost: PropTypes.func,
  single: PropTypes.bool,
  isProfileView: PropTypes.bool,
};

ThreeDotsRBSheet.defaultProps = {
  single: false,
  handleActionsOfPost: () => {},
  isProfileView: false,
};

export default ThreeDotsRBSheet;
