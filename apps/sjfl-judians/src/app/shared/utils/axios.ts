import axios from 'axios';
import { API } from '../constants/api/urls';
import { asyncStore } from './async-storage/async-storage';

const tokenExcludeList = [API.user.register, API.otp.send, API.otp.verify];

export const RequestService = axios.create();

RequestService.interceptors.request.use(async (config) => {
  config.headers.set('ngrok-skip-browser-warning', '1234');
  const token = await asyncStore.get('token');
  if (token && config.url && !tokenExcludeList.includes(config.url)) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});
