import _ from 'lodash';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  StatusBar,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {notificationsCountRequest} from '../../actions/NotificationActions';
import {
  getOwnPostsListSuccess,
  getWallPostsListRequest,
} from '../../actions/PostActions';
import {getPublicUsersRequest} from '../../actions/UserActions';
import {
  ButtonView,
  Post,
  PostAction,
  ScreenWrapper,
  Text,
} from '../../components';
import {connectSocket, disconnectSocket} from '../../helpers/chatHelper';
import {updateDeviceToken} from '../../helpers/firebaseHelper';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../theme';
import util from '../../util';
import styles from './styles';
import TopUsers from './TopUsers';

const limit = 3;
const uploadingMsg = {
  icon: Images.bellActive,
  name: 'Uploading Post...',
};
const Dashboard = props => {
  const {refreshNow} = props;
  const [loading, setLoading] = useState(false);
  const [actionsOfPost, setActionsOfPost] = useState({});

  const user = useSelector(state => state.user.data);
  const {wallPosts, addingPost, recentPosts} = useSelector(state => state.post);
  const {count} = useSelector(state => state.notification);

  const [isMoreData, setIsMoreData] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isNextPage = useRef(false);
  const postViewRef = useRef(null);

  const offset = useRef(0);
  const stage = useRef(1);
  const postCount = useRef(0);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!util.isEmptyObject(actionsOfPost)) {
      setTimeout(() => {
        setActionsOfPost({});
      }, 10000);
    }
  }, [actionsOfPost]);

  useEffect(() => {
    if (postCount.current == 0) {
      stage.current = 1;
    }
    getPostList();
  }, [refreshNow]);

  useEffect(() => {
    disconnectSocket();
    connectSocket();
    apiCallForNotificationCount();
    updateDeviceToken();
  }, []);

  const apiCallForNotificationCount = () => {
    dispatch(notificationsCountRequest({}, res => {}));
  };

  const handleActionsOfPost = item => {
    setActionsOfPost(item);
    stage.current = 1;
    postCount.current = 0;
    offset.current = 0;
    getPostList();
  };

  const getPostList = () => {
    setLoading(true);
    apiCallForNotificationCount();
    dispatch(getOwnPostsListSuccess([]));
    dispatch(
      getWallPostsListRequest(
        {
          limit: limit,
          offset: offset.current,
          keyword: '',
          filter: '',
          stage:
            postCount.current == 0 || _.isUndefined(postCount.current)
              ? 1
              : stage.current,
          postCount: postCount.current || 0,
        },
        res => {
          stage.current = res?.returnRequest?.stage ?? 1;
          postCount.current = res?.returnRequest?.postCount ?? 0;
          if (!util.isArrayEmpty(res?.post)) {
            offset.current = offset.current + limit;
            isNextPage.current = true;
            setLoading(false);
          } else {
            isNextPage.current = false;
            setLoading(false);
          }
        },
      ),
    );
  };

  const loadMoreData = () => {
    if (isNextPage.current && postCount.current > 0) {
      setIsMoreData(true);
      const payload = {
        limit: limit,
        offset: offset.current,
        keyword: '',
        filter: '',
        stage: postCount.current == 0 ? 1 : stage.current,
        postCount: postCount.current,
      };
      dispatch(
        getWallPostsListRequest(payload, res => {
          stage.current = res?.returnRequest?.stage ?? 1;
          postCount.current = res?.returnRequest?.postCount ?? 0;

          if (!util.isArrayEmpty(res?.post ?? [])) {
            offset.current = offset.current + limit;
            setIsMoreData(false);
          } else {
            isNextPage.current = false;
            setIsMoreData(false);
          }
        }),
      );
    }
  };

  const uploadingPostMsg = useMemo(() => {
    if (Object.keys(addingPost).length > 0 && !('uplaoding' in addingPost)) {
      return <PostAction actionsOfPost={uploadingMsg} />;
    } else {
      return false;
    }
  }, [addingPost]);

  const renderPostActionView = useMemo(
    () =>
      !util.isEmptyObject(actionsOfPost) && (
        <PostAction actionsOfPost={actionsOfPost} />
      ),
    [actionsOfPost],
  );

  const renderWallPostList = useMemo(() => {
    return (
      <View
        style={[
          {
            height: Metrics.screenHeight - (Platform.OS == 'ios' ? 165 : 115),
            alignItems: 'center',
          },
        ]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => <DashboardHeader />}
          style={{
            width: Metrics.screenWidth,
          }}
          data={util.isArrayEmpty(wallPosts) ? recentPosts : wallPosts}
          onScroll={event => {
            postViewRef.current?.hide();
          }}
          refreshing={false}
          onRefresh={() => {
            setIsRefreshing(true);
            offset.current = 0;
            isNextPage.current = true;

            dispatch(
              getWallPostsListRequest(
                {
                  limit: limit,
                  offset: 0,
                  keyword: '',
                  filter: '',
                  stage: 1,
                  postCount: 0,
                },
                res => {
                  stage.current = res?.returnRequest?.stage ?? 1;
                  postCount.current = res?.returnRequest?.postCount ?? 0;

                  if (!util.isArrayEmpty(res?.post)) {
                    offset.current = offset.current + limit;
                    isNextPage.current = true;
                    setIsRefreshing(false);
                  } else {
                    isNextPage.current = false;
                    setIsRefreshing(false);
                  }
                },
              ),
            );
          }}
          renderItem={({item, index}) => (
            <ListItem
              item={item}
              index={index}
              key={index}
              user={user}
              handleActionsOfPost={handleActionsOfPost}
              postViewRef={postViewRef}
            />
          )}
          ListEmptyComponent={() => <RenderEmptyWall />}
          onEndReached={loadMoreData}
          onEndReachedThreshold={1}
          ListFooterComponent={
            <View style={isMoreData && {marginVertical: 20}}>
              {isMoreData && <ActivityIndicator color={Colors.white} />}
            </View>
          }
        />
      </View>
    );
  }, [
    wallPosts,
    postViewRef,
    isMoreData,
    loading,
    isNextPage,
    stage,
    postCount,
  ]);

  const RenderEmptyWall = () => {
    return (
      <>
        {!loading && (
          <View style={styles.emptyArea}>
            <Text
              size={Fonts.size.xLarge}
              color={Colors.white}
              type={Fonts.type.medium}
              bold="600"
              style={{marginTop: -80}}>
              Follow People
            </Text>
            <Text size={Fonts.size.small} color={Colors.grey2}>
              No Feed Found
            </Text>
            <ButtonView
              style={styles.addbg}
              onPress={() => {
                Actions.push('followers', {
                  isPublicView: true,
                  request: getPublicUsersRequest,
                });
              }}>
              <Image source={Images.add} alt="add" style={styles.addImg} />
            </ButtonView>
          </View>
        )}
      </>
    );
  };

  const DashboardHeader = () => {
    return <TopUsers />;
  };

  const renderRefreshingLoader = () => (
    <View
      style={{
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
      }}>
      <ActivityIndicator
        color={Colors.grey2}
        animating
        size="small"
        style={AppStyles.mTop20}
      />
    </View>
  );

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      sideMenu
      rightBtnImage={Images.chat}
      rightBtnSecondImg={Images.bellActive}
      notificationCount={count}
      rightBtnPress={() => Actions.chat()}
      rightBtnSecondPress={() =>
        Actions.jump('notification', {refreshNow: new Date()})
      }>
      <StatusBar backgroundColor={Colors.black} barStyle="light-content" />
      {renderPostActionView}
      {uploadingPostMsg}
      {renderWallPostList}
      {isRefreshing && renderRefreshingLoader()}
    </ScreenWrapper>
  );
};

const ListItem = React.memo(
  ({item, index, user, handleActionsOfPost, postViewRef}) => {
    return (
      <Post
        ref={postViewRef}
        key={index}
        handleActionsOfPost={handleActionsOfPost}
        data={item}
        isProfileView={item.user.id == user.id}
      />
    );
  },
  (prevProps, nextProps) => {
    return prevProps.item === nextProps.item; // Don't re-render!
  },
);

export default Dashboard;
