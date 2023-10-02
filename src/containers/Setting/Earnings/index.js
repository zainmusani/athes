import React, {useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {withDrawAddPaymentRequest} from '../../../actions/PaymentsActions';
import {
  earningsRequest,
  withdrawalRequest,
} from '../../../actions/GeneralActions';
import {
  Text,
  ScreenWrapper,
  ButtonView,
  Button,
  ModalView,
  Loader,
} from '../../../components';
import {strings} from '../../../constants';
import _ from 'lodash';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import util from '../../../util';
import styles from './styles';

const Earnings = props => {
  const {refreshNow, tab} = props;
  const {earnings} = useSelector(state => state.general);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getEarningsDetail();
  }, []);

  const getEarningsDetail = () => {
    setLoading(true);
    dispatch(
      earningsRequest({}, res => {
        setLoading(false);
      }),
    );
  };

  const withdrawRequest = () => {
    dispatch(
      withdrawalRequest({amount: earnings?.availableAmount}, res => {
        if (res) {
          getEarningsDetail();
          setTimeout(() => {
            setModalVisible(true);
          }, 300);
        }
      }),
    );
  };

  const addToCardApi = () => {
    setLoading(true);
    dispatch(
      withDrawAddPaymentRequest(res => {
        setLoading(false);
        if (!_.isEmpty(res?.url)) {
          Actions.jump('paymentWebView', {
            webViewUrl: res?.url,
            title: '',
            stripeAccountId: res?.stripeAccountId,
          });
        }
      }),
    );
  };

  const renerWithDrawCardList = () => {
    return (
      <TouchableOpacity
        onPress={() => addToCardApi()}
        style={styles.viewAddCard}>
        <Text style={styles.txtAddCard}>Add Card</Text>
        <Image style={styles.imgAddCard} source={Images.add} />
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.EARNINGS}>
      {!loading && (
        <View style={styles.container}>
          <View>
            <View
              style={{
                ...AppStyles.flexRow,
                ...AppStyles.spaceBetween,
                ...AppStyles.paddingVerticalBase,
              }}>
              <Text color={Colors.white} size={20}>
                Total Earnings:
              </Text>
              <Text color={Colors.white} size={20}>
                {`$${earnings?.totalAmount}`}
              </Text>
            </View>
            <View
              style={{
                ...AppStyles.flexRow,
                ...AppStyles.spaceBetween,
                ...AppStyles.paddingVerticalBase,
              }}>
              <Text color={Colors.white} size={20}>
                Withdrawn Amount:
              </Text>
              <Text color={Colors.white} size={20}>
                {`$${earnings?.withdrawalAmount}`}
              </Text>
            </View>
            <View
              style={{
                ...AppStyles.flexRow,
                ...AppStyles.spaceBetween,
                ...AppStyles.paddingVerticalBase,
              }}>
              <Text color={Colors.white} size={20}>
                Expected Earnings:
              </Text>
              <Text color={Colors.white} size={20}>
                {`$${earnings?.expectedAmount}`}
              </Text>
            </View>
            <View
              style={{
                ...AppStyles.flexRow,
                ...AppStyles.spaceBetween,
                ...AppStyles.paddingVerticalBase,
              }}>
              <Text color={Colors.white} size={20}>
                Ready for Withdrawal Amount:
              </Text>
              <Text color={Colors.white} size={20}>
                {`$${earnings?.availableAmount}`}
              </Text>
            </View>
          </View>
          {!earnings?.hasAccount && renerWithDrawCardList()}
          {earnings?.hasAccount && (
            <View style={{flex: 1, marginTop: 150}}>
              <Button
                onPress={() => withdrawRequest()}
                disabled={earnings?.availableAmount == 0}
                raised
                isLoading={loading}
                style={{...AppStyles.mBottom15}}>
                {`Request for Withdraw`}
              </Button>
            </View>
          )}
        </View>
      )}

      <Loader loading={loading} />
      {/* modal */}
      <ModalView
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        image={Images.modalIcon}
        heading={'Withdrawal Success'}
        description={'Withdraw request has been sent to admin.'}
        buttonText={'Done'}
      />
    </ScreenWrapper>
  );
};

export default Earnings;
