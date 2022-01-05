import { globalColors, globalFonts } from '@/theme';
import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  header: {
    fontFamily: globalFonts.semibold,
    fontSize: RFValue(16),
    paddingVertical: RFValue(15),
  },
  card: {
    height: RFPercentage(25),
    borderWidth: 2,
    borderColor: globalColors.primaryTheme,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(15),
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  photo: {
    fontSize: RFValue(16),
    fontFamily: globalFonts.medium,
    color: globalColors.primaryTheme,
    textAlign: 'center',
  },
  picStyles: {
    height: RFPercentage(28),
    width: RFPercentage(20),
    borderRadius: RFValue(15),
  },
});
