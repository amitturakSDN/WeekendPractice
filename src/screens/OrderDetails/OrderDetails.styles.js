import { StyleSheet } from 'react-native';
import { globalColors, globalFonts, spacing } from '@/theme';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonstyle: {
    backgroundColor: globalColors.lightPrimary,
    height: RFValue(40),
    borderRadius: RFValue(10),
    borderWidth: 0,
    alignSelf: 'center',
    width: '90%',
    marginVertical: RFValue(20),
  },
  buttonText: {
    fontSize: RFValue(18),
    color: globalColors.primaryTheme,
    fontFamily: globalFonts.medium,
  },
});
