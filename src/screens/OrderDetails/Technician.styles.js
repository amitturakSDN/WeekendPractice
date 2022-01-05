import { globalColors, globalFonts } from '@/theme';
import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    margin: RFValue(10),
  },
  header: {
    fontSize: RFValue(18),
    fontFamily: globalFonts.semibold,
  },
  child: {
    height: RFValue(80),
    borderRadius: RFValue(15),
    backgroundColor: globalColors.white,
    alignSelf: 'center',
    marginVertical: RFValue(5),
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: RFValue(3),
  },
  img: { flex: 0.25, justifyContent: 'center', alignItems: 'center' },
  chat: { flex: 0.2, justifyContent: 'center', alignItems: 'center' },
  body: { justifyContent: 'center', flex: 0.55 },
  circle: {
    borderRadius: RFValue(200),
    borderWidth: 3,
    borderColor: globalColors.lightPrimary,
    overflow: 'hidden',
    height: RFValue(45),
    width: RFValue(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    height: RFValue(40),
    width: RFValue(40),
    borderRadius: RFValue(200),
    borderWidth: RFValue(2),
    borderColor: globalColors.primaryTheme,
  },
  subHeader: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.regular,
    color: globalColors.grey,
  },
  callicon: {
    height: RFValue(20),
    width: RFValue(20),
  },
});
