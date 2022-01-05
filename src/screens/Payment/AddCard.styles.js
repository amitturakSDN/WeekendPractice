import { StyleSheet } from 'react-native';
import { globalColors, globalFonts, spacing } from '@/theme';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: RFValue(15),
  },
  cardTxt: {
    fontSize: RFValue(18),
    fontFamily: globalFonts.medium,
    paddingTop: RFValue(10),
  },
  detailHolder: {
    flexDirection: 'row',
  },
  child: { flex: 0.5 },
  buttonText: { fontSize: RFValue(18), color: globalColors.white, fontFamily: globalFonts.medium },
  button: {
    backgroundColor: '#EC008C',
    height: RFValue(45),
    width: '100%',
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
  },
});
