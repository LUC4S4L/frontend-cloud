"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useAuth } from "@/hooks/useAuth"

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
  const auth = useAuth()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
