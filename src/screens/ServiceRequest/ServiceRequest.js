/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Modal,
  Pressable,
  PermissionsAndroid,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRef } from 'react';
import idx from 'idx';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-simple-toast';
import { SearchModal } from '../Register/SearchModal';
import { styles } from '@/screens/ServiceRequest/ServiceRequest.styles';
import { backArrow, check, mail, phone, calendar, settings, loc_pin } from '@/assets';
import { globalColors, globalFonts } from '@/theme';
import { TextField, Button } from '@/components';
import { DropDown } from '@/components/DropDown';
import { NAVIGATION } from '@/constants';
import { FormattedLocation } from '@/test-utils';
import { setServiceDetails } from '@/actions/HomeActions';
import { selectedAddress } from '@/actions/ProfileActions';
const gpkey = 'AIzaSyDJeiY4o2jQZU3iotCoprhoftLlZkg0VHU';
import moment from 'moment';
import { isEmpty } from '@/test-utils/validation';
import { getLocationFromInput } from '@/actions/UserActions';
import { Header } from '@/components/header';
import { Appearance } from 'react-native-appearance';
const colorScheme = Appearance.getColorScheme();
const isDarkModeEnabled = colorScheme === 'dark';

export function ServiceRequest(props) {
  // const [customerDetail, setCustomerDetail] = useState({
  //   name: '',
  //   email: '',
  //   phoneNo: '',
  //   datePicked: '',
  //   city: '',
  //   state: '',
  //   country: '',
  //   address: '',
  // });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [datePicked, setDatePicked] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const dispatch = useDispatch();
  const selectedServices = useSelector((state) => state.home.selectedServices);
  const savedAddress = useSelector((state) => state.profile.savedAddress);

  let { navigation } = props;
  const pickerRef = useRef();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loactionModal, setLocationModal] = useState(false);
  const [locationInput, setlocationInput] = useState('');
  const [obtainedLocations, setObtainedLocations] = useState([]);
  const [isFetchingLocations, setFetchingLocations] = useState(false);
  const [initialRegion, setInitialRegion] = useState('');

  useEffect(() => {
    setCity(idx(savedAddress, (_) => _.city));
    setCountry(idx(savedAddress, (_) => _.country));
    setState(idx(savedAddress, (_) => _.state));
    setAddress(idx(savedAddress, (_) => _.streetAddress));
    setInitialRegion({
      latitude: Number(idx(savedAddress, (_) => _.lat)),
      longitude: Number(idx(savedAddress, (_) => _.lng)),
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  }, [savedAddress]);

  // let { name, email, phoneNo, datePicked, address, city, state, country } = customerDetail;
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const checkAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'TidalWave App',
          message: 'TidalWave App access to your location ',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        alert('Location permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const getCurrentUserLocation = async () => {
    if (Platform.OS == 'android') {
      let permissions = await checkAndroidPermission();
      if (permissions) {
        // getLocation();
      } else {
        Toast.show('Unable to fetch locations');
      }
    } else {
      // getLocation();
    }
  };

  const getLocation = async () => {
    Geolocation.getCurrentPosition(
      (info) => {
        setInitialRegion({
          latitude: idx(info, (_) => _.coords.latitude) || 37.78825,
          longitude: idx(info, (_) => _.coords.longitude) || -122.4324,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
        fetchAddress(info);
      },
      (error) => {
        Toast.show(error.message);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    );
  };
  useEffect(() => {
    getCurrentUserLocation();
  }, []);
  const fetchAddress = async (value) => {
    let valueOutput = await FormattedLocation({
      latitude: idx(value, (_) => _.coords.latitude),
      longitude: idx(value, (_) => _.coords.longitude),
    });
    setCity(idx(valueOutput, (_) => _.city.long_name));
    setCountry(idx(valueOutput, (_) => _.country.long_name));
    setState(idx(valueOutput, (_) => _.state.long_name));
    setAddress(idx(valueOutput, (_) => _.formattedAddress));
    setPostalCode(idx(valueOutput, (_) => _.postalCode.long_name) || null);

    // setCustomerDetail({
    //   ...customerDetail,
    //   city: idx(valueOutput, (_) => _.city.long_name),
    //   country: idx(valueOutput, (_) => _.country.long_name),
    //   state: idx(valueOutput, (_) => _.state.long_name),
    //   address: idx(valueOutput, (_) => _.formattedAddress),
    // });
  };
  const handleConfirm = (date) => {
    // setCustomerDetail({ ...customerDetail, datePicked: '' + date });
    setDatePicked('' + date);
    hideDatePicker();
  };

  const handleSearchtextChange = (text) => {
    setlocationInput(text);
    if (text && text.length > 0) {
      setFetchingLocations(true);
      setTimeout(() => {
        hitFetchLocations(text);
      }, 500);
    } else {
      setObtainedLocations([]);
    }
  };

  const hitFetchLocations = async (value) => {
    getLocationFromInput(value, (cb) => {
      setFetchingLocations(false);

      if (cb == false) {
        setObtainedLocations([]);
      } else {
        setObtainedLocations(cb);
      }
    });
  };

  // const getCountry = async (description) => {
  //   let valueOutput = await FormattedLocation(description);
  //   let countryCode = valueOutput && valueOutput.country && valueOutput.country.short_name;
  //   if (countryCode == 'UK' || countryCode == 'GB' || countryCode == 'AU' || countryCode == 'AUS') {
  //     return true;
  //   }
  //   return false;
  // };

  // const checkMapPress = async (value) => {
  //   let serviceAvailable = await getCountry({ lat: value.latitude, lng: value.longitude });
  //   console.log(serviceAvailable, 'COLEOEOEE');

  //   if (serviceAvailable) {
  //     onMapPositionPress(value);
  //   } else {
  //     Toast.show('Service not currently available at your location.');
  //   }
  // };

  const onLocationSelected = async (value) => {
    let valueOutput = await FormattedLocation(value.description);
    setObtainedLocations([]);
    setCity(idx(valueOutput, (_) => _.city.long_name) || null);
    setCountry(idx(valueOutput, (_) => _.country.long_name) || null);
    setState(idx(valueOutput, (_) => _.state.long_name) || null);
    setAddress(idx(valueOutput, (_) => _.formattedAddress) || null);
    setPostalCode(idx(valueOutput, (_) => _.postalCode.long_name) || null);
    setInitialRegion({
      latitude: idx(valueOutput, (_) => _.latitude),
      longitude: idx(valueOutput, (_) => _.longitude),
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });

    setLocationModal(false);
    setlocationInput('');
  };
  const renderSelectedServices = (item, index) => {
    const serviceDescription = String(idx(item, (_) => _.serviceDesc)).replace(/<(.|\n)*?>/g, '');

    return (
      <View style={styles.serviceItemView} key={index}>
        <View style={{ width: '80%' }}>
          <Text style={styles.serviceName}>{idx(item, (_) => _.serviceName)}</Text>
          <Text style={styles.serviceDesc}>{serviceDescription}</Text>
          <Text style={styles.servicePrice}>£{idx(item, (_) => _.servicePrice)}</Text>
        </View>
        <View style={[{ width: '15%' }, styles.centerStyles]}>
          <TouchableOpacity style={{ padding: RFValue(5) }} disabled={true}>
            <Image source={check} style={styles.checkBox} resizeMode="contain" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const onMapPressed = async (value) => {
    let valueOutput = await FormattedLocation(value);

    setCity(idx(valueOutput, (_) => _.city.long_name) || null);
    setCountry(idx(valueOutput, (_) => _.country.long_name) || null);
    setState(idx(valueOutput, (_) => _.state.long_name) || null);
    setAddress(idx(valueOutput, (_) => _.formattedAddress) || null);

    setlocationInput(idx(valueOutput, (_) => _.formattedAddress) || null);
    setInitialRegion({
      latitude: idx(value, (_) => _.latitude),
      longitude: idx(value, (_) => _.longitude),
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };
  const validateServiceDetails = () => {
    let serviceDetails = {
      address: address,
      city: city,
      state: state,
      country: country,
      serviceDateTime: datePicked,
      lat: idx(initialRegion, (_) => _.latitude),
      lng: idx(initialRegion, (_) => _.longitude),
      postalCode: postalCode,
    };

    if (isEmpty(postalCode)) {
      Toast.show('Postal code cannot be empty');
      return;
    }

    if (isEmpty(address)) {
      Toast.show('Address cannot be empty');
      return;
    }
    if (isEmpty(city)) {
      Toast.show('City cannot be empty');
      return;
    }
    if (isEmpty(state)) {
      Toast.show('State cannot be empty');
      return;
    }
    if (isEmpty(country)) {
      Toast.show('Cuntry cannot be empty');
      return;
    }
    if (isEmpty(datePicked)) {
      Toast.show('Please select valid Service Date');
      return;
    }

    dispatch(setServiceDetails(serviceDetails));
    navigation.navigate(NAVIGATION.serviceQuestion);
  };
  return (
    <View style={styles.container}>
      <Header title={'Request for Service'} backEnable navProps={props} />
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: globalColors.white }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={true}
      >
        <View style={{ paddingHorizontal: RFPercentage(3), flex: 1, paddingVertical: RFValue(10) }}>
          <Text style={styles.heading}>Service Detail</Text>
          {selectedServices.map((item, i) => renderSelectedServices(item, i))}

          <Text style={styles.heading}>Customer Detail</Text>

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
                label="Select new address"
                placeHolder={'Select new address'}
                value={address}
                onChangeText={(text) => setAddress(text)}
                icon={true}
                image={loc_pin}
                customStyle={styles.textInput}
              />
            </View>
          </Pressable>
          <Text
            onPress={() => {
              dispatch(selectedAddress(null));

              navigation.navigate(NAVIGATION.myAddress, { fromRequest: true });
            }}
            style={styles.savedAdd}
          >
            Select saved address
          </Text>

          <TextField
            label="Postal Code"
            placeHolder={'Postal Code'}
            value={postalCode}
            onChangeText={(text) => setPostalCode(text)}
            icon={true}
            image={loc_pin}
            customStyle={styles.textInput}
          />

          <TextField
            label="City"
            placeHolder={'City'}
            value={city}
            onChangeText={(text) => setCity(text)}
            icon={true}
            image={loc_pin}
            customStyle={styles.textInput}
          />
          <TextField
            label="State"
            placeHolder={'State'}
            value={state}
            onChangeText={(text) => setState(text)}
            icon={true}
            image={loc_pin}
            customStyle={styles.textInput}
          />
          <TextField
            label="Country"
            placeHolder={'Country'}
            value={country}
            onChangeText={(text) => setCountry(text)}
            icon={true}
            image={loc_pin}
            customStyle={styles.textInput}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={loactionModal}
            onRequestClose={() => {
              setLocationModal(false);
            }}
          >
            <SearchModal
              closeModal={() => {
                setLocationModal(false);
                setObtainedLocations([]);
              }}
              onMapPositionPress={(value) => {
                onMapPressed(value);
                // checkMapPress(value);
              }}
              updatedCoordinates={(values) => {}}
              region={initialRegion}
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
            />
          </Modal>
          <TouchableOpacity
            style={[styles.dateTime, styles.textInput]}
            onPress={() => {
              setDatePickerVisibility(true);
            }}
          >
            <View style={[{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }]}>
              <Image
                style={{ height: RFValue(15), width: RFValue(15) }}
                resizeMode="contain"
                source={calendar}
              />
            </View>
            <View style={{ flex: 0.8, justifyContent: 'center' }}>
              <Text style={styles.dateText}>
                {datePicked != ''
                  ? moment(datePicked).format('DD-MM-YYYY HH:mm a')
                  : 'Pick a service Date'}
              </Text>
            </View>
            <View style={{ flex: 0.1 }} />
          </TouchableOpacity>
          <Button
            style={[styles.button]}
            textStyle={styles.buttonText}
            title={'Submit'}
            onPress={() => validateServiceDetails()}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
            isDarkModeEnabled={isDarkModeEnabled}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
