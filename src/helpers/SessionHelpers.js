import util from '../util';
import _ from 'lodash';
import {Images} from '../theme';

// in this manipulator we are getting some params from API
export const manipulateSessionsListData = data => {
  if (_.isEmpty(data)) return [];
  let list = data.map(res => {
    res = {
      sessionId: res?.sessionId,
      title: res?.sessionTitle ?? '',
      subTitle: res?.subTitle ?? '',
      eventVenue: res?.eventVenue ?? '',
      eventDate: res?.startDate ?? '',
      startTime: res?.startTime ?? '',
      endTime: res?.endTime ?? '',
      image:
        res.image && !_.isEmpty(res.image)
          ? res.image
          : 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
      ...res,
    };
    return res;
  });

  return list;
};

export const manipulateEnrolledSessionsList = data => {
  
  if (_.isEmpty(data)) return [];

  let list = data.map(res => {
    let users = res.users.map(usr => {
      usr.userImage =
        usr.userImage && !_.isEmpty(usr.userImage)
          ? usr.userImage
          : 'https://athes.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png';

      return usr;
    });

    res = {
      sessionId: res?.sessionId ?? '',
      title: res?.sessionTitle ?? '',
      itemDate: res?.startDate ?? '',
      startTime: res?.startTime ?? '',
      endTime: res?.endTime ?? '',
      users: users ?? [],
      ...res
    };
    return res;
  });
  return list;
};
