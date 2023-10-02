// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },

  heading: {
    marginTop: 20,
  },

  radioButtonStyles: {
    ...AppStyles.mBottom20,
    borderWidth: 1,
    borderColor: Colors.grey2,
    flexDirection: 'row',
    alignItems: 'center',
    ...AppStyles.padding10,
    borderRadius: 10,
  },

  textArea: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.grey2,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    color: Colors.white,
    minHeight: 160,
  },
});
