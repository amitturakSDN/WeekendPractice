import { StyleSheet } from 'react-native';
import { globalColors, globalFonts, spacing } from '@/theme';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    // paddingTop: RFValue(15),
  },
  title: {
    fontFamily: globalFonts.semibold,
    fontSize: RFValue(16),
    paddingVertical: RFValue(15),
  },
  card: {
    width: '100%',
    height: RFPercentage(10),
    borderRadius: RFValue(10),
    backgroundColor: globalColors.white,
    alignSelf: 'center',
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
  },
  countText: {
    fontSize: RFValue(12),
    color: globalColors.white,
  },
  imageContainer: { flex: 0.2, justifyContent: 'center' },

  count: { flex: 0.1, justifyContent: 'center', alignItems: 'center' },
  countContainer: {
    height: RFValue(19),
    width: RFValue(19),
    borderRadius: RFValue(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalColors.primaryTheme,
  },
  body: { fontFamily: globalFonts.regular, fontSize: RFValue(12) },
  name: { flex: 0.7, justifyContent: 'space-evenly' },

  nameText: { fontFamily: globalFonts.semibold, fontSize: RFValue(16) },

  time: {
    color: globalColors.grey,
    fontFamily: globalFonts.regular,
    fontSize: RFValue(9),
  },
  nameText: { fontFamily: globalFonts.semibold, fontSize: RFValue(16) },

  imageLogo: { height: RFValue(38), width: RFValue(38), borderRadius: 100 },
});
