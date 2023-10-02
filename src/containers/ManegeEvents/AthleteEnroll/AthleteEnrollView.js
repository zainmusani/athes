import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  FlatList,
  Button as RNButton,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  TextInput,
  Button,
  ModalView,
  PaymentOption,
  PaymentSheet,
  Loader,
} from '../../../components';
import {paymentOption, strings} from '../../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import styles from './AthleteEnrollStyles';
import RBSheet from 'react-native-raw-bottom-sheet';
import util from '../../../util';
import {getChildRequest, getChildSuccess} from '../../../actions/ParentActions';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

const AthleteEnrollView = props => {
  const {
    setChildIds,
    childIds,
    enrollAthelete,
    errors,
    isEventView,
    isSessionView,
    isSeasonView,
    handleEnrollButtonPress,
    showPaymentSheet,
    setShowPaymentSheet,
    data,
    id,
    isModalVisible,
    setModalVisible,
  } = props;

  const [loading, setLoading] = useState(false);
  const [totalCharges, setTotalCharges] = useState(0);
  const dispatch = useDispatch();
  const childs = useSelector(state => state.parent.childs);
  const {
    role: user_role,
    name,
    image,
    id: userId,
  } = useSelector(state => state.user.data);
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
          setLoading(false);
        }
      }),
    );
  }, []);

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      headerbackground={Colors.graybrown}
      leftBtnImage={Images.backBtnBlack}
      leftBtnPress={() => Actions.pop()}>
      <View style={styles.header}>
        <Text style={styles.headerText1}>
          {isSeasonView
            ? data?.seasonTitle
            : isEventView
            ? data?.eventTitle
            : data?.sessionTitle}
        </Text>
        <Text style={styles.headerText2}>{startDate}</Text>
      </View>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.heading}>Select Athlete</Text>

          <Text
            color={Colors.red}
            size={Fonts.size.xSmall}
            type={Fonts.type.medium}
            bold="500">
            {errors}
          </Text>
          {user_role === 2
            ? AthleteInfo.map((item, index) => (
                <ChildList
                  key={`${index}`}
                  {...props}
                  setChildIds={setChildIds}
                  item={item}
                  list={AthleteInfo}
                  setTotalCharges={setTotalCharges}
                />
              ))
            : childs.map((item, index) => (
                <ChildList
                  key={`${index}`}
                  {...props}
                  setChildIds={setChildIds}
                  item={item}
                  list={childs}
                  setTotalCharges={setTotalCharges}
                />
              ))}
        </View>

        <View>
          {data.charges !== 0 && (
            <>
              <Text style={styles.heading}>Cost</Text>

              <View style={styles.paymentView}>
                <Text style={styles.paymentText1}>Charges</Text>
                <Text style={styles.paymentText2}>${data?.charges}</Text>
              </View>
              <View style={styles.paymentView}>
                <Text style={styles.paymentText1}>Total Charges</Text>
                <Text style={styles.paymentText2}>${totalCharges}</Text>
              </View>
            </>
          )}
          <Button
            background={Colors.white}
            icon="righArrowIcon"
            iconRight
            onPress={() => enrollAthelete()}
            raised
            disabled={
              !!childs.length ? childs.every(test) : AthleteInfo.every(test)
            }
            style={{
              marginTop: 60,
            }}>
            {strings.DONE.toUpperCase()}
          </Button>
        </View>
      </ScrollView>

      <ModalView
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        modalButtonPress={handleEnrollButtonPress}
        image={Images.modalIcon}
        heading={'Player Enrolled'}
        description={''}
        buttonText={
          isEventView
            ? 'Back to Event'
            : isSeasonView
            ? 'Back to Season'
            : 'Back to Session'
        }
      />

      <PaymentSheet
        handleEnrollButtonPress={handleEnrollButtonPress}
        showPaymentSheet={showPaymentSheet}
        setShowPaymentSheet={setShowPaymentSheet}
        isEventView={isEventView}
        isSeasonView={isSeasonView}
        isSessionView={isSessionView}
        id={id}
        ids={childIds}
        data={data}
        amount={totalCharges}
        ModalHeading="Player Enrolled"
        ModalDescription=""
      />
      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

export default AthleteEnrollView;

const ChildList = memo(({setChildIds, item, setTotalCharges, data, list}) => {
  const [selectAthlete, setSelectAthlete] = useState(false);
  const enrolled =
    item.eventEnrolled || item.sessionEnrolled || item.seasonEnrolled;
  const onPresHandel = () => {
    if (enrolled) return;
    setSelectAthlete(!selectAthlete);
    if (!selectAthlete) {
      setChildIds(ids => [...ids, item.id]);
      setTotalCharges(charges => charges + data.charges);
    } else {
      setChildIds(ids => ids.filter(id => id !== item.id));
      setTotalCharges(charges => charges - data.charges);
    }
  };

  useEffect(() => {
    if (list.length === 1 && !enrolled) {
      onPresHandel();
    }
  }, []);

  return (
    <ButtonView
      style={styles.athleteMainView}
      disabled={list.length === 1}
      onPress={onPresHandel}>
      <View style={styles.athleteView}>
        <FastImage
          style={{height: 30, width: 30, borderRadius: 50}}
          source={{
            uri: item?.image,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.athleteName}>{item?.username || item?.name}</Text>
      </View>
      {enrolled ? (
        <Text style={styles.enrollText}>Enrolled</Text>
      ) : selectAthlete || (list.length === 1 && !enrolled) ? (
        <Image
          source={Images.tickIconCircle}
          resizeMode={'contain'}
          style={{width: 24.22, height: 24.22}}
        />
      ) : (
        <View style={styles.unTickView}></View>
      )}
    </ButtonView>
  );
});
