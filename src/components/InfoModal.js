// import {colors, fonts, moderateScale} from 'constants/common/theme';
import * as Images from '@/assets';
import { globalColors, globalFonts } from '@/theme';
import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
const InfoModal = (props) => {
  const { visibility, confirm, cancel, title, otpIs } = props;
  const [otp, setOtp] = useState(null);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibility}
      onRequestClose={() => null}
    >
      <View style={styles.body}>
        <TouchableOpacity onPress={cancel} style={styles.dark} />
        <Pressable onPress={cancel} style={styles.mainBody}>
          <View style={styles.modal}>
            <View style={styles.icon}>
              <Image style={styles.info} source={Images.info} resizeMode={'contain'} />
            </View>
            <View style={styles.title}>
              <Text style={styles.font}>
                This application tracks your location while app is in use to provide the details to
                the service provider/customer you are assigned to.{' '}
              </Text>
            </View>
          </View>
        </Pressable>

        <TouchableOpacity onPress={cancel} style={styles.dark} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  font: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.regular,
    textAlign: 'center',
  },
  info: { height: RFValue(25), width: RFValue(25) },
  title: {
    flex: 0.7,
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: '#0009',
  },
  mainBody: { flex: 0.3 },
  icon: {
    flex: 0.25,
    borderBottomWidth: 0.5,
    borderBottomColor: globalColors.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: RFValue(180),
    width: RFPercentage(40),
    borderRadius: 10,
    backgroundColor: globalColors.white,
    borderWidth: 2,
    borderColor: 'white',
    alignSelf: 'center',
    padding: RFValue(15),
  },

  dark: { flex: 0.35 },
});
export default InfoModal;
