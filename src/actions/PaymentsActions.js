// @flow

import {
  ADD_CREDIT_CARD,
  ADD_WITHDRAW_CARD,
  CHECKOUT_CARD,
  CREATE_STRIPE_TOKEN,
  DELETE_CARD,
  DELETE_CARD_LIST,
  GET_CARD_LIST,
  PAYMENT_CHECKOUT,
  PAYPAL_APPOVAL,
  VENMO_APPOVAL,
  VENMO_CHECKOUT,
  WITHDRAW_PAYMENT_CARD,
} from './ActionTypes';

export function createStripeTokenRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CREATE_STRIPE_TOKEN.REQUEST,
  };
}

export function createStripeTokenSuccess(data) {
  return {
    data,
    type: CREATE_STRIPE_TOKEN.SUCCESS,
  };
}

export function addCreditCardRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ADD_CREDIT_CARD.REQUEST,
  };
}

export function addCreditCardSuccess(data) {
  return {
    data,
    type: ADD_CREDIT_CARD.SUCCESS,
  };
}

export function getCardListRequest(params, responseCallback) {
  return {
    params,
    responseCallback,
    type: GET_CARD_LIST.REQUEST,
  };
}

export function getCardListSuccess(data) {
  return {
    data,
    type: GET_CARD_LIST.SUCCESS,
  };
}
export function checkoutCardRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: CHECKOUT_CARD.REQUEST,
  };
}

export function CheckoutCardSuccess(data) {
  return {
    data,
    type: CHECKOUT_CARD.SUCCESS,
  };
}
export function deleteCardRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DELETE_CARD.REQUEST,
  };
}

export function deleteCardSuccess(data) {
  return {
    data,
    type: DELETE_CARD.SUCCESS,
  };
}
export function paypalAppovalRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: PAYPAL_APPOVAL.REQUEST,
  };
}

export function paypalAppovalSuccess(data) {
  return {
    data,
    type: PAYPAL_APPOVAL.SUCCESS,
  };
}
export function venmoAppovalRequest(parameter, responseCallback) {
  return {
    parameter,
    responseCallback,
    type: VENMO_APPOVAL.REQUEST,
  };
}

export function venmoAppovalSuccess(data) {
  return {
    data,
    type: VENMO_APPOVAL.SUCCESS,
  };
}
export function paymentCheckoutRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: PAYMENT_CHECKOUT.REQUEST,
  };
}

export function paymentCheckoutSuccess(data) {
  return {
    data,
    type: PAYMENT_CHECKOUT.SUCCESS,
  };
}
export function withDrawAddPaymentRequest(responseCallback) {
  return {
    responseCallback,
    type: ADD_WITHDRAW_CARD.REQUEST,
  };
}

export function withDrawAddPaymentSuccess(data) {
  return {
    data,
    type: ADD_WITHDRAW_CARD.SUCCESS,
  };
}
export function withDrawAddCardRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: WITHDRAW_PAYMENT_CARD.REQUEST,
  };
}

export function withDrawAddCardSuccess(data) {
  return {
    data,
    type: WITHDRAW_PAYMENT_CARD.SUCCESS,
  };
}
export function venmoCheckoutRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: VENMO_CHECKOUT.REQUEST,
  };
}

export function venmoCheckoutSuccus(data) {
  return {
    data,
    type: VENMO_CHECKOUT.SUCCESS,
  };
}
