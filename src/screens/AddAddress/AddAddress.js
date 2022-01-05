/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { setAddAddressDetails, updateAddressDetails } from '@/actions/ProfileActions';
import { getLocationFromInput } from '@/actions/UserActions';
import { Button, TextField } from '@/components';
import { Header } from '@/components/header';
import { NAVIGATION } from '@/constants';
import { FormattedLocation } from '@/test-utils';
import { hideTab, showTab } from '@/test-utils/hideBottomTab';
import { isEmpty } from '@/test-utils/validation';
import { globalColors } from '@/theme';
import idx from 'idx';
import React, { useEffect, useState } from 'react';
import { Modal, PermissionsAndroid, Platform, Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SearchModal } from '../Register/SearchModal';
import { styles } from './AddAddress.styles';
export const AddAddress = (props) => {
  let addingAddress = useSelector((state) => state.profile.isAddingAddress);
  let prefilledDetails = idx(props, (_) => _.route.params.prefilledDetails);

  const prefiledFields = () => {
    if (prefilledDetails) {
      setName(prefilledDetails && prefilledDetails.name);
      setCity(prefilledDetails && prefilledDetails.city);
      setCountry(prefilledDetails && prefilledDetails.country);
      setState(prefilledDetails && prefilledDetails.state);
      setPost(prefilledDetails && prefilledDetails.pincode);
      setAddress(prefilledDetails && prefilledDetails.streetAddress);
      setHouseNumber(prefilledDetails && prefilledDetails.houseNo);
      setInitialRegion({
        latitude: prefilledDetails && prefilledDetails.lat,
        longitude: prefilledDetails && prefilledDetails.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    }
  };
  useEffect(() => {
    prefiledFields();
    hideTab(props);
  }, []);

  const dispatch = useDispatch();
  let { navigation } = props;

  const [loactionModal, setLocationModal] = useState(false);
  const [locationInput, setlocationInput] = useState('');
  const [obtainedLocations, setObtainedLocations] = useState([]);
  const [isFetchingLocations, setFetchingLocations] = useState(false);
  const [initialRegion, setInitialRegion] = useState('');

  const [name, setName] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPost] = useState('');

  const checkMapPress = async (value) => {
    let serviceAvailable = await getCountry({ lat: value.latitude, lng: value.longitude });

    if (serviceAvailable) {
      onMapPositionPress(value);
    } else {
      Toast.show('Service not currently available at your location.');
    }
  };

  // const checkAndroidPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: 'TidalWave App',
  //         message: 'TidalWave App access to your location ',
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the location');
  //       return true;
  //     } else {
  //       console.log('location permission denied');
  //       alert('Location permission denied');
  //       return false;
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //     return false;
  //   }
  // };
  // const getCurrentUserLocation = async () => {
  //   if (Platform.OS == 'android') {
  //     let permissions = await checkAndroidPermission();
  //     if (permissions) {
  //       // getLocation();
  //     } else {
  //       Toast.show('Unable to fetch locations');
  //     }
  //   } else {
  //     // getLocation();
  //   }
  // };

  // useEffect(() => {
  //   // getCurrentUserLocation();
  // }, []);

  // const fetchAddress = async (value) => {
  //   let valueOutput = await FormattedLocation({
  //     latitude: idx(value, (_) => _.coords.latitude),
  //     longitude: idx(value, (_) => _.coords.longitude),
  //   });
  //   console.log('valueOutput', valueOutput);
  //   setAddAddress({
  //     ...addAddress,

  //     city: idx(valueOutput, (_) => _.city.long_name),
  //     country: idx(valueOutput, (_) => _.country.long_name),
  //     state: idx(valueOutput, (_) => _.state.long_name),
  //     address: idx(valueOutput, (_) => _.formattedAddress),
  //     postalCode: idx(valueOutput, (_) => _.postalCode.long_name),
  //   });
  // };
  // const handleConfirm = (date) => {
  //   console.log('A date has been picked: ', date);
  //   setAddAddress({ ...addAddress, datePicked: '' + date });
  //   hideDatePicker();
  // };

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

  const onLocationSelected = async (value) => {
    let valueOutput = await FormattedLocation(value.description);

    setObtainedLocations([]);
    setCity(idx(valueOutput, (_) => _.city.long_name) || null);
    setCountry(idx(valueOutput, (_) => _.country.long_name)) || null;

    setState(idx(valueOutput, (_) => _.state.long_name) || null);
    setPost(idx(valueOutput, (_) => _.postalCode.long_name) || null);
    setAddress(idx(valueOutput, (_) => _.formattedAddress) || null);
    setInitialRegion({
      latitude: idx(valueOutput, (_) => _.latitude),
      longitude: idx(valueOutput, (_) => _.longitude),
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });

    setLocationModal(false);
    setlocationInput('');
  };

  const onMapPressed = async (value) => {
    let valueOutput = await FormattedLocation(value);
    setCity(idx(valueOutput, (_) => _.city.long_name) || null);
    setCountry(idx(valueOutput, (_) => _.country.long_name) || null);

    setState(idx(valueOutput, (_) => _.state.long_name) || null);
    setPost(idx(valueOutput, (_) => _.postalCode.long_name) || null);
    setAddress(idx(valueOutput, (_) => _.formattedAddress.long_name) || null);
    setlocationInput(idx(valueOutput, (_) => _.formattedAddress) || null);

    setInitialRegion({
      latitude: idx(value, (_) => _.latitude),
      longitude: idx(value, (_) => _.longitude),
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  const validateAddressDetails = () => {
    if (isEmpty(name)) {
      Toast.show('Location name cannot be empty');
    } else if (isEmpty(houseNumber)) {
      Toast.show('House Number cannot be empty');
    } else if (isEmpty(address)) {
      Toast.show('Address cannot be empty');
      return;
    } else if (isEmpty(city)) {
      Toast.show('City cannot be empty');
      return;
    } else if (isEmpty(state)) {
      Toast.show('State cannot be empty');
      return;
    } else if (isEmpty(country)) {
      Toast.show('Cuntry cannot be empty');
      return;
    } else if (isEmpty(postalCode)) {
      Toast.show('postal code cannot be empty');
      return;
    }
    let addressDetails = {
      customerAddress: [
        {
          name: name,
          houseNo: houseNumber,
          streetAddress: address,
          city: city,
          state: state,
          country: country,
          pincode: postalCode,
          lat: `${idx(initialRegion, (_) => _.latitude)}`,
          lng: `${idx(initialRegion, (_) => _.longitude)}`,
        },
      ],
    };

    let updateAddressData = {
      customerAddressId: prefilledDetails && prefilledDetails._id,
      name: name,
      houseNo: houseNumber,
      streetAddress: address,
      city: city,
      state: state,
      country: country,
      pincode: postalCode,
      lat: `${idx(initialRegion, (_) => _.latitude)}`,
      lng: `${idx(initialRegion, (_) => _.longitude)}`,
    };

    if (prefilledDetails) {
      dispatch(updateAddressDetails(updateAddressData));
      navigation.goBack();
    } else {
      dispatch(setAddAddressDetails(addressDetails));
      navigation.goBack();
    }
  };

  return (
    <>
      <Header
        title={prefilledDetails ? 'Update Address' : 'Add Address'}
        backEnable
        navProps={props}
      />
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: globalColors.white }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        // scrollEnabled={true}
      >
        <View style={{ flex: 1, paddingHorizontal: RFPercentage(2), paddingVertical: RFValue(10) }}>
          <TextField
            label=" Location Name"
            onChangeText={(text) => setName(text)}
            placeHolder={'Location Name'}
            value={name}
          />
          <TextField
            label=" House Number"
            onChangeText={(text) => setHouseNumber(text)}
            placeHolder={'House Number'}
            value={houseNumber}
          />
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
                value={address}
                label=" Street Address"
                onChangeText={(text) => setAddress(text)}
                placeHolder={'Street Address'}
              />
            </View>
          </Pressable>
          <TextField
            label=" City"
            value={city}
            onChangeText={(text) => setCity(text)}
            placeHolder={'City'}
          />
          <TextField
            value={state}
            label=" State"
            onChangeText={(text) => setState(text)}
            placeHolder={'State'}
          />
          <TextField
            value={country}
            label=" Country"
            onChangeText={(text) => setCountry(text)}
            placeHolder={'Country'}
          />
          <TextField
            label=" Pincode"
            value={postalCode}
            onChangeText={(text) => setPost(text)}
            placeHolder={'Pincode'}
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
                checkMapPress(value);
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
          <Button
            onPress={() => {
              validateAddressDetails();
            }}
            style={[styles.button]}
            textStyle={styles.buttonText}
            title={prefilledDetails ? 'Update' : 'Add'}
            isLoading={false}
            disabled={false}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
