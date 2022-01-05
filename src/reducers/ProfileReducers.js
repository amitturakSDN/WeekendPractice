import { TYPES } from '@/actions/ProfileActions';

export const profileReducer = (
  state = {
    isAddingAddress: false,
    myAddingAddress: false,
    isInvoice: false,
    savedAddress: null,
    updatingProfile: false,
    myDetails: null,
    myInvoices: [],
    loadingInvoice: false,
  },
  { payload, type }
) => {
  switch (type) {
    case TYPES.ADD_ADDRESS_REQUEST:
      return { ...state, isAddingAddress: true };
    case TYPES.ADD_ADDRESS_SUCCESS:
      return { ...state, isAddingAddress: false, add: payload };
    case TYPES.ADD_ADDRESS_ERROR:
      return { ...state, isAddingAddress: false };

    case TYPES.MY_ADDRESS_REQUEST:
      return { ...state, myAddingAddress: true };
    case TYPES.MY_ADDRESS_SUCCESS:
      return { ...state, myAddingAddress: false, myadd: payload };
    case TYPES.MY_ADDRESS_ERROR:
      return { ...state, myAddingAddress: false };

    case TYPES.MY_ADDRESS_REQUEST:
      return { ...state, isInvoice: true };
    case TYPES.MY_ADDRESS_SUCCESS:
      return { ...state, isInvoice: false, invoice: payload };
    case TYPES.MY_ADDRESS_ERROR:
      return { ...state, isInvoice: false };

    case TYPES.UPDATE_PROFILE_REQUEST:
      return { ...state, updatingProfile: true };
    case TYPES.UPDATE_PROFILE_SUCCESS:
      return { ...state, updatingProfile: false, myDetails: payload };
    case TYPES.UPDATE_PROFILE_ERROR:
      return { ...state, updatingProfile: false };

    case TYPES.INVOICE_REQUEST:
      return { ...state, loadingInvoice: true };
    case TYPES.INVOICE_SUCCESS:
      return { ...state, loadingInvoice: false, myInvoices: payload };
    case TYPES.INVOICE_ERROR:
      return { ...state, loadingInvoice: false };

    case TYPES.SAVED_ADDRESS:
      return { ...state, savedAddress: payload };

    default:
      return state;
  }
};
