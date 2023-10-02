// @flow
import {connect, useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import React, {Component, useEffect, useRef, useState} from 'react';
import {Image, View, ScrollView} from 'react-native';
import styles from './styles';
import {
  Button,
  ButtonView,
  ScreenWrapper,
  TextInput,
  Text,
  SelectBox,
  Loader,
  DatePicker,
  MultiSelectBox,
} from '../../components';
import {AppStyles, Colors, Images} from '../../theme';
import {
  coachAddCalenderOptions,
  strings,
  timeArray,
  cancelBeforeOptions,
} from '../../constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {
  addMeetingRequest,
  getMeetingRequest,
  getMeetingsListRequest,
  updateMeetingRequest,
} from '../../actions/MeetingsActions';

const CoachCalendar = ({edit, meeting, availabilityId}) => {
  const [venueValue, setVenueValue] = useState(() =>
    edit ? meeting?.venue : '',
  );
  const [slotTypeValue, setSlotTypeValue] = useState(() =>
    edit ? 'individual' : '',
  );
  //
  const [loading, setLoading] = useState(false);
  const [dateValue, setDateValue] = useState(() =>
    edit ? meeting?.date?.replaceAll('-', '/') : '',
  );
  const [startDateValue, setStartDateValue] = useState(() => '');
  const [endDateValue, setEndDateValue] = useState(() => '');
  const [isStartDateVisible, setIsStartDateVisible] = useState(false);
  const [isEndDateVisible, setIsEndDateVisible] = useState(false);
  //
  const [chargesValue, setChargesValue] = useState(() =>
    edit ? meeting?.charges?.toString() : false,
  );
  //
  const [lastCancelDateValue, setLastCancelDateValue] = useState(() =>
    edit ? 'Before ' + meeting?.lastCancellationDate : '',
  );
  //

  const [selectedInterests, setSelectedInterests] = useState(
    edit
      ? meeting?.slots?.map(({time}) => ({
          title: time.slice(0, 5),
          id: +time.slice(1, 2),
        }))
      : [],
  );

  const [errors, setErrors] = useState({
    venue: null,
    date: null,
    charges: null,
    lastCancelDate: null,
    sportInterest: null,
    slotType: null,
    startDate: null,
    endDate: null,
  });

  const venueRef = useRef(null);
  const dateRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);
  const chargesRef = useRef(null);
  const sportsInterestRef = useRef(null);
  const dispatch = useDispatch();

  const validateForm = () => {
    const errors = {};

    if (_.isEmpty(venueValue)) {
      // email is required
      errors.venue = util.isRequiredErrorMessage('Venue');
    }

    if (_.isEmpty(slotTypeValue)) {
      // Detail is required
      errors.slotType = util.isRequiredErrorMessage('SlotType');
    }

    if (slotTypeValue == strings.individual && !_.isDate(dateValue)) {
      //  date  is required
      errors.date = util.isRequiredErrorMessage('Date');
    }

    if (slotTypeValue == strings.multipleDays && !_.isDate(startDateValue)) {
      //  date  is required
      errors.startDate = util.isRequiredErrorMessage('Start Date');
    }

    if (slotTypeValue == strings.multipleDays && !_.isDate(endDateValue)) {
      //  date  is required
      errors.endDate = util.isRequiredErrorMessage('End Date');
    }

    if (_.isEmpty(selectedInterests)) {
      errors.sportInterest = 'Time is required';
    }

    if (_.isEmpty(chargesValue)) {
      // charges is required
      errors.charges = util.isRequiredErrorMessage('Charge');
    } else if (!util.isNumber(chargesValue)) {
      // invalid Charge
      errors.charges = util.isRequiredErrorMessage('Invalid Charges');
    }

    if (_.isEmpty(lastCancelDateValue)) {
      // last date of registration is required
      errors.lastCancelDate = util.isRequiredErrorMessage(
        'Cancel Booking Before',
      );
    }

    if (!_.isEmpty(errors)) {
      setErrors(errors);

      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (!validateForm()) return;

    let date = util.getFormattedDateTime(dateValue, 'YYYY/MM/DD');

    let startDate = util.getFormattedDateTime(startDateValue, 'YYYY/MM/DD');
    let endDate = util.getFormattedDateTime(endDateValue, 'YYYY/MM/DD');

    let selectedInterest = util.getTitlesFromSelectArray(selectedInterests);

    const payload = {
      venue: venueValue,
      date: dateValue ? [date] : [startDate, endDate],
      time: selectedInterest,
      lastCancellationDate: lastCancelDateValue.replace('Before ', ''),
      charges: chargesValue,
    };

    if (edit) {
      setLoading(true);
      dispatch(
        updateMeetingRequest({...payload, availabilityId}, (res, err) => {
          setLoading(false);
          if (res) {
            Actions.replace('profile', {
              tab: 'Calendar',
              requested_role: 3,
              publicView: false,
            });
          }
        }),
      );
    } else {
      dispatch(
        addMeetingRequest(payload, (res, err) => {
          setLoading(true);
          setLoading(false);
          if (res) {
            Actions.replace('profile', {
              tab: 'Calendar',
              requested_role: 3,
              publicView: false,
            });
          }
        }),
      );
    }
  };

  // date

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TextInput
          placeholder="Enter Venue"
          placeholderTextColor={Colors.grey2}
          returnKeyType="next"
          underlineColorAndroid="#f000"
          label="Venue"
          lableColor={'#A2A5B8'}
          ref={venueRef}
          onSubmitEditing={() => {
            venueRef.current.blur();
          }}
          containerStyle={AppStyles.mBottom10}
          value={venueValue}
          error={errors.venue}
          onChangeText={value => {
            setVenueValue(value);
          }}
        />
        {!edit && (
          <SelectBox
            array={coachAddCalenderOptions}
            label="Slot Type"
            icon={Images.downIconBlack}
            isRightIcon
            setData={setSlotTypeValue}
            value={slotTypeValue}
            error={errors.slotType}
            onChangeText={value => {
              setSlotTypeValue(value);
            }}
          />
        )}
        {slotTypeValue == strings.individual && (
          <DatePicker
            label={'Slot Date'}
            dobValue={dateValue}
            setDobValue={setDateValue}
            error={errors?.date}
            minimumDate={new Date(Date.now() + 86400000)}
          />
        )}
        {slotTypeValue == strings.multipleDays && (
          <>
            <DatePicker
              label={'Start Date'}
              dobValue={startDateValue}
              setDobValue={setStartDateValue}
              error={errors?.startDate}
              minimumDate={new Date(Date.now() + 86400000)}
              // handleConfirmCallback
            />
            <DatePicker
              label={'End Date'}
              dobValue={endDateValue}
              setDobValue={setEndDateValue}
              error={errors?.endDate}
              minimumDate={new Date(Date.now() + 86400000)}
              // handleConfirmCallback
            />
          </>
        )}

        <MultiSelectBox
          time
          data={timeArray}
          label={`Slots`}
          error={errors?.sportInterest}
          selectedValue={selectedInterests}
          setSelectedValue={setSelectedInterests}
        />

        <TextInput
          placeholder="0"
          placeholderTextColor={Colors.grey2}
          returnKeyType="next"
          keyboardType="numeric"
          underlineColorAndroid="#f000"
          label="Charges"
          lableColor={'#A2A5B8'}
          ref={chargesRef}
          icon={{
            url: Images.dollarIcon,
            width: 8,
            height: 15,
          }}
          iconStyles={{marginRight: -30, marginTop: 2}}
          onSubmitEditing={() => {
            chargesRef.current.blur();
          }}
          containerStyle={AppStyles.mBottom10}
          value={chargesValue}
          error={errors.charges}
          onChangeText={value => {
            util.reg.test(value) ? setChargesValue(value) : setChargesValue('');
          }}
        />

        <SelectBox
          array={cancelBeforeOptions}
          label="Cancel Booking Before"
          icon={Images.downIconBlack}
          isRightIcon
          setData={setLastCancelDateValue}
          value={lastCancelDateValue}
          error={errors.lastCancelDate}
          onChangeText={value => {
            setLastCancelDateValue(value);
          }}
        />
      </ScrollView>

      <Button
        background={Colors.white}
        onPress={() => onSubmit()}
        disabled={false}
        icon="righArrowIcon"
        iconRight
        raised
        style={[
          AppStyles.mLeft30,
          AppStyles.mRight30,
          AppStyles.mBottom15,
          AppStyles.mTop10,
        ]}>
        {'Continue'.toUpperCase()}
      </Button>
      <Loader loading={loading} />
    </>
  );
};

export default CoachCalendar;
