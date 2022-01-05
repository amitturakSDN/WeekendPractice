import { logout } from '@/actions/UserActions';
import { styles } from '@/screens/OrderDetails/ServiceDate.styles';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Images from '@/assets';
export function ServiceDate({ props }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Date of Service</Text>
      <View style={styles.card}>
        <Image style={styles.imageLogo} source={Images.case} resizeMode={'contain'} />
        <Text style={styles.childOne}>3 : 00 am | 22 Aug 2021</Text>
      </View>
    </View>
  );
}
