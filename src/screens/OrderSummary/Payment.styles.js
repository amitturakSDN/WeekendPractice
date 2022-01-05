import React from 'react';
import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { globalColors, globalFonts } from '@/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    // marginHorizontal: RFPercentage(5),
    flex: 0.5,
    padding: RFValue(5),
    backgroundColor: globalColors.white,
    shadowColor: globalColors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
  },
  heading: {
    marginHorizontal: RFPercentage(1),
    borderWidth: 0,
    marginVertical: RFValue(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(15),
    backgroundColor: globalColors.whiteGrey,
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
  },
  headingText: {
    color: globalColors.black,
    fontFamily: globalFonts.semibold,
    fontSize: RFValue(16),
  },
  cardItemView: {
    paddingVertical: RFValue(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: RFPercentage(1),
  },
  leftCardView: {
    width: '85%',
    flexDirection: 'row',
    borderWidth: 0,
    paddingVertical: RFValue(5),
    alignItems: 'center',
  },
  rightCardView: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: RFValue(5),
    borderWidth: 0,
  },
  cardImage: {
    height: RFValue(30),
    width: RFValue(50),
  },
  cardNum: {
    width: '70%',
    marginLeft: RFValue(10),
    borderWidth: 0,
    fontSize: RFValue(13),
    color: globalColors.black,
    fontFamily: globalFonts.semibold,
  },
  radioButton: {
    height: RFValue(20),
    width: RFValue(20),
  },
  button: {
    backgroundColor: '#EC008C',
    height: RFValue(45),
    width: '90%',
    alignSelf: 'center',
    marginTop: RFValue(20),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RFValue(10),
    marginBottom: RFValue(10),
  },
  buttonText: { fontSize: RFValue(18), color: globalColors.white, fontFamily: globalFonts.medium },
});
