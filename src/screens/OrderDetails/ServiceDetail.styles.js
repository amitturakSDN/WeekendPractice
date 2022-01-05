import { StyleSheet } from 'react-native';
import { globalColors, globalFonts, spacing } from '@/theme';
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
    paddingBottom: RFValue(15),
  },
  addons: {
    fontFamily: globalFonts.semibold,
    fontSize: RFValue(16),
    // paddingTop: RFValue(15),
    paddingVertical: RFValue(15),
  },

  card: {
    height: RFValue(65),
    backgroundColor: globalColors.white,
    padding: RFValue(10),
    // borderWidth: 2,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  serviceName: {
    fontSize: RFValue(16),
    fontFamily: globalFonts.medium,
  },
  type: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.regular,
    color: globalColors.textGrey,
  },
  amtTxt: {
    fontSize: RFValue(16),
    fontFamily: globalFonts.semibold,
  },
  serviceCont: { flex: 0.8, justifyContent: 'space-evenly' },
  amtCnt: { flex: 0.2, justifyContent: 'center', alignItems: 'flex-end' },
  calculation: {
    backgroundColor: globalColors.white,
    marginTop: RFValue(10),
    padding: RFValue(10),
    borderRadius: RFValue(15),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  field: {
    height: RFValue(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.regular,
  },
  titleText: {
    fontSize: RFValue(16),
    fontFamily: globalFonts.semibold,
  },
  totField: {
    height: RFValue(40),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: RFValue(10),
  },
});
