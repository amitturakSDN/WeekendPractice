import { styles } from '@/screens/Profile/ProfileOption.styles';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import * as Images from './assets';
import { NAVIGATION } from '@/constants';
export function ProfileOptions({ props }) {
  const { navigation } = props;
  const DATA = [
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'My Payment Methods',
      icon: Images.card,
      path: NAVIGATION.paymentMethod,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
      title: 'My Invoices',
      icon: Images.invoice,
      path: NAVIGATION.invoice,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91a2a97f63',
      title: 'My Address',
      icon: Images.pin,
      path: NAVIGATION.myAddress,
    },

    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f678',
      title: 'My Notifications',
      icon: Images.bell,
      path: NAVIGATION.notificationList,
    },
  ];

  const optionPressed = (index) => {
    if (index == 1) {
      // navigation.navigate('ClientList');
    } else if (index == 2) {
      navigation.navigate(NAVIGATION.myAddress);
    } else if (index == 3) {
      navigation.navigate(NAVIGATION.notificationList);
    }
  };
  const renderItem = ({ item, index }) => (
    <Pressable
      style={styles.section}
      onPress={() => {
        optionPressed(index);
      }}
    >
      <View style={styles.image}>
        <Image style={styles.logo} source={item.icon} resizeMode={'contain'} />
      </View>
      <View style={styles.body}>
        <TouchableOpacity onPress={() => navigation.navigate(item.path)}>
          <Text style={styles.optionName}>{item.title}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.image}>
        <Image style={styles.logo} source={Images.right} resizeMode={'contain'} />
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
}
