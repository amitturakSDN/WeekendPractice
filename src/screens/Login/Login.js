/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { loginUser } from '@/actions/UserActions';
import { lock, login, logo, mail } from '@/assets';
import { Button, TextField } from '@/components';
import { NAVIGATION } from '@/constants';
import { InitiateNotification } from '@/test-utils/notificationManager';
import * as regex from '@/test-utils/regex';
import { globalColors } from '@/theme';
import React, { useState } from 'react';
import { Image, ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from './Login.styles';
export const Login = (props) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let { navigation } = props;
  const dispatch = useDispatch();
  let loginLoader = useSelector((state) => state.loaders.loading);
  const fcmToken = useSelector((state) => state.user.fcmToken);
  const fcmToken1 = useSelector((state) => state.user);

  const fetchToken = async (response) => {
    await InitiateNotification((fcmToken) => {
      response(fcmToken);
    });
  };

  const submitLogin = () => {
    if (!regex.validateEmail(email)) {
      Toast.show('Please enter a valid email id.');
    } else if (password.length < 6) {
      Toast.show('Password must be of 8 or more characters.');
    } else {
      fetchToken((response) => {
        dispatch(
          loginUser({
            email: email,
            password: password,
            role: 4,
            deviceToken: response,
            deviceType: Platform.OS,
          })
        );
      });
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: globalColors.white }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      scrollEnabled={false}
    >
      <ImageBackground style={styles.imageBack} source={login}>
        <View style={styles.imageBackView}>
          <Image source={logo} style={styles.logoImage} resizeMode="contain" />
        </View>
      </ImageBackground>
      {/* Bottom view */}
      <View style={styles.bottomView}>
        <View style={styles.textInputView}>
          <Text style={styles.signInText}>Sign in</Text>
          <TextField
            label="Email"
            placeholder="Email"
            value={email}
            onChangeText={(value) => setEmail(value)}
            icon={true}
            image={mail}
            autoCapitalize={'none'}
            // keyboardType="email-address"
          />
          <TextField
            placeholder={'Password'}
            label="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            icon={true}
            image={lock}
            secure={true}
          />
          <TouchableOpacity onPress={() => props.navigation.navigate(NAVIGATION.forgetpassword)}>
            <Text style={styles.forgotpass}>Forget Password?</Text>
          </TouchableOpacity>
          <Button
            onPress={() => {
              submitLogin();
            }}
            style={styles.button}
            textStyle={styles.buttonText}
            title={'Sign In'}
            isLoading={loginLoader}
            disabled={loginLoader}
          />
          <View style={styles.signUpView}>
            <Text style={styles.accountText}>Don't have an Account? </Text>
            <TouchableOpacity>
              <Text
                style={styles.signUpText}
                onPress={() => navigation.navigate(NAVIGATION.register)}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View />
    </KeyboardAwareScrollView>
  );
};
export default Login;
