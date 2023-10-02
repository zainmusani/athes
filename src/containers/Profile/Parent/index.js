// @flow
import React, {useEffect, useRef, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
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
import {strings, seasons} from '../../../constants';
import PropTypes from 'prop-types';
import ProfileBlackSection from '../components/ProfileBlackSection';
import SessionEventTemplate from '../components/SessionEventTemplate';
import Edit from './edit';
import GalleryTab from '../components/GalleryTab';
import {followingRequest} from '../../../actions/UserActions';
import {
  getOwnPostsListRequest,
} from '../../../actions/PostActions';
import {setSelectedTab} from '../../../actions/GeneralActions';

const Parent = props => {
  const {
    publicView,
    isParentAthleteManagementView,
    user_role,
    fromSignup,
    tab,
  } = props;

  const profileTabs = ['Profile', 'Posts', 'Gallery'];
  const dispatch = useDispatch(null);
  const {childs, eventSessionSeason, user} = useSelector(
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
        user_role={user_role}
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
        isParentAthleteManagementView={
          isParentAthleteManagementView ? true : false
        }
      />

      {showEdit ? (
        <Edit submitForm={submitForm} setSubmitForm={setSubmitForm} />
      ) : (
        <>
          <View style={styles.profileTabs}>
            <FlatList
              horizontal
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
                <GalleryTab
                  homeLayout
                  array={gallery}
                  title="Gallery"
                  viewAllOnPress={() => setCurrentTab('Gallery')}
                />

                <ProfileBlackSection
                  array={childs}
                  array_type="child"
                  parent_id={user?.id}
                  publicView={publicView}
                  title="Child List"
                  isViewAllButtonVisible={!publicView}
                  viewAppButtonPress={() => {
                    props.setSelectedTab(3);
                    Actions.replace('managementTab', {refreshNow: new Date()});
                  }}
                />

                {!!eventSessionSeason?.length && (
                  <Text
                    style={{
                      color: Colors.white,
                      fontSize: 18,
                      fontFamily: Fonts.type.base,
                      ...AppStyles.pLeft20,
                      ...AppStyles.mTop15,
                      marginBottom: -10,
                    }}>
                    Schedule
                  </Text>
                )}

                <SessionEventTemplate
                  isPublicView={publicView}
                  array={eventSessionSeason}
                />
              </ScrollView>
            )}

            {currentTab === 'Posts' && (
              <View style={{flex: 1}}>
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

Parent.propTypes = {
  fromSignup: PropTypes.bool,
};
Parent.defaultProps = {
  fromSignup: false,
};

const mapStateToProps = ({general}) => ({
  selectedIndex: general.selectedIndex,
});

const actions = {setSelectedTab};

export default connect(mapStateToProps, actions)(Parent);
