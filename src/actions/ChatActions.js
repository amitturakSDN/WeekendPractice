import { ChatController } from '@/controllers/ChatController';
import idx from 'idx';
import Toast from 'react-native-simple-toast';
import { imageBaseUrl } from '@/controllers/ApiList';
export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',
  ACTIVE_CHAT_REQUEST: 'ACTIVE_CHAT_REQUEST',
  ACTIVE_CHAT_ERROR: 'ACTIVE_CHAT_ERROR',
  ACTIVE_CHAT_SUCCESS: 'ACTIVE_CHAT_SUCCESS',

  CHAT_DETAILS_REQUEST: 'CHAT_DETAILS_REQUEST',
  CHAT_DETAILS_ERROR: 'CHAT_DETAILS_ERROR',
  CHAT_DETAILS_SUCCESS: 'CHAT_DETAILS_SUCCESS',

  CHAT_IMAGE_REQUEST: 'CHAT_IMAGE_REQUEST',
  CHAT_IMAGE_ERROR: 'CHAT_IMAGE_ERROR',
  CHAT_IMAGE_SUCCESS: 'CHAT_IMAGE_SUCCESS',

  ROOM_ID: 'ROOM_ID',
};

const activeChatRequest = () => ({
  type: TYPES.ACTIVE_CHAT_REQUEST,
  payload: null,
});

const activeChatSuccess = (activeChats) => ({
  type: TYPES.ACTIVE_CHAT_SUCCESS,
  payload: activeChats,
});

const activeChatError = (error) => ({
  type: TYPES.ACTIVE_CHAT_ERROR,
  payload: { error },
});

const chatDetailsRequest = () => ({
  type: TYPES.CHAT_DETAILS_REQUEST,
  payload: null,
});

const chatDetailsSuccess = (chatDetails) => ({
  type: TYPES.CHAT_DETAILS_SUCCESS,
  payload: chatDetails,
});

const chatDetailsError = (error) => ({
  type: TYPES.CHAT_DETAILS_ERROR,
  payload: { error },
});

const chatImageRequest = () => ({
  type: TYPES.CHAT_IMAGE_REQUEST,
  payload: null,
});

const chatImageSuccess = () => ({
  type: TYPES.CHAT_IMAGE_SUCCESS,
});

const chatImageError = (error) => ({
  type: TYPES.CHAT_IMAGE_ERROR,
  payload: { error },
});

const saveRoomIdCreated = (roomId) => ({
  type: TYPES.ROOM_ID,
  payload: roomId,
});

export const getActiveChats = (data) => async (dispatch) => {
  dispatch(activeChatRequest());

  try {
    const response = await ChatController.getActiveChats(data);
    let chatList = idx(response, (_) => _.response.data.list);
    dispatch(activeChatSuccess(chatList));
  } catch (error) {
    // Toast.show(error.message || error);
    dispatch(activeChatError());
  }
};

export const getChatDetailsInfo = (data) => async (dispatch, getState) => {
  dispatch(chatDetailsRequest());
  try {
    const response = await ChatController.getChatDetails(data);
    let chatList = idx(response, (_) => _.response.data);
    let messageModified = [];
    chatList.map((item, index) => {
      let receiverId = idx(item, (_) => _.senderData._id);
      let receiverName = idx(item, (_) => _.senderData.firstName);

      messageModified.push({
        _id: item.messageData._id,
        text: item.messageData.message,
        createdAt: item.messageData.createdAt,
        image: item.messageData.image,

        user: {
          _id: receiverId,
          name: receiverName,
        },
      });
    });

    dispatch(chatDetailsSuccess(messageModified));
    dispatch(
      getActiveChats({
        pageNum: 0,
        limit: 100,
        status: [1, 2, 3, 4, 5, 6],
      })
    );
  } catch (error) {
    dispatch(chatDetailsError());
  }
};

export const saveRoomId = (roomId) => async (dispatch) => {
  dispatch(saveRoomIdCreated(roomId));
};

export const chatImageUpload = (data, cb) => async (dispatch) => {
  dispatch(chatImageRequest());

  try {
    const response = await ChatController.chatImageUpload(data);
    let imageUrl = `${imageBaseUrl}${idx(response, (_) => _.response.data.src)}`;
    cb(imageUrl);
    dispatch(chatImageSuccess());
  } catch (error) {
    cb(false);

    dispatch(chatImageError(error));

    Toast.show(error.message || error);
  }
};

export const resetChatCounter = (serviceData) => async (dispatch) => {
  try {
    let counterClear = await ChatController.resetChatCounter(serviceData);
  } catch (error) {
    Toast.show(error.message || error);
  }
};
