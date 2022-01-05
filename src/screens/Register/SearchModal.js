/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { backArrow, search } from '@/assets';
import { Button, TextField } from '@/components';
import { FormattedLocation } from '@/test-utils';
import { globalColors, globalFonts } from '@/theme';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Toast from 'react-native-simple-toast';
export const SearchModal = ({
  closeModal,
  isFetchingLocations,
  obtainedLocations,
  handleLocationPressed,
  label,
  value,
  onChangeText,
  region,
  map = false,
  updatedCoordinates,
  onMapPositionPress,
  onLocationConfirmed,
}) => {
  const renderObtainedLocations = (item) => {
    return (
      <TouchableOpacity
        style={{
          marginVertical: 10,
          paddingVertical: 5,
          width: '100%',
          paddingHorizontal: 15,
        }}
        onPress={async () => {
          let serviceAvailable = await getCountry(item.description);

          if (serviceAvailable) {
            handleLocationPressed(item);
          } else {
            Toast.show('Service not currently available at your location.');
          }
          //
        }}
      >
        <Text style={{ color: '#000', fontSize: 16 }} numberOfLines={1}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  };

  const getCountry = async (description) => {
    let valueOutput = await FormattedLocation(description);
    let countryCode = valueOutput && valueOutput.country && valueOutput.country.short_name;
    if (countryCode == 'UK' || countryCode == 'GB' || countryCode == 'AU' || countryCode == 'AUS') {
      return true;
    }
    return false;
  };

  const checkMapPress = async (value) => {
    let serviceAvailable = await getCountry({ lat: value.latitude, lng: value.longitude });

    if (serviceAvailable) {
      onMapPositionPress(value);
    } else {
      Toast.show('Service not currently available at your location.');
    }
  };

  return (
    <>
      <SafeAreaView
        style={{
          height: Platform.OS == 'ios' ? 10 : 0,
          backgroundColor: globalColors.primaryTheme,
        }}
      />
      <View style={{ flex: 1, backgroundColor: globalColors.white }}>
        <View style={styles.headerStyle}>
          <Pressable onPress={closeModal} style={styles.back}>
            <Image style={styles.backImg} source={backArrow} resizeMode={'contain'} />
          </Pressable>
          <Text style={styles.heading}>Search your location</Text>
        </View>
        {map == true ? (
          <View style={{ flex: 1 }}>
            <RNMapView
              initial_region={
                region && region.latitude
                  ? region
                  : {
                      latitude: (region && region.latitude) || 53.799134,
                      longitude: (region && region.longitude) || -1.549308,
                      latitudeDelta: 0.02,
                      longitudeDelta: 0.02,
                    }
              }
              updatedCoordinates={updatedCoordinates}
              onMapPositionPress={(value) => {
                checkMapPress(value);
              }}
            />

            <Button
              style={[styles.button]}
              textStyle={styles.buttonText}
              title={'Confirm location'}
              onPress={onLocationConfirmed}
            />
            <View
              style={{
                position: 'absolute',
                marginHorizontal: 10,
                top: 10,
                left: 10,
                righht: 10,
                width: '90%',
              }}
            >
              <View style={{ marginHorizontal: 10, width: '95%' }}>
                <TextField
                  placeHolder={'Search......'}
                  value={value}
                  onChangeText={onChangeText}
                  icon={value ? false : true}
                  image={search}
                  customStyle={{
                    backgroundColor: '#F7A5D7',
                    marginTop: 5,
                    justifyContent: 'center',
                  }}
                />
              </View>

              {isFetchingLocations ? (
                <View style={styles.centerSrtyles}>
                  <ActivityIndicator size={'small'} color="red" />
                  <Text style={styles.loadingText}>Fetching Locations....</Text>
                </View>
              ) : (
                <FlatList
                  data={obtainedLocations}
                  contentContainerStyle={{
                    flex: 1,
                    marginVertical: 10,
                    backgroundColor: globalColors.white,
                  }}
                  renderItem={({ item }) => renderObtainedLocations(item)}
                  keyExtractor={(_, index) => index.toString()}
                  extraData={obtainedLocations}
                />
              )}
            </View>
          </View>
        ) : (
          <>
            <View style={{ marginHorizontal: 10 }}>
              <TextField
                placeHolder={'Search......'}
                value={value}
                onChangeText={onChangeText}
                icon={true}
                image={search}
                customStyle={{ backgroundColor: '#F7A5D7', marginTop: 5 }}
              />
            </View>

            {isFetchingLocations ? (
              <View style={styles.centerSrtyles}>
                <ActivityIndicator size={'small'} color="red" />
                <Text style={styles.loadingText}>Fetching Locations....</Text>
              </View>
            ) : (
              <FlatList
                data={obtainedLocations}
                contentContainerStyle={{ flex: 1, marginVertical: 10 }}
                renderItem={({ item }) => renderObtainedLocations(item)}
                keyExtractor={(_, index) => index.toString()}
                extraData={obtainedLocations}
                ListEmptyComponent={() => (
                  <View style={styles.centerSrtyles}>
                    <Text>
                      {isFetchingLocations ? 'Fetching Locations....' : 'No locations found'}
                    </Text>
                  </View>
                )}
              />
            )}
          </>
        )}
      </View>
    </>
  );
};

export const RNMapView = ({ initial_region, updatedCoordinates, onMapPositionPress }) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      showsUserLocation={true}
      showsCompass={true}
      loadingEnabled
      initialRegion={initial_region}
      showsTraffic
      showsMyLocationButton={true}
      onPress={(e) => {
        onMapPositionPress(e.nativeEvent.coordinate);
      }}
      region={initial_region}
    >
      <MapView.Marker
        coordinate={{
          latitude: initial_region.latitude || 37.78825,
          longitude: initial_region.longitude || -122.4324,
        }}
        title={'My location'}
        draggable
        pinColor={'#66cdaa'}
        identifier={'MK2'}
        onDragEnd={(e) => {
          updatedCoordinates(e.nativeEvent.coordinate);
        }}
      />
    </MapView>
  );
};
const styles = StyleSheet.create({
  backImg: { height: RFValue(30), width: RFValue(30) },
  headerStyle: {
    height: RFValue(50),
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#EC008C',
  },
  heading: {
    color: '#fff',
    fontSize: RFValue(16),
    textAlign: 'center',
    width: '80%',
    fontWeight: 'bold',
  },
  centerSrtyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: { color: '#000', fontSize: RFValue(14), marginVertical: 10 },
  back: {
    height: RFValue(40),
    width: RFValue(40),
    borderRadius: RFValue(15),
    borderWidth: 0,
    borderColor: 'white',
    margin: RFValue(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: globalColors.primaryTheme,
    height: RFValue(40),
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    position: 'absolute',
    bottom: RFPercentage(8),
  },
  buttonText: { fontSize: RFValue(16), color: 'white', fontFamily: globalFonts.medium },
});
