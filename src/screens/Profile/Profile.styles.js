import { StyleSheet } from 'react-native';
import { globalColors, globalFonts, spacing } from '@/theme';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
  },
  imageLogo: {
    height: RFValue(40),
    width: RFValue(40),
    borderRadius: RFValue(100),
    borderWidth: RFValue(2),
    borderColor: globalColors.primaryTheme,
  },
  header: {
    flex: 0.7,
    backgroundColor: globalColors.primaryTheme,
    borderBottomRightRadius: RFValue(20),
    borderBottomLeftRadius: RFValue(20),

    alignItems: 'center',
  },
  settings: {
    fontSize: RFValue(22),
    fontFamily: globalFonts.semibold,
    color: globalColors.white,
  },
  headerCard: {
    height: RFPercentage(20),
    width: '90%',
    borderRadius: RFValue(20),
    backgroundColor: globalColors.white,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  pHeader: {
    flex: 0.3,
  },
  cardOne: {
    flex: 0.1,
    alignItems: 'center',
    padding: RFValue(15),
  },
  cardMiddle: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  userImage: {
    height: RFValue(50),
    width: RFValue(50),
    borderRadius: RFValue(100),
  },
  logo: {
    height: RFValue(20),
    width: RFValue(20),
  },
  usrname: {
    fontFamily: globalFonts.semibold,
    fontSize: RFValue(22),
  },
  email: {
    fontFamily: globalFonts.regular,
    fontSize: RFValue(14),
  },

  buttonstyle: {
    backgroundColor: globalColors.lightPrimary,
    height: RFValue(45),
    borderRadius: RFValue(10),
    borderWidth: 0,
    width: '90%',
    alignSelf: 'center',
  },

  buttonText: {
    fontSize: RFValue(18),
    color: globalColors.primaryTheme,
    fontFamily: globalFonts.medium,
  },
});
