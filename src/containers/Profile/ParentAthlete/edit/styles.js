// @flow
import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts} from '../../../../theme';

export default StyleSheet.create({
  // Form Styling
  formContainer: {
    ...AppStyles.pTop30,
    ...AppStyles.pBottom30,
    paddingHorizontal: 50,
  },
  radioButtonStyles: {
    ...AppStyles.mBottom20,
    borderWidth: 1,
    borderColor: Colors.grey2,
    flexDirection: 'row',
    alignItems: 'center',
    ...AppStyles.padding10,
    borderRadius: 10,
    width: '48%',
  },

  hiddenTap: {
    position: 'absolute',
    bottom: 0,
    height: 60,
    width: '100%',
    left: 0,
    backgroundColor: 'transparent',
    borderRadius: 0,
  },
  selectedItem: {
    backgroundColor: Colors.purple1,
    width: '48%',
    borderRadius: 8,
    ...AppStyles.padding10,
    alignItems: 'center',
    ...AppStyles.mTop10,
  },
});
