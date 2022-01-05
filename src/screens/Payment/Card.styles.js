import { StyleSheet } from 'react-native';
import { globalColors, globalFonts, spacing } from '@/theme';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.white,
    paddingHorizontal: RFValue(15),
  },
  card: {
    height: RFValue(80),
    width: '98%',
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
    flex: 0.6,
    justifyContent: 'center',
  },

  delete: { flex: 0.2, justifyContent: 'center', alignItems: 'flex-end' },
  amount: { flex: 0.2, justifyContent: 'center' },
  amtText: {
    fontSize: RFValue(16),
    fontFamily: globalFonts.medium,
    color: globalColors.darkGreen,
  },
  cName: {
    fontSize: RFValue(15),
    fontFamily: globalFonts.medium,
  },
  sName: {
    fontSize: RFValue(15),
    fontFamily: globalFonts.regular,
  },
  aName: {
    fontSize: RFValue(12),
    fontFamily: globalFonts.regular,
  },
  cardTxt: {
    fontSize: RFValue(18),
    fontFamily: globalFonts.medium,
  },
  deleteIcon: {
    height: RFValue(30),
    width: RFValue(30),
  },
});
