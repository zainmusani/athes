import _ from 'lodash';
import util from '../util';

export function manipulateCreditCardListData(list) {
  if (util.isArrayEmpty(list)) return [];
  let mCreditCardList = [];

  list.forEach((item, index) => {
    let mCreditCard = manipulateCreditCardObject(item, index);
    mCreditCardList.push(mCreditCard);
  });

  return mCreditCardList;
}

export function manipulateCreditCardObject(item, index = -1) {
  let mCreditCard = {};
  mCreditCard.id = item?.id ?? index;
  mCreditCard.brand = item?.brand ?? '';
  mCreditCard.complete = item?.complete ?? false;
  mCreditCard.country = item?.country ?? '';
  mCreditCard.expiryMonth = item?.expMonth ?? 0;
  mCreditCard.expiryYear = item?.expYear ?? 0;
  mCreditCard.last4 = item?.last4 ?? '';
  mCreditCard.postalCode = item?.postalCode ?? '';
  mCreditCard.number = item?.number ?? '';
  mCreditCard.cvc = item?.cvc ?? '123';
  mCreditCard.isSelected = item?.isSelected ?? false;
  return mCreditCard;
}

export function manipulateInvestmentData(data) {
  if (_.isEmpty(data)) return [];

  let list = data?.map(res => {
    res = {
      sessionId: res?.resourceId ?? -1,
      title: res?.title ?? '',
      itemDate: '$' + (res?.amount ?? '0'),
      paymentType: res?.paymentType ?? '',
      status: res?.status ?? '',
      resourceType: res?.resourceType ?? '',
    };
    return res;
  });

  return list;
}
