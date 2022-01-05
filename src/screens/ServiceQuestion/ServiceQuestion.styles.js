import { StyleSheet } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { globalColors, globalFonts } from '@/theme';

export const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    width: '100%',
    borderBottomLeftRadius: RFValue(30),
    borderBottomRightRadius: RFValue(30),
    borderWidth: 0,
    minHeight: RFValue(80),
    paddingVertical: RFValue(20),
    marginBottom: RFValue(10),
    paddingHorizontal: RFPercentage(3),
    backgroundColor: globalColors.primaryTheme,
  },
  centerStyles: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  heading: {
    fontSize: RFValue(16),
    color: globalColors.black,
    fontFamily: globalFonts.semibold,
    marginVertical: RFValue(10),
  },
  textInput: {
    backgroundColor: globalColors.white,
    borderWidth: 0.5,
    borderColor: globalColors.grey,
    borderRadius: 5,
  },
  button: {
    backgroundColor: globalColors.primaryTheme,
    height: RFValue(40),
    width: '100%',
    marginTop: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: { fontSize: RFValue(16), color: 'white', fontFamily: globalFonts.medium },

  headerText: {
    color: globalColors.white,
    fontFamily: globalFonts.semibold,
    fontSize: RFValue(18),
    alignSelf: 'center',
  },
  question: {
    color: globalColors.black,
    fontSize: RFValue(14),
    fontFamily: globalFonts.semibold,
    marginVertical: RFValue(5),
  },
});
