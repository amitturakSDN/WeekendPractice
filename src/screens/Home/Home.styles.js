import { StyleSheet } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { globalColors, globalFonts } from '@/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  zipcode: {
    flexDirection: 'row',
  },
  address: {
    tintColor: globalColors.white,
  },
  headerContainer: {
    width: '100%',
    borderBottomLeftRadius: RFValue(30),
    borderBottomRightRadius: RFValue(30),
    borderWidth: 0,
    minHeight: RFValue(100),
    paddingVertical: RFValue(20),
    marginBottom: RFValue(10),
    paddingHorizontal: RFPercentage(3),
    backgroundColor: globalColors.primaryTheme,
  },
  pageHeading: {
    color: globalColors.white,
    fontSize: RFValue(16),
    fontFamily: globalFonts.semibold,
    paddingLeft: RFValue(10),
  },
  appName: { fontFamily: globalFonts.bold, fontSize: RFValue(18) },
  welcomeText: {
    color: globalColors.white,
    fontSize: RFValue(16),
    marginVertical: RFValue(10),
    fontFamily: globalFonts.regular,
  },
  searchBarView: {
    width: '100%',
    height: RFValue(40),
    borderWidth: 1,
    paddingHorizontal: RFValue(8),
    backgroundColor: '#C70679',
    borderColor: globalColors.white,
    borderRadius: 5,
    marginVertical: RFValue(10),
    flexDirection: 'row',
  },
  searchInput: {
    fontFamily: globalFonts.semiBold,
    color: globalColors.white,

    width: '85%',
    fontSize: RFValue(14),
    borderWidth: 0,
    marginLeft: RFValue(8),
    height: RFValue(40),
  },
  centerStyles: { justifyContent: 'center', alignItems: 'center' },
  serviceItemView: {
    marginVertical: RFValue(5),
    width: '90%',
    padding: RFValue(15),
    marginHorizontal: RFValue(10),
    alignSelf: 'center',
    shadowColor: globalColors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    backgroundColor: globalColors.white,
    borderRadius: RFValue(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceName: {
    color: globalColors.black,
    fontSize: RFValue(14),
    fontFamily: globalFonts.semibold,
  },
  serviceDesc: {
    color: globalColors.grey,
    fontSize: RFValue(14),
    fontFamily: globalFonts.regular,
    marginVertical: RFValue(5),
  },
  servicePrice: {
    color: globalColors.primaryTheme,
    fontSize: RFValue(16),
    fontFamily: globalFonts.semibold,
  },
  checkBox: {
    height: RFValue(16),
    width: RFValue(16),
  },
  searchIcon: {
    height: RFValue(14),
    width: RFValue(14),
  },
  nextButton: {
    width: RFPercentage(15),
    height: RFValue(40),
    borderRadius: RFValue(10),
    backgroundColor: globalColors.primaryTheme,
    position: 'absolute',
    bottom: '2%',
    left: '35%',
    right: '35%',
    zIndex: 1,
  },
  nextText: {
    color: globalColors.white,
    fontSize: RFValue(14),
    fontFamily: globalFonts.semibold,
  },
});
