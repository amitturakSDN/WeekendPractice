/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
import { useTheme } from '@react-navigation/native';
import idx from 'idx';
import React, { useState } from 'react';
import { FlatList, Image, Pressable, RefreshControl, Text, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as Images from './assets';
import AlertModal from '@/components/AlertModal';

import { styles } from '@/screens/Schedule/Card.styles';
import { Button } from '@/components';
import { getActiveService } from '@/actions/ScheduleActions';
import { globalColors } from '@/theme';
import { EmptyComponent } from '@/components/EmptyComponent';
import { imageBaseUrl } from '@/controllers/ApiList';
import { FastImageComponent } from '@/components/FastImage.js';

export function Card(props) {
  const { colors } = useTheme();
  const { navigation, fromDetails, selectedTab, activeServices, onReschedulePress, onCancelPress } =
    props;

  const [cancelModal, setCancelModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isrefresh, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  let rescheduling = useSelector((state) => state.home.rescheduling);
  let cancellingService = useSelector((state) => state.schedule.cancellingService);
  let myPicture = useSelector((state) => idx(state, (_) => _.profile.myadd.profileImage.src));

  //
  const dispatch = useDispatch();
  let hideLoader = false;

  const onDateSelection = (date) => {};
  const onChangeText = (value) => {};

  const onCancelServicePress = (item) => {
    setCancelModal(true);
    setCurrentItem(item);
  };

  const cancelScheduleService = () => {
    setCancelModal(false);
    onCancelPress(currentItem);
  };
  const _onRefresh = async () => {
    setRefreshing(true);
    hideLoader = true;
    await dispatch(
      getActiveService(hideLoader, {
        pageNum: 0,
        limit: 100,
        status: selectedTab == 0 ? [0, 1, 2, 3] : [4],
      })
    );
    setRefreshing(false);
    hideLoader = false;
  };

  const renderItem = ({ item }) => {
    let enableCancel = item.status == 0 || item.status == 1 || item.status == 2;
    return (
      <Pressable
        disabled={fromDetails}
        style={styles.card}
        onPress={() => {
          navigation.navigate('OrderDetails', {
            id: item._id,
            fromCompleted: selectedTab == 1 ? true : false,
          });
        }}
      >
        <View style={styles.cardHeader}>
          <View style={styles.image}>
            {myPicture && myPicture.length > 1 ? (
              FastImageComponent(`${imageBaseUrl}${myPicture}`, styles.imageLogo)
            ) : (
              <Image style={styles.imageLogo} source={Images.user} resizeMode={'contain'} />
            )}
          </View>
          <View style={[styles.nameContainer, { flex: fromDetails ? 0.7 : 0.85 }]}>
            <Text style={styles.userName}>{idx(item, (_) => _.customerData.username)}</Text>
            {/* <Text style={styles.userName}>{idx(item, (_) => _.staffData[0].firstName)}</Text> */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: RFValue(10),
              }}
            >
              <Image
                style={{ height: RFValue(10), width: RFValue(10) }}
                source={Images.pin}
                resizeMode={'contain'}
              />
              <Text style={styles.address} numberOfLines={1}>
                {fromDetails
                  ? 'merrymacon@gmail.com'
                  : `${idx(item, (_) => _.location.address)}, ${idx(item, (_) => _.location.city)}`}
              </Text>
            </View>
          </View>

          {fromDetails && (
            <Pressable style={styles.image}>
              <Image style={styles.chatLogo} source={Images.chat} resizeMode={'contain'} />
            </Pressable>
          )}
        </View>
        <View style={styles.footer}>
          <View style={styles.service}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image style={styles.serviceicon} source={Images.case} resizeMode={'contain'} />
              <Text style={styles.type} numberOfLines={1}>
                Service Type{' '}
              </Text>
            </View>
            <Text style={styles.servicename} adjustsFontSizeToFit>
              {idx(item, (_) => _.serviceData[0].serviceName)}

              {/* {idx(item, (_) => _.serviceData.length == 1)
                ? null
                : `+(${idx(item, (_) => _.serviceData.length - 1)})`} */}
            </Text>
          </View>
          <View style={styles.date}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image style={styles.serviceicon} source={Images.calendar} resizeMode={'contain'} />
              <Text style={styles.type} numberOfLines={1}>
                Date time{' '}
              </Text>
            </View>
            <Text style={styles.servicename}>
              {moment(idx(item, (_) => _.serviceDateTime)).format('DD/MM/YY hh:mm a')}
            </Text>
          </View>
        </View>
        {item.status != 4 && (
          <View style={styles.footer}>
            <View style={styles.service}>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                {/* <Image style={styles.serviceicon} source={Images.case} resizeMode={'contain'} /> */}
                <Text style={styles.type} numberOfLines={1}>
                  Start Service Pin{' '}
                </Text>
              </View>
              <Text style={styles.servicename} adjustsFontSizeToFit>
                {idx(item, (_) => _.startServicePin)}
              </Text>
            </View>
            <View style={styles.date}>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                {/* <Image style={styles.serviceicon} source={Images.calendar} resizeMode={'contain'} /> */}
                <Text style={styles.type} numberOfLines={1}>
                  Finish Service Pin{' '}
                </Text>
              </View>
              <Text style={styles.servicename}>
                {idx(item, (_) => _.completeServicePin)}
                {/* 02 : 20 12 October */}
              </Text>
            </View>
          </View>
        )}
        {selectedTab == 0 ? (
          <View style={styles.footerOngoing}>
            <View style={styles.serviceAmaount}>
              <Text style={styles.amountText}>£{idx(item, (_) => _.totalServicePrice)} </Text>
            </View>
            <View
              style={[
                styles.buttonCont,
                {
                  justifyContent: item.rescheduleRequested ? 'flex-end' : 'space-between',
                },
              ]}
            >
              {!item.rescheduleRequested && item.status != 4 && item.status != 3 && (
                <Button
                  onPress={() => {
                    setSelectedId(item._id);
                    onReschedulePress(item);
                  }}
                  style={[
                    styles.buttonstyle,
                    {
                      borderWidth: idx(item, (_) => _.rescheduleRequested) ? 2 : 0,
                      borderColor: idx(item, (_) => _.rescheduleRequested)
                        ? globalColors.primaryTheme
                        : globalColors.white,
                    },
                  ]}
                  textStyle={[
                    styles.buttonText,
                    {
                      color: idx(item, (_) => _.rescheduleRequested)
                        ? globalColors.primaryTheme
                        : globalColors.darkGreen,
                    },
                  ]}
                  title={idx(item, (_) => _.rescheduleRequested) ? 'Rescheduled' : 'Reschedule'}
                  isLoading={item._id == selectedId ? rescheduling : false}
                  disabled={idx(item, (_) => _.rescheduleRequested)}
                  loaderColor={globalColors.primaryTheme}
                />
              )}
              {enableCancel && (
                <Button
                  onPress={() => onCancelServicePress(item)}
                  style={styles.buttonstyleCancel}
                  textStyle={styles.buttonTextCancel}
                  title={'Cancel'}
                  isLoading={currentItem && currentItem._id == item._id ? cancellingService : false}
                  disabled={cancellingService}
                  loaderColor={globalColors.primaryTheme}
                />
              )}
            </View>
          </View>
        ) : (
          <View style={styles.footer}>
            <View style={styles.service}>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={styles.typeStatus} numberOfLines={1}>
                  Price
                </Text>
              </View>
              <Text style={styles.servicename}>£{idx(item, (_) => _.totalServicePrice)}</Text>
            </View>
            <View style={styles.date}>
              <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                <Text style={styles.typeStatus} numberOfLines={1}>
                  Status
                </Text>
              </View>
              <Text style={styles.status}>Completed</Text>
            </View>
          </View>
        )}
        {/* <View style={styles.footer}>
          <View style={styles.service}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image style={styles.serviceicon} source={Images.case} resizeMode={'contain'} />
              <Text style={styles.type} numberOfLines={1}>
                Price
              </Text>
            </View>
            <Text style={styles.servicename}>£400</Text>
          </View>
          <View style={styles.date}>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
              <Image style={styles.serviceicon} source={Images.calendar} resizeMode={'contain'} />
              <Text style={styles.type} numberOfLines={1}>
                Rounds
              </Text>
            </View>
            <Text style={styles.servicename}>Newcastle</Text>
          </View>
        </View> */}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListEmptyComponent={() => {
          return <EmptyComponent title={'No jobs found.'} />;
        }}
        data={activeServices || []}
        renderItem={renderItem}
        keyExtractor={(item, index) => item && item._id}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isrefresh} onRefresh={_onRefresh} />}
      />
      <AlertModal
        visibility={cancelModal}
        confirm={() => {
          cancelScheduleService();
        }}
        cancel={() => setCancelModal(false)}
        title={'Are you sure you want to cancel this service?'}
      />
    </View>
  );
}
