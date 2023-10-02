import React, {useEffect, useRef, useState} from 'react';
import _ from 'lodash';
import {StatusBar, View, Image, FlatList} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import {connect, useDispatch, useSelector} from 'react-redux';
import util from '../../../../util';
import {
  Button,
  DatePicker,
  Loader,
  ScreenWrapper,
  TextInput,
  UploadImage,
  ButtonView,
  QuantityInput,
  SelectBox,
  Text,
} from '../../../../components';
import {strings} from '../../../../constants';
import {AppStyles, Colors, Fonts, Images, Metrics} from '../../../../theme';
import styles from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {uploadImageToServer} from '../../../../helpers/ImageUploaderHelper';
import moment from 'moment';
import {
  createTeamEventRequest,
  editTeamEventRequest,
  getTeamEventByIdRequest,
} from '../../../../actions/TeamActions';

const TeamCalendar = props => {
  const {edit, data, eventId} = props;
  const loggedInUser = useSelector(state => state.user.data);
  const [loading, setLoading] = useState(false);
  const [titleValue, setTitleValue] = useState(() =>
    edit ? data?.eventTitle : '',
  );
  const [venueValue, setVenueValue] = useState(() =>
    edit ? data?.eventVenue : '',
  );
  // start event date
  const [dateValue, setDateValue] = useState(() =>
    edit ? new Date(data?.startDate) : '',
  );

  // Start Time event
  const [timeValue, setTimeValue] = useState(() =>
    edit ? moment(data?.startTime, [moment.ISO_8601, 'hh:mm A']).toDate() : '',
  );

  const [isStartTimeVisible, setIsStartTimeVisible] = useState(false);

  const [chargesValue, setChargesValue] = useState(data?.charges || '');

  const [detailValue, setDetailValue] = useState(() =>
    edit ? data?.description : '',
  );
  //
  const [imageUri, setImageUri] = useState(edit ? data?.image : '');

  const [errors, setErrors] = useState();

  const titleRef = useRef(null);
  const venueRef = useRef(null);
  const chargesRef = useRef(null);
  const detailRef = useRef(null);
  const dispatch = useDispatch();

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

    if (!_.isDate(dateValue)) {
      // event start date is required
      errors.eventDate = util.isRequiredErrorMessage('Event date');
    }

    if (!_.isDate(timeValue)) {
      // session end date is required
      errors.eventTime = util.isRequiredErrorMessage('Event start time');
    }

    if (chargesValue && !util.isNumber(chargesValue)) {
      // invalid Charge
      errors.charges = util.isRequiredErrorMessage('Invalid Charges');
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
    setLoading(true)
    let eventDate = util.getFormattedDateTime(dateValue, 'YYYY/MM/DD');

    const payload = {
      eventTitle: titleValue,
      eventVenue: venueValue,
      date: eventDate,
      startTime: util.getFormattedDateTime(timeValue, 'HH:mm:ss'),
      description: detailValue,
      image: !_.isEmpty(imageUri)
        ? imageUri
        : 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
      charges: !_.isEmpty(chargesValue) ? chargesValue : 0,
      invites: [],
    };

    if (edit) {
      dispatch(
        editTeamEventRequest({...payload, eventId}, res => {
          setLoading(false);
          if (res) {
            let payload = {
              eventId: eventId?.toString(),
              idForEnrollment: loggedInUser.id,
            };
            dispatch(
              getTeamEventByIdRequest(payload, res => res && Actions.pop()),
            );
          }
        }),
      );
    } else {
      dispatch(
        createTeamEventRequest(payload, res => {
          setLoading(false);
          if (res) {
            Actions.replace('invitePeopleScreen', {
              payload: payload,
              isAddedTeamEventForm: true,
              isSkipButtonVisible: true,
              creatorId: loggedInUser.id,
              detailData: res,
              teamEventId: res?.teamEventId,
            });
          }
        })
      );
    }
  };

  // start Time event
  const handleStartTime = time => {
    // time = util.formatAMPM(time);
    setTimeValue(time);
    setIsStartTimeVisible(false);
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
      headerTitle={'Team Event'}>
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

          <DatePicker
            label={'Event Date'}
            dobValue={dateValue}
            setDobValue={setDateValue}
            error={errors?.eventDate}
            minimumDate={new Date(Date.now() + 86400000)}
          />

          <View style={{...AppStyles.mTop15, flex: 1}}>
            <TextInput
              placeholder="Select Time"
              placeholderTextColor={Colors.grey4}
              underlineColorAndroid="#f000"
              label="Event Start Time"
              lableColor={Colors.white}
              editable={false}
              caretHidden={true}
              value={util.getFormattedDateTime(timeValue, 'hh:mm A')}
              onChangeText={value => {
                setTimeValue(value);
              }}
              containerStyle={AppStyles.mBottom10}
              error={errors?.eventTime}
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
              is24Hour={false}
              onConfirm={time => handleStartTime(time)}
              onCancel={() => setIsStartTimeVisible(false)}
            />
          </View>

          <TextInput
            placeholder="0"
            placeholderTextColor={Colors.grey4}
            returnKeyType="next"
            keyboardType="numeric"
            underlineColorAndroid="#f000"
            label="Cost (Optional)"
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
            subTitle={`Upload Event Photo Here`}
          />

          <Button
            background={Colors.white}
            onPress={onSubmit}
            icon="righArrowIcon"
            iconRight
            isLoading={loading}
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

export default connect(mapStateToProps, actions)(TeamCalendar);
