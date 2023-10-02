// @flow
import React, {useEffect, useMemo, useRef, useState} from 'react';
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
  Button,
  PaymentSheet,
  SelectBox,
  PostAction,
  ModalView,
} from '../../../components';
import {strings} from '../../../constants';
import ProfileBlackSection from '../components/ProfileBlackSection';
import SessionEventTemplate from '../components/SessionEventTemplate';
import ProfileEventTemplate from '../components/EventTemplate';
import Edit from './edit';
import GalleryTab from '../components/GalleryTab';
import {Calendar} from 'react-native-calendars';
import util from '../../../util';
import PropTypes from 'prop-types';
import {getOwnSessionsRequest} from '../../../actions/SessionsActions';
import {getOwnSeasonsRequest} from '../../../actions/SeasonsActions';
import {getOwnEventsRequest} from '../../../actions/EventsActions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  deleteMeetingRequest,
  getMeetingRequest,
  getMeetingsListRequest,
} from '../../../actions/MeetingsActions';
import {followingRequest} from '../../../actions/UserActions';
import {
  getOwnPostsListRequest,
} from '../../../actions/PostActions';
import {setSelectedTab} from '../../../actions/GeneralActions';

const Coach = props => {
  const {publicView, user_role, fromSignup, idForGetUserDetail, tab} = props;
  console.log({publicView});

  const profileTabs = [
    'Profile',
    'Posts',
    'Calendar',
    'Event',
    'Season',
    'Session',
    'Gallery',
  ];

  const {user, eventSessionSeason, bookedDates} = useSelector(
    state => state.profile?.profileDetail,
  );
  const [showEdit, setShowEdit] = useState(fromSignup);
  const [submitForm, setSubmitForm] = useState(0);
  const [currentTab, setCurrentTab] = useState(tab ? tab : 'Profile');
  const [followButton, setFollowButton] = useState(
    user?.isFollow ? 'Unfollow' : 'Follow',
  );
  const [actionsOfPost, setActionsOfPost] = useState({});
  const [loading, setLoading] = useState(false);
  const [isListViewVisible, setIsListViewVisible] = useState(false);
  const [slotId, setSlotId] = useState(null);
  const [currentDate, setCurrentDate] = useState(
    new Date().toJSON().slice(0, 10),
  );
  const [selected, setSelected] = useState(currentDate);
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [timeOptions, setTimeOptions] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [calenderDates, setCalenderDates] = useState({});
  const [slots, setSlots] = useState([]);
  const [charges, setCharges] = useState(null);
  const [errors, setErrors] = useState({
    time: null,
  });

  const timeRef = useRef(null);
  const tabbarRef = useRef(null);

  const {postsList, gallery} = useSelector(state => state.post);
  const [posts, setPost] = useState([]);
  const postViewRef = useRef(null);

  const dispatch = useDispatch(null);
  const {seasonList} = useSelector(state => state.seasons);
  const {sessionList} = useSelector(state => state.sessions);
  const {eventList} = useSelector(state => state.events);
  const {meetingsList} = useSelector(state => state.meetings);

  useEffect(() => {
    setPost(postsList);
  }, [postsList]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActionsOfPost({});
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   if (markedDates[selected]) {
  //     markedDates[selected].selected = true;
  //   }
  // }, [selected]);

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

  useEffect(() => {
    let obj = {};
    for (let index = 0; index < meetingsList.length; index++) {
      const {date, slots, charges} = meetingsList[index];
      obj[date] = {
        selected: true,
        charges: charges,
        marked: true,
        disabled: false,
        time: slots.map(obj => obj.time),
        slots,
      };
    }
    setCalenderDates(obj);
  }, [meetingsList]);

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
        getOwnSessionsRequest({limit: 300, offset: 0, userId: user?.id}, res => {
          setIsListViewVisible(true);
          setLoading(false);
        }),
      );
    }
    if (currentTab === 'Season') {
      dispatch(
        getOwnSeasonsRequest({limit: 300, offset: 0, userId: user?.id}, res => {
          setIsListViewVisible(true);
          setLoading(false);
        }),
      );
    }
    if (currentTab === 'Event') {
      dispatch(
        getOwnEventsRequest({limit: 300, offset: 0, userId: user?.id}, res => {
          setIsListViewVisible(true);
          setLoading(false);
        }),
      );
    }
    if (currentTab === 'Calendar') {
      dispatch(
        getMeetingsListRequest(
          {limit: 300, offset: 0, userId: user?.id},
          (res, err) => {
            setLoading(false);
          },
        ),
      );
    }
  };

  const handleActionsOfPost = item => {
    setActionsOfPost(item);
  };

  const dayPressed = day => {
    setTimeOptions([]);
    setSelectedTime(null);
    setSelected(day.dateString);
    let times = [];
    calenderDates[day.dateString].slots.forEach(res => times.push(res.time));

    setTimeOptions(times);
    setSlots(calenderDates[day.dateString].slots);

    setCharges(calenderDates[day.dateString].charges);
  };

  const handleEnrollButtonPress = value => {
    setTimeOptions([]);
    setSelectedTime(null);
    dispatch(
      getMeetingsListRequest(
        {limit: 300, offset: 0, userId: user?.id},
        (res, err) => {
          setLoading(false);
        },
      ),
    );
    Actions.refresh();
  };

  const validateForm = () => {
    const errors = {};
    if (_.isEmpty(selectedTime)) {
      errors.time = util.isRequiredErrorMessage('Time');
    }
    if (!_.isEmpty(errors)) {
      setErrors(errors);
      return false;
    }
    return true;
  };

  const modalButtonPress = () => {
    dispatch(
      deleteMeetingRequest(slotId.toString(), (res, err) => {
        dispatch(
          getMeetingsListRequest({limit: 300, offset: 0}, (res, err) => {
            setModalVisible(false);
          }),
        );
      }),
    );
  };

  const renderTimeOptions = useMemo(
    () => (
      <View style={{...AppStyles.pLeft25, ...AppStyles.pRight25}}>
        <ButtonView
          onPress={() => {
            setTimeOptions([]);
          }}
          style={{
            marginLeft: -10,
            height: 30,
            width: 60,
            ...AppStyles.flexRow,
            ...AppStyles.centerInner,
          }}>
          <Image
            source={Images.back_btn}
            style={{
              tintColor: Colors.white,
              width: 10,
              height: 10,
              marginRight: 5,
            }}
          />
          <Text
            color={Colors.white}
            size={Fonts.size.xSmall}
            type={Fonts.type.medium}
            bold={'500'}>
            Back
          </Text>
        </ButtonView>
        <SelectBox
          array={timeOptions}
          time
          value={util.convertTimeInto12(selectedTime)}
          setData={setSelectedTime}
          label="Select Time"
          icon={Images.downIconBlack}
          isRightIcon
          ref={timeRef}
          error={errors?.time}
        />

        {charges && (
          <Text
            color={Colors.white}
            type={Fonts.type.medium}
            bold={'500'}
            textAlign="right"
            size={Fonts.size.large}
            style={{
              ...AppStyles.mTop20,
              ...AppStyles.mBottom20,
            }}>
            {`Charges: $${charges}`}{' '}
          </Text>
        )}
      </View>
    ),
    [timeOptions, selectedTime, calenderDates],
  );

  const renderCalendar = useMemo(
    () => (
      <Calendar
        markedDates={calenderDates}
        onDayPress={dayPressed}
        monthFormat={'MMM yyyy'}
        onMonthChange={month => {}}
        disabledByDefault
        disableAllTouchEventsForDisabledDays={true}
        enableSwipeMonths={true}
        singleSelectMode
        theme={{
          backgroundColor: Colors.black,
          calendarBackground: Colors.black,
          selectedDayBackgroundColor: Colors.white,
          selectedDayTextColor: Colors.black,
          todayBackgroundColor: Colors.white,
          todayDotColor: 'transparent',
          dayTextColor: Colors.white,
          textDisabledColor: Colors.gray8,
          dotColor: 'transparent',
          arrowColor: Colors.white,
          disabledArrowColor: Colors.gray8,
          textDisabledColor: Colors.grey3,
          monthTextColor: Colors.white,
          textDayFontFamily: Fonts.type.medium,
          textMonthFontFamily: Fonts.type.medium,
          textDayHeaderFontFamily: Fonts.type.medium,
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 13,
          textDayHeaderFontSize: 20,
          'stylesheet.calendar.header': {
            header: {
              paddingTop: 10,
              paddingBottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
            dayHeader: {
              textTransform: 'uppercase',
              color: Colors.white,
              paddingTop: 10,
              paddingBottom: 20,
              fontSize: Fonts.size.xxxxSmall,
            },
          },
        }}
      />
    ),
    [selected, calenderDates],
  );

  const teamViewAllButtonPress = () => {
    setCurrentTab('Calendar');

    let scrollTo = 0;
    profileTabs.forEach((res, idx) => {
      if (res === 'Calendar') {
        scrollTo = idx;
      }
    });

    tabbarRef.current.scrollToIndex({animated: true, index: scrollTo});
  };

  const EventsViewAllButtonPress = () => {
    setCurrentTab('Event');

    let scrollTo = 0;
    profileTabs.forEach((res, idx) => {
      if (res === 'Event') {
        scrollTo = idx;
      }
    });

    tabbarRef.current.scrollToIndex({animated: true, index: scrollTo});
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
            : Actions.pop({refreshNow: new Date()})
        }
        buttonText={
          publicView ? followButton : showEdit ? strings.UPDATE : strings.EDIT
        }
        buttonOnPress={() => {
          if (publicView) {
            let payload = {
              following_id: user?.id,
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
                {/* <ProfileEventTemplate
                  array={eventSessionSeason?.filter(e => e?.type === 'event')}
                /> */}

                <SessionEventTemplate
                  isPublicView={publicView}
                  array={eventSessionSeason?.filter(e => e?.type === 'event')}
                  title={`Events`}
                  isViewAllButtonVisible
                  viewAppButtonPress={() => EventsViewAllButtonPress()}
                />

                <ProfileBlackSection
                  array={bookedDates}
                  title="Booked Dates"
                  calendar
                  isViewAllButtonVisible
                  viewAppButtonPress={() => teamViewAllButtonPress()}
                />

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

            {currentTab === 'Calendar' &&
              (user_role == 3 ? (
                <KeyboardAwareScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    flex: 1,
                  }}>
                  {meetingsList.length == 0 && (
                    <View style={{alignItems: 'center', paddingVertical: 40}}>
                      <Text color={Colors.white}>No Time Slots Available</Text>
                    </View>
                  )}
                  {meetingsList.map((item, index) => (
                    <View style={styles.attList} key={index.toString()}>
                      <ButtonView
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>
                          {util.getFormattedDateTime(item.date, 'MM/DD/YYYY')}
                        </Text>
                      </ButtonView>
                      <View
                        style={{
                          ...AppStyles.flexRow,
                          ...AppStyles.centerInner,
                        }}>
                        <ButtonView
                          onPress={() => {
                            Actions.addCalendar({
                              edit: true,
                              meeting: item,
                              availabilityId: item.availabilityId,
                            });
                          }}>
                          <Image source={Images.editFill} alt="Edit" />
                        </ButtonView>
                        <ButtonView
                          style={{...AppStyles.mLeft10}}
                          onPress={() => {
                            setSlotId(item.availabilityId);
                            setModalVisible(true);
                          }}>
                          <Image source={Images.deleteDark} alt="delete" />
                        </ButtonView>
                      </View>
                    </View>
                  ))}
                </KeyboardAwareScrollView>
              ) : (
                <KeyboardAwareScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    paddingTop: 20,
                    paddingBottom: 60,
                  }}
                  style={{
                    flex: 1,
                  }}>
                  {timeOptions.length == 0 && <>{renderCalendar}</>}

                  {timeOptions.length > 0 && (
                    <>
                      {renderTimeOptions}
                      <PaymentSheet
                        handleEnrollButtonPress={handleEnrollButtonPress}
                        showPaymentSheet={showPaymentSheet}
                        setShowPaymentSheet={setShowPaymentSheet}
                        slotId={
                          slots?.filter(obj => obj?.time === selectedTime)[0]
                            ?.id
                        }
                        amount={charges}
                        ModalHeading="Meeting Booked"
                        ModalDescription=""
                      />
                    </>
                  )}

                  <Button
                    background={Colors.white}
                    onPress={setShowPaymentSheet}
                    disabled={
                      timeOptions.length > 0 && selectedTime ? false : true
                    }
                    raised
                    style={{
                      ...AppStyles.mLeft30,
                      ...AppStyles.mRight30,
                      ...AppStyles.mTop20,
                    }}>
                    {'Book Now'.toUpperCase()}
                  </Button>
                </KeyboardAwareScrollView>
              ))}

            {currentTab === 'Gallery' && <GalleryTab array={gallery} />}
          </View>
        </>
      )}
      <ModalView
        isConfirmModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        deleteConfirmHandler={modalButtonPress}
        image={Images.deleteIcon}
        heading={'Delete Slot'}
        description={'Are you sure you want to delete this Slot ?'}
        buttonText={'Delete'}
      />
    </ScreenWrapper>
  );
};

Coach.propTypes = {
  fromSignup: PropTypes.bool,
};
Coach.defaultProps = {
  fromSignup: false,
};

const mapStateToProps = ({general}) => ({
  selectedIndex: general.selectedIndex,
});

const actions = {setSelectedTab};

export default connect(mapStateToProps, actions)(Coach);
