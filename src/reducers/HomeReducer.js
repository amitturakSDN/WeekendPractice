import { TYPES } from '@/actions/HomeActions';

export const homeReducer = (
  state = {
    selectedServices: [],
    serviceQuestionaire: [],
    serViceDetails: {},
    addressDetails: {},
    taxValue: 0,
    rescheduling: false,
    serviceList: [],
    serviceQuestions: [],
  },
  { payload, type }
) => {
  let serviceInCart = state.selectedServices;
  switch (type) {
    case TYPES.SERVICE_LIST_REQUEST:
      return { ...state, isFetchingServiceList: true };
    case TYPES.SERVICE_LIST_SUCCESS:
      return { ...state, serviceList: payload.list, isFetchingServiceList: false };
    case TYPES.SERVICE_LIST_ERROR:
      return { ...state, serviceList: [], isFetchingServiceList: false };

    case TYPES.ADD_SELECTED_SERVICE:
      serviceInCart.push(payload);
      return { ...state, selectedServices: serviceInCart };
    case TYPES.CLEAN_CART:
      return { ...state, selectedServices: [] };

    case TYPES.REMOVE_SELECTED_SERVICE:
      for (let key in serviceInCart) {
        if (serviceInCart[key]._id == payload._id) {
          serviceInCart.splice(key, 1);
        }
      }
      return { ...state, selectedServices: serviceInCart };

    case TYPES.CLEAR_SELECTED_SERVICES:
      serviceInCart.length = 0;
      return { ...state, selectedServices: serviceInCart };

    case TYPES.SET_SERVICE_QUESTIONS:
      return { ...state, serviceQuestionaire: payload };

    case TYPES.CLEAR_SERVICE_QUESTIONS:
      return { ...state, serviceQuestionaire: [] };

    case TYPES.SET_SERVICE_DETAILS:
      return { ...state, serViceDetails: payload };

    case TYPES.SET_ADDRESS_DETAILS:
      return { ...state, addressDetails: payload };

    case TYPES.CREATE_SERVICE_REQUEST:
      return { ...state, isServiceRequest: true };

    case TYPES.CREATE_SERVICE_SUCCESS:
      return { ...state, isServiceRequest: false };
    case TYPES.CREATE_SERVICE_ERROR:
      return { ...state, isServiceRequest: false };

    case TYPES.RESCHEDULE_REQUEST:
      return { ...state, rescheduling: true };

    case TYPES.RESCHEDULE_SUCCESS:
      return { ...state, rescheduling: false };
    case TYPES.RESCHEDULE_ERROR:
      return { ...state, rescheduling: false };

    case TYPES.GET_QUESTIONAIRE_REQUEST:
      return { ...state, isServiceQuestionRequest: true };

    case TYPES.GET_QUESTIONAIRE_SUCCESS:
      return { ...state, isServiceQuestionRequest: false, serviceQuestions: payload };
    case TYPES.GET_QUESTIONAIRE_ERROR:
      return { ...state, isServiceQuestionRequest: false };

    case TYPES.GET_TAX_SUCCESS:
      return { ...state, taxValue: payload };
    default:
      return state;
  }
};
