import axios, { AxiosInstance } from 'axios';

// Create base axios instances for each microservice
export const pacientesApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PACIENTES_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const consultasApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_CONSULTAS_URL || 'http://localhost:8001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const orquestadorApi: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ORQUESTADOR_URL || 'http://localhost:8002/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Response interceptor for handling errors
const setupInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );
};

// Apply interceptors to all instances
[pacientesApi, consultasApi, orquestadorApi].forEach(setupInterceptors);