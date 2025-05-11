import { orquestadorApi } from "./api"
import { ORQUESTADOR_ENDPOINTS } from "@/common/constants/apiEndpoints"

interface DashboardData {
  totalPacientes: number
  totalConsultas: number
  examenesCompletados: number
  examenesEnProceso: number
  consultasRecientes: any[]
  pacientesRecientes: any[]
}

interface PacienteCompleto {
  paciente: any
  consultas: any[]
  examenes: any[]
  expedientes: any[]
}

export const orquestadorService = {
  /**
   * Get dashboard data
   */
  getDashboardData: async (): Promise<DashboardData> => {
    try {
      const response = await orquestadorApi.get(ORQUESTADOR_ENDPOINTS.DASHBOARD)
      return response.data
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      throw error
    }
  },

  /**
   * Get complete patient data
   */
  getPacienteCompleto: async (pacienteId: string): Promise<PacienteCompleto> => {
    try {
      const response = await orquestadorApi.get(ORQUESTADOR_ENDPOINTS.PACIENTE_COMPLETO(pacienteId))
      return response.data
    } catch (error) {
      console.error(`Error fetching complete data for patient with ID ${pacienteId}:`, error)
      throw error
    }
  },

  /**
   * Global search across all entities
   */
  searchGlobal: async (query: string): Promise<any> => {
    try {
      const response = await orquestadorApi.get(ORQUESTADOR_ENDPOINTS.SEARCH_GLOBAL, {
        params: { q: query },
      })
      return response.data
    } catch (error) {
      console.error(`Error performing global search with query "${query}":`, error)
      throw error
    }
  },

  /**
   * Check system health
   */
  checkSystemHealth: async (): Promise<any> => {
    try {
      const response = await orquestadorApi.get(ORQUESTADOR_ENDPOINTS.SYSTEM_STATUS)
      return response.data
    } catch (error) {
      console.error("Error checking system health:", error)
      throw error
    }
  },
}
