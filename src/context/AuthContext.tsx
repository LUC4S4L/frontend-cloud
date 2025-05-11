import React, { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"

interface User {
  id: string
  email: string
  nombre: string
  apellido: string
  role: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  login: (credentials: { email: string; password: string }) => Promise<boolean>
  register: (data: {
    email: string
    password: string
    nombre: string
    apellido: string
    role?: string
  }) => Promise<boolean>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // For development, you can set a mock user to bypass login
  const [mockUser] = useState<User | null>({
    id: "1",
    email: "doctor@example.com",
    nombre: "Doctor",
    apellido: "Usuario",
    role: "doctor",
  })

  const [isAuthenticated, setIsAuthenticated] = useState(true) // Set to true for development
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (credentials: { email: string; password: string }) => {
    setLoading(true)
    setError(null)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setIsAuthenticated(true)
    setLoading(false)
    return true
  }

  const register = async (data: {
    email: string
    password: string
    nombre: string
    apellido: string
    role?: string
  }) => {
    setLoading(true)
    setError(null)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setIsAuthenticated(true)
    setLoading(false)
    return true
  }

  const logout = async () => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    setIsAuthenticated(false)
    setLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user: mockUser,
        loading,
        error,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
