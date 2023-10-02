import _ from 'lodash';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  addPostRequest,
  getSeasonPostsRequest,
  getWallPostsListRequest,
} from '../../../../actions/PostActions';
import {
  deleteSeasonByIdRequest,
  getSeasonByIdRequest,
  seasonAttendeesRequest,
} from '../../../../actions/SeasonsActions';
import {followingRequest} from '../../../../actions/UserActions';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  Button,
  Loader,
  Post,
  PostAction,
} from '../../../../components';
import {athleteCancel, strings, UserRoles} from '../../../../constants';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../../../theme';
import util from '../../../../util';
import styles from './styles';

const SeasonView = props => {
  const {
    isParentAthleteView,
    user_role,
    isCreatorView,
    data,
    current_user,
    isUserEnroll,
    calendarList,
  } = props;

  const {seasonId} = data;
  const [loading, setLoading] = useState(false);
  const [actionsOfPost, setActionsOfPost] = useState({});
  const [uploadingMsg, setUploadingMsg] = useState({
    icon: Images.bellActive,
    name: 'Uploading Post...',
    description: 'your post will be uploading in a while please wait.',
  });
  const dispatch = useDispatch();
  const {seasonPosts, addingPost} = useSelector(state => state.post);
  const details = useSelector(state => state.seasons.season);

  const {season, user} = details;

  const [tabs, setTabs] = useState('details');
  const {attendeesList} = useSelector(state => state.seasons);
  const [userFollow, setUserFollow] = useState(user?.isFollow);

  const cancelationRBSheetRef = useRef(null);
  const postViewRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActionsOfPost({});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadSeasonData();
  }, []);

  const loadSeasonData = () => {
    setLoading(true);
    dispatch(getSeasonByIdRequest(seasonId?.toString(), res => {}));
    dispatch(
      getSeasonPostsRequest(
        {limit: 300, offset: 0, seasonId: seasonId},
        res => {
          setTimeout(() => {
            setLoading(false);
          }, 300);
        },
      ),
    );

    dispatch(seasonAttendeesRequest({seasonId}, (res, err) => {}));
  };

  const handleActionsOfPost = item => {
    setActionsOfPost(item);
    dispatch(
      getSeasonPostsRequest(
        {limit: 300, offset: 0, seasonId: seasonId},
        res => {
          setLoading(false);
        },
      ),
    );
  };

  const deleteSeason = () => {
    setLoading(true);
    dispatch(
      deleteSeasonByIdRequest(seasonId.toString(), (res, err) => {
        setLoading(false);
        Actions.replace('managementTab');
      }),
    );
  };

  const handleEnrollButtonPress = value => {
    dispatch(getSeasonByIdRequest(seasonId?.toString(), res => {}));
    dispatch(
      seasonAttendeesRequest({seasonId}, (res, err) => {
        Actions.pop();
      }),
    );
  };

  const athleteCancelEvent =
    user_role === UserRoles.athlete ? athleteCancel.slice(0, 1) : athleteCancel;

  const seasonDetailList = [
    {
      id: 1,
      eventDetailImg: Images.eventDetailImg1,
      eventDetailName: 'Last day to register',
      eventDate: util.dateFormat(season?.lastRegistrationDate),
    },
    {
      id: 2,
      eventDetailImg: Images.eventDetailImg1,
      eventDetailName: 'Last day to Cancel',
      eventDate: util.dateFormat(season?.lastCancellationDate),
    },
    {
      id: 3,
      eventDetailImg: Images.eventDetailImg2,
      eventDetailName: 'Location',
      eventDate: season?.seasonVenue,
    },
    {
      id: 4,
      eventDetailImg: Images.eventDetailImg1,
      eventDetailName: 'Season Date',
      eventDate: `${util.dateFormat(season?.startDate)} To ${util.dateFormat(
        season?.endDate,
      )}`,
    },
    {
      id: 5,
      eventDetailImg: Images.eventDetailImg4,
      eventDetailName: 'Cost',
      eventDate: '$' + season?.charges,
    },
    {
      id: 6,
      eventDetailImg: Images.eventDetailImg5,
      eventDetailName: 'Number of open spots',
      eventDate: season?.seats,
    },
  ];

  const attendeesImageView = (index, marginLeft) => (
    <Image
      style={[styles.attendeesImages, {marginLeft: marginLeft}]}
      source={{
        uri: attendeesList[index].image || Images.userEmptyImage,
      }}
    />
  );

  const followRequest = () => {
    let payload = {
      following_id: user?.userId,
      follow: userFollow == 0 ? 1 : 0,
      ...user,
    };

    dispatch(
      followingRequest(payload, res => {
        userFollow == 0 ? setUserFollow(1) : setUserFollow(0);
        setLoading(false);
      }),
    );
  };

  const shareAsPost = () => {
    setLoading(true);
    const payload = {
      post_text: `Season Name: ${season?.seasonTitle} \nCharges: $${
        season?.charges
      } \nSeason Date: ${util.dateFormat(
        season?.startDate,
      )} To ${util.dateFormat(season?.endDate)}  \nAbout Event: ${
        season?.description
      }`,
      media_urls: [
        !_.isEmpty(season?.image)
          ? season?.image
          : 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
      ],
    };

    dispatch(
      addPostRequest(payload, res => {
        setLoading(false);
        if (res) {
          setActionsOfPost({
            icon: Images.bellActive,
            name: 'Season Shared Successfully.',
            description: 'Season has been shared in your wall.',
          });
          dispatch(getWallPostsListRequest({limit: 10, offset: 0}, res => {}));
        }
      }),
    );
  };

  const uploadingPostMsg = useMemo(() => {
    if (Object.keys(addingPost).length > 0) {
      return <PostAction actionsOfPost={uploadingMsg} />;
    } else {
      return false;
    }
  }, [addingPost]);

  const buttonDisabled = () => {
    if (season?.seats == 0 && !isUserEnroll) {
      return true;
    }

    if (season?.lastCancellationDate && isUserEnroll) {
      let lastDate = new Date(season?.lastCancellationDate)
        .toISOString()
        .split('T')[0];
      let currentDate = new Date().toISOString().split('T')[0];

      if (new Date(lastDate) < new Date(currentDate)) {
        return true;
      }
    }

    if (season?.lastRegistrationDate && !isUserEnroll) {
      let lastDate = new Date(season?.lastRegistrationDate)
        .toISOString()
        .split('T')[0];
      let currentDate = new Date().toISOString().split('T')[0];

      if (new Date(lastDate) < new Date(currentDate)) {
        return true;
      }
    }

    return false;
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.SEASON_DETAILS}
      rightBtnImage={isCreatorView && Images.editIconBlack}
      rightBtnPress={() => {
        isCreatorView &&
          Actions.addSeason({edit: true, data: season, seasonId});
      }}
      secondRightBtnImage={Images.deleteIconCircle}
      secondRightBtnPress={() => cancelationRBSheetRef.current.open()}
      secondRightBtnVisible={isCreatorView && true}>
      {!loading && (
        <>
          <FastImage
            source={{
              uri: season?.image || Images.userEmptyImage,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{
              width: '100%',
              height: 211,
              zIndex: 1,
            }}></FastImage>

          <View style={styles.inviteMainView}>
            {season?.booked > 0 ? (
              <ButtonView
                style={styles.inviteView1}
                onPress={() =>
                  Actions.enrollPeopleList({
                    title: `+${attendeesList?.length} Attending`,
                    attendeesList,
                  })
                }>
                {attendeesList[0] && attendeesImageView(0, 0)}
                {attendeesList[1] && attendeesImageView(1, -10)}
                {attendeesList[2] && attendeesImageView(2, -10)}
                <Text style={styles.inviteView1Text}>
                  +{attendeesList?.length} Attending
                </Text>
              </ButtonView>
            ) : (
              <View>
                <Text style={styles.inviteView1Text}>0 Attending</Text>
              </View>
            )}
            <ButtonView
              style={styles.inviteView}
              onPress={() => Actions.invitePeopleScreen({seasonId})}>
              <Text style={styles.invitetext}>
                {isCreatorView ? `Invite` : `Share`}
              </Text>
            </ButtonView>
          </View>

          {tabs === 'details' && (
            <>
              {!isCreatorView && <View style={{height: 40}}></View>}

              {isCreatorView && (
                <View style={styles.coachMainView}>
                  <View style={{height: 50}}></View>
                  <View style={styles.coachView}>
                    <View style={AppStyles.alignItemsCenter}>
                      <Text style={styles.coachText1}>Total Seats</Text>
                      <Text style={styles.coachText2}>{season?.seats}</Text>
                    </View>

                    <View style={styles.border}></View>

                    <View style={AppStyles.alignItemsCenter}>
                      <Text style={styles.coachText1}>Booked</Text>
                      <Text style={styles.coachText2}>{season?.booked}</Text>
                    </View>

                    <View style={styles.border}></View>

                    <View style={AppStyles.alignItemsCenter}>
                      <Text style={styles.coachText1}>Earnings</Text>
                      <Text style={styles.coachText2}>{season?.earninng}</Text>
                    </View>
                  </View>
                </View>
              )}
            </>
          )}
          {/* Tabs for Post and Details of seasons */}
          {(isUserEnroll || isCreatorView) && (
            <>
              {tabs !== 'details' && <View style={{height: 50}}></View>}

              <View style={styles.tabMainView}>
                <ButtonView
                  style={
                    tabs === 'posts' ? styles.tabViewSelected : styles.tabView
                  }
                  onPress={() => setTabs('posts')}>
                  <Text
                    style={
                      tabs === 'posts' ? styles.tabTextSelected : styles.tabText
                    }>
                    Discussions
                  </Text>
                </ButtonView>
                <ButtonView
                  style={
                    tabs === 'details' ? styles.tabViewSelected : styles.tabView
                  }
                  onPress={() => setTabs('details')}>
                  <Text
                    style={
                      tabs === 'details'
                        ? styles.tabTextSelected
                        : styles.tabText
                    }>
                    Details
                  </Text>
                </ButtonView>
              </View>
            </>
          )}
          {Object.keys(actionsOfPost).length > 0 && (
            <View style={{marginTop: -10}}>
              <PostAction actionsOfPost={actionsOfPost} />
            </View>
          )}
          {tabs === 'details' && season ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={[
                styles.container,
                user_role !== 1 &&
                  user_role !== 2 && {
                    marginBottom: 0,
                  },
              ]}>
              <View style={{paddingHorizontal: 20}}>
                <View
                  style={{
                    ...AppStyles.flexRow,
                    ...AppStyles.spaceBetween,
                    ...AppStyles.alignItemsCenter,
                  }}>
                  <Text style={styles.heading}>{season?.seasonTitle}</Text>
                  {current_user.id == user?.userId && (
                    <ButtonView style={styles.inviteView} onPress={shareAsPost}>
                      <Text style={styles.invitetext}>Share</Text>
                    </ButtonView>
                  )}
                </View>

                <View style={AppStyles.mTop20}>
                  {seasonDetailList.map(item => {
                    return (
                      <View style={[AppStyles.mTop10, AppStyles.mBottom10]}>
                        <View style={styles.eventDetailView}>
                          <Image source={item.eventDetailImg} />

                          <View style={styles.DetailView}>
                            <Text style={styles.DetailText1}>
                              {item.eventDetailName}
                            </Text>
                            <Text style={styles.DetailText2}>
                              {item.eventDate}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>

                <View style={styles.organizerDetailMainView}>
                  <TouchableOpacity
                    onPress={() => {
                      Actions.profile({
                        userId: user.userId,
                        requested_role: user.role,
                        publicView: user.id != user.userId,
                      });
                    }}
                    style={styles.organizerDetailView}>
                    <Image
                      style={{width: 45, height: 45, borderRadius: 7}}
                      source={{
                        uri: !_.isEmpty(user?.image)
                          ? user?.image
                          : 'https://athes.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png',
                      }}
                    />

                    <View style={styles.DetailView}>
                      <Text style={styles.organizerTextName}>{user?.name}</Text>
                      <Text style={styles.organizerText}>
                        {util.getRoleNameByID(user.role)}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  {current_user.id != user?.userId && (
                    <ButtonView
                      style={styles.followButtonView}
                      onPress={followRequest}>
                      <Text style={styles.followButtonText}>
                        {userFollow == 1 ? 'Unfollow' : 'Follow'}
                      </Text>
                    </ButtonView>
                  )}
                </View>

                <View style={[AppStyles.mTop20, AppStyles.mBottom30]}>
                  <Text style={styles.aboutText}>About Season</Text>
                  <Text style={styles.aboutDescription}>
                    {season?.description}
                  </Text>
                </View>
              </View>
              {!isParentAthleteView && (user_role === 1 || user_role === 2) && (
                <Button
                  background={Colors.white}
                  icon="righArrowIcon"
                  disabled={buttonDisabled()}
                  iconRight
                  onPress={() =>
                    isUserEnroll
                      ? Actions.athleteCancel({
                          array: athleteCancelEvent,
                          id: seasonId,
                          isSeasonView: true,
                          data: season,
                        })
                      : Actions.athleteEnroll({
                          isSeasonView: true,
                          id: seasonId,
                          handleEnrollButtonPress,
                          data: season,
                        })
                  }
                  raised
                  style={{
                    ...AppStyles.mLeft30,
                    ...AppStyles.mRight30,
                    ...AppStyles.mBottom20,
                  }}>
                  {isUserEnroll
                    ? strings.CANCEL.toUpperCase()
                    : strings.ENROLL.toUpperCase()}
                </Button>
              )}
            </ScrollView>
          ) : (
            <>
              <View style={{...AppStyles.paddingHorizontalBase}}>
                {Object.keys(addingPost).length == 0 && (
                  <ButtonView
                    style={styles.writeArea}
                    onPress={() => {
                      Actions.write_post({seasonId: seasonId});
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

              {seasonPosts.length > 0 && (
                <View
                  style={{alignItems: 'center', flex: 1}}
                  // onTouchEnd={() => postViewRef.current?.hide()}
                >
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{
                      width: Metrics.screenWidth,
                    }}
                    onScroll={() => {
                      postViewRef.current?.hide();
                    }}
                    onRefresh={() => {
                      setLoading(true);
                      loadSeasonData();
                    }}
                    refreshing={loading}
                    data={seasonPosts}
                    renderItem={({item, index}) => (
                      <Post
                        ref={postViewRef}
                        key={index}
                        handleActionsOfPost={handleActionsOfPost}
                        data={item}
                        isProfileView={item.user.id == current_user.id}
                      />
                    )}
                  />
                </View>
              )}
            </>
          )}

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
              <Text style={styles.deleteEventHeading}>Delete Season</Text>

              <Text style={styles.RBSheetHeading}>{season?.seasonTitle}</Text>
              <Text style={styles.RBSheetDate}>
                Season Date: {util.formatDate(season?.startDate)}
              </Text>

              <Button
                hasLinear
                color="#FFF"
                icon="righArrowIcon"
                iconRight
                onPress={deleteSeason}
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
        </>
      )}
      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

const mapStateToProps = ({user, calendar}) => ({
  user_role: user?.data.role,
  current_user: user?.data,
  calendarList: calendar.calendarList,
});

const actions = {};

export default connect(mapStateToProps, actions)(SeasonView);
