// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles, Fonts} from '../../../theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },

  heading: {
    color: Colors.white,
    fontSize: 24,
    fontFamily: Fonts.type.medium,
    marginTop: 20,
    width: '60%',
    textAlign: 'center',
  },

  textInputView: {
    marginTop: 30,
  },

  textInput: {
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.purple1,
    borderRadius: 10,
    backgroundColor: Colors.lightPurple,
    marginTop: 10,
    paddingHorizontal: 20,
    color: Colors.blue2,
    minHeight: 45,
  },

  textArea: {
    width: '100%',
    borderWidth: 2,
    borderColor: Colors.purple1,
    borderRadius: 10,
    backgroundColor: Colors.lightPurple,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
    color: Colors.blue2,
    minHeight: 160,
  },
});
