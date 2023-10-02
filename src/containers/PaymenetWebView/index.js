// @flow
import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {WebView} from 'react-native-webview';
import {connect, useDispatch, useSelector} from 'react-redux';
import {enrollEventRequest} from '../../actions/EventsActions';
import {bookFacilityRequest} from '../../actions/Facility';
import {
  afterAddWithdrawCard,
  athesCartData,
} from '../../actions/GeneralActions';
import {bookMeetingRequest} from '../../actions/MeetingsActions';
import {
  paymentCheckoutRequest,
  venmoAppovalRequest,
  venmoCheckoutRequest,
  withDrawAddCardRequest,
} from '../../actions/PaymentsActions';
import {enrollSeasonRequest} from '../../actions/SeasonsActions';
import {enrollSessionRequest} from '../../actions/SessionsActions';
import {ModalView, ScreenWrapper, Text} from '../../components';
import {strings, RESOURCETYPE} from '../../constants';
import {Colors, Images} from '../../theme';
import util from '../../util';
import styles from './styles';

const PaymentWebView = props => {
  const {
    webViewUrl,
    eventId,
    ids,
    sessionId,
    seasonId,
    bookingDate,
    setModalVisible,
    facilityServiceId,
    amount,
    paymentMethod,
    slotId,
    title,
    stripeAccountId,
    resourceType,
    isComingFromDeepLinkUrl,
    deepLinkData,
  } = props;
  
  const dispatch = useDispatch();

  const [paymentPopup, setPaymentPopup] = useState(false);

  useEffect(() => {
    if (isComingFromDeepLinkUrl) {
      afterSuccessPayment();
      setPaymentPopup(true);
    }
  }, []);

  const Spinner = () => (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="small" color={Colors.black} />
    </View>
  );

  const handleNavigation = event => {

    const {title} = event;
    if (
      (event?.url?.includes('paypal-success') && !util.isEmptyValue(title)) ||
      isComingFromDeepLinkUrl
    ) {
      afterSuccessPayment();
    } else if (event?.url?.includes('fail')) {
      Actions.pop();
      util.topAlertError(strings.PAYMENT_SUCCESSFULLY_FAILED);
    }
  };

  const onMessageEvent = event => {
    console.log('event ', event);
    if (
      util.areValuesEqual(event.nativeEvent.data, 'accountCreationComplete')
    ) {
      const payload = {
        stripeAccountId: stripeAccountId,
      };

      dispatch(
        withDrawAddCardRequest(payload, res => {
          if (res) {
            Actions.pop();
            dispatch(afterAddWithdrawCard(true));
          }
        }),
      );
      util.topAlert('Account added Successfully');
    }

    // let data = JSON.parse(event.nativeEvent.data);
    // const {nonce} = data.payload;
    // const payload = {
    //   amount: amount,
    //   token: nonce,
    // };
    // dispatch(
    //   venmoCheckoutRequest(payload, res => {
    //     if (res) {
    //       afterSuccessPayment();
    //     }
    //   }),
    // );
  };

  const backScreen = () => {
    Actions.deepLinkScreen({done: new Date()});
  };

  const afterSuccessPayment = () => {
    if (util.areValuesEqual(resourceType, RESOURCETYPE.EVENT)) {
      dispatch(
        enrollEventRequest(
          {
            eventId: eventId || deepLinkData?.resourceId,
            ids: ids || deepLinkData?.ids,
          },
          res => {
            if (!util.isArrayEmpty(res)) {
              const payload = {
                resourceId: eventId || deepLinkData?.resourceId,
                resourceType: 'event',
                amount: amount || deepLinkData?.amount,
                paymentType:
                  paymentMethod || deepLinkData?.selectedPaymentMethod,
                enrollmentIds: res,
              };
              dispatch(
                paymentCheckoutRequest(payload, res => {
                  dispatch(athesCartData({}));
                  if (res && !isComingFromDeepLinkUrl) {
                    Actions.pop();
                    setTimeout(() => {
                      setModalVisible(true);
                    }, 300);
                  }
                }),
              );
            }
          },
        ),
      );
    } else if (util.areValuesEqual(resourceType, RESOURCETYPE.SEASON)) {
      dispatch(
        enrollSeasonRequest(
          {
            seasonId: seasonId || deepLinkData?.resourceId,
            ids: ids || deepLinkData?.ids,
          },
          res => {
            if (!util.isArrayEmpty(res)) {
              const payload = {
                resourceId: seasonId || deepLinkData?.resourceId,
                resourceType: 'season',
                amount: amount || deepLinkData?.amount,
                paymentType:
                  paymentMethod || deepLinkData?.selectedPaymentMethod,
                enrollmentIds: res,
              };
              dispatch(
                paymentCheckoutRequest(payload, res => {
                  dispatch(athesCartData({}));
                  if (res && !isComingFromDeepLinkUrl) {
                    Actions.pop();
                    setTimeout(() => {
                      setModalVisible(true);
                    }, 300);
                  }
                }),
              );
            }
          },
        ),
      );
    } else if (util.areValuesEqual(resourceType, RESOURCETYPE.SESSION)) {
      dispatch(
        enrollSessionRequest(
          {
            sessionId: sessionId || deepLinkData?.resourceId,
            ids: ids || deepLinkData?.ids,
          },
          res => {
            if (!util.isArrayEmpty(res)) {
              const payload = {
                resourceId: sessionId || deepLinkData?.resourceId,
                resourceType: 'session',
                amount: amount || deepLinkData?.amount,
                paymentType:
                  paymentMethod || deepLinkData?.selectedPaymentMethod,
                enrollmentIds: res,
              };
              dispatch(
                paymentCheckoutRequest(payload, res => {
                  dispatch(athesCartData({}));
                  if (res && !isComingFromDeepLinkUrl) {
                    Actions.pop();
                    setTimeout(() => {
                      setModalVisible(true);
                    }, 300);
                  }
                }),
              );
            }
          },
        ),
      );
    } else if (util.areValuesEqual(resourceType, RESOURCETYPE.FACILITY)) {
      dispatch(
        bookFacilityRequest(
          {
            facilityServiceId: facilityServiceId || deepLinkData?.resourceId,
            bookingDate: bookingDate || deepLinkData?.selectedDate,
          },
          res => {
            if (!util.isArrayEmpty(res)) {
              const payload = {
                resourceId: facilityServiceId || deepLinkData?.resourceId,
                resourceType: 'facility',
                amount: amount || deepLinkData?.amount,
                paymentType:
                  paymentMethod || deepLinkData?.selectedPaymentMethod,
                enrollmentIds: res,
              };
              dispatch(
                paymentCheckoutRequest(payload, res => {
                  dispatch(athesCartData({}));
                  if (res && !isComingFromDeepLinkUrl) {
                    Actions.pop();
                    setTimeout(() => {
                      setModalVisible(true);
                    }, 300);
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
            slotId: slotId || deepLinkData?.slotId,
          },
          res => {
            if (!util.isArrayEmpty(res)) {
              const payload = {
                resourceId: slotId || deepLinkData?.slotId,
                resourceType: 'meeting',
                amount: amount || deepLinkData?.amount,
                paymentType:
                  paymentMethod || deepLinkData?.selectedPaymentMethod,
                enrollmentIds: res,
              };
              dispatch(
                paymentCheckoutRequest(payload, res => {
                  dispatch(athesCartData({}));
                  if (res && !isComingFromDeepLinkUrl) {
                    setTimeout(() => {
                      setModalVisible(true);
                    }, 300);
                  }
                }),
              );
            }
          },
        ),
      );
    }
  };

  const renderWebView = useMemo(() => {
    if (util.isFieldNil(webViewUrl)) {
      return (
        <Text style={styles.unableToGetUrlText}>
          {strings.SORRY_UNABLE_TO_GET_URL}
        </Text>
      );
    }

    return (
      <>
        <WebView
          originWhitelist={['*']}
          source={{uri: webViewUrl}}
          bounces={false}
          startInLoadingState={true}
          renderLoading={Spinner}
          style={styles.container}
          showsHorizontalScrollIndicator={false}
          scalesPageToFit
          onNavigationStateChange={handleNavigation}
          onMessage={event => onMessageEvent(event)}
        />
      </>
    );
  }, [webViewUrl]);

  return (
    <ScreenWrapper pageBackground={Colors.black} hasBack headerTitle={title}>
      <View style={styles.container}>{renderWebView}</View>
      {/* modal */}
      <ModalView
        isModalVisible={paymentPopup}
        setModalVisible={setPaymentPopup}
        modalButtonPress={backScreen}
        image={Images.modalIcon}
        heading={'Payment Successful'}
        description={'Your payment has been done.'}
        buttonText={'Done'}
      />
    </ScreenWrapper>
  );
};

PaymentWebView.propTypes = {};
PaymentWebView.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(PaymentWebView);
