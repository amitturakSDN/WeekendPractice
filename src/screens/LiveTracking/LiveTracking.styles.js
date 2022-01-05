import { globalColors } from '@/theme';
import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: globalColors.primaryTheme,
  },
  map: { flex: 1 },
});
