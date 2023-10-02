import {Platform} from 'react-native';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {strings, SOCIAL_LOGIN_TYPES} from '../constants';

export const appleSignIn = async (loginRequest, errorCallback) => {
  // alert(appleAuth.isSupported);
  if (Platform.OS === 'ios' && appleAuth.isSupported) {
    console.log('Beginning Apple Authentication');

    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const {identityToken, fullName} = appleAuthRequestResponse;
      const {familyName, givenName} = fullName;

      const decoded = jwt_decode(identityToken);

      const {email} = decoded;

      let name = null;
      if (!_.isNil(givenName)) {
        name = `${givenName}`;
      }

      if (!_.isNil(familyName)) {
        name += ` ${familyName}`;
      }

      if (_.isNil(familyName) && _.isNil(givenName)) {
        let splittedArr = _.split(email, '@');
        name = splittedArr[0].replace(/[0-9]/g, '');
      }

      const payload = {
        email: email,
        name: name,
      };

      loginRequest({
        data: payload,
        token: identityToken,
        token_type: SOCIAL_LOGIN_TYPES.apple,
      });
    } catch (error) {
      if (error.code === appleAuth.Error.CANCELED) {
        // errorCallback({token_type: SOCIAL_LOGIN_TYPES.apple});
        console.log({error});
      } else {
        console.warn({error});
        errorCallback({token_type: SOCIAL_LOGIN_TYPES.apple});
      }
    }
  }
};
