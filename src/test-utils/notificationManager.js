import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
export const BackgroundNotificationManager = (response) => {
  Platform.OS == 'ios' && PushNotification.setApplicationIconBadgeNumber(0);
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('***********MESSAGE_IN_BACKGROUND************', remoteMessage);
    if (response) response(remoteMessage);
    // console.log('response<<<<<<<<<<<',response);
  });

  messaging().onMessage(async (remoteMessage) => {
    // PushNotification.localNotification({
    //   smallIcon: 'ic_notification',
    // });
    console.log('***********NEW_MESSAGE IN FOREGROUND************', JSON.stringify(remoteMessage));
    if (response) response(remoteMessage);
  });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (response) response(remoteMessage);

    console.log(
      '***********NOTIFICATION_OPENED_APP_FROM_BACKGROUND_STATE**********',
      remoteMessage.notification
    );
  });
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (response) response(remoteMessage);

      console.log('***********NOTIFICATION_OPENED_APP_FROM_QUIT_STATE************', remoteMessage);
    });
};

export const GetBadgeNumber = async (response) => {
  PushNotification.getApplicationIconBadgeNumber((notificationBadge) => {
    console.log('NOTIFICATION_BADGE', response(notificationBadges));
  });
};
export const InitiateNotification = async (response) => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    messaging()
      .getToken()
      .then((token) => {
        response(token);
        console.log('***********NOTI_AUTH_STATUS************', token);
      });
  } else {
    console.log('***********REQUEST************');
  }

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      console.log('***********NOTIFICATION_OPENED_APP_FROM_QUIT_STATE************', remoteMessage);
    });

  PushNotification.createChannel(
    {
      channelId: 'fcm_fallback_notification_channel', // (required)
      channelName: 'fcm_fallback_notification_channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      playSound: true,
    },
    (created) => console.log('***********CHANNEL_CREATED************', created) // (optional) callback returns whether the channel was created, false means it already existed.
  );
};
