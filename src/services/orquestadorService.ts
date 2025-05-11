import { orquestadorApi } from "./api"
import type { Paciente } from "../types/patient"
import type { Consulta } from "../types/consulta"
import type { LabTest } from "../types/labTest"
import type { MedicalRecord } from "../types/medicalRecord"

// Define response types for better type safety
interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

interface PaginatedResponse<T> {
  success: boolean
  data: {
    items: T[]
    total: number
    page: number
    limit: number
  }
  message?: string
}

// Orquestador service methods
export const orquestadorService = {
  // Patient orchestration methods
  async getPacienteCompleto(pacienteId: string): Promise<
    ApiResponse<{
      paciente: Paciente
      consultas: Consulta[]
      labTests: LabTest[]
      medicalRecords: MedicalRecord[]
    }>
  > {
    const response = await orquestadorApi.get<
      ApiResponse<{
        paciente: Paciente
        consultas: Consulta[]
        labTests: LabTest[]
        medicalRecords: MedicalRecord[]
      }>
    >(`/pacientes/${pacienteId}/completo`)
    return response.data
  },

  // Dashboard data methods
  async getDashboardData(): Promise<
    ApiResponse<{
      totalPacientes: number
      totalConsultas: number
      consultasPorEstado: Record<string, number>
      consultasRecientes: Consulta[]
    }>
  > {
    const response =
      await orquestadorApi.get<
        ApiResponse<{
          totalPacientes: number
          totalConsultas: number
          consultasPorEstado: Record<string, number>
          consultasRecientes: Consulta[]
        }>
      >("/dashboard")
    return response.data
  },

  // Search across multiple entities
  async searchGlobal(query: string): Promise<
    ApiResponse<{
      pacientes: Paciente[]
      consultas: Consulta[]
      labTests: LabTest[]
    }>
  > {
    const response = await orquestadorApi.get<
      ApiResponse<{
        pacientes: Paciente[]
        consultas: Consulta[]
        labTests: LabTest[]
      }>
    >("/search", { params: { q: query } })
    return response.data
  },

  // Reports and analytics
  async getReporteConsultas(
    startDate: string,
    endDate: string,
    filters?: {
      especialidad?: string
      estado?: string
    },
  ): Promise<
    ApiResponse<{
      totalConsultas: number
      consultasPorEspecialidad: Record<string, number>
      consultasPorEstado: Record<string, number>
      consultasPorDia: Record<string, number>
    }>
  > {
    const response = await orquestadorApi.get<
      ApiResponse<{
        totalConsultas: number
        consultasPorEspecialidad: Record<string, number>
        consultasPorEstado: Record<string, number>
        consultasPorDia: Record<string, number>
      }>
    >("/reportes/consultas", {
      params: {
        startDate,
        endDate,
        ...filters,
      },
    })
    return response.data
  },

  // Notifications
  async getNotificaciones(userId: string): Promise<
    ApiResponse<{
      notificaciones: Array<{
        id: string
        tipo: string
        mensaje: string
        leida: boolean
        fecha: string
        entidadId?: string
        entidadTipo?: string
      }>
      noLeidas: number
    }>
  > {
    const response = await orquestadorApi.get<
      ApiResponse<{
        notificaciones: Array<{
          id: string
          tipo: string
          mensaje: string
          leida: boolean
          fecha: string
          entidadId?: string
          entidadTipo?: string
        }>
        noLeidas: number
      }>
    >(`/usuarios/${userId}/notificaciones`)
    return response.data
  },

  async marcarNotificacionLeida(notificacionId: string): Promise<ApiResponse<{ success: boolean }>> {
    const response = await orquestadorApi.patch<ApiResponse<{ success: boolean }>>(
      `/notificaciones/${notificacionId}/leer`,
    )
    return response.data
  },

  // System health check
  async getSystemStatus(): Promise<
    ApiResponse<{
      servicios: Record<
        string,
        {
          status: "up" | "down" | "degraded"
          latencia: number
          ultimaActualizacion: string
        }
      >
      general: "healthy" | "degraded" | "down"
    }>
  > {
    const response =
      await orquestadorApi.get<
        ApiResponse<{
          servicios: Record<
            string,
            {
              status: "up" | "down" | "degraded"
              latencia: number
              ultimaActualizacion: string
            }
          >
          general: "healthy" | "degraded" | "down"
        }>
      >("/system/health")
    return response.data
  },
}

export default orquestadorService
