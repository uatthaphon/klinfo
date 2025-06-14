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

type RequestPasswordResetDto = {
  email: string;
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

export async function requestPasswordReset(data: RequestPasswordResetDto) {
  const res = await api.post(`${API_BASE}/auth/request-password-reset`, data);
  return res.data;
}

export async function verifyEmail(data: { email: string; token: string }) {
  const res = await api.post(`${API_BASE}/auth/verify-email`, data);
  return res.data;
}

export async function resendVerificationEmail(email: string) {
  const res = await api.post(`${API_BASE}/auth/resend-verification`, { email })
  return res.data
}

export async function getProfile() {
  const res = await api.get(`${API_BASE}/auth/me`)
  return res.data
}
