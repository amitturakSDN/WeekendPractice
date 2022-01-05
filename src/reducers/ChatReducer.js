import { TYPES } from '@/actions/ChatActions';

export const chatReducer = (
  state = {
    allActiveChats: [],
    loadingActiveChats: false,
    loadingDetails: false,
    chatDetails: [],
    roomId: null,
    chatImageLoading: false,
  },
  { payload, type }
) => {
  switch (type) {
    case TYPES.ACTIVE_CHAT_REQUEST:
      return { ...state, loadingActiveChats: true };
    case TYPES.ACTIVE_CHAT_SUCCESS:
      return { ...state, loadingActiveChats: false, allActiveChats: payload };
    case TYPES.ACTIVE_CHAT_ERROR:
      return { ...state, loadingActiveChats: false };

    case TYPES.CHAT_DETAILS_REQUEST:
      return { ...state, loadingDetails: true };
    case TYPES.CHAT_DETAILS_SUCCESS:
      return { ...state, loadingDetails: false, chatDetails: payload };
    case TYPES.CHAT_DETAILS_ERROR:
      return { ...state, loadingDetails: false };

    case TYPES.CHAT_IMAGE_REQUEST:
      return { ...state, chatImageLoading: true };
    case TYPES.CHAT_IMAGE_SUCCESS:
      return { ...state, chatImageLoading: false };
    case TYPES.CHAT_IMAGE_ERROR:
      return { ...state, chatImageLoading: false };

    case TYPES.ROOM_ID:
      return { ...state, roomId: payload };

    case TYPES.CLEAR_STORE:
      return state;
    default:
      return state;
  }
};
