import { config } from '../config';
import { api } from './axios';

const API_BASE = config.apiBase;

type LoginDto = {
  email: string;
  password: string;
};

type SignupDto = {
  name: string;
  email: string;
  password: string;
};

type ResetPasswordDto = {
  email: string;
  newPassword: string;
  token: string;
};

export async function login(data: LoginDto) {
  const res = await api.post(`${API_BASE}/auth/login`, data);
  return res.data;
}

export async function signup(data: SignupDto) {
  const res = await api.post(`${API_BASE}/auth/signup`, data);
  return res.data;
}

export async function resetPassword(data: ResetPasswordDto) {
  const res = await api.post(`${API_BASE}/auth/reset-password`, data);
  return res.data;
}
