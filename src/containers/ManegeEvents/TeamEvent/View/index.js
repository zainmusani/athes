import _ from 'lodash';
import React, {useEffect, useMemo, useRef, useState} from 'react';
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
import {getCalendarListRequest} from '../../../../actions/CalendarActions';
import {
  deleteEventByIdRequest,
  enrollEventGetRequest,
  eventAttendeesRequest,
  getEventByIdRequest,
} from '../../../../actions/EventsActions';
import {
  addPostRequest,
  getWallPostsListRequest,
} from '../../../../actions/PostActions';
import {
  deleteTeamEventByIdRequest,
  enrollTeamEventRequest,
  getTeamEventByIdRequest,
} from '../../../../actions/TeamActions';
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
  eventDetailList,
  strings,
  UserRoles,
} from '../../../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../../../theme';
import util from '../../../../util';
import styles from './styles';

const TeamEventView = props => {
  const {
    isAddedTeamEventForm,
    idForEnrollment,
    isCreatorView,
    data,
    current_user,
  } = props;
  const {teamEventId} = data;
  
  const dispatch = useDispatch();
  const details = useSelector(state => state.team.teamEvent);
  const loggedInUser = useSelector(state => state.user.data);
  
  const {event, user} = details;

  const [loading, setLoading] = useState(false);
  const [actionsOfPost, setActionsOfPost] = useState({});

  const [userFollow, setUserFollow] = useState(user?.isFollow);

  const cancelationRBSheetRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    getTeamData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActionsOfPost({});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const getTeamData = () => {
    let payload = {
      eventId: teamEventId?.toString(),
      idForEnrollment: idForEnrollment || loggedInUser.id,
    };
    dispatch(
      getTeamEventByIdRequest(payload, res => {
        setLoading(false);
      }),
    );
  };

  const deleteEvent = () => {
    cancelationRBSheetRef.current.close();
    setLoading(true)
    dispatch(
      deleteTeamEventByIdRequest(teamEventId.toString(), res => {
        setLoading(false);
        Actions.push('calendar', {refreshNow: new Date()});
      }),
    );
  };

  const eventDetailList = [
    {
      id: 1,
      eventDetailImg: Images.eventDetailImg2,
      eventDetailName: 'Location',
      eventDate: event?.eventVenue,
    },
    {
      id: 2,
      eventDetailImg: Images.eventDetailImg1,
      eventDetailName: 'Event Date & times',
      eventDate: util.dateFormat(event?.startDate) + ' - ' + event?.startTime,
    },
    {
      id: 5,
      eventDetailImg: Images.eventDetailImg4,
      eventDetailName: 'Cost',
      eventDate: '$' + event?.charges || 0,
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

  const confirmHandler = value => {
    setLoading(true);
    let payload = {
      eventId: teamEventId,
      ids: [idForEnrollment || loggedInUser.id],
      status: value,
    };
    dispatch(
      enrollTeamEventRequest(payload, res => {
        getTeamData();
      }),
    );
  };

  const renderFollowArea = useMemo(
    () => (
      <ButtonView style={styles.followButtonView} onPress={followRequest}>
        <Text style={styles.followButtonText}>
          {userFollow == 1 ? 'Unfollow' : 'Follow'}
        </Text>
      </ButtonView>
    ),
    [userFollow],
  );

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      leftBtnImage={Images.back_btn}
      leftBtnPress={() =>
        isAddedTeamEventForm ? Actions.reset('athes_tab') : Actions.pop()
      }
      headerTitle={strings.TEAM_EVENT_DETAILS}
      rightBtnImage={ loggedInUser.role && isCreatorView && !event?.isPassed && Images.editIconBlack}
      rightBtnPress={() => {loggedInUser.role && isCreatorView &&!event?.isPassed &&Actions.addTeamEvent({edit: true, data: event, eventId: teamEventId})}}
      secondRightBtnImage={!event?.isPassed && Images.deleteIconCircle}
      secondRightBtnPress={() =>
        !event?.isPassed && cancelationRBSheetRef.current.open()
      }
      secondRightBtnVisible={loggedInUser.role && isCreatorView && true}>
      {!loading && (
        <>
          <FastImage
            source={{
              uri: !_.isEmpty(event?.image)
                ? event?.image
                : 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',

              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            style={{width: '100%', height: 211, zIndex: 1}}></FastImage>

          {event && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={[styles.container]}>
              {/* {!isCreatorView && <View style={{height: 40}}></View>} */}

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
                  <Text style={styles.heading}>{event?.eventTitle}</Text>

                  {current_user.id == user?.userId && !event?.isPassed && (
                    <ButtonView
                      style={styles.inviteView}
                      onPress={() =>
                        Actions.invitePeopleScreen({
                          detailData: event,
                          teamEventId,
                          creatorId: user?.userId,
                        })
                      }>
                      <Text style={styles.invitetext}>Invite</Text>
                    </ButtonView>
                  )}
                </View>

                <View style={AppStyles.mTop20}>
                  {eventDetailList.map(item => {
                    return (
                      <View
                        style={[AppStyles.mTop10, AppStyles.mBottom10]}
                        key={item.id}>
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
                      publicView: current_user.id != user.userId,
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

                  {current_user.id != user?.userId && renderFollowArea}
                </TouchableOpacity>

                <View style={[AppStyles.mTop20, AppStyles.mBottom30]}>
                  <Text style={styles.aboutText}>About Event</Text>
                  <Text style={styles.aboutDescription}>
                    {event?.description}
                  </Text>
                </View>
                {event?.isEnrolled == 0 &&
                  event?.isRejected == 0 &&
                  !isCreatorView &&
                  loggedInUser.role && (
                    <View
                      style={{
                        flex: 1,
                        width: '100%',
                        ...AppStyles.flexRow,
                        ...AppStyles.mBottom35,
                      }}>
                      <ButtonView
                        style={{
                          flex: 0.9,

                          backgroundColor: Colors.white,
                          marginRight: 10,
                          borderRadius: 20,
                          ...AppStyles.centerInner,
                        }}
                        onPress={() => confirmHandler(0)}>
                        <Text>Cancel</Text>
                      </ButtonView>
                      <Button
                        hasLinear
                        color={Colors.white}
                        onPress={() => confirmHandler(1)}
                        raised
                        style={{flex: 1, marginLeft: 10}}>
                        Accept
                      </Button>
                    </View>
                  )}
              </View>
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
              <Text style={styles.deleteEventHeading}>Delete Event</Text>

              <Text style={styles.RBSheetHeading}>{event?.eventTitle}</Text>
              <Text style={styles.RBSheetDate}>
                Event Date: {util.formatDate(event?.startDate)}
              </Text>

              <Button
                hasLinear
                color="#FFF"
                icon="righArrowIcon"
                iconRight
                onPress={deleteEvent}
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

export default connect(mapStateToProps, actions)(TeamEventView);
