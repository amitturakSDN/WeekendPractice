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
    height: RFValue(50),
    borderRadius: RFValue(15),
    backgroundColor: globalColors.white,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: RFValue(15),
  },
  childOne: {
    fontFamily: globalFonts.regular,
    fontSize: RFValue(15),
    paddingLeft: RFValue(15),
  },
  imageLogo: {},
});
