import { consultasApi } from "./api"
import type { Consulta, ConsultaFormData } from "@/types/consulta"
import { CONSULTAS_ENDPOINTS } from "@/common/constants/apiEndpoints"

export const consultasService = {
  /**
   * Get all consultations
   */
  getAll: async (): Promise<Consulta[]> => {
    try {
      const response = await consultasApi.get(CONSULTAS_ENDPOINTS.GET_ALL)
      return response.data
    } catch (error) {
      console.error("Error fetching consultations:", error)
      throw error
    }
  },

  /**
   * Get consultation by ID
   */
  getById: async (id: string): Promise<Consulta> => {
    try {
      const response = await consultasApi.get(CONSULTAS_ENDPOINTS.GET_BY_ID(id))
      return response.data
    } catch (error) {
      console.error(`Error fetching consultation with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Create new consultation
   */
  create: async (data: ConsultaFormData): Promise<Consulta> => {
    try {
      const response = await consultasApi.post(CONSULTAS_ENDPOINTS.CREATE, data)
      return response.data
    } catch (error) {
      console.error("Error creating consultation:", error)
      throw error
    }
  },

  /**
   * Update existing consultation
   */
  update: async (id: string, data: ConsultaFormData): Promise<Consulta> => {
    try {
      const response = await consultasApi.put(CONSULTAS_ENDPOINTS.UPDATE(id), data)
      return response.data
    } catch (error) {
      console.error(`Error updating consultation with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Delete consultation
   */
  delete: async (id: string): Promise<void> => {
    try {
      await consultasApi.delete(CONSULTAS_ENDPOINTS.DELETE(id))
    } catch (error) {
      console.error(`Error deleting consultation with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Update consultation status
   */
  updateStatus: async (id: string, status: string): Promise<Consulta> => {
    try {
      const response = await consultasApi.patch(CONSULTAS_ENDPOINTS.UPDATE_STATUS(id), { status })
      return response.data
    } catch (error) {
      console.error(`Error updating status for consultation with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Get consultations by patient ID
   */
  getByPacienteId: async (pacienteId: string): Promise<Consulta[]> => {
    try {
      const response = await consultasApi.get(CONSULTAS_ENDPOINTS.GET_BY_PACIENTE(pacienteId))
      return response.data
    } catch (error) {
      console.error(`Error fetching consultations for patient with ID ${pacienteId}:`, error)
      throw error
    }
  },
}
