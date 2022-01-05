import { logout } from '@/actions/UserActions';
import { styles } from '@/screens/OrderDetails/Address.styles';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Images from '@/assets';
import idx from 'idx';
import { NAVIGATION } from '@/constants';
export function Address({ props, navigation }) {
  const dispatch = useDispatch();
  console.log(props, 'navigationnavigationnavigation');
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Address</Text>
      <Pressable
        disabled={idx(props, (_) => _.status) == 4}
        style={styles.card}
        onPress={() => {
          navigation.navigate('LiveTracking', {
            serviceLatitude: idx(props, (_) => _.location.lat),
            serviceLongitude: idx(props, (_) => _.location.lng),
            myStaffId: idx(props, (_) => _.staffData[0]._id),
          });
        }}
      >
        <View style={styles.image}>
          <Image style={styles.map} source={Images.map} resizeMode={'cover'} />
        </View>
        <View style={styles.address}>
          <Text style={styles.addr} numberOfLines={1}>
            {idx(props, (_) => _.location.address)}
          </Text>
          <Text style={styles.city}>City : {idx(props, (_) => _.location.city)}</Text>
        </View>
        <View
          style={styles.pin}
          onPress={
            () => console.log('navigate to live tracking ')
            // navigation.navigate(NAVIGATION.livetracking)
          }
        >
          <Image style={styles.imagePin} source={Images.send} resizeMode={'contain'} />
        </View>
      </Pressable>
    </View>
  );
}
