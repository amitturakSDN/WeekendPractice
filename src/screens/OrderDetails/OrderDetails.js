import { rescheduleService } from '@/actions/HomeActions';
import { getServiceDetail, rateProvider } from '@/actions/ScheduleActions';
import { Button } from '@/components';
import AlertModal from '@/components/AlertModal';
import { GlobalLoader } from '@/components/GlobalLoader';
import { Header } from '@/components/header';
import { styles } from '@/screens/OrderDetails/OrderDetails.styles';
import { hideTab, showTab } from '@/test-utils/hideBottomTab';
import { globalColors } from '@/theme';
import { useTheme } from '@react-navigation/native';
import idx from 'idx';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import { Address } from './Address';
import { ChatProvider } from './ChatProvider';
import { Concern } from './Concern';
import { InvoiceDownload } from './Invoice';
import { Photos } from './JobPhotos';
import { OrderTitles } from './OrderTitles';
import { Payment } from './Payment';
import { Rating } from './Rating';
import { ServiceDetail } from './ServiceDetail';
import { ServiceQuestions } from './ServiceQuestions';
import { Signature } from './Signature';
import { Technician } from './Technicians';
import { Appearance } from 'react-native-appearance';
const colorScheme = Appearance.getColorScheme();
const isDarkModeEnabled = colorScheme === 'dark';

export function OrderDetails(props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  let { navigation, route } = props;
  const [cancelModal, setCancelmodal] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [scroll, setScroll] = useState(true);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(3);
  const [rescheduleId, setrescheduleId] = useState(null);
  let isServiceDetailrequest = useSelector((state) => state.schedule.isServiceDetailrequest);
  let activeServiceDetail = useSelector((state) => state.schedule.activeServiceDetail);
  let rescheduling = useSelector((state) => state.home.rescheduling);
  let completedOrder = idx(route, (_) => _.params.fromCompleted);
  let invoicedOrder = idx(route, (_) => _.params.fromInvoice);

  let ratingProgress = useSelector((state) => state.schedule.ratingLoading);
  let allImages = useSelector((state) => state.user.allRateImage);

  useEffect(() => {
    hideTab(props);
    return () => {
      invoicedOrder ? null : showTab(props);
    };
  }, []);

  useEffect(() => {
    let id = idx(route, (_) => _.params.id);
    dispatch(getServiceDetail({ serviceRequestId: id }));
  }, []);

  const cancelScheduleService = () => {
    setCancelmodal(false);
  };

  const onReschedulePress = () => {
    let requestId = activeServiceDetail && activeServiceDetail._id;
    setrescheduleId(requestId);

    setDatePickerVisibility(true);
  };

  const handleConfirm = (date) => {
    dispatch(
      rescheduleService({
        serviceRequestId: rescheduleId,
        rescheduleServiceDateTime: moment(date).format(),
      })
    );

    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const submitFeedback = () => {
    let ratingData = {
      serviceRequestId: activeServiceDetail._id,
      rating: Number(rating),
      comment: comment,
      images: allImages,
    };
    dispatch(rateProvider(ratingData));
  };
  let ratingGiven = idx(activeServiceDetail, (_) => _.serviceRequestRating);
  let alreadyRated = ratingGiven && ratingGiven.rating;
  let enableCancel =
    idx(activeServiceDetail, (_) => _.status) == 0 ||
    idx(activeServiceDetail, (_) => _.status) == 1 ||
    idx(activeServiceDetail, (_) => _.status) == 2;

  return (
    <View style={styles.container}>
      <Header title={'Service Details'} backEnable navProps={props} />

      {isServiceDetailrequest ? (
        <GlobalLoader title="Fetching Service Detail" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={scroll}>
          <OrderTitles
            props={activeServiceDetail}
            onReschedulePress={() => {
              onReschedulePress();
            }}
            rescheduling={rescheduling}
          />
          <ServiceDetail props={activeServiceDetail} />
          {/* <CustomerDetails props={props} /> */}
          <ServiceQuestions props={activeServiceDetail} />
          {/* <ServiceDate props={props} /> */}
          <Address props={activeServiceDetail} navigation={props.navigation} />
          <Technician props={activeServiceDetail} />
          <ChatProvider props={activeServiceDetail} navigation={props.navigation} />
          <Payment />
          <Concern props={activeServiceDetail} />
          {completedOrder && (
            <>
              <InvoiceDownload />
              <Photos props={props} rateingImages={true} ratingGiven={ratingGiven} />
              {/* <Signature
                props={props}
                setScroll={(value) => {
                  setScroll(value);
                }}
              /> */}
              <Rating
                ratingGiven={ratingGiven}
                commentText={(value) => {
                  setComment(value);
                }}
                setRating={(value) => {
                  setRating(value);
                }}
              />
            </>
          )}

          {completedOrder && !alreadyRated && (
            <Button
              onPress={() => submitFeedback()}
              style={styles.buttonstyle}
              textStyle={styles.buttonText}
              title={'Submit Feedback'}
              isLoading={ratingProgress}
              disabled={ratingProgress}
              loaderColor={globalColors.primaryTheme}
            />
          )}

          {enableCancel && (
            <Button
              onPress={() => setCancelmodal(true)}
              style={styles.buttonstyle}
              textStyle={styles.buttonText}
              title={'Cancel Service'}
              // isLoading={loginLoader}
              // disabled={loginLoader}
            />
          )}
          <AlertModal
            visibility={cancelModal}
            confirm={() => {
              cancelScheduleService();
            }}
            cancel={() => setCancelmodal(false)}
            title={'Are you sure you want to cancel this service?'}
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
            isDarkModeEnabled={isDarkModeEnabled}
          />
        </ScrollView>
      )}
    </View>
  );
}
