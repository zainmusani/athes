import util from '../util';
import _ from 'lodash';
import { Images } from '../theme';

// in this manipulator we are getting some params from API
export const manipulateChildListData = data => {
  if (_.isEmpty(data)) return [];

  let list = data.map(res => {
    let interests = [];
    res.user_interest.forEach(res => {
      interests.push(res.interest_id);
    });

    res = {
      id: res?.id ?? -1,
      name: (res?.fullname || res?.name) ?? '',
      image:
        res?.photo && !_.isEmpty(res?.photo)
          ? res?.photo
          : 'https://athes.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png',
      cover: res?.cover ?? '',
      video: res?.video ?? '',
      description: res?.description ?? '',
      dob: res?.dob ?? '',
      phone: res?.phone ?? '',
      privacy: res?.privacy ?? '',
      username: res?.username ?? '',
      password: res?.password ?? '',
      eventEnrolled: res?.eventEnrolled ?? 0,
      sessionEnrolled: res?.sessionEnrolled ?? 0,
      seasonEnrolled: res?.seasonEnrolled ?? 0,
      selectedInterest: interests,
    };
    return res;
  });

  return list;
};
