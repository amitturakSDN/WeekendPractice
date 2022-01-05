import { logout } from '@/actions/UserActions';
import { Header } from '@/components/header';
import { styles } from '@/screens/Profile/Profile.styles';
import { typography } from '@/theme';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ChatList } from './ChatList';

export function Chat(props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Header title={'Chat'} />
      <ChatList props={props} />
    </View>
  );
}
