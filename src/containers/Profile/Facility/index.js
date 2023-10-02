// @flow
import React, {useEffect, useRef, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  View,
  FlatList,
  ScrollView,
  Image,
  BackHandler,
  RefreshControl,
} from 'react-native';
import styles from './styles';
import {Actions} from 'react-native-router-flux';
import {AppStyles, Colors, Fonts, Metrics} from '../../../theme';
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
import PropTypes from 'prop-types';
import ProfileBlackSection from '../components/ProfileBlackSection';
import SessionEventTemplate from '../components/SessionEventTemplate';
import Edit from './edit';
import GalleryTab from '../components/GalleryTab';
import {getOwnFacilitiesRequest} from '../../../actions/Facility';
import {followingRequest} from '../../../actions/UserActions';
import {getOwnPostsListRequest} from '../../../actions/PostActions';

const Facility = props => {
  const {publicView, fromSignup, user_role, tab} = props;

  const profileTabs = ['Profile', 'Posts', 'Facilities', 'Gallery'];

  const {facilityList, user, bookedFacility} = useSelector(
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
  const {ownFacilitiesList} = useSelector(state => state.facility);
  const [posts, setPost] = useState([]);
  const postViewRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getOWnFacilities();
  }, [currentTab]);

  useEffect(() => {
    setPost(postsList);
  }, [postsList]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActionsOfPost({});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getOWnFacilities = () => {
    if (currentTab === 'Facilities') {
      dispatch(
        getOwnFacilitiesRequest(
          {limit: 300, offset: 0, userId: user.id},
          (res, err) => {
            setLoading(true);
            if (res) setLoading(false);
          },
        ),
      );
    }
  };

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
                  array={facilityList}
                  title="Facility List"
                  array_type="facility"
                  publicView={publicView}
                  isViewAllButtonVisible
                  viewAppButtonPress={() => setCurrentTab('Facilities')}
                />

                <SessionEventTemplate
                  array={bookedFacility}
                  title={`Schedule`}
                  isViewAllButtonVisible
                  viewAppButtonPress={() => setCurrentTab('Facilities')}
                  isPublicView={publicView}
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

            {currentTab === 'Facilities' && (
              <FlatList
                showsVerticalScrollIndicator={false}
                data={ownFacilitiesList}
                refreshControl={
                  <RefreshControl
                    refreshing={loading && !ownFacilitiesList?.length}
                    onRefresh={() => {
                      setLoading(true);
                      getOWnFacilities();
                    }}
                    tintColor={Colors.white}
                  />
                }
                style={{flex: 1}}
                renderItem={({item}) => {
                  return (
                    <EventTemplate
                      item={item}
                      onPress={() =>
                        Actions.facilityDetail({
                          facilityId: item.id,
                          isPublicView: publicView,
                        })
                      }
                    />
                  );
                }}
              />
            )}

            {currentTab === 'Gallery' && <GalleryTab array={gallery} />}
          </View>
        </>
      )}
    </ScreenWrapper>
  );
};

Facility.propTypes = {
  fromSignup: PropTypes.bool,
};
Facility.defaultProps = {
  fromSignup: false,
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(Facility);
