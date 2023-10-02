import {take, put, call, fork} from 'redux-saga/effects';
import {
  ADD_CREDIT_CARD,
  ADD_EVENT,
  PAYMENT_CHECKOUT,
  CHECKOUT_CARD,
  CREATE_STRIPE_TOKEN,
  DELETE_CARD,
  GET_CARD_LIST,
  PAYPAL_APPOVAL,
  VENMO_APPOVAL,
  ADD_WITHDRAW_CARD,
  VENMO_CHECKOUT,
  WITHDRAW_PAYMENT_CARD,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, strings} from '../constants';

import {
  CREATE_STRIPE_TOKEN as CREATE_STRIPE_TOKEN_URL,
  ADD_CREDIT_CARD as ADD_CREDIT_CARD_URL,
  GET_CARD_LIST as GET_CARD_LIST_URL,
  DELETE_CARD as DELETE_CARD_URL,
  PAYPAL_APPOVAL as PAYPAL_APPOVAL_URL,
  VENMO_APPOVAL as VENMO_APPOVAL_URL,
  PAYMENT_CHECKOUT as PAYMENT_CHECKOUT_URL,
  CHECKOUT_CARD as CHECKOUT_CARD_URL,
  ADD_WITHDRAW_CARD as ADD_WITHDRAW_CARD_URL,
  VENMO_CHECKOUT as VENMO_CHECKOUT_URL,
  WITHDRAW_PAYMENT_CARD as WITHDRAW_PAYMENT_CARD_URL,
  callRequest,
} from '../config/WebService';

import ApiSauce from '../services/ApiSauce';
import {
  addCreditCardSuccess,
  cashPaySuccess,
  CheckoutCardSuccess,
  createStripeTokenSuccess,
  deleteCardSuccess,
  getCardListSuccess,
  paymentCheckoutSuccess,
  paypalAppovalSuccess,
  venmoAppovalSuccess,
  withDrawAddCardSuccess,
  withDrawAddPaymentSuccess,
} from '../actions/PaymentsActions';
import {
  manipulateCreditCardListData,
  manipulateCreditCardListDatamanipulateCreditCardListData,
  manipulateCreditCardObject,
} from '../helpers/paymentHelper';
import util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    util.topAlert(message, type);
  }, SAGA_ALERT_TIMEOUT);
}

function* createStripeToken() {
  while (true) {
    const {payload, responseCallback} = yield take(CREATE_STRIPE_TOKEN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CREATE_STRIPE_TOKEN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(createStripeTokenSuccess(response.data));
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(false, null);
        alert(response.message);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* addCreditCard() {
  while (true) {
    const {payload, responseCallback} = yield take(ADD_CREDIT_CARD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_CREDIT_CARD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          addCreditCardSuccess(manipulateCreditCardObject(response?.data)),
        );
        if (responseCallback) responseCallback(response.status);
        util.topAlert(response?.message ?? strings.YOUR_CARD_HAS_BEEN_ADDED);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* getCardList() {
  while (true) {
    const {params, responseCallback} = yield take(GET_CARD_LIST.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_CARD_LIST_URL,
        {},
        params,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(
          getCardListSuccess(manipulateCreditCardListData(response?.data)),
        );
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* deleteCard() {
  while (true) {
    const {payload, responseCallback} = yield take(DELETE_CARD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_CARD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(deleteCardSuccess(payload));
        if (responseCallback) responseCallback(response.status);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* paypalAppoval() {
  while (true) {
    const {parameter, responseCallback} = yield take(PAYPAL_APPOVAL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        PAYPAL_APPOVAL_URL,
        {},
        parameter,
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(paypalAppovalSuccess(response?.data));
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* venmoAppoval() {
  while (true) {
    const {parameter, responseCallback} = yield take(VENMO_APPOVAL.REQUEST);
    try {
      const response = yield call(
        callRequest,
        VENMO_APPOVAL_URL,
        parameter,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(venmoAppovalSuccess(response?.data));
        if (responseCallback) responseCallback(response?.data?.url);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

function* checkoutCard() {
  while (true) {
    const {payload, responseCallback} = yield take(CHECKOUT_CARD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHECKOUT_CARD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(CheckoutCardSuccess(response?.data));
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* paymentCheckout() {
  while (true) {
    const {payload, responseCallback} = yield take(PAYMENT_CHECKOUT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        PAYMENT_CHECKOUT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(paymentCheckoutSuccess(response?.data));
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* withdrawAddCard() {
  while (true) {
    const {responseCallback} = yield take(ADD_WITHDRAW_CARD.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ADD_WITHDRAW_CARD_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(withDrawAddPaymentSuccess(response?.data));
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* withDrawAddCard() {
  while (true) {
    const {payload, responseCallback} = yield take(
      WITHDRAW_PAYMENT_CARD.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        WITHDRAW_PAYMENT_CARD_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(withDrawAddCardSuccess(response?.data));
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}
function* venmoCheckout() {
  while (true) {
    const {payload, responseCallback} = yield take(VENMO_CHECKOUT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        VENMO_CHECKOUT_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(response.data);
      } else {
        if (responseCallback) responseCallback(response.status);
        alert(response?.message ?? strings.SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(false);
      alert(err?.message ?? strings.SOMETHING_WENT_WRONG);
    }
  }
}

export default function* root() {
  yield fork(createStripeToken);
  yield fork(addCreditCard);
  yield fork(getCardList);
  yield fork(paypalAppoval);
  yield fork(deleteCard);
  yield fork(venmoAppoval);
  yield fork(paymentCheckout);
  yield fork(checkoutCard);
  yield fork(withdrawAddCard);
  yield fork(venmoCheckout);
  yield fork(withDrawAddCard);
}
