// @flow

import {Platform} from 'react-native';

const type = {
  /* base: "ParalucentText-Book",
  medium: "Paralucent-Medium" */
  base: Platform.select({
    ios: 'Asap-Regular',
    android: 'AsapRegular',
  }),
  medium: Platform.select({
    ios: 'Asap-Medium',
    android: 'AsapMedium',
  }),
  bold: Platform.select({
    ios: 'Asap-Bold',
    android: 'AsapBold',
  }),
};

// Metrics.generatedFontSize(ios, android)

const size = {
  zero: 0,
  xxxxxSmall: 8,
  xxxxSmall: 10,
  xxxSmall: 11,
  xxSmall: 13,
  xSmall: 14,
  small: 15,
  normal: 16,
  semiMedium: 17,
  medium: 18,
  large: 20,
  xmLarge: 22,
  xLarge: 24,
  xxLarge: 30,
  xxxLarge: 36,
  xxxxLarge: 40,
};

export default {
  type,
  size,
};
