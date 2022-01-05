import { styles } from '@/screens/NotificationList/NotificationItems.styles';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { EmptyComponent } from '@/components/EmptyComponent';
import idx from 'idx';
import { getNotificationList } from '@/actions/UserActions';

import * as Images from '@/assets';

export function NotificationItems({ props }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  let allNotifications = useSelector((state) => state.user.notificationList);
  let loadingNotification = useSelector((state) => state.user.loadingNotification);

  const renderItem = ({ item }) => {
    return (
      <Pressable style={styles.card}>
        <View style={styles.imageContainer}>
          <Image style={styles.imageLogo} source={Images.bell} resizeMode={'contain'} />
        </View>
        <View style={styles.name}>
          <Text style={styles.nameText}>{idx(item, (_) => _.type)}</Text>
          <Text numberOfLines={5} style={styles.body}>
            {idx(item, (_) => _.text)}
          </Text>
          <Text style={styles.time}>{moment(idx(item, (_) => _.createdAt)).fromNow()}</Text>
        </View>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={() => {
          dispatch(getNotificationList());
        }}
        refreshing={loadingNotification}
        data={allNotifications || []}
        ListEmptyComponent={() => {
          return <EmptyComponent title={'No notifications.'} />;
        }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
