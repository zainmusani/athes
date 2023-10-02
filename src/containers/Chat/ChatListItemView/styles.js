// @flow
import {StyleSheet} from 'react-native';
import {AppStyles, Colors, Metrics, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: Metrics.baseMargin,
    backgroundColor: Colors.background.primary,
  },
  chatMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  chatView: {
    flexDirection: 'row',
    flex: 1,
  },
  profileNameView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 10,
  },
  profileName: {
    fontSize: 16,
    fontFamily: Fonts.type.medium,
    fontWeight: '600',
    color: Colors.white,
    ...AppStyles.mBottom5,
  },
  subtitle: {
    color: Colors.white,
    fontSize: 14,
  },
  date: {
    ...AppStyles.mTop10,
    fontSize: 14,
    color: Colors.white,
  },
  border: {
    borderWidth: 0.3,
    borderColor: 'rgba(60, 60, 67, 0.1);',
    marginBottom: 13,
    marginLeft: 65,
  },
  profilePicStyle: {
    height: 56,
    width: 56,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  profileNameAndLastMessageCont: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 56,
    flex: 0.89,
  },
  rightArrowIcon: {
    tintColor: Colors.grey2,
    resizeMode: 'contain',
    flex: 0.05,
  },
});
