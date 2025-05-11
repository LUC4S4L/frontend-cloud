import { orquestadorApi } from "./api"
import type { MedicalRecord, MedicalRecordFormData } from "@/types/medicalRecord"
import { EXPEDIENTES_ENDPOINTS } from "@/common/constants/apiEndpoints"

export const expedientesService = {
  /**
   * Get all medical records
   */
  getAll: async (): Promise<MedicalRecord[]> => {
    try {
      const response = await orquestadorApi.get(EXPEDIENTES_ENDPOINTS.GET_ALL)
      return response.data
    } catch (error) {
      console.error("Error fetching medical records:", error)
      throw error
    }
  },

  /**
   * Get medical record by ID
   */
  getById: async (id: string): Promise<MedicalRecord> => {
    try {
      const response = await orquestadorApi.get(EXPEDIENTES_ENDPOINTS.GET_BY_ID(id))
      return response.data
    } catch (error) {
      console.error(`Error fetching medical record with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Create new medical record
   */
  create: async (data: MedicalRecordFormData): Promise<MedicalRecord> => {
    try {
      const response = await orquestadorApi.post(EXPEDIENTES_ENDPOINTS.CREATE, data)
      return response.data
    } catch (error) {
      console.error("Error creating medical record:", error)
      throw error
    }
  },

  /**
   * Update existing medical record
   */
  update: async (id: string, data: MedicalRecordFormData): Promise<MedicalRecord> => {
    try {
      const response = await orquestadorApi.put(EXPEDIENTES_ENDPOINTS.UPDATE(id), data)
      return response.data
    } catch (error) {
      console.error(`Error updating medical record with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Delete medical record
   */
  delete: async (id: string): Promise<void> => {
    try {
      await orquestadorApi.delete(EXPEDIENTES_ENDPOINTS.DELETE(id))
    } catch (error) {
      console.error(`Error deleting medical record with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Get medical records by patient ID
   */
  getByPacienteId: async (pacienteId: string): Promise<MedicalRecord[]> => {
    try {
      const response = await orquestadorApi.get(EXPEDIENTES_ENDPOINTS.GET_BY_PACIENTE(pacienteId))
      return response.data
    } catch (error) {
      console.error(`Error fetching medical records for patient with ID ${pacienteId}:`, error)
      throw error
    }
  },
}
