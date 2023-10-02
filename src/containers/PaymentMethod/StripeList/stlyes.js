// @flow
import {StyleSheet} from 'react-native';
import {Fonts, AppStyles, Colors} from '../../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background.tertiary,
    flex: 1,
    paddingTop: 50,
  },
  payment: {
    color: Colors.text.primary,
    fontSize: Fonts.size.medium,
    fontWeight: '700',
    paddingLeft: 5,
    marginTop: 30,
  },
  paymentView: {
    paddingHorizontal: 20,

    backgroundColor: Colors.black,
  },
  viewAddCard: {paddingHorizontal: 25, marginTop: 30, flexDirection: 'row'},
  txtAddCard: {flex: 1, color: Colors.white},
  imgAddCard: {height: 15, width: 15, tintColor: Colors.white},
  checkoutBtn: {
    backgroundColor: Colors.primary,
    marginTop: 30,
    alignSelf: 'center',
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  emptyListTxt: {
    color: Colors.white,
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.base,
  },
  emptyListView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
});
