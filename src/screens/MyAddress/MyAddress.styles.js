import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import { globalColors, globalFonts } from '@/theme';
import { StyleSheet } from 'react-native';
import { normalizeUnits } from 'moment';

export const styles = StyleSheet.create({
  paymentMethodView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: RFValue(30),
    alignItems: 'center',
  },
  paymentMethodText: {
    fontFamily: globalFonts.semibold,
    marginLeft: 7,
    fontSize: 18,
  },
  addBtn: {
    backgroundColor: '#FFE6F5',
    width: RFValue(60),
    height: RFValue(25),
    borderRadius: RFValue(20),
    marginRight: RFValue(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxtColor: {
    color: '#EF2CA0',
    textAlign: 'center',
    fontFamily: globalFonts.semibold,
    fontSize: RFValue(14),
  },

  atmNumTxt: {
    letterSpacing: 4,
  },
  section: {
    height: RFValue(55),
    borderRadius: RFValue(10),
    width: '94%',
    alignSelf: 'center',
    margin: RFValue(5),
    backgroundColor: globalColors.white,
    flexDirection: 'row',
    padding: 5,
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
    height: RFValue(46),
    borderRadius: RFValue(10),
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  image: {
    flexDirection: 'row',
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deletion: {
    flexDirection: 'row',
    flex: 0.25,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  deleteIcon: { height: RFValue(25), width: RFValue(25) },
  body: {
    flex: 0.6,
    justifyContent: 'center',
  },
  optionName: {
    fontFamily: globalFonts.medium,
    fontSize: 13,
    fontSize: RFValue(14),
  },
  logo: {
    tintColor: globalColors.primaryTheme,
  },
});
