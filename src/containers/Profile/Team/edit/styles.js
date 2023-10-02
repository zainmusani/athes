// @flow
import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Fonts} from '../../../../theme';

export default StyleSheet.create({
  // Form Styling
  formContainer: {
    ...AppStyles.pTop30,
    ...AppStyles.pBottom30,
    paddingHorizontal: 50,
    backgroundColor: Colors.black,
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

  // selected interest
  hiddenTap: {
    position: 'absolute',
    height: 50,
    width: '100%',
    left: 0,
    top: 40,
    margin: 'auto',
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 0,
  },

  selectedItem: {
    backgroundColor: Colors.purple1,
    width: '48%',
    borderRadius: 8,
    alignItems: 'center',
    ...AppStyles.padding10,
    ...AppStyles.mTop10,
  },
});
