// @flow
import React, {useEffect, useRef, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  Image,
  View,
  Keyboard,
  ScrollView,
  FlatList,
  ImageBackground,
  BackHandler,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import {Actions} from 'react-native-router-flux';
import {Images, AppStyles, Colors, Metrics, Fonts} from '../../../theme';
import {
  Text,
  ScreenWrapper,
  ButtonView,
  ProfileHeader,
  ParentAthleteTemplate,
  Post,
  TopTabbar,
  PostAction,
  Loader,
} from '../../../components';
import PropTypes from 'prop-types';
import {approvalTabsArray} from '../../../constants';
import Edit from './edit';
import ProfileBlackSection from '../components/ProfileBlackSection';
import SessionEventTemplate from '../components/SessionEventTemplate';
import EventTemplate from '../components/EventTemplate';
import GalleryTab from '../components/GalleryTab';
import {getChildPostsListRequest} from '../../../actions/PostActions';
import _ from 'lodash';
import {enrolledEventsRequest} from '../../../actions/EventsActions';
import {enrolledSessionRequest} from '../../../actions/SessionsActions';
import {enrolledSeasonRequest} from '../../../actions/SeasonsActions';
import { followingRequest } from '../../../actions/UserActions';

const ParentAthlete = props => {
  const {
    publicView,
    isParentAthleteManagementView,
    user_role,
    fromSignup,
    child_data,
    tab,
  } = props;

  const parentAthleteManagementTabs = [
    'Profile',
    'Approval',
    'Edit',
    'Event',
    'Session',
    'Season',
  ];

  const profileTabs = ['Profile', 'Posts', 'Gallery'];

  const publicProfileTabs = ['Profile', 'Posts', 'Gallery'];

  const tabsArray = isParentAthleteManagementView
    ? parentAthleteManagementTabs
    : publicView
    ? publicProfileTabs
    : profileTabs;

  const dispatch = useDispatch(false);
  const [loading, setLoading] = useState(false);
  const [followButton, setFollowButton] = useState(
    user?.isFollow ? 'Unfollow' : 'Follow',
  );
  const [currentTab, setCurrentTab] = useState(tab ? tab : 'Profile');
  const [isListViewVisible, setIsListViewVisible] = useState(true);
  const [submitForm, setSubmitForm] = useState(() => 0);
  const [approvalTabs, setApprovalTabs] = useState(1);
  const [actionsOfPost, setActionsOfPost] = useState({});

  const [pendingRequests, setPendingRequests] = useState('');
  const {postsList, gallery} = useSelector(state => state.post);
  const loggedInUser = useSelector(state => state.user.data);
  const {enrolledEvents} = useSelector(state => state.events);
  const {enrolledSessions} = useSelector(state => state.sessions);
  const {enrolledSeasons} = useSelector(state => state.seasons);
  const {user, teams, eventSessionSeason} = useSelector(
    state => state.profile?.profileDetail,
  );
  // const [posts, setPost] = useState([]);
  const postViewRef = useRef(null);

  const id = child_data ? child_data.id : loggedInUser.id;

  useEffect(() => {
    setLoading(true);
    getPostList();
  }, [approvalTabs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPendingRequests('');
      setActionsOfPost({});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoading(true);
    loadEventsData();
  }, [currentTab]);

  useEffect(() => {
    if (enrolledSessions.length == 0 && currentTab == 'Session') {
      setIsListViewVisible(false);
    }
    if (enrolledSeasons.length == 0 && currentTab == 'Season') {
      setIsListViewVisible(false);
    }
    if (enrolledEvents.length == 0 && currentTab == 'Event') {
      setIsListViewVisible(false);
    }
  }, [enrolledEvents, enrolledSessions, enrolledSeasons]);

  const getPostList = () => {
    if (user?.id) {
      dispatch(
        getChildPostsListRequest(
          {
            limit: 300,
            offset: 0,
            user_id: user?.id,
            status: approvalTabs ? approvalTabs - 1 : 0,
          },
          res => {
            setLoading(false);
          },
        ),
      );
    }
  };

  const loadEventsData = () => {
    switch (currentTab) {
      case 'Event':
        dispatch(
          enrolledEventsRequest({limit: 300, offset: 0, userId: id}, res => {
            setIsListViewVisible(true);
            setLoading(false);
          }),
        );
        break;
      case 'Session':
        dispatch(
          enrolledSessionRequest({limit: 300, offset: 0, userId: id}, res => {
            setIsListViewVisible(true);
            setLoading(false);
          }),
        );
        break;
      case 'Season':
        dispatch(
          enrolledSeasonRequest({limit: 300, offset: 0, userId: id}, res => {
            setIsListViewVisible(true);
            setLoading(false);
          }),
        );
        break;
      default:
        setLoading(false);
        break;
    }
  };

  const handlePendingRequestButtons = value => {
    setLoading(true);
    setPendingRequests(value);
    let selectedTab = value == 'Approve' ? 2 : 3;
    setApprovalTabs(selectedTab);
    getPostList();
  };

  const handleActionsOfPost = item => {
    setActionsOfPost(item);
  };

  const renderEmptyView = () => {
    return (
      <View style={{flex: 1, ...AppStyles.centerInner}}>
        <Text
          size={22}
          color={Colors.white}
          textAlign="center"
          style={AppStyles.mBottom10}>
          Data Not Found
        </Text>
        <Text color={Colors.grey2} size={10}>
          Data Not Found.
        </Text>
      </View>
    );
  };

  return (
    <ScreenWrapper pageBackground={Colors.graybrown} hideNav>
      <>
        <ProfileHeader
          backButtonOnPress={() =>
            fromSignup ? Actions.replace('athes_tab') : Actions.pop()
          }
          isParentAthleteManagementView={
            isParentAthleteManagementView ? true : false
          }
          showButton={loggedInUser?.id !== user?.id}
          buttonText={followButton}
          buttonOnPress={() => {
            if (publicView) {
              let payload = {
                following_id: user.id,
                follow: followButton == 'Follow' ? 1 : 0,
              };
              dispatch(
                followingRequest(payload, res => {
                  setFollowButton(
                    followButton == 'Follow' ? 'Unfollow' : 'Follow',
                  );
                }),
              );
            }
          }}
          user_role={user_role}
          isPublicView={publicView ? true : false}
        />

        <View style={styles.profileTabs}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={tabsArray}
            renderItem={({item, index}) => {
              return (
                <ButtonView
                  style={styles.tab}
                  onPress={() => {
                    setCurrentTab(item);
                  }}>
                  <Text
                    size={Fonts.size.normal}
                    type={Fonts.type.medium}
                    bold="500"
                    color={currentTab === item ? Colors.white : Colors.gray7}>
                    {item}
                  </Text>
                  {currentTab === item && (
                    <View style={styles.activeTabBottom}></View>
                  )}
                </ButtonView>
              );
            }}
          />
        </View>
        <View style={{backgroundColor: Colors.black, flex: 1}}>
          {Object.keys(actionsOfPost).length > 0 && (
            <PostAction actionsOfPost={actionsOfPost} />
          )}

          {currentTab === 'Profile' && (
            <ScrollView
              style={styles.profileContainer}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={AppStyles.pBottom20}>
              <SessionEventTemplate
                isPublicView={publicView}
                array={eventSessionSeason?.filter(e => e?.type === 'event')}
                title={`Events`}
                isViewAllButtonVisible
                viewAppButtonPress={() => setCurrentTab('Event')}
              />

              <ProfileBlackSection
                array={teams}
                title="My Teams"
                array_type="team"
                user_role={4}
                publicView={publicView}
              />

              <SessionEventTemplate
                isPublicView={publicView}
                array={eventSessionSeason?.filter(e => e?.type !== 'event')}
                title={`Schedule`}
                isViewAllButtonVisible
                viewAppButtonPress={() => setCurrentTab('Session')}
              />
            </ScrollView>
          )}

          {currentTab === 'Approval' && (
            <View style={styles.approvalContainer}>
              <TopTabbar
                array={approvalTabsArray}
                tabs={approvalTabs}
                setTabs={setApprovalTabs}
              />

              {pendingRequests !== '' && (
                <View style={styles.pendingRequestMainView}>
                  <View>
                    <Text style={styles.pendingRequestHeading}>
                      {pendingRequests === 'Reject'
                        ? 'Post Reject'
                        : pendingRequests === 'Approve'
                        ? 'Post Approve'
                        : ''}
                    </Text>
                    <Text style={styles.pendingRequestSubheading}>
                      {pendingRequests === 'Reject'
                        ? 'Athlete post has been Rejected'
                        : pendingRequests === 'Approve'
                        ? 'Athlete post has been Approved'
                        : ''}
                    </Text>
                  </View>

                  {/* <ButtonView
                style={styles.undoButtonView}
                onPress={() => setPendingRequests('')}>
                <Text style={styles.undoButtonText}>Undo</Text>
              </ButtonView> */}
                </View>
              )}

              {approvalTabs === 1 && (
                <View style={{flex: 1}}>
                  {!loading && (
                    <View
                      style={{alignItems: 'center', flex: 1}}
                      // onTouchEnd={() => postViewRef.current?.hide()}
                    >
                      {postsList.length == 0 ? (
                        <>{renderEmptyView()}</>
                      ) : (
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          onScroll={() => {
                            postViewRef.current?.hide();
                          }}
                          refreshControl={
                            <RefreshControl
                              refreshing={loading && !postsList?.length}
                              onRefresh={() => {
                                setLoading(true);
                                getPostList();
                              }}
                              tintColor={Colors.white}
                            />
                          }
                          style={{
                            width: Metrics.screenWidth,
                          }}
                          data={postsList}
                          renderItem={({item, index}) => (
                            <Post
                              ref={postViewRef}
                              key={index}
                              data={item}
                              isProfileView
                              isPendingView={true}
                              handleActionsOfPost={handleActionsOfPost}
                              handlePendingRequestButtons={
                                handlePendingRequestButtons
                              }
                            />
                          )}
                        />
                      )}
                    </View>
                  )}
                </View>
              )}

              {approvalTabs === 2 && (
                <View style={{flex: 1}}>
                  {!loading && (
                    <View
                      style={{alignItems: 'center', flex: 1}}
                      // onTouchEnd={() => postViewRef.current?.hide()}
                    >
                      {postsList.length == 0 ? (
                        <>{renderEmptyView()}</>
                      ) : (
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          onScroll={() => {
                            postViewRef.current?.hide();
                          }}
                          refreshControl={
                            <RefreshControl
                              refreshing={loading && !postsList?.length}
                              onRefresh={() => {
                                setLoading(true);
                                getPostList();
                              }}
                              tintColor={Colors.white}
                            />
                          }
                          style={{
                            width: Metrics.screenWidth,
                          }}
                          data={postsList}
                          renderItem={({item, index}) => (
                            <Post
                              ref={postViewRef}
                              key={index}
                              isAccepted
                              handleActionsOfPost={handleActionsOfPost}
                              data={item}
                            />
                          )}
                        />
                      )}
                    </View>
                  )}
                </View>
              )}

              {approvalTabs === 3 && (
                <View style={{flex: 1}}>
                  {!loading && (
                    <View
                      style={{alignItems: 'center', flex: 1}}
                      // onTouchEnd={() => postViewRef.current?.hide()}
                    >
                      {postsList.length == 0 ? (
                        <>{renderEmptyView()}</>
                      ) : (
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          onScroll={() => {
                            postViewRef.current?.hide();
                          }}
                          refreshControl={
                            <RefreshControl
                              refreshing={loading && !postsList?.length}
                              onRefresh={() => {
                                setLoading(true);
                                getPostList();
                              }}
                              tintColor={Colors.white}
                            />
                          }
                          style={{
                            width: Metrics.screenWidth,
                          }}
                          data={postsList}
                          renderItem={({item, index}) => (
                            <Post
                              ref={postViewRef}
                              key={index}
                              isDeletedView
                              data={item}
                            />
                          )}
                        />
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
          )}

          {currentTab === 'Edit' && (
            <Edit
              submitForm={submitForm}
              setSubmitForm={setSubmitForm}
              id={id}
              isParentAthleteManagementView={isParentAthleteManagementView}
            />
          )}

          {!loading && (
            <>
              {
                currentTab === 'Event' && (
                  <View style={styles.eventContainer}>
                    {!isListViewVisible ? (
                      <>{renderEmptyView()}</>
                    ) : (
                      <FlatList
                        data={enrolledEvents}
                        refreshControl={
                          <RefreshControl
                            refreshing={loading && !enrolledEvents?.length}
                            onRefresh={() => {
                              setLoading(true);
                              loadEventsData();
                            }}
                            tintColor={Colors.white}
                          />
                        }
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                          return (
                            <ParentAthleteTemplate
                              item={item}
                              hasTimings
                              onPress={() =>
                                Actions.eventDetail({
                                  data: item,
                                  isParentAthleteView: user_role !== 1,
                                  isUserEnroll: true,
                                })
                              }
                            />
                          );
                        }}
                      />
                    )}
                  </View>
                )}

              {
                currentTab === 'Session' && (
                  <View style={styles.eventContainer}>
                    {!isListViewVisible ? (
                      <>{renderEmptyView()}</>
                    ) : (
                      <FlatList
                        data={enrolledSessions}
                        refreshControl={
                          <RefreshControl
                            refreshing={loading && !enrolledSessions?.length}
                            onRefresh={() => {
                              setLoading(true);
                              loadEventsData();
                            }}
                            tintColor={Colors.white}
                          />
                        }
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                          return (
                            <ParentAthleteTemplate
                              item={item}
                              hasTimings
                              onPress={() =>
                                Actions.sessionDetail({
                                  data: item,
                                  isParentAthleteView: user_role !== 1,
                                  isUserEnroll: true,
                                })
                              }
                            />
                          );
                        }}
                      />
                    )}
                  </View>
                )}

              {
                currentTab === 'Season' && (
                  <View style={styles.seasonContainer}>
                    {!isListViewVisible ? (
                      <>{renderEmptyView()}</>
                    ) : (
                      <FlatList
                        data={enrolledSeasons}
                        refreshControl={
                          <RefreshControl
                            refreshing={loading && !enrolledSeasons?.length}
                            onRefresh={() => {
                              setLoading(true);
                              loadEventsData();
                            }}
                            tintColor={Colors.white}
                          />
                        }
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {
                          return (
                            <ParentAthleteTemplate
                              item={item}
                              isSeasonView={true}
                              onPress={() =>
                                Actions.seasonDetail({
                                  data: item,
                                  isParentAthleteView: user_role !== 1,
                                  isUserEnroll: true,
                                })
                              }
                            />
                          );
                        }}
                      />
                    )}
                  </View>
                )}
            </>
          )}

          {currentTab === 'Posts' && (
            <View
              style={{
                flex: 1,
                ...AppStyles.paddingHorizontalBase,
                // ...AppStyles.mBottom45,
                ...AppStyles.pBottom100,
              }}>
              {!publicView && (
                <TopTabbar
                  array={approvalTabsArray}
                  tabs={approvalTabs}
                  setTabs={setApprovalTabs}
                />
              )}

              {approvalTabs === 1 && (
                <>
                  {!loading && (
                    <View
                      style={{alignItems: 'center'}}
                      // onTouchEnd={() => postViewRef.current?.hide()}
                    >
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        onScroll={() => {
                          postViewRef.current?.hide();
                        }}
                        refreshControl={
                          <RefreshControl
                            refreshing={loading && !postsList?.length}
                            onRefresh={() => {
                              setLoading(true);
                              getPostList();
                            }}
                            tintColor={Colors.white}
                          />
                        }
                        style={{
                          width: Metrics.screenWidth,
                        }}
                        data={postsList}
                        renderItem={({item, index}) => (
                          <Post
                            key={index}
                            ref={postViewRef}
                            isProfileView={!publicView ? true : false}
                            handleActionsOfPost={handleActionsOfPost}
                            data={item}
                          />
                        )}
                      />
                    </View>
                  )}
                </>
              )}

              {approvalTabs === 2 && (
                <>
                  {!loading && (
                    <View style={{alignItems: 'center'}}>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        onRefresh={() => {
                          setLoading(true);
                          getPostList();
                        }}
                        refreshing={loading}
                        style={{
                          width: Metrics.screenWidth,
                        }}
                        data={postsList}
                        renderItem={({item, index}) => (
                          <Post
                            key={index}
                            data={item}
                            isProfileView={!publicView ? true : false}
                            handleActionsOfPost={handleActionsOfPost}
                          />
                        )}
                      />
                    </View>
                  )}
                </>
              )}

              {approvalTabs === 3 && (
                <>
                  {!loading && (
                    <View style={{alignItems: 'center'}}>
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        onRefresh={() => {
                          setLoading(true);
                          getPostList();
                        }}
                        refreshing={loading}
                        style={{
                          width: Metrics.screenWidth,
                        }}
                        data={postsList}
                        renderItem={({item, index}) => (
                          <Post
                            key={index}
                            data={item}
                            isDeletedView={true}
                            isProfileView={!publicView ? true : false}
                            handleActionsOfPost={handleActionsOfPost}
                          />
                        )}
                      />
                    </View>
                  )}
                </>
              )}
            </View>
          )}

          {currentTab === 'Gallery' && <GalleryTab array={gallery} />}
        </View>
      </>
      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

const mapStateToProps = ({user}) => ({
  user_role: user.data.role,
});

const actions = {};

export default connect(mapStateToProps, actions)(ParentAthlete);
