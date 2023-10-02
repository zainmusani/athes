// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const NETWORK_INFO = 'NETWORK_INFO';
export const USER_SIGNUP = createRequestTypes('USER_SIGNUP');
export const USER_DELETE = createRequestTypes('USER_DELETE');
export const CONFIRM_OTP = createRequestTypes('CONFIRM_OTP');

export const USER_SIGNIN = createRequestTypes('USER_SIGNIN');

export const AGREE_TERMS = createRequestTypes('AGREE_TERMS');
export const PARENT_VERIFICATION_STATUS = createRequestTypes(
  'PARENT_VERIFICATION_STATUS',
);

export const USER_SIGNOUT = createRequestTypes('USER_SIGNOUT');
export const PAYPAL_APPOVAL = createRequestTypes('PAYPAL_APPOVAL');
export const FORGOT_PASSWORD = createRequestTypes('FORGOT_PASSWORD');
export const FORGOT_PASSWORD_OTP = createRequestTypes('FORGOT_PASSWORD_OTP');
export const FORGOT_CHANGE_PASSWORD = createRequestTypes(
  'FORGOT_CHANGE_PASSWORD',
);
export const CHANGE_PASSWORD = createRequestTypes('CHANGE_PASSWORD');

export const ADD_CREDIT_CARD = createRequestTypes('ADD_CREDIT_CARD');
export const GET_CARD_LIST = createRequestTypes('GET_CARD_LIST');
export const DELETE_CARD = createRequestTypes('DELETE_CARD');
export const VENMO_APPOVAL = createRequestTypes('VENMO_APPOVAL');
export const CHECKOUT_CARD = createRequestTypes('CHECKOUT_CARD');
export const PAYMENT_CHECKOUT = createRequestTypes('PAYMENT_CHECKOUT');

export const GET_USER_DETAIL_BY_ID = createRequestTypes(
  'GET_USER_DETAIL_BY_ID',
);

export const SOCIAL_LOGIN = createRequestTypes('SOCIAL_LOGIN');

export const GET_ROLES = createRequestTypes('GET_ROLES');

export const GET_CURRENT_ROLE = createRequestTypes('GET_CURRENT_ROLE');

export const UPDATE_ROLE = createRequestTypes('UPDATE_ROLE');

export const GET_SPORT_INTREST = createRequestTypes('GET_SPORT_INTREST');

export const UPDATE_SPORT_INTREST = createRequestTypes('UPDATE_SPORT_INTREST');

export const GET_FACILITY_LIST = createRequestTypes('GET_FACILITY_LIST');

export const UPDATE_FACILITY_LIST = createRequestTypes('UPDATE_FACILITY_LIST');

export const GET_HASHTAGS_LIST = createRequestTypes('GET_HASHTAGS_LIST');

export const SIGNUP_ADDITIONAL_INFO = createRequestTypes(
  'SIGNUP_ADDITIONAL_INFO',
);

export const ADD_CHILD = createRequestTypes('ADD_CHILD');

export const EDIT_CHILD = createRequestTypes('EDIT_CHILD');

export const GET_CHILD = createRequestTypes('GET_CHILD');

export const IS_ADDING = 'IS_ADDING';

export const BACK_SCREEN = 'BACK_SCREEN';

export const ADD_POST = createRequestTypes('ADD_POST');

export const EDIT_POST = createRequestTypes('EDIT_POST');

export const DELETE_POST = createRequestTypes('DELETE_POST');

export const ADD_POST_REACTION = createRequestTypes('ADD_POST_REACTION');

export const ADD_COMMENT_REACTION = createRequestTypes('ADD_COMMENT_REACTION');

export const GET_OWN_POSTS_LIST = createRequestTypes('GET_OWN_POSTS_LIST');

export const GET_WALL_POSTS_LIST = createRequestTypes('GET_WALL_POSTS_LIST');
export const GET_SEARCH_POSTS_LIST = createRequestTypes(
  'GET_SEARCH_POSTS_LIST',
);
export const GET_WALL_TOP_USERS = createRequestTypes('GET_WALL_TOP_USERS');

export const GET_CHILD_POSTS_LIST = createRequestTypes('GET_CHILD_POSTS_LIST');

export const GET_PUBLIC_USERS = createRequestTypes('GET_PUBLIC_USERS');

export const FOLLOWING_REQUEST = createRequestTypes('FOLLOWING_REQUEST');

export const GET_FOLLOWERS = createRequestTypes('GET_FOLLOWERS');

export const GET_FOLLOWINGS = createRequestTypes('GET_FOLLOWINGS');

export const HIDE_POST = createRequestTypes('HIDE_POST');

export const SNOOZE_POST = createRequestTypes('SNOOZE_POST');

export const REPORT_POST = createRequestTypes('REPORT_POST');

export const SHARE_POST = createRequestTypes('SHARE_POST');

export const GET_GALLERY = createRequestTypes('GET_GALLERY');

export const EMPTY = createRequestTypes('EMPTY');

export const CREATE_COMMENT = createRequestTypes('CREATE_COMMENT');

export const GET_COMMENTS = createRequestTypes('GET_COMMENTS');

export const EDIT_COMMENT = createRequestTypes('EDIT_COMMENT');

export const DELETE_COMMENT = createRequestTypes('DELETE_COMMENT');

export const GET_POST_REACTIONS = createRequestTypes('GET_POST_REACTIONS');

export const GET_COMMENT_REACTIONS = createRequestTypes(
  'GET_COMMENT_REACTIONS',
);

export const GET_ATHLETES = createRequestTypes('GET_ATHLETES');

export const DELETE_CHILD = createRequestTypes('DELETE_CHILD');

export const GET_INVITE_LIST = createRequestTypes('GET_INVITE_LIST');
export const JOIN_GROUP_BY_NOTIFICATION = createRequestTypes(
  'JOIN_GROUP_BY_NOTIFICATION',
);

// Events Start
export const ADD_EVENT = createRequestTypes('ADD_EVENT');

export const GET_OWN_EVENT = createRequestTypes('GET_OWN_EVENT');

export const GET_PUBLIC_EVENT = createRequestTypes('GET_PUBLIC_EVENT');

export const GET_EVENT_BY_ID = createRequestTypes('GET_EVENT_BY_ID');

export const UPDATE_EVENT = createRequestTypes('UPDATE_EVENT');

export const DELETE_EVENT_BY_ID = createRequestTypes('DELETE_EVENT_BY_ID');

export const ENROLL_EVENT = createRequestTypes('ENROLL_EVENT');

export const EVENT_ATTENDEES = createRequestTypes('EVENT_ATTENDEES');

export const ENROLL_EVENT_DELETE = createRequestTypes('ENROLL_EVENT_DELETE');

export const EVENT_INVITE = createRequestTypes('EVENT_INVITE');

export const ENROLLED_EVENTS = createRequestTypes('ENROLLED_EVENTS');
// Events End

// Session Start
export const ADD_SESSION = createRequestTypes('ADD_SESSION');

export const GET_OWN_SESSION = createRequestTypes('GET_OWN_SESSION');

export const GET_PUBLIC_SESSION = createRequestTypes('GET_PUBLIC_SESSION');

export const GET_SESSION_BY_ID = createRequestTypes('GET_SESSION_BY_ID');

export const UPDATE_SESSION = createRequestTypes('UPDATE_SESSION');

export const DELETE_SESSION_BY_ID = createRequestTypes('DELETE_SESSION_BY_ID');

export const ENROLL_SESSION = createRequestTypes('ENROLL_SESSION');

export const SESSION_ATTENDEES = createRequestTypes('SESSION_ATTENDEES');

export const ENROLL_SESSION_DELETE = createRequestTypes(
  'ENROLL_SESSION_DELETE',
);

export const SESSION_INVITE = createRequestTypes('SESSION_INVITE');

export const ENROLLED_SESSION = createRequestTypes('ENROLLED_SESSION');
// Session End

// Season Start
export const ADD_SEASON = createRequestTypes('ADD_SEASON');

export const GET_OWN_SEASON = createRequestTypes('GET_OWN_SEASON');

export const GET_PUBLIC_SEASON = createRequestTypes('GET_PUBLIC_SEASON');

export const GET_SEASON_BY_ID = createRequestTypes('GET_SEASON_BY_ID');

export const UPDATE_SEASON = createRequestTypes('UPDATE_SEASON');

export const DELETE_SEASON_BY_ID = createRequestTypes('DELETE_SEASON_BY_ID');

export const ENROLL_SEASON = createRequestTypes('ENROLL_SEASON');

export const ENROLL_SEASON_GET = createRequestTypes('ENROLL_SEASON_GET');

export const CANCLE_ENROLL_SEASON = createRequestTypes('CANCLE_ENROLL_SEASON');

export const SEASON_ATTENDEES = createRequestTypes('SEASON_ATTENDEES');

export const SEASON_INVITE = createRequestTypes('SEASON_INVITE');

export const ENROLLED_SEASON = createRequestTypes('ENROLLED_SEASON');

export const GET_SEASON_POSTS = createRequestTypes('GET_SEASON_POSTS');

// Season End

// Payment Start
export const CREATE_STRIPE_TOKEN = createRequestTypes('CREATE_STRIPE_TOKEN');

// Payment End

// Facility Start

export const ADD_FACILITY = createRequestTypes('ADD_FACILITY');

export const UPDATE_FACILITY = createRequestTypes('UPDATE_FACILITY');

export const BOOK_FACILITY = createRequestTypes('BOOK_FACILITY');

export const UNBOOK_FACILITY = createRequestTypes('UNBOOK_FACILITY');

export const DELETE_FACILITY_BY_ID = createRequestTypes(
  'DELETE_FACILITY_BY_ID',
);

export const GET_FACILITIES = createRequestTypes('GET_FACILITIES');

export const GET_OWN_FACILITIES = createRequestTypes('GET_OWN_FACILITIES');

export const GET_FACILITY_BY_ID = createRequestTypes('GET_FACILITY_BY_ID');

// Facility End

// Group Start

export const CREATE_GROUP = createRequestTypes('CREATE_GROUP');

export const UPDATE_GROUP = createRequestTypes('UPDATE_GROUP');

export const DELETE_GROUP_BY_ID = createRequestTypes('DELETE_GROUP_BY_ID');

export const GET_OWN_GROUPS = createRequestTypes('GET_OWN_GROUPS');

export const GET_GROUP_BY_ID = createRequestTypes('GET_GROUP_BY_ID');

export const INVITES_IN_GROUP = createRequestTypes('INVITES_IN_GROUP');

export const GROUP_MEMBERS_LIST = createRequestTypes('GROUP_MEMBERS_LIST');

export const GET_GROUP_POSTS = createRequestTypes('GET_GROUP_POSTS');

export const REMOVE_GROUP_MEMBER = createRequestTypes('REMOVE_GROUP_MEMBER');

// Group End

// Meetings Start

export const ADD_MEETING = createRequestTypes('ADD_MEETING');

export const GET_MEETING = createRequestTypes('GET_MEETING');

export const GET_MEETINGS_LIST = createRequestTypes('GET_MEETINGS_LIST');

export const UPDATE_MEETING = createRequestTypes('UPDATE_MEETING');

export const DELETE_MEETING = createRequestTypes('DELETE_MEETING');

export const BOOK_MEETING = createRequestTypes('BOOK_MEETING');

export const SCHEDULE_MEETING = createRequestTypes('SCHEDULE_MEETING');

export const RESCHEDULE_MEETING = createRequestTypes('RESCHEDULE_MEETING');

export const CANCEL_MEETING = createRequestTypes('CANCEL_MEETING');
export const ADD_WITHDRAW_CARD = createRequestTypes('ADD_WITHDRAW_CARD');
export const WITHDRAW_PAYMENT_CARD = createRequestTypes(
  'WITHDRAW_PAYMENT_CARD',
);
export const VENMO_CHECKOUT = createRequestTypes('VENMO_CHECKOUT');

// Meetings End

// Calendar Start

export const GET_CALENDAR_LIST = createRequestTypes('GET_CALENDAR_LIST');

// Calendar End

// Team Start

export const USER_TEAMS_LIST = createRequestTypes('USER_TEAMS_LIST');

export const TEAM_MEMBERS_LIST = createRequestTypes('TEAM_MEMBERS_LIST');

export const JOIN_TEAM = createRequestTypes('JOIN_TEAM');

export const INVITE_TEAM = createRequestTypes('INVITE_TEAM');

export const UPDATE_TEAM_MEMBER_STATUS = createRequestTypes(
  'UPDATE_TEAM_MEMBER_STATUS',
);

export const DELETE_TEAM_MEMBER = createRequestTypes('DELETE_TEAM_MEMBER');

export const CREATE_TEAM_EVENTS = createRequestTypes('CREATE_TEAM_EVENTS');

export const EDIT_TEAM_EVENTS = createRequestTypes('EDIT_TEAM_EVENTS');

export const GET_TEAM_EVENT_BY_ID = createRequestTypes('GET_TEAM_EVENT_BY_ID');

export const INVITE_TEAM_EVENT = createRequestTypes('INVITE_TEAM_EVENT');

export const ENROLL_TEAM_EVENT = createRequestTypes('ENROLL_TEAM_EVENT');

export const DELETE_TEAM_EVENT_BY_ID = createRequestTypes(
  'DELETE_TEAM_EVENT_BY_ID',
);


// Team End

// Profile Start

export const GET_PROFILE = createRequestTypes('GET_PROFILE');

// Profile end

// setting Start

export const SETTING_PAGES = createRequestTypes('SETTING_PAGES');

export const SUPPORT = createRequestTypes('SUPPORT');

// setting End

export const GET_NOTIFICATIONS_LIST = createRequestTypes(
  'GET_NOTIFICATIONS_LIST',
);

export const UNREAD_NOTIFICATIONS_COUNT = createRequestTypes(
  'UNREAD_NOTIFICATIONS_COUNT',
);
export const NOTIFICATIONS_COUNT = createRequestTypes('NOTIFICATIONS_COUNT');
export const INCREASE_DECREASE_NOTIFICATION_COUNT =
  'INCREASE_DECREASE_NOTIFICATION_COUNT';
export const NOTIFICATION_COUNT_READ = 'NOTIFICATION_COUNT_READ';
export const EMPTY_LIST_NOTIFICATION = 'EMPTY_LIST_NOTIFICATION';

export const SET_SELECTED_TAB = createRequestTypes('SET_SELECTED_TAB');
export const SET_USER_ROLE = createRequestTypes('SET_USER_ROLE');

export const GET_SEARCH_KEYWORDS = createRequestTypes('GET_SEARCH_KEYWORDS');

export const PRIVO = createRequestTypes('PRIVO');
export const SOCKET_KEY = 'SOCKET_KEY';
export const GET_RECENT_CHAT_LISTING = createRequestTypes(
  'GET_RECENT_CHAT_LISTING',
);
export const GET_CHAT_CONTACTS_LIST = createRequestTypes(
  'GET_CHAT_CONTACTS_LIST',
);
export const CREATE_NEW_GROUP = createRequestTypes('CREATE_NEW_GROUP');
export const GET_ROOM_CHAT = createRequestTypes('GET_ROOM_CHAT');
export const SEARCH_CONTACTS_LIST = createRequestTypes('SEARCH_CONTACTS_LIST');
export const ON_CHAT_MESSAGE_RECIEVE = 'ON_CHAT_MESSAGE_RECIEVE';
export const SEND_CHAT_MESSAGE = 'SEND_CHAT_MESSAGE';
export const SAVE_LAST_MSG_UNIX_TIME_OF_EACH_ROOM =
  'SAVE_LAST_MSG_UNIX_TIME_OF_EACH_ROOM';

export const INVESTMENTS = createRequestTypes('INVESTMENTS');

export const EARNINGS = createRequestTypes('EARNINGS');

export const WITHDRAWAL = createRequestTypes('WITHDRAWAL');
export const AFTERWITHDRAWCARD = 'AFTERWITHDRAWCARD';

export const COACHING_SEARCH = createRequestTypes('COACHING_SEARCH');

export const DEVICE_TOKEN_NOTIFICATION = createRequestTypes(
  'DEVICE_TOKEN_NOTIFICATION',
);
export const GET_NOTIFICATIONS = createRequestTypes('GET_NOTIFICATIONS');
export const SINGLE_POST_BY_ID = createRequestTypes('SINGLE_POST_BY_ID');
export const GET_VIDEO_SIGNED_URL = createRequestTypes('GET_VIDEO_SIGNED_URL');

export const INCREASE_COUNT_NOTIFICATION = 'INCREASE_COUNT_NOTIFICATION';

export const ATHES_CART = 'ATHES_CART';
export const SET_CURRENT_ACTIVE_SCREEN_NAME = 'SET_CURRENT_ACTIVE_SCREEN_NAME';
export const SET_CURRENT_ACTIVE_ROOM_ID = 'SET_CURRENT_ACTIVE_ROOM_ID';
export const LOGOUT_USER = createRequestTypes('LOGOUT_USER');
export const SAVE_RECENT_POSTS = 'SAVE_RECENT_POSTS';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const SAVE_DEVICE_TOKEN = 'SAVE_DEVICE_TOKEN';


