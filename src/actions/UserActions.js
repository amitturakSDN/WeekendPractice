import { UserController } from '@/controllers';
import { ChatController } from '@/controllers/ChatController';
import AsyncStorage from '@react-native-async-storage/async-storage';
import idx from 'idx';
import Toast from 'react-native-simple-toast';
import { getMyAddressDetails } from './ProfileActions';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_ERROR: 'REGISTER_ERROR',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  FORGOT_PASS_REQUEST: 'FORGOT_PASS_REQUEST',
  FORGOT_PASS_ERROR: 'FORGOT_PASS_ERROR',
  FORGOT_PASS_SUCCESS: 'FORGOT_PASS_SUCCESS',
  CONFIRM_OTP_REQUEST: 'CONFIRM_OTP_REQUEST',
  CONFIRM_OTP_ERROR: 'CONFIRM_OTP_ERROR',
  CONFIRM_OTP_SUCCESS: 'CONFIRM_OTP_SUCCESS',
  RESET_PASS_REQUEST: 'RESET_PASS_REQUEST',
  RESET_PASS_ERROR: 'RESET_PASS_ERROR',
  RESET_PASS_SUCCESS: 'RESET_PASS_SUCCESS',
  UPLOAD_IMAGE_REQUEST: 'UPLOAD_IMAGE_REQUEST',
  UPLOAD_IMAGE_ERROR: 'UPLOAD_IMAGE_ERROR',
  UPLOAD_IMAGE_SUCCESS: 'UPLOAD_IMAGE_SUCCESS',

  NOTIFICATION_LIST_REQUEST: 'NOTIFICATION_LIST_REQUEST',
  NOTIFICATION_LIST_ERROR: 'NOTIFICATION_LIST_ERROR',
  NOTIFICATION_LIST_SUCCESS: 'NOTIFICATION_LIST_SUCCESS',

  LOADER_REQUEST: 'LOADER_REQUEST',
  LOADER_FAIL: 'LOADER_FAIL',
  LOADER_SUCCESS: 'LOADER_SUCCESS',

  RATE_IMAGE_REQUEST: 'RATE_IMAGE_REQUEST',
  RATE_IMAGE_ERROR: 'RATE_IMAGE_ERROR',
  RATE_IMAGE_SUCCESS: 'RATE_IMAGE_SUCCESS',

  SAVE_FCM_TOKEN: 'SAVE_FCM_TOKEN',

  CHANGE_PASS_REQUEST: 'CHANGE_PASS_REQUEST',
  CHANGE_PASS_ERROR: 'CHANGE_PASS_ERROR',
  CHANGE_PASS_SUCCESS: 'CHANGE_PASS_SUCCESS',
  JUST_TOKEN: 'JUST_TOKEN',

  GET_CARD_REQUEST: 'GET_CARD_REQUEST',
  GET_CARD_ERROR: 'GET_CARD_ERROR',
  GET_CARD_SUCCESS: 'GET_CARD_SUCCESS',

  ADD_CARD_REQUEST: 'ADD_CARD_REQUEST',
  ADD_CARD_ERROR: 'ADD_CARD_ERROR',
  ADD_CARD_SUCCESS: 'ADD_CARD_SUCCESS',

  DELETE_CARD_REQUEST: 'DELETE_CARD_REQUEST',
  DELETE_CARD_ERROR: 'DELETE_CARD_ERROR',
  DELETE_CARD_SUCCESS: 'DELETE_CARD_SUCCESS',

  SET_CARD: 'SET_CARD',
};

const loginRequest = () => ({
  type: TYPES.LOGIN_REQUEST,
  payload: null,
});

const loginSuccess = (user) => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: { user },
});

const loginError = (error) => ({
  type: TYPES.LOGIN_ERROR,
  payload: { error },
});

const loaderRequest = () => ({
  type: TYPES.LOADER_REQUEST,
});

const loaderSuccess = (user) => ({
  type: TYPES.LOADER_SUCCESS,
});

const loaderError = () => ({
  type: TYPES.LOADER_FAIL,
});

const registerRequest = () => ({
  type: TYPES.REGISTER_REQUEST,
  payload: null,
});

const registerSuccess = (user) => ({
  type: TYPES.REGISTER_SUCCESS,
  payload: { user },
});

const registerError = (error) => ({
  type: TYPES.REGISTER_ERROR,
  payload: { error },
});

const forgotPassRequest = () => ({
  type: TYPES.FORGOT_PASS_REQUEST,
});

const forgotPassSuccess = (payload) => ({
  type: TYPES.FORGOT_PASS_SUCCESS,
  payload,
});

const forgotPassError = (payload) => ({
  type: TYPES.FORGOT_PASS_ERROR,
  payload,
});

const confirmOTPRequest = () => ({
  type: TYPES.CONFIRM_OTP_REQUEST,
});

const confirmOTPSuccess = (payload) => ({
  type: TYPES.CONFIRM_OTP_SUCCESS,
  payload,
});

const confirmOTPError = (payload) => ({
  type: TYPES.CONFIRM_OTP_ERROR,
  payload,
});
const resetPassRequest = () => ({
  type: TYPES.RESET_PASS_REQUEST,
});

const resetPassSuccess = (payload) => ({
  type: TYPES.RESET_PASS_SUCCESS,
  payload,
});

const resetPassError = (payload) => ({
  type: TYPES.RESET_PASS_ERROR,
  payload,
});

const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

const uploadImageRequest = () => ({
  type: TYPES.UPLOAD_IMAGE_REQUEST,
});

const uploadImageSuccess = (response) => ({
  type: TYPES.UPLOAD_IMAGE_SUCCESS,
  payload: response,
});

const uploadImageError = () => ({
  type: TYPES.UPLOAD_IMAGE_ERROR,
});

const saveToken = (token) => ({
  type: TYPES.SAVE_FCM_TOKEN,
  payload: token,
});

const notificationListRequest = () => ({
  type: TYPES.NOTIFICATION_LIST_REQUEST,
  payload: null,
});

const notificationListSuccess = (notificationList) => ({
  type: TYPES.NOTIFICATION_LIST_SUCCESS,
  payload: notificationList,
});

const notificationListError = (error) => ({
  type: TYPES.NOTIFICATION_LIST_ERROR,
  payload: { error },
});

const rateImageRequest = () => ({
  type: TYPES.RATE_IMAGE_REQUEST,
});

const rateImageSuccess = (value) => ({
  type: TYPES.RATE_IMAGE_SUCCESS,
  payload: value,
});

const rateImageError = (error) => ({
  type: TYPES.RATE_IMAGE_ERROR,
});

const changePassRequest = () => ({
  type: TYPES.CHANGE_PASS_REQUEST,
});

const changePassSuccess = () => ({
  type: TYPES.CHANGE_PASS_SUCCESS,
});

const changePassError = () => ({
  type: TYPES.CHANGE_PASS_ERROR,
});

const justToken = (value) => ({
  type: TYPES.JUST_TOKEN,
  payload: value,
});

const getCardRequest = () => ({
  type: TYPES.GET_CARD_REQUEST,
});

const getCardSuccess = (allCards) => ({
  type: TYPES.GET_CARD_SUCCESS,
  payload: allCards,
});

const getCardError = () => ({
  type: TYPES.GET_CARD_ERROR,
});

const addCardRequest = () => ({
  type: TYPES.ADD_CARD_REQUEST,
});

const addCardSuccess = () => ({
  type: TYPES.ADD_CARD_SUCCESS,
});

const addCardError = () => ({
  type: TYPES.ADD_CARD_ERROR,
});

const setSelectedard = (value) => ({
  type: TYPES.SET_CARD,
  payload: value,
});

const deleteCardSuccess = () => ({
  type: TYPES.DELETE_CARD_SUCCESS,
});

const deleteCardError = () => ({
  type: TYPES.DELETE_CARD_ERROR,
});

const deleteCardRequest = () => ({
  type: TYPES.DELETE_CARD_REQUEST,
});

export const loginUser = (data) => async (dispatch) => {
  dispatch(loginRequest());
  dispatch(loaderRequest());

  try {
    const user = await UserController.login(data);
    let userToken = idx(user, (_) => _.response.data.loginToken);
    await AsyncStorage.setItem('userToken', userToken);
    dispatch(loginSuccess(user));
    dispatch(loaderSuccess());
  } catch (error) {
    dispatch(loaderError());
    Toast.show(error.message || error);
    dispatch(loginError(error));
  }
};

export const forgotPassword = (data, cb) => async (dispatch) => {
  dispatch(forgotPassRequest());
  try {
    const user = await UserController.forgotPassword(data);
    Toast.show(user.response.message);
    cb(user.response);
    dispatch(forgotPassSuccess(user.response));
  } catch (error) {
    Toast.show(error.message || error);
    cb(false);
    dispatch(forgotPassError(error));
  }
};
export const resendOTP = (data, cb) => async (dispatch) => {
  try {
    const user = await UserController.forgotPassword(data);
    Toast.show(user.response.message);
    cb(user.response);
  } catch (error) {
    Toast.show(error.message || error);
    cb(false);
  }
};
export const resetPassword = (data, cb) => async (dispatch) => {
  dispatch(resetPassRequest());
  try {
    const user = await UserController.resetPassword(data);
    Toast.show(user.response.message);
    cb(user.response);
    dispatch(resetPassSuccess(user.response));
  } catch (error) {
    Toast.show(error.message || error);
    cb(false);
    dispatch(resetPassError(error));
  }
};

export const confirmOTP = (data, cb) => async (dispatch) => {
  dispatch(confirmOTPRequest());
  try {
    const user = await UserController.confirmOtp(data);
    Toast.show(user.response.message);
    cb(user.response);
    dispatch(confirmOTPSuccess(user.response));
  } catch (error) {
    Toast.show(error.message || error);
    cb(false);
    dispatch(confirmOTPError(error));
  }
};

export const registerUser = (data, cb) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const user = await UserController.signup(data);
    cb(user.response);
    dispatch(registerSuccess(user));
    Toast.show(user.response.message);
  } catch (error) {
    Toast.show(error.message || error);
    cb(false);
    dispatch(registerError(error));
  }
};

export const logout = () => async (dispatch) => {
  try {
    let logutResponse = await UserController.logout();
  } finally {
    dispatch(clearStore());
  }
};

export const getLocationFromInput = (value, cb) => {
  const gpkey = 'AIzaSyDJeiY4o2jQZU3iotCoprhoftLlZkg0VHU';
  const gpurl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${gpkey}&input=${value}`;
  fetch(`${gpurl}`, { method: 'GET' })
    .then((result) => result.json())
    .then((output) => {
      if (output.status == 'OK') {
        cb(output.predictions);
      } else {
        cb(false);
      }
    })
    .catch((error) => {
      cb(false);
    });
};

export const uploadProfileImage = (data, groupImages) => async (dispatch) => {
  dispatch(uploadImageRequest());
  try {
    const response = await UserController.uploadImage(data);
    dispatch(uploadImageSuccess(response));
    dispatch(getMyAddressDetails());
  } catch (error) {
    Toast.show(error.message || error);
    dispatch(uploadImageError());
  }
};

export const saveFcmToken = (token) => async (dispatch) => {
  dispatch(saveToken(token));
};

export const getNotificationList = () => async (dispatch) => {
  dispatch(notificationListRequest());
  try {
    const response = await UserController.notificationListing({
      pageNum: 0,
      limit: 100,
    });

    let allNotifications = idx(response, (_) => _.response.data.list);

    dispatch(notificationListSuccess(allNotifications));
  } catch (error) {
    // Toast.show(error.message || error);
    dispatch(notificationListError());
  }
};

export const rateImageUpload = (data) => async (dispatch, getState) => {
  let currentArray = idx(getState(), (_) => _.user.allRateImage);
  let groupedImages = [...currentArray];

  dispatch(rateImageRequest());

  try {
    const response = await ChatController.chatImageUpload(data);
    let imageUrl = `${idx(response, (_) => _.response.data.src)}`;
    groupedImages.push(imageUrl);
    dispatch(rateImageSuccess(groupedImages));
  } catch (error) {
    dispatch(rateImageError(error));

    Toast.show(error.message || error);
  }
};

export const changePassword = (data, navigation) => async (dispatch) => {
  dispatch(changePassRequest());
  try {
    const response = await UserController.changePassword(data);

    Toast.show('Password successfully changed');
    dispatch(changePassSuccess());
    navigation.goBack();
  } catch (error) {
    Toast.show(error.message || error);
    dispatch(changePassError());
  }
};

export const getUserCards = (data) => async (dispatch) => {
  dispatch(getCardRequest());
  try {
    const response = await UserController.getAllCards(data);
    console.log(response, 'responseresponse');
    let allCards = idx(response, (_) => _.response.data.data);

    dispatch(getCardSuccess(allCards));
  } catch (error) {
    Toast.show(error.message || error);
    dispatch(getCardError());
  }
};

export const addNewCard = (data) => async (dispatch) => {
  dispatch(addCardRequest());
  try {
    const response = await UserController.addNewCard(data);
    dispatch(addCardSuccess());
    dispatch(
      getUserCards({
        stripeCustomerId: data.stripeCustomerId,
      })
    );
  } catch (error) {
    Toast.show(error.message || error);
    dispatch(addCardError());
  }
};

export const selectedCard = (data) => async (dispatch) => {
  dispatch(setSelectedard(data));
};

export const deleteUserCards = (data) => async (dispatch) => {
  console.log('CARDDDDDDDD', data);
  dispatch(deleteCardRequest());
  try {
    const response = await UserController.deleteCard(data);
    dispatch(deleteCardSuccess());
    dispatch(
      getUserCards({
        stripeCustomerId: data.stripeCustomerId,
      })
    );
  } catch (error) {
    Toast.show(error.message || error);
    dispatch(deleteCardError());
  }
};
