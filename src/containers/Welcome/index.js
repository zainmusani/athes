// @flow
import _ from 'lodash';
import React, {useEffect, useLayoutEffect} from 'react';
import {Linking, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Notifications} from 'react-native-notifications';
import {Actions} from 'react-native-router-flux';
import {useDispatch, useSelector} from 'react-redux';
import {increaseCountNotification} from '../../actions/NotificationActions';
import {ScreenWrapper} from '../../components';
import {
  getPermissions,
  navigateOnNotificationTap,
  setChannelForAndroid,
  showLocalNotification,
  updateDeviceToken,
} from '../../helpers/firebaseHelper';
import DataHandler from '../../services/DataHandler';
import {Colors} from '../../theme';
import util from '../../util';
import styles from './styles';

const Welcome = props => {
  const user = useSelector(state => state.user.data);
  const backScreen = useSelector(state => state.user.backScreen);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const userDataReducerObj = DataHandler.getStore().getState().user.data;
    if (
      util.hasObjectWithKey(userDataReducerObj, 'id') &&
      !util.isFieldNil(userDataReducerObj.id)
    ) {
      _fcmInit();
    }

    if (!_.isEmpty(backScreen)) {
      return Actions.reset(backScreen);
    }

    Linking.addEventListener('url', handleOpenURL);
    Linking.getInitialURL()
      .then(url => handleOpenURL({url}))
      .catch(console.error);
    
      // return () => {
      //   Linking.removeAllListeners('url');
      // };
  }, []);

  useEffect(() => {
    return () => {
      Notifications.events().registerNotificationReceivedForeground().remove();
      Notifications.events()
        .registerRemoteNotificationsRegistrationFailed()
        .remove();
      Notifications.events().registerNotificationOpened().remove();
      Notifications.events().registerNotificationReceivedBackground().remove();
      Notifications.events().registerRemoteNotificationsRegistered().remove();
    };
  }, [Notifications]);

  const _fcmInit = async () => {
    // ------------- CHANNEL INIT --------------
    if (util.isPlatformAndroid()) setChannelForAndroid();

    // ------------- iOS Permission --------------
    if (!util.isPlatformAndroid()) getPermissions();

    // ------------- TOKEN INIT --------------
    // updateDeviceToken();

    // Request permissions on iOS, refresh token on Android
    Notifications.registerRemoteNotifications();

    Notifications.getInitialNotification()
      .then(notification => {
        if (!_.isNil(notification)) {
          navigateOnNotificationTap(notification.payload);
        }
      })
      .catch(err => {
        console.error('getInitialNotifiation() failed', err);
      });

    Notifications.events().registerRemoteNotificationsRegistered(event => {});

    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      event => {
        console.error({event});
      },
    );

    Notifications.events().registerNotificationReceivedForeground(
      (notification, completion) => {
        if (
          notification &&
          notification.payload &&
          notification.payload.data &&
          notification.payload.data.isLocal
        ) {
          dispatch(increaseCountNotification(1));
          console.log({'coming in dashboard 154': notification});
          // return;
        } else {
          notificationForeground = notification?.payload;
          const extraData = JSON.parse(notification?.payload?.extra_data) || {};
          const roomID = extraData?.room_id ?? -1;
          const currentActiveScreenName =
            DataHandler.getStore().getState().general?.currentActiveScreenName;
          const currentActiveRoomID =
            DataHandler.getStore().getState().chat?.currentActiveRoomID;
          console.log({'coming in dashboard 164': notificationForeground});
          if (util.areValuesEqual(currentActiveScreenName, 'messageView')) {
            if (!util.areValuesEqual(roomID, currentActiveRoomID)) {
              showLocalNotification(notification.payload);
            }
          } else {
            dispatch(increaseCountNotification(1));
            showLocalNotification(notification.payload);
          }
        }

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );

    Notifications.events().registerNotificationOpened(
      (notification, completion, action) => {
        console.log('Notification opened by device user', notification, action);
        if (
          notification &&
          notification.payload &&
          notification.payload.data &&
          notification.payload.data.isLocal
        ) {
          navigateOnNotificationTap(notificationForeground);
        } else {
          navigateOnNotificationTap(notification.payload);
        }

        completion({alert: true, sound: true, badge: false});
      },
    );

    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification.payload);
        !util.isPlatformAndroid() && Notifications?.ios?.setBadgesCount(0);
        Notifications?.ios?.getBadgeCount(count =>
          Notifications?.ios?.setBadgeCount(count + 1),
        );
        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({alert: true, sound: true, badge: false});
      },
    );
  };

  const handleOpenURL = event => {
    const {url} = event || {};
    util.deepLinkNavigation(url);
  };

  return (
    <ScreenWrapper pageBackground={Colors.black} hideNav>
      <View style={styles.container}>
        <FastImage
          source={require('../../assets/images/logo-gif/logo.gif')}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;
