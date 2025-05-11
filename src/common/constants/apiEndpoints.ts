// Base URLs
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api"
export const ORQUESTADOR_BASE_URL = import.meta.env.VITE_ORQUESTADOR_URL || "http://localhost:8002/api"
export const CONSULTAS_BASE_URL = import.meta.env.VITE_CONSULTAS_URL || "http://localhost:8001/api"

// Pacientes endpoints
export const PACIENTES_ENDPOINTS = {
  BASE: `${API_BASE_URL}/pacientes`,
  GET_ALL: `${API_BASE_URL}/pacientes`,
  GET_BY_ID: (id: string) => `${API_BASE_URL}/pacientes/${id}`,
  CREATE: `${API_BASE_URL}/pacientes`,
  UPDATE: (id: string) => `${API_BASE_URL}/pacientes/${id}`,
  DELETE: (id: string) => `${API_BASE_URL}/pacientes/${id}`,
  SEARCH: `${API_BASE_URL}/pacientes/search`,
}

// Consultas endpoints
export const CONSULTAS_ENDPOINTS = {
  BASE: `${CONSULTAS_BASE_URL}/consultas`,
  GET_ALL: `${CONSULTAS_BASE_URL}/consultas`,
  GET_BY_ID: (id: string) => `${CONSULTAS_BASE_URL}/consultas/${id}`,
  CREATE: `${CONSULTAS_BASE_URL}/consultas`,
  UPDATE: (id: string) => `${CONSULTAS_BASE_URL}/consultas/${id}`,
  DELETE: (id: string) => `${CONSULTAS_BASE_URL}/consultas/${id}`,
  UPDATE_STATUS: (id: string) => `${CONSULTAS_BASE_URL}/consultas/${id}/estado`,
  GET_BY_PACIENTE: (pacienteId: string) => `${CONSULTAS_BASE_URL}/pacientes/${pacienteId}/consultas`,
}

// Examenes endpoints
export const EXAMENES_ENDPOINTS = {
  BASE: `${ORQUESTADOR_BASE_URL}/examenes`,
  GET_ALL: `${ORQUESTADOR_BASE_URL}/examenes`,
  GET_BY_ID: (id: string) => `${ORQUESTADOR_BASE_URL}/examenes/${id}`,
  CREATE: `${ORQUESTADOR_BASE_URL}/examenes`,
  UPDATE: (id: string) => `${ORQUESTADOR_BASE_URL}/examenes/${id}`,
  DELETE: (id: string) => `${ORQUESTADOR_BASE_URL}/examenes/${id}`,
  UPDATE_STATUS: (id: string) => `${ORQUESTADOR_BASE_URL}/examenes/${id}/estado`,
  GET_BY_PACIENTE: (pacienteId: string) => `${ORQUESTADOR_BASE_URL}/pacientes/${pacienteId}/examenes`,
}

// Expedientes endpoints
export const EXPEDIENTES_ENDPOINTS = {
  BASE: `${ORQUESTADOR_BASE_URL}/expedientes`,
  GET_ALL: `${ORQUESTADOR_BASE_URL}/expedientes`,
  GET_BY_ID: (id: string) => `${ORQUESTADOR_BASE_URL}/expedientes/${id}`,
  CREATE: `${ORQUESTADOR_BASE_URL}/expedientes`,
  UPDATE: (id: string) => `${ORQUESTADOR_BASE_URL}/expedientes/${id}`,
  DELETE: (id: string) => `${ORQUESTADOR_BASE_URL}/expedientes/${id}`,
  GET_BY_PACIENTE: (pacienteId: string) => `${ORQUESTADOR_BASE_URL}/pacientes/${pacienteId}/expedientes`,
}

// Orquestador endpoints
export const ORQUESTADOR_ENDPOINTS = {
  DASHBOARD: `${ORQUESTADOR_BASE_URL}/dashboard`,
  PACIENTE_COMPLETO: (pacienteId: string) => `${ORQUESTADOR_BASE_URL}/pacientes/${pacienteId}/completo`,
  SEARCH_GLOBAL: `${ORQUESTADOR_BASE_URL}/search`,
  SYSTEM_STATUS: `${ORQUESTADOR_BASE_URL}/system/health`,
}

// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  PROFILE: `${API_BASE_URL}/auth/profile`,
}
