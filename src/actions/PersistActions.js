import AsyncStorage from '@react-native-async-storage/async-storage';

export const TYPES = {
  HIDE_MODAL: 'HIDE_MODAL',
};

const hideModal = (value) => ({
  type: TYPES.HIDE_MODAL,
  payload: value,
});

export const hideInfoModal = (value) => async (dispatch) => {
  try {
    dispatch(hideModal(value));
    await AsyncStorage.setItem('alreadyDisplayed', 'true');
  } catch (error) {
    alert(error);
  }
};
