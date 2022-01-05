import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { Register } from '../screens/Register/Register';
import { Verification } from '../screens/Verification/Verification';
import { ForgetPassword } from '../screens/ForgetPassword/ForgetPassword';
import { Login } from '@/screens';
import { NAVIGATION } from '@/constants';
import Onboarding from '@/screens/Onboarding/Onboarding';
import { ResetPassword } from '@/screens/ResetPassword/ResetPassword';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen component={Onboarding} name={NAVIGATION.onboarding} options={{ headerShown: false }} /> */}
      <Stack.Screen component={Login} name={NAVIGATION.login} options={{ headerShown: false }} />

      <Stack.Screen
        component={Register}
        name={NAVIGATION.register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ForgetPassword}
        name={NAVIGATION.forgetpassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Verification}
        name={NAVIGATION.verification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ResetPassword}
        name={NAVIGATION.reset}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
