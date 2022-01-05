/* eslint-disable import/order */
import { HttpClient } from '@/controllers';
import {
  providerLoginUrl,
  forgotPasswordUrl,
  confirmOtpUrl,
  resetPasswordUrl,
  registerUser,
  logoutUser,
  uploadurl,
  myNotifications,
  changePass,
  allCards,
  addCard,
  deleteCardUrl,
} from '@/controllers/ApiList';

export class UserController {
  static login(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(providerLoginUrl, data)
        .then((response) => {
          console.log('TOKEN*********', response.data && response.data.loginToken);
          if (response.statusCode == 200) {
            HttpClient.setAuthorization(response.data && response.data.loginToken);
            resolve({ response });
          } else {
            reject(response.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  static signup(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(registerUser, data)
        .then((response) => {
          if (response.statusCode == 200) {
            // HttpClient.setAuthorization(response.data && response.data.loginToken);
            resolve({ response });
          } else {
            reject(response.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static forgotPassword(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(forgotPasswordUrl, data)
        .then((response) => {
          if (response.statusCode == 200) {
            resolve({ response });
          } else {
            reject(response.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static resendOtp(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(providerLoginUrl, data)
        .then((response) => {
          if (response.statusCode == 200) {
            resolve({ response });
          } else {
            reject(response.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static resetPassword(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(resetPasswordUrl, data)
        .then((response) => {
          if (response.statusCode == 200) {
            resolve({ response });
          } else {
            reject(response.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static confirmOtp(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(confirmOtpUrl, data)
        .then((response) => {
          if (response.statusCode == 200) {
            resolve({ response });
          } else {
            reject(response.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static logout(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(logoutUser, data)
        .then((response) => {
          if (response.statusCode == 200) {
            HttpClient.setAuthorization(response.data && response.data.loginToken);
            resolve({ response });
          } else {
            reject(response.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static uploadImage(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(uploadurl, data)
        .then((response) => {
          if (response.statusCode == 200) {
            resolve({ response });
          } else {
            reject(response.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  static notificationListing(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(myNotifications, data)
        .then((response) => {
          if (response.statusCode == 200) {
            resolve({ response });
          } else {
            reject(response.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static changePassword(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(changePass, data)
        .then((response) => {
          if (response.statusCode == 200) {
            resolve({ response });
          } else {
            reject(response.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static getAllCards(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(allCards, data)
        .then((response) => {
          if (response.statusCode == 200) {
            resolve({ response });
          } else {
            reject(response.message);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static addNewCard(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(addCard, data)
        .then((response) => {
          console.log('cardddd', response);
          if (response.statusCode == 200) {
            resolve({ response });
          } else {
            reject(response.message);
          }
        })
        .catch((error) => {
          console.log('cardddd', error);

          reject(error);
        });
    });
  }

  static deleteCard(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(deleteCardUrl, data)
        .then((response) => {
          console.log('cardddd', response);
          if (response.statusCode == 200) {
            resolve({ response });
          } else {
            reject(response.message);
          }
        })
        .catch((error) => {
          console.log('cardddd', error);

          reject(error);
        });
    });
  }
}
