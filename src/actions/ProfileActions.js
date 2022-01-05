import { ProfileController } from '@/controllers/ProfileController';
import Toast from 'react-native-simple-toast';
import { clearServiceDetails } from './HomeActions';
import idx from 'idx';

export const TYPES = {
  ADD_ADDRESS_REQUEST: 'ADD_ADDRESS_REQUEST',
  ADD_ADDRESS_ERROR: 'ADD_ADDRESS_ERROR',
  ADD_ADDRESS_SUCCESS: 'ADD_ADDRESS_SUCCESS',

  UPDATE_ADDRESS_REQUEST: 'UPDATE_ADDRESS_REQUEST',
  UPDATE_ADDRESS_ERROR: 'UPDATE_ADDRESS_ERROR',
  UPDATE_ADDRESS_SUCCESS: 'UPDATE_ADDRESS_SUCCESS',

  DELETE_ADDRESS_REQUEST: 'DELETE_ADDRESS_REQUEST',
  DELETE_ADDRESS_ERROR: 'DELETE_ADDRESS_ERROR',
  DELETE_ADDRESS_SUCCESS: 'DELETE_ADDRESS_SUCCESS',

  MY_ADDRESS_REQUEST: 'MY_ADDRESS_REQUEST',
  MY_ADDRESS_ERROR: 'MY_ADDRESS_ERROR',
  MY_ADDRESS_SUCCESS: 'MY_ADDRESS_SUCCESS',

  INVOICE_REQUEST: 'INVOICE_REQUEST',
  INVOICE_ERROR: 'INVOICE_ERROR',
  INVOICE_SUCCESS: 'INVOICE_SUCCESS',

  UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_ERROR: 'UPDATE_PROFILE_ERROR',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',

  LOADER_REQUEST: 'LOADER_REQUEST',
  LOADER_FAIL: 'LOADER_FAIL',
  LOADER_SUCCESS: 'LOADER_SUCCESS',

  INVOICE_REQUEST: 'INVOICE_REQUEST',
  INVOICE_FAIL: 'INVOICE_FAIL',
  INVOICE_SUCCESS: 'INVOICE_SUCCESS',

  SAVED_ADDRESS: 'SAVED_ADDRESS',
};

const loaderRequest = () => ({
  type: TYPES.LOADER_REQUEST,
});

const loaderSuccess = (user) => ({
  type: TYPES.LOADER_SUCCESS,
});
const loaderError = () => ({
  type: TYPES.LOADER_FAIL,
});

const addAddressRequest = () => ({
  type: TYPES.ADD_ADDRESS_REQUEST,
});
const addAddressSuccess = (value) => ({
  type: TYPES.ADD_ADDRESS_SUCCESS,
  payload: value,
});
const addAddressError = () => ({
  type: TYPES.ADD_ADDRESS_ERROR,
});

const updateAddressRequest = () => ({
  type: TYPES.UPDATE_ADDRESS_REQUEST,
});
const updateAddressSuccess = (value) => ({
  type: TYPES.UPDATE_ADDRESS_SUCCESS,
  payload: value,
});
const updateAddressError = () => ({
  type: TYPES.UPDATE_ADDRESS_ERROR,
});

const deleteAddressRequest = () => ({
  type: TYPES.DELETE_ADDRESS_REQUEST,
});
const deleteAddressSuccess = (value) => ({
  type: TYPES.DELETE_ADDRESS_SUCCESS,
  payload: value,
});
const deleteAddressError = () => ({
  type: TYPES.DELETE_ADDRESS_ERROR,
});

const myAddressRequest = () => ({
  type: TYPES.MY_ADDRESS_REQUEST,
});
const myAddressSuccess = (value) => ({
  type: TYPES.MY_ADDRESS_SUCCESS,
  payload: value,
});
const myAddressError = () => ({
  type: TYPES.MY_ADDRESS_ERROR,
});

const invoiceRequest = () => ({
  type: TYPES.INVOICE_REQUEST,
});
const invoiceSuccess = (value) => ({
  type: TYPES.INVOICE_SUCCESS,
  payload: value,
});
const invoiceError = () => ({
  type: TYPES.INVOICE_ERROR,
});

const savedAddress = (data) => ({
  type: TYPES.SAVED_ADDRESS,
  payload: data,
});

const updateProfileRequest = () => ({
  type: TYPES.UPDATE_PROFILE_REQUEST,
});
const updateProfileSuccess = (value) => ({
  type: TYPES.UPDATE_PROFILE_SUCCESS,
  payload: value,
});
const updateProfileError = () => ({
  type: TYPES.UPDATE_PROFILE_ERROR,
});

export const selectedAddress = (data) => async (dispatch) => {
  dispatch(savedAddress(data));
};

export const setAddAddressDetails = (data) => async (dispatch) => {
  dispatch(addAddressRequest());
  try {
    const response = await ProfileController.addAddressDetails(data);
    dispatch(addAddressSuccess(response));
    dispatch(getMyAddressDetails());
  } catch (error) {
    dispatch(addAddressError());
  }
};

export const updateAddressDetails = (data) => async (dispatch) => {
  dispatch(updateAddressRequest());
  try {
    const response = await ProfileController.updateAddressDetails(data);
    dispatch(updateAddressSuccess(response));
    dispatch(getMyAddressDetails());
  } catch (error) {
    dispatch(updateAddressError());
  }
};

export const deleteAddressDetails = (data) => async (dispatch) => {
  dispatch(deleteAddressRequest());
  try {
    const response = await ProfileController.deleteAddressDetails(data);
    dispatch(deleteAddressSuccess(response));
    dispatch(getMyAddressDetails());
  } catch (error) {
    dispatch(deleteAddressError());
  }
};

export const getMyAddressDetails = (data) => async (dispatch) => {
  dispatch(myAddressRequest());

  try {
    const response = await ProfileController.myAddressDetails(data);
    dispatch(myAddressSuccess(response.response.data));
  } catch (error) {
    dispatch(myAddressError());
  }
};

export const setInvoiceDetails = (data) => async (dispatch) => {
  dispatch(invoiceRequest());
  try {
    const response = await ProfileController.invoiceDetails(data);
    dispatch(invoiceSuccess(response));
  } catch (error) {
    dispatch(invoiceError());
  }
};

export const updateMyProfile = (data) => async (dispatch) => {
  dispatch(updateProfileRequest());
  try {
    const response = await ProfileController.updateProfile(data);
    dispatch(updateProfileSuccess(response));
    dispatch(getMyAddressDetails());
    Toast.show('Profile successfully updated.');
  } catch (error) {
    dispatch(updateProfileError());
  }
};

export const getMyInvoices = (data) => async (dispatch) => {
  dispatch(invoiceRequest());
  try {
    const response = await ProfileController.invoice(data);
    console.log(response, 'responseresponseresponse');

    let invoiceListing = idx(response, (_) => _.response.data.list[0].customerData.serviceReqData);
    dispatch(invoiceSuccess(invoiceListing));
  } catch (error) {
    dispatch(invoiceError());
  }
};
