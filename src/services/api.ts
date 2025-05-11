import axios from "axios"

// Base URLs for different services
const PACIENTES_URL = import.meta.env.VITE_PACIENTES_URL || "http://localhost:8000/api"
const ORQUESTADOR_URL = import.meta.env.VITE_ORQUESTADOR_URL || "http://localhost:8002/api"
const CONSULTAS_URL = import.meta.env.VITE_CONSULTAS_URL || "http://localhost:8001/api"

// Create service-specific instances
export const pacientesApi = axios.create({
  baseURL: PACIENTES_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const consultasApi = axios.create({
  baseURL: CONSULTAS_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export const orquestadorApi = axios.create({
  baseURL: ORQUESTADOR_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add auth token to requests
const addAuthToken = (config: any) => {
  const token = localStorage.getItem("authToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

// Add request interceptors
pacientesApi.interceptors.request.use(addAuthToken)
consultasApi.interceptors.request.use(addAuthToken)
orquestadorApi.interceptors.request.use(addAuthToken)

// Add response interceptors for error handling
const handleResponseError = (error: any) => {
  if (error.response) {
    const { status } = error.response
    if (status === 401) {
      console.error("Unauthorized access. Please log in again.")
      // Handle unauthorized (redirect to login)
    } else if (status === 403) {
      console.error("Forbidden access.")
    } else if (status >= 500) {
      console.error("Server error. Please try again later.")
    }
  } else if (error.request) {
    console.error("Network error. Please check your connection.")
  } else {
    console.error("Error:", error.message)
  }
  return Promise.reject(error)
}

pacientesApi.interceptors.response.use((response) => response, handleResponseError)
consultasApi.interceptors.response.use((response) => response, handleResponseError)
orquestadorApi.interceptors.response.use((response) => response, handleResponseError)