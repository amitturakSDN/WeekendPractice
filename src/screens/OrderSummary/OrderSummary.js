/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
/* eslint-disable no-undef */
import { createService, getTaxValue, setServiceDetails } from '@/actions/HomeActions';
import { getActiveService } from '@/actions/ScheduleActions';
import { getLocationFromInput } from '@/actions/UserActions';
import { calendar, card, greenTick, loc_pin } from '@/assets';
import { Button } from '@/components';
import { GlobalLoader } from '@/components/GlobalLoader';
import { Header } from '@/components/header';
import { NAVIGATION } from '@/constants';
import { styles } from '@/screens/OrderSummary/OrderSummary.styles';
import { FormattedLocation } from '@/test-utils';
import { globalColors, globalFonts } from '@/theme';
import idx from 'idx';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Modal, ScrollView, Text, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { SearchModal } from '../Register/SearchModal';
import { PaymentModal } from './Payment';
import { Appearance } from 'react-native-appearance';
import Toast from 'react-native-simple-toast';
const colorScheme = Appearance.getColorScheme();
const isDarkModeEnabled = colorScheme === 'dark';
export function OrderSummary(props) {
  let { navigation } = props;
  const scrollRef = useRef();
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const serviceQuestions = useSelector((state) => state.home.serviceQuestionaire);

  const allstate = useSelector((state) => state.home);

  const serViceDetails = useSelector((state) => state.home.serViceDetails);
  const selectedServices = useSelector((state) => state.home.selectedServices);
  const isServiceRequest = useSelector((state) => state.home.isServiceRequest);
  const taxValue = useSelector((state) => state.home.taxValue);
  const selectedCard = useSelector((state) => state.user.selectedCard);

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const allMyCards = useSelector((state) => state.user.allMyCards);
  let userData = useSelector((state) => state.user.user);
  let myStripeId = idx(userData, (_) => _.response.data.stripe.customerId);
  //location
  const [loactionModal, setLocationModal] = useState(false);
  const [locationInput, setlocationInput] = useState('');
  const [obtainedLocations, setObtainedLocations] = useState([]);
  const [isFetchingLocations, setFetchingLocations] = useState(false);
  const [initialRegion, setInitialRegion] = useState('');
  const [paymentModal, setPaymentModal] = useState(false);
  let dispatch = useDispatch();

  useEffect(() => {
    setInitialRegion({
      latitude: idx(serViceDetails, (_) => _.lat),
      longitude: idx(serViceDetails, (_) => _.lng),
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
    dispatch(getTaxValue());
  }, []);

  let subtotal = 0;
  for (let i = 0; i < selectedServices.length; i++) {
    subtotal += parseInt(selectedServices[i].servicePrice);
  }
  let tax = (taxValue / 100) * subtotal;

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

    console.log(valueOutput, 'valueOutputvalueOutput', serViceDetails);
    setObtainedLocations([]);
    let serviceDetails = {
      address: idx(valueOutput, (_) => _.formattedAddress),
      city: idx(valueOutput, (_) => _.city.long_name),
      state: idx(valueOutput, (_) => _.state.long_name),
      country: idx(valueOutput, (_) => _.country.long_name),
      serviceDateTime: idx(serViceDetails, (_) => _.serviceDateTime),
      lat: idx(initialRegion, (_) => _.latitude),
      lng: idx(initialRegion, (_) => _.longitude),
      postalCode:
        idx(valueOutput, (_) => _.postalCode.long_name) ||
        (serViceDetails && serViceDetails.postalCode),
    };
    dispatch(setServiceDetails(serviceDetails));

    setLocationModal(false);
    setlocationInput('');
  };
  const onMapPressed = async (value) => {
    let valueOutput = await FormattedLocation(value);
    let serviceDetails = {
      address: idx(valueOutput, (_) => _.formattedAddress),
      city: idx(valueOutput, (_) => _.city.long_name),
      state: idx(valueOutput, (_) => _.state.long_name),
      country: idx(valueOutput, (_) => _.country.long_name),
      serviceDateTime: idx(serViceDetails, (_) => _.serviceDateTime),
      lat: idx(value, (_) => _.latitude),
      lng: idx(value, (_) => _.longitude),
      postalCode: idx(valueOutput, (_) => _.postalCode.long_name),
    };
    dispatch(setServiceDetails(serviceDetails));
    setlocationInput(idx(valueOutput, (_) => _.formattedAddress));
    setInitialRegion({
      latitude: idx(value, (_) => _.latitude),
      longitude: idx(value, (_) => _.longitude),
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };
  const renderQuestions = (item, index) => {
    return (
      <View key={index}>
        <Text
          style={{
            fontSize: RFValue(14),
            color: globalColors.grey,
            marginVertical: RFValue(10),
            fontFamily: globalFonts.semibold,
          }}
        >
          {index + 1}.{idx(item, (_) => _.question)}
        </Text>
        <Text
          style={{
            fontSize: RFValue(14),
            color: globalColors.black,
            fontFamily: globalFonts.semibold,
            marginLeft: RFValue(20),
          }}
        >
          {idx(item, (_) => _.answer)}
        </Text>
      </View>
    );
  };

  const renderServicesChosen = (item, index) => {
    const serviceDescription = String(idx(item, (_) => _.serviceDesc)).replace(/<(.|\n)*?>/g, '');

    return (
      <View style={styles.serViceItem} key={index}>
        <View style={{ width: '80%' }}>
          <Text style={styles.serviceName}> {idx(item, (_) => _.serviceName)}</Text>
          <Text style={styles.serviceDesc}>{serviceDescription}</Text>
        </View>
        <View style={[{ width: '15%' }, styles.centerStyles]}>
          <Text style={styles.servicePrice}>£{idx(item, (_) => _.servicePrice)}</Text>
        </View>
      </View>
    );
  };

  const validateOrder = () => {
    let serviceIds = [];
    let questionsArray = [];
    for (let i = 0; i < selectedServices.length; i++) {
      serviceIds.push(selectedServices[i]._id);
    }

    for (let i = 0; i < serviceQuestions.length; i++) {
      questionsArray.push({
        question: idx(serviceQuestions[i], (_) => _.question),
        answer: idx(serviceQuestions[i], (_) => _.answer),
      });
    }

    let serviceRequestObj = {
      serviceId: serviceIds,
      location: {
        lat: '' + idx(serViceDetails, (_) => _.lat),
        lng: '' + idx(serViceDetails, (_) => _.lng),
        address: idx(serViceDetails, (_) => _.address),
        city: idx(serViceDetails, (_) => _.city),
        state: idx(serViceDetails, (_) => _.state),
        country: idx(serViceDetails, (_) => _.country),
        postalcode: idx(serViceDetails, (_) => _.postalCode),
      },
      serviceDateTime: idx(serViceDetails, (_) => _.serviceDateTime),
      questionnaire: questionsArray,
      paymentMethod: selectedCard ? 1 : 2,
      cardId: selectedCard && selectedCard.id,
    };
    console.log(serviceRequestObj, 'serviceRequestObjserviceRequestObj<<<<<');
    // debugger;
    if (serviceQuestions.length > 0) {
      serviceRequestObj.questionnaire = questionsArray;
    }

    //hit api action and reducer have been made

    if (selectedCard) {
      dispatch(
        createService(
          serviceRequestObj,
          (cb) => {
            if (cb.statusCode) {
              setOrderConfirmed(true);
              goToOrderList();
            }
          },
          selectedCard
        )
      );
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    } else {
      Toast.show('Please select a card to proceed');
    }
  };
  const goToOrderList = () => {
    dispatch(
      getActiveService(true, {
        pageNum: 0,
        limit: 100,
        status: [0, 1, 2, 3],
      })
    );
    navigation.popToTop();
    navigation.navigate(NAVIGATION.schedule);
  };
  const handleConfirm = (date) => {
    let serviceDetails = {
      lat: '' + idx(serViceDetails, (_) => _.lat),
      lng: '' + idx(serViceDetails, (_) => _.lng),
      address: idx(serViceDetails, (_) => _.address),
      city: idx(serViceDetails, (_) => _.city),
      state: idx(serViceDetails, (_) => _.state),
      country: idx(serViceDetails, (_) => _.country),
      serviceDateTime: date,
    };
    dispatch(setServiceDetails(serviceDetails));
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  console.log(selectedCard, 'selectedCardselectedCard');
  return (
    <>
      <Header title={'Order Summary'} backEnable navProps={props} />

      <ScrollView style={styles.container} ref={scrollRef}>
        <View style={styles.mainView}>
          {isServiceRequest ? <GlobalLoader title={'Creating Service Request'} /> : null}

          {orderConfirmed ? (
            <View style={[{ paddingVertical: RFValue(20), width: '100%' }, styles.centerStyles]}>
              <Image
                style={{ height: RFValue(40), width: RFValue(40) }}
                source={greenTick}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: RFValue(16),
                  color: globalColors.black,
                  marginVertical: RFValue(10),
                  fontFamily: globalFonts.semibold,
                }}
              >
                Thanks for Request
              </Text>
              <Text
                style={{
                  fontSize: RFValue(12),
                  color: globalColors.black,
                  fontFamily: globalFonts.regular,
                  textAlign: 'center',
                }}
              >
                You will be notified when your order status changes.
              </Text>
            </View>
          ) : null}
          <Text style={styles.headingText}>Service Detail</Text>
          <View style={styles.serviceItemView}>
            {selectedServices.map((item, i) => renderServicesChosen(item, i))}
          </View>
          <View style={[styles.serViceItem, { marginTop: RFValue(10) }]}>
            <View style={{ width: '80%', paddingLeft: 10 }}>
              <Text style={styles.serviceName}>Sub total</Text>
            </View>
            <View style={[{ width: '15%' }, styles.centerStyles]}>
              <Text style={styles.servicePrice}>£{subtotal}</Text>
            </View>
          </View>
          {/* <View style={styles.serViceItem}>
            <View style={{ width: '80%', paddingLeft: 10 }}>
              <Text style={styles.serviceName}>Tax</Text>
            </View>
            <View style={[{ width: '15%' }, styles.centerStyles]}>
              <Text style={styles.servicePrice}>£{tax}</Text>
            </View>
          </View> */}
          <View style={[styles.serViceItem, { marginTop: RFValue(20) }]}>
            <View style={{ width: '80%', paddingLeft: 10 }}>
              <Text style={styles.serviceName}>Total</Text>
            </View>
            <View style={[{ width: '15%' }, styles.centerStyles]}>
              {/* <Text style={styles.servicePrice}>£{subtotal + parseInt(tax)}</Text> */}
              <Text style={styles.servicePrice}>£{subtotal}</Text>
            </View>
          </View>
          {serviceQuestions.length > 0 ? (
            <>
              <Text style={styles.headingText}>Service Questions</Text>

              {serviceQuestions.map((item, index) => renderQuestions(item, index))}
            </>
          ) : null}

          <Text style={styles.headingText}>Date of Service</Text>
          <View style={styles.bottomView}>
            <View style={styles.bottomLeft}>
              <Image style={styles.loc} resizeMode="contain" source={calendar} />
              <Text style={[styles.serviceDesc]}>
                {moment(idx(serViceDetails, (_) => _.serviceDateTime)).format('DD-MM-YYYY HH:mm a')}
              </Text>
            </View>
            <View style={[{ width: '15%' }, styles.centerStyles]}>
              {orderConfirmed ? null : (
                <Text style={styles.changeText} onPress={() => setIsDatePickerVisible(true)}>
                  Change
                </Text>
              )}
            </View>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            isDarkModeEnabled={isDarkModeEnabled}
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
          <Text style={styles.headingText}>Payment</Text>
          <View style={styles.bottomView}>
            <View style={styles.bottomLeft}>
              <Image style={styles.loc} resizeMode="contain" source={card} />
              <Text style={[styles.serviceDesc]}>
                {selectedCard
                  ? `XXXX XXXX ${selectedCard && selectedCard.last4} (${
                      selectedCard && selectedCard.brand
                    })`
                  : 'Please select a card to proceed'}
                {/* {moment(idx(serViceDetails, (_) => _.serviceDateTime)).format('DD-MM-YYYY HH:mm a')} */}
              </Text>
            </View>
            <View style={[{ width: '15%' }, styles.centerStyles]}>
              {orderConfirmed ? null : (
                <Text style={styles.changeText} onPress={() => setPaymentModal(true)}>
                  {selectedCard ? 'Change' : 'Select'}
                </Text>
              )}
            </View>
          </View>
          <Text style={styles.headingText}>Address</Text>
          <View style={styles.bottomView}>
            <View style={styles.bottomLeft}>
              <Image style={styles.loc} resizeMode="contain" source={loc_pin} />
              <Text style={[styles.serviceDesc]}> {idx(serViceDetails, (_) => _.address)}</Text>
            </View>
            <View style={[{ width: '15%' }, styles.centerStyles]}>
              {orderConfirmed ? null : (
                <Text
                  style={styles.changeText}
                  onPress={() => setLocationModal(true)}
                  // onPress={() => setPaymentModal(true)}
                >
                  Change
                </Text>
              )}
            </View>
          </View>

          <PaymentModal
            visible={paymentModal}
            onCloseModal={() => setPaymentModal(false)}
            addNewCard={() => {
              navigation.navigate(NAVIGATION.payment, {
                reCall: () => {
                  console.log('CAAADASDSAD');
                  setPaymentModal(true);
                },
              });
              setPaymentModal(false);
            }}
          />
          <Button
            style={[styles.button]}
            textStyle={styles.buttonText}
            title={orderConfirmed ? 'Go To Order' : 'Confirm the Order'}
            onPress={() => (orderConfirmed ? goToOrderList() : validateOrder())}
          />
        </View>
      </ScrollView>
    </>
  );
}
