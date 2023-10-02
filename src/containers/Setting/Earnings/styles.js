// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  viewAddCard: {paddingHorizontal: 5, marginTop: 30, flexDirection: 'row'},
  txtAddCard: {flex: 1, color: Colors.white},
  imgAddCard: {height: 15, width: 15, tintColor: Colors.white},
});
