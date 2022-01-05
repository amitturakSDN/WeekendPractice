import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NAVIGATION } from '@/constants';
import { Schedule } from '@/screens/Schedule/Schedule';
import { OrderDetails } from '@/screens/OrderDetails/OrderDetails';
import { LiveTracking } from '@/screens/LiveTracking/LiveTracking';
import { ChatMessgae } from '@/screens/ChatMessage/ChatMessage';

const Stack = createNativeStackNavigator();

export function ScheduleNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION.schedule}
        component={Schedule}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.orderDetails}
        component={OrderDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.livetracking}
        component={LiveTracking}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.chatlist}
        component={ChatMessgae}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
