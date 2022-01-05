import { StyleSheet } from 'react-native';
import { globalColors, globalFonts, spacing } from '@/theme';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    // height: RFPercentage(10),
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
    flexDirection: 'row',
    marginBottom: 1,
  },
  countContainer: {
    height: RFValue(19),
    width: RFValue(19),
    borderRadius: RFValue(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalColors.primaryTheme,
  },
  countText: {
    fontSize: RFValue(12),
    color: globalColors.white,
  },
  time: {
    color: globalColors.grey,
    fontFamily: globalFonts.regular,
    fontSize: RFValue(9),
  },
  count: { flex: 0.1, justifyContent: 'center', alignItems: 'center' },
  nameText: { fontFamily: globalFonts.semibold, fontSize: RFValue(16) },
  name: { flex: 0.75, justifyContent: 'space-evenly' },
  imageContainer: { flex: 0.15, justifyContent: 'center' },
  body: { fontFamily: globalFonts.regular, fontSize: RFValue(12) },
  imageLogo: {
    height: RFValue(35),
    width: RFValue(35),
    borderRadius: 100,
    borderWidth: RFValue(2),
    borderColor: globalColors.primaryTheme,
    justifyContent: 'center',
    alignItems: 'center',
    // tintColor: globalColors.primaryTheme,
  },
});
