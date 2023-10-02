import React, {useEffect, useMemo, useRef, useState} from 'react';
import {connect, useSelector, useDispatch} from 'react-redux';
import {View, FlatList, ScrollView, Image, BackHandler, RefreshControl} from 'react-native';
import styles from './styles';
import {Actions} from 'react-native-router-flux';
import {AppStyles, Colors, Fonts, Metrics} from '../../../theme';
import {
  Text,
  ScreenWrapper,
  ProfileHeader,
  ButtonView,
  Post,
  PostAction,
} from '../../../components';
import {strings} from '../../../constants';
import PropTypes from 'prop-types';
import ProfileBlackSection from '../components/ProfileBlackSection';
import SessionEventTemplate from '../components/SessionEventTemplate';
import EventTemplate from '../components/EventTemplate';
import Edit from './edit';
import GalleryTab from '../components/GalleryTab';
import {followingRequest} from '../../../actions/UserActions';
import {
  getOwnPostsListRequest,
} from '../../../actions/PostActions';
import {setSelectedTab} from '../../../actions/GeneralActions';

const Athlete = props => {
  const {publicView, fromSignup, tab} = props;

  const profileTabs = ['Profile', 'Posts', 'Gallery'];
  const dispatch = useDispatch(null);
  const {user, teams, eventSessionSeason} = useSelector(
    state => state.profile?.profileDetail,
  );
  const [loading, setLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(() => fromSignup);
  const [submitForm, setSubmitForm] = useState(() => 0);
  const [currentTab, setCurrentTab] = useState(tab ? tab : 'Profile');
  const [followButton, setFollowButton] = useState(
    user?.isFollow ? 'Unfollow' : 'Follow',
  );
  const [actionsOfPost, setActionsOfPost] = useState({});
  const {postsList, gallery} = useSelector(state => state.post);
  const [posts, setPost] = useState([]);
  const postViewRef = useRef(null);

  useEffect(() => {
    setPost(postsList);
  }, [postsList]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActionsOfPost({});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleActionsOfPost = item => {
    setActionsOfPost(item);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [showEdit]);

  const backAction = () => {
    if (showEdit) {
      setShowEdit(false);
      return true;
    } else {
      Actions.pop();
      return true;
    }
  };

  const renderMyTeams = useMemo(
    () => (
      <ProfileBlackSection
        array={teams}
        title="My Teams"
        array_type="team"
        user_role={4}
        publicView={publicView}
      />
    ),
    [teams],
  );

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
        user={user}
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
              showsHorizontalScrollIndicator={false}
              horizontal
              data={profileTabs}
              keyExtractor={item => item.id}
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
                  title={`Events`}
                  isViewAllButtonVisible={!publicView}
                  viewAppButtonPress={() => {
                    props.setSelectedTab(3);
                    Actions.replace('managementTab', {refreshNow: new Date()});
                  }}
                  isPublicView={publicView}
                  array={eventSessionSeason?.filter(e => e?.type === 'event')}
                />
                {renderMyTeams}
                <SessionEventTemplate
                  isPublicView={publicView}
                  array={eventSessionSeason?.filter(e => e?.type !== 'event')}
                  title={`Schedule`}
                  isViewAllButtonVisible={!publicView}
                  viewAppButtonPress={() => {
                    props.setSelectedTab(3);
                    Actions.replace('managementTab', {refreshNow: new Date()});
                  }}
                />
              </ScrollView>
            )}

            {currentTab === 'Posts' && (
              <View style={{flex: 1}} showsVerticalScrollIndicator={false}>
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

            {currentTab === 'Gallery' && <GalleryTab array={gallery} />}
          </View>
        </>
      )}
    </ScreenWrapper>
  );
};

Athlete.propTypes = {
  fromSignup: PropTypes.bool,
};
Athlete.defaultProps = {
  fromSignup: false,
};

const mapStateToProps = ({general}) => ({
  user_role: general.user_role,
  selectedIndex: general.selectedIndex,
});

const actions = {setSelectedTab};

export default connect(mapStateToProps, actions)(Athlete);
