import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import _ from 'lodash';
import util from '../util';

export const FBLogin = (loginRequest, errorCallback) => {
  LoginManager.logOut();
  if (util.isPlatformAndroid) {
    LoginManager.setLoginBehavior('web_only');
  }

  LoginManager.logInWithPermissions([
    // 'name',
    // 'picture',
    'email',
    'public_profile',
  ]).then(
    function (result) {
      if (result.isCancelled) {
        // console.warn('user has cancelled the fb login pop up');
        // errorCallback();
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          loginRequest({token: data.accessToken, token_type: 'facebook'});
        });
      }
    },
    function (error) {
      console.log({error});
      errorCallback(
        _.has(error, 'code')
          ? error.code == 'EUNSPECIFIED'
            ? (errorText =
                "App Not Setup: This app is still in development mode, and you don't have access to it. Switch to a registered test user or ask an app admin for permissions.")
            : error.code
          : error,
      );
    },
  );
};
