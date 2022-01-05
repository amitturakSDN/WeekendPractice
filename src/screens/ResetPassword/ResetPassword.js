/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { Button } from '@/components/Button';
import { styles } from '@/screens/ResetPassword/ResetPassword.styles';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ImageBackground, Text, View, Pressable } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
import * as Images from './assets';
// import idx from 'idx';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '@/actions/UserActions';
import { mail, lock, login, appicon, logo, backArrow } from '@/assets';
import { globalFonts } from '@/theme/globalFonts';
import { TextField } from '@/components';

export function ResetPassword(props) {
  const [password, setPassword] = useState('');
  const [consfirmPassword, setConfirmPassword] = useState('');

  const { navigation } = props;
  const { colors } = useTheme();
  const dispatch = useDispatch();
  let forgotUserId = useSelector((state) => state.user.forgotUser);
  let passwordResetRequest = useSelector((state) => state.user.passwordResetRequest);

  const submitPressed = () => {
    if (password.length < 8) {
      Toast.show('Password must be of 8 or more characters');
    } else if (consfirmPassword.length < 8) {
      Toast.show('Confirm password must be of 8 or more characters');
    } else if (consfirmPassword != password) {
      Toast.show('Password & confirm password does not match');
    } else {
      dispatch(
        resetPassword({ userId: forgotUserId.data.data._id, newPassword: password }, (cb) => {
          if (cb != false) {
            navigation.navigate('Login');
          }
        })
      );
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      // scrollEnabled={false}
    >
      <ImageBackground source={Images.background} resizeMode="cover" style={styles.backImage}>
        <View style={styles.logoBody}>
          <Image style={styles.logo} source={Images.logo} resizeMode={'contain'} />
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.back}
          >
            <Image style={styles.backImg} source={backArrow} resizeMode={'contain'} />
          </Pressable>
        </View>
        <View style={styles.loginBody}>
          <Text style={styles.resetPassText}>Reset Password</Text>
          <TextField
            label="Password"
            value={password}
            onChangeText={(value) => setPassword(value)}
            icon={true}
            image={lock}
            secure={true}
          />

          <TextField
            label="Confirm Password"
            value={consfirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            icon={true}
            image={lock}
            secure={true}
          />

          <Button
            onPress={() => {
              submitPressed();
            }}
            style={[styles.buttonStyle]}
            textStyle={styles.buttonText}
            title={'Change Password'}
            isLoading={passwordResetRequest}
            disabled={passwordResetRequest}
          />
        </View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}
