import {Images} from '../theme';

// export const TIME_ZONE = (-1 * new Date().getTimezoneOffset()) / 60;
export const APP_URL = '';
export const APP_DOMAIN = '';
export const QUERY_LIMIT = 10;
export const SAGA_ALERT_TIMEOUT = 2000;

// date time formats
export const DATE_FORMAT1 = 'dddd, DD MMMM, YYYY';

// Messages

export const LOCATION_PERMISSION_DENIED_ERROR2 =
  'Location permission required, please go to app settings to allow access';
export const INVALID_NAME_ERROR = 'Invalid name';
export const INVALID_EMAIL_ERROR = 'Invalid email';
export const INVALID_PASSWORD_ERROR =
  'Password must contain 1 small letter, 1 capital letter and 1 digit';
export const INTERNET_ERROR = 'Please connect to the working internet';
export const SESSION_EXPIRED_ERROR = 'Session expired, Please login again';

export const SOMETHING_WRONG = 'Something went wrong.';

// Message types
export const MESSAGE_TYPES = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
};

// File Types
export const FILE_TYPES = {VIDEO: 'video', IMAGE: 'image', AUDIO: 'audi'};

export const ROLES_DATA = [
  {
    tag: 'parent',
    image: Images.parent,
  },
  {
    tag: 'athlete',
    image: Images.athletes,
  },
  {
    tag: 'coach',
    image: Images.coach,
  },
  {
    tag: 'team',
    image: Images.team,
  },
  {
    tag: 'organization',
    image: Images.org,
  },
  {
    tag: 'facility',
    image: Images.facility,
  },
];

export const SPORTSINTRESTDATA = [
  {
    id: 1,
    title: 'Hockey',
  },
  {
    id: 2,
    title: 'Lacrosse',
  },
  {
    id: 3,
    title: 'Baseball',
  },
  {
    id: 4,
    title: 'Football',
  },
  {
    id: 5,
    title: 'Basketball',
  },
  {
    id: 6,
    title: 'Soccer',
  },
  {
    id: 7,
    title: 'Gymnastics',
  },
  {
    id: 8,
    title: 'Field Hockey',
  },
  {
    id: 9,
    title: 'Tennis',
  },
  {
    id: 10,
    title: 'Golf',
  },
  {
    id: 11,
    title: 'Swimming',
  },
  {
    id: 12,
    title: 'Diving',
  },
  {
    id: 13,
    title: 'Volleyball',
  },
  {
    id: 14,
    title: 'Cheerleading',
  },
  {
    id: 15,
    title: 'Boxing',
  },
  {
    id: 16,
    title: 'Cycling',
  },
  {
    id: 17,
    title: 'Skiing',
  },
  {
    id: 18,
    title: 'Water Polo',
  },
  {
    id: 19,
    title: 'Equestrian',
  },
  {
    id: 20,
    title: 'Rugby',
  },
  {
    id: 22,
    title: 'Formula 1',
  },
  {
    id: 23,
    title: 'MMA',
  },
  {
    id: 24,
    title: 'Moto GP',
  },
  {
    id: 25,
    title: 'Badminton',
  },
  {
    id: 27,
    title: 'swimming',
  },
  {
    id: 28,
    title: 'diving',
  },
  {
    id: 29,
    title: 'cheerleading',
  },
  {
    id: 31,
    title: 'equestrian',
  },
  {
    id: 32,
    title: 'E-sports',
  },
];

export const strings = {
  GET_STARTED: 'Get Started',
  LOGIN: 'Login',
  SIGNIN: 'Sign in',
  SIGNUP: 'Sign up',
  FORGOTPASSWORD: 'Forgot Password?',
  NEWPASSWORD: 'New Password',
  CREATE_ACCOUNT: 'Create Account',
  CREATE_GROUP: 'Create Group',
  EDIT_GROUP: 'Edit Group',
  SEARCH: 'Search Here',
  SETTINGS: 'Settings',
  NOTIFICATIONS: 'Notifications',
  DONE: 'Done',
  POST: 'Post',
  SHARE: 'Share',
  EDIT: 'Edit',
  EDIT_POST: 'Edit Post',
  SELECT_PAYMENT_METHOD: '  Select Payment Method',
  PAYMENT_METHOD_AVAILALE:
    'Payment Method available in Many options of payment.',
  PAY_NOW: 'Pay Now',
  CREATE_POST: 'Create Post',
  VERIFY_EMAIL: 'Verify Email',
  WRONG_EMAIL: 'Wrong Email ?',
  YOUR_CARD_HAS_BEEN_ADDED: 'Your card has been successfully added.',
  DONT_RECEIVED_CODE: 'Didn’t receive a code?',
  RESEND_CODE: 'Resend Code',
  ENTER4DIGITSCODE: 'Please enter the 6 digit code',
  CHOOSE_YOUR_ROLE: 'Choose your role',
  SKIP: 'Skip',
  ADD_CHILD_PROFILE: 'Add Child Profile',
  ADD_ATHLETE: 'Add Athlete',
  ADD: 'Add',
  PAYMENTS: 'Payments',
  CARD_LIST: 'Card List',
  STRIPE: 'Stripe',
  ADD_CARD: 'Add Card',
  ATHES: 'Athes',
  LOGOUT: 'Logout',
  FOLLOWERS: 'Followers',
  DASHBOARD: 'Dashboard',
  MANAGE_ATHELETE: 'Manage Athelete',
  ATHELETE_PARTICIPANTS_DETAIL: 'Athelete Participants Detail',
  UPDATE: 'Update',
  ACCOUNT_SETTINGS: 'Account Settings',
  PUSH_NOTIFICATION: 'Push notifications',
  MORE: 'More',
  INVESTMENTS: 'Wallet',
  WALLET: 'Wallet',
  PAYMENT_METHODS: 'Payment Methods',
  EARNINGS: 'Earnings',
  ABOUT_US: 'About Us',
  PRIVACY_POLICY: 'Privacy Policy',
  TERMS_AND_CONDITION: 'Terms and Conditions',
  CALENDAR: 'Calendar',
  CONTINUE: 'CONTINUE',
  EVENT_DETAILS: 'Event Details',
  TEAM_EVENT_DETAILS: 'Team Event Details',
  ENABLE_PHOTO_ACCESS: 'Enable photos access',
  MANAGEHEADER:
    'You have given ATHES access to a selected number of photos and videos.',
  MANAGE: 'Manage',
  PLEASE_ALLOW_GALLERY_PERMISSION:
    'Let Athes access Photos to add photos and videos.',
  PLEASE_ALLOW_GALLERY_PERMISSION_ANDROID:
    'Please allow Gallery permission from Settings.',
  SESSION_DETAILS: 'Session Details',
  FOLLOW: 'Follow',
  FOLLOWING: 'Following',
  ENROLL: 'Enroll',
  BACK_TO_EVENT: 'Back To Event',
  INVITE: 'Invite',
  WALLET: 'Wallet',
  RESCHEDULE: 'reschedule',
  CANCEL: 'Cancel',
  SEASON: 'Season',
  CHAT: 'Chat',
  SELECT_CONTACT: 'Select Contact',
  NEW_GROUP: 'New Group',
  CONFIRM_CANCELATION: 'Confirm Cancellation',
  PARTICIPATIONS: 'Participations',
  SELECT_ROLE: 'Select Role',
  PARENT: 'parent',
  ATHLETE: 'athlete',
  PARENT_ATHLETE: 'parent_athlete',
  ADD_SEASON: 'Add Season',
  CREATE: 'Create',
  ADD_EVENT: 'Add Event',
  ADD_SESSION: 'Add Session',
  ADD_CALENDAR: 'Add Calendar',
  SEASON_DETAILS: 'Season Details',
  CONFIRM_DELETE: 'Confirm Delete',
  MANAGE_FACILITIES: 'Manage Facilities',
  ADD_FACILITIES: 'Add Facilities',
  MANAGE_TEAMS: 'Manage Team',
  GROUP: 'Group',
  SUPPORT: 'Support',
  PASSWORD: 'Password',
  PARTICIPANTS: 'My Schedule',
  OPERATION_IN_PROGRESS: 'Operation in progress',
  SERVICE_UNAVAILABLE: 'Service unavailable',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  individual: 'individual',
  multipleDays: 'multiple-days',
  EMPTY_INBOX: 'Empty inbox',
  NO_MSGS_LEFT_TO_READ: 'No Msg left to read',
  DISABLE_CHAT_FOR_ALL_GROUP_MEMBERS: 'Disable Chat for all group members.',
  PAYMENT_SUCCESSFULLY_DONE: 'Payment successfully done',
  PAYMENT_SUCCESSFULLY_FAILED: 'Payment successfully failed',
  NO_NOTIFICATIONS_FOUND: 'No Notifications Found.',
  ONLY_ADMIN_CAN_SEND_MESSAGES: 'Only admin can send messages on this group.',
};

export const stripeKeys = {
  publishableKey:
    'pk_test_51KijMHLwRL8Ess63UAxShJaZORjsBSR1M2EBWWS0YxIAHbnNDrprXutfFfdTatYZtKIHYQEDKCCCf0xDbLUMZ2Yd00H8cfxVpd',
};

export const RESOURCETYPE = {
  FACILITY: 'facility',
  SEASON: 'season',
  SESSION: 'session',
  EVENT: 'event',
  MEETING: 'meeting',
};

export const paymentCard = {
  PAYPAL: 'Paypal',
  CREDIT_CARD: 'Credit Card',
  APPLE_PAY: 'Apple Pay',
  VENMO_PAY: 'Venmo Pay',
  CASH: 'Cash Payment ',
};

export const approvalTabsArray = [
  {
    id: 1,
    status: 'Pending',
  },
  {
    id: 2,
    status: 'Approved',
  },
  {
    id: 3,
    status: 'Rejected',
  },
];

export const likesReactArray = [
  {
    id: 1,
    icon: '',
    likes: 'All',
    type: 'all',
  },
  {
    id: 2,
    icon: Images.likeHands,
    likes: 300,
    type: 'hight_five',
  },
  {
    id: 3,
    icon: Images.letsGo,
    likes: 50,
    type: 'thumbs_up',
  },
  {
    id: 4,
    icon: Images.thumbsUp,
    likes: 2,
    type: 'lets_go',
  },
];

export const DrawerMenu = {
  home: 'home',
  calendar: 'calendar',
  groups: 'groups',
  settings: 'settings',
  manage_tab: 'manage',
  logout: 'logout',
};

export const UserRoles = {
  parent: 1,
  parent_athlete: null,
  athlete: 2,
  coach: 3,
  team: 4,
  organization: 5,
  facility: 6,
};

export const ParticipationsTabsArray = [
  {
    id: 1,
    status: 'Sessions',
  },
  {
    id: 2,
    status: 'Events',
  },
  {
    id: 3,
    status: 'Seasons',
  },
  {
    id: 4,
    status: 'My Teams',
  },
];

export const InvestmentsTabsArray = [
  {
    id: 1,
    status: 'Payments',
  },
  {
    id: 2,
    status: 'Refunds',
  },
];

export const CreatorTabsArray = [
  {
    id: 1,
    status: 'Sessions',
  },
  {
    id: 2,
    status: 'Seasons',
  },
  {
    id: 3,
    status: 'Events',
  },
];

export const coachProfile = [
  {
    id: 1,
    name: 'Anna John',
    achievements: 'Golden Glove Winner Copa 2021',
    matchPoints: 150,
    coachProfilePic: Images.athleteImg3,
  },
  {
    id: 2,
    name: 'John Cena',
    achievements: 'Golden Glove Winner Copa 2021',
    matchPoints: 250,
    coachProfilePic: Images.athleteImg1,
  },
  {
    id: 3,
    name: 'Mark Zuckerberg ',
    achievements: 'Golden Glove Winner Copa 2021',
    matchPoints: 100,
    coachProfilePic: Images.athleteImg2,
  },
  {
    id: 4,
    name: 'Elon Musk',
    achievements: 'Golden Glove Winner Copa 2021',
    matchPoints: 180,
    coachProfilePic: Images.athleteImg3,
  },
  {
    id: 5,
    name: 'Jeff Bezos',
    achievements: 'Golden Glove Winner Copa 2021',
    matchPoints: 140,
    coachProfilePic: Images.athleteImg1,
  },
];

export const timeArray = [
  {
    id: 1,
    title: '1:00',
  },
  {
    id: 2,
    title: '2:00',
  },
  {
    id: 3,
    title: '3:00',
  },
  {
    id: 4,
    title: '4:00',
  },
  {
    id: 5,
    title: '5:00',
  },
  {
    id: 6,
    title: '6:00',
  },
  {
    id: 7,
    title: '7:00',
  },
  {
    id: 8,
    title: '8:00',
  },
  {
    id: 9,
    title: '9:00',
  },
  {
    id: 10,
    title: '10:00',
  },
  {
    id: 11,
    title: '11:00',
  },
  {
    id: 12,
    title: '12:00',
  },
  {
    id: 13,
    title: '13:00',
  },
  {
    id: 14,
    title: '14:00',
  },
  {
    id: 15,
    title: '15:00',
  },
  {
    id: 16,
    title: '16:00',
  },
  {
    id: 17,
    title: '17:00',
  },
  {
    id: 18,
    title: '18:00',
  },
  {
    id: 19,
    title: '19:00',
  },
  {
    id: 20,
    title: '20:00',
  },
  {
    id: 21,
    title: '21:00',
  },
  {
    id: 22,
    title: '22:00',
  },
  {
    id: 23,
    title: '23:00',
  },
  {
    id: 24,
    title: '24:00',
  },
];

export const services = [
  {
    id: 1,
    name: 'venue',
  },
  {
    id: 2,
    name: 'others',
  },
];

export const coachAddCalenderOptions = [
  {
    id: 1,
    name: 'individual',
  },
  {
    id: 2,
    name: 'multiple-days',
  },
];

export const cancelBeforeOptions = [
  {
    id: 1,
    name: 'Before 12 Hours',
  },
  {
    id: 2,
    name: 'Before 24 Hours',
  },
  {
    id: 3,
    name: 'Before 48 Hours',
  },
  {
    id: 4,
    name: 'Before 1 Day',
  },
  {
    id: 5,
    name: 'Before 2 Days',
  },
  {
    id: 6,
    name: 'Before 3 Days',
  },
];

export const markedDates = {
  '2021-01-29': {
    marked: true,
    disabled: false,
    time: ['11:00', '12:00', '13:00', '14:30', '16:00'],
  },
  '2022-01-31': {
    marked: true,
    disabled: false,
    time: ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
  },
  '2022-02-10': {
    marked: true,
    disabled: false,
    time: ['09:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
  },
  '2022-02-15': {
    marked: true,
    disabled: false,
    time: ['08:00', '10:00', '11:00', '12:00', '14:00', '15:00'],
  },
};

export const selectedFacilities = {
  '2021-12-24': {disabled: true},
  '2021-12-26': {disabled: true},
  '2021-12-29': {disabled: true},
  '2021-12-31': {disabled: true},
};

export const experience = [
  'Under 1 year',
  '2 to 5 years',
  '6 to 10 years',
  'over 10 years',
];

export const ageGroup = [
  {
    id: 1,
    title: 'under 8',
  },
  {
    id: 2,
    title: '8-10',
  },
  {
    id: 3,
    title: '10-12',
  },
  {
    id: 4,
    title: '12-18',
  },
  {
    id: 5,
    title: '18+',
  },
  {
    id: 6,
    title: 'all ages',
  },
];

export const gender = ['male', 'female', 'all'];
export const distance = [
  '10 miles',
  '20 miles',
  '35 miles',
  '45 miles',
  '55+ miles',
];

export const findPeople = [
  {
    id: 1,
    profileName: 'Andrew Parker',
    profilePic: Images.athleteImg2,
    subtitle: 'What kind of strategy is better?',
    date: '11/16/19',
    isSelected: false,
  },
  {
    id: 2,
    profileName: 'Karen Castillo',
    profilePic: Images.athleteImg3,
    subtitle: 'What kind of strategy is better?',
    date: '11/16/19',
    isSelected: false,
  },
  {
    id: 3,
    profileName: 'Maximillian Jacobson',
    profilePic: Images.athleteImg1,
    subtitle: 'What kind of strategy is better?',
    date: '11/16/19',
    isSelected: false,
  },
  {
    id: 4,
    profileName: 'Martha Craig',
    profilePic: Images.athleteImg3,
    subtitle: 'What kind of strategy is better?',
    date: '11/16/19',
    isSelected: false,
  },
  {
    id: 5,
    profileName: 'Tabitha Potter',
    profilePic: Images.athleteImg1,
    subtitle: 'What kind of strategy is better?',
    date: '11/16/19',
    isSelected: false,
  },
  {
    id: 6,
    profileName: 'Maisy Humphrey',
    profilePic: Images.athleteImg2,
    subtitle: 'What kind of strategy is better?',
    date: '11/16/19',
    isSelected: false,
  },
  {
    id: 7,
    profileName: 'Kieron Dotson',
    profilePic: Images.athleteImg1,
    subtitle: 'What kind of strategy is better?',
    date: '11/16/19',
    isSelected: false,
  },
  {
    id: 8,
    profileName: 'Karen Castillo',
    profilePic: Images.athleteImg2,
    subtitle: 'What kind of strategy is better?',
    date: '11/16/19',
    isSelected: false,
  },
  {
    id: 9,
    profileName: 'Maximillian Jacobson',
    profilePic: Images.athleteImg1,
    subtitle: 'What kind of strategy is better?',
    date: '11/16/19',
    isSelected: false,
  },
  {
    id: 10,
    profileName: 'Martha Craig',
    profilePic: Images.athleteImg3,
    subtitle: 'What kind of strategy is better?',
    date: '11/16/19',
    isSelected: false,
  },
  {
    id: 11,
    profileName: 'Andrew Parker',
    profilePic: Images.athleteImg1,
    subtitle: 'What kind of strategy is better?',
    date: '11/16/19',
    isSelected: false,
  },
  {
    id: 12,
    profileName: 'Andrew Parker',
    profilePic: Images.athleteImg2,
    subtitle: 'What kind of strategy is better?',
    date: '11/16/19',
    isSelected: false,
  },
];

export const paymentOption = [
  {
    id: 1,
    image: Images.CreditCard,
    title: 'Credit Card',
    description: 'Select Payment Method',
  },
  {
    id: 2,
    image: Images.PayPal,
    title: 'Paypal',
    description: 'Select Payment Method',
  },
  {
    id: 3,
    image: Images.ApplePay,
    title: 'Apple Pay',
    description: 'Select Payment Method',
  },
  // {
  //   id: 4,
  //   image: Images.VenmoPay,
  //   title: 'Venmo Pay',
  //   description: 'Select Payment Method',
  // },
  {
    id: 1,
    image: Images.CashOnDelivery,
    title: 'Cash Payment ',
    description: 'Select Payment Method',
  },
];

export const athleteCancel = [
  {
    id: 1,
    name: 'Athlete Name1',
    profilePic: Images.athleteImg1,
  },
  {
    id: 2,
    name: 'Athlete Name2',
    profilePic: Images.athleteImg3,
  },
];

export const SOCIAL_LOGIN_TYPES = {
  google: 'google',
  apple: 'apple',
  facebook: 'facebook',
};

export const dummyRecentChatList = [
  {
    id: 'user_or_group_id_0',
    image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    name: 'Ali Shaheer',
    last_msg: 'This is my last Message id 0',
    created_date: '2022-06-27T20:17:46.384Z',
    is_group: true,
    group_author_id: 'user_id_01',
    disable_chat: false,
    is_private_member: true,
  },
  {
    id: 'user_or_group_id_1',
    image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    name: 'Noman',
    last_msg: 'This is my last Message id 1',
    created_date: '2022-06-27T20:17:46.384Z',
    is_group: true,
    group_author_id: 'user_id_02',
    disable_chat: true,
    is_private_member: true,
  },
  {
    id: 'user_or_group_id_2',
    image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    name: 'Umer',
    last_msg: 'This is my last Message id 2',
    created_date: '2022-06-27T20:17:46.384Z',
    is_group: false,
    group_author_id: 'user_id_01',
    disable_chat: true,
    is_private_member: true,
  },
  {
    id: 'user_or_group_id_3',
    image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    name: 'Yasir',
    last_msg: 'This is my last Message id 3',
    created_date: '2022-06-27T20:17:46.384Z',
    is_group: false,
    group_author_id: 'user_id_01',
    disable_chat: true,
    is_private_member: true,
  },
  {
    id: 'user_or_group_id_4',
    image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    name: 'Hussain',
    last_msg: 'This is my last Message id 4',
    created_date: '2022-06-27T20:17:46.384Z',
    is_group: false,
    group_author_id: 'user_id_01',
    disable_chat: true,
    is_private_member: true,
  },
  {
    id: 'user_or_group_id_5',
    image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    name: 'Imran',
    last_msg: 'This is my last Message id 5',
    created_date: '2022-06-27T20:17:46.384Z',
    is_group: false,
    group_author_id: 'user_id_01',
    disable_chat: true,
    is_private_member: true,
  },
];

export const dummyContactList = [
  {
    id: 'user_or_group_id_0',
    image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    name: 'Ali Shaheer',
  },
  {
    id: 'user_or_group_id_1',
    image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    name: 'Noman',
  },
  {
    id: 'user_or_group_id_2',
    image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    name: 'Imran',
  },
  {
    id: 'user_or_group_id_3',
    image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    name: 'Yasir',
  },
  {
    id: 'user_or_group_id_4',
    image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    name: 'Anees',
  },
];

export const dummyMessagesList = {
  user_or_group_id_0: {
    id: 'user_or_group_id_0',
    group_author_id: 'user_id_01',
    is_group: true,
    chats: [
      {
        id: 0,
        userId: 'user_or_group_id_0',
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Imran',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: true,
        message: 'This is a message.',
      },
      {
        id: 1,
        userId: 'user_or_group_id_01',
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Ali',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: false,
        message: 'This is a message 01.',
      },
      {
        id: 2,
        userId: 'user_or_group_id_02',
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Zain',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: false,
        message: 'This is a message 02.',
      },
      {
        id: 3,
        userId: 'user_or_group_id_03',
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Hussain',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: false,
        message: 'This is a message 03.',
      },
    ],
    disable_chat: false,
    is_private_member: true,
  },
  user_or_group_id_1: {
    id: 'user_or_group_id_1',
    group_author_id: 'user_id_02',
    is_group: false,
    chats: [
      {
        id: 0,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Imran',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: true,
        message: 'This is a message.',
      },
      {
        id: 1,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Ali',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: false,
        message: 'This is a message 01.',
      },
      {
        id: 2,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Zain',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: true,
        message: 'This is a message 02.',
      },
      {
        id: 3,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Hussain',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: false,
        message: 'This is a message 03.',
      },
    ],
    disable_chat: false,
    is_private_member: false,
  },
  user_or_group_id_2: {
    id: 'user_or_group_id_2',
    group_author_id: 'user_id_03',
    is_group: false,
    chats: [
      {
        id: 0,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Imran',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: true,
        message: 'This is a message.',
      },
      {
        id: 1,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Ali',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: false,
        message: 'This is a message 01.',
      },
      {
        id: 2,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Zain',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: true,
        message: 'This is a message 02.',
      },
      {
        id: 3,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Hussain',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: false,
        message: 'This is a message 03.',
      },
    ],
    disable_chat: false,
    is_private_member: true,
  },
  user_or_group_id_3: {
    id: 'user_or_group_id_3',
    group_author_id: 'user_id_04',
    is_group: false,
    chats: [
      {
        id: 0,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Imran',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: true,
        message: 'This is a message.',
      },
      {
        id: 1,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Ali',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: false,
        message: 'This is a message 01.',
      },
      {
        id: 2,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Zain',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: true,
        message: 'This is a message 02.',
      },
      {
        id: 3,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Hussain',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: false,
        message: 'This is a message 03.',
      },
    ],
    disable_chat: false,
    is_private_member: false,
  },
  user_or_group_id_4: {
    id: 'user_or_group_id_4',
    image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    name: 'Hussain',
    last_msg: 'This is my last Message id 4',
    created_date: '2022-06-27T20:17:46.384Z',
    is_group: false,
    chats: [
      {
        id: 0,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Imran',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: true,
        message: 'This is a message.',
      },
      {
        id: 1,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Ali',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: false,
        message: 'This is a message 01.',
      },
      {
        id: 2,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Zain',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: true,
        message: 'This is a message 02.',
      },
      {
        id: 3,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Hussain',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: false,
        message: 'This is a message 03.',
      },
    ],
    group_author_id: 'user_id_01',
    disable_chat: false,
    is_private_member: true,
  },
  user_or_group_id_5: {
    id: 'user_or_group_id_5',
    image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
    name: 'Imran',
    last_msg: 'This is my last Message id 5',
    created_date: '2022-06-27T20:17:46.384Z',
    is_group: false,
    group_author_id: 'user_id_01',
    disable_chat: false,
    chats: [
      {
        id: 0,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Imran',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: true,
        message: 'This is a message.',
      },
      {
        id: 1,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Ali',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: false,
        message: 'This is a message 01.',
      },
      {
        id: 2,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Zain',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: true,
        message: 'This is a message 02.',
      },
      {
        id: 3,
        created_date: '2022-06-27T20:17:46.384Z',
        name: 'Hussain',
        image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
        is_my_msg: false,
        message: 'This is a message 03.',
      },
    ],
    is_private_member: true,
  },
};

export const dummyCreateNewGroupRes = {
  userOrGroupId: 'user_or_group_id_3',
  name: 'Noman',
  image: 'https://athes.s3.us-east-2.amazonaws.com/placeholder.jpg',
};
export const NOTIFICATION_CHANNEL = {
  id: 'com.athes.app',
  name: 'Athes Notifications',
};
export const NOTIFICATION_PERMISSION_DENIED_ERROR =
  'Please allow notifications and get notified timely';

export const NOTIFICATIONS_TYPE = {
  POST: 'post',
  FOLLOWING: 'follow',
  INVITATION: 'invitation',
  ENROLL: 'enroll',
  GROUP: 'group',
  MEETING_BOOK: 'meeting',
  TEAM_JOIN: 'team_join',
  CANCELATION: 'cancelation',
  PAYMENT: 'payment',
  CHAT_MESSAGE_RECEIVED: 'chat_message_received',
  CHAT_GROUP_CREATED: 'chat_group_created',
};

export const searchFiltersOptions = ['follower', 'hashtag'];

export const LISTEN_FROM_SERVER_TYPES = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  AUTHENTICATED: 'authenticated',
  RECEIVE_MESSAGE: 'message',
  ROOM_CREATED: 'room_created',
  PONG: 'pong',
};

export const EMIT_TO_SERVER_TYPES = {
  SEND_MESSAGE: 'message',
  CREATE_GROUP_ROOM: 'create_room',
  OFFLINE_USER: 'user_offline',
  JOIN_ROOM: 'join_room',
  ROOM_CREATED: 'room_created',
  PING: 'ping',
};

export var notificationList = [
  [
    {
      createdAt: '2022-07-01T09:27:03.705Z',
      id: 1745,
      isSeen: true,
      type: 'post',

      title: 'umer commented on your art',
      user_id: '6239718f32c8d50feab1bbfd',
      silent: false,
    },
    {
      createdAt: '2022-07-06T09:27:03.705Z',
      id: 1745,
      isSeen: true,
      type: 'post',
      title: 'umer commented on your art',
      user_id: '6239718f32c8d50feab1bbfd',
      silent: false,
    },
    {
      createdAt: '2022-07-06T09:27:03.705Z',
      id: 1745,
      isSeen: true,
      type: 'post',
      title: 'umer commented on your art',
      user_id: '6239718f32c8d50feab1bbfd',
      silent: false,
    },
    {
      createdAt: '2022-06-01T09:27:03.705Z',
      id: 1745,
      isSeen: true,
      type: 'post',
      title: 'umer commented on your art',
      user_id: '6239718f32c8d50feab1bbfd',
      silent: false,
    },
    {
      createdAt: '2022-07-04T09:27:03.705Z',
      id: 1745,
      isSeen: true,
      type: 'post',
      title: 'umer commented on your art',
      user_id: '6239718f32c8d50feab1bbfd',
      silent: false,
    },
    {
      createdAt: '2022-07-01T09:27:03.705Z',
      id: 1745,
      isSeen: true,
      type: 'post',
      title: 'umer commented on your art',
      user_id: '6239718f32c8d50feab1bbfd',
      silent: false,
    },
    {
      createdAt: '2022-07-01T09:27:03.705Z',
      id: 1745,
      isSeen: true,
      type: 'post',
      title: 'umer commented on your art',
      user_id: '6239718f32c8d50feab1bbfd',
      silent: false,
    },
    {
      createdAt: '2022-07-07T09:27:03.705Z',
      id: 1745,
      isSeen: true,
      type: 'post',
      title: 'umer commented on your art',
      user_id: '6239718f32c8d50feab1bbfd',
      silent: false,
    },
    {
      createdAt: '2022-07-07T09:27:03.705Z',
      id: 1745,
      isSeen: true,
      type: 'post',
      title: 'umer commented on your art',
      user_id: '6239718f32c8d50feab1bbfd',
      silent: false,
    },
    {
      createdAt: '2022-07-07T09:27:03.705Z',
      id: 1745,
      isSeen: true,
      type: 'post',
      title: 'umer commented on your art',
      user_id: '6239718f32c8d50feab1bbfd',
      silent: false,
    },
    {
      createdAt: '2022-07-07T09:27:03.705Z',
      id: 1745,
      isSeen: true,
      type: 'post',
      title: 'umer commented on your art',
      user_id: '6239718f32c8d50feab1bbfd',
      silent: false,
    },
  ],
];