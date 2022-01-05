import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NAVIGATION } from '@/constants';
import { Home, ServiceRequest, ServiceQuestion, OrderSummary } from '@/screens';
import { LiveTracking } from '@/screens/LiveTracking/LiveTracking';
import { MyAddress } from '@/screens/MyAddress/MyAddress';
import { AddAddress } from '@/screens/AddAddress/AddAddress';
import { Payment } from '@/screens/Payment/Payment';
import { PaymentMethod } from '@/screens/PaymentMethod/PaymentMethod';
import { Cardless } from '@/screens/CardlessPayment/Cardless';
const Stack = createNativeStackNavigator();

export function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={NAVIGATION.home} component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name={NAVIGATION.serviceRequest}
        component={ServiceRequest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.serviceQuestion}
        component={ServiceQuestion}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.orderSummary}
        component={OrderSummary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.livetracking}
        component={LiveTracking}
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
    </Stack.Navigator>
  );
}
