import { styles } from '@/screens/OrderDetails/ChatProvider.styles';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Images from '@/assets';
import idx from 'idx';
function ChatProviderMemo({ props, navigation }) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  let chatStructure = {
    chatDetails: {
      staffData: idx(props, (_) => _.staffData),
    },
  };
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('ChatList', chatStructure);
      }}
    >
      <Image style={styles.chatIcon} source={Images.chatIcon} resizeMode={'contain'} />

      <Text style={styles.header}>Chat With Provider</Text>
    </Pressable>
  );
}

export const ChatProvider = React.memo(ChatProviderMemo);
