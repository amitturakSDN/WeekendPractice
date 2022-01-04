import { strings } from '@/localization';
import { HttpClient } from '@/controllers';
import {
  providerLoginUrl,
  registerUser,
  logoutUser,
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

}
