import React, { useEffect, useRef, useState } from 'react';
import AthleteCancelView from './AthleteCancelView';

import { connect, useDispatch } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Images } from '../../../theme';
import { enrollEventDeleteRequest } from '../../../actions/EventsActions';
import { enrollSessionDeleteRequest } from '../../../actions/SessionsActions';
import { cancelEnrollSeasonRequest } from '../../../actions/SeasonsActions';

const AthleteCancelController = props => {
  const [selectedItem, setSelectedItem] = useState([]);
  const [hasCancel, setHasCancel] = useState(false);
  const [error, setError] = useState('');
  const sheetRef = useRef();
  const successSheetRef = useRef();
  const [childIds, setChildIds] = useState(() => []);
  const dispatch = useDispatch();

  const { id, sessionId, isEventView, isSeasonView } = props;

  const cancelAthleteEnroll = () => {
    if (!childIds.length) {
      setError('Please select Athlete first');
    } else {
      setError(null);
      sheetRef.current?.open();
    }
  };

  const handleBottomSheetButtonPress = () => {
    sheetRef.current?.close();
    setSelectedItem([]);
    setHasCancel(true);
    setTimeout(() => {
      successSheetRef.current?.open();
    }, 800);

    isEventView
      ? dispatch(
        enrollEventDeleteRequest({ eventId: id, ids: childIds }),
      )
      : isSeasonView
        ? dispatch(
          cancelEnrollSeasonRequest({ seasonId: id, ids: childIds }),
        )
        : dispatch(
          enrollSessionDeleteRequest({ sessionId: id, ids: childIds }),
        );
  };

  return (
    <AthleteCancelView
      {...props}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      sheetRef={sheetRef}
      successSheetRef={successSheetRef}
      handleBottomSheetButtonPress={handleBottomSheetButtonPress}
      cancelAthleteEnroll={cancelAthleteEnroll}
      hasCancel={hasCancel}
      setHasCancel={setHasCancel}
      error={error}
      setChildIds={setChildIds}
      childIds={childIds}
    />
  );
};

const mapStateToProps = ({ general }) => ({
  user_role: general.user_role,
});

const actions = {};

export default connect(mapStateToProps, actions)(AthleteCancelController);
