export function mobileValidation(props) {
  var mobileLength = props.mobileLength;
  var currentLength = props.phone;
  let { mobileErrorMsg, mobileError } = false;
  if (currentLength === '') {
    mobileError = true;
    mobileErrorMsg = 'MobileError';
  } else if (mobileLength !== currentLength.length) {
    mobileError = true;
    mobileErrorMsg = `Mobile number length should be ${mobileLength}`;
  } else {
    mobileError = false;
    mobileErrorMsg = false;
  }

  return {
    mobileError: mobileError,
    mobileErrorMsg: mobileErrorMsg,
  };
}

export const isEmpty = (value) => {
  if ((value && value.length == 0) || value == '' || value == null) return true;
  else return false;
};
