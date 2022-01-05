import { StyleSheet } from 'react-native';
import { globalColors, globalFonts, spacing } from '@/theme';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
  },
  card: {
    height: RFValue(80),
    width: '90%',
    alignSelf: 'center',
    borderRadius: RFValue(15),
    backgroundColor: globalColors.white,
    margin: RFValue(10),
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: RFValue(10),
  },
  details: {
    flex: 0.8,
    justifyContent: 'space-evenly',
  },
  amount: { flex: 0.2, justifyContent: 'center' },
  amtText: {
    fontSize: RFValue(16),
    fontFamily: globalFonts.medium,
    color: globalColors.primaryTheme,
  },
  cName: {
    fontSize: RFValue(16),
    fontFamily: globalFonts.medium,
    color: globalColors.primaryTheme,
  },
  sName: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.regular,
  },
  aName: {
    fontSize: RFValue(12),
    fontFamily: globalFonts.regular,
  },
});
