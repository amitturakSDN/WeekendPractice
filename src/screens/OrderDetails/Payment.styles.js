import { globalColors, globalFonts } from '@/theme';
import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
  },
  header: {
    fontFamily: globalFonts.semibold,
    fontSize: RFValue(16),
    paddingVertical: RFValue(15),
  },
  card: {
    height: RFValue(80),
    borderRadius: RFValue(15),
    backgroundColor: globalColors.white,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: RFValue(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  childOne: {
    fontFamily: globalFonts.regular,
    fontSize: RFValue(15),
    paddingLeft: RFValue(15),
  },
  address: { flex: 0.5, justifyContent: 'space-evenly' },
  pin: { flex: 0.3, justifyContent: 'center', alignItems: 'flex-end' },
  image: { flex: 0.2, paddingRight: RFValue(8) },
  addr: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.regular,
  },
  city: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.bold,
  },
  imageLogo: {},
  map: {},
});
