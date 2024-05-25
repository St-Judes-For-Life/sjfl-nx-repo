import axios from 'axios';
import { API } from '../app/constants/urls';

const tokenExcludeList = [API.auth.login];

export const RequestService = axios.create({});

RequestService.interceptors.request.use(async (config) => {
  config.headers.set('ngrok-skip-browser-warning', '1234');

  const token = localStorage.getItem('token');
  if (token && config.url && !tokenExcludeList.includes(config.url)) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});
