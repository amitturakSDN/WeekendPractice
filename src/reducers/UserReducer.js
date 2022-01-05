import { TYPES } from '@/actions/UserActions';

export const userReducer = (
  state = {
    uploadingImage: false,
    fcmToken: null,
    loadingNotification: false,
    notificationList: [],
    user: {},
    allRateImage: [],
    ratingImage: false,
    changingPass: false,
    tokenOnly: null,
    allMyCards: [],
    gettingCard: false,
    addingCard: false,
    selectedCard: null,
  },
  { payload, type }
) => {
  switch (type) {
    case TYPES.LOGIN_REQUEST:
      return { ...state, isLoginRequest: true };
    case TYPES.LOGIN_SUCCESS:
      return { ...state, user: payload.user, isLoginRequest: false, forgotUser: {} };

    case TYPES.JUST_TOKEN:
      return { ...state, tokenOnly: payload };

    case TYPES.LOGIN_ERROR:
      return { ...state, user: {}, isLoginRequest: false };
    case TYPES.FORGOT_PASS_REQUEST:
      return { ...state, isForgotRequest: true };
    case TYPES.FORGOT_PASS_SUCCESS:
      return { ...state, forgotUser: payload, isForgotRequest: false };
    case TYPES.FORGOT_PASS_ERROR:
      return { ...state, forgotUser: {}, isForgotRequest: false };

    case TYPES.REGISTER_REQUEST:
      return { ...state, isSignUpRequest: true };
    case TYPES.REGISTER_SUCCESS:
      return { ...state, isSignUpRequest: false };
    case TYPES.REGISTER_ERROR:
      return { ...state, isSignUpRequest: false };

    case TYPES.CONFIRM_OTP_REQUEST:
      return { ...state, isOtpMatchRequest: true };
    case TYPES.CONFIRM_OTP_SUCCESS:
      return { ...state, isOtpMatchRequest: false };
    case TYPES.CONFIRM_OTP_ERROR:
      return { ...state, isOtpMatchRequest: false };

    case TYPES.RESET_PASS_REQUEST:
      return { ...state, passwordResetRequest: true };
    case TYPES.RESET_PASS_SUCCESS:
      return { ...state, passwordResetRequest: false };
    case TYPES.RESET_PASS_ERROR:
      return { ...state, passwordResetRequest: false };

    case TYPES.UPLOAD_IMAGE_REQUEST:
      return { ...state, uploadingImage: true };
    case TYPES.UPLOAD_IMAGE_SUCCESS:
      return { ...state, uploadingImage: false };
    case TYPES.UPLOAD_IMAGE_ERROR:
      return { ...state, uploadingImage: false };

    case TYPES.SAVE_FCM_TOKEN:
      return { ...state, fcmToken: payload };

    case TYPES.NOTIFICATION_LIST_REQUEST:
      return { ...state, loadingNotification: true };
    case TYPES.NOTIFICATION_LIST_SUCCESS:
      return { ...state, loadingNotification: false, notificationList: payload };
    case TYPES.NOTIFICATION_LIST_ERROR:
      return { ...state, loadingNotification: false };

    case TYPES.RATE_IMAGE_REQUEST:
      return { ...state, ratingImage: true };
    case TYPES.RATE_IMAGE_SUCCESS:
      return { ...state, ratingImage: false, allRateImage: payload };
    case TYPES.RATE_IMAGE_ERROR:
      return { ...state, ratingImage: false };

    case TYPES.CHANGE_PASS_REQUEST:
      return { ...state, changingPass: true };
    case TYPES.CHANGE_PASS_SUCCESS:
      return { ...state, changingPass: false };
    case TYPES.CHANGE_PASS_ERROR:
      return { ...state, changingPass: false };

    case TYPES.ADD_CARD_REQUEST:
      return { ...state, addingCard: true };
    case TYPES.ADD_CARD_SUCCESS:
      return { ...state, addingCard: false };
    case TYPES.ADD_CARD_ERROR:
      return { ...state, addingCard: false };

    case TYPES.GET_CARD_REQUEST:
      return { ...state, gettingCard: true };
    case TYPES.GET_CARD_SUCCESS:
      return { ...state, gettingCard: false, allMyCards: payload };
    case TYPES.GET_CARD_ERROR:
      return { ...state, gettingCard: false };

    case TYPES.SET_CARD:
      return { ...state, selectedCard: payload };

    case TYPES.CLEAR_STORE:
      return { user: {} };
    default:
      return state;
  }
};
