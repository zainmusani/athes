// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../../theme';

export default StyleSheet.create({
  header: {},

  headerTop: {
    flexDirection: 'row',
    ...AppStyles.paddingHorizontalBase,
    justifyContent: 'space-between',
  },
  container: {
    ...AppStyles.paddingHorizontalBase,
  },
  slide: {
    alignItems: 'center',
    marginRight: 15,
    maxWidth: 70,
  },
  slideImage: {
    width: 52,
    height: 52,
    borderRadius: 52,
    borderWidth: 1,
    borderColor: Colors.white,
    overflow: 'hidden',
    marginBottom: 3,
  },
  writeArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    backgroundColor: Colors.white,
    ...AppStyles.mBottom10,
  },
  writeLeftImage: {
    width: 38,
    height: 38,
    borderRadius: 38,
    overflow: 'hidden',
  },
  writeRightImage: {
    marginRight: 15,
  },
  writeField: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
});
