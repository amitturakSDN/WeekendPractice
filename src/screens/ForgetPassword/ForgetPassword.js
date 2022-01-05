/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import CountryPicker from 'react-native-country-picker-modal';
import { NAVIGATION } from '@/constants';
import { mail, lock, login, appicon, left, logo, backArrow } from '@/assets';
import Mobile from './mobile.json';
import CountryCodes from './CountryCodes.json';
import Toast from 'react-native-simple-toast';
import { spacing, globalColors } from '@/theme/index.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { mobileValidation } from '@/test-utils/validation.js';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '@/actions/UserActions.js';
import { Button, TextField } from '@/components/index.js';
import { globalFonts } from '@/theme/globalFonts';
import { styles } from './ForgotPassword.styles.js';

export const ForgetPassword = (props) => {
  const [mobile, setMobile] = useState('');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [callingCode, setCallingCode] = useState('+91');
  const [cca2, setcca2] = useState('');
  let { navigation } = props;
  const dispatch = useDispatch();
  let forgotLoader = useSelector((state) => state.user.isForgotRequest);
  const submitPressed = async () => {
    if (mobile.length == 0) {
      Toast.show('Mobile no. cannot be empty');
      return;
    }
    try {
      var countries = CountryCodes;
      var currentNumber = {};
      countries.forEach((item) => {
        if (item.dial_code === callingCode) {
          currentNumber = item.code;
        }
      });
      var allMobileNum = Mobile;
      var mobileLength = allMobileNum[currentNumber].length;
      const mobileErrorCheck = await mobileValidation({
        phone: mobile,
        mobileLength: mobileLength,
      });
      if (mobileErrorCheck.mobileError) {
        Toast.show(mobileErrorCheck.mobileErrorMsg);
      } else {
        dispatch(
          forgotPassword({ countryCode: callingCode, mobileNumber: mobile }, (cb) => {
            if (cb != false) {
              if (cb.statusCode == 200) {
                navigation.navigate(NAVIGATION.verification, {
                  mobile: mobile,
                  countryCode: callingCode,
                });
              }
            }
          })
        );
      }
    } catch (error) {
      Toast.show('Mobile no. is invalid');
    }
  };
  const selectCountry = (country) => {
    if (country.callingCode.length == 0) {
      setTimeout(() => {
        Toast.show('Please select valid country');
      }, 500);
      return;
    } else {
      setcca2(country.cca2);
      setCallingCode('+' + country.callingCode[0]);
      setPickerVisible(false);
    }
  };
  //props.navigation.navigate(NAVIGATION.verification)

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: globalColors.white }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
    >
      <ImageBackground style={styles.imageBack} source={login}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: RFValue(70) }}>
          <Image source={logo} style={styles.backLogo} resizeMode="contain" />
        </View>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.back}
        >
          <Image style={styles.backImg} source={backArrow} resizeMode={'contain'} />
        </Pressable>
      </ImageBackground>

      {/* Bottom view */}
      <View style={styles.bottomView}>
        <View style={styles.forgotText}>
          <Text style={styles.headingText}>Forgot Password?</Text>
          <Text style={styles.subHeading}>
            Enter Mobile number which you register with us we will send you OTP for Verification
          </Text>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <View style={styles.countryCode}>
              <Text style={{ fontSize: RFValue(13) }} onPress={() => setPickerVisible(true)}>
                {callingCode}
              </Text>
            </View>
            <TextField
              label="Registered phone no."
              placeHolder={"Registered phone no."}

              value={mobile}
              onChangeText={(text) => {
                setMobile(text);
              }}
              icon={false}
              keyboardType={'number-pad'}
              customStyle={styles.inputStyle}
            />
          </View>
          <Button
            onPress={() => {
              submitPressed();
            }}
            style={[styles.button]}
            textStyle={styles.buttontext}
            title={'Submit'}
            isLoading={forgotLoader}
            disabled={forgotLoader}
          />
        </View>
      </View>
      <View style={{ position: pickerVisible ? 'relative' : 'absolute', bottom: -50 }}>
        <CountryPicker
          key={pickerVisible}
          onSelect={(value) => {
            selectCountry(value);
          }}
          onClose={() => setPickerVisible(false)}
          translation="eng"
          cca2={cca2}
          withFilter={true}
          visible={pickerVisible}
        >
          <View />
        </CountryPicker>
      </View>
      <View />
    </KeyboardAwareScrollView>
  );
};
export default ForgetPassword;
