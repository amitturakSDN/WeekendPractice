import { logout } from '@/actions/UserActions';
import { styles } from '@/screens/OrderDetails/OrderTitles.styles';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Images from '@/assets';
import { Button } from '@/components';
import idx from 'idx';
import moment from 'moment';
import { globalColors } from '@/theme';
export function OrderTitles({ props, onReschedulePress, rescheduling }) {
  console.log(
    idx(props, (_) => _.status),
    'activeServiceDetailactiveServiceDetail',
    props
  );
  let isRescheduled = idx(props, (_) => _.rescheduleRequested);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.dateCont}>
            <Image style={styles.serviceicon} source={Images.case} resizeMode={'contain'} />
            <Text style={styles.date}>Date time</Text>
          </View>
          <Text style={styles.time}>
            {moment(idx(props, (_) => _.serviceDateTime)).format('DD/MM/YY hh:mm a')}
          </Text>
        </View>
        <View style={styles.buttonCont}>
          {idx(props, (_) => _.status) != 4 && !isRescheduled && (
            <Button
              onPress={() => {
                onReschedulePress();
              }}
              style={[
                styles.buttonstyle,
                {
                  borderWidth: idx(props, (_) => _.rescheduleRequested) ? 2 : 0,
                  borderColor: idx(props, (_) => _.rescheduleRequested)
                    ? globalColors.primaryTheme
                    : globalColors.white,
                },
              ]}
              textStyle={[
                styles.buttonText,
                {
                  color: idx(props, (_) => _.rescheduleRequested)
                    ? globalColors.primaryTheme
                    : globalColors.darkGreen,
                },
              ]}
              title={idx(props, (_) => _.rescheduleRequested) ? 'Rescheduled' : 'Reschedule'}
              isLoading={rescheduling}
              disabled={idx(props, (_) => _.rescheduleRequested) || rescheduling}
              loaderColor={globalColors.primaryTheme}
            />
          )}
        </View>

        {/* <Text style={styles.header}>3 : 00 am | 22 Aug 2021</Text>
      <Text style={styles.child}>
        Order Status :<Text style={styles.childOne}>Completed</Text>
      </Text> */}
      </View>
      <View style={[styles.container, { justifyContent: 'space-between' }]}>
        <View style={styles.header}>
          <View style={styles.dateCont}>
            <Image style={styles.serviceicon} source={Images.case} resizeMode={'contain'} />
            <Text style={styles.date}>Start Service Pin</Text>
          </View>
          <Text style={styles.time}> {idx(props, (_) => _.startServicePin)}</Text>
        </View>
        <View style={[styles.header]}>
          <View style={styles.dateCont}>
            <Image style={styles.serviceicon} source={Images.case} resizeMode={'contain'} />
            <Text style={styles.date}>Close Service Pin</Text>
          </View>
          <Text style={styles.time}> {idx(props, (_) => _.completeServicePin)}</Text>
        </View>
      </View>
    </>
  );
}
