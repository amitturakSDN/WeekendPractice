import { StyleSheet } from 'react-native';
import { globalColors, spacing, globalFonts } from '@/theme';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: RFPercentage(20),
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
  },
  //   cardHeader: { flex: 0.4, flexDirection: 'row' },
  image: { flex: 0.15, justifyContent: 'center' },
  userName: {
    fontSize: RFValue(18),
    fontFamily: globalFonts.semibold,
  },
  serviceicon: { height: RFValue(11), width: RFValue(11) },
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
    // justifyContent: 'space-evenly',
    padding: RFValue(5),
  },
  date: {
    flex: 0.5,
    justifyContent: 'center',
    // justifyContent: 'space-evenly',
    padding: RFValue(5),
  },
  servicename: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.medium,
  },
  completed: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.medium,
    color: globalColors.completed,
  },
  type: {
    fontSize: RFValue(12),
    fontFamily: globalFonts.regular,
    paddingLeft: RFValue(8),
    paddingTop: RFValue(3),
    paddingBottom: RFValue(5),
    color: globalColors.lightGrey,
  },
  footer: { flex: 0.7, flexDirection: 'row' },
  nameContainer: { flex: 0.85, justifyContent: 'center' },
  imageLogo: { height: RFValue(38), width: RFValue(38), borderRadius: 100 },
  amount: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.semibold,
    color: globalColors.primaryTheme,
  },
});
