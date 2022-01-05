import { NAVIGATION } from '@/constants';
import {View, Text} from 'react-native'
import { Profile } from '@/screens';
import { EditProfile } from '@/screens/EditProfile';
import { Payment } from '@/screens/Payment/Payment';
import { MyAddress } from '@/screens/MyAddress/MyAddress';
import { AddAddress } from '@/screens/AddAddress/AddAddress';
import { Invoice } from '@/screens/Invoice/Invoice';
import { Cardless } from '@/screens/CardlessPayment/Cardless';
import { PaymentMethod } from '@/screens/PaymentMethod/PaymentMethod';
import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NotificationList } from '@/screens/NotificationList/NotificationList';
import { OrderDetails } from '@/screens/OrderDetails/OrderDetails';

const Stack = createNativeStackNavigator();

export function ProfileNavigator() {
  return (
    
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION.profile}
        component={Profile}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name={NAVIGATION.editProfile}
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.payment}
        component={Payment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.paymentMethod}
        component={PaymentMethod}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.cardless}
        component={Cardless}
        options={{ headerShown: false }}
      />
    
      <Stack.Screen
        name={NAVIGATION.myAddress}
        component={MyAddress}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.addAddress}
        component={AddAddress}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.invoice}
        component={Invoice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.notificationList}
        component={NotificationList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.orderDetails}
        component={OrderDetails}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
}
