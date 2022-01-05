import { TYPES } from '@/actions/PersistActions';

export const persistReducer = (
  state = {
    infoModalStatus: false,
    alreadyDisplayed: false,
  },
  { payload, type }
) => {
  switch (type) {
    case TYPES.HIDE_MODAL:
      return { ...state, infoModalStatus: payload, alreadyDisplayed: true };

    default:
      return state;
  }
};
