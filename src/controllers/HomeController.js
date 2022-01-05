import { HttpClient } from '@/controllers';
import {
  createService,
  getServiceList,
  getTaxValue,
  serviceQuestionaire,
  rescheduleService,
} from '@/controllers/ApiList';

export class HomeController {
  static getServiceLists(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(getServiceList, data)
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

  static createServiceRequest(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(createService, data)
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

  static getSeriveQuestion() {
    return new Promise((resolve, reject) => {
      HttpClient.get(serviceQuestionaire)
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

  static getTax() {
    return new Promise((resolve, reject) => {
      HttpClient.get(getTaxValue)
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

  static rescheduleService(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(rescheduleService, data)
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
