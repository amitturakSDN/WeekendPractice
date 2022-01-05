import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { globalColors, globalFonts } from '@/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  icons: {
    height: RFValue(15),
    width: RFValue(15),
    marginTop: RFValue(3),
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
  inputStyle: {
    marginTop: RFValue(15),
    width: '83%',
    height: RFValue(45),
    borderBottomRightRadius: RFValue(10),
  },
  phoneStyle: {
    width: '83%',
    height: RFValue(45),
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  countryCode: {
    height: RFValue(45),
    alignSelf: 'center',
    width: '15%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#E7E7E7',
    borderTopLeftRadius: RFValue(10),
    borderBottomLeftRadius: RFValue(10),
    justifyContent: 'center',
  },
  backImg: { height: RFValue(30), width: RFValue(30) },
  back: {
    height: RFValue(40),
    width: RFValue(40),
    borderColor: globalColors.white,
    margin: RFValue(20),
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: { height: RFPercentage(20), width: RFPercentage(20) },
  imgBack: { height: RFPercentage(40) },
  headingText: {
    fontSize: RFValue(32),
    fontFamily: globalFonts.semibold,
    marginVertical: RFValue(10),
  },
  signupView: { marginHorizontal: RFValue(35), paddingVertical: RFValue(15) },
  bottomView: {
    flex: 1.5,
    backgroundColor: globalColors.white,
    bottom: 0,
    paddingBottom: RFValue(20),
    borderTopStartRadius: RFValue(40),
    borderTopEndRadius: RFValue(40),
  },
  countryCodetext: { fontSize: RFValue(13) },
  buttonText: { fontSize: RFValue(18), color: 'white', fontFamily: globalFonts.medium },
  alreadyAccount: {
    color: globalColors.grey,
    fontFamily: globalFonts.regular,
    fontSize: RFValue(14),
  },
  loginText: {
    color: globalColors.primaryTheme,
    fontFamily: globalFonts.regular,
    fontSize: RFValue(14),
  },
  alreadyAccountView: { flexDirection: 'row', marginTop: RFValue(20), alignSelf: 'center' },
});
