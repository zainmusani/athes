import _ from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {
  TextInput,
  UploadImage,
  ModalView,
  Loader,
  MultiSelectBox,
  DatePicker,
  SelectBox,
} from '../../../../components';
import styles from './styles';
import {AppStyles, Colors, Images} from '../../../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  ageGroup,
  INVALID_EMAIL_ERROR,
  INVALID_NAME_ERROR,
} from '../../../../constants';
import util from '../../../../util';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {signupAdditionalInfoRequest} from '../../../../actions/UserActions';
import {uploadMediaInBackground} from '../../../../helpers/ImageUploaderHelper';
import {getProfileRequest} from '../../../../actions/ProfileActions';

const Edit = props => {
  const {user_role, submitForm, setSubmitForm} = props;

  const [imgLoading, setImgLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(() => false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch(null);
  const {
    user,
    interest: saveIntrests,
    ageGroup: saveAgeGroups,
  } = useSelector(state => state.profile?.profileDetail);

  const [fullNameValue, setFullNameValue] = useState(user?.name || '');
  const [facilityNameValue, setFacilityNameValue] = useState(
    user?.detail?.facility_name || '',
  );
  const [leagueValue, setLeagueValue] = useState(user?.detail?.leagues || '');
  const [emailValue, setEmailValue] = useState(user?.email || '');
  const [countryCode, setCountryCode] = useState(user?.countryCode || 'US');
  const [phoneValue, setPhoneValue] = useState(user?.phone || '');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [descriptionValue, setDescriptionValue] = useState(
    user?.detail?.description || '',
  );
  const [achievementValue, setAchievementValue] = useState(
    user?.detail?.acheivement || '',
  );

  const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  const [dobValue, setDobValue] = useState(
    new Date(util.createDateOfBirth(user?.detail?.dob)) || '',
  );
  const [addressValue, setAddressValue] = useState(user?.detail?.address || '');
  // const [privacy, setPrivacy] = useState(user?.detail?.gender || '');
  const [imageUri, setImageUri] = useState(user?.detail?.photo || '');

  const [coverImageUri, setCoverImageUri] = useState(
    user?.detail?.coverphoto || '',
  );
  const [introImageUri, setIntroImageUri] = useState(user?.detail?.video || '');

  const SPORTSINTRESTDATA = useSelector(state => state.user?.sportIntrests);

  const fullName = useRef(null);
  const facilityNameRef = useRef(null);
  const leagueRef = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const descriptionRef = useRef(null);
  const achievementRef = useRef(null);
  const address = useRef(null);

  useEffect(() => {
    if (saveAgeGroups?.length > 0) {
      const newAgeData = ageGroup.filter(res1 => {
        if (saveAgeGroups?.includes(res1.title)) {
          return res1;
        }
      });

      setSelectedAgeGroup(newAgeData);
    }
  }, [saveAgeGroups]);

  useEffect(() => {
    if (submitForm) {
      _onSubmit();
    }
  }, [submitForm]);

  useEffect(() => {
    if (SPORTSINTRESTDATA?.length > 0) {
      const newData = SPORTSINTRESTDATA.filter(res1 => {
        if (saveIntrests?.length > 0 && saveIntrests?.includes(res1.title)) {
          return res1;
        }
      });
      setSelectedInterests(newData);
    }
  }, [SPORTSINTRESTDATA]);

  const _validateForm = () => {
    const errors = {};

    if (_.isEmpty(fullNameValue)) {
      // email is required
      errors.name = util.isRequiredErrorMessage('full name');
    } else if (!util.isValidName(fullNameValue)) {
      // invalid email
      errors.name = INVALID_NAME_ERROR;
    }
    if (_.isEmpty(facilityNameValue)) {
      // password is required
      errors.facility = util.isRequiredErrorMessage('Facility Name');
    }
    if (_.isEmpty(leagueValue)) {
      // password is required
      errors.league = util.isRequiredErrorMessage('League');
    }

    if (_.isEmpty(emailValue)) {
      // email is required
      errors.email = util.isRequiredErrorMessage('email');
    } else if (!util.isEmailValid(emailValue)) {
      // invalid email
      errors.email = INVALID_EMAIL_ERROR;
    }

    if (!_.isEmpty(phoneValue) && !phone.current.isValidNumber(phoneValue)) {
      errors.phone = 'please enter valid phone number';
    }

    if (_.isEmpty(selectedInterests)) {
      errors.sportInterest = 'Sports Interests is required';
    }

    if (_.isEmpty(selectedAgeGroup)) {
      errors.ageGroup = 'Age Group is required';
    }

    if (_.isEmpty(descriptionValue)) {
      errors.description = util.isRequiredErrorMessage('Description');
    }

    if (_.isEmpty(achievementValue)) {
      errors.achievement = util.isRequiredErrorMessage('Achievement');
    }

    if (!_.isDate(dobValue)) {
      errors.dob = util.isRequiredErrorMessage('date of birth');
    }

    if (_.isEmpty(addressValue)) {
      errors.address = util.isRequiredErrorMessage('Address');
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const _onSubmit = () => {
    if (_validateForm()) {
      setSubmitForm(0);
      setImgLoading(true);
      setErrors({});

      let date = util.getFormattedDateTime(dobValue, 'YYYYMMDD');
      let selectedInterest = util.getTitlesFromSelectArray(selectedInterests);
      let selectedAges = util.getTitlesFromSelectArray(selectedAgeGroup);

      const payload = {
        fullname: fullNameValue,
        facility_name: facilityNameValue,
        leagues: leagueValue,
        countryCode: countryCode,
        sportIntrests: selectedInterest,
        ageGroups: selectedAges,
        description: descriptionValue,
        acheivement: achievementValue,
        dob: date,
        address: addressValue,
        phone: phoneValue,
        // photo: imageUri,
        // cover: coverImageUri,
        // video: introImageUri,
        device_token: Math.random(),
      };

      dispatch(
        signupAdditionalInfoRequest(payload, res => {
          if (res) {
            setImgLoading(false);
            dispatch(
              getProfileRequest(
                {
                  userId: user.id,
                  flag: Math.random(),
                },
                res => {
                  setTimeout(() => {
                    setModalVisible(true);
                  }, 300);
                },
              ),
            );
          }
        }),
      );
    }
  };

  const getSelectedImageUri = img => {
    uploadMediaInBackground(
      img,
      dispatch,
      signupAdditionalInfoRequest,
      'photo',
      getProfileRequest,
      {
        userId: user.id,
        flag: Math.random(),
      },
      user.id,
    ).then(res => {});
  };

  const getSelectedCoverImageUri = img => {
    uploadMediaInBackground(
      img,
      dispatch,
      signupAdditionalInfoRequest,
      'cover',
      getProfileRequest,
      {
        userId: user.id,
        flag: Math.random(),
      },
      user.id,
    ).then(res => {});
  };

  const getSelectedIntroImageUri = img => {
    // setIntroImageUri(img.path);
    uploadMediaInBackground(
      img,
      dispatch,
      signupAdditionalInfoRequest,
      'video',
      getProfileRequest,
      {
        userId: user.id,
        flag: Math.random(),
      },
      user.id,
    ).then(res => {});
  };

  return (
    <>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Enter Full Name"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Full Name"
            autoFocus
            ref={fullName}
            onSubmitEditing={() => {
              facilityNameRef.current.focus();
            }}
            containerStyle={AppStyles.mBottom10}
            icon={{
              url: Images.userIcon,
              width: 12,
              height: 18,
            }}
            value={fullNameValue}
            error={errors?.name}
            onChangeText={value => {
              setFullNameValue(value);
            }}
          />

          <TextInput
            placeholder="Enter name"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Facility Name"
            lableColor={Colors.white}
            ref={facilityNameRef}
            onSubmitEditing={() => {
              leagueRef.current.focus();
            }}
            containerStyle={AppStyles.mBottom10}
            value={facilityNameValue}
            error={errors?.facility}
            onChangeText={value => {
              setFacilityNameValue(value);
            }}
          />

          <TextInput
            placeholder="Type Here"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="League(s)"
            lableColor={Colors.white}
            ref={leagueRef}
            onSubmitEditing={() => {
              leagueRef.current.blur();
            }}
            containerStyle={AppStyles.mBottom10}
            value={leagueValue}
            error={errors?.league}
            onChangeText={value => {
              setLeagueValue(value);
            }}
          />

          <TextInput
            placeholder="User@example.com"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            autoCapitalize="none"
            underlineColorAndroid="#f000"
            label="Email address"
            keyboardType="email-address"
            ref={email}
            editable={false}
            caretHidden={true}
            containerStyle={AppStyles.mBottom10}
            onSubmitEditing={() => {
              email.current.blur();
            }}
            icon={{
              url: Images.mail,
              width: 16,
              height: 15,
            }}
            value={emailValue}
            error={errors?.email}
            onChangeText={value => {
              value = value.replace(' ', '');
              setEmailValue(value);
            }}
          />

          <TextInput
            placeholder="xxxxxxxx"
            placeholderTextColor={Colors.grey4}
            underlineColorAndroid="#f000"
            keyboardType="numeric"
            label="Contact Number (Optional)"
            phone
            ref={phone}
            defaultCode={countryCode}
            onChangeCountry={value => {
              setCountryCode(value.cca2);
            }}
            defaultValue={phoneValue}
            error={errors?.phone}
            onChangeText={value => {
              setPhoneValue(value);
            }}
          />

          <MultiSelectBox
            label={`Sport(s)`}
            error={errors?.sportInterest}
            selectedValue={selectedInterests}
            setSelectedValue={setSelectedInterests}
          />

          <TextInput
            placeholder="Type Here"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Description"
            lableColor={'#FFF'}
            ref={descriptionRef}
            multiline
            onSubmitEditing={() => {
              descriptionRef.current.blur();
            }}
            containerStyle={AppStyles.mBottom10}
            value={descriptionValue}
            error={errors?.description}
            onChangeText={value => {
              setDescriptionValue(value);
            }}
          />

          <TextInput
            placeholder="Type Here"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Achievements/Awards/Certifications"
            lableColor={'#FFF'}
            ref={achievementRef}
            multiline
            containerStyle={AppStyles.mBottom10}
            value={achievementValue}
            error={errors?.achievement}
            onChangeText={value => {
              setAchievementValue(value);
            }}
            onSubmitEditing={() => {
              achievementRef.current.blur();
            }}
          />

          <MultiSelectBox
            data={ageGroup}
            label={`Age Groups`}
            error={errors?.ageGroup}
            selectedValue={selectedAgeGroup}
            setSelectedValue={setSelectedAgeGroup}
          />

          <TextInput
            placeholder="Address"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Address"
            ref={address}
            containerStyle={AppStyles.mBottom10}
            onSubmitEditing={() => {
              address.current.blur();
            }}
            value={addressValue}
            error={errors?.address}
            onChangeText={value => {
              setAddressValue(value);
            }}
          />

          <DatePicker
            dobValue={dobValue}
            setDobValue={setDobValue}
            error={errors?.dob}
            maximumDate={new Date(Date.now() - 94670856000)}
          />

          {/* upload phote */}
          <UploadImage
            user_id={user?.id}
            isPhotoCamera
            postImages={!_.isEmpty(imageUri) ? [imageUri] : []}
            shouldReturnSelectedImageUri={true}
            getSelectedImageUri={getSelectedImageUri}
            shouldSelectMultipleImages={false}
            onlyOpenGallery={false}
            uKey={`photo`}
            title={`Photo`}
            subTitle={`Upload profile photo here`}
            style={{...AppStyles.mBottom0}}
          />

          {/* upload cover photo */}
          <UploadImage
            user_id={user?.id}
            isPhotoCamera
            postImages={!_.isEmpty(coverImageUri) ? [coverImageUri] : []}
            shouldReturnSelectedImageUri={true}
            getSelectedImageUri={getSelectedCoverImageUri}
            shouldSelectMultipleImages={false}
            onlyOpenGallery={false}
            uKey={`cover`}
            title={`Cover Photo`}
            subTitle={`Upload cover photo here`}
            style={{...AppStyles.mBottom0}}
          />

          {/* upload intro photo */}
          <UploadImage
            user_id={user?.id}
            isVideoCamera
            postImages={!_.isEmpty(introImageUri) ? [introImageUri] : []}
            shouldReturnSelectedImageUri={true}
            getSelectedImageUri={getSelectedIntroImageUri}
            shouldSelectMultipleImages={false}
            onlyOpenGallery={false}
            uKey={`video`}
            title={`Intro Video`}
            subTitle={`Upload video here`}
            style={{...AppStyles.mBottom0}}
          />

          <View style={{...AppStyles.mBottom30}}></View>

          <Loader loading={imgLoading} loadingFor="Uploading..." />
        </View>
      </KeyboardAwareScrollView>

      <ModalView
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        modalButtonPress={() => {}}
        heading={'Profile Updated'}
        buttonText={'Done'}
        isProfileView
      />
    </>
  );
};
Edit.propTypes = {
  submitForm: PropTypes.bool,
};

Edit.defaultProps = {
  submitForm: false,
};

const mapStateToProps = ({general}) => ({
  user_role: general.user_role,
});

const actions = {};

export default connect(mapStateToProps, actions)(Edit);
