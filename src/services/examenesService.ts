import { orquestadorApi } from "./api"
import type { LabTest, LabTestFormData } from "@/types/labTest"
import { EXAMENES_ENDPOINTS } from "@/common/constants/apiEndpoints"

export const examenesService = {
  /**
   * Get all lab tests
   */
  getAll: async (): Promise<LabTest[]> => {
    try {
      const response = await orquestadorApi.get(EXAMENES_ENDPOINTS.GET_ALL)
      return response.data
    } catch (error) {
      console.error("Error fetching lab tests:", error)
      throw error
    }
  },

  /**
   * Get lab test by ID
   */
  getById: async (id: string): Promise<LabTest> => {
    try {
      const response = await orquestadorApi.get(EXAMENES_ENDPOINTS.GET_BY_ID(id))
      return response.data
    } catch (error) {
      console.error(`Error fetching lab test with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Create new lab test
   */
  create: async (data: LabTestFormData): Promise<LabTest> => {
    try {
      const response = await orquestadorApi.post(EXAMENES_ENDPOINTS.CREATE, data)
      return response.data
    } catch (error) {
      console.error("Error creating lab test:", error)
      throw error
    }
  },

  /**
   * Update existing lab test
   */
  update: async (id: string, data: LabTestFormData): Promise<LabTest> => {
    try {
      const response = await orquestadorApi.put(EXAMENES_ENDPOINTS.UPDATE(id), data)
      return response.data
    } catch (error) {
      console.error(`Error updating lab test with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Delete lab test
   */
  delete: async (id: string): Promise<void> => {
    try {
      await orquestadorApi.delete(EXAMENES_ENDPOINTS.DELETE(id))
    } catch (error) {
      console.error(`Error deleting lab test with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Update lab test status
   */
  updateStatus: async (id: string, status: string): Promise<LabTest> => {
    try {
      const response = await orquestadorApi.patch(EXAMENES_ENDPOINTS.UPDATE_STATUS(id), { status })
      return response.data
    } catch (error) {
      console.error(`Error updating status for lab test with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Get lab tests by patient ID
   */
  getByPacienteId: async (pacienteId: string): Promise<LabTest[]> => {
    try {
      const response = await orquestadorApi.get(EXAMENES_ENDPOINTS.GET_BY_PACIENTE(pacienteId))
      return response.data
    } catch (error) {
      console.error(`Error fetching lab tests for patient with ID ${pacienteId}:`, error)
      throw error
    }
  },
}
