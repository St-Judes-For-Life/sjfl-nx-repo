import axios, { AxiosInstance } from 'axios';
import { asyncStore } from '../async-storage/async-storage';
import { ADMIN_API, CLIENT_API } from '../constants/urls';
import { MaybeNull } from '../models/maybe.model';

const tokenExcludeList = [
  ADMIN_API.auth.login,
  CLIENT_API.user.register,
  CLIENT_API.otp.send,
  CLIENT_API.otp.verify,
];

export class RequestService {
  instance: AxiosInstance;

  constructor(consumer: 'ADMIN' | 'CLIENT', baseUrl?: string) {
    if (consumer === 'ADMIN') {
      this.instance = axios.create({
        baseURL: baseUrl ?? '/admin',
      });
    } else {
      this.instance = axios.create({ baseURL: baseUrl ?? '/user' });
    }

    this.instance.interceptors.request.use(async (config) => {
      config.headers.set('ngrok-skip-browser-warning', '1234');
      let token: MaybeNull<string>;
      if (consumer === 'ADMIN') {
        token =
          typeof globalThis !== 'undefined' && 'localStorage' in globalThis
            ? (globalThis as any).localStorage?.getItem('token')
            : null;
      } else {
        token = await asyncStore.get('token');
      }
      console.log(token);
      if (token && config.url && !tokenExcludeList.includes(config.url)) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
      return config;
    });
  }
}

export const ClientRequestService = new RequestService('CLIENT').instance;
