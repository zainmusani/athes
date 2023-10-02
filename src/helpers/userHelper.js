import util from '../util';
import _ from 'lodash';
import { Images } from '../theme';
import {facilityList} from '../constants';

// in this manipulator we are getting some params from API
export const manipulateLoggedInUserData = res => {
  if (_.isEmpty(res)) return null;

  let user = {
    // ...res,
    id: res?.id ?? -1,
    name: res?.name ?? '',
    email: res?.email ?? '',
    image: res?.image && !_.isEmpty(res?.image) ? res?.image : 'https://athes.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png',
    phone: res?.phone ?? '',
    role: res?.role ?? null,
    parentId: res?.parentId ?? null,
    access_token: res?.access_token ?? '',
    refresh_token: res?.refresh_token ?? '',
    followers: res?.followers ?? '',
    following: res?.following ?? '',
    privacy: res?.privacy ?? '',
    ...res,
  };
  return user;
};

export const manipulateFacilityListData = data => {
  if (_.isEmpty(data)) return null;

  let failities = data.map(res => {
    res = {
      id: res?.id ?? -1,
      title: res?.facility ?? '',
    };
    return res;
  });

  return failities;
};

export const manipulateSportIntrestData = data => {
  if (_.isEmpty(data)) return null;

  let interests = data.map(res => {
    res = {
      id: res?.id ?? -1,
      title: res?.interest ?? '',
    };
    return res;
  });

  return interests;
};

export const manipulateHashtagsData = data => {
  if (_.isEmpty(data)) return null;

  let getHashtagsList = data.map(res => {
    res = {
      id: res?.id ?? -1,
      title: res?.tag ?? '',
    };
    return res;
  });

  return getHashtagsList;
};

export const manipulateUerRolesData = data => {
  if (_.isEmpty(data)) return null;

  let roles = data.map(res => {
    res = {
      id: res?.id ?? -1,
      tag: res?.role_name ?? '',
      icon: res?.icon ? res.icon : Images.athletes,
    };
    return res;
  });

  return roles;
};

export const manipulatePublicUsersList = data => {
  if (_.isEmpty(data)) return null;

  let list = data.map(res => {
    res.userId = res?.userId ?? '';
    res.parentId = res?.parentId ?? null;
    res.follow = res?.follow ?? 0;
    res.name = res?.name ?? '';
    res.email = res?.email ?? '';
    res.image =
      res?.image && !_.isEmpty(res?.image)
        ? res?.image
        : 'https://athes.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png';

    res.privacy = res?.privacy ?? 'public';
    res.role_id = res?.role_id ?? 0;
    res.isSelected = false;
    return res;
  });
  return list;
};

export const manipulateUserTeamsList = data => {
  if (_.isEmpty(data) || data.length == 0) return [];

  let __tm = data.map(team => {
    team.title = team.name;
    team.isSelected = false;
    return team;
  });
  return __tm;
};
// in this manipulator we are getting some params from API
export const manipulateUserProfileData = res => {
  if (_.isEmpty(res)) return null;

  let data = {
    bookedDates: res?.bookedDates ?? [],
    childs: res?.childs ?? [],
    eventSessionSeason: res?.eventSessionSeason ?? [],
    facilityList: res?.facilityList ?? [],
    bookedFacility: res?.bookedFacility ?? [],
    facilities: res?.facilities ?? [],
    ageGroup: res?.ageGroup ?? [],
    interest: res?.interest ?? [],
    playerList: res?.playerList ?? [],
    teams: res?.teams ?? [],
    isFollow: res?.isFollow ?? 0,
    followers: res?.followers ?? 0,
    following: res?.following ?? 0,
    isMember: res?.isMember ?? null,
    role_id: res?.role_id ?? null,
    user: res?.user ?? {},
    ...res,
  };

  if (data?.facilityList.length > 0) {
    let facility = data?.facilityList.map(fac => {
      fac.icon = fac.image;
      return fac;
    });
    data.facilityList = facility;
  }
  if (data?.teams.length > 0) {
    let teams = data?.teams.map(tm => {
      tm.icon = tm.image;
      return tm;
    });
    data.teams = teams;
  }
  if (data?.playerList.length > 0) {
    let players = data?.playerList.map(pl => {
      pl.icon = pl.image;
      return pl;
    });
    data.playerList = players;
  }

  data.user.isFollow = res.isFollow;
  data.user.role_id = res.role_id;
  data.user.image = res?.user?.image
    ? res?.user?.image
    : 'https://athes.s3.us-east-2.amazonaws.com/Profile_avatar_placeholder_large.png';

  return data;
};

export const manipulateTeamMembersList = data => {
  if (_.isEmpty(data) || data.length == 0) return [];

  let __tm = data.map(team => {
    team.isSelected = false;
    team.userId = team?.id ?? -1;
    return team;
  });
  return __tm;
};
