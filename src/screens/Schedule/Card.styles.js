import { StyleSheet } from 'react-native';
import { globalColors, spacing, globalFonts } from '@/theme';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    // height: RFPercentage(30),
    paddingVertical: RFValue(15),
    width: '90%',
    borderRadius: RFValue(10),
    backgroundColor: globalColors.white,
    alignSelf: 'center',
    marginTop: RFValue(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: RFValue(10),
    marginBottom: RFValue(2),
  },
  cardHeader: { flex: 0.425, flexDirection: 'row' },
  image: { flex: 0.15, justifyContent: 'center' },
  userName: {
    fontSize: RFValue(18),
    fontFamily: globalFonts.semibold,
  },
  serviceicon: { height: RFValue(11), width: RFValue(11), marginRight: RFValue(8), borderWidth: 0 },
  address: {
    fontSize: RFValue(13),
    fontFamily: globalFonts.regular,
    paddingLeft: RFValue(5),
  },
  service: {
    flex: 0.5,
    borderRightWidth: 0.5,
    borderRightColor: globalColors.grey,
    justifyContent: 'center',
    padding: RFValue(5),
  },
  serviceAmaount: {
    flex: 0.25,
    justifyContent: 'center',
    padding: RFValue(5),
  },

  date: {
    flex: 0.5,
    justifyContent: 'center',
    padding: RFValue(5),
  },

  buttonCont: {
    flex: 0.75,
    justifyContent: 'center',
    padding: RFValue(5),
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  servicename: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.medium,
    color: globalColors.blacktext,
    // paddingTop: RFValue(8),
  },

  status: {
    fontSize: RFValue(16),
    fontFamily: globalFonts.medium,
    color: globalColors.darkGreen,
    // paddingTop: RFValue(8),
  },

  type: {
    fontSize: RFValue(12),
    fontFamily: globalFonts.regular,
    // paddingLeft: RFValue(8),
    // paddingBottom: RFValue(5),
    color: globalColors.textGrey,
  },
  typeStatus: {
    fontSize: RFValue(12),
    fontFamily: globalFonts.regular,

    color: globalColors.textGrey,
  },
  footer: { flex: 0.5, flexDirection: 'row', paddingTop: RFValue(10) },
  footerOngoing: {
    flex: 0.5,
    flexDirection: 'row',
    paddingTop: RFValue(10),
  },

  nameContainer: { flex: 0.85, justifyContent: 'center' },
  imageLogo: {
    height: RFValue(38),
    width: RFValue(38),
    borderRadius: 100,
    borderWidth: RFValue(2),
    borderColor: globalColors.primaryTheme,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatLogo: { height: RFValue(32), width: RFValue(32) },
  amountText: {
    fontSize: RFValue(16),
    fontFamily: globalFonts.semibold,
    color: globalColors.primaryTheme,
  },
  buttonstyle: {
    backgroundColor: globalColors.lightGreen,
    width: RFValue(110),
    height: RFValue(35),
    borderRadius: RFValue(20),
    borderWidth: 0,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: RFValue(11),
    color: globalColors.darkGreen,
    fontFamily: globalFonts.medium,
  },
  buttonstyleCancel: {
    backgroundColor: globalColors.lightPrimary,
    width: RFValue(80),
    height: RFValue(35),
    borderRadius: RFValue(20),
    borderWidth: 0,
    alignSelf: 'center',
  },
  buttonTextCancel: {
    fontSize: RFValue(11),
    color: globalColors.primaryTheme,
    fontFamily: globalFonts.medium,
  },
});
