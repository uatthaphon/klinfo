import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const code = error?.response?.data?.code || 'unknown';
    return Promise.reject({ ...error, code });
  },
);
