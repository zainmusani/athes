import React, {useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import {View, useWindowDimensions, Platform} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch} from 'react-redux';
import util from '../../../../util';
import {
  Button,
  QuantityInput,
  ScreenWrapper,
  TextInput,
  UploadImage,
  Loader,
} from '../../../../components';
import {strings} from '../../../../constants';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../../../theme';
import styles from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import TagInput from 'react-native-tags-input';
import {uploadImageToServer} from '../../../../helpers/ImageUploaderHelper';
import {
  updateSessionRequest,
  getSessionByIdRequest,
} from '../../../../actions/SessionsActions';
import moment from 'moment';

const AddSession = props => {
  const {edit, data, sessionId} = props;
  const [loading, setLoading] = useState(false);
  const [disabledTags, setDisabledTags] = useState(false);

  const [titleValue, setTitleValue] = useState(() =>
    edit ? data?.sessionTitle : '',
  );
  const [venueValue, setVenueValue] = useState(() =>
    edit ? data?.sessionVenue : '',
  );
  // start session date
  const [sessionDateValue, setSessionDateValue] = useState(() =>
    edit ? new Date(data?.startDate) : '',
  );
  const [isSessionDateVisible, setIsSessionDateVisible] = useState(false);
  // Start Time session
  const [timeValue, setTimeValue] = useState(() =>
    edit ? moment(data?.startTime, [moment.ISO_8601, 'hh:mm A']).toDate() : '',
  );
  const [isStartTimeVisible, setIsStartTimeVisible] = useState(false);
  // End Time session
  const [endTimeValue, setEndTimeValue] = useState(() =>
    edit ? moment(data?.endTime, [moment.ISO_8601, 'hh:mm A']).toDate() : '',
  );
  const [isEndTimeVisible, setIsEndTimeVisible] = useState(false);

  const [minAgeValue, setMinAgeValue] = useState(
    edit ? data?.minAge.toString() : null,
  );
  const [maxAgeValue, setMaxAgeValue] = useState(
    edit ? data?.maxAge.toString() : null,
  );

  // last date of registration
  const [lastDateOfRegistrationValue, setLastDateOfRegistrationValue] =
    useState(() => (edit ? new Date(data?.lastRegistrationDate) : ''));
  const [isLastDateOfRegistrationVisible, setLastDateOfRegistrationVisible] =
    useState(false);
  //
  const [chargesValue, setChargesValue] = useState(edit ? data?.charges : '');
  const [numOfSeats, setNumOfSeats] = useState(edit ? data?.seats : '');

  // last canecl date
  const [lastCancelDateValue, setLastCancelDateValue] = useState(() =>
    edit ? new Date(data?.lastCancellationDate) : '',
  );
  const [isLastCancelDateVisible, setLastCancelDateVisible] = useState(false);
  //
  const [detailValue, setDetailValue] = useState(() =>
    edit ? data?.description : '',
  );

  // maximum date of cancel and registration
  const [maxDateCancelRegister, setMaxDateCancelRegister] = useState(
    edit ? data?.startDate : null,
  );

  //
  const [imageUri, setImageUri] = useState(edit ? data?.image : '');

  const [tags, setTags] = useState({
    tag: '',
    tagsArray: edit ? data?.tags : [],
  });

  const [errors, setErrors] = useState();

  const titleRef = useRef(null);
  const venueRef = useRef(null);
  const sessiondateRef = useRef(null);
  const minAgeRef = useRef(null);
  const maxAgeRef = useRef(null);
  const lastDateOfRegistrationRef = useRef(null);
  const chargesRef = useRef(null);
  const lastCancelDateRef = useRef(null);
  const detailRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (tags.tagsArray.length >= 10) {
      setDisabledTags(true);
    } else {
      setDisabledTags(false);
    }
  }, [tags]);

  // validation
  const validateForm = () => {
    const errors = {};

    if (_.isEmpty(titleValue)) {
      // title is required
      errors.title = util.isRequiredErrorMessage('Title');
    }

    if (_.isEmpty(venueValue)) {
      // email is required
      errors.venue = util.isRequiredErrorMessage('Venue');
    }

    if (!_.isDate(sessionDateValue)) {
      // session start date is required
      errors.sessionDate = util.isRequiredErrorMessage('Session Date');
    }

    if (!_.isDate(timeValue)) {

      // session end date is required
      errors.sessionTime = util.isRequiredErrorMessage('Session start time');
    }

    if (!_.isDate(endTimeValue)) {
      // session end date is required
      errors.sessionEndTime = util.isRequiredErrorMessage('Session end time');
    } else if (timeValue >= endTimeValue) {
      errors.sessionEndTime = util.errorMessage(
        'End time Should be after start time',
      );
    }

    if (minAgeValue && +minAgeValue >= +maxAgeValue) {
      errors.maxAge = util.errorMessage(
        'Max Age should be greater then Min Age',
      );
    }

    if (!_.isDate(lastDateOfRegistrationValue)) {
      // last date of registration is required
      errors.lastDateOfRegistration = util.isRequiredErrorMessage(
        'Last day to register',
      );
    }
    if (!chargesValue) {
      // charges is required
      errors.charges = util.isRequiredErrorMessage('Charge');
    } else if (!util.isNumber(chargesValue)) {
      // invalid Charge
      errors.charges = util.isRequiredErrorMessage('Invalid Charges');
    }

    if (!numOfSeats) {
      // charges is required
      errors.seats = util.isRequiredErrorMessage('Number of spots');
    } else if (!util.isNumber(numOfSeats)) {
      // invalid Charge
      errors.seats = util.isRequiredErrorMessage('Invalid number of seats');
    }

    if (!_.isDate(lastCancelDateValue)) {
      // last date of registration is required
      errors.lastCancelDate = util.isRequiredErrorMessage('Last cancel date');
    }

    if (_.isEmpty(detailValue)) {
      // Detail is required
      errors.detail = util.isRequiredErrorMessage('Detail');
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (!validateForm()) return;

    let sessionDate = util.getFormattedDateTime(sessionDateValue, 'YYYY/MM/DD');
    let lastDateOfRegistration = util.getFormattedDateTime(
      lastDateOfRegistrationValue,
      'YYYY/MM/DD',
    );
    let lastCancelDate = util.getFormattedDateTime(
      lastCancelDateValue,
      'YYYY/MM/DD',
    );

    const payload = {
      sessionTitle: titleValue,
      sessionVenue: venueValue,
      date: sessionDate,
      startTime: util.getFormattedDateTime(timeValue, 'HH:mm:ss'),
      endTime: util.getFormattedDateTime(endTimeValue, 'HH:mm:ss'),
      minAge: +minAgeValue || 0,
      maxAge: +maxAgeValue || 0,
      lastRegistrationDate: lastDateOfRegistration,
      seats: numOfSeats,
      lastCancellationDate: lastCancelDate,
      description: detailValue,
      image: !_.isEmpty(imageUri)
        ? imageUri
        : 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
      charges: chargesValue,
      tags: tags.tagsArray,
      sessionId,
    };
    if (edit) {
      dispatch(
        updateSessionRequest(payload, res => {
          if (res)
            dispatch(
              getSessionByIdRequest(
                sessionId.toString(),
                res => res && Actions.pop(),
              ),
            );
        }),
      );
    } else {
      Actions.invitePeopleScreen({
        payload: {...payload, invites: []},
        isAddedSessionForm: true,
        isSkipButtonVisible: true,
      });
    }
  };

  const handleStartSessionConfirmButton = date => {
    let dateObj = date;

    if (new Date(Date.now()).getUTCDate() == dateObj.getUTCDate()) {
      dateObj = new Date(dateObj.getTime() + 259200000);
    }

    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let seprator = Platform.OS == 'ios' ? '/' : '-';
    setMaxDateCancelRegister(`${year}${seprator}${month}${seprator}${day}`);

    setSessionDateValue(dateObj);
    setIsSessionDateVisible(false);
  };

  // start Time session
  const handleStartTime = time => {
    // time = moment(time).format('HH:mm:ss');
    setTimeValue(time);
    setIsStartTimeVisible(false);
  };
  // end Time session
  const handleEndTime = time => {
    // time = moment(time).format('HH:mm:ss');
    setEndTimeValue(time);

    setIsEndTimeVisible(false);
  };

  // last date of registration

  const handleLastDateOfRegistrationConfirmButton = date => {
    setLastDateOfRegistrationValue(date);
    setLastDateOfRegistrationVisible(false);
  };

  // Last day to cancel

  const handleLastCancelDateConfirmButton = date => {
    setLastCancelDateValue(date);
    setLastCancelDateVisible(false);
  };

  // image upload
  const getSelectedImageUri = img => {
    // setImageUri(img.path);
    uploadImageToServer(img, setImageUri, setLoading).then(res => {});
  };

  return (
    <ScreenWrapper
      pageBackground={Colors.black}
      hasBack
      headerTitle={edit ? 'Edit Session' : strings.ADD_SESSION}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{flex: 1}}
          showsVerticalScrollIndicator={false}>
          <TextInput
            placeholder="Enter Title"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Title"
            lableColor={Colors.white}
            autoFocus
            ref={titleRef}
            onSubmitEditing={() => {
              venueRef.current.focus();
            }}
            containerStyle={AppStyles.mBottom10}
            value={titleValue}
            error={errors?.title}
            onChangeText={value => {
              setTitleValue(value);
            }}
          />

          <TextInput
            placeholder="Enter Venue"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            underlineColorAndroid="#f000"
            label="Venue"
            lableColor={Colors.white}
            ref={venueRef}
            onSubmitEditing={() => {
              venueRef.current.blur();
            }}
            containerStyle={AppStyles.mBottom10}
            value={venueValue}
            error={errors?.venue}
            onChangeText={value => {
              setVenueValue(value);
            }}
          />

          <View>
            <TextInput
              placeholder="MM/DD/YYYY" //12345
              placeholderTextColor={Colors.grey4}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              label="Session Date"
              lableColor={Colors.white}
              ref={sessiondateRef}
              editable={false}
              caretHidden={true}
              containerStyle={AppStyles.mBottom10}
              icon={{
                url: Images.experienceIcon,
                width: 20,
                height: 20,
              }}
              iconOnRight
              onSubmitEditing={() => {
                // this.sportsIntrestRef.focus();
              }}
              onPress={() => setIsSessionDateVisible(true)}
              value={
                !_.isNull(sessionDateValue)
                  ? util.getFormattedDateTime(sessionDateValue, 'MM/DD/YYYY')
                  : ''
              }
              error={errors?.sessionDate}
              onChangeText={value => {
                setSessionDateValue(value);
              }}
            />
            <Button
              style={styles.hiddenTap}
              background="transparent"
              onPress={() => setIsSessionDateVisible(true)}
            />
            <DateTimePickerModal
              isVisible={isSessionDateVisible}
              mode="date"
              onConfirm={date => handleStartSessionConfirmButton(date)}
              minimumDate={new Date(Date.now() + 259200000)}
              onCancel={() => setIsSessionDateVisible(false)}
            />
          </View>
          <View
            style={{
              ...AppStyles.flexRow,
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={{...AppStyles.mTop15, flex: 1}}>
              <TextInput
                placeholder="Select Time"
                placeholderTextColor={Colors.grey4}
                underlineColorAndroid="#f000"
                label="Session Start Time"
                lableColor={Colors.white}
                editable={false}
                caretHidden={true}
                value={util.getFormattedDateTime(timeValue, 'hh:mm A')}
                onChangeText={value => {
                  setTimeValue(value);
                }}
                containerStyle={AppStyles.mBottom10}
                error={errors?.sessionTime}
                icon={{
                  url: Images.experienceIcon,
                  width: 20,
                  height: 20,
                }}
              />

              <Button
                style={styles.hiddenTap}
                background="transparent"
                onPress={() => setIsStartTimeVisible(true)}
              />
              <DateTimePickerModal
                isVisible={isStartTimeVisible}
                mode="time"
                // is24Hour={false}
                onConfirm={time => handleStartTime(time)}
                onCancel={() => setIsStartTimeVisible(false)}
              />
            </View>
            <View style={{...AppStyles.mTop15, flex: 1}}>
              <TextInput
                placeholder="Select Time"
                placeholderTextColor={Colors.grey4}
                underlineColorAndroid="#f000"
                label="Session End Time"
                lableColor={Colors.white}
                editable={false}
                caretHidden={true}
                value={util.getFormattedDateTime(endTimeValue, 'hh:mm A')}
                containerStyle={AppStyles.mBottom10}
                icon={{
                  url: Images.experienceIcon,
                  width: 20,
                  height: 20,
                }}
                error={errors?.sessionEndTime}
              />

              <Button
                style={styles.hiddenTap}
                background="transparent"
                onPress={() => setIsEndTimeVisible(true)}
              />
              <DateTimePickerModal
                isVisible={isEndTimeVisible}
                mode="time"
                // is24Hour={false}
                onConfirm={time => handleEndTime(time)}
                onCancel={() => setIsEndTimeVisible(false)}
              />
            </View>
          </View>
          <View
            style={{
              ...AppStyles.flexRow,
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <TextInput
              placeholder="Type Here" //12345
              placeholderTextColor={Colors.grey4}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              ref={minAgeRef}
              label="Min Age"
              lableColor={Colors.white}
              containerStyle={{
                ...AppStyles.mBottom10,
                flex: 1,
              }}
              onSubmitEditing={() => {
                maxAgeRef.current.focus();
              }}
              value={minAgeValue}
              error={errors?.minAge}
              onChangeText={value => {
                (util.reg.test(value) || value === '') && setMinAgeValue(value);
              }}
              keyboardType="numeric"
              maxLength={2}
            />
            <TextInput
              placeholder="Type Here" //12345
              placeholderTextColor={Colors.grey4}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              ref={maxAgeRef}
              label="Max Age"
              lableColor={Colors.white}
              containerStyle={{
                ...AppStyles.mBottom10,
                flex: 1,
              }}
              onSubmitEditing={() => {
                maxAgeRef.current.blur();
              }}
              value={maxAgeValue}
              error={errors?.maxAge}
              onChangeText={value => {
                (util.reg.test(value) || value === '') && setMaxAgeValue(value);
              }}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>

          <View>
            <TextInput
              placeholder="MM/DD/YYYY" //12345
              placeholderTextColor={Colors.grey4}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              label="Last day to register"
              lableColor={Colors.white}
              ref={lastDateOfRegistrationRef}
              editable={false}
              caretHidden={true}
              containerStyle={AppStyles.mBottom10}
              icon={{
                url: Images.experienceIcon,
                width: 20,
                height: 20,
              }}
              iconOnRight
              value={
                !_.isNull(lastDateOfRegistrationValue)
                  ? util.getFormattedDateTime(
                      lastDateOfRegistrationValue,
                      'MM/DD/YYYY',
                    )
                  : ''
              }
              error={errors?.lastDateOfRegistration}
              onChangeText={value => {
                setLastDateOfRegistrationValue(value);
              }}
            />
            <Button
              style={styles.hiddenTap}
              background="transparent"
              onPress={() =>
                // {}
                maxDateCancelRegister && setLastDateOfRegistrationVisible(true)
              }
            />
            <DateTimePickerModal
              isVisible={isLastDateOfRegistrationVisible}
              mode="date"
              onConfirm={date =>
                handleLastDateOfRegistrationConfirmButton(date)
              }
              minimumDate={new Date(Date.now())}
              maximumDate={new Date(maxDateCancelRegister)}
              onCancel={() => setLastDateOfRegistrationVisible(false)}
            />
          </View>

          <TextInput
            placeholder="0"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            keyboardType="numeric"
            underlineColorAndroid="#f000"
            label="Cost"
            lableColor={Colors.white}
            ref={chargesRef}
            icon={{
              url: Images.dollarIcon,
              width: 8,
              height: 15,
            }}
            iconStyles={{marginRight: -30, marginTop: 2}}
            onSubmitEditing={() => {
              // venueRef.current.focus();
            }}
            containerStyle={AppStyles.mBottom10}
            value={chargesValue.toString()}
            error={errors?.charges}
            onChangeText={value => {
              (util.reg.test(value) || value === '') && setChargesValue(value);
            }}
          />

          <QuantityInput
            quantity={numOfSeats}
            setQuantity={setNumOfSeats}
            error={errors?.seats}
            maxQuantity={1000}
            label={'Number of spots'}
          />

          <View>
            <TextInput
              placeholder="MM/DD/YYYY" //12345
              placeholderTextColor={Colors.grey4}
              returnKeyType="next"
              underlineColorAndroid="#f000"
              label="Last day to cancel"
              lableColor={Colors.white}
              ref={lastCancelDateRef}
              editable={false}
              caretHidden={true}
              containerStyle={AppStyles.mBottom10}
              icon={{
                url: Images.experienceIcon,
                width: 20,
                height: 20,
              }}
              iconOnRight
              onSubmitEditing={() => {
                // this.sportsIntrestRef.focus();
              }}
              onPress={() => setLastCancelDateVisible(true)}
              value={
                !_.isNull(lastCancelDateValue)
                  ? util.getFormattedDateTime(lastCancelDateValue, 'MM/DD/YYYY')
                  : ''
              }
              error={errors?.lastCancelDate}
              onChangeText={value => {
                setLastCancelDateValue(value);
              }}
            />
            <Button
              style={styles.hiddenTap}
              background="transparent"
              onPress={() =>
                maxDateCancelRegister && setLastCancelDateVisible(true)
              }
            />
            <DateTimePickerModal
              isVisible={isLastCancelDateVisible}
              mode="date"
              minimumDate={new Date(Date.now())}
              maximumDate={new Date(maxDateCancelRegister)}
              onConfirm={date => handleLastCancelDateConfirmButton(date)}
              onCancel={() => setLastCancelDateVisible(false)}
            />
          </View>

          <TagInput
            allowFontScaling={false}
            updateState={state => setTags(state)}
            tags={tags}
            placeholder="Tags..."
            label="Keywords:"
            labelStyle={{
              color: Colors.white,
              marginBottom: 10,
              width: '100%',
              padding: 0,
            }}
            leftElement={
              <Icon
                name={'ios-pricetags-outline'}
                color={Colors.grey4}
                size={24}
              />
            }
            leftElementContainerStyle={{marginLeft: 0}}
            containerStyle={{
              paddingHorizontal: 0,
              width: Metrics.screenWidth,
            }}
            inputContainerStyle={{
              borderBottomColor: Colors.grey1,
              borderBottomWidth: 1,
              paddingHorizontal: 10,
              height: 45,
              justifyContent: 'center',
            }}
            inputStyle={{
              color: Colors.white,
            }}
            autoCorrect={false}
            tagStyle={{
              backgroundColor: Colors.white,
              borderColor: Colors.white,
            }}
            tagTextStyle={{
              color: Colors.black,
              fontSize: 12,
            }}
            disabled={disabledTags}
          />

          <TextInput
            placeholder="Write"
            placeholderTextColor={Colors.grey4}
            multiline
            label="Details"
            lableColor={Colors.white}
            numberOfLines={10}
            customStyle={styles.detailStyle}
            ref={detailRef}
            value={detailValue}
            error={errors?.detail}
            onChangeText={value => {
              setDetailValue(value);
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
            subTitle={`Upload Session Photo Here`}
          />

          <Button
            background={Colors.white}
            onPress={onSubmit}
            icon="righArrowIcon"
            iconRight
            raised
            style={{
              ...AppStyles.mLeft30,
              ...AppStyles.mRight30,
              ...AppStyles.mBottom25,
            }}>
            {edit ? strings.UPDATE.toUpperCase() : strings.CREATE.toUpperCase()}
          </Button>
        </KeyboardAwareScrollView>
      </View>
      <Loader loading={loading} />
    </ScreenWrapper>
  );
};

const mapStateToProps = ({general}) => ({
  user_role: general.user_role,
});

const actions = {};

export default connect(mapStateToProps, actions)(AddSession);
