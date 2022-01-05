import { StyleSheet } from 'react-native';
import { globalColors, globalFonts, spacing } from '@/theme';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  container: {
    height: RFValue(50),
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    // paddingTop: RFValue(15),
  },
  button: {
    height: '90%',
    width: '100%',
    backgroundColor: globalColors.lightPrimary,
    alignSelf: 'center',
    borderRadius: RFValue(15),
    borderWidth: RFValue(2),
    borderColor: globalColors.primaryTheme,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invoice: {
    fontFamily: globalFonts.medium,
    fontSize: RFValue(14),
    color: globalColors.primaryTheme,
  },
});
