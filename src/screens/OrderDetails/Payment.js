import { logout } from '@/actions/UserActions';
import { styles } from '@/screens/OrderDetails/Payment.styles';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Images from '@/assets';
export function Payment({ props }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment</Text>
      <View style={styles.card}>
        <View style={styles.image}>
          <Image style={styles.map} source={Images.card} resizeMode={'cover'} />
        </View>
        <View style={styles.address}>
          <Text style={styles.addr} numberOfLines={1}>
            X X X X 1234
          </Text>
        </View>
        <View style={styles.pin}>
          <Text style={styles.city}>400</Text>
        </View>
      </View>
    </View>
  );
}
