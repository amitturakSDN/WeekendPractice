/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { lock, mail, settings, addressImage } from '@/assets';
import { Button, TextField } from '@/components';
import { Header } from '@/components/header';
import * as regex from '@/test-utils/regex';
import { globalColors } from '@/theme';
import React, { useState, useRef } from 'react';
import { Text, View, Pressable, Modal } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
import { styles } from './EditProfile.styles';
import { updateMyProfile } from '@/actions/ProfileActions';
import { useEffect } from 'react';
import { SearchModal } from '@/screens/Register/SearchModal';
import { getLocationFromInput, changePassword } from '@/actions/UserActions';
import { FormattedLocation } from '@/test-utils';
import idx from 'idx';
import Mobile from '@/screens/ForgetPassword/mobile.json';
import CountryCodes from '@/constants/CountryCodes.json';
import { isEmpty, mobileValidation } from '@/test-utils/validation';
import { useDispatch, useSelector } from 'react-redux';
import { hideTab, showTab } from '@/test-utils/hideBottomTab';

export const EditProfile = (props) => {
  let { navigation, route } = props;
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');

  const [email, setemail] = useState('');

  const [mobile, setmobile] = useState('');

  const [city, setcity] = useState('');

  const [state, setstate] = useState('');
  const [loactionModal, setLocationModal] = useState(false);
  const [locationInput, setlocationInput] = useState('');
  const [obtainedLocations, setObtainedLocations] = useState([]);
  const [address, setAddress] = useState('');

  const [country, setCountry] = useState('');
  const [countryCode, setCountryCode] = useState('+44');
  const [pickerVisible, setPickerVisible] = useState(false);
  const [cca2, setcca2] = useState('');
  const [isFetchingLocations, setFetchingLocations] = useState(false);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  let updatingProfile = useSelector((state) => state.profile.updatingProfile);
  let myDetails = useSelector((state) => state.profile.myadd);
  let allsttate = useSelector((state) => state);
  let changingPass = useSelector((state) => state.user.changingPass);

  const ref_firstName = useRef();
  const ref_lastName = useRef();
  const ref_email = useRef();
  const ref_password = useRef();
  const ref_phone = useRef();
  const ref_city = useRef();
  const ref_state = useRef();
  const ref_country = useRef();

  useEffect(() => {
    hideTab(props);

    setfirstname(myDetails && myDetails.firstName);
    setlastname(myDetails && myDetails.lastName);
    setemail(myDetails && myDetails.email);
    setmobile(myDetails && myDetails.mobile && myDetails.mobile.number);
    setcity(myDetails && myDetails.city);
    setstate(myDetails && myDetails.state);
    setCountry(myDetails && myDetails.country);
    setAddress(myDetails && myDetails.address);
    setCountryCode(myDetails && myDetails.mobile && myDetails.mobile.code);
    return () => {
      showTab(props);
    };
  }, []);

  const onLocationSelected = async (value) => {
    let valueOutput = await FormattedLocation(value.description);
    let country = idx(valueOutput, (_) => _.country.long_name) || null;
    setObtainedLocations([]);
    setcity(idx(valueOutput, (_) => _.city.long_name) || null);
    setCountry(idx(valueOutput, (_) => _.country.long_name) || null);
    setstate(idx(valueOutput, (_) => _.state.long_name) || null);
    setAddress(idx(valueOutput, (_) => _.formattedAddress) || null);
    setLocationModal(false);
    setlocationInput('');
  };

  const mapPressed = async (value) => {
    let valueOutput = await FormattedLocation(value);
    setcity(idx(valueOutput, (_) => _.city.long_name) || null);
    setCountry(idx(valueOutput, (_) => _.country.long_name) || null);
    setstate(idx(valueOutput, (_) => _.state.long_name) || null);
    setAddress(idx(valueOutput, (_) => _.formattedAddress) || null);
  };

  const selectCountry = (country) => {
    if (country && country.callingCode && country.callingCode.length == 0) {
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

  const updateDetails = async () => {
    if (!regex.validateEmail(email)) {
      Toast.show('Please enter a valid email id.');

      return;
    }
    if (isEmpty(firstname)) {
      Toast.show('First Name cannot be empty');
      return;
    }
    if (isEmpty(lastname)) {
      Toast.show('Lastname cannot be empty');
      return;
    }

    if (mobile && mobile.length == 0) {
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
      var mobileLength =
        allMobileNum && allMobileNum[currentNumber] && allMobileNum[currentNumber].length;
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

    let updateObject = {
      id: myDetails._id,
      email: email,
      username: `${firstname} ${lastname}`,
      mobile: {
        code: countryCode,
        number: mobile,
      },
      firstName: firstname,
      lastName: lastname,
      city: city,
      state: state,
      country: country,
      address: address,
    };
    dispatch(updateMyProfile(updateObject));
  };

  const handleSearchtextChange = (text) => {
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

  const changePass = () => {
    if (password.length < 6) {
      Toast.show('Password must be of 8 or more characters.');
    } else if (newPassword.length < 6) {
      Toast.show('New password must be of 8 or more characters.');
    } else if (newPassword != confirmPassword) {
      Toast.show('New password & password must match.');
    } else {
      dispatch(
        changePassword(
          {
            oldPassword: password,
            currentPassword: newPassword,
          },
          props.navigation
        )
      );
    }
  };

  return (
    <>
      <Header title={'Edit Profile'} backEnable navProps={props} />
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: globalColors.white }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}

        // scrollEnabled={true}
      >
        <View style={{ flex: 1, paddingHorizontal: RFPercentage(2), paddingVertical: RFValue(10) }}>
          <TextField
            label="First Name"
            placeholder="First Name"
            value={firstname}
            onChangeText={(text) => setfirstname(text)}
            icon={true}
            image={settings}
            ref={ref_firstName}
            onSubmitEditing={() => ref_lastName && ref_lastName.current.focus()}
          />
          <TextField
            label="Last Name"
            placeholder="Last Name"
            value={lastname}
            onChangeText={(text) => setlastname(text)}
            icon={true}
            image={settings}
            onSubmitEditing={() => ref_phone.current.focus()}
            forwardedRef={ref_lastName}
            onSubmitEditing={() => ref_phone && ref_phone.current.focus()}
          />
          <TextField
            label="Email"
            placeholder="Email"
            value={email}
            onChangeText={(text) => setemail(text)}
            icon={true}
            disabled={true}
            image={mail}
          />
          <View style={styles.countryCodeViw}>
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
              onChangeText={(value) => setmobile(value)}
              customStyle={styles.inputStyle}
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
                value={address}
                onChangeText={(text) => setAddress(text)}
                icon={true}
                image={addressImage}
                disabled={true}
              />
            </View>
          </Pressable>

          <TextField
            label="City"
            placeholder="City"
            value={city}
            onChangeText={(text) => setcity(text)}
            icon={true}
            image={addressImage}
            onSubmitEditing={() => ref_state.current.focus()}
            forwardedRef={ref_city}
            onSubmitEditing={() => ref_state && ref_state.current.focus()}
          />
          <TextField
            label="State"
            placeholder="State"
            value={state}
            onChangeText={(text) => setstate(text)}
            icon={true}
            image={addressImage}
            onSubmitEditing={() => ref_country.current.focus()}
            forwardedRef={ref_state}
            onSubmitEditing={() => ref_country && ref_country.current.focus()}
          />
          <TextField
            label="Country"
            placeholder="Country"
            value={country}
            onChangeText={(text) => setCountry(text)}
            icon={true}
            image={addressImage}
            forwardedRef={ref_country}
          />
          <Button
            onPress={() => {
              updateDetails();
            }}
            style={[styles.button]}
            textStyle={styles.buttonText}
            title={'Update Profile'}
            isLoading={updatingProfile}
            disabled={updatingProfile}
          />

          <TextField
            label="Current password"
            placeholder="Current password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            icon={true}
            image={lock}
            secure={true}
          />
          <TextField
            label="New password"
            placeholder="New password"
            value={newPassword}
            onChangeText={(text) => setNewPassword(text)}
            icon={true}
            image={lock}
            secure={true}
          />
          <TextField
            label="Confirm password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            icon={true}
            image={lock}
            secure={true}
          />

          <Button
            onPress={() => {
              changePass();
            }}
            style={[styles.button]}
            textStyle={styles.buttonText}
            title={'Change Password'}
            isLoading={changingPass}
            disabled={changingPass}
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
        </View>
      </KeyboardAwareScrollView>
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
          onChangeText={(text) => handleSearchtextChange(text)}
          handleLocationPressed={(item) => onLocationSelected(item)}
          onMapPositionPress={(value) => {
            mapPressed(value);
          }}
        />
      </Modal>
    </>
  );
};

const CountryPickermodule = ({
  visible,
  onClose,
  onSelectCountry,
  cca2,
  onOpen,
  countryCode,
  value,
  onChangeText,
}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <View style={styles.countryCode}>
          <Text style={styles.countryCodetext} onPress={onOpen()}>
            {countryCode}
          </Text>
        </View>
        <TextField
          label="Phone no."
          value={value}
          keyboardType="number-pad"
          onChangeText={onChangeText}
          customStyle={styles.inputStyle}
        />
      </View>

      <View style={{ position: visible ? 'relative' : 'absolute', bottom: -500 }}>
        <CountryPicker
          key={visible}
          onSelect={(value) => {
            onSelectCountry(value);
          }}
          onClose={onClose}
          translation="eng"
          cca2={cca2}
          withFilter={true}
          visible={visible}
        >
          <View />
        </CountryPicker>
      </View>
    </>
  );
};
