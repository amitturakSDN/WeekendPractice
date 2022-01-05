import { StyleSheet } from 'react-native';
import { globalColors, globalFonts, spacing } from '@/theme';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    // height: RFPercentage(10),
    paddingVertical: RFValue(15),
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
  },

  header: {
    fontFamily: globalFonts.regular,
    fontSize: RFValue(15),
  },

  child: {
    fontFamily: globalFonts.regular,
    fontSize: RFValue(15),
    color: globalColors.lightGrey,
  },

  buttonCont: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  childOne: {
    fontFamily: globalFonts.regular,
    fontSize: RFValue(15),
    color: globalColors.darkGreen,
  },
  date: {
    fontFamily: globalFonts.regular,
    fontSize: RFValue(12),
    color: globalColors.textGrey,
    paddingLeft: RFValue(10),
  },
  serviceicon: { height: RFValue(11), width: RFValue(11) },
  header: { flex: 0.5, justifyContent: 'center' },
  dateCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontFamily: globalFonts.medium,
    fontSize: RFValue(12),
    paddingTop: RFValue(10),
  },
  buttonstyle: {
    backgroundColor: globalColors.lightGreen,
    height: RFValue(35),
    borderRadius: RFValue(30),
    borderWidth: 0,
    width: RFValue(120),
  },
  buttonText: {
    // fontSize: RFValue(14),
    color: globalColors.darkGreen,
    fontFamily: globalFonts.regular,
  },
});
