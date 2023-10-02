import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {strings, SOCIAL_LOGIN_TYPES} from '../constants';

GoogleSignin.configure({
  iosClientId:
    '617931091661-q9oq1k9s4hsv6mmi5m8j2de57qfh4u39.apps.googleusercontent.com',
  webClientId:
    '617931091661-sqme6vt5bt0drcemspgpdf5hqkrscc46.apps.googleusercontent.com',
  offlineAccess: true,
});

export const GoogleLogin = async (loginRequest, errorCallback) => {
  try {
    await GoogleSignin.signOut();

    const hasGooglePlayServices = await GoogleSignin.hasPlayServices();
    if (!hasGooglePlayServices) {
      errorCallback('Not working now', SOCIAL_LOGIN_TYPES.google);
    }
    const userInfo = await GoogleSignin.signIn();

    loginRequest({
      token: userInfo.idToken,
      token_type: SOCIAL_LOGIN_TYPES.google,
    });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      errorCallback(strings.OPERATION_IN_PROGRESS, SOCIAL_LOGIN_TYPES.google);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      errorCallback(strings.SERVICE_UNAVAILABLE, SOCIAL_LOGIN_TYPES.google);
    } else {
      errorCallback(statusCodes, SOCIAL_LOGIN_TYPES.google);
    }
  }
};
