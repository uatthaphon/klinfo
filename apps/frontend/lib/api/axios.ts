import axios from 'axios'
import { config } from '../config'

export const api = axios.create({
  baseURL: config.apiBase,
  withCredentials: false,
})

api.interceptors.request.use((cfg) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken')
    if (token) cfg.headers.Authorization = `Bearer ${token}`
  }
  return cfg
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const code = error?.response?.data?.code || 'unknown';
    return Promise.reject({ ...error, code });
  },
);
