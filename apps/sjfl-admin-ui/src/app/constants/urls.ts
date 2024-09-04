const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/admin`;
export const API = {
  auth: {
    login: `${baseUrl}/login`,
  },
  stats: `${baseUrl}/stats`,
};
