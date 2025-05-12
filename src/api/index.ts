import axios from "axios"

// Create a base API instance
export const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
  },
  timeout: 15000
})

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.data || {});
    return config
  },
  (error) => {
    console.error("API Request Error:", error)
    return Promise.reject(error)
  }
)

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response Success: ${response.status}`, response.data);
    return response
  },
  (error) => {
    if (error.response) {
      console.error(`API Response Error: ${error.response.status}`, error.response.data);
    } else if (error.request) {
      console.error("API No Response:", error.message, error.request);
    } else {
      console.error("API Error:", error.message);
    }
    return Promise.reject(error)
  }
)

// Helper function to test API connection
export const testApiConnection = async () => {
  try {
    // Try to hit the API root or a known endpoint
    const response = await api.get('/pacientes');
    console.log('API Connection Test Successful:', response.data);
    return {
      success: true,
      data: response.data,
      message: 'API connection successful'
    };
  } catch (error: any) {
    console.error('API Connection Test Failed:', error);
    let message = 'API connection failed';
    
    if (error.response) {
      message += `: ${error.response.status} ${error.response.statusText}`;
    } else if (error.request) {
      message += ': No response received from server';
    } else {
      message += `: ${error.message}`;
    }
    
    return {
      success: false,
      error,
      message
    };
  }
};