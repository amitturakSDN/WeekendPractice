import Geocoder from 'react-native-geocoding';
import idx from 'idx';

export const FormattedLocation = async (initialSearch) => {
  Geocoder.init('AIzaSyDJeiY4o2jQZU3iotCoprhoftLlZkg0VHU'); // use a valid API key
  let myAddress = await Geocoder.from(initialSearch)

    .then((json) => {
      let stateName = idx(json, (_) =>
        _.results[0].address_components.find(
          (o) => o.types && o.types[0] == 'administrative_area_level_1'
        )
      );
      let cityName = idx(json, (_) =>
        _.results[0].address_components.find((o) => o.types && o.types[0] == 'locality')
      );

      let countryName = idx(json, (_) =>
        _.results[0].address_components.find((o) => o.types && o.types[0] == 'country')
      );
      let postalCode = idx(json, (_) =>
        _.results[0].address_components.find((o) => o.types && o.types[0] == 'postal_code')
      );

      let latitude = idx(json, (_) => _.results[0].geometry.location.lat);

      let longitude = idx(json, (_) => _.results[0].geometry.location.lng);

      return {
        city: cityName,
        formattedAddress: json.results[0].formatted_address,
        state: stateName,
        country: countryName,
        postalCode: postalCode,
        latitude: latitude,
        longitude: longitude,
      };
    })
    .catch((error) => console.warn(error));

  return myAddress;
};

export default FormattedLocation;
