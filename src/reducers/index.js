import {combineReducers} from 'redux';

import navigator from './navigator';
import user from './user';
import post from './post';
import parent from './parent';
import comments from './comments';
import athletes from './athletes';
import general from './general';
import notification from './notification';
import events from './events';
import sessions from './sessions';
import seasons from './seasons';
import facility from './facility';
import group from './group';
import setting from './setting';
import meetings from './meetings';
import calendar from './calendar';
import team from './team';
import profile from './profile';
import chat from './chat';
import payment from './payment';

export default combineReducers({
  route: navigator,
  user,
  parent,
  post,
  comments,
  athletes,
  general,
  notification,
  events,
  sessions,
  seasons,
  facility,
  group,
  setting,
  meetings,
  calendar,
  team,
  profile,
  chat,
  payment,
});
