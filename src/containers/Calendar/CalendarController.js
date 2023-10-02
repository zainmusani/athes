import React, {useRef, useState} from 'react';
import {connect} from 'react-redux';
import CalendarView from './CalendarView';

const CalendarController = props => {
  const {calendarList} = props;
  const [RBSheetButton, setRBSheetButton] = useState('');
  const [item, setItem] = useState({});
  const sheetRef = useRef(null);

  const selectItem = (item, idx) => {
    setItem(item);
  };

  return (
    <CalendarView
      RBSheetButton={RBSheetButton}
      calendarList={calendarList}
      setRBSheetButton={setRBSheetButton}
      item={item}
      selectItem={selectItem}
      sheetRef={sheetRef}
      {...props}
    />
  );
};

const mapStateToProps = ({general, calendar}) => ({
  user_role: general.user_role,
  calendarList: calendar.calendarList,
});


const actions = {};

export default connect(mapStateToProps, actions)(CalendarController);
