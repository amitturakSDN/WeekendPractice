import { logout } from '@/actions/UserActions';
import { styles } from '@/screens/OrderDetails/CustomerDetails.styles';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { useDispatch } from 'react-redux';

export function CustomerDetails(props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Detail</Text>
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageLogo}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.name}>
          <Text style={styles.nameText}>Jolly Adrew</Text>
          <Text numberOfLines={1} style={styles.body}>
            Many desktop publishing packages...
          </Text>
          <Text style={styles.time}>30 min ago</Text>
        </View>
      </View>
    </View>
  );
}
