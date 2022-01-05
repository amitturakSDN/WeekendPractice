import { logout } from '@/actions/UserActions';
import { Header } from '@/components/header';
import { styles } from '@/screens/Profile/Profile.styles';
import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationItems } from './NotificationItems';
import { hideTab, showTab } from '@/test-utils/hideBottomTab';

export function NotificationList(props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  let activeChats = useSelector((state) => state.chat.allActiveChats);
  let loadingChats = useSelector((state) => state.chat.loadingActiveChats);
  useEffect(() => {
    hideTab(props);
    return () => {
      showTab(props);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Header title={'My Notifications'} backEnable navProps={props} />
      <NotificationItems props={props} />
    </View>
  );
}
