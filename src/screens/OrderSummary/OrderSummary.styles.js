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
  backArrw: { height: RFValue(30), width: RFValue(30) },
  heading: {
    fontSize: RFValue(16),
    color: globalColors.black,
    fontFamily: globalFonts.semibold,
    marginVertical: RFValue(10),
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
  mainView: { paddingHorizontal: '5%' },
  headingText: {
    fontSize: RFValue(16),
    color: globalColors.black,
    fontFamily: globalFonts.semibold,
    marginVertical: RFValue(10),
  },
  serviceItemView: {
    marginVertical: RFValue(5),
    width: '100%',
    padding: RFValue(15),
    alignSelf: 'center',
    shadowColor: globalColors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: globalColors.white,
    borderRadius: RFValue(10),
  },
  serViceItem: { flexDirection: 'row', marginVertical: RFValue(5) },
  serviceName: {
    color: globalColors.black,
    fontSize: RFValue(14),
    fontFamily: globalFonts.medium,
    width: '90%',
  },
  serviceDesc: {
    color: globalColors.grey,
    fontSize: RFValue(14),
    fontFamily: globalFonts.regular,
    marginVertical: RFValue(5),
    width: '90%',
  },
  servicePrice: {
    color: globalColors.black,
    fontSize: RFValue(16),
    fontFamily: globalFonts.semibold,
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0,
  },
  bottomLeft: { width: '80%', flexDirection: 'row', alignItems: 'center' },
  loc: { height: RFValue(15), width: RFValue(15), marginRight: RFValue(10) },
  changeText: {
    fontSize: RFValue(10),
    color: globalColors.primaryTheme,
    fontFamily: globalFonts.medium,
  },
});
