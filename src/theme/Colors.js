import {Platform} from 'react-native';

const white = '#FFFFFF';
const whiteMain = '#f9f9f9';
const black = '#000000';
const black1 = '#2C2929';
const black2 = '#3b3b3b';
const black3 = '#373737';
const darkgrey = '#333333';
const grey = '#B0B7BB';
const grey1 = 'rgba(143, 146, 161, 0.2)';
const grey2 = '#C4C4C4';
const grey3 = '#8290AB';
const grey4 = '#8a959e';
const grey5 = '#4e4e4e';
const grey6 = '#7A7A7A';
const gray7 = '#999999';
const gary9 = '#e9e9e9';
const gray10 = '#EFEFEF';
const gray11 = '#c8c8c8';
const gray12 = '#818181';
const lightGray = 'rgba(0,0,0,0.6)';
const graybrown = '#1C1D1E';
const gray8 = '#2e2e2e';
const yellow = '#ffc415';
const green1 = '#32ccb0';
const green2 = '#5cba47';
const orange1 = '#fdb918';
const orange2 = '#ff3d2e';

const whiteGrey = '#f8f8f8';

const transparent = 'rgba(0,0,0,0)';
const red = '#f94242';
const red2 = '#f41729';
const blue = '#01003A';
const blue1 = '#161b54';
const blue2 = '#0F245B';
const blue3 = '#011B34';
const linkBlue = '#007bff';
const lightPurple = '#E8ECFC';
const purple1 = '#616D9A';
const green = '#32b34a';
const silver = '#dfdfe0';
const silver1 = '#d1d1d6';
const primary = white;
const secondary = white;
const tertiary = black;
const quaternary = grey;

const background = {
  primary,
  secondary: '#f2f2f2',
  tertiary: '#000057',
  myMsgBg: '#1427D8',
  othersMsgBg: '#D2D2D2',
};

const text = {
  primary: blue,
  secondary: black1,
  tertiary: primary,
  quaternary: '#707070',
  accent: '#ff2824',
};

const presetColors = {
  primary: ['#053460', '#04203B'],
  secondary: ['#f24645', '#febb5b'],
  instagram: [
    'rgb(106, 57, 171)',
    'rgb(151, 52, 160)',
    'rgb(197, 57, 92)',
    'rgb(231, 166, 73)',
    'rgb(181, 70, 92)',
  ],
  firefox: [
    'rgb(236, 190, 55)',
    'rgb(215, 110, 51)',
    'rgb(181, 63, 49)',
    'rgb(192, 71, 45)',
  ],
  sunrise: [
    'rgb(92, 160, 186)',
    'rgb(106, 166, 186)',
    'rgb(142, 191, 186)',
    'rgb(172, 211, 186)',
    'rgb(239, 235, 186)',
    'rgb(212, 222, 206)',
    'rgb(187, 216, 200)',
    'rgb(152, 197, 190)',
    'rgb(100, 173, 186)',
  ],
};

const navbar = {
  background: background.primary,
  text: text.primary,
};

const border = '#f2f2f2';
const separator = '#f2f2f2';

const windowTint = 'rgba(0, 0, 0, 0.4)';
const windowTintWhite = 'rgba(255, 255, 255, 0.1)';

const colorsArray1 = [green1, green2, orange1, orange2];

export default {
  white,
  whiteMain,
  whiteGrey,
  black,
  black1,
  black2,
  black3,
  darkgrey,
  grey,
  grey1,
  grey2,
  grey3,
  grey4,
  grey5,
  grey6,
  gray7,
  gray8,
  yellow,
  gary9,
  gray10,
  gray11,
  gray12,
  transparent,
  red,
  blue,
  blue1,
  blue2,
  blue3,
  lightPurple,
  purple1,
  green,
  silver,
  silver1,
  primary,
  secondary,
  tertiary,
  quaternary,
  lightGray,
  graybrown,
  green1,
  green2,
  orange1,
  orange2,

  background,
  navbar,
  text,
  presetColors,
  border,
  separator,
  windowTint,
  windowTintWhite,

  twitter: '#41abe1',
  google: '#e94335',
  facebook: '#3b5998',

  info: '#19bfe5',
  warning: '#feb401',
  danger: '#ed1c4d',
  success: '#b76c94',
  selectionColor: 'rgba(52,93,147,0.4)',
  colorsArray1,
};
