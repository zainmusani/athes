import React, {useEffect, useRef, useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  Text,
  ButtonView,
  ScreenWrapper,
  Loader,
  Post,
  TextInput,
  Button,
  UploadImage,
  ModalView,
  MultiSelectBox,
  DatePicker,
} from '../../../components';
import {strings} from '../../../constants';
import {AppStyles, Colors, Fonts, Images} from '../../../theme';
import styles from './styles';
import _ from 'lodash';
import util from '../../../util';
import {useDispatch, useSelector} from 'react-redux';
import {
  backScreen,
  deleteUserRequest,
  getSportIntrestRequest,
  signupAdditionalInfoRequest,
} from '../../../actions/UserActions';
import {uploadImageToServer} from '../../../helpers/ImageUploaderHelper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ParentStep = props => {
  const {} = props;

  const user = useSelector(state => state.user.data);

  const dispatch = useDispatch(null);
  const [loading, setLoading] = useState(false);
  const [userNameValue, setUserNameValue] = useState('');
  const [dobValue, setDobValue] = useState(null);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [zipValue, setZipValue] = useState(() => '');
  const [imageUri, setImageUri] = useState(() => '');
  const [errors, setErrors] = useState({});

  const userNameRef = useRef(null);
  const zip = useRef(null);

  const getSelectedImageUri = img => {
    // setImageUri(img.path);
    uploadImageToServer(img, setImageUri, setLoading).then(res => {});
  };

  const _validateForm = () => {
    const errors = {};

    if (_.isEmpty(userNameValue)) {
      // password is required
      errors.username = util.isRequiredErrorMessage('Username');
    }
    if (!_.isDate(dobValue)) {
      // password is required

      errors.dob = util.isRequiredErrorMessage('date of birth');
    }

    if (_.isEmpty(selectedInterests)) {
      errors.sportInterest = 'Sports Interests is required';
    }

    if (_.isEmpty(zipValue)) {
      errors.zip = util.isRequiredErrorMessage('Zipcode');
    } else if (!util.isNumber(zipValue)) {
      // invalid email
      errors.zip = 'Please enter a valid zipcode';
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const _onSubmit = () => {
    if (_validateForm()) {
      setErrors({});
      setLoading(true);
      let date = util.getFormattedDateTime(dobValue, 'YYYYMMDD');
      let selectedInterest = util.getTitlesFromSelectArray(selectedInterests);
      const payload = {
        username: userNameValue,
        sportIntrests: selectedInterest,
        dob: date,
        zip: zipValue,
        photo: imageUri,
      };

      dispatch(
        signupAdditionalInfoRequest(payload, res => {
          setLoading(false);
          if (res) {
            dispatch(backScreen(''));
            Actions.reset('athes_tab', {fromSignup: true});
          }
        }),
      );
    }
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={strings.CREATE_ACCOUNT}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <TextInput
          placeholder="Enter username"
          placeholderTextColor={Colors.grey4}
          returnKeyType="next"
          underlineColorAndroid="#f000"
          label="Username"
          lableColor={Colors.white}
          autoFocus
          ref={userNameRef}
          onSubmitEditing={() => {
            userNameRef.current.blur();
          }}
          containerStyle={AppStyles.mBottom10}
          value={userNameValue}
          error={errors?.username}
          onChangeText={value => {
            value = value.replace(' ', '');
            setUserNameValue(value);
          }}
        />
        <MultiSelectBox
          label={`Sports Interests`}
          error={errors?.sportInterest}
          selectedValue={selectedInterests}
          setSelectedValue={setSelectedInterests}
        />

        <DatePicker
          dobValue={dobValue}
          setDobValue={setDobValue}
          error={errors?.dob}
          maximumDate={new Date(Date.now() - 94670856000)}
        />

        <TextInput
          placeholder="Zipcode"
          placeholderTextColor={Colors.grey4}
          returnKeyType="next"
          underlineColorAndroid="#f000"
          label="Zipcode (required)"
          ref={zip}
          containerStyle={AppStyles.mBottom10}
          onSubmitEditing={() => {
            zip.current.blur();
          }}
          keyboardType="numeric"
          value={zipValue}
          maxLength={7}
          error={errors?.zip}
          onChangeText={value => {
            setZipValue(value);
          }}
        />

        <UploadImage
          isPhotoCamera
          postImages={!_.isEmpty(imageUri) ? [imageUri] : []}
          shouldReturnSelectedImageUri={true}
          getSelectedImageUri={getSelectedImageUri}
          shouldSelectMultipleImages={false}
          onlyOpenGallery={false}
          title={`Photo`}
          subTitle={`Upload profile photo here`}
        />

        <View style={{alignSelf: 'center', ...AppStyles.mTop30}}>
          <Button
            background={Colors.black}
            icon="righArrowIcon"
            onlyIcon
            onPress={() => _onSubmit()}
          />
        </View>
      </KeyboardAwareScrollView>
      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

export default ParentStep;
