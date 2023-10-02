import _ from 'lodash';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Image, View} from 'react-native';
import {
  Text,
  ButtonView,
  TextInput,
  RadioButton,
  UploadImage,
  ModalView,
  Button,
  Loader,
  MultiSelectBox,
  DatePicker,
} from '../../../../components';
import styles from './styles';
import {AppStyles, Colors, Images} from '../../../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {INVALID_NAME_ERROR, UserRoles} from '../../../../constants';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
// import {SPORTSINTRESTDATA} from '../../../../constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {getSportIntrestRequest} from '../../../../actions/UserActions';
import {
  editChildRequest,
  getChildRequest,
} from '../../../../actions/ParentActions';
import {uploadImageToServer, uploadMediaInBackground} from '../../../../helpers/ImageUploaderHelper';
import util from '../../../../util';
import {getProfileRequest} from '../../../../actions/ProfileActions';

const Edit = props => {
  const {user, interest: saveIntrests} = useSelector(
    state => state.profile?.profileDetail,
  );
  const user_role = useSelector(state => state.user.data.role);
  const SPORTSINTRESTDATA = useSelector(state => state.user.sportIntrests);
  const dispatch = useDispatch(null);

  const {submitForm, setSubmitForm, isParentAthleteManagementView, id} = props;

  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(() => false);
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    phone: null,
    country: null,
  });

  const [fullNameValue, setFullNameValue] = useState(user?.name || '');
  const [passValue, setPassValue] = useState(user?.password || '');
  const [dobValue, setDobValue] = useState(
    new Date(util.createDateOfBirth(user?.detail?.dob)) || '',
  );
  const [selectedInterests, setSelectedInterests] = useState(
    saveIntrests || [],
  );

  const [imageUri, setImageUri] = useState(user?.detail?.photo || '');
  const [coverImageUri, setCoverImageUri] = useState(
    user?.detail?.coverphoto || '',
  );
  const [introImageUri, setIntroImageUri] = useState(user?.detail?.video || '');
  const [privacy, setPrivacy] = useState(user.privacy || '');

  const fullName = useRef(null);
  const password = useRef(null);
  const dobRef = useRef(null);
  const sportsIntrestRef = useRef(null);

  useEffect(() => {
    if (submitForm) {
      _onSubmit();
    }
  }, [submitForm]);

  

  useEffect(() => {
    if (SPORTSINTRESTDATA.length > 0) {
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
    }

    if (!_.isDate(dobValue)) {
      // password is required
      errors.dob = util.isRequiredErrorMessage('date of birth');
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
      setLoading(true);
      setSubmitForm(0);

      let date = util.getFormattedDateTime(dobValue, 'YYYYMMDD');
      let selectedInterest = util.getTitlesFromSelectArray(selectedInterests);

      const payload = {
        child_id: id,
        fullname: fullNameValue,
        dob: date,
        sportIntrests: selectedInterest,
        privacy: privacy,
        // photo: imageUri,
        // cover: coverImageUri,
        // video: introImageUri,
        device_token: Math.random(),
      };

      dispatch(
        editChildRequest(payload, res => {
          if (res) {
            setErrors({});
            dispatch(getChildRequest({}, res => {}));
            dispatch(
              getProfileRequest(
                {
                  userId: user.id,
                  flag: Math.random(),
                },
                res => {
                  setLoading(false);
                    setTimeout(() => {
                      setModalVisible(true);
                    }, 800);
                },
              ),
            );
          }
        }),
      );
    }
  };

  // const getSelectedImageUri =  img => {
  //   // setImageUri(img.path);
  //   uploadImageToServer(img, setImageUri, setImgLoading).then(res => {});
  // };

  // const getSelectedCoverImageUri = img => {
  //   // setCoverImageUri(img.path);
  //   uploadImageToServer(img, setCoverImageUri, setImgLoading).then(res => { });
  // };

  // const getSelectedIntroImageUri = img => {
  //   // setIntroImageUri(img.path);
  //   uploadImageToServer(img, setIntroImageUri, setImgLoading).then(res => {});
  // };

  const getSelectedImageUri = img => {
    uploadMediaInBackground(
      img,
      dispatch,
      editChildRequest,
      'photo',
      getProfileRequest,
      {
        userId: user.id,
        flag: Math.random(),
      },
      user.id,
      true,
    ).then(res => {});
  };

  const getSelectedCoverImageUri = img => {
    uploadMediaInBackground(
      img,
      dispatch,
      editChildRequest,
      'cover',
      getProfileRequest,
      {
        userId: user.id,
        flag: Math.random(),
      },
      user.id,
      true,
    ).then(res => {});
  };

  const getSelectedIntroImageUri = img => {
    // setIntroImageUri(img.path);
    uploadMediaInBackground(
      img,
      dispatch,
      editChildRequest,
      'video',
      getProfileRequest,
      {
        userId: user.id,
        flag: Math.random(),
      },
      user.id,
      true,
    ).then(res => {});
  };

  return (
    <>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        {!loading && (
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Enter Full Name"
              placeholderTextColor={Colors.grey4}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              label="Full Name"
              autoFocus
              ref={fullName}
              containerStyle={AppStyles.mBottom10}
              value={fullNameValue}
              error={errors.name}
              onChangeText={value => {
                setFullNameValue(value);
              }}
            />

            <DatePicker
              dobValue={dobValue}
              setDobValue={setDobValue}
              error={errors?.dob}
              maximumDate={new Date(Date.now() - 94670856000)}
            />

            <TextInput
              placeholder="* * * * * * *"
              placeholderTextColor={Colors.grey4}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              label="Password"
              password
              editable={false}
              caretHidden={true}
              ref={password}
              containerStyle={AppStyles.mBottom10}
              error={errors?.password}
              value={passValue}
            />

            <MultiSelectBox
              label={`Sports Interests`}
              error={errors?.sportInterest}
              selectedValue={selectedInterests}
              setSelectedValue={setSelectedInterests}
            />

            <View style={{...AppStyles.mBottom30}}></View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <RadioButton
                buttonStyles={styles.radioButtonStyles}
                privacy={privacy}
                setPrivacy={setPrivacy}
                values={[
                  {
                    key: 'private',
                    text: 'Private',
                    selected: false,
                  },
                  {
                    key: 'public',
                    text: 'Public',
                    selected: true,
                  },
                ]}
              />
            </View>

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
              title={`Photo`}
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

            <Loader
              loading={imgLoading}
              loadingFor="Uploading..."
              backdropOpacity={0.4}
            />

            {isParentAthleteManagementView && user_role === UserRoles.parent && (
              <Button
                background={Colors.white}
                onPress={() => {
                  _onSubmit();
                }}
                icon="righArrowIcon"
                iconRight
                raised
                style={{
                  marginVertical: 20,
                }}>
                {'Update'.toUpperCase()}
              </Button>
            )}
          </View>
        )}
        <Loader loading={loading} />
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

Edit.defaultProps = {
  submitForm: false,
};

const mapStateToProps = ({general}) => ({
  user_role: general.user_role,
});

const actions = {};

export default connect(mapStateToProps, actions)(Edit);
