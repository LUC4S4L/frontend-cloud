"use client"

import { useState, useEffect, useCallback } from "react"
import { authService } from "@/services/authService"

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

interface User {
  id: string
  email: string
  nombre: string
  apellido: string
  role: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const checkAuthStatus = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      if (authService.isAuthenticated()) {
        const userProfile = await authService.getProfile()
        setUser(userProfile)
        setIsAuthenticated(true)
      } else {
        setUser(null)
        setIsAuthenticated(false)
      }
    } catch (err) {
      console.error("Auth check error:", err)
      setUser(null)
      setIsAuthenticated(false)
      setError("Error al verificar la autenticación")
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true)
    setError(null)

    try {
      const response = await authService.login(credentials)
      setUser(response.user)
      setIsAuthenticated(true)
      return true
    } catch (err) {
      console.error("Login error:", err)
      setError("Credenciales inválidas")
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (data: RegisterData) => {
    setLoading(true)
    setError(null)

    try {
      const response = await authService.register(data)
      setUser(response.user)
      setIsAuthenticated(true)
      return true
    } catch (err) {
      console.error("Registration error:", err)
      setError("Error al registrar el usuario")
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)

    try {
      await authService.logout()
      setUser(null)
      setIsAuthenticated(false)
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuthStatus()
  }, [checkAuthStatus])

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuthStatus,
  }
}
