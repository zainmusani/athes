import _ from 'lodash';
import util from '../util';

const devUrl = 'https://apidev.athes.io/';
const statgingUrl = 'https://stagingapi.athes.io/';
const statgingDockerUrl = 'https://apistaging.athes.io/';
const prodUrl = 'https://api.athes.io/';
const ngRokUrl = 'https://d9f6-182-188-42-224.ngrok.io/';
const prodChatUrl = 'https://chat.athes.io/';
const stagingChatUrl = 'https://stagingchat.athes.io/';
const ngRokChatUrl = 'https://d157-182-188-42-224.ngrok.io/';

export const BASE_URL = statgingUrl;
export const CHAT_BASE_URL = stagingChatUrl;

export const PROJECT_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0Ijp7Im5hbWUiOiJBdGhlcy1pbyIsInNlY3JldCI6ImExdDIwaDhlNXMxOS1pOW8xNSJ9LCJpYXQiOjE2NTI0NDY3MjR9.mm8AIyiupUbt6mXWOGFYK9FrtZ-r7fbMBM24rytpJTQ';

// export const API_TIMEOUT = 30000;
export const API_TIMEOUT = 300000000;

// API USER ROUTES
export const API_LOG = true;

const authVersion = 'v1';
const apiVersion = 'v1';

const preFixAuth = `auth/${authVersion}/`;
const preFixApi = `api/${apiVersion}/`;


export const ERROR_SOMETHING_WENT_WRONG = {
  message: 'Something went wrong, Please try again later',
  error: 'Something went wrong, Please try again later',
};
export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please check your network connection and try again.',
  error: 'Please check your network connection and try again.',
};

export const ERROR_TOKEN_EXPIRE = {
  message: 'Session Expired, Please login again!',
  error: 'Session Expired, Please login again!',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// API USER ROUTES
export const USER_SIGNUP = {
  route: `${preFixAuth}send-otp`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const CONFIRM_OTP = {
  route: `${preFixAuth}confirm-otp`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const USER_DELETE = {
  route: `${preFixAuth}user`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const USER_SIGNIN = {
  route: `${preFixApi}login`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_USER_DETAIL_BY_ID = {
  route: `${preFixApi}users`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const FORGOT_PASSWORD = {
  route: `${preFixAuth}forget-password`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const FORGOT_PASSWORD_OTP = {
  route: `${preFixAuth}forget-password/confirm-otp`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const FORGOT_CHANGE_PASSWORD = {
  route: `${preFixAuth}forget-password/change-password`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const SOCIAL_LOGIN = {
  route: `${preFixAuth}social-login`,
  access_token_required: false,
  type: REQUEST_TYPE.POST,
};

export const GET_ROLES = {
  route: `${preFixApi}roles`,
  access_token_required: false,
  type: REQUEST_TYPE.GET,
};

export const GET_CURRENT_ROLE = {
  route: `${preFixApi}user/role/get`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const UPDATE_ROLE = {
  route: `${preFixApi}user/role/update`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const GET_FACILITY_LIST = {
  route: `${preFixApi}facilities`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const UPDATE_FACILITY_LIST = {
  route: `${preFixApi}user/facility/update`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const GET_SPORT_INTREST = {
  route: `${preFixApi}interest`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const UPDATE_SPORT_INTREST = {
  route: `${preFixApi}user/interest/update`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const SIGNUP_ADDITIONAL_INFO = {
  route: `${preFixApi}user/userinfo`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const ADD_CHILD = {
  route: `${preFixApi}user/child`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const EDIT_CHILD = {
  route: `${preFixApi}user/child`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const DELETE_CHILD = {
  route: `${preFixAuth}user/child`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const GET_CHILD = {
  route: `${preFixApi}user/child`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const ADD_POST = {
  route: `${preFixApi}user/post`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const EDIT_POST = {
  route: `${preFixApi}user/post`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const DELETE_POST = {
  route: `${preFixApi}user/post`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const GET_OWN_POSTS_LIST = {
  route: `${preFixApi}user/post/own`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_CHILD_POSTS_LIST = {
  route: `${preFixApi}user/post/child`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_WALL_POSTS_LIST = {
  route: `${preFixApi}user/post/wall`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_SEARCH_POSTS_LIST = {
  route: `${preFixApi}user/post/search`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_PUBLIC_USERS = {
  route: `${preFixApi}publicuser`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_FOLLOWERS = {
  route: `${preFixApi}user/follower`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const ADD_POST_REACTION = {
  route: `${preFixApi}user/post/reaction`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_POST_REACTIONS = {
  route: `${preFixApi}user/post/reaction`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_FOLLOWINGS = {
  route: `${preFixApi}user/following`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const FOLLOWING_REQUEST = {
  route: `${preFixApi}user/following`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const HIDE_POST = {
  route: `${preFixApi}user/post/hide`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const CREATE_COMMENT = {
  route: `${preFixApi}user/comment`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_COMMENTS = {
  route: `${preFixApi}user/comment`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const EDIT_COMMENT = {
  route: `${preFixApi}user/comment`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const SNOOZE_POST = {
  route: `${preFixApi}user/post/snoozed`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const REPORT_POST = {
  route: `${preFixApi}user/post/report`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const DELETE_COMMENT = {
  route: `${preFixApi}user/comment`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};

export const ADD_COMMENT_REACTION = {
  route: `${preFixApi}user/comment/reaction`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_GALLERY = {
  route: `${preFixApi}user/gallery`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_COMMENT_REACTIONS = {
  route: `${preFixApi}user/comment/reaction`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const SHARE_POST = {
  route: `${preFixApi}user/post/share`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
// Events Requests Start
export const ADD_EVENT = {
  route: `${preFixApi}user/event`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_OWN_EVENT = {
  route: `${preFixApi}user/event/own`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_PUBLIC_EVENT = {
  route: `${preFixApi}publicevent`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_EVENT_BY_ID = {
  route: `${preFixApi}user/event/own`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const UPDATE_EVENT = {
  route: `${preFixApi}user/event`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const DELETE_EVENT_BY_ID = {
  route: `${preFixApi}user/event`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const ENROLL_EVENT = {
  route: `${preFixApi}user/event/enrolled`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ENROLL_EVENT_DELETE = {
  route: `${preFixApi}user/event/enrolled`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const EVENT_ATTENDEES = {
  route: `${preFixApi}user/event/enrolled`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const EVENT_INVITE = {
  route: `${preFixApi}user/event/invite`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ENROLLED_EVENTS = {
  route: `${preFixApi}user/enrolled/event`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
// Events Requests End

// Session Requests Start
export const ADD_SESSION = {
  route: `${preFixApi}user/session`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_OWN_SESSION = {
  route: `${preFixApi}user/session/own`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_PUBLIC_SESSION = {
  route: `${preFixApi}publicsession`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_SESSION_BY_ID = {
  route: `${preFixApi}user/session/own`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const UPDATE_SESSION = {
  route: `${preFixApi}user/session`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const DELETE_SESSION_BY_ID = {
  route: `${preFixApi}user/session`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const ENROLL_SESSION = {
  route: `${preFixApi}user/session/enrolled`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ENROLL_SESSION_DELETE = {
  route: `${preFixApi}user/session/enrolled`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const SESSION_ATTENDEES = {
  route: `${preFixApi}user/session/enrolled`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SESSION_INVITE = {
  route: `${preFixApi}user/session/invite`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ENROLLED_SESSION = {
  route: `${preFixApi}user/enrolled/session`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
// Session Requests End

// Season Requests Start
export const ADD_SEASON = {
  route: `${preFixApi}user/season`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_OWN_SEASON = {
  route: `${preFixApi}user/season/own`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_PUBLIC_SEASON = {
  route: `${preFixApi}publicseason`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_SEASON_BY_ID = {
  route: `${preFixApi}user/season/own`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const UPDATE_SEASON = {
  route: `${preFixApi}user/season`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const DELETE_SEASON_BY_ID = {
  route: `${preFixApi}user/season`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const ENROLL_SEASON = {
  route: `${preFixApi}user/season/enrolled`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ENROLL_SEASON_GET = {
  route: `${preFixApi}user/season/enrolled`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const CANCLE_ENROLL_SEASON = {
  route: `${preFixApi}user/season/enrolled`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const ENROLLED_SEASON = {
  route: `${preFixApi}user/enrolled/season`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SEASON_ATTENDEES = {
  route: `${preFixApi}user/season/enrolled`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const SEASON_INVITE = {
  route: `${preFixApi}user/season/invite`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_SEASON_POSTS = {
  route: `${preFixApi}user/season/post`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
// Season Requests End

// Hashtags Requests start
export const GET_HASHTAGS_LIST = {
  route: `${preFixApi}hashtag`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
// Hashtags Requests end

// Payments Request Start
export const CREATE_STRIPE_TOKEN = {
  route: `${preFixApi}user/stripe/card`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
// Payments Request End

// Facility Request Start
export const GET_FACILITIES = {
  route: `${preFixApi}publicfacility`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const ADD_FACILITY = {
  route: `${preFixApi}user/facility/services`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPDATE_FACILITY = {
  route: `${preFixApi}user/facility/services`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const DELETE_FACILITY_BY_ID = {
  route: `${preFixApi}user/facility/services`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const GET_OWN_FACILITIES = {
  route: `${preFixApi}user/facility/services/own`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_FACILITY_BY_ID = {
  route: `${preFixApi}user/facility/services/own`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const BOOK_FACILITY = {
  route: `${preFixApi}user/facility/services/booked`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UNBOOK_FACILITY = {
  route: `${preFixApi}user/facility/services/booked`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
// Facility Request End

// group Request Start
export const CREATE_GROUP = {
  route: `${preFixApi}user/group`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPDATE_GROUP = {
  route: `${preFixApi}user/group`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const DELETE_GROUP_BY_ID = {
  route: `${preFixApi}user/group`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const GET_OWN_GROUPS = {
  route: `${preFixApi}user/group/own`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_GROUP_BY_ID = {
  route: `${preFixApi}user/group/own`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const INVITES_IN_GROUP = {
  route: `${preFixApi}user/group/invite`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_GROUP_POSTS = {
  route: `${preFixApi}user/group/post`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GROUP_MEMBERS_LIST = {
  route: `${preFixApi}user/group/member`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const REMOVE_GROUP_MEMBER = {
  route: `${preFixApi}user/group/member`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
// group Request End

// meeting Request Start
export const ADD_MEETING = {
  route: `${preFixApi}user/availability`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_MEETING = {
  route: `${preFixApi}user/availability/get`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const GET_MEETINGS_LIST = {
  route: `${preFixApi}user/availability`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const UPDATE_MEETING = {
  route: `${preFixApi}user/availability`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const DELETE_MEETING = {
  route: `${preFixApi}user/availability`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const BOOK_MEETING = {
  route: `${preFixApi}user/availability/meeting`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const SCHEDULE_MEETING = {
  route: `${preFixApi}user/availability/meeting`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const RESCHEDULE_MEETING = {
  route: `${preFixApi}user/availability/meeting`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const CANCEL_MEETING = {
  route: `${preFixApi}user/availability/meeting`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
// meeting Request End

// calendar Request Start
export const GET_CALENDAR_LIST = {
  route: `${preFixApi}user/calendar`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
// calendar Request End

// team Request Start
export const USER_TEAMS_LIST = {
  route: `${preFixApi}user/team`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const TEAM_MEMBERS_LIST = {
  route: `${preFixApi}user/team/member`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const JOIN_TEAM = {
  route: `${preFixApi}user/team/member`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const INVITE_TEAM = {
  route: `${preFixApi}user/team/invite`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const UPDATE_TEAM_MEMBER_STATUS = {
  route: `${preFixApi}user/team/member`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const DELETE_TEAM_MEMBER = {
  route: `${preFixApi}user/team/member`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const CREATE_TEAM_EVENTS = {
  route: `${preFixApi}user/team/event`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const EDIT_TEAM_EVENTS = {
  route: `${preFixApi}user/team/event`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
export const GET_TEAM_EVENT_BY_ID = {
  route: `${preFixApi}user/team/event`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const DELETE_TEAM_EVENT_BY_ID = {
  route: `${preFixApi}user/team/event`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const INVITE_TEAM_EVENT = {
  route: `${preFixApi}user/team/event/invite`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ENROLL_TEAM_EVENT = {
  route: `${preFixApi}user/team/event/enroll`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

// team Request End

// Profile Request Start
export const GET_PROFILE = {
  route: `${preFixApi}user/profile`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
// Profile Request end

// setting Start
export const SETTING_PAGES = {
  route: `${preFixApi}pages`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const SUPPORT = {
  route: `${preFixApi}support`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const CHANGE_PASSWORD = {
  route: `${preFixAuth}user/edit/password`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

// setting End

// general Request Start
export const GET_SEARCH_KEYWORDS = {
  route: `${preFixApi}user/keyword`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const PRIVO = {
  route: `${preFixApi}user/privo`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
// general Request End

export const GET_INVITE_LIST = {
  route: `${preFixApi}user/invite`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const AGREE_TERMS = {
  route: `${preFixApi}user/term`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};

export const PARENT_VERIFICATION_STATUS = {
  route: `${preFixApi}user/verification`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_RECENT_CHAT_LISTING = {
  route: `${preFixApi}user/chats`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_CHAT_CONTACTS_LIST = {
  route: `${preFixApi}user/contacts`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const ADD_CREDIT_CARD = {
  route: `${preFixApi}user/stripe/card`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_CARD_LIST = {
  route: `${preFixApi}user/stripe/card`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const DELETE_CARD = {
  route: `${preFixApi}user/stripe/card`,
  access_token_required: true,
  type: REQUEST_TYPE.DELETE,
};
export const PAYPAL_APPOVAL = {
  route: `${preFixApi}user/paypal/approval`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const VENMO_APPOVAL = {
  route: `${preFixApi}user/venmo/getview`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const CREATE_NEW_GROUP = {
  route: `${preFixApi}user/rooms`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const GET_ROOM_CHAT = {
  route: `${preFixApi}user/rooms/messages`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const CHECKOUT_CARD = {
  route: `${preFixApi}user/stripe/charge`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const PAYMENT_CHECKOUT = {
  route: `${preFixApi}user/payment`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const INVESTMENTS = {
  route: `${preFixApi}user/request/invest`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const EARNINGS = {
  route: `${preFixApi}user/request/earning`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const WITHDRAWAL = {
  route: `${preFixApi}user/withdrawal`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const ADD_WITHDRAW_CARD = {
  route: `${preFixApi}user/stripe/account/create`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const VENMO_CHECKOUT = {
  route: `${preFixApi}user/venmo/checkout`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const WITHDRAW_PAYMENT_CARD = {
  route: `${preFixApi}user/stripeaccount`,
  access_token_required: true,
  type: REQUEST_TYPE.PUT,
};
// Coaching Search start
export const COACHING_SEARCH = {
  route: `${preFixApi}publiccoach`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
// Coaching Search end

//// Notifications
export const DEVICE_TOKEN_NOTIFICATION = {
  route: `${preFixApi}device-token`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const SINGLE_POST_BY_ID = {
  route: `${preFixApi}user/post/wall`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};

export const GET_NOTIFICATIONS = {
  route: `${preFixApi}notification`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const NOTIFICATIONS_COUNT = {
  route: `${preFixApi}notification/count`,
  access_token_required: true,
  type: REQUEST_TYPE.GET,
};
export const JOIN_GROUP_BY_NOTIFICATION = {
  route: `${preFixApi}user/group/member`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const GET_VIDEO_SIGNED_URL = {
  route: `${preFixApi}video/sign`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};
export const USER_SIGNOUT = {
  route: `${preFixApi}logout`,
  access_token_required: true,
  type: REQUEST_TYPE.POST,
};

export const callRequest = function (
  url,
  data,
  parameter,
  header = {},
  ApiSauce,
  baseUrl = BASE_URL,
) {
  // note, import of "ApiSause" has some problem, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    const _access_token = util.getCurrentUserAccessToken();
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `Bearer ${_access_token}`,
        },
      };
    }
  }
  const _url =
    parameter && !_.isEmpty(parameter)
      ? `${url.route}/${parameter}`
      : url.route;

  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};

export const chatCallRequest = function (
  url,
  data,
  parameter,
  header = {},
  ApiSauce,
  baseUrl = CHAT_BASE_URL,
) {
  // note, import of "ApiSause" has some problem, thats why I am passing it through parameters

  let _header = header;
  if (url.access_token_required) {
    const _access_token = util.getCurrentUserAccessToken();

    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `Bearer ${_access_token}`,
        },
      };
    }
  }

  const _url =
    parameter && !_.isEmpty(parameter) ? `${url.route}${parameter}` : url.route;

  if (url.type === REQUEST_TYPE.POST) {
    return ApiSauce.post(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    return ApiSauce.put(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, _header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PATCH) {
    return ApiSauce.patch(_url, data, _header, baseUrl);
  }
};
