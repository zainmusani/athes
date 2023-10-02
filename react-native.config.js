module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts'],
  dependencies: {
    'react-native-fast-video': {
      platforms: {
        android: {
          sourceDir:
            '../node_modules/react-native-fast-video/android-exoplayer',
        },
      },
    },
  },
};
