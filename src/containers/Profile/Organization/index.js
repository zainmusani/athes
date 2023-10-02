// @flow
import React, {useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import {connect, useDispatch, useSelector} from 'react-redux';
import {View, FlatList, ScrollView, Image, BackHandler, RefreshControl} from 'react-native';
import styles from './styles';
import {Actions} from 'react-native-router-flux';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../../theme';
import {
  Text,
  ScreenWrapper,
  ProfileHeader,
  ButtonView,
  Post,
  EventTemplate,
  PostAction,
} from '../../../components';
import {strings} from '../../../constants';
import ProfileBlackSection from '../components/ProfileBlackSection';
import SessionEventTemplate from '../components/SessionEventTemplate';
import Edit from './edit';
import GalleryTab from '../components/GalleryTab';
import PropTypes from 'prop-types';
import {getOwnEventsRequest} from '../../../actions/EventsActions.js';
import {getOwnSessionsRequest} from '../../../actions/SessionsActions';
import {getOwnSeasonsRequest} from '../../../actions/SeasonsActions';
import {followingRequest} from '../../../actions/UserActions';
import {
  getOwnPostsListRequest,
} from '../../../actions/PostActions';
import {setSelectedTab} from '../../../actions/GeneralActions';

const Organization = props => {
  const {publicView, fromSignup, tab} = props;

  const profileTabs = [
    'Profile',
    'Posts',
    'Event',
    'Season',
    'Session',
    'Gallery',
  ];
  const {eventSessionSeason, user} = useSelector(
    state => state.profile?.profileDetail,
  );
  const [showEdit, setShowEdit] = useState(() => fromSignup);
  const [submitForm, setSubmitForm] = useState(() => 0);
  const [currentTab, setCurrentTab] = useState(tab ? tab : 'Profile');
  const [followButton, setFollowButton] = useState(
    user?.isFollow ? 'Unfollow' : 'Follow',
  );
  const [actionsOfPost, setActionsOfPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [isListViewVisible, setIsListViewVisible] = useState(false);
  const tabbarRef = useRef(null);
  const {postsList, gallery} = useSelector(state => state.post);
  const [posts, setPost] = useState([]);
  const postViewRef = useRef(null);

  const dispatch = useDispatch(null);
  const {seasonList} = useSelector(state => state.seasons);
  const {sessionList} = useSelector(state => state.sessions);
  const {eventList} = useSelector(state => state.events);

  useEffect(() => {
    setPost(postsList);
  }, [postsList]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActionsOfPost({});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoading(true);
    loadData();
  }, [currentTab]);

  useEffect(() => {
    if (sessionList.length == 0 && currentTab == 'Session') {
      setIsListViewVisible(false);
    }
    if (seasonList.length == 0 && currentTab == 'Season') {
      setIsListViewVisible(false);
    }
    if (eventList.length == 0 && currentTab == 'Event') {
      setIsListViewVisible(false);
    }
  }, [eventList, sessionList, seasonList]);

  const handleActionsOfPost = item => {
    setActionsOfPost(item);
  };

  const teamViewAllButtonPress = tab => {
    setCurrentTab(tab);

    let scrollTo = 0;
    profileTabs.forEach((res, idx) => {
      if (res === tab) {
        scrollTo = idx;
      }
    });

    tabbarRef.current.scrollToIndex({animated: true, index: scrollTo});
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [showEdit]);

  const loadData = () => {
    if (currentTab === 'Session') {
      dispatch(
        getOwnSessionsRequest({limit: 300, offset: 0, userId: user.id}, res => {
          setIsListViewVisible(true);
          setLoading(false);
        }),
      );
    }
    if (currentTab === 'Season') {
      dispatch(
        getOwnSeasonsRequest({limit: 300, offset: 0, userId: user.id}, res => {
          setIsListViewVisible(true);
          setLoading(false);
        }),
      );
    }
    if (currentTab === 'Event') {
      dispatch(
        getOwnEventsRequest({limit: 300, offset: 0, userId: user.id}, res => {
          setIsListViewVisible(true);
          setLoading(false);
        }),
      );
    }
  };

  const backAction = () => {
    if (showEdit) {
      setShowEdit(false);
      return true;
    } else {
      Actions.pop();
      return true;
    }
  };

  return (
    <ScreenWrapper pageBackground={Colors.graybrown} hideNav>
      <ProfileHeader
        isPublicView={publicView ? true : false}
        backButtonOnPress={() =>
          fromSignup
            ? Actions.replace('athes_tab')
            : showEdit
            ? setShowEdit(false)
            : Actions.pop()
        }
        buttonText={
          publicView ? followButton : showEdit ? strings.UPDATE : strings.EDIT
        }
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
          } else {
            setShowEdit(true);
            if (showEdit) {
              setSubmitForm(submitForm + 1);
            }
          }
        }}
      />
      {showEdit ? (
        <Edit submitForm={submitForm} setSubmitForm={setSubmitForm} />
      ) : (
        <>
          <View style={styles.profileTabs}>
            <FlatList
              horizontal
              ref={tabbarRef}
              showsHorizontalScrollIndicator={false}
              data={profileTabs}
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
                  viewAppButtonPress={() => teamViewAllButtonPress('Event')}
                />

                <ProfileBlackSection
                  array={eventSessionSeason?.filter(e => e?.type === 'season')}
                  title="Season"
                  array_type="season"
                  publicView={publicView}
                  isViewAllButtonVisible
                  viewAppButtonPress={() => teamViewAllButtonPress('Season')}
                />

                <SessionEventTemplate
                  isPublicView={publicView}
                  array={eventSessionSeason?.filter(e => e?.type === 'session')}
                  title={`Session`}
                  isViewAllButtonVisible
                  viewAppButtonPress={() => teamViewAllButtonPress('Session')}
                />
              </ScrollView>
            )}

            {currentTab === 'Posts' && (
              <View style={{flex: 1, backgroundColor: Colors.black}}>
                {Object.keys(actionsOfPost).length > 0 && (
                  <PostAction actionsOfPost={actionsOfPost} />
                )}
                <View
                  style={{alignItems: 'center'}}
                  // onTouchEnd={() => postViewRef.current?.hide()}
                >
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    onScroll={() => {
                      postViewRef.current?.hide();
                    }}
                    style={{
                      width: Metrics.screenWidth,
                    }}
                    refreshControl={
                      <RefreshControl
                        refreshing={loading && !posts?.length}
                        onRefresh={() => {
                          dispatch(
                            getOwnPostsListRequest(
                              {
                                limit: 300,
                                offset: 0,
                                userId: user?.id || user.userId,
                              },
                              res => {
                                setLoading(false);
                              },
                            ),
                          );
                        }}
                        tintColor={Colors.white}
                      />
                    }
                    data={posts}
                    renderItem={({item, index}) => (
                      <Post
                        ref={postViewRef}
                        key={index}
                        isProfileView={!publicView ? true : false}
                        handleActionsOfPost={handleActionsOfPost}
                        data={item}
                      />
                    )}
                  />
                </View>
              </View>
            )}
            {!loading && (
              <>
                {
                  currentTab === 'Event' && (
                    <>
                      {isListViewVisible && (
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          data={eventList}
                          onRefresh={() => {
                            setLoading(true);
                            loadData();
                          }}
                          refreshing={loading}
                          renderItem={({item}) => {
                            return (
                              <EventTemplate
                                item={item}
                                onPress={() =>
                                  Actions.eventDetail({
                                    isCreatorView: true,
                                    data: item,
                                  })
                                }
                              />
                            );
                          }}
                        />
                      )}
                    </>
                  )}

                {
                  currentTab === 'Season' && (
                    <>
                      {isListViewVisible && (
                        <FlatList
                          showsVerticalScrollIndicator={false}
                          data={seasonList}
                          onRefresh={() => {
                            setLoading(true);
                            loadData();
                          }}
                          refreshing={loading}
                          renderItem={({item}) => {
                            return (
                              <EventTemplate
                                item={item}
                                onPress={() =>
                                  Actions.seasonDetail({
                                    isCreatorView: true,
                                    data: item,
                                  })
                                }
                              />
                            );
                          }}
                        />
                      )}
                    </>
                  )}
                {currentTab === 'Session' && (
                  <>
                    {isListViewVisible && (
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={sessionList}
                        onRefresh={() => {
                          setLoading(true);
                          loadData();
                        }}
                        refreshing={loading}
                        renderItem={({item}) => {
                          return (
                            <EventTemplate
                              item={item}
                              onPress={() =>
                                Actions.sessionDetail({
                                  isCreatorView: true,
                                  data: item,
                                })
                              }
                            />
                          );
                        }}
                      />
                    )}
                  </>
                )}
              </>
            )}
            {currentTab === 'Gallery' && <GalleryTab array={gallery} />}
          </View>
        </>
      )}
    </ScreenWrapper>
  );
};

Organization.propTypes = {
  fromSignup: PropTypes.bool,
};
Organization.defaultProps = {
  fromSignup: false,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(Organization);
