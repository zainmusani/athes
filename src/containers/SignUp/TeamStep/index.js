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
  SelectBox,
} from '../../../components';
import {ageGroup, gender, strings} from '../../../constants';
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

const TeamStep = props => {
  const {} = props;

  const user = useSelector(state => state.user.data);

  const dispatch = useDispatch(null);
  const [loading, setLoading] = useState(false);
  const [teamNameValue, setTeamNameValue] = useState('');
  const [leagueValue, setLeagueValue] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [achievementValue, setAchievementValue] = useState('');
  const [athleteGenderValue, setAthleteGenderValue] = useState('');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  const [dobValue, setDobValue] = useState(null);
  const [zipValue, setZipValue] = useState(() => '');
  const [imageUri, setImageUri] = useState(() => '');
  const [errors, setErrors] = useState({});

  const teamNameRef = useRef(null);
  const leagueRef = useRef(null);
  const descriptionRef = useRef(null);
  const achievementRef = useRef(null);
  const athleteGenderRef = useRef(null);
  const zip = useRef(null);

  const getSelectedImageUri = img => {
    uploadImageToServer(img, setImageUri, setLoading).then(res => {});
  };

  const _validateForm = () => {
    const errors = {};

    if (_.isEmpty(teamNameValue)) {
      // password is required
      errors.team = util.isRequiredErrorMessage('Username');
    }

    if (_.isEmpty(leagueValue)) {
      // password is required
      errors.league = util.isRequiredErrorMessage('League');
    }

    if (!_.isDate(dobValue)) {
      // password is required
      errors.dob = util.isRequiredErrorMessage('date of birth');
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

    if (_.isEmpty(athleteGenderValue)) {
      errors.athleteGender = util.isRequiredErrorMessage('Athlete Gender');
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
      let selectedAges = util.getTitlesFromSelectArray(selectedAgeGroup);
      const payload = {
        team_name: teamNameValue,
        leagues: leagueValue,
        sportIntrests: selectedInterest,
        description: descriptionValue,
        acheivement: achievementValue,
        ageGroups: selectedAges,
        gender: athleteGenderValue,
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
          placeholder="Enter Name"
          placeholderTextColor={Colors.grey4}
          returnKeyType="next"
          underlineColorAndroid="#f000"
          label="Team Name"
          lableColor={Colors.white}
          autoFocus
          ref={teamNameRef}
          onSubmitEditing={() => {
            leagueRef.current.focus();
          }}
          containerStyle={AppStyles.mBottom10}
          value={teamNameValue}
          error={errors?.team}
          onChangeText={value => {
            setTeamNameValue(value);
          }}
        />
        <TextInput
          placeholder="Type Here"
          placeholderTextColor={Colors.grey4}
          returnKeyType="next"
          underlineColorAndroid="#f000"
          label="Team League"
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
        <MultiSelectBox
          label={`Sports`}
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
          label={`Age`}
          error={errors?.ageGroup}
          selectedValue={selectedAgeGroup}
          setSelectedValue={setSelectedAgeGroup}
        />

        <SelectBox
          array={gender}
          label="Gender of Athletes"
          value={athleteGenderValue}
          setData={setAthleteGenderValue}
          ref={athleteGenderRef}
          error={errors?.athleteGender}
          icon={Images.downIconBlack}
          isRightIcon
          onChangeText={value => {
            setAthleteGenderValue(value);
          }}
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

        <DatePicker
          dobValue={dobValue}
          setDobValue={setDobValue}
          error={errors?.dob}
          maximumDate={new Date(Date.now() - 94670856000)}
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

export default TeamStep;
