/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { getLocationFromInput, registerUser } from '@/actions/UserActions';
import { backArrow, lock, login, logo, mail, settings } from '@/assets';
import { Button, TextField } from '@/components';
import { NAVIGATION } from '@/constants';
import CountryCodes from '@/constants/CountryCodes.json';
import Mobile from '@/screens/ForgetPassword/mobile.json';
import { styles } from '@/screens/Register/Register.styles';
import { FormattedLocation } from '@/test-utils';
import * as regex from '@/test-utils/regex';
import { isEmpty, mobileValidation } from '@/test-utils/validation';
import { globalColors } from '@/theme';
import idx from 'idx';
import React, { useState, useRef } from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SearchModal } from './SearchModal';

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+44');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastname, setLastname] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [cca2, setcca2] = useState('');

  const [pickerVisible, setPickerVisible] = useState(false);

  const { navigation } = props;
  const [loactionModal, setLocationModal] = useState(false);
  const [locationInput, setlocationInput] = useState('');
  const [obtainedLocations, setObtainedLocations] = useState([]);
  const [isFetchingLocations, setFetchingLocations] = useState(false);

  const dispatch = useDispatch();
  let isSignUpRequest = useSelector((state) => state.user.isSignUpRequest);

  const ref_firstName = useRef();
  const ref_lastName = useRef();
  const ref_email = useRef();
  const ref_password = useRef();
  const ref_phone = useRef();
  const ref_city = useRef();
  const ref_state = useRef();
  const ref_country = useRef();

  const selectCountry = (country) => {
    if (country.callingCode.length == 0) {
      setTimeout(() => {
        Toast.show('Please select valid country');
      }, 500);
      return;
    } else {
      setcca2(country.cca2);
      setCountryCode('+' + country.callingCode[0]);
      setPickerVisible(false);
    }
  };
  const submitPressed = async () => {
    if (isEmpty(email)) {
      Toast.show('Email cannot be empty');
      return;
    }
    if (!regex.validateEmail(email)) {
      Toast.show('Please enter a valid email id.');

      return;
    }
    if (password.length < 6) {
      Toast.show('Password must be of 8 or more characters.');
      return;
    }
    if (isEmpty(firstName)) {
      Toast.show('First Name cannot be empty');
      return;
    }
    if (isEmpty(lastname)) {
      Toast.show('Lastname cannot be empty');
      return;
    }

    if (mobile.length == 0) {
      Toast.show('Mobile no. cannot be empty');
      return;
    }
    try {
      var countries = CountryCodes;
      var currentNumber = {};
      countries.forEach((item) => {
        if (item.dial_code === countryCode) {
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
        return;
      } else {
      }
    } catch (error) {
      Toast.show('Mobile no. is invalid');
    }

    let signupObject = {
      email: email,
      username: `${firstName} ${lastname}`,
      mobile: {
        code: countryCode,
        number: mobile,
      },
      password: password,
      role: 4,
      firstName: firstName,
      lastName: lastname,
      city: city,
      state: state,
      country: country,
      address: address,
    };

    dispatch(
      registerUser(signupObject, (cb) => {
        if (cb != false) {
          if (cb.statusCode == 200) {
            navigation.navigate(NAVIGATION.login);
          }
        }
      })
    );
  };

  const handleSearchtextChange = (text) => {
    console.log(text, 'texttexttexttexttext');
    setlocationInput(text);
    if (text.length > 0) {
      setFetchingLocations(true);
      setTimeout(() => {
        hitFetchLocations(text);
      }, 500);
    } else {
      setObtainedLocations([]);
    }
  };

  const hitFetchLocations = (value) => {
    getLocationFromInput(value, (cb) => {
      setFetchingLocations(false);

      if (cb == false) {
        setObtainedLocations([]);
      } else {
        setObtainedLocations(cb);
      }
    });
  };

  const onLocationSelected = async (value) => {
    let valueOutput = await FormattedLocation(value.description);
    let country = idx(valueOutput, (_) => _.country.long_name);
    setObtainedLocations([]);
    setCity(idx(valueOutput, (_) => _.city.long_name));
    setCountry(idx(valueOutput, (_) => _.country.long_name));
    setState(idx(valueOutput, (_) => _.state.long_name));
    setAddress(idx(valueOutput, (_) => _.formattedAddress));
    setLocationModal(false);
    setlocationInput('');
  };

  const mapPressed = async (value) => {
    let valueOutput = await FormattedLocation(value);
    setCity(idx(valueOutput, (_) => _.city.long_name));
    setCountry(idx(valueOutput, (_) => _.country.long_name));
    setState(idx(valueOutput, (_) => _.state.long_name));
    setAddress(idx(valueOutput, (_) => _.formattedAddress));
    setlocationInput(idx(valueOutput, (_) => _.formattedAddress));
  };
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: globalColors.primaryTheme }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      // scrollEnabled={true}
    >
      <ImageBackground style={styles.imgBack} source={login}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: RFValue(30) }}>
          <Image source={logo} style={styles.logoImg} resizeMode="contain" />
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
        <View style={styles.signupView}>
          <Text style={styles.headingText}>Sign up</Text>

          <TextField
            label="First Name"
            placeholder="First Name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            icon={true}
            image={settings}
            ref={ref_firstName}
            onSubmitEditing={() => ref_lastName && ref_lastName.current.focus()}
          />
          <TextField
            label="Last Name"
            placeholder="Last Name"
            value={lastname}
            onChangeText={(text) => setLastname(text)}
            icon={true}
            image={settings}
            onSubmitEditing={() => ref_email.current.focus()}
            forwardedRef={ref_lastName}
            onSubmitEditing={() => ref_email && ref_email.current.focus()}
          />

          <TextField
            label="Email"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            icon={true}
            image={mail}
            keyboardType="email-address"
            onSubmitEditing={() => ref_password.current.focus()}
            forwardedRef={ref_email}
            onSubmitEditing={() => ref_password && ref_password.current.focus()}
          />
          <TextField
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            icon={true}
            image={lock}
            secure={true}
            onSubmitEditing={() => ref_phone.current.focus()}
            forwardedRef={ref_password}
            onSubmitEditing={() => ref_phone && ref_phone.current.focus()}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={styles.countryCode}>
              <Text style={styles.countryCodetext} onPress={() => setPickerVisible(true)}>
                {countryCode}
              </Text>
            </View>
            <TextField
              label="Phone no."
              placeholder="Phone no."
              value={mobile}
              keyboardType="number-pad"
              onChangeText={(text) => {
                setMobile(text);
              }}
              maxLength={10}
              customStyle={styles.phoneStyle}
              onSubmitEditing={() => ref_city.current.focus()}
              forwardedRef={ref_phone}
              onSubmitEditing={() => ref_city && ref_city.current.focus()}
            />
          </View>

          <Pressable
            onPress={() => setLocationModal(true)}
            style={{ zIndex: 1, justifyContent: 'center' }}
          >
            <View
              pointerEvents="none"
              style={{
                justifyContent: 'center',
              }}
            >
              <TextField
                label="Permanent Address"
                placeholder="Permanent Address"
                value={address}
                onChangeText={(text) => setAddress(text)}
                icon={true}
                image={mail}
                disabled={true}
              />
            </View>
          </Pressable>

          <TextField
            label="City"
            placeholder="City"
            value={city}
            onChangeText={(text) => setCity(text)}
            icon={true}
            image={mail}
            onSubmitEditing={() => ref_state.current.focus()}
            forwardedRef={ref_city}
            onSubmitEditing={() => ref_state && ref_state.current.focus()}
          />
          <TextField
            label="State"
            placeholder="State"
            value={state}
            onChangeText={(text) => setState(text)}
            icon={true}
            image={mail}
            onSubmitEditing={() => ref_country.current.focus()}
            ref={ref_state}
            onSubmitEditing={() => ref_country && ref_country.current.focus()}
          />
          <TextField
            label="Country"
            placeholder="Country"
            value={country}
            onChangeText={(text) => setCountry(text)}
            icon={true}
            image={mail}
            forwardedRef={ref_country}
          />
          <View style={{ position: pickerVisible ? 'relative' : 'absolute', bottom: -500 }}>
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

          <Modal
            animationType="slide"
            transparent={true}
            visible={loactionModal}
            onRequestClose={() => {
              setLocationModal(false);
            }}
          >
            <SearchModal
              map={true}
              closeModal={() => {
                setLocationModal(false);
                setObtainedLocations([]);
              }}
              isFetchingLocations={isFetchingLocations}
              obtainedLocations={obtainedLocations}
              label={'Search'}
              map={true}
              onLocationConfirmed={() => {
                setLocationModal(false);
                setObtainedLocations([]);
              }}
              value={locationInput}
              onChangeText={(text) => handleSearchtextChange(text)}
              handleLocationPressed={(item) => onLocationSelected(item)}
              onMapPositionPress={(value) => {
                mapPressed(value);
              }}
            />
          </Modal>

          <Button
            onPress={() => {
              submitPressed();
            }}
            style={[styles.button]}
            textStyle={styles.buttonText}
            title={'Submit'}
            isLoading={isSignUpRequest}
            disabled={isSignUpRequest}
          />
          <View style={styles.alreadyAccountView}>
            <Text style={styles.alreadyAccount}>Already have an account?</Text>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={styles.loginText}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;
