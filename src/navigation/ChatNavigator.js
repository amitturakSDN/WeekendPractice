import { NAVIGATION } from '@/constants';
import { Chat } from '@/screens/Chat/Chat';
import { ChatMessgae } from '@/screens/ChatMessage/ChatMessage';
import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

const Stack = createNativeStackNavigator();

export function ChatNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={NAVIGATION.chat} component={Chat} options={{ headerShown: false }} />
      <Stack.Screen
        name={NAVIGATION.chatlist}
        component={ChatMessgae}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
