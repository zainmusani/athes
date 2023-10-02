import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  addPostRequest,
  getWallPostsListRequest,
} from '../../../../actions/PostActions';
import {
  deleteSessionByIdRequest,
  getSessionByIdRequest,
  sessionAttendeesRequest,
} from '../../../../actions/SessionsActions';
import {followingRequest} from '../../../../actions/UserActions';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  Button,
  Loader,
  PostAction,
} from '../../../../components';
import {
  athleteCancel,
  sessionDetailList,
  strings,
  UserRoles,
} from '../../../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../../../theme';
import util from '../../../../util';
import styles from './styles';

const SessionView = props => {
  const {
    isParentAthleteView,
    user_role,
    isCreatorView,
    data,
    current_user,
    isUserEnroll,
  } = props;

  const {sessionId} = data;

  const dispatch = useDispatch();
  const details = useSelector(state => state.sessions.session);
  const {attendeesList} = useSelector(state => state.sessions);

  const {session, user} = details;
  const [loading, setLoading] = useState(false);
  const [actionsOfPost, setActionsOfPost] = useState({});
  const [userFollow, setUserFollow] = useState(user?.isFollow);

  const cancelationRBSheetRef = useRef(null);

  useEffect(() => {
    setLoading(true);

    dispatch(getSessionByIdRequest(sessionId?.toString(), res => {}));

    dispatch(
      sessionAttendeesRequest({sessionId}, (res, err) => {
        setTimeout(() => {
          setLoading(false);
        }, 100);
      }),
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActionsOfPost({});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const deleteSession = () => {
    setLoading(true);
    dispatch(
      deleteSessionByIdRequest(sessionId.toString(), (res, err) => {
        setLoading(false);
        Actions.replace('managementTab');
      }),
    );
  };

  const handleEnrollButtonPress = value => {
    dispatch(getSessionByIdRequest(sessionId?.toString(), res => {}));
    dispatch(
      sessionAttendeesRequest({sessionId}, (res, err) => {
        Actions.pop();
      }),
    );
  };

  const athleteCancelEvent =
    user_role === UserRoles.athlete ? athleteCancel.slice(0, 1) : athleteCancel;

  const sessionDetailList = [
    {
      id: 1,
      eventDetailImg: Images.eventDetailImg1,
      eventDetailName: 'Last day to register',
      eventDate: util.dateFormat(session?.lastRegistrationDate),
    },
    {
      id: 2,
      eventDetailImg: Images.eventDetailImg1,
      eventDetailName: 'Last day to Cancel',
      eventDate: util.dateFormat(session?.lastCancellationDate),
    },
    {
      id: 3,
      eventDetailImg: Images.eventDetailImg2,
      eventDetailName: 'Location',
      eventDate: session?.sessionVenue,
    },
    {
      id: 4,
      eventDetailImg: Images.eventDetailImg1,
      eventDetailName: 'Session Date & times',
      eventDate:
        util.dateFormat(session?.startDate) +
        ' - ' +
        session?.startTime +
        ' - ' +
        session?.endTime,
    },
    {
      id: 5,
      eventDetailImg: Images.eventDetailImg4,
      eventDetailName: 'Cost',
      eventDate: '$' + session?.charges,
    },
    {
      id: 6,
      eventDetailImg: Images.eventDetailImg5,
      eventDetailName: 'Number of open spots',
      eventDate: session?.seats,
    },
  ];

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
      post_text: `Session Name: ${session?.sessionTitle} \nCharges: $${
        session?.charges
      } \nSession Date: ${util.dateFormat(
        session?.startDate,
      )} \nSession Start Time: ${session?.startTime} - ${
        session?.endTime
      } \nAbout Session: ${session?.description}`,
      media_urls: [
        !_.isEmpty(session?.image)
          ? session?.image
          : 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
      ],
    };

    dispatch(
      addPostRequest(payload, res => {
        setLoading(false);
        if (res) {
          setActionsOfPost({
            icon: Images.bellActive,
            name: 'Session Shared Successfully.',
            description: 'Session has been shared in your wall.',
          });
          dispatch(getWallPostsListRequest({limit: 10, offset: 0}, res => {}));
        }
      }),
    );
  };

  const attendeesImageView = (index, marginLeft) => (
    <Image
      style={[styles.attendeesImages, {marginLeft: marginLeft}]}
      source={{
        uri: attendeesList[index].image || Images.userEmptyImage,
      }}
    />
  );

  const buttonDisabled = () => {
    if (session?.seats == 0 && !isUserEnroll) {
      return true;
    }
    if (session?.lastCancellationDate && isUserEnroll) {
      let lastDate = new Date(session?.lastCancellationDate)
        .toISOString()
        .split('T')[0];
      let currentDate = new Date().toISOString().split('T')[0];

      if (new Date(lastDate) < new Date(currentDate)) {
        return true;
      }
    }

    if (session?.lastRegistrationDate && !isUserEnroll) {
      let lastDate = new Date(session?.lastRegistrationDate)
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
      headerTitle={strings.SESSION_DETAILS}
      rightBtnImage={isCreatorView && Images.editIconBlack}
      rightBtnPress={() => {
        isCreatorView &&
          Actions.addSession({edit: true, data: session, sessionId});
      }}
      secondRightBtnImage={Images.deleteIconCircle}
      secondRightBtnPress={() => cancelationRBSheetRef.current.open()}
      secondRightBtnVisible={isCreatorView && true}>
      {!loading && (
        <>
          <FastImage
            source={{
              uri: session?.image || Images.userEmptyImage,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: '100%', height: 211, zIndex: 1}}></FastImage>
          <View style={styles.inviteMainView}>
            {session?.booked > 0 ? (
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
              <View style={styles.inviteView1}>
                <Text style={styles.inviteView1Text}>0 Attending</Text>
              </View>
            )}

            <ButtonView
              style={styles.inviteView}
              onPress={() => Actions.invitePeopleScreen({sessionId})}>
              <Text style={styles.invitetext}>
                {isCreatorView ? `Invite` : `Share`}
              </Text>
            </ButtonView>
          </View>
          {session && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={[
                styles.container,
                user_role !== 1 &&
                  user_role !== 2 && {
                    marginBottom: 0,
                  },
              ]}>
              {!isCreatorView && <View style={{height: 40}}></View>}

              {isCreatorView && (
                <View style={styles.coachMainView}>
                  <View style={{height: 50}}></View>
                  <View style={styles.coachView}>
                    <View style={AppStyles.alignItemsCenter}>
                      <Text style={styles.coachText1}>Total Seats</Text>
                      <Text style={styles.coachText2}>{session?.seats}</Text>
                    </View>

                    <View style={styles.border}></View>

                    <View style={AppStyles.alignItemsCenter}>
                      <Text style={styles.coachText1}>Booked</Text>
                      <Text style={styles.coachText2}>{session?.booked}</Text>
                    </View>

                    <View style={styles.border}></View>

                    <View style={AppStyles.alignItemsCenter}>
                      <Text style={styles.coachText1}>Earnings</Text>
                      <Text style={styles.coachText2}>{session?.earninng}</Text>
                    </View>
                  </View>
                </View>
              )}

              {Object.keys(actionsOfPost).length > 0 && (
                <View style={{marginTop: -10}}>
                  <PostAction actionsOfPost={actionsOfPost} />
                </View>
              )}

              <View style={{paddingHorizontal: 20}}>
                <View
                  style={{
                    ...AppStyles.flexRow,
                    ...AppStyles.spaceBetween,
                    ...AppStyles.alignItemsCenter,
                  }}>
                  <Text style={styles.heading}>{session?.sessionTitle}</Text>
                  {current_user.id == user?.userId && (
                    <ButtonView style={styles.inviteView} onPress={shareAsPost}>
                      <Text style={styles.invitetext}>Share</Text>
                    </ButtonView>
                  )}
                </View>

                <View style={AppStyles.mTop20}>
                  {sessionDetailList.map(item => {
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

                <TouchableOpacity
                  onPress={() => {
                    Actions.profile({
                      userId: user.userId,
                      requested_role: user.role,
                      publicView: user.id != user.userId,
                    });
                  }}
                  style={styles.organizerDetailMainView}>
                  <View style={styles.organizerDetailView}>
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
                  </View>

                  {current_user.id != user?.userId && (
                    <ButtonView
                      style={styles.followButtonView}
                      onPress={followRequest}>
                      <Text style={styles.followButtonText}>
                        {userFollow == 1 ? 'Unfollow' : 'Follow'}
                      </Text>
                    </ButtonView>
                  )}
                </TouchableOpacity>

                <View style={[AppStyles.mTop20, AppStyles.mBottom30]}>
                  <Text style={styles.aboutText}>About Session</Text>
                  <Text style={styles.aboutDescription}>
                    {session?.description}
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
                          id: sessionId,
                          isSessionView: true,
                          data: session,
                        })
                      : Actions.athleteEnroll({
                          isSessionView: true,
                          handleEnrollButtonPress,
                          id: sessionId,
                          data: session,
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
              <Text style={styles.deleteEventHeading}>Delete Session</Text>

              <Text style={styles.RBSheetHeading}>{session?.sessionTitle}</Text>
              <Text style={styles.RBSheetDate}>
                Session Date: {util.formatDate(session?.startDate)}
              </Text>

              <Button
                hasLinear
                color="#FFF"
                icon="righArrowIcon"
                iconRight
                onPress={deleteSession}
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

const mapStateToProps = ({user}) => ({
  user_role: user?.data.role,
  current_user: user?.data,
});

const actions = {};

export default connect(mapStateToProps, actions)(SessionView);
