/* eslint-disable import/order */
import { HttpClient } from '@/controllers';
import {
  getActiveService,
  serviceDetail,
  updateServiceStatus,
  cancelService,
  raiseConcern,
  rateService,
} from '@/controllers/ApiList';

export class ServicesController {
  static getActiveServices(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(getActiveService, data)
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

  static getActiveServicesDetail(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(serviceDetail, data)
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

  static updateService(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(updateServiceStatus, data)
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

  static cancelService(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(cancelService, data)
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

  static raiseServiceConcern(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(raiseConcern, data)
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
  static rateProvider(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(rateService, data)
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
