import React, { useEffect, useRef, useState } from 'react';
import AthleteEnrollView from './AthleteEnrollView';
import { connect, useDispatch } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Images } from '../../../theme';
import { enrollEventRequest } from '../../../actions/EventsActions';
import { enrollSeasonRequest } from '../../../actions/SeasonsActions';
import { enrollSessionRequest } from '../../../actions/SessionsActions';

const AthleteEnrollController = props => {
  const [selectAthlete1, setSelectAthlete1] = useState(false);
  const [selectAthlete2, setSelectAthlete2] = useState(false);
  const [errors, setErrors] = useState(() => null);
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [childIds, setChildIds] = useState(() => []);
  const [isModalVisible, setModalVisible] = useState(false);
  const { data, isEventView, isSessionView, isSeasonView, id } = props;
  const dispatch = useDispatch();

  const sheetRef = useRef();

  const enrollAthelete = () => {
    if (!childIds.length) {
      setErrors('Please select Athlete first.');
    } else {
      setErrors(null);
      
      if (data?.charges === 0) {
        isEventView
          ? dispatch(
            enrollEventRequest({ eventId: id, ids: childIds }, res => {
              setTimeout(() => {
                setModalVisible(true);
              }, 900);
            }),
          )
          : isSeasonView
            ? dispatch(
              enrollSeasonRequest({ seasonId: id, ids: childIds }, res => {
                setTimeout(() => {
                  setModalVisible(true);
                }, 900);
              }),
            )
            : dispatch(
              enrollSessionRequest({ sessionId: id, ids: childIds }, res => {
                setTimeout(() => {
                  setModalVisible(true);
                }, 900);
              }),
            );
      } else {
        setShowPaymentSheet(true);
      }
    }
  };

  return (
    <AthleteEnrollView
      {...props}
      selectAthlete1={selectAthlete1}
      setSelectAthlete1={setSelectAthlete1}
      selectAthlete2={selectAthlete2}
      setSelectAthlete2={setSelectAthlete2}
      sheetRef={sheetRef}
      enrollAthelete={enrollAthelete}
      errors={errors}
      showPaymentSheet={showPaymentSheet}
      setShowPaymentSheet={setShowPaymentSheet}
      setChildIds={setChildIds}
      childIds={childIds}
      setModalVisible={setModalVisible}
      isModalVisible={isModalVisible}
    />
  );
};

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(AthleteEnrollController);
