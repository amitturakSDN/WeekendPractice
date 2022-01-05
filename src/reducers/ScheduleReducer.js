import { TYPES } from '@/actions/ScheduleActions';

export const scheduleReducer = (
  state = {
    activeServices: [],
    activeServiceDetail: {},
    cancellingService: false,
    raisingConcern: false,
    ratingLoading: false,
  },
  { payload, type }
) => {
  switch (type) {
    case TYPES.FETCH_ACTIVE_SERVICE_REQUEST:
      return { ...state, isLoginRequest: true };
    case TYPES.FETCH_ACTIVE_SERVICE_SUCCESS:
      return { ...state, activeServices: payload.activeServices, isLoginRequest: false };
    case TYPES.FETCH_ACTIVE_SERVICE_ERROR:
      return { ...state, isLoginRequest: false };

    case TYPES.GET_ACTIVE_SERVICE_DETAIL_REQUEST:
      return { ...state, isServiceDetailrequest: true };
    case TYPES.GET_ACTIVE_SERVICE_DETAIL_SUCCESS:
      return { ...state, isServiceDetailrequest: false, activeServiceDetail: payload };
    case TYPES.GET_ACTIVE_SERVICE_DETAIL_ERROR:
      return { ...state, isServiceDetailrequest: false };

    case TYPES.CANCEL_SERVICE_REQUEST:
      return { ...state, cancellingService: true };
    case TYPES.CANCEL_SERVICE_SUCCESS:
      return { ...state, cancellingService: false };
    case TYPES.CANCEL_SERVICE_ERROR:
      return { ...state, cancellingService: false };

    case TYPES.RAISE_CONCERN_REQUEST:
      return { ...state, raisingConcern: true };
    case TYPES.RAISE_CONCERN_SUCCESS:
      return { ...state, raisingConcern: false };
    case TYPES.RAISE_CONCERN_ERROR:
      return { ...state, raisingConcern: false };

    case TYPES.RATE_REQUEST:
      return { ...state, ratingLoading: true };
    case TYPES.RATE_SUCCESS:
      return { ...state, ratingLoading: false };
    case TYPES.RATE_ERROR:
      return { ...state, ratingLoading: false };

    case TYPES.CLEAR_STORE:
      return {};
    default:
      return state;
  }
};
