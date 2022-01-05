import { StyleSheet } from 'react-native';
import { globalColors, globalFonts, spacing } from '@/theme';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    height: RFValue(55),
    borderRadius: RFValue(10),
    width: '90%',
    alignSelf: 'center',
    margin: RFValue(5),
    // backgroundColor: globalColors.white,
    backgroundColor: globalColors.white,

    flexDirection: 'row',
  },
  image: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 0.8,
    justifyContent: 'center',
  },
  optionName: {
    fontFamily: globalFonts.medium,
    fontSize: RFValue(16),
  },
  logo: {
    height: RFValue(20),
    width: RFValue(20),
    tintColor: globalColors.primaryTheme,
  },
});
