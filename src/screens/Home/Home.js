/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
/* eslint-disable eqeqeq */
import { getActiveChats } from '@/actions/ChatActions';
import {
  addServicesToCart,
  clearCart,
  getServiceList,
  removeServicesFromCart,
} from '@/actions/HomeActions';
import { getMyAddressDetails, getMyInvoices } from '@/actions/ProfileActions';
import { getActiveService } from '@/actions/ScheduleActions';
import { getNotificationList } from '@/actions/UserActions';
import { check, search, sort, uncheck } from '@/assets';
import { GlobalLoader } from '@/components/GlobalLoader';
import SortModal from '@/components/SortModal';
import { NAVIGATION } from '@/constants';
import { styles } from '@/screens/Home/Home.styles';
import { FormattedLocation } from '@/test-utils';
import { BackgroundNotificationManager } from '@/test-utils/notificationManager';
import socket from '@/test-utils/socket';
import { globalColors } from '@/theme';
import Geolocation from '@react-native-community/geolocation';
import { useIsFocused, useTheme } from '@react-navigation/native';
import idx from 'idx';
import { SearchModal } from '../Register/SearchModal';
import { getLocationFromInput, getUserCards } from '@/actions/UserActions';
import * as Images from '@/assets';

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';

export function Home(props) {
  const { colors } = useTheme();
  const isFetchingServiceList = useSelector((state) => state.home.isFetchingServiceList);
  const serviceList = useSelector((state) => state.home.serviceList);
  const selectedServices = useSelector((state) => state.home.selectedServices);
  const dispatch = useDispatch();
  const { navigation } = props;
  const [searchVal, setSearch] = useState('');
  const [ServiceList, setServiceList] = useState([]);
  const [selectedSort, setSelectedSort] = useState(1);
  const [sortModal, setSortModal] = useState(false);
  const isFocused = useIsFocused();
  const [isrefresh, setRefreshing] = useState(false);
  const [zipCode, setZipCode] = useState('');

  const [loactionModal, setLocationModal] = useState(false);
  const [obtainedLocations, setObtainedLocations] = useState([]);
  const [initialRegion, setInitialRegion] = useState('');
  const [isFetchingLocations, setFetchingLocations] = useState(false);
  const [locationInput, setlocationInput] = useState('');

  let userData = useSelector((state) => state.user.user);
  let myEmail = idx(userData, (_) => _.response.data.email);
  let myStripeId = idx(userData, (_) => _.response.data.stripe.customerId);

  let loaderHide = false;
  useEffect(() => {
    notificationRedirection();
    props.navigation.addListener('focus', () => {
      dispatch(clearCart());
    });
    getServices();
    dispatch(
      getUserCards({
        stripeCustomerId: myStripeId,
      })
    );
    dispatch(getNotificationList());
    dispatch(getMyAddressDetails());
    dispatch(
      getMyInvoices({
        pageNum: 0,
        limit: 100,
      })
    );
    getCurrentPosition();

    dispatch(
      getActiveChats({
        pageNum: 0,
        limit: 100,
        status: [1, 2, 3, 4, 5, 6],
      })
    );
    dispatch(
      getActiveService(false, {
        pageNum: 0,
        limit: 100,
        status: [0, 1, 2, 3],
      })
    );

    socket.emit('shareUserInfo', {
      socketId: socket.id,
      email: myEmail,
    });
  }, []);

  const notificationRedirection = () => {
    BackgroundNotificationManager((response) => {
      let newProviderAssign = idx(response, (_) => _.data.notificationType) == 'newProviderAssign';
      let newMessage = idx(response, (_) => _.data.notificationType) == 'newMessage';
      let serviceCancelled = idx(response, (_) => _.data.notificationType) == 'serviceCancelled';
      let paymentSent = idx(response, (_) => _.data.notificationType) == 'paymentSent';
      let serviceStarted = idx(response, (_) => _.data.notificationType) == 'serviceStarted';
      let serviceFinished = idx(response, (_) => _.data.notificationType) == 'serviceFinished';
      dispatch(getNotificationList());

      if (newMessage) {
        let senderId = idx(response, (_) => _.data.id);
        let sendername = idx(response, (_) => _.data.username);
        dispatch(
          getActiveChats({
            pageNum: 0,
            limit: 100,
            status: [1, 2, 3, 4, 5, 6],
          })
        );

        props.navigation.navigate('ChatList', {
          chatDetails: {
            customerData: {
              _id: senderId,
              username: sendername,
            },
          },
        });
      }

      if (newProviderAssign) {
        dispatch(
          getActiveService(false, {
            pageNum: 0,
            limit: 100,
            status: [0, 1, 2, 3],
          })
        );
      }
    });
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (info) => {
        getZipcode(
          idx(info, (_) => _.coords.latitude),
          idx(info, (_) => _.coords.longitude)
        );

        setInitialRegion({
          latitude: idx(info, (_) => _.coords.latitude) || 37.78825,
          longitude: idx(info, (_) => _.coords.longitude) || -122.4324,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      },
      (error) => {
        console.log('Error', JSON.stringify(error));
        // Toast.show(error.message);
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 10000 }
    );
  };
  const getZipcode = async (lat, lng) => {
    let valueOutput = await FormattedLocation({ lat, lng });
    setZipCode(
      idx(valueOutput, (_) => _.postalCode.long_name) ||
        idx(valueOutput, (_) => _.postalCode.short_name)
    );
    getZipCodeServices(
      idx(valueOutput, (_) => _.postalCode.long_name) ||
        idx(valueOutput, (_) => _.postalCode.short_name)
    );
  };
  useEffect(() => {
    console.log('selectedServices', selectedServices);
  }, [isFocused]);

  const onNextPress = () => {
    navigation.navigate(NAVIGATION.serviceRequest);
  };
  const _onRefresh = async () => {
    await setRefreshing(true);
    loaderHide = true;
    await getServices();
    setTimeout(() => {}, 1000);
  };
  const getServices = async (value) => {
    let serviceObj = value
      ? {
          search: value,
          pageNum: 0,
          limit: 100,
          sortBy: 'servicePrice',
          sortValue: 1,
        }
      : {
          pageNum: 0,
          limit: 100,
          sortBy: 'servicePrice',
          sortValue: 1,
        };
    dispatch(
      getServiceList(serviceObj, loaderHide, (cb) => {
        if (cb) setServiceList(cb.data.list);
        setRefreshing(false);
        loaderHide = false;
      })
    );
  };

  const sortList = (value) => {
    let serviceObj = {
      pageNum: 0,
      limit: 100,
      sortBy: 'servicePrice',
      sortValue: value == 1 ? 1 : -1,
    };
    dispatch(
      getServiceList(serviceObj, loaderHide, (cb) => {
        if (cb) setServiceList(cb.data.list);
        loaderHide = false;
      })
    );
  };
  const searchTerm = (value) => {
    setSearch(value);
    getServices(value);
  };
  const renderServiceItems = (item, index) => {
    const serviceDescription = String(idx(item, (_) => _.serviceDesc)).replace(/<(.|\n)*?>/g, '');

    let serviceAlreadySelected = false;
    serviceAlreadySelected = selectedServices.some((value) => item._id === value._id);
    return (
      <View style={styles.serviceItemView} key={index}>
        <View style={{ width: '80%' }}>
          <Text style={styles.serviceName}>{idx(item, (_) => _.serviceName)}</Text>
          <Text style={styles.serviceDesc} numberOfLines={3}>
            {serviceDescription}
          </Text>
          <Text style={styles.servicePrice}>£{idx(item, (_) => _.servicePrice)}</Text>
        </View>
        <View style={[{ width: '15%' }, styles.centerStyles]}>
          <TouchableOpacity
            style={{ padding: RFValue(5) }}
            onPress={() => {
              serviceAlreadySelected
                ? dispatch(removeServicesFromCart(item))
                : dispatch(addServicesToCart(item));
              setServiceList([...serviceList]);
            }}
          >
            <Image
              source={serviceAlreadySelected ? check : uncheck}
              style={styles.checkBox}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const onMapPressed = async (value) => {
    let valueOutput = await FormattedLocation(value);
    setZipCode(
      idx(valueOutput, (_) => _.postalCode.long_name) ||
        idx(valueOutput, (_) => _.postalCode.short_name)
    );
    getZipCodeServices(
      idx(valueOutput, (_) => _.postalCode.long_name) ||
        idx(valueOutput, (_) => _.postalCode.short_name)
    );
    console.log(valueOutput, 'valueOutputvalueOutput');
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

  const onLocationSelected = async (value) => {
    let valueOutput = await FormattedLocation(value.description);

    setZipCode(
      idx(valueOutput, (_) => _.postalCode.long_name) ||
        idx(valueOutput, (_) => _.postalCode.short_name)
    );
    getZipCodeServices(
      idx(valueOutput, (_) => _.postalCode.long_name) ||
        idx(valueOutput, (_) => _.postalCode.short_name)
    );

    setObtainedLocations([]);

    setLocationModal(false);
    setlocationInput('');
  };

  const getZipCodeServices = (zipReceived) => {};

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.zipcode}>
          <Image source={Images.addressImage} style={styles.address} />

          <Text onPress={() => setLocationModal(true)} style={styles.pageHeading}>
            Zip Code: {zipCode}
          </Text>
        </View>
        <Text style={styles.welcomeText}>
          Welcome to {'\n'}
          <Text style={styles.appName}>Tidal Cleaning</Text>
        </Text>

        <View style={styles.searchBarView}>
          <View style={styles.centerStyles}>
            <Image source={search} style={styles.searchIcon} />
          </View>
          <TextInput
            returnKeyType="done"
            maxLength={300}
            value={searchVal}
            onChangeText={(text) => searchTerm(text)}
            placeholder={'Search'}
            placeholderTextColor={globalColors.white}
            style={styles.searchInput}
          />
          <Pressable
            style={styles.centerStyles}
            onPress={() => {
              setSortModal(true);
            }}
          >
            <Image source={sort} style={styles.searchIcon} />
          </Pressable>
        </View>
      </View>
      {isFetchingServiceList ? (
        <GlobalLoader title={'Fetching services...'} />
      ) : (
        <FlatList
          data={ServiceList || []}
          keyExtractor={(item, index) => item && item._id}
          renderItem={({ item, index }) => renderServiceItems(item, index)}
          extraData={selectedServices}
          refreshControl={<RefreshControl refreshing={isrefresh} onRefresh={_onRefresh} />}
        />
      )}

      {selectedServices.length > 0 ? (
        <TouchableOpacity
          style={[styles.nextButton, styles.centerStyles]}
          // onPress={() => onNextPress()}
        >
          <Text style={styles.nextText}>Next({selectedServices.length})</Text>
        </TouchableOpacity>
      ) : null}
      <SortModal
        visibility={sortModal}
        selectedSort={selectedSort}
        setSelected={(value) => {
          setSelectedSort(value);
          sortList(value);
        }}
        close={() => {
          setSortModal(false);
        }}
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
    </View>
  );
}
