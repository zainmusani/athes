import _ from 'lodash';
import { Images } from '../theme';

import moment from 'moment';
import util from '../util';
import {Platform} from 'react-native';

// in this manipulator we are getting some params from API
export const manipulateCalendarListData = data => {
  if (_.isEmpty(data)) return {};

  const obj = {};
  for (const key in data) {
    obj[key] = data[key].map(obj => {
      const newObj = {};
      newObj.title = obj.title || 'Meeting';
      newObj.start_time = obj.startTime || util.formatDate(obj.startDate) || (obj.slot && util.convertTimeInto12(obj.slot));
      // (obj.slot && `0${obj.slot.slice(1, 2)}:00`);
      newObj.end_time = obj.endTime || util.formatDate(obj.endDate);
      newObj.location = obj.venue;
      newObj.booked_by = obj.user.name;
      newObj.image = obj.user.image || Images.userEmptyImage;
      newObj.charges = obj.charges;
      newObj.type = obj.type;
      newObj.role = obj.user.role;
      newObj.date = obj.date || util.formatDate(obj.startDate) || obj.booking;
      newObj.userId = obj.user.id;
      newObj.meetingId = obj.meetingId || null;
      newObj.booking = obj.booking && util.formatDate(obj.booking);
      newObj.facilityId = obj.facilityId;
      newObj.eventId = obj.eventId;
      newObj.teamEventId = obj.teamEventId;
      newObj.sessionId = obj.sessionId;
      newObj.seasonId = obj.seasonId;
      newObj.customStyles = {
        container: {
          backgroundColor: 'white',
        },
      };
      return newObj;
    });
  }

  return obj;
};
