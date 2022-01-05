import { StyleSheet } from 'react-native';
import { globalColors, globalFonts, spacing } from '@/theme';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  container: {
    height: RFPercentage(10),
    width: '90%',
    alignSelf: 'center',
    // backgroundColor: globalColors.white,
    alignItems: 'center',
    padding: RFValue(15),
    borderRadius: RFValue(10),
    marginTop: RFValue(10),
    flexDirection: 'row',
  },
  serviceicon: {
    height: RFValue(30),
    width: RFValue(30),
  },
  concern: { fontSize: RFValue(18), fontFamily: globalFonts.regular, paddingLeft: RFValue(15) },
});
