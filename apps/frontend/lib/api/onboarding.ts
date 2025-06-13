import { config } from '../config';
import { api } from './axios';

const API_BASE = config.apiBase;

export async function setupClinic(data: any) {
  const res = await api.post(`${API_BASE}/onboarding/setup`, data);
  return res.data;
}
