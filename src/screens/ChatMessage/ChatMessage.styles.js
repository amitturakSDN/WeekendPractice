import { StyleSheet } from 'react-native';
import { globalColors, globalFonts, spacing } from '@/theme';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  leftWrapper: {
    backgroundColor: globalColors.white,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: RFValue(100),
    borderBottomRightRadius: RFValue(100),
    borderTopLeftRadius: RFValue(30),
    padding: RFValue(10),
    marginBottom: RFValue(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rightWrapper: {
    backgroundColor: globalColors.blacktext,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: RFValue(100),
    borderBottomLeftRadius: RFValue(100),
    borderTopRightRadius: RFValue(30),
    marginBottom: RFValue(12),

    padding: RFValue(10),
  },
  rightContainer: {
    paddingBottom: RFValue(10),
  },
  leftContainer: {
    paddingBottom: RFValue(10),
  },
  leftTime: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.regular,
  },
  rightTime: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.regular,
  },
  send: {
    height: RFValue(40),
    width: RFValue(60),
    justifyContent: 'center',
    alignItems: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    height: RFValue(40),
    width: RFValue(40),
    borderRadius: RFValue(10),
    backgroundColor: globalColors.primaryTheme,
    borderRadius: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  clip: {
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: RFValue(15),
  },
  noChat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scaleY: -1 }],
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputCont: {
    alignSelf: 'center',
    height: RFValue(45),
    width: '100%',
    borderTopWidth: 0,
  },
  noCHatTxt: {
    fontSize: RFValue(18),
    color: globalColors.primaryTheme,
    fontFamily: globalFonts.semibold,
  },
  customInput: {
    height: RFValue(50),
    borderRadius: RFValue(10),
    width: '95%',
    alignSelf: 'center',
    bottom: RFValue(20),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: globalColors.white,

    borderWidth: 0.5,
    borderColor: globalColors.lightGrey,
  },
  sendImg: { tintColor: 'white', height: RFValue(18), width: RFValue(18) },
  noCHatTxt: {
    fontSize: RFValue(18),
    color: globalColors.primaryTheme,
    fontFamily: globalFonts.semibold,
  },
  noChatTxt: {
    fontFamily: globalFonts.regular,
    fontSize: RFValue(15),
    color: globalColors.primaryTheme,
  },
});
