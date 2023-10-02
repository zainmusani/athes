import React, {useEffect, useRef, useState, useMemo} from 'react';
import {
  StatusBar,
  View,
  Image,
  FlatList,
  ImageBackground,
  ScrollView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  deleteGroupByIdRequest,
  getGroupByIdRequest,
  getGroupPostsRequest,
  getOwnGroupsRequest,
  groupMembersListRequest,
  removeGroupMemberRequest,
} from '../../../actions/Group';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  Loader,
  Post,
  TextInput,
  Button,
  PostAction,
} from '../../../components';
import {strings} from '../../../constants';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../../theme';
import styles from './styles';

const GroupDetail = props => {
  const {groupId} = props;

  const [tabs, setTabs] = useState('about');
  const [actionsOfPost, setActionsOfPost] = useState({});
  const [uploadingMsg, setUploadingMsg] = useState({
    icon: Images.bellActive,
    name: 'Uploading Post...',
    description: 'your post will be uploading in a while please wait.',
  });
  const cancelationRBSheetRef = useRef(null);
  const postViewRef = useRef(null);

  const {ownGroup} = useSelector(state => state.group);
  const user = useSelector(state => state.user.data);
  const [loading, setLoading] = useState(false);
  const {groupPostsList, addingPost} = useSelector(state => state.post);
  const {groupMemberList} = useSelector(state => state.group);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      setActionsOfPost({});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getMembers();
    getGroupDetail();
    getGroupPosts();
  }, []);

  const uploadingPostMsg = useMemo(() => {
    if (Object.keys(addingPost).length > 0) {
      return <PostAction actionsOfPost={uploadingMsg} />;
    } else {
      return false;
    }
  }, [addingPost]);

  const getMembers = () => {
    dispatch(
      groupMembersListRequest(
        {groupId, limit: 300, offset: 0},
        (res, err) => {},
      ),
    );
  };

  const getGroupDetail = () => {
    dispatch(
      getGroupByIdRequest(groupId.toString(), (res, err) => {
        // setLoading(true);
        // if (res) setLoading(false);
      }),
    );
  };

  const getGroupPosts = () => {
    dispatch(
      getGroupPostsRequest({groupId, limit: 300, offset: 0}, (res, err) => {
        setLoading(false);
      }),
    );
  };

  const deleteGroupHandler = () => {
    dispatch(
      deleteGroupByIdRequest(groupId.toString(), (res, err) => {
        cancelationRBSheetRef.current.close();
        Actions.pop();
      }),
    );
  };

  const handleActionsOfPost = item => {
    setActionsOfPost(item);
    dispatch(
      getGroupPostsRequest({groupId, limit: 300, offset: 0}, (res, err) => {}),
    );
  };

  const removeGroupMember = userId => {
    dispatch(
      removeGroupMemberRequest({groupId, userId}, (res, err) => {
        if (res) {
          getMembers();
          getGroupDetail();
        }
      }),
    );
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      leftBtnImage={Images.back_btn}
      leftBtnPress={() => Actions.replace('groups')}
      headerTitle={ownGroup.title || strings.GROUP}
      rightBtnImage={ownGroup.userId === user.id && Images.editIconBlack}
      rightBtnPress={() =>
        ownGroup.userId === user.id &&
        Actions.createGroup({edit: true, data: ownGroup})
      }
      secondRightBtnImage={Images.deleteIconCircle}
      secondRightBtnPress={() => cancelationRBSheetRef.current.open()}
      secondRightBtnVisible={ownGroup.userId === user.id && true}>
      <ImageBackground
        source={{uri: ownGroup?.image}}
        resizeMode="cover"
        style={{width: '100%', height: 211, zIndex: 1}}></ImageBackground>

      <View style={styles.inviteMainView}>
        <ButtonView
          style={styles.inviteView1}
          onPress={() =>
            Actions.enrollPeopleList({
              title: `Group Members`,
              attendeesList: groupMemberList,
              groupMember: ownGroup.userId === user.id,
              removeGroupMember,
            })
          }>
          {groupMemberList[0] && (
            <FastImage
              style={[styles.membersImages]}
              source={{
                uri: groupMemberList[0]?.image || Images.userEmptyImage,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          {groupMemberList[1] && (
            <FastImage
              style={[styles.membersImages, {marginLeft: -10}]}
              source={{
                uri: groupMemberList[1].image || Images.userEmptyImage,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          {groupMemberList[2] && (
            <FastImage
              style={[styles.membersImages, {marginLeft: -10}]}
              source={{
                uri: groupMemberList[2]?.image || Images.userEmptyImage,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          <Text style={styles.inviteView1Text}>
            {ownGroup?.memberCount} Members
          </Text>
        </ButtonView>
        <ButtonView
          style={styles.inviteView}
          onPress={() =>
            Actions.invitePeopleScreen({groupId})
          }>
          <Text style={styles.invitetext}>
            {ownGroup.userId === user.id ? `Invite` : `Share`}
          </Text>
        </ButtonView>
      </View>

      <View style={[styles.container, {paddingTop: 30}]}>
        {Object.keys(actionsOfPost).length > 0 && (
          <View style={{marginTop: -10}}>
            <PostAction actionsOfPost={actionsOfPost} />
          </View>
        )}
        <View style={{...AppStyles.pBottom10}}>
          {Object.keys(addingPost).length == 0 && (
            <ButtonView
              style={[styles.writeArea, AppStyles.mTop20]}
              onPress={() => {
                Actions.write_post({groupId});
              }}>
              <FastImage
                source={{
                  uri: user?.image,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
                style={styles.writeLeftImage}
              />
              <Text
                color={Colors.grey2}
                size={Fonts.size.normal}
                style={styles.writeField}>
                POST
              </Text>
              <Image
                source={Images.camera}
                alt="Camera"
                style={styles.writeRightImage}
              />
            </ButtonView>
          )}
          {uploadingPostMsg}
        </View>

        {groupPostsList.length > 0 && (
          <View
            style={{alignItems: 'center', flex: 1}}
            // onTouchEnd={() => postViewRef.current?.hide()}
          >
            <FlatList
              showsVerticalScrollIndicator={false}
              data={groupPostsList}
              style={{
                width: Metrics.screenWidth,
              }}
              onScroll={() => {
                postViewRef.current?.hide();
              }}
              onRefresh={() => {
                setLoading(true);
                getGroupPosts();
              }}
              refreshing={loading}
              renderItem={({item, index}) => {
                return (
                  <Post
                    ref={postViewRef}
                    key={index}
                    handleActionsOfPost={handleActionsOfPost}
                    data={item}
                    isProfileView={item.user.id == user.id}
                  />
                );
              }}
            />
          </View>
        )}
      </View>
      <RBSheet
        ref={cancelationRBSheetRef}
        height={Platform.OS === 'ios' ? 240 : 220}
        openDuration={250}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.4)',
            // alignItems: 'center',
          },
          container: styles.RBSheetMainContainer,
        }}>
        <View style={styles.RBSheetContainer}>
          <Text style={styles.deleteEventHeading}>Delete Group</Text>
          <Text style={styles.RBSheetHeading}>{ownGroup?.title}</Text>
          <Button
            hasLinear
            color="#FFF"
            icon="righArrowIcon"
            iconRight
            onPress={deleteGroupHandler}
            raised
            style={{
              ...AppStyles.mLeft20,
              ...AppStyles.mRight20,
              ...AppStyles.mTop20,
            }}>
            {strings.CONFIRM_DELETE.toUpperCase()}
          </Button>
        </View>
      </RBSheet>
    </ScreenWrapper>
  );
};

export default GroupDetail;
