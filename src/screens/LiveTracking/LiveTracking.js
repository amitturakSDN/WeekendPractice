import { Header } from '@/components/header';
import { styles } from '@/screens/LiveTracking/LiveTracking.styles';
import GetPolyline from '@/test-utils/getPolyline';
import socket from '@/test-utils/socket';
import { globalColors } from '@/theme';
import Geolocation from '@react-native-community/geolocation';
import idx from 'idx';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { useSelector } from 'react-redux';

export function LiveTracking(props) {
  const [jobPolyline, setJobPolyline] = useState([]);
  const [latitude, setLatitude] = useState(29.732166);
  const [longitude, setLongitude] = useState(78.509127);
  let destinationLatitude = Number(idx(props, (_) => _.route.params.serviceLatitude));
  let destinationLongitude = Number(idx(props, (_) => _.route.params.serviceLongitude));
  let myStaffId = idx(props, (_) => _.route.params.myStaffId);
  let userData = useSelector((state) => state.user.user);
  let myEmail = idx(userData, (_) => _.response.data.email);
  useEffect(() => {
    getLocation();

    socket.emit('shareUserInfo', {
      socketId: socket.id,
      email: myEmail,
    });
    socket.on('live_tracking', (response) => {
      if (response.staffId == myStaffId) {
        if (response.latitude && response.longitude) {
          setLatitude(Number(response.latitude));
          setLongitude(Number(response.longitude));
          setPolyline(response.latitude, response.longitude);
        }
      }
    });
  }, []);

  const getLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      setLatitude(info && info.coords && info.coords.latitude);
      setLongitude(info && info.coords && info.coords.longitude);
    });
  };

  const setPolyline = async (providerLatitude, providerLongitude) => {
    let polyline = await GetPolyline(
      providerLatitude,
      providerLongitude,
      destinationLatitude,
      destinationLongitude
    );
    setJobPolyline(polyline);
  };

  const getPolyLinePath = () => {
    {
      return (
        jobPolyline && (
          <Polyline
            coordinates={[...jobPolyline]}
            strokeWidth={3}
            strokeColor={globalColors.primaryTheme}
          />
        )
      );
    }
  };

  const getMarkers = () => {
    {
      return (
        <>
          <Marker
            coordinate={{
              latitude: latitude || 37.78825,
              longitude: longitude || -122.4324,
              latitudeDelta: 0.06,
              longitudeDelta: 0.05,
            }}
          />
          <Marker
            coordinate={{
              latitude: destinationLatitude || 37.78825,
              longitude: destinationLongitude || -122.4324,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          />
        </>
      );
    }
  };
  return (
    <View style={styles.container}>
      <Header title={'Live Tracking'} backEnable={true} navProps={props} />
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        }}
      >
        {getPolyLinePath()}
        {getMarkers()}
      </MapView>
    </View>
  );
}
