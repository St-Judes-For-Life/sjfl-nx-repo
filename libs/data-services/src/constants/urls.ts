export const ADMIN_API = {
  auth: {
    login: 'login',
  },
  stats: 'stats',
  counselling: {
    base: '/counselling',
    search: '/counselling/search',
  },
  judian: {
    search: '/judian/search',
  },
};

const BASE_CLIENT_URL = 'https://c8a9-20-219-147-128.ngrok-free.app/user';

export const CLIENT_API = {
  user: {
    register: `${BASE_CLIENT_URL}/register`,
    profile: `${BASE_CLIENT_URL}/profile`,
  },
  otp: {
    verify: `${BASE_CLIENT_URL}/otp/verify`,
    send: `${BASE_CLIENT_URL}/otp/send`,
  },
  counselling: {
    search: `${BASE_CLIENT_URL}/counselling/search`,
    create: `${BASE_CLIENT_URL}/counselling/schedule`,
  },
};
