import { Header } from '@/components/header';
import { styles } from '@/screens/Schedule/Schedule.styles';
import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Card } from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { GlobalLoader } from '@/components/GlobalLoader';
import { rescheduleService } from '@/actions/HomeActions';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { getActiveService, updateServiceStatus } from '@/actions/ScheduleActions';
import { BackgroundNotificationManager } from '@/test-utils/notificationManager';
import { Appearance } from 'react-native-appearance';
const colorScheme = Appearance.getColorScheme();
const isDarkModeEnabled = colorScheme === 'dark';
export function Schedule(props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const activeServiceLoader = useSelector((state) => state.schedule.isLoginRequest);
  const activeServices = useSelector((state) => state.schedule.activeServices);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [rescheduleId, setrescheduleId] = useState(null);
  const [rescheduleDate, setrescheduleDate] = useState(null);
  useEffect(() => {
    BackgroundNotificationManager((response) => {
      // idx(response,_=>_.)
    });
  }, []);
  const toggleTab = (value) => {
    setSelectedTab(value);

    if (value == 0) {
      dispatch(
        getActiveService(false, {
          pageNum: 0,
          limit: 100,
          status: [0, 1, 2, 3],
        })
      );
    } else {
      dispatch(
        getActiveService(false, {
          pageNum: 0,
          limit: 100,
          status: [4],
        })
      );
    }
  };
  const onCardPress = (value) => {};
  const onCancelPressed = (value) => {
    dispatch(
      updateServiceStatus({
        serviceRequestId: value._id,
        status: 5,
      })
    );
  };
  const onRescheduleService = (value) => {
    setrescheduleId(value._id);
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
  return (
    <View style={styles.container}>
      <Header
        toggle
        title={'Scheduled Service'}
        tabChanged={(value) => {
          toggleTab(value);
        }}
      />

      {activeServiceLoader ? (
        <GlobalLoader title={'Fetching services...'} />
      ) : (
        <Card
          activeServices={activeServices}
          isLoading={activeServiceLoader}
          navigation={props.navigation}
          selectedTab={selectedTab}
          onPress={(value) => {
            onCardPress(value);
          }}
          onCancelPress={(item) => onCancelPressed(item)}
          onReschedulePress={(item) => onRescheduleService(item)}
        />
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
        isDarkModeEnabled={isDarkModeEnabled}
      />
    </View>
  );
}
