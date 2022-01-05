import { globalColors, globalFonts } from '@/theme';
import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

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
  myStarStyle: {
    backgroundColor: globalColors.yellow,
  },
  imageLogo: {},
  card: {
    height: RFValue(90),
    borderRadius: RFValue(15),
    backgroundColor: globalColors.white,
    borderWidth: 0.5,
    borderColor: globalColors.grey,
    padding: RFValue(15),
    marginBottom: RFValue(10),
    fontFamily: globalFonts.regular,
    fontSize: RFValue(12),
    paddingTop: RFValue(10),
    color: globalColors.primaryTheme,
  },
  star: {
    alignItems: 'flex-start',
    paddingBottom: RFValue(10),
  },
  comment: {
    fontFamily: globalFonts.regular,
    fontSize: RFValue(12),
    color: globalColors.textGrey,
  },
});
