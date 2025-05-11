"use client"

import { useState, useCallback } from "react"
import { orquestadorService } from "@/services/orquestadorService"

interface DashboardData {
  totalPacientes: number
  totalConsultas: number
  examenesCompletados: number
  examenesEnProceso: number
  consultasRecientes: any[]
  pacientesRecientes: any[]
}

export function useOrquestador() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDashboardData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await orquestadorService.getDashboardData()
      setDashboardData(data)
      return data
    } catch (err) {
      setError("Error al cargar los datos del dashboard")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const getPacienteCompleto = useCallback(async (pacienteId: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = await orquestadorService.getPacienteCompleto(pacienteId)
      return data
    } catch (err) {
      setError("Error al cargar los datos completos del paciente")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const searchGlobal = useCallback(async (query: string) => {
    setLoading(true)
    setError(null)
    try {
      const results = await orquestadorService.searchGlobal(query)
      return results
    } catch (err) {
      setError("Error al realizar la búsqueda global")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const checkSystemHealth = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const health = await orquestadorService.checkSystemHealth()
      return health
    } catch (err) {
      setError("Error al verificar el estado del sistema")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    dashboardData,
    loading,
    error,
    fetchDashboardData,
    getPacienteCompleto,
    searchGlobal,
    checkSystemHealth,
  }
}
