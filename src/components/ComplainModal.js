// import {colors, fonts, moderateScale} from 'constants/common/theme';
import * as Images from '@/assets';
import { globalColors, globalFonts } from '@/theme';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { Button } from '@/components';
import Toast from 'react-native-simple-toast';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
const ComplainModal = (props) => {
  const { visibility, confirm, cancel, title, otpIs } = props;
  const [otp, setOtp] = useState(null);
  const [comment, setComment] = useState(null);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibility}
      onRequestClose={() => null}
    >
      <View style={styles.body}>
        <TouchableOpacity onPress={cancel} style={styles.dark} />
        <View style={styles.mainBody}>
          <View style={styles.modal}>
            <View style={styles.icon}>
              <Text style={styles.font}>Please enter your complain below.</Text>
            </View>
            <View style={styles.title}>
              <TextInput style={styles.input} onChangeText={setComment} value={comment} multiline />
            </View>
            <View style={styles.buttonCont}>
              <Button
                onPress={() => {
                  if (comment.length > 10) {
                    confirm(comment);
                  } else {
                    Toast.show('Please describe your complain in more detail.');
                  }
                }}
                style={styles.buttonstyle}
                textStyle={styles.buttonText}
                title={'Submit'}
                // isLoading={loginLoader}
                // disabled={loginLoader}
              />
            </View>
            {/* <Button
              onPress={() => confirm()}
              style={styles.buttonstyle}
              textStyle={styles.buttonText}
              title={'Submit'}
              // isLoading={loginLoader}
              // disabled={loginLoader}
            /> */}
          </View>
        </View>

        <TouchableOpacity onPress={cancel} style={styles.dark} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonstyle: {
    backgroundColor: globalColors.lightPrimary,
    height: RFValue(40),
    borderRadius: RFValue(10),
    borderWidth: 0,
    alignSelf: 'center',
    width: '100%',
  },
  buttonCont: {
    flex: 0.25,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: RFValue(18),
    color: globalColors.primaryTheme,
    fontFamily: globalFonts.medium,
  },
  font: {
    fontSize: RFValue(14),
    fontFamily: globalFonts.regular,
    textAlign: 'center',
  },
  input: {
    backgroundColor: globalColors.whiteGrey,
    width: RFValue(25),
    height: '90%',
    borderRadius: RFValue(10),
    width: '100%',
    padding: RFValue(10),
  },
  info: {
    height: RFValue(25),
  },
  title: {
    flex: 0.5,
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
    height: RFValue(220),
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
export default ComplainModal;
