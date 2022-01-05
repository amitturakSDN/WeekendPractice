import { globalColors, spacing } from '@/theme';
import { globalFonts } from '@/theme/globalFonts';
import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: globalColors.primaryTheme,
  },
  icons: {
    height: RFValue(15),
    width: RFValue(15),
    marginTop: RFValue(3),
  },
  inputStyle: {
    marginVertical: spacing.s,
  },
  addContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: RFValue(40),
  },
  addImage: {
    height: RFValue(20),
    width: RFValue(20),
  },
  backImage: {
    height: '100%',
  },
  logo: {
    height: RFPercentage(25),
    width: RFPercentage(25),
  },
  inputStyle: {
    marginVertical: spacing.s,
    // backgroundColor: 'red',
  },
  icons: {
    height: RFValue(15),
    width: RFValue(15),
    marginTop: RFValue(3),
  },
  buttonText: {
    fontSize: RFValue(18),
    color: 'white',
    fontFamily: globalFonts.medium,
  },
  buttonStyle: {
    height: RFValue(45),
    borderRadius: RFValue(10),
    borderWidth: 0,
    alignSelf: 'center',
    marginTop: RFValue(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EC008C',
  },

  loginBody: {
    flex: 0.5,
    borderTopLeftRadius: RFValue(25),
    borderTopRightRadius: RFValue(25),
    backgroundColor: 'white',
    padding: RFValue(20),
  },
  logoBody: { flex: 0.5, justifyContent: 'center', alignItems: 'center' },
  forgotText: { fontSize: RFValue(15), textAlign: 'right' },
  back: {
    height: RFValue(40),
    width: RFValue(40),
    borderRadius: RFValue(100),
    borderWidth: 0,
    borderColor: 'white',
    margin: RFValue(20),
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backImg: { height: RFValue(30), width: RFValue(30) },
  textInput: {
    height: RFValue(50),
    width: '100%',
    borderRadius: RFValue(10),
    marginTop: RFValue(15),
    fontFamily: globalFonts.regular,
  },
  resetPassText: {
    fontFamily: globalFonts.semibold,
    fontSize: RFValue(25),
    paddingVertical: RFValue(20),
  },
});
