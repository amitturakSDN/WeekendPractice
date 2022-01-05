/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { confirmOTP, resendOTP } from '@/actions/UserActions';
import { backArrow, left, login, logo } from '@/assets';
import { Button } from '@/components/index.js';
import { NAVIGATION } from '@/constants';
import { globalColors } from '@/theme';
import { globalFonts } from '@/theme/globalFonts';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import React, { useState, useRef } from 'react';
import { Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';

export const Verification = (props) => {
  const [otp, setOTP] = useState('');
  const otpRef = useRef();
  useEffect(() => {
    otpRef.current.focus();
  }, []);
  let { navigation, route } = props;
  const dispatch = useDispatch();
  let forgotUserId = useSelector((state) => state.user.forgotUser);

  let OTPLoader = useSelector((state) => state.user.isOtpMatchRequest);

  const submitPressed = (otp) => {
    if (otp.length < 7) {
      Toast.show('OTP must be of 7 characters');
      return;
    } else {
      dispatch(
        confirmOTP({ userId: forgotUserId.data.data._id, forgototp: otp }, (cb) => {
          if (cb != false)
            if (cb.statusCode == 200) {
              navigation.navigate(NAVIGATION.reset);
            }
        })
      );
      // navigation.navigate(NAVIGATION.reset);

      // navigation.navigate('ResetPassword');
    }
  };

  const resendOtp = () => {
    let { countryCode, mobile } = route.params;
    dispatch(resendOTP({ countryCode: countryCode, mobileNumber: mobile }, (cb) => {}));
  };
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: globalColors.white }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
    >
      <ImageBackground style={{ height: RFPercentage(67) }} source={login}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: RFValue(70) }}>
          <Image
            source={logo}
            style={{ height: RFPercentage(28), width: RFPercentage(28) }}
            resizeMode="contain"
          />
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
      <View
        style={{
          flex: 1.5,
          backgroundColor: globalColors.white,
          bottom: RFPercentage(20),
          borderTopStartRadius: 40,
          borderTopEndRadius: 40,
        }}
      >
        <View style={{ marginLeft: 35, padding: 10, marginRight: 35, marginTop: 30 }}>
          <Text style={{ fontSize: 26, fontFamily: globalFonts.semibold }}>Verification</Text>
          <Text
            style={{
              marginTop: 11,
              color: '#898186',
              letterSpacing: 0.5,
              fontFamily: globalFonts.regular,
            }}
          >
            Enter Email Id which you register with us we will send you OTP for Verification
          </Text>
          <View
            style={{
              width: '100%',
              borderWidth: 0,
              height: 50,
              justifyContent: 'center',
              marginVertical: RFValue(15),
            }}
          >
            <OTPInputView
              ref={otpRef}
              style={{ width: '100%', height: '20%' }}
              pinCount={7}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad={false}
              codeInputFieldStyle={{
                borderWidth: 0,
                borderBottomWidth: 1,
                color: 'black',
                borderColor: '#EC008C',
                fontSize: RFValue(24),
              }}
              codeInputHighlightStyle={{
                borderColor: '#EC008C',
              }}
              onCodeFilled={(code) => {
                setOTP(code);
                submitPressed(code);
              }}
            />
          </View>
          <Button
            onPress={() => {
              submitPressed(otp);
            }}
            style={[styles.button]}
            textStyle={{ fontSize: RFValue(18), color: 'white', fontFamily: globalFonts.medium }}
            title={'Submit'}
            isLoading={OTPLoader}
            disabled={OTPLoader}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export default Verification;

const styles = StyleSheet.create({
  back: {
    height: RFValue(40),
    width: RFValue(40),
    borderRadius: RFValue(20),
    borderWidth: 0,
    borderColor: 'white',
    margin: RFValue(20),
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#EC008C',
    height: 50,
    width: '100%',
    marginTop: 26,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  backImg: { height: RFValue(30), width: RFValue(30) },
});
