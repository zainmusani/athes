// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    marginTop: 20,
    flex: 1,
  },

  hiddenTap: {
    position: 'absolute',
    bottom: 10,
    height: 55,
    width: '100%',
    left: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 0,
  },

  detailStyle: {
    width: '100%',
    height: 100,
    textAlignVertical: 'top',
    borderBottomWidth: 1,
    borderColor: Colors.grey2,
    ...AppStyles.paddingVerticalBase,
    marginBottom: 10,
    color: Colors.white,
  },
});
