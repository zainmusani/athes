import _ from 'lodash';
import React, { useRef, useState } from 'react';
import { StatusBar, View, Image, FlatList } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import {
  Text,
  ScreenWrapper,
  TextInput,
  Button,
  ButtonView,
  ModalView,
} from '../../../components';
import {strings} from '../../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import util from '../../../util';
import styles from './styles';
import {useDispatch} from 'react-redux';
import {supportRequest} from '../../../actions/settingActions';

const Support = props => {
  const [errors, setErrors] = useState({
    name: null,
    issueType: null,
    message: null,
  });

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(() => false);
  const [fullNameValue, setFullNameValue] = useState(() => '');
  const [issueTypeValue, setIssueTypeValue] = useState(() => '');
  const [messageValue, setMessageValue] = useState(() => '');

  const fullName = useRef(null);
  const issueType = useRef(null);
  const message = useRef(null);

  const _validateForm = () => {
    const errors = {};

    if (_.isEmpty(fullNameValue)) {
      // email is required
      errors.name = util.isRequiredErrorMessage('Name');
    } else if (!util.isValidName(fullNameValue)) {
      // invalid email
      errors.name = INVALID_NAME_ERROR;
    }

    if (_.isEmpty(issueTypeValue)) {
      // email is required
      errors.issueType = util.isRequiredErrorMessage('Issue Type');
    }

    if (_.isEmpty(messageValue)) {
      // password is required
      errors.message = util.isRequiredErrorMessage('Message');
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const _onSubmit = () => {
    if (!_validateForm()) return;
    setLoading(true);
    const payload = {
      name: fullNameValue,
      type: issueTypeValue,
      message: messageValue,
    };

    dispatch(
      supportRequest(payload, (res, err) => {
        if (res) {
          setFullNameValue('');
          setIssueTypeValue('');
          setMessageValue('');
          setLoading(false);
          setModalVisible(true);
        }
      }),
    );

    // Actions.pop();
    // setLoading(true)
    // props.userSigninRequest(payload, data => {});
  };

  const {} = props;
  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.SUPPORT}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={AppStyles.alignItemsCenter}>
        <Image source={Images.headphoneIcon} style={{marginTop: 40}} />

        <Text style={styles.heading}>How can we help you?</Text>

        <View style={styles.textInputView}>
          <TextInput
            customStyle={styles.textInput}
            selectionColor={Colors.selectionColor}
            placeholder="Your Name"
            placeholderTextColor={Colors.blue2}
            returnKeyType="next"
            autoFocus
            ref={fullName}
            value={fullNameValue}
            error={errors.name}
            onChangeText={value => {
              setFullNameValue(value);
            }}
            onSubmitEditing={() => {
              issueType.current.focus();
            }}
          />
          <TextInput
            customStyle={styles.textInput}
            selectionColor={Colors.selectionColor}
            placeholder="Issue Type"
            placeholderTextColor={Colors.blue2}
            returnKeyType="next"
            ref={issueType}
            value={issueTypeValue}
            error={errors.issueType}
            onChangeText={value => {
              setIssueTypeValue(value);
            }}
            onSubmitEditing={() => {
              message.current.focus();
            }}
          />

          <TextInput
            customStyle={styles.textArea}
            selectionColor={Colors.selectionColor}
            multiline={true}
            numberOfLines={8}
            placeholder="Your Message"
            placeholderTextColor={Colors.blue2}
            returnKeyType="next"
            textAlignVertical="top"
            ref={message}
            value={messageValue}
            error={errors.message}
            onChangeText={value => {
              setMessageValue(value);
            }}
          />

          <Button
            background={Colors.white}
            isLoading={loading}
            disabled={false}
            icon="righArrowIcon"
            iconRight
            raised
            onPress={() => {
              _onSubmit();
            }}
            style={[AppStyles.mTop25]}>
            {strings.CONTINUE}
          </Button>
        </View>
      </KeyboardAwareScrollView>
      <ModalView
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        modalButtonPress={() => {
          Actions.pop();
        }}
        heading={'Sent Successfully.'}
        buttonText={'Done'}
        isProfileView
      />
    </ScreenWrapper>
  );
};;

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(Support);