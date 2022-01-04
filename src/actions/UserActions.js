import { UserController } from '@/controllers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import idx from 'idx';
import Toast from 'react-native-simple-toast';

export const TYPES = {
  CLEAR_STORE: 'CLEAR_STORE',
  LOGIN: 'LOGIN',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_ERROR: 'LOGIN_ERROR',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_ERROR: 'REGISTER_ERROR',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',

  LOADER_REQUEST: 'LOADER_REQUEST',
  LOADER_FAIL: 'LOADER_FAIL',
  LOADER_SUCCESS: 'LOADER_SUCCESS',


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

const clearStore = () => ({
  type: TYPES.CLEAR_STORE,
  payload: null,
});

const saveToken = (token) => ({
  type: TYPES.SAVE_FCM_TOKEN,
  payload: token,
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


export const saveFcmToken = (token) => async (dispatch) => {
  dispatch(saveToken(token));
};


