import { StyleSheet } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { globalFonts, spacing, globalColors } from '@/theme';

export const styles = StyleSheet.create({
  back: {
    height: RFValue(40),
    width: RFValue(40),
    borderRadius: RFValue(20),
    borderWidth: 0,
    borderColor: globalColors.white,
    margin: RFValue(20),
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: globalColors.primaryTheme,
    height: 50,
    width: '100%',
    marginTop: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  backImg: { height: RFValue(30), width: RFValue(30) },
  icons: {
    height: RFValue(15),
    width: RFValue(15),
    marginTop: RFValue(3),
  },
  inputStyle: {
    marginVertical: spacing.s,
    width: '83%',
    height: 60,
    fontFamily: globalFonts.regular,
  },
  countryCode: {
    height: 60,
    borderRadius: 5,
    width: '15%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#E7E7E7',
    paddingBottom: RFValue(10),
  },
  headingText: { fontSize: RFValue(22), fontFamily: globalFonts.semibold },
  subHeading: {
    marginTop: RFValue(10),
    color: globalColors.grey,
    letterSpacing: 0.5,
    fontFamily: globalFonts.regular,
  },
  imageBack: { height: RFPercentage(68) },
  backLogo: { height: RFPercentage(28), width: RFPercentage(28) },
  buttontext: { fontSize: RFValue(18), color: globalColors.white, fontFamily: globalFonts.medium },
  bottomView: {
    flex: 2,
    backgroundColor: globalColors.white,
    bottom: RFPercentage(18),
    borderTopStartRadius: RFValue(40),
    borderTopEndRadius: RFValue(40),
  },
  forgotText: { marginHorizontal: RFValue(20), padding: 10, marginTop: 30 },
});
