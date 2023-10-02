import React, {useEffect, useRef, useState, useMemo} from 'react';
import {ApplePay} from 'react-native-apay';
import {View, FlatList, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import {Text, ButtonView, TextInput, ModalView} from '../../components';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import styles from './styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  RESOURCETYPE,
  paymentCard,
  paymentOption,
  strings,
} from '../../constants';
import {Calendar} from 'react-native-calendars';
import PaymentOption from '../PaymentOption';
import {enrollEventRequest} from '../../actions/EventsActions';
import {useDispatch, useSelector} from 'react-redux';
import {enrollSessionRequest} from '../../actions/SessionsActions';
import Button from '../Button';
import {enrollSeasonRequest} from '../../actions/SeasonsActions';
import {bookFacilityRequest} from '../../actions/Facility';
import {bookMeetingRequest} from '../../actions/MeetingsActions';
import {
  paymentCheckoutRequest,
  paypalAppovalRequest,
  venmoAppovalRequest,
} from '../../actions/PaymentsActions';
import util from '../../util';
import {BASE_URL} from '../../config/WebService';
import {athesCartData} from '../../actions/GeneralActions';

const PaymentSheet = props => {
  const {
    handleEnrollButtonPress,
    showPaymentSheet,
    setShowPaymentSheet,
    ModalHeading,
    ModalDescription,
    showBookingCalendar,
    isEventView,
    isSeasonView,
    isSessionView,
    isFacilityView,
    facilityId,
    id,
    ids,
    slotId,
    data,
    amount,
  } = props;

  const [isModalVisible, setModalVisible] = useState(false);
  const [radioBoxCheck, setRadioBoxCheck] = useState('');

  const sheetRef = useRef();
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(() =>
    new Date().toJSON().slice(0, 10),
  );
  const [selected, setSelected] = useState(currentDate);

  const [showCalendar, setShowCalendar] = useState(() => showBookingCalendar);

  const [disableBookedDates, setDisableBookedDates] = useState(() => {});

  const {bookedDates} = useSelector(state => state.facility);

  useEffect(() => {
    if (showPaymentSheet) {
      sheetRef.current?.open();
    }
  });

  useEffect(() => {
    let obj = {};
    for (let index = 0; index < bookedDates.length; index++) {
      const element = bookedDates[index];
      obj[element] = {disabled: true, disableTouchEvent: true};
    }
    setDisableBookedDates(obj);
  }, [bookedDates]);

  const onDayPress = day => {
    setShowCalendar(false);
    setSelected(day.dateString);
  };

  const onApplePayClickHandler = resourceType => {
    if (ApplePay.canMakePayments) {
      ApplePay.requestPayment(requestData).then(paymentData => {
        setTimeout(() => {
          ApplePay.complete(ApplePay.SUCCESS).then(item => {
            sheetRef.current?.close();
            setShowPaymentSheet(false);
            setRadioBoxCheck('');

            afterSuccessPaymentAddResource(resourceType, 'Apple pay');
          });
        }, 1000);
      });
    }
  };

  const eventHandelPress = () => {
    switch (radioBoxCheck) {
      case paymentCard.CREDIT_CARD: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        setRadioBoxCheck('');
        Actions.jump('stripeCardList', {
          resourceType: 'event',
          resourceId: id,
          afterSuccessPaymentAddResource,
        });
        break;
      }
      case paymentCard.PAYPAL: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        setRadioBoxCheck('');
        const parameter = `?resourceType=event&resourceId=${id}`;
        dispatch(
          paypalAppovalRequest(parameter, res => {
            if (!util.isEmptyValue(res)) {
              Actions.jump('paymentWebView', {
                webViewUrl: res,
                eventId: id,
                ids,
                resourceType: 'event',
                setModalVisible,
                amount: amount,
                paymentMethod: paymentCard.PAYPAL,
                title: 'Paypal',
              });
            }
          }),
        );
        break;
      }
      case paymentCard.APPLE_PAY: {
        onApplePayClickHandler('event');
        break;
      }
      case paymentCard.VENMO_PAY: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        const parameter = {
          amount: amount,
          returnUrl: util.getDeepLinkUrl(RESOURCETYPE.EVENT, id),
        };
        dispatch(
          venmoAppovalRequest(parameter, res => {
            if (!util.isEmptyValue(res)) {
              Actions.jump('paymentWebView', {
                webViewUrl: res,
                eventId: id,
                ids,
                resourceType: 'event',
                setModalVisible,
                amount: amount,
                paymentMethod: paymentCard.VENMO_PAY,
                title: 'Venmo',
              });
            }
          }),
        );
        break;
      }
      case paymentCard.CASH: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        setRadioBoxCheck('');

        afterSuccessPaymentAddResource('event', 'Cash');

        break;
      }
    }
  };

  const sessionHandelPress = () => {
    switch (radioBoxCheck) {
      case paymentCard.CREDIT_CARD: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        setRadioBoxCheck('');
        Actions.jump('stripeCardList', {
          resourceType: 'session',
          resourceId: id,
          afterSuccessPaymentAddResource,
        });
        break;
      }
      case paymentCard.PAYPAL: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        setRadioBoxCheck('');
        const parameter = `?resourceType=session&resourceId=${id}`;
        dispatch(
          paypalAppovalRequest(parameter, res => {
            if (!util.isEmptyValue(res)) {
              Actions.jump('paymentWebView', {
                webViewUrl: res,
                sessionId: id,
                ids,
                resourceType: 'session',
                setModalVisible,
                amount: amount,
                paymentMethod: paymentCard.PAYPAL,
                title: 'Paypal',
              });
            }
          }),
        );
        break;
      }
      case paymentCard.APPLE_PAY: {
        onApplePayClickHandler('session');
        break;
      }
      case paymentCard.VENMO_PAY: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        const parameter = {
          amount: amount,
          returnUrl: util.getDeepLinkUrl(RESOURCETYPE.SESSION, id),
        };
        dispatch(
          venmoAppovalRequest(parameter, res => {
            if (!util.isEmptyValue(res)) {
              Actions.jump('paymentWebView', {
                webViewUrl: res,
                sessionId: id,
                ids,
                resourceType: 'session',
                setModalVisible,
                amount: amount,
                paymentMethod: paymentCard.VENMO_PAY,
                title: 'Venmo',
              });
            }
          }),
        );
        break;
      }
      case paymentCard.CASH: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        setRadioBoxCheck('');

        afterSuccessPaymentAddResource('session', 'Cash');

        break;
      }
    }
  };

  const seasonHandelPress = () => {
    switch (radioBoxCheck) {
      case paymentCard.CREDIT_CARD: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        setRadioBoxCheck('');
        Actions.jump('stripeCardList', {
          resourceType: 'season',
          resourceId: id,
          afterSuccessPaymentAddResource,
        });
        break;
      }
      case paymentCard.PAYPAL: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        setRadioBoxCheck('');
        const parameter = `?resourceType=season&resourceId=${id}`;
        dispatch(
          paypalAppovalRequest(parameter, res => {
            if (!util.isEmptyValue(res)) {
              Actions.jump('paymentWebView', {
                webViewUrl: res,
                seasonId: id,
                ids,
                resourceType: 'season',
                setModalVisible,
                amount: amount,
                paymentMethod: paymentCard.PAYPAL,
                title: 'Paypal',
              });
            }
          }),
        );
        break;
      }
      case paymentCard.APPLE_PAY: {
        onApplePayClickHandler('season');
        break;
      }
      case paymentCard.VENMO_PAY: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        const parameter = {
          amount: amount,
          returnUrl: util.getDeepLinkUrl(RESOURCETYPE.SEASON, id),
        };
        dispatch(
          venmoAppovalRequest(parameter, res => {
            if (!util.isEmptyValue(res)) {
              Actions.jump('paymentWebView', {
                webViewUrl: res,
                seasonId: id,
                ids,
                resourceType: 'season',
                setModalVisible,
                amount: amount,
                paymentMethod: paymentCard.VENMO_PAY,
                title: 'Venmo',
              });
            }
          }),
        );
        break;
      }
      case paymentCard.CASH: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        setRadioBoxCheck('');

        afterSuccessPaymentAddResource('season', 'Cash');

        break;
      }
    }
  };

  const requestData = {
    merchantIdentifier: 'merchant.com.athes.app',
    supportedNetworks: ['mastercard', 'visa'],
    countryCode: 'PK',
    currencyCode: 'USD',
    paymentSummaryItems: [
      {
        label: 'Athes',
        amount: amount?.toString(),
      },
    ],
  };

  const facilityHandelPress = () => {
    sheetRef.current?.close();
    setShowPaymentSheet(false);
    setRadioBoxCheck('');
    switch (radioBoxCheck) {
      case paymentCard.CREDIT_CARD: {
        Actions.jump('stripeCardList', {
          resourceType: 'facility',
          resourceId: facilityId,
          afterSuccessPaymentAddResource,
        });
        break;
      }
      case paymentCard.PAYPAL: {
        const parameter = `?resourceType=facility&resourceId=${facilityId}`;
        dispatch(
          paypalAppovalRequest(parameter, res => {
            if (!util.isEmptyValue(res)) {
              Actions.jump('paymentWebView', {
                webViewUrl: res,
                facilityServiceId: facilityId,
                bookingDate: selected,
                resourceType: 'facility',
                setModalVisible,
                amount: amount,
                paymentMethod: paymentCard.PAYPAL,
                title: 'Paypal',
              });
            }
          }),
        );
        break;
      }
      case paymentCard.APPLE_PAY: {
        onApplePayClickHandler('facility');
        break;
      }
      case paymentCard.VENMO_PAY: {
        const parameter = {
          amount: amount,
          returnUrl: util.getDeepLinkUrl(RESOURCETYPE.FACILITY, facilityId),
        };
        dispatch(
          venmoAppovalRequest(parameter, res => {
            if (!util.isEmptyValue(res)) {
              Actions.jump('paymentWebView', {
                webViewUrl: res,
                facilityServiceId: facilityId,
                bookingDate: selected,
                resourceType: RESOURCETYPE.FACILITY,
                setModalVisible,
                amount: amount,
                paymentMethod: paymentCard.VENMO_PAY,
                title: 'Venmo',
              });
            }
          }),
        );
        break;
      }
      case paymentCard.CASH: {
        afterSuccessPaymentAddResource('facility', 'Cash');

        break;
      }
    }
  };

  const afterSuccessPaymentAddResource = (resourceType, paymentMethod) => {
    if (util.areValuesEqual(resourceType, RESOURCETYPE.EVENT)) {
      dispatch(
        enrollEventRequest({eventId: id, ids}, res => {
          if (!util.isArrayEmpty(res)) {
            const payload = {
              resourceId: id,
              resourceType: 'event',
              amount: amount,
              paymentType: paymentMethod,
              enrollmentIds: res,
            };
            dispatch(
              paymentCheckoutRequest(payload, res => {
                if (res) {
                  dispatch(athesCartData({}));
                  setTimeout(() => {
                    setModalVisible(true);
                  }, 800);
                }
              }),
            );
          }
        }),
      );
    } else if (util.areValuesEqual(resourceType, RESOURCETYPE.SEASON)) {
      dispatch(
        enrollSeasonRequest({seasonId: id, ids}, res => {
          if (!util.isArrayEmpty(res)) {
            const payload = {
              resourceId: id,
              resourceType: 'season',
              amount: amount,
              paymentType: paymentMethod,
              enrollmentIds: res,
            };
            dispatch(
              paymentCheckoutRequest(payload, res => {
                if (res) {
                  dispatch(athesCartData({}));
                  setTimeout(() => {
                    setModalVisible(true);
                  }, 800);
                }
              }),
            );
          }
        }),
      );
    } else if (util.areValuesEqual(resourceType, RESOURCETYPE.SESSION)) {
      dispatch(
        enrollSessionRequest({sessionId: id, ids}, res => {
          if (!util.isArrayEmpty(res)) {
            const payload = {
              resourceId: id,
              resourceType: 'session',
              amount: amount,
              paymentType: paymentMethod,
              enrollmentIds: res,
            };
            dispatch(
              paymentCheckoutRequest(payload, res => {
                if (res) {
                  dispatch(athesCartData({}));
                  setTimeout(() => {
                    setModalVisible(true);
                  }, 800);
                }
              }),
            );
          }
        }),
      );
    } else if (util.areValuesEqual(resourceType, RESOURCETYPE.FACILITY)) {
      dispatch(
        bookFacilityRequest(
          {
            facilityServiceId: facilityId,
            bookingDate: selected,
          },
          res => {
            if (!util.isArrayEmpty(res)) {
              const payload = {
                resourceId: facilityId,
                resourceType: 'facility',
                amount: amount,
                paymentType: paymentMethod,
                enrollmentIds: res,
              };
              dispatch(
                paymentCheckoutRequest(payload, res => {
                  if (res) {
                    dispatch(athesCartData({}));
                    setTimeout(() => {
                      setModalVisible(true);
                    }, 800);
                  }
                }),
              );
            }
          },
        ),
      );
    } else if (util.areValuesEqual(resourceType, RESOURCETYPE.MEETING)) {
      dispatch(
        bookMeetingRequest(
          {
            slotId,
          },
          res => {
            if (!util.isArrayEmpty(res)) {
              const payload = {
                resourceId: slotId,
                resourceType: 'meeting',

                amount: amount,
                paymentType: paymentMethod,
                enrollmentIds: res,
              };
              dispatch(
                paymentCheckoutRequest(payload, res => {
                  if (res) {
                    dispatch(athesCartData({}));
                    setTimeout(() => {
                      setModalVisible(true);
                    }, 800);
                  }
                }),
              );
            }
          },
        ),
      );
    }
  };

  const profileCalenderHandelPress = () => {
    switch (radioBoxCheck) {
      case paymentCard.CREDIT_CARD: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        setRadioBoxCheck('');

        Actions.jump('stripeCardList', {
          resourceType: 'meeting',
          slotId: slotId,
          resourceId: slotId,
          afterSuccessPaymentAddResource,
          isSetting: false,
        });
        break;
      }
      case paymentCard.PAYPAL: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        setRadioBoxCheck('');
        const parameter = `?resourceType=meeting&resourceId=${slotId}`;
        dispatch(
          paypalAppovalRequest(parameter, res => {
            if (!util.isEmptyValue(res)) {
              Actions.jump('paymentWebView', {
                webViewUrl: res,
                slotId: slotId,
                resourceType: 'meeting',
                setModalVisible,

                amount: amount,
                paymentMethod: paymentCard.PAYPAL,
                title: 'Paypal',
              });
            }
          }),
        );
        break;
      }
      case paymentCard.APPLE_PAY: {
        onApplePayClickHandler('meeting');
        break;
      }
      case paymentCard.VENMO_PAY: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        const parameter = {
          amount: amount,
          returnUrl: util.getDeepLinkUrl(RESOURCETYPE.MEETING, slotId),
        };
        dispatch(
          venmoAppovalRequest(parameter, res => {
            if (!util.isEmptyValue(res)) {
              Actions.paymentWebView({
                webViewUrl: res,
                slotId: slotId,
                resourceType: RESOURCETYPE.MEETING,
                setModalVisible,
                amount: amount,
                paymentMethod: paymentCard.VENMO_PAY,
                title: 'Venmo',
              });
            }
          }),
        );
        break;
      }
      case paymentCard.CASH: {
        sheetRef.current?.close();
        setShowPaymentSheet(false);
        setRadioBoxCheck('');
        afterSuccessPaymentAddResource('meeting', 'Cash');

        break;
      }
    }
  };

  const handlePaymentOptionButton = () => {
    if (radioBoxCheck !== '') {
      const payload = {
        selectedDate: selected,
        amount: amount,
        paymentMethod: radioBoxCheck,
        slotId: slotId,
        resourceId: id,
        ids: ids,
      };

      dispatch(athesCartData(payload));

      if (isEventView) return eventHandelPress();
      if (isSeasonView) return seasonHandelPress();
      if (isFacilityView) return facilityHandelPress();
      if (isSessionView) return sessionHandelPress();
      if (slotId) return profileCalenderHandelPress();
    }
  };

  const buttonText = () => {
    if (isEventView) return 'Back to Event';
    if (isSeasonView) return 'Back to Season';
    if (isFacilityView) return 'Back to Facility';
    if (isSessionView) return 'Back to Session';
    if (slotId) return 'Back to wall';
  };

  const renderCalendar = useMemo(
    () => (
      <>
        <Text
          size={Fonts.size.large}
          font={Fonts.type.base}
          color={Colors.blue}
          textAlign="center"
          style={AppStyles.mBottom20}>
          Select Date
        </Text>
        <Calendar
          current={currentDate}
          minDate={currentDate}
          onDayPress={day => onDayPress(day)}
          monthFormat={'MMM yyyy'}
          onMonthChange={month => {}}
          disableAllTouchEventsForDisabledDays={true}
          enableSwipeMonths={true}
          markedDates={disableBookedDates}
          singleSelectMode
          theme={{
            backgroundColor: Colors.white,
            calendarBackground: Colors.white,
            selectedDayBackgroundColor: Colors.blue3,
            selectedDayTextColor: Colors.white,
            selectedDotColor: 'transparent',
            todayTextColor: Colors.white,
            todayBackgroundColor: Colors.black,
            todayDotColor: 'transparent',
            dayTextColor: Colors.blue3,
            textDisabledColor: '#B7B7B7',
            dotColor: 'transparent',
            arrowColor: Colors.blue3,
            disabledArrowColor: '#B7B7B7',
            monthTextColor: Colors.blue3,
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
                color: Colors.gray11,
                paddingTop: 10,
                paddingBottom: 20,
                fontSize: Fonts.size.xxxxSmall,
              },
            },
          }}
        />
      </>
    ),
    [selected, disableBookedDates],
  );

  return (
    <>
      <RBSheet
        ref={sheetRef}
        height={480}
        openDuration={250}
        onClose={() => {
          setShowPaymentSheet(false);
          setRadioBoxCheck('');
          showBookingCalendar && setShowCalendar(true);
        }}
        closeOnDragDown={true}
        dragFromTopOnly={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,.5)',
          },
          draggableIcon: {
            backgroundColor: 'rgba(172, 172, 176, 0.24);',
          },
          container: styles.RBSheetContainer,
        }}>
        {showCalendar ? (
          renderCalendar
        ) : (
          <View
            style={{flex: 1, paddingBottom: Platform.OS == 'ios' ? 40 : 15}}>
            {
              <>
                <Text color={'#1E1E20'} size={18} type={Fonts.type.bold}>
                  {strings.SELECT_PAYMENT_METHOD}
                </Text>
                <Text size={12} color={'#acacb0cc'} style={AppStyles.mTop5}>
                  {strings.PAYMENT_METHOD_AVAILALE}
                </Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={paymentOption}
                  renderItem={({item}) => {
                    if (Platform.OS == 'android' && item.id == 3) {
                      return true;
                    }
                    return (
                      <PaymentOption
                        item={item}
                        radioBoxCheck={radioBoxCheck}
                        setRadioBoxCheck={setRadioBoxCheck}
                      />
                    );
                  }}
                />
                <Button
                  style={[styles.RBSheetButton]}
                  color={Colors.white}
                  onPress={() => handlePaymentOptionButton()}
                  // onPress={payNowHandler}
                  hasLinear
                  disabled={
                    (radioBoxCheck === '' || radioBoxCheck === 'Credi Card') &&
                    true
                  }>
                  {strings.PAY_NOW}
                </Button>
              </>
            }
          </View>
        )}
      </RBSheet>

      {/* modal */}
      <ModalView
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        modalButtonPress={handleEnrollButtonPress}
        image={Images.modalIcon}
        heading={ModalHeading}
        description={ModalDescription}
        buttonText={buttonText()}
      />
    </>
  );
};

PaymentSheet.propTypes = {
  showBookingCalendar: PropTypes.bool,
};

PaymentSheet.defaultProps = {
  showBookingCalendar: false,
};

export default PaymentSheet;
