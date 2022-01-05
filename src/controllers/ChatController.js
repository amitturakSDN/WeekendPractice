import { HttpClient } from '@/controllers';
import {
  allActiveChats,
  chatDetails,
  uploadChatImage,
  resetChatCount,
} from '@/controllers/ApiList';

export class ChatController {
  static getActiveChats(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(allActiveChats, data)
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
  static getChatDetails(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(chatDetails, data)
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
  static chatImageUpload(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(uploadChatImage, data)
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
  static resetChatCounter(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(resetChatCount, data)
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
}
