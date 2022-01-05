import { getChatDetailsInfo, saveRoomId, resetChatCounter } from '@/actions/ChatActions';
import * as Images from '@/assets';
import { Header } from '@/components/header';
import { styles } from '@/screens/ChatMessage/ChatMessage.styles';
import { hideTab, showTab } from '@/test-utils/hideBottomTab';
import socket from '@/test-utils/socket';
import { useTheme } from '@react-navigation/native';
import idx from 'idx';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Time,
  MessageImage,
} from 'react-native-gifted-chat';
import { launchImageLibrary } from 'react-native-image-picker';
import { RFValue } from 'react-native-responsive-fontsize';
import { useDispatch, useSelector } from 'react-redux';
import { chatImageUpload } from '@/actions/ChatActions';
import { globalColors, globalFonts } from '@/theme';
export function ChatMessgae(props) {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [myRoomId, setMyRoomId] = useState(null);

  let myUserId = useSelector((state) => idx(state, (_) => _.user.user.response.data._id));
  let chatDetails = useSelector((state) => idx(state, (_) => _.chat.chatDetails));
  let loadingChatDetails = useSelector((state) => idx(state, (_) => _.chat.loadingDetails));
  let chatRoomId = useSelector((state) => idx(state, (_) => _.chat.roomId));
  let chatImageLoading = useSelector((state) => idx(state, (_) => _.chat.chatImageLoading));

  let providerId = idx(props, (_) => _.route.params.chatDetails.staffData[0]._id);
  let providerNmae = idx(props, (_) => _.route.params.chatDetails.staffData[0].username);
  console.log(props, 'propspropspropsprops');

  let userData = useSelector((state) => state.user.user);
  let myEmail = idx(userData, (_) => _.response.data.email);

  useEffect(() => {
    socket.on('create_room', (data) => {
      dispatch(saveRoomId(data.roomId));
      setMyRoomId(data.roomId);
      getChatListingDetails(data.roomId);
      dispatch(
        resetChatCounter({
          roomId: data.roomId,
        })
      );
    });
  }, [chatRoomId]);

  useEffect(() => {
    socket.emit('shareUserInfo', {
      socketId: socket.id,
      email: myEmail,
    });

    socket.on('new_message', (data) => {
      if (myUserId != data.senderId) {
        getChatListingDetails(data.roomId);
      }
    });

    socket.emit('createRoom', { to: providerId, from: myUserId });

    hideTab(props);
    return () => {
      showTab(props);
    };
  }, []);

  const getChatListingDetails = (roomId) => {
    let data = {
      roomId: myRoomId || chatRoomId || roomId,
      pageNum: 1,
      limit: 100,
    };
    dispatch(getChatDetailsInfo(data));
  };

  const onSend = useCallback((messages = []) => {
    let messageBody = {
      roomId: messages.roomId,
      senderId: myUserId,
      receiverId: providerId,
      message: idx(messages, (_) => _.text) || '',
      image: idx(messages, (_) => _.image) || '',
      type: idx(messages, (_) => _.image) ? 2 : 1,
    };

    if (idx(messages, (_) => _.text.length) > 1 || idx(messages, (_) => _.image.length) > 1) {
      socket.emit('sendMessage', messageBody);
      getChatListingDetails(messages.roomId);
    }

    // setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: 'white',
          },
          left: {
            color: '#707070',
          },
        }}
        wrapperStyle={{
          left: styles.leftWrapper,
          right: styles.rightWrapper,
        }}
        containerStyle={{
          right: styles.rightContainer,
          left: styles.leftContainer,
        }}
        // for date container
      />
    );
  };

  const customTime = (props) => {
    return (
      <Time
        {...props}
        timeTextStyle={{
          left: styles.leftTime,
          right: styles.rightTime,
        }}
      />
    );
  };

  const customSend = (props, values) => {
    let customSendMessgae = {
      createdAt: new Date(),
      text: props.text,
      user: { _id: myUserId },
      _id: Math.floor(100000000 + Math.random() * 900000000).toString(),
      roomId: myRoomId || chatRoomId,
    };

    // console.log('STEP1', customSendMessgae);

    return (
      <View style={styles.send}>
        <Pressable
          style={styles.sendIcon}
          onPress={() => {
            onSend(customSendMessgae);
            values.onSend({ text: props.text.trim() }, true);
          }}
        >
          <Image source={Images.send} style={styles.sendImg} />
        </Pressable>
      </View>
    );
  };
  const customToolBar = (values) => {
    return (
      <View style={styles.customInput}>
        <InputToolbar
          renderActions={() => {
            return (
              <Pressable
                onPress={() => openCamera()}
                style={styles.clip}
                disabled={chatImageLoading}
              >
                {chatImageLoading ? (
                  <ActivityIndicator color={globalColors.primaryTheme} />
                ) : (
                  <Image source={Images.paperclip} />
                )}
              </Pressable>
            );
          }}
          renderComposer={(props1) => (
            <Composer
              {...props1}
              textInputStyle={{
                color: 'black',
                alignSelf: 'center',
                fontFamily: globalFonts.regular,
                fontSize: RFValue(11),
                paddingTop: RFValue(10),
              }}
            />
          )}
          renderSend={(props) => customSend(props, values)}
          onTextChanged={values.onTextChanged}
          text={values.text}
          containerStyle={styles.inputCont}
        />
      </View>
    );
  };

  const openCamera = () => {
    const options = { quality: 0.1 };

    launchImageLibrary(options, (res) => {
      let formData = new FormData();

      formData.append('chatImage', {
        uri: res && res.assets && res.assets[0] && res.assets[0].uri,
        name: res && res.assets && res.assets[0] && res.assets[0].fileName,
        type: res && res.assets && res.assets[0] && res.assets[0].type,
      });

      dispatch(
        chatImageUpload(formData, (response) => {
          let customSendMessgae = {
            createdAt: new Date(),
            text: '',
            user: { _id: myUserId },
            _id: Math.floor(100000000 + Math.random() * 900000000),
            image: response,
            roomId: myRoomId,
          };
          onSend(customSendMessgae);
        })
      );
    });
  };

  const renderMessageImage = (props) => {
    return (
      <MessageImage
        {...props}
        imageStyle={{
          width: RFValue(120),
          height: RFValue(80),
          resizeMode: 'contain',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title={providerNmae || 'Provider'} navProps={props} backEnable />
      <GiftedChat
        renderTime={customTime}
        renderBubble={renderBubble}
        renderInputToolbar={customToolBar}
        renderAvatar={null}
        renderMessageImage={renderMessageImage}
        messages={chatDetails}
        user={{
          _id: myUserId,
        }}
        renderLoading={() => {
          return (
            <View style={styles.loader}>
              <ActivityIndicator sizw={'large'} />
            </View>
          );
        }}
        renderChatEmpty={() => (
          <View style={styles.noChat}>
            <Text style={styles.noChatTxt}>No chats found</Text>
          </View>
        )}
      />
    </View>
  );
}
