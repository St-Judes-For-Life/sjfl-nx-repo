const baseUrl = `${import.meta.env.VITE_API_BASE_URL}`;
export const API = {
  auth: {
    login: `${baseUrl}/login`,
  },
  stats: `${baseUrl}/stats`,
};
