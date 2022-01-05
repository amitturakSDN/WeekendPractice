import { globalFonts, globalColors } from '@/theme';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export function EmptyComponent(props) {
  const { colors } = useTheme();
  const { title } = props;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        paddingTop: RFPercentage(20),
      }}
    >
      <Text
        style={{
          fontSize: RFValue(16),
          fontFamily: globalFonts.semibold,
          textAlign: 'center',
          color: globalColors.primaryTheme,
          paddingTop: RFPercentage(2),
        }}
      >
        {title}
      </Text>
    </View>
  );
}
