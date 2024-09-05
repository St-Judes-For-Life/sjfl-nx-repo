const baseUrl = import.meta.env.VITE_CLIENT_API_BASE_URL;
export const API = {
  user: {
    register: `${baseUrl}/register`,
    profile: `${baseUrl}/profile`,
  },
  otp: {
    verify: `${baseUrl}/otp/verify`,
    send: `${baseUrl}/otp/send`,
  },
  counselling: {
    search: `${baseUrl}/counselling/search`,
    create: `${baseUrl}/counselling/schedule`,
  },
};
