import { pacientesApi } from "./api"
import { AUTH_ENDPOINTS } from "@/common/constants/apiEndpoints"

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterData {
  email: string
  password: string
  nombre: string
  apellido: string
  role?: string
}

interface AuthResponse {
  token: string
  refreshToken: string
  user: {
    id: string
    email: string
    nombre: string
    apellido: string
    role: string
  }
}

export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await pacientesApi.post(AUTH_ENDPOINTS.LOGIN, credentials)

      // Store tokens in localStorage
      localStorage.setItem("authToken", response.data.token)
      localStorage.setItem("refreshToken", response.data.refreshToken)

      return response.data
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  /**
   * Register new user
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await pacientesApi.post(AUTH_ENDPOINTS.REGISTER, data)
      return response.data
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  },

  /**
   * Refresh authentication token
   */
  refreshToken: async (): Promise<{ token: string }> => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")

      if (!refreshToken) {
        throw new Error("No refresh token available")
      }

      const response = await pacientesApi.post(AUTH_ENDPOINTS.REFRESH_TOKEN, {
        refreshToken,
      })

      // Update token in localStorage
      localStorage.setItem("authToken", response.data.token)

      return response.data
    } catch (error) {
      console.error("Token refresh error:", error)
      throw error
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")

      if (refreshToken) {
        await pacientesApi.post(AUTH_ENDPOINTS.LOGOUT, { refreshToken })
      }

      // Clear tokens from localStorage
      localStorage.removeItem("authToken")
      localStorage.removeItem("refreshToken")
    } catch (error) {
      console.error("Logout error:", error)
      // Still remove tokens even if API call fails
      localStorage.removeItem("authToken")
      localStorage.removeItem("refreshToken")
      throw error
    }
  },

  /**
   * Get current user profile
   */
  getProfile: async (): Promise<any> => {
    try {
      const response = await pacientesApi.get(AUTH_ENDPOINTS.PROFILE)
      return response.data
    } catch (error) {
      console.error("Error fetching user profile:", error)
      throw error
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("authToken")
  },

  /**
   * Get current auth token
   */
  getToken: (): string | null => {
    return localStorage.getItem("authToken")
  },
}
