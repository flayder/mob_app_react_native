import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Tokens} from '../api.types';

const baseUrl = 'https://api.shopuchet.kz';

const axiosInstance = axios.create({baseURL: baseUrl});

axiosInstance.interceptors.request.use(async config => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  //console.log('test')
  if (accessToken && config.headers) {
    //console.log('accessToken', accessToken)
    config.headers['X-Auth-Token'] = accessToken;
  }
  return config;
}, Promise.reject);

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    if (
      refreshToken &&
      error.response.status === 409 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshRequest = await axiosInstance.post<Tokens>(
        `/refresh-tokens?access-token=${accessToken}&refresh-token=${refreshToken}`,
      );
      if (refreshRequest.status === 200) {
        await AsyncStorage.setItem(
          'accessToken',
          refreshRequest.data['X-Auth-Token'],
        );
        await AsyncStorage.setItem(
          'refreshToken',
          refreshRequest.data['Refresh-Token'],
        );
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
