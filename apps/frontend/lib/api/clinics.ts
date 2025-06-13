import { config } from '../config'
import { api } from './axios'

const API_BASE = config.apiBase

export async function createClinic(data: { name: string; timezone?: string; language?: string }) {
  const res = await api.post(`${API_BASE}/clinics`, data)
  return res.data
}
