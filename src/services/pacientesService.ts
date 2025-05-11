import { pacientesApi } from "./api"
import type { Paciente, PacienteFormData } from "../types/paciente"
import { PACIENTES_ENDPOINTS } from "../common/constants/apiEndpoints"

export const pacientesService = {
  /**
   * Get all patients
   */
  getAll: async (): Promise<Paciente[]> => {
    try {
      const response = await pacientesApi.get(PACIENTES_ENDPOINTS.GET_ALL)
      return response.data
    } catch (error) {
      console.error("Error fetching patients:", error)
      throw error
    }
  },

  /**
   * Get patient by ID
   */
  getById: async (id: string): Promise<Paciente> => {
    try {
      const response = await pacientesApi.get(PACIENTES_ENDPOINTS.GET_BY_ID(id))
      return response.data
    } catch (error) {
      console.error(`Error fetching patient with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Create new patient
   */
  create: async (data: PacienteFormData): Promise<Paciente> => {
    try {
      const response = await pacientesApi.post(PACIENTES_ENDPOINTS.CREATE, data)
      return response.data
    } catch (error) {
      console.error("Error creating patient:", error)
      throw error
    }
  },

  /**
   * Update existing patient
   */
  update: async (id: string, data: PacienteFormData): Promise<Paciente> => {
    try {
      const response = await pacientesApi.put(PACIENTES_ENDPOINTS.UPDATE(id), data)
      return response.data
    } catch (error) {
      console.error(`Error updating patient with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Delete patient
   */
  delete: async (id: string): Promise<void> => {
    try {
      await pacientesApi.delete(PACIENTES_ENDPOINTS.DELETE(id))
    } catch (error) {
      console.error(`Error deleting patient with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Search patients
   */
  search: async (query: string): Promise<Paciente[]> => {
    try {
      const response = await pacientesApi.get(PACIENTES_ENDPOINTS.SEARCH, {
        params: { q: query },
      })
      return response.data
    } catch (error) {
      console.error(`Error searching patients with query "${query}":`, error)
      throw error
    }
  },
}
