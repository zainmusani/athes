import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StatusBar, View, Image, FlatList, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  TextInput,
  Button,
  ModalView,
  Loader,
} from '../../../components';
import {strings, UserRoles} from '../../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import styles from './AthleteCancelStyles';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {getChildRequest} from '../../../actions/ParentActions';
import util from '../../../util';
import {
  enrolledEventsRequest,
  eventAttendeesRequest,
  getEventByIdRequest,
} from '../../../actions/EventsActions';
import {
  enrolledSessionRequest,
  getSessionByIdRequest,
  sessionAttendeesRequest,
} from '../../../actions/SessionsActions';
import {
  enrolledSeasonRequest,
  getSeasonByIdRequest,
  seasonAttendeesRequest,
} from '../../../actions/SeasonsActions';

const AthleteCancelView = props => {
  const {
    selectedItem,
    setSelectedItem,
    sheetRef,
    successSheetRef,
    handleBottomSheetButtonPress,
    isSeasonView,
    cancelAthleteEnroll,
    error,
    hasCancel,
    setHasCancel,
    user_role,
    array,
    id,
    data,
    isEventView,
    isSessionView,
    childIds,
    setChildIds,
  } = props;

  const {childs} = useSelector(state => state.parent);

  const {role, name, image, id: userId} = useSelector(state => state.user.data);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const startDateArr = data?.startDate?.split('-');
  const startDate = `${util.getMonthName(+startDateArr[1])} ${startDateArr[2]} ${startDateArr[0]}`;

  const test = item =>
    item.eventEnrolled || item.sessionEnrolled || item.seasonEnrolled;

  const AthleteInfo = [
    {
      eventEnrolled: data?.eventEnrolled,
      sessionEnrolled: data?.sessionEnrolled,
      seasonEnrolled: data?.seasonEnrolled,
      id: userId,
      image,
      name,
    },
  ];

  useEffect(() => {
    if (role == 1) {
      setLoading(true);
      let payload = {
        eventId: id,
      };

      if (isSessionView) {
        payload = {
          sessionId: id,
        };
      }

      if (isSeasonView) {
        payload = {
          seasonId: id,
        };
      }

      payload.dummy = Math.random();
      dispatch(
        getChildRequest(payload, res => {
          if (res) {
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }
        }),
      );
    }
  }, []);

  const cancelHandle = () => {
    console.log('cancelHandle');
    if (isEventView) {
      dispatch(
        enrolledEventsRequest(
          {limit: 300, offset: 0, userId: childIds[0]},
          res => {
            Actions.replace('managementTab', {refreshNow: new Date()});
          },
        ),
      );
    }
    if (isSessionView) {
      dispatch(
        enrolledSessionRequest(
          {limit: 300, offset: 0, userId: childIds[0]},
          res => {
            Actions.replace('managementTab', {refreshNow: new Date()});
          },
        ),
      );
    }
    if (isSeasonView) {
      dispatch(
        enrolledSeasonRequest(
          {limit: 300, offset: 0, userId: childIds[0]},
          res => {
            Actions.replace('managementTab', {refreshNow: new Date()});
          },
        ),
      );
    }
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      headerbackground={Colors.graybrown}
      headerTitle={'Cancellation'}
      headerTitleStyle={styles.headerTitleStyle}
      leftBtnImage={Images.backBtnBlack}
      leftBtnPress={() => Actions.pop()}>
      <View style={styles.header}>
        <Text style={styles.headerText1}>
          {isEventView
            ? data?.eventTitle
            : isSeasonView
            ? data?.seasonTitle
            : data?.sessionTitle}
        </Text>
        <Text style={styles.headerText2}>{startDate}</Text>
      </View>
      {!loading && (
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>Select Athlete</Text>
            <>
              <Text
                color={Colors.red}
                size={Fonts.size.xSmall}
                type={Fonts.type.medium}
                bold="500">
                {error}
              </Text>
              {role === 2
                ? AthleteInfo.map((item, index) => (
                    <ChildList
                      key={`${index}`}
                      {...props}
                      list={AthleteInfo}
                      setChildIds={setChildIds}
                      item={item}
                    />
                  ))
                : childs.map((item, index) => (
                    <ChildList
                      key={`${index}`}
                      {...props}
                      list={childs}
                      setChildIds={setChildIds}
                      item={item}
                    />
                  ))}
            </>
          </View>
          <Button
            background={Colors.white}
            icon="righArrowIcon"
            iconRight
            onPress={() => cancelAthleteEnroll()}
            raised
            // disabled={!!childs.length ? childs.every(test) : AthleteInfo.every(test)}
            disabled={!childIds.length && true}
            style={[AppStyles.mTop20, AppStyles.mBottom25]}>
            {strings.DONE.toUpperCase()}
          </Button>
        </View>
      )}

      <RBSheet
        ref={sheetRef}
        height={Platform.OS === 'ios' ? 360 : 340}
        openDuration={250}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
          container: styles.RBSheetMainContainer,
        }}>
        <View style={styles.RBSheetContainer}>
          <Text style={styles.detailHeading}>Details</Text>
          <Text style={styles.seasonHeading}>
            {isEventView ? data?.eventTitle : data?.sessionTitle}
          </Text>
          <Text style={styles.date}>{startDate}</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{height: 120}}
            keyExtractor={(item, index) => item.id}
            data={selectedItem}
            renderItem={({item, index}) => (
              <>
                <View
                  key={`${index}`}
                  style={[
                    styles.athleteMainView,
                    AppStyles.mTop25,
                    AppStyles.shadow1,
                  ]}>
                  <View style={styles.athleteView}>
                    <Image
                      style={{height: 30, width: 30, borderRadius: 50}}
                      source={{uri: item?.image}}
                      resizeMode={'contain'}
                    />
                    <Text style={styles.athleteName}>
                      {item?.username || item?.name}
                    </Text>
                  </View>
                  <Image
                    source={Images.tickIconCircle}
                    resizeMode={'contain'}
                    style={{width: 24.22, height: 24.22}}
                  />
                </View>
              </>
            )}
          />

          <Button
            hasLinear
            color={Colors.white}
            icon="righArrowIcon"
            iconRight
            onPress={() => handleBottomSheetButtonPress()}
            raised
            style={[AppStyles.mTop30, AppStyles.mBottom5]}>
            {strings.CONFIRM_CANCELATION.toUpperCase()}
          </Button>
        </View>
      </RBSheet>

      {/* success msg sheet */}
      <RBSheet
        ref={successSheetRef}
        height={Platform.OS === 'ios' ? 100 : 80}
        onClose={cancelHandle}
        openDuration={250}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.4)',
          },
          container: styles.RBSheetMainContainer,
        }}>
        <View style={styles.RBSheetContainer}>
          <Text style={styles.successMsgText}>Successful Refund</Text>
        </View>
      </RBSheet>
      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

export default AthleteCancelView;

const ChildList = ({
  setChildIds,
  item,
  isEventView,
  isSessionView,
  setSelectedItem,
  isSeasonView,
  list,
}) => {
  useLayoutEffect(() => {
    if (list.length === 1 && selectAthlete == false) {
      onPressHandler();
    }
  }, []);

  const [selectAthlete, setSelectAthlete] = useState(false);

  if (isEventView && item.eventEnrolled === 0) return null;
  if (isSeasonView && item.seasonEnrolled === 0) return null;
  if (isSessionView && item.sessionEnrolled === 0) return null;

  const onPressHandler = () => {
    setSelectAthlete(!selectAthlete);
    if (!selectAthlete) {
      setChildIds(ids => [...ids, item.id]);
      setSelectedItem(arr => [...arr, item]);
    } else {
      setChildIds(ids => ids.filter(id => id !== item.id));
      setSelectedItem(arr => arr.filter(({id}) => id !== item.id));
    }
  };

  return (
    <ButtonView
      style={styles.athleteMainView}
      disabled={list.length === 1}
      onPress={onPressHandler}>
      <View style={styles.athleteView}>
        <Image
          style={{height: 30, width: 30, borderRadius: 50}}
          source={{uri: item?.image}}
          resizeMode={'contain'}
        />
        <Text style={styles.athleteName}>{item?.username || item?.name}</Text>
      </View>
      {selectAthlete || list.length === 1 ? (
        <Image
          source={Images.tickIconCircle}
          resizeMode={'contain'}
          style={{width: 24.22, height: 24.22}}
        />
      ) : (
        <View style={styles.unSelectedItem}></View>
      )}
    </ButtonView>
  );
};
