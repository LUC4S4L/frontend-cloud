// Base URLs from environment variables
export const PACIENTES_URL = import.meta.env.VITE_PACIENTES_URL || "http://localhost:8000/api"
export const ORQUESTADOR_URL = import.meta.env.VITE_ORQUESTADOR_URL || "http://localhost:8002/api"
export const CONSULTAS_URL = import.meta.env.VITE_CONSULTAS_URL || "http://localhost:8001/api"

// Pacientes endpoints
export const PACIENTES_ENDPOINTS = {
  BASE: `${PACIENTES_URL}`,
  GET_ALL: `${PACIENTES_URL}/pacientes`,
  GET_BY_ID: (id: string) => `${PACIENTES_URL}/pacientes/${id}`,
  CREATE: `${PACIENTES_URL}/pacientes`,
  UPDATE: (id: string) => `${PACIENTES_URL}/pacientes/${id}`,
  DELETE: (id: string) => `${PACIENTES_URL}/pacientes/${id}`,
  SEARCH: `${PACIENTES_URL}/pacientes/search`,
}

// Consultas endpoints
export const CONSULTAS_ENDPOINTS = {
  BASE: `${CONSULTAS_URL}`,
  GET_ALL: `${CONSULTAS_URL}/consultas`,
  GET_BY_ID: (id: string) => `${CONSULTAS_URL}/consultas/${id}`,
  CREATE: `${CONSULTAS_URL}/consultas`,
  UPDATE: (id: string) => `${CONSULTAS_URL}/consultas/${id}`,
  DELETE: (id: string) => `${CONSULTAS_URL}/consultas/${id}`,
  UPDATE_STATUS: (id: string) => `${CONSULTAS_URL}/consultas/${id}/estado`,
  GET_BY_PACIENTE: (pacienteId: string) => `${CONSULTAS_URL}/pacientes/${pacienteId}/consultas`,
}

// Orquestador endpoints
export const ORQUESTADOR_ENDPOINTS = {
  BASE: `${ORQUESTADOR_URL}`,
  DASHBOARD: `${ORQUESTADOR_URL}/dashboard`,
  PACIENTE_COMPLETO: (pacienteId: string) => `${ORQUESTADOR_URL}/pacientes/${pacienteId}/completo`,
  SEARCH_GLOBAL: `${ORQUESTADOR_URL}/search`,
  SYSTEM_STATUS: `${ORQUESTADOR_URL}/system/health`,
  
  // Examenes endpoints (assuming these are handled by the orchestrator)
  EXAMENES: {
    GET_ALL: `${ORQUESTADOR_URL}/examenes`,
    GET_BY_ID: (id: string) => `${ORQUESTADOR_URL}/examenes/${id}`,
    CREATE: `${ORQUESTADOR_URL}/examenes`,
    UPDATE: (id: string) => `${ORQUESTADOR_URL}/examenes/${id}`,
    DELETE: (id: string) => `${ORQUESTADOR_URL}/examenes/${id}`,
    UPDATE_STATUS: (id: string) => `${ORQUESTADOR_URL}/examenes/${id}/estado`,
    GET_BY_PACIENTE: (pacienteId: string) => `${ORQUESTADOR_URL}/pacientes/${pacienteId}/examenes`,
  },
  
  // Expedientes endpoints (assuming these are handled by the orchestrator)
  EXPEDIENTES: {
    GET_ALL: `${ORQUESTADOR_URL}/expedientes`,
    GET_BY_ID: (id: string) => `${ORQUESTADOR_URL}/expedientes/${id}`,
    CREATE: `${ORQUESTADOR_URL}/expedientes`,
    UPDATE: (id: string) => `${ORQUESTADOR_URL}/expedientes/${id}`,
    DELETE: (id: string) => `${ORQUESTADOR_URL}/expedientes/${id}`,
    GET_BY_PACIENTE: (pacienteId: string) => `${ORQUESTADOR_URL}/pacientes/${pacienteId}/expedientes`,
  },
}

// Auth endpoints (assuming auth is handled by the patients service)
export const AUTH_ENDPOINTS = {
  LOGIN: `${PACIENTES_URL}/auth/login`,
  REGISTER: `${PACIENTES_URL}/auth/register`,
  REFRESH_TOKEN: `${PACIENTES_URL}/auth/refresh-token`,
  LOGOUT: `${PACIENTES_URL}/auth/logout`,
  PROFILE: `${PACIENTES_URL}/auth/profile`,
}
