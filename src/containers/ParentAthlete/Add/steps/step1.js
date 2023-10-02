import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {Image, View} from 'react-native';
import {AppStyles, Colors, Images} from '../../../../theme';
import {
  Button,
  ButtonView,
  DatePicker,
  Loader,
  MultiSelectBox,
  Text,
  TextInput,
  UploadImage,
} from '../../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {SPORTSINTRESTDATA} from '../../../../constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import styles from './styles';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {
  getSportIntrestRequest,
  updateSportIntrestRequest,
} from '../../../../actions/UserActions';
import {uploadImageToServer} from '../../../../helpers/ImageUploaderHelper';
import {INVALID_NAME_ERROR} from '../../../../constants';
import util from '../../../../util';

const step1 = props => {
  const {
    fullName,
    setFullName,
    dob,
    setDob,
    selectedInterests,
    setSelectedInterests,
    errors,
    setErrors,
    setImageData,
    imageUri,
    setImageUri,
    onNext,
    onBack,
    setIsImageUpload,
    loading,
  } = props;

  const dispatch = useDispatch(null);
  const SPORTSINTRESTDATA = useSelector(state => state.user.sportIntrests);

  const fullNameRef = useRef(null);
  const dobRef = useRef(null);
  const sportsIntrestRef = useRef(null);

  useEffect(() => {
    dispatch(getSportIntrestRequest(res => {}));
  }, []);

  //Validate Fields
  const _validateForm = () => {
    const errors = {};

    if (_.isEmpty(fullName)) {
      // email is required
      errors.fullName = util.isRequiredErrorMessage('Full Name');
    }

    if (!_.isDate(dob)) {
      // password is required

      errors.dob = util.isRequiredErrorMessage('date of birth');
    } else if (util.getAgeFromDob(dob) > 13) {
      errors.dob = 'You can only add children younger than 13.';
    }

    if (_.isEmpty(selectedInterests)) {
      errors.sportInterest = 'Sports Interests is required';
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const _onSubmit = () => {
    if (_validateForm()) {
      setErrors(null);

      onNext();
    }
  };

  const getSelectedImageUri = img => {
    setImageData(img);
    setImageUri(img.path);
    setIsImageUpload(false);
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === 'ios'}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Enter Name"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Full Name"
            lableColor={Colors.white}
            autoFocus
            ref={fullNameRef}
            containerStyle={AppStyles.mBottom10}
            value={fullName}
            error={errors?.fullName}
            onChangeText={value => {
              setFullName(value);
            }}
          />

          <DatePicker
            dobValue={dob}
            setDobValue={setDob}
            error={errors?.dob}
            maximumDate={new Date(Date.now() - 94670856000)}
          />
          <MultiSelectBox
            label={`Sports Interests`}
            error={errors?.sportInterest}
            selectedValue={selectedInterests}
            setSelectedValue={setSelectedInterests}
          />

          {/* upload phote */}

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

          <View style={styles.loginBtnArea}>
            <View style={styles.loginDivider}></View>

            <Button
              background={Colors.black}
              icon="righArrowIcon"
              onlyIcon
              color="#FFF"
              onPress={_onSubmit}
            />

            <View style={styles.loginDivider}></View>
          </View>
        </View>
      </View>
      <Loader loading={loading} />
    </KeyboardAwareScrollView>
  );
};

export default step1;
