import { styles } from '@/screens/Chat/ChatList.styles';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { EmptyComponent } from '@/components/EmptyComponent';
import { useSelector } from 'react-redux';
import idx from 'idx';
import moment from 'moment';
import * as Images from '@/assets';
import { getActiveChats } from '@/actions/ChatActions';
import { imageBaseUrl } from '@/controllers/ApiList';
import { FastImageComponent } from '@/components/FastImage.js';

export function ChatList({ props }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  let activeChats = useSelector((state) => state.chat.allActiveChats);
  let loadingChats = useSelector((state) => state.chat.loadingActiveChats);
  let myUserId = useSelector((state) => idx(state, (_) => _.user.user.response.data._id));

  const getMyChats = () => {
    dispatch(
      getActiveChats({
        pageNum: 0,
        limit: 100,
        status: [1, 2, 3, 4],
      })
    );
  };

  const renderItem = ({ item }) => {
    console.log('CHATDETAILS', item);
    return (
      <Pressable
        style={styles.card}
        onPress={() => {
          props.navigation.navigate('ChatList', { chatDetails: item });
        }}
      >
        <View style={styles.imageContainer}>
          {idx(item, (_) => _.staffData[0].profileImage.src) ? (
            FastImageComponent(
              `${imageBaseUrl}${idx(item, (_) => _.staffData[0].profileImage.src)}`,
              styles.imageLogo
            )
          ) : (
            <Image style={styles.imageLogo} source={Images.user} resizeMode={'contain'} />
          )}
        </View>
        <View style={styles.name}>
          <Text style={styles.nameText}>{idx(item, (_) => _.staffData[0].username)}</Text>
          <Text numberOfLines={1} style={styles.body}>
            {idx(item, (_) => _.customerData[0].roomData[0].type) == 2
              ? 'Image'
              : idx(item, (_) => _.customerData[0].roomData[0].lastMessage) ||
                'Chat initiated, click to begin chat....'}
          </Text>
          <Text style={styles.time}>
            {moment(idx(item, (_) => _.staffData[0].updatedAt)).fromNow()}
          </Text>
        </View>

        {idx(item, (_) => _.staffData[0].roomData[0].lastMessage.length > 0) &&
          idx(item, (_) => _.staffData[0].roomData[0].lastMessage) &&
          idx(item, (_) => _.staffData[0].roomData[0].lastMessageBy) != myUserId &&
          idx(item, (_) => _.staffData[0].roomData[0].unreadMessageCount) > 0 && (
            <View style={styles.count}>
              <View style={styles.countContainer}>
                <Text style={styles.countText}>
                  {idx(item, (_) => _.staffData[0].roomData[0].unreadMessageCount)}
                </Text>
              </View>
            </View>
          )}
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        onRefresh={() => {
          getMyChats();
        }}
        refreshing={loadingChats}
        data={activeChats || []}
        ListEmptyComponent={() => {
          return <EmptyComponent title={'No active chats.'} />;
        }}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
