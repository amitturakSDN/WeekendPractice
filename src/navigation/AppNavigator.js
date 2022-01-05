import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TabBarIcon, TabBarLabel } from '@/components';
import { NAVIGATION } from '@/constants';
import { HomeNavigator } from '@/navigation/HomeNavigator';
import { ProfileNavigator } from '@/navigation/ProfileNavigator';
import { ScheduleNavigator } from './ScheduleNavigator';
import { ChatNavigator } from './ChatNavigator';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} route={route} />,
        tabBarIcon: ({ focused, color }) => (
          <TabBarIcon color={color} routeName={route.name} focused={focused} />
        ),
      })}
      tabBarOptions={{
        activeTintColor: colors.activeTab,
        inactiveTintColor: colors.inactiveTab,
      }}
    >
      <Tab.Screen
        name={NAVIGATION.home}
        component={HomeNavigator}
        options={{
          unmountOnBlur: true, // set this props in your tab screen options
        }}
      />
      {/* <Tab.Screen name={NAVIGATION.schedule} component={ScheduleNavigator} />
      <Tab.Screen name={NAVIGATION.chat} component={ChatNavigator} /> */}
      <Tab.Screen name={NAVIGATION.profile} component={ProfileNavigator} />
    </Tab.Navigator>
  );
}
