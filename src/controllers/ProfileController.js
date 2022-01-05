/* eslint-disable import/order */
import { HttpClient } from '@/controllers';
import {
  saveAddressUrl,
  myAddressUrl,
  invoiceUrl,
  updateAddress,
  deleteAddress,
  updateyProfile,
  myInvoices,
} from '@/controllers/ApiList';

export class ProfileController {
  static addAddressDetails(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(saveAddressUrl, data)
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

  static myAddressDetails(data) {
    return new Promise((resolve, reject) => {
      HttpClient.get(myAddressUrl, data)
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

  static invoiceDetails(data) {
    return new Promise((resolve, reject) => {
      HttpClient.get(invoiceUrl, data)
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

  static updateAddressDetails(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(updateAddress, data)
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

  static deleteAddressDetails(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(deleteAddress, data)
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

  static updateProfile(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(updateyProfile, data)
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

  static invoice(data) {
    return new Promise((resolve, reject) => {
      HttpClient.post(myInvoices, data)
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
