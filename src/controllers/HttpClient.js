import axios from 'axios';
import { Config } from 'react-native-config';
import { strings } from '@/localization';

const client = axios.create({
  // baseURL: Config.API_BASE_URL,
  baseURL: 'http://54.190.192.105:6132/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject(new Error(strings.common.connectionError));
    } else {
      return Promise.reject(error);
    }
  }
);

const setAuthorization = (token) => {
  client.defaults.headers.common.authorization = token;
};

const clearAuthorization = () => {
  delete client.defaults.headers.common.authorization;
};

export const HttpClient = { ...client, setAuthorization, clearAuthorization };
