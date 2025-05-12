import axios from "axios"

// Create an instance for the pacientes API
export const pacientesApi = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// Add request interceptor for logging
pacientesApi.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    console.error("API Request Error:", error)
    return Promise.reject(error)
  }
)

// Add response interceptor for logging
pacientesApi.interceptors.response.use(
  (response) => {
    console.log(`API Response Success: ${response.status}`)
    return response
  },
  (error) => {
    if (error.response) {
      console.error(`API Response Error: ${error.response.status}`, error.response.data)
    } else if (error.request) {
      console.error("API No Response:", error.message)
    } else {
      console.error("API Error:", error.message)
    }
    return Promise.reject(error)
  }
)