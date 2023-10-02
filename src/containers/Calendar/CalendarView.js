import _ from 'lodash';
import moment from 'moment';
import React, {useEffect, useRef, useState, useMemo} from 'react';
import {
  Image,
  ScrollView,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {getCalendarListRequest} from '../../actions/CalendarActions';
import {unBookFacilityRequest} from '../../actions/Facility';
import {
  cancelMeetingRequest,
  getMeetingsListRequest,
  rescheduleMeetingRequest,
} from '../../actions/MeetingsActions';
import {
  Button,
  ButtonView,
  Loader,
  ScreenWrapper,
  SelectBox,
  Text,
  TextInput,
} from '../../components';
import {strings, UserRoles} from '../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import styles from './CalendarStyles';

const CalendarView = props => {
  const {
    RBSheetButton,
    calendarList,
    setRBSheetButton,
    item,
    selectItem,
    sheetRef,
    refreshNow,
  } = props;

  const [showEventTitle, setShowEventTitle] = useState(false);
  const [showCalendar, setShowCalendar] = useState(true);
  const [offset, setOffset] = useState(0);
  const [loader, setLoader] = useState(true);
  const [markedDates, setMarkedDates] = useState({});
  const [dateArr, setDateArr] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [selectedTime, setSelectedTime] = useState();

  const [items, setItems] = useState({});
  const {role: user_role, id: loggedInUserId} = useSelector(
    state => state.user.data,
  );
  const {meetingsList} = useSelector(state => state.meetings);

  const agenda = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getCalendarListRequest(
        {limit: 10, offset: offset, flag: Math.random()},
        (res, err) => {
          setOffset(prevOffset => prevOffset + 10);
          setLoader(false);
        },
      ),
    );
  }, [refreshNow]);

  useEffect(() => {
    let cl = JSON.stringify(calendarList);
    cl = JSON.parse(cl);
    setItems(cl);
    if (showCalendar && !loader) {
      agenda.current.setScrollPadPosition(10, true);
      agenda.current.enableCalendarScrolling();
      setShowCalendar(false);
    }
  }, [calendarList]);

  useEffect(() => {
    setDateArr(meetingsList);
  }, [meetingsList]);

  useEffect(() => {
    if (item.type !== 'meeting') return;

    dispatch(
      getMeetingsListRequest(
        {
          limit: 100,
          offset: 0,
          userId: user_role == 3 ? loggedInUserId : item.userId,
        },
        (res, err) => {},
      ),
    );
  }, [item]);

  useEffect(() => {
    if (_.isEmpty(items)) return;
    const obj = {};
    const keys = Object.keys(items);
    for (let index = 0; index < keys.length; index++) {
      obj[keys[index]] = {selected: true, marked: true, disabled: false};
    }
    setMarkedDates(obj);
  }, [items]);

  // const timeToString = time => {
  //   const date = new Date(time);
  //   return date.toISOString().split('T')[0];
  // };

  const loadItems = day => {
    dispatch(
      getCalendarListRequest(
        {limit: 10, offset: offset, flag: Math.random()},
        (res, err) => {
          setLoader(false);
          setOffset(prevOffset => prevOffset + 10);
        },
      ),
    );
  };

  const goToEvent = item => {
    
    Actions.teamEventDetail({
      isCreatorView: loggedInUserId == item.userId,
      data: item,
    });
  };

  const renderItem = (item, index) => {
    const isFirstItem = index === true;

    return (
      <View
        style={[
          AppStyles.flexRow,
          styles.calendar,
          AppStyles.mTop35,
          // isFirstItem && AppStyles.mTop40,
        ]}>
        <View style={styles.meetingMainView}>
          <ButtonView
            style={[styles.item, {height: item.height}]}
            onPress={() => {
              if (item.type == 'meeting' || item.type == 'facility') {
                selectItem(item, index);
                sheetRef.current.open();
              }
            }}>
            <Text style={styles.titleText}>{item.title}</Text>
            <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
              {!!item.booking ? (
                <Text style={styles.timing}>{item.booking}</Text>
              ) : (
                <>
                  <Text style={styles.timing}>{item.start_time}</Text>
                  {item?.end_time && (
                    <Text style={styles.timing}> - {item?.end_time}</Text>
                  )}
                </>
              )}
            </View>
            <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
              {item.type == 'TeamEvent' ? (
                <ButtonView onPress={() => goToEvent(item)} style={styles.view_more}>
                  <Text color={Colors.white} size={Fonts.size.xxxSmall}>
                    View More
                  </Text>
                </ButtonView>
              ) : (
                <Text style={styles.timing}>{item.type.toLowerCase()}</Text>
              )}
            </View>
            <View style={[styles.addressView, AppStyles.mTop15]}>
              <Image
                source={Images.locationIconBlack}
                style={{marginRight: 8}}
              />
              <Text style={styles.addressText}>{item.location}</Text>
            </View>

            <View style={styles.addressView}>
              <Image
                source={{uri: item.image}}
                style={{
                  height: 16,
                  width: 16,
                  borderRadius: 50,
                  marginRight: 8,
                }}
              />
              <View>
                <Text style={styles.addressText}>{item.booked_by}</Text>

                <Text style={styles.addressText}>
                  {util.getRoleNameByID(item.role)}
                </Text>
              </View>
            </View>
          </ButtonView>
        </View>
      </View>
    );
  };

  const cancelButtonHandler = () => {
    setLoader(true);
    if (item.type == 'meeting') {
      dispatch(
        cancelMeetingRequest(
          {id: item.meetingId, reason: cancelReason},
          (res, err) => {
            dispatch(
              getCalendarListRequest(
                {limit: 300, offset: 0, flag: Math.random()},
                (res, err) => {
                  setLoader(false);
                  setOffset(0);
                  agenda.current.setScrollPadPosition(10, true);
                  agenda.current.enableCalendarScrolling();
                },
              ),
            );
          },
        ),
      );
    }
    if (item.type == 'facility') {
      dispatch(
        unBookFacilityRequest(
          {facilityServiceId: item.facilityId, bookingDate: item.booking},
          (res, err) => {
            dispatch(
              getCalendarListRequest(
                {limit: 300, offset: 0, flag: Math.random()},
                (res, err) => {
                  setLoader(false);
                  setOffset(0);
                  agenda.current.setScrollPadPosition(10, true);
                  agenda.current.enableCalendarScrolling();
                },
              ),
            );
          },
        ),
      );
    }
    sheetRef.current.close();
    setRBSheetButton('');
  };

  // const onDayPressed = day => {
  //   console.log(12321);
  //   setShowCalendar(false);

  //   // setTimeout(() => {
  //   // }, 300);
  // };

  const renderCalendar = useMemo(
    () => (
      <>
        <Agenda
          ref={agenda}
          // selected={Object.keys(items).at(-1)}
          disabledByDefault={true}
          pastScrollRange={50}
          futureScrollRange={50}
          items={items}
          showClosingKnob
          hideKnob={false}
          loadItemsForMonth={item => loadItems(item)}
          renderKnob={() => {
            return (
              <View
                style={{
                  paddingBottom: 30,
                  height: 30,
                  width: 40,
                  zIndex: 9999,
                  ...AppStyles.centerInner,
                }}>
                <Image
                  source={Images.downArrow}
                  style={{tintColor: Colors.white}}
                />
              </View>
            );
          }}
          // onDayPress={() => console.log(123)}
          // onDayLongPress={() => console.log(123)}
          renderItem={item => renderItem(item)}
          renderEmptyDate={() => {
            return <View />;
          }}
          refreshing={false}
          refreshControl={null}
          disableAllTouchEventsForDisabledDays
          markedDates={markedDates}
          rowHasChanged={(r1, r2) => {
            return r1.text !== r2.text;
          }}
          onCalendarToggled={calendarOpened => {
            setShowEventTitle(!calendarOpened);
            setShowCalendar(calendarOpened);
          }}
          theme={{
            'stylesheet.calendar.header': {
              week: {
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            },
            calendarBackground: Colors.black,
            agendaKnobColor: Colors.white,
            agendaDayTextColor: Colors.white,
            agendaDayNumColor: Colors.white,
            agendaTodayColor: Colors.white,
            backgroundColor: Colors.black,
            monthTextColor: Colors.white,
            selectedDayBackgroundColor: Colors.white,
            selectedDayTextColor: Colors.black,
            textDayFontSize: 14,
            textMonthFontSize: 14,
            textMonthFontFamily: Fonts.type.base,
            textDayFontFamily: Fonts.type.base,
            dayTextColor: Colors.white,
            dotColor: Colors.black,
            selectedDotColor: Colors.black,
            textDisabledColor: Colors.grey3,
            indicatorColor: 'black',
          }}
        />
      </>
    ),
    [items],
  );

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      leftBtnImage={Images.back_btn}
      leftBtnPress={() => Actions.reset('athes_tab')}
      headerTitle={strings.CALENDAR}
      rightBtnImage={
        (user_role === UserRoles.coach || user_role === UserRoles.team) &&
        Images.addIconBlack
      }
      rightBtnPress={() => {
        user_role === UserRoles.team
          ? Actions.push('addTeamEvent')
          : Actions.replace('addCalendar');
      }}>
      {loader && (
        <View style={styles.fetchingDataLoader}>
          <ActivityIndicator color={Colors.white} />
        </View>
      )}

      <View style={styles.container}>
        {showEventTitle && (
          <View style={styles.headingView}>
            <Text style={styles.heading}>Day</Text>
            <Text style={[styles.heading, {marginLeft: 45}]}>Events</Text>
          </View>
        )}

        {!loader && renderCalendar}
      </View>

      <RBSheet
        ref={sheetRef}
        height={400}
        openDuration={350}
        onClose={() => {
          setRBSheetButton('');
          setSelectedDate('');
          setSelectedTime('');
          setCancelReason('');
        }}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          container: styles.RBSheetContainer,
        }}>
        <View style={styles.RBSheetHeadingView}>
          <Text style={styles.RBSheetHeading} type={Fonts.type.bold} bold="700">
            {RBSheetButton === 'reschedule'
              ? 'Reschedule'
              : RBSheetButton === 'cancel'
              ? 'Cancel'
              : 'Details'}
          </Text>

          <ButtonView
            style={styles.downArrowView}
            onPress={() => {
              sheetRef.current.close();
            }}>
            <Image source={Images.downArrow} resizeMode="contain" />
          </ButtonView>
        </View>

        {RBSheetButton === '' && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.RBSheetMainView2, AppStyles.pBottom30]}>
              <Text style={styles.peopleText}>People</Text>

              <View style={styles.RBSheetView2}>
                <View style={styles.userDetailMainView}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 52, height: 52, borderRadius: 50}}
                  />

                  <View style={styles.userDetailView}>
                    <Text
                      style={styles.userDetailText2}
                      type={Fonts.type.bold}
                      bold="700">
                      {item.booked_by}
                    </Text>
                  </View>
                </View>

                {/* <Image source={Images.rightArrowCircleIcon} /> */}
              </View>

              <View style={styles.userDetailMainView2}>
                <View style={styles.dateView}>
                  <Text
                    style={styles.userDetailText}
                    type={Fonts.type.bold}
                    bold="700">
                    Date
                  </Text>
                  <Text
                    style={styles.userDetailText}
                    type={Fonts.type.bold}
                    bold="700">
                    {util.formatDate(item.date) ||
                      util.formatDate(item.booking)}
                  </Text>
                </View>
                {item.start_time && (
                  <View style={styles.timeView}>
                    <Text
                      style={styles.userDetailText}
                      type={Fonts.type.bold}
                      bold="700">
                      Time
                    </Text>
                    <Text
                      style={styles.userDetailText}
                      type={Fonts.type.bold}
                      bold="700">
                      {item.start_time}
                    </Text>
                  </View>
                )}

                <View style={styles.payView}>
                  <Text
                    style={styles.userDetailText}
                    type={Fonts.type.bold}
                    bold="700">
                    Payment
                  </Text>
                  <Text
                    style={styles.userDetailText}
                    type={Fonts.type.bold}
                    bold="700">
                    ${item.charges}
                  </Text>
                </View>
              </View>
            </View>

            {moment(item.date).diff(moment(), 'days') >= 0 && (
              <View style={styles.RBSheetMainView3}>
                <ButtonView
                  style={styles.cancelButtonView}
                  onPress={() => setRBSheetButton('cancel')}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </ButtonView>

                {item.type == 'meeting' && (
                  <View style={AppStyles.flex}>
                    <Button
                      hasLinear
                      color="#FFF"
                      textStyle={{
                        textAlign: 'center',
                        width: '100%',
                        // paddingLeft: 20,
                      }}
                      onPress={() => setRBSheetButton('reschedule')}
                      raised
                      style={{...AppStyles.mRight30}}>
                      {strings.RESCHEDULE.toUpperCase()}
                    </Button>
                  </View>
                )}
              </View>
            )}
          </ScrollView>
        )}

        {RBSheetButton === 'cancel' && (
          <>
            <View style={styles.RBSheetMainView2}>
              <Text style={styles.peopleText}>People</Text>

              <View style={styles.RBSheetView2}>
                <View style={styles.userDetailMainView}>
                  <Image
                    source={{uri: item.image}}
                    style={{width: 52, height: 52, borderRadius: 50}}
                  />

                  <View style={styles.userDetailView}>
                    <Text
                      style={styles.userDetailText2}
                      type={Fonts.type.bold}
                      bold="700">
                      {item.booked_by}
                    </Text>
                  </View>
                </View>

                {/* <Image source={Images.rightArrowCircleIcon} /> */}
              </View>

              <View style={AppStyles.mTop15}>
                <Text style={styles.reasonText}>Reason</Text>
                <TextInput
                  customStyle={styles.reasonTextInput}
                  placeholder="Type Here"
                  placeholderTextColor={Colors.grey2}
                  value={cancelReason}
                  onChangeText={value => setCancelReason(value)}
                  selectionColor={Colors.grey3}
                />
              </View>
            </View>
            {moment(item.date).diff(moment(), 'days') >= 0 && (
              <View style={styles.cancelViewcancelButtonView}>
                <Button
                  hasLinear
                  color="#FFF"
                  icon="righArrowIcon"
                  iconRight
                  onPress={cancelButtonHandler}
                  raised>
                  {strings.CANCEL.toUpperCase()}
                </Button>
              </View>
            )}
          </>
        )}

        {RBSheetButton === 'reschedule' && (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.RBSheetMainView2}>
              <View style={AppStyles.mTop10}>
                <SelectBox
                  isDate
                  array={dateArr?.map(obj => obj?.date)}
                  setData={setSelectedDate}
                  value={!!selectedDate ? util.formatDate(selectedDate) : ''}
                  label="Select Date"
                  blackLabel={true}
                  icon={Images.downIconBlack}
                  iconStyles={{tintColor: Colors.grey3}}
                  isRightIcon
                />
              </View>
              {!!selectedDate && (
                <View style={AppStyles.mTop10}>
                  <SelectBox
                    array={dateArr
                      ?.filter(obj => obj?.date === selectedDate)[0]
                      ?.slots?.map(o => o?.time.slice(0, 5))}
                    setData={setSelectedTime}
                    time
                    value={util.convertTimeInto12(selectedTime)}
                    label="Select Time"
                    blackLabel={true}
                    icon={Images.downIconBlack}
                    iconStyles={{tintColor: Colors.grey3}}
                    isRightIcon
                  />
                </View>
              )}
            </View>

            <View style={styles.cancelViewcancelButtonView}>
              <Button
                hasLinear
                color="#FFF"
                icon="righArrowIcon"
                iconRight
                disabled={!!selectedTime && item !== {} ? false : true}
                onPress={() => {
                  const payload = {
                    slotId: dateArr
                      .filter(o => o.date === selectedDate)[0]
                      .slots.filter(o => o.time.includes(selectedTime))[0].id,
                    meetingId: item.meetingId,
                  };
                  setLoader(true);
                  dispatch(
                    rescheduleMeetingRequest(payload, (res, err) => {
                      if (item.type !== 'meeting') return;
                      dispatch(
                        getCalendarListRequest(
                          {limit: 300, offset: 0, flag: Math.random()},
                          (res, err) => {
                            setOffset(10);
                            setLoader(false);
                            setOffset(0);
                            agenda.current.setScrollPadPosition(10, true);
                            agenda.current.enableCalendarScrolling();
                          },
                        ),
                      );
                      dispatch(
                        getMeetingsListRequest(
                          {limit: 300, offset: 0, userId: item.userId},
                          (res, err) => {
                            setLoader(false);
                          },
                        ),
                      );
                    }),
                  );

                  sheetRef.current.close();
                }}
                raised>
                {strings.RESCHEDULE.toUpperCase()}
              </Button>
            </View>
          </ScrollView>
        )}
      </RBSheet>
    </ScreenWrapper>
  );
};

export default CalendarView;
