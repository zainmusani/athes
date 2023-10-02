// @flow
import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import React, {useMemo, useEffect, useState} from 'react';
import _ from 'lodash';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {
  checkoutCardRequest,
  deleteCardRequest,
  getCardListRequest,
} from '../../../actions/PaymentsActions';
import {Button, CustomNavbar, Loader, ScreenWrapper} from '../../../components';
import PaymentComponent from '../../../components/PaymentListComponent';
import {strings, RESOURCETYPE, stripeKeys} from '../../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import util from '../../../util';
import styles from './stlyes';

const StripeCardList = props => {
  const {
    cardsList,
    resourceType,
    slotId,
    afterSuccessPaymentAddResource,
    resourceId,
    isSetting,
  } = props || {};

  const [selectedPaymentId, setSelectedPaymentId] = useState(() =>
    util.isArrayEmpty(cardsList) ? 0 : cardsList[0].id,
  );
  const [isLoading, setIsLoading] = useState(() => false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getCardListRequest({}, res => {
        if (!util.isArrayEmpty(res)) {
          setSelectedPaymentId(res[0].cardId);
        }
      }),
    );
  }, []);
  useEffect(() => {
    if (!util.isArrayEmpty(cardsList)) {
      if (
        !util.areValuesEqual(
          selectedPaymentId,
          util.isArrayEmpty(cardsList) ? '' : cardsList[0].id,
        )
      ) {
        setSelectedPaymentId(
          util.isArrayEmpty(cardsList) ? '' : cardsList[0].id,
        );
      }
    }
  }, [cardsList]);

  const selectedId = id => {
    setSelectedPaymentId(id);
  };
  const onDeleteIconPress = id => {
    setIsLoading(true);
    const payload = {
      card_id: id,
    };
    dispatch(
      deleteCardRequest(payload, res => {
        setIsLoading(false);
      }),
    );
  };
  const renderPayment = useMemo(() => {
    return (
      <View style={[styles.paymentView, cardsList.length > 5 && {flex: 0.8}]}>
        <FlatList
          data={cardsList}
          renderItem={({item}) => {
            return (
              <PaymentComponent
                item={item}
                selectedPaymentId={selectedPaymentId}
                selectedId={selectedId}
                isSettingScreen={true}
                onDeleteIconPress={onDeleteIconPress}
              />
            );
          }}
          keyExtractor={(_, index) => index}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyListView}>
                <Text style={styles.emptyListTxt}>There is no card.</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }, [cardsList, selectedPaymentId]);

  const renerAddToCardList = () => {
    return (
      <TouchableOpacity
        onPress={() => Actions.jump('stripe')}
        style={styles.viewAddCard}>
        <Text style={styles.txtAddCard}>Add Card</Text>
        <Image style={styles.imgAddCard} source={Images.add} />
      </TouchableOpacity>
    );
  };

  const onClickCheckout = () => {
    setIsLoading(true);
    const payload = {
      resourceType: resourceType,
      resourceId: resourceId,
      cardId: selectedPaymentId,
    };
    dispatch(
      checkoutCardRequest(payload, res => {
        if (res) {
          Actions.pop();
          afterSuccessPaymentAddResource(resourceType, 'Stripe');
        }
        setIsLoading(false);
      }),
    );
  };

  const renderCheckoutBtn = () => {
    return (
      <TouchableOpacity
        disabled={_.isEmpty(selectedPaymentId) ? true : false}
        onPress={() => onClickCheckout()}
        style={styles.checkoutBtn}>
        <Text>Checkout</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.CARD_LIST}>
      <View style={{flex: 1}}>
        {renderPayment}
        {renerAddToCardList()}
        {!isSetting && renderCheckoutBtn()}
        <Loader loading={isLoading} />
      </View>
    </ScreenWrapper>
  );
};

StripeCardList.propTypes = {};
StripeCardList.defaultProps = {};

const mapStateToProps = ({payment}) => ({
  cardsList: payment.cardsList,
});
export default connect(mapStateToProps, null)(StripeCardList);
