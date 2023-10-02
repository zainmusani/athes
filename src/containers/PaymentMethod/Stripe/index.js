// @flow
import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';
import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import {addCreditCardRequest} from '../../../actions/PaymentsActions';
import {Button, ScreenWrapper} from '../../../components';
import {strings, stripeKeys} from '../../../constants';
import {AppStyles, Colors} from '../../../theme';
import util from '../../../util';
import styles from './styles';

const Stripe = props => {
  const {setIsNewPayment, isFromCart} = props || {};
  const [isValidInfoEntered, setIsValidInfoEntered] = useState(() => false);
  const [isSendingDataToServer, setIsSendingDataToServer] = useState(
    () => false,
  );
  const dispatch = useDispatch();
  const stripe = useStripe();

  async function onAddCardPressHandler() {
    setIsSendingDataToServer(true);
    await stripe
      .createToken({type: 'Card'})
      .then(tokenObj => {
        if (util.hasObjectWithKey(tokenObj, 'error')) {
          util.topAlertError(
            tokenObj?.error?.message ?? strings.SOMETHING_WENT_WRONG,
          );
          setIsSendingDataToServer(false);
          return;
        }

        const payload = {
          token: tokenObj?.token?.id,
        };

        dispatch(
          addCreditCardRequest(payload, res => {
            if (!!res) {
              isFromCart && setIsNewPayment(true);
              Actions.pop();
            }

            setIsSendingDataToServer(false);
          }),
        );
      })
      .catch(error => {
        setIsSendingDataToServer(false);
        util.topAlertError(error);
      });
  }

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.STRIPE}>
      <View style={styles.stripeInputCont}>
        <StripeProvider
          publishableKey={stripeKeys.publishableKey}
          urlScheme="your-url-scheme"
          threeDSecureParams={{
            backgroundColor: Colors.background.primary, // iOS only
            timeout: 5,
            label: {
              headingTextColor: Colors.text.primary,
              headingFontSize: 13,
            },
            navigationBar: {
              headerText: '3d secure',
            },
            footer: {
              // iOS only
              backgroundColor: Colors.background.primary,
            },
            submitButton: {
              backgroundColor: Colors.background.purple,
              cornerRadius: 12,
              textColor: Colors.text.primary,
              textFontSize: 14,
            },
          }}>
          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: 'Card Number',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={cardDetails => {
              setIsValidInfoEntered(cardDetails?.complete ?? false);
            }}
            onFocus={focusedField => {}}
          />
          <Button
            color={Colors.white}
            onPress={onAddCardPressHandler}
            isLoading={isSendingDataToServer}
            disabled={!!!isValidInfoEntered || !!isSendingDataToServer}
            style={[styles.addToCardButton]}
            textStyle={styles.addCardText}>
            {strings.ADD_CARD}
          </Button>
        </StripeProvider>
      </View>
    </ScreenWrapper>
  );
};

Stripe.propTypes = {};
Stripe.defaultProps = {};

const mapStateToProps = ({}) => ({});
export default connect(mapStateToProps, null)(Stripe);
