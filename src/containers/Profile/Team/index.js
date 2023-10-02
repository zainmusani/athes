// @flow
import React, {useEffect, useRef, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {View, FlatList, ScrollView, Image, BackHandler} from 'react-native';
import styles from './styles';
import {Actions} from 'react-native-router-flux';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../../theme';
import {
  Text,
  ScreenWrapper,
  ProfileHeader,
  ButtonView,
  Post,
  TextInput,
  Button,
  TopTabbar,
  EventTemplate,
  PostAction,
} from '../../../components';
import {
  strings,
  seasons,
  enrollPeopleList,
  CreatorTabsArray,
} from '../../../constants';
import ProfileBlackSection from '../components/ProfileBlackSection';
import SessionEventTemplate from '../components/SessionEventTemplate';
import Edit from './edit';
import GalleryTab from '../components/GalleryTab';
import RBSheet from 'react-native-raw-bottom-sheet';
import PropTypes from 'prop-types';
import {
  joinTeamRequest,
  teamMembersListRequest,
} from '../../../actions/TeamActions';
import {followingRequest} from '../../../actions/UserActions';
import {
  getOwnPostsListRequest,
} from '../../../actions/PostActions';

const Team = props => {
  const {
    publicView,
    isParentAthleteManagementView,
    user_role,
    fromSignup,
    tab,
  } = props;

  const profileTabs = [
    'Profile',
    'Posts',
    'Team Members',
    'Gallery',
    // 'Schedule',
  ];

  const tabsArray = profileTabs;

  const {playerList, eventSessionSeason, user} = useSelector(
    state => state.profile?.profileDetail,
  );
  const [showEdit, setShowEdit] = useState(() => fromSignup);
  const [submitForm, setSubmitForm] = useState(() => 0);
  const [currentTab, setCurrentTab] = useState(tab ? tab : 'Profile');
  const [followButton, setFollowButton] = useState(
    user?.isFollow ? 'Unfollow' : 'Follow',
  );
  const [loading, setLoading] = useState(false);
  const [actionsOfPost, setActionsOfPost] = useState({});
  const [description, setDescription] = useState(() => '');
  const [tabs, setTabs] = useState(1);
  const [posts, setPost] = useState([]);

  const shareSheetRef = useRef(null);
  const postViewRef = useRef(null);

  const dispatch = useDispatch();

  const {postsList, gallery} = useSelector(state => state.post);
  const {
    role,
    privacy,
    image,
    name,
    id: loggedInId,
  } = useSelector(state => state.user.data);

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

  const goToProfile = item => {
    if (item.parentId == loggedInId) {
      let __item = _.cloneDeep(item);
      // __item.id = item.userId;
      Actions.profile( {
        child_data: __item,
        userId: item.id,
        isParentAthleteManagementView: true,
      });
    } else {
      Actions.profile( {
        userId: item.id,
        requested_role: item.role_id,
        publicView: loggedInId != item.id,
      });
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
        user_role={user_role}
        secondButtonText={
          privacy === 'public' && (role == 2 || role == null) && publicView
            ? 'Join'
            : ''
        }
        secondButtonOnPress={() => {
          if (!(privacy === 'public' && (role == 2 || role == null))) return;
          shareSheetRef.current.open();
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

          {Object.keys(actionsOfPost).length > 0 && (
            <PostAction actionsOfPost={actionsOfPost} />
          )}

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
                array={playerList}
                title="Player List"
                array_type="players"
                publicView={publicView}
                isViewAllButtonVisible
                viewAppButtonPress={() => setCurrentTab('Team Members')}
              />

              <SessionEventTemplate
                isPublicView={publicView}
                array={eventSessionSeason}
              />
            </ScrollView>
          )}

          {currentTab === 'Posts' && (
            <View style={{flex: 1}}>
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
                  onRefresh={() => {
                    setLoading(true);
                    dispatch(
                      getOwnPostsListRequest(
                        {
                          limit: 300,
                          offset: 0,
                          userId: user.id || user.userId,
                        },
                        res => {
                          setLoading(false);
                        },
                      ),
                    );
                  }}
                  refreshing={loading}
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

          {currentTab === 'Team Members' && (
            <View
              style={{...AppStyles.pLeft20, ...AppStyles.pRight20, flex: 1}}>
              <Text
                color={Colors.white}
                size={Fonts.size.medium}
                type={Fonts.type.bold}
                bold="700">
                Players
              </Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={playerList}
                style={{...AppStyles.mTop30}}
                renderItem={({item, index}) => {
                  return (
                    <ButtonView
                      style={styles.invitePeopleMainView}
                      onPress={() => goToProfile(item)}>
                      <View style={styles.invitePeopleView}>
                        <Image
                          source={{uri: item.image || Images.userEmptyImage}}
                          style={{height: 34, width: 34, borderRadius: 34}}
                        />
                        <Text style={styles.invitePeopleText}>
                          {item?.name}
                        </Text>
                      </View>
                    </ButtonView>
                  );
                }}
              />
            </View>
          )}

          {currentTab === 'Gallery' && <GalleryTab array={gallery} />}
        </>
      )}
      <RBSheet
        ref={shareSheetRef}
        height={Platform.OS === 'ios' ? 460 : 440}
        openDuration={250}
        closeOnPressMask={true}
        onClose={() => {}}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.2)',
          },
          container: styles.commentContainer,
        }}>
        <View style={styles.atheleteDetailArea}>
          <Text
            textAlign="center"
            size={Fonts.size.normal}
            type={Fonts.type.medium}
            bold="700"
            color={Colors.black2}>
            Team Joining
          </Text>
          <ButtonView
            style={styles.downArrowTop}
            onPress={() => {
              shareSheetRef.current?.close();
              // Actions.replace('profile',{publicView: true})
            }}>
            <Image source={Images.downArrow} style={{width: 24, height: 14}} />
          </ButtonView>
        </View>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View style={styles.postHeader}>
            <Text
              size={Fonts.size.normal}
              type={Fonts.type.medium}
              bold="700"
              color={Colors.black2}
              style={AppStyles.mBottom20}>
              Player Details
            </Text>
            <ButtonView
              style={styles.headerLeft}
              onPress={() => {
                shareSheetRef.current?.close();
                // Actions.replace('profile',{publicView: true})
              }}>
              <Image
                source={{uri: image || Images.userEmptyImage}}
                alt="jonhs"
                style={styles.profileImage}
              />
              <View style={styles.postIntro}>
                <Text
                  style={styles.posterName}
                  size={Fonts.size.semiMedium}
                  type={Fonts.type.bold}
                  bold="700"
                  color={Colors.black1}>
                  {name}
                </Text>
                <Text
                  style={styles.postTime}
                  size={Fonts.size.xxxxSmall}
                  color={Colors.grey3}>
                  Athlete
                </Text>
              </View>
            </ButtonView>
          </View>
          <Button
            hasLinear
            onPress={() => {
              dispatch(joinTeamRequest({teamId: user.id}));

              setActionsOfPost({
                name: 'Athlete Join',
                description: 'Notification sent to Team',
              });
              shareSheetRef.current?.close();
            }}
            color="#FFF"
            raised
            icon="righArrowIcon"
            iconRight
            style={{
              ...AppStyles.mLeft30,
              ...AppStyles.mRight30,
              ...AppStyles.mBottom20,
              ...AppStyles.mTop20,
            }}>
            {'Join The Team'.toUpperCase()}
          </Button>
        </View>
      </RBSheet>
    </ScreenWrapper>
  );
};

Team.propTypes = {
  fromSignup: PropTypes.bool,
};
Team.defaultProps = {
  fromSignup: false,
};

const mapStateToProps = ({general}) => ({
  user_role: general.user_role,
});

const actions = {};

export default connect(mapStateToProps, actions)(Team);
