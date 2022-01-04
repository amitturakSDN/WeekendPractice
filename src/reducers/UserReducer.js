import { TYPES } from '@/actions/UserActions';

export const userReducer = (
  state = {
    fcmToken: null,
    user: {},
  },
  { payload, type }
) => {
  switch (type) {
    
    case TYPES.LOGIN_REQUEST:
      return { ...state, isLoginRequest: true };
    case TYPES.LOGIN_SUCCESS:
      return { ...state, user: payload.user, isLoginRequest: false, };
      case TYPES.LOGIN_ERROR:
        return { ...state, user: {}, isLoginRequest: false };

    case TYPES.JUST_TOKEN:
      return { ...state, tokenOnly: payload };

    case TYPES.REGISTER_REQUEST:
      return { ...state, isSignUpRequest: true };
    case TYPES.REGISTER_SUCCESS:
      return { ...state, isSignUpRequest: false };
    case TYPES.REGISTER_ERROR:
      return { ...state, isSignUpRequest: false };


    case TYPES.SAVE_FCM_TOKEN:
      return { ...state, fcmToken: payload };


    case TYPES.CLEAR_STORE:
      return { user: {} };
    default:
      return state;
  }
};
