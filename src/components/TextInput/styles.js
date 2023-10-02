// @flow
import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts, AppStyles } from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderBottomColor: Colors.grey1,
    borderBottomWidth: 1,
    padding: 12,
    marginTop: 8,
    fontFamily: Fonts.type.base,
    color: Colors.white,
    fontSize: Fonts.size.normal,
    lineHeight: Fonts.size.normal,
    flexGrow: 1,
  },
  inputIcon: {
    marginRight: -18,
    marginTop: 5,
  },
  eyeIconWrap: {
    marginLeft: -25,
    height: 60,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  eyeIconStyle: {
    width: 24,
    height: 19,
    tintColor: Colors.white,
  },
  eyeHideIconStyle: {
    width: 22,
    height: 10,
    tintColor: Colors.white,
  },

  buttonOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: 18 * 0.58,
    height: 18,
    ...AppStyles.mRight10,
  },
  multilineInput: {
    // height: 90,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: 'top',
  },
  textInputCont: {
    color: Colors.white,
    width: '120%',
    height: 50,
    paddingRight: 25,
    backgroundColor: Colors.black,
    ...AppStyles.mBottom10,
  },
  _textContainerStyle: {
    backgroundColor: Colors.black,
    paddingLeft: 0,
  },
  _textInputStyle: {
    padding: 0,
    color: Colors.white,
    fontSize: Fonts.size.normal,
    height: 50,
  },
  _flagStyle: {
    width: 40,
    justifyContent: 'flex-end',
    marginRight: -5,
    backgroundColor: Colors.black,
    color: Colors.white,
  },
});
