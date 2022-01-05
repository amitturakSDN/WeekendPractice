import PropTypes from 'prop-types';
import React from 'react';
import { Image, Text } from 'react-native';
import { home, schedule, chat, settings } from '@/assets';
import { NAVIGATION } from '@/constants';
import { globalColors } from '@/theme';

const tabIcon = {
  [NAVIGATION.home]: home,
  [NAVIGATION.schedule]: schedule,
  [NAVIGATION.chat]: chat,
  [NAVIGATION.profile]: settings,
};

export function TabBarIcon({ color, routeName, focused }) {
  return (
    <Image
      accessibilityIgnoresInvertColors
      source={tabIcon[routeName]}
      style={{ tintColor: focused ? globalColors.primaryTheme : globalColors.grey }}
    />
  );
}

TabBarIcon.propTypes = {
  color: PropTypes.string.isRequired,
  routeName: PropTypes.string.isRequired,
};

export function TabBarLabel({ focused, route }) {
  return focused ? (
    <Text style={{ fontSize: 14, fontWeight: '600', color: globalColors.primaryTheme }}>
      {route.name}
    </Text>
  ) : null;
}
