import { TYPES } from '@/actions/UserActions';

export const loaderReducer = (
  state = {
    loading: false,
  },
  { payload, type }
) => {
  switch (type) {
    case TYPES.LOADER_REQUEST:
      return { ...state, loading: true };
    case TYPES.LOADER_SUCCESS:
      return { ...state, loading: false };
    case TYPES.LOADER_FAIL:
      return { ...state, loading: false };

    case TYPES.CLEAR_STORE:
      return state;
    default:
      return state;
  }
};
