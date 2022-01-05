import { globalColors, globalFonts } from '@/theme';
import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    margin: RFValue(10),
    flexDirection: 'row',
  },
  header: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.regular,
    color: globalColors.primaryTheme,
    paddingLeft: RFValue(10),
  },
  chatIcon: {
    height: RFValue(20),
    width: RFValue(20),
  },
});
