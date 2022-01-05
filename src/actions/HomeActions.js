import Toast from 'react-native-simple-toast';
import { HomeController } from '@/controllers/HomeController';
import { getActiveService, getServiceDetail } from '@/actions/ScheduleActions';
import { selectedAddress } from './ProfileActions';
import { logout } from './UserActions';
import idx from 'idx';

export const TYPES = {
  SERVICE_LIST_REQUEST: 'SERVICE_LIST_REQUEST',
  SERVICE_LIST_ERROR: 'SERVICE_LIST_ERROR',
  SERVICE_LIST_SUCCESS: 'SERVICE_LIST_SUCCESS',
  ADD_SELECTED_SERVICE: 'ADD_SELECTED_SERVICE',
  REMOVE_SELECTED_SERVICE: 'REMOVE_SELECTED_SERVICE',
  CLEAR_SELECTED_SERVICES: 'CLEAR_SELECTED_SERVICES',
  SET_SERVICE_QUESTIONS: 'SET_SERVICE_QUESTIONS',
  CLEAR_SERVICE_QUESTIONS: 'CLEAR_SERVICE_QUESTIONS',
  SET_SERVICE_DETAILS: 'SET_SERVICE_DETAILS',
  CLEAR_SERVICE_DETAILS: 'CLEAR_SERVICE_DETAILS',
  CREATE_SERVICE_REQUEST: 'CREATE_SERVICE_REQUEST',
  CREATE_SERVICE_ERROR: 'CREATE_SERVICE_ERROR',
  CREATE_SERVICE_SUCCESS: 'CREATE_SERVICE_SUCCESS',
  GET_QUESTIONAIRE_REQUEST: 'GET_QUESTIONAIRE_REQUEST',
  GET_QUESTIONAIRE_ERROR: 'GET_QUESTIONAIRE_ERROR',
  GET_QUESTIONAIRE_SUCCESS: 'GET_QUESTIONAIRE_SUCCESS',

  SET_ADDRESS_DETAILS: 'SET_ADDRESS_DETAILS',

  RESCHEDULE_REQUEST: 'RESCHEDULE_REQUEST',
  RESCHEDULE_ERROR: 'RESCHEDULE_ERROR',
  RESCHEDULE_SUCCESS: 'RESCHEDULE_SUCCESS',
  CLEAN_CART: 'CLEAN_CART',

  GET_TAX_REQUEST: 'GET_TAX_REQUEST',
  GET_TAX_ERROR: 'GET_TAX_ERROR',
  GET_TAX_SUCCESS: 'GET_TAX_SUCCESS',
};

const serviceListRequest = () => ({
  type: TYPES.SERVICE_LIST_REQUEST,
  payload: null,
});

const serviceListSuccess = (payload) => ({
  type: TYPES.SERVICE_LIST_SUCCESS,
  payload,
});

const serviceListError = () => ({
  type: TYPES.SERVICE_LIST_ERROR,
});

const createServiceRequest = () => ({
  type: TYPES.CREATE_SERVICE_REQUEST,
});

const createServiceSuccess = (payload) => ({
  type: TYPES.CREATE_SERVICE_SUCCESS,
  payload,
});
const createServiceError = () => ({
  type: TYPES.CREATE_SERVICE_ERROR,
});

const getQuestionaireRequest = () => ({
  type: TYPES.GET_QUESTIONAIRE_REQUEST,
});

const getQuestionaireSuccess = (payload) => ({
  type: TYPES.GET_QUESTIONAIRE_SUCCESS,
  payload,
});
const getQuestionaireError = () => ({
  type: TYPES.GET_QUESTIONAIRE_ERROR,
});

const rescheduleRequest = () => ({
  type: TYPES.RESCHEDULE_REQUEST,
});

const rescheduleSuccess = (payload) => ({
  type: TYPES.RESCHEDULE_SUCCESS,
  payload,
});
const rescheduleError = () => ({
  type: TYPES.RESCHEDULE_ERROR,
});

const taxRequest = () => ({
  type: TYPES.GET_TAX_REQUEST,
});

const taxSuccess = (payload) => ({
  type: TYPES.GET_TAX_SUCCESS,
  payload,
});
const taxError = () => ({
  type: TYPES.GET_TAX_ERROR,
});

export const getServiceList = (data, hideLoader, cb) => async (dispatch) => {
  if (!hideLoader) {
    dispatch(serviceListRequest());
  }
  try {
    const user = await HomeController.getServiceLists(data);
    // Toast.show(user.response.message);
    cb(user.response);
    dispatch(serviceListSuccess(user.response.data));
  } catch (error) {
    cb(false);
    if (error.statusCode == 401) {
      dispatch(logout());
    }
    dispatch(serviceListError());
  }
};

export const addServicesToCart = (data) => async (dispatch) => {
  dispatch({ type: TYPES.ADD_SELECTED_SERVICE, payload: data });
};

export const clearCart = (data) => async (dispatch) => {
  dispatch({ type: TYPES.CLEAN_CART, payload: [] });
};

export const removeServicesFromCart = (data) => async (dispatch) => {
  dispatch({ type: TYPES.REMOVE_SELECTED_SERVICE, payload: data });
};

export const clearServiceInCart = () => async (dispatch) => {
  dispatch({ type: TYPES.CLEAR_SELECTED_SERVICES });
};

export const setServiceQuestionaire = (data) => async (dispatch) => {
  dispatch({ type: TYPES.SET_SERVICE_QUESTIONS, payload: data });
};

export const clearServiceQuestionaire = () => async (dispatch) => {
  dispatch({ type: TYPES.CLEAR_SERVICE_QUESTIONS });
};

export const setServiceDetails = (data) => async (dispatch) => {
  dispatch({ type: TYPES.SET_SERVICE_DETAILS, payload: data });
};

export const setAddressDetails = (data) => async (dispatch) => {
  dispatch({ type: TYPES.SET_ADDRESS_DETAILS, payload: data });
};

export const clearServiceDetails = () => async (dispatch) => {
  dispatch({ type: TYPES.CLEAR_SERVICE_DETAILS });
};

export const createService = (data, cb) => async (dispatch, getState) => {
  console.log(data, 'datadatadata');
  dispatch(createServiceRequest());

  try {
    const user = await HomeController.createServiceRequest(data);
    dispatch(createServiceSuccess(user.response.data));
    cb(user.response);
    dispatch(selectedAddress(null));
  } catch (error) {
    Toast.show(error.message || error);
    cb(false);
    dispatch(createServiceError());
  }
};

export const getQuestionaire = (cb) => async (dispatch) => {
  dispatch(getQuestionaireRequest());
  try {
    const user = await HomeController.getSeriveQuestion();
    cb(user.response);
    dispatch(getQuestionaireSuccess(user.response.data.questionnaire));
  } catch (error) {
    Toast.show(error.message || error);
    cb(false);
    dispatch(getQuestionaireError());
  }
};

export const getTaxValue = () => async (dispatch) => {
  try {
    const user = await HomeController.getTax();
    dispatch(taxSuccess(user.response.data.taxPercentage));
  } catch (error) {
    Toast.show(error.message || error);
  }
};

export const rescheduleService = (data) => async (dispatch) => {
  dispatch(rescheduleRequest());
  try {
    const response = await HomeController.rescheduleService(data);
    dispatch(rescheduleSuccess());
    dispatch(
      getActiveService(true, {
        pageNum: 0,
        limit: 100,
        status: [0, 1, 2, 3],
      })
    );
    dispatch(getServiceDetail({ serviceRequestId: data.serviceRequestId }, true));
  } catch (error) {
    dispatch(rescheduleError());
    Toast.show(error.message || error);
  }
};
