import { globalColors, globalFonts } from '@/theme';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

export function GlobalLoader(props) {
  const { colors } = useTheme();
  const { title } = props;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size={'large'} color={globalColors.primaryTheme} />
      <Text
        style={{
          fontSize: RFValue(16),
          fontFamily: globalFonts.semibold,
          textAlign: 'center',
          color: globalColors.primaryTheme,
          paddingTop: RFValue(10),
        }}
      >
        {title}
      </Text>
    </View>
  );
}
