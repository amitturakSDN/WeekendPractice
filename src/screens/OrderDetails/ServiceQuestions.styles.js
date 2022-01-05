import { globalColors, globalFonts } from '@/theme';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  title: {
    fontFamily: globalFonts.semibold,
    fontSize: RFValue(16),
    paddingVertical: RFValue(15),
  },
  card: {
    borderRadius: RFValue(15),
    borderRadius: RFValue(15),
    backgroundColor: globalColors.white,
    padding: RFValue(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardChild: {},
  question: {
    fontFamily: globalFonts.regular,
    fontSize: RFValue(14),
    color: globalColors.textGrey,
  },
  answer: {
    fontFamily: globalFonts.medium,
    fontSize: RFValue(14),
    paddingVertical: RFValue(10),
  },
  serviceicon: {
    height: RFValue(20),
    width: RFValue(20),
    alignSelf: 'center',
  },
});
