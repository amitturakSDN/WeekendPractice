import { UserController } from '@/controllers';
import { ServicesController } from '@/controllers/ServicesController';
import idx from 'idx';
import Toast from 'react-native-simple-toast';
import { logout } from './UserActions';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',
  LOGIN: 'LOGIN',
  FETCH_ACTIVE_SERVICE_REQUEST: 'FETCH_ACTIVE_SERVICE_REQUEST',
  FETCH_ACTIVE_SERVICE_ERROR: 'FETCH_ACTIVE_SERVICE_ERROR',
  FETCH_ACTIVE_SERVICE_SUCCESS: 'FETCH_ACTIVE_SERVICE_SUCCESS',
  GET_ACTIVE_SERVICE_DETAIL_REQUEST: 'GET_ACTIVE_SERVICE_DETAIL_REQUEST',
  GET_ACTIVE_SERVICE_DETAIL_SUCCESS: 'GET_ACTIVE_SERVICE_DETAIL_SUCCESS',
  GET_ACTIVE_SERVICE_DETAIL_ERROR: 'GET_ACTIVE_SERVICE_DETAIL_ERROR',

  CANCEL_SERVICE_REQUEST: 'CANCEL_SERVICE_REQUEST',
  CANCEL_SERVICE_SUCCESS: 'CANCEL_SERVICE_SUCCESS',
  CANCEL_SERVICE_ERROR: 'CANCEL_SERVICE_ERROR',

  RAISE_CONCERN_REQUEST: 'RAISE_CONCERN_REQUEST',
  RAISE_CONCERN_SUCCESS: 'RAISE_CONCERN_SUCCESS',
  RAISE_CONCERN_ERROR: 'RAISE_CONCERN_ERROR',

  RATE_REQUEST: 'RATE_REQUEST',
  RATE_SUCCESS: 'RATE_SUCCESS',
  RATE_ERROR: 'RATE_ERROR',
};

const getActiveRequest = () => ({
  type: TYPES.FETCH_ACTIVE_SERVICE_REQUEST,
  payload: null,
});

const getActiveSuccess = (activeServices) => ({
  type: TYPES.FETCH_ACTIVE_SERVICE_SUCCESS,
  payload: { activeServices },
});

const getActiveError = (error) => ({
  type: TYPES.FETCH_ACTIVE_SERVICE_ERROR,
  payload: { error },
});

const getServiceDetailRequest = () => ({
  type: TYPES.GET_ACTIVE_SERVICE_DETAIL_REQUEST,
});
const getServiceDetailSuccess = (payload) => ({
  type: TYPES.GET_ACTIVE_SERVICE_DETAIL_SUCCESS,
  payload,
});
const getServiceDetailError = () => ({
  type: TYPES.GET_ACTIVE_SERVICE_DETAIL_ERROR,
});

const cancelServiceRequest = () => ({
  type: TYPES.CANCEL_SERVICE_REQUEST,
});
const cancelServiceSuccess = () => ({
  type: TYPES.CANCEL_SERVICE_SUCCESS,
});
const cancelServiceError = () => ({
  type: TYPES.CANCEL_SERVICE_ERROR,
});

const raiseConcernRequest = () => ({
  type: TYPES.RAISE_CONCERN_REQUEST,
});
const raiseConcernSuccess = () => ({
  type: TYPES.RAISE_CONCERN_SUCCESS,
});
const raiseConcernError = () => ({
  type: TYPES.RAISE_CONCERN_ERROR,
});

const rateProviderRequest = () => ({
  type: TYPES.RATE_REQUEST,
});
const rateProviderSuccess = () => ({
  type: TYPES.RATE_SUCCESS,
});
const rateProviderError = () => ({
  type: TYPES.RATE_ERROR,
});

export const getActiveService = (hideLoader, data) => async (dispatch) => {
  hideLoader ? null : dispatch(getActiveRequest());
  try {
    const response = await ServicesController.getActiveServices(data);
    let activeServices = idx(response, (_) => _.response.data.list);
    dispatch(getActiveSuccess(activeServices));
  } catch (error) {
    // Toast.show(error.message || error);
    if (error.statusCode == 401) {
      dispatch(logout());
    }
    dispatch(getActiveError(error));
  }
};

export const getServiceDetail = (data, disableLoader) => async (dispatch) => {
  disableLoader ? null : dispatch(getServiceDetailRequest());
  try {
    const response = await ServicesController.getActiveServicesDetail(data);
    let activeServices = idx(response, (_) => _.response.data.list[0]);
    dispatch(getServiceDetailSuccess(activeServices));
  } catch (error) {
    Toast.show(error.message || error);
    dispatch(getServiceDetailError(error));
  }
};

export const updateServiceStatus = (data) => async (dispatch) => {
  dispatch(cancelServiceRequest());

  try {
    const response = await ServicesController.cancelService(data);
    dispatch(cancelServiceSuccess());
    dispatch(
      getActiveService(true, {
        pageNum: 0,
        limit: 100,
        status: [0, 1, 2, 3],
      })
    );
  } catch (error) {
    Toast.show(error.message || error);
    dispatch(cancelServiceError());
  }
};

export const raiseConcern = (data) => async (dispatch) => {
  dispatch(raiseConcernRequest());

  try {
    const response = await ServicesController.raiseServiceConcern(data);
    dispatch(raiseConcernSuccess());
    Toast.show('Your complain has been successfully reported.');
  } catch (error) {
    Toast.show(error.message || error);
    dispatch(raiseConcernError());
  }
};

export const rateProvider = (data) => async (dispatch) => {
  dispatch(rateProviderRequest());

  try {
    const response = await ServicesController.rateProvider(data);
    dispatch(rateProviderSuccess());
    dispatch(getServiceDetail({ serviceRequestId: data.serviceRequestId }));

    Toast.show('Your rating has been submitted.');
  } catch (error) {
    Toast.show(error.message || error);
    dispatch(rateProviderError());
  }
};
