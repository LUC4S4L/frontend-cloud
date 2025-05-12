import { api } from "../api"
import type { Paciente, PacienteFormData, ContactoInfo, ContactoFormData } from "../types"

class PacientesService {
  /**
   * Get all patients
   */
  async getAll(): Promise<Paciente[]> {
    try {
      const response = await api.get("/pacientes")
      return response.data
    } catch (error) {
      console.error("Error fetching patients:", error)
      throw error
    }
  }

  /**
   * Get patient by ID
   */
  async getById(id: string): Promise<Paciente> {
    try {
      const response = await api.get(`/pacientes/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching patient with ID ${id}:`, error)
      throw error
    }
  }

  /**
   * Get patient contact information
   */
  async getContacto(id: string): Promise<ContactoInfo> {
    try {
      const response = await api.get(`/pacientes/${id}/contacto`)
      return response.data
    } catch (error) {
      console.error(`Error fetching contact info for patient with ID ${id}:`, error)
      throw error
    }
  }

  /**
   * Create new patient
   */
  async create(data: PacienteFormData): Promise<Paciente> {
    try {
      // Try POST first
      try {
        const response = await api.post("/pacientes", data)
        return response.data
      } catch (postError: any) {
        // If POST fails with 405, try PUT
        if (postError.response && postError.response.status === 405) {
          console.log("POST method not allowed, trying PUT...")
          const response = await api.put("/pacientes", data)
          return response.data
        }
        throw postError
      }
    } catch (error) {
      console.error("Error creating patient:", error)
      throw error
    }
  }

  /**
   * Update existing patient
   */
  async update(id: string, data: PacienteFormData): Promise<Paciente> {
    try {
      // Try PUT first
      try {
        const response = await api.put(`/pacientes/${id}`, data)
        return response.data
      } catch (putError: any) {
        // If PUT fails with 405, try PATCH
        if (putError.response && putError.response.status === 405) {
          console.log("PUT method not allowed, trying PATCH...")
          const response = await api.patch(`/pacientes/${id}`, data)
          return response.data
        }
        throw putError
      }
    } catch (error) {
      console.error(`Error updating patient with ID ${id}:`, error)
      throw error
    }
  }

  /**
   * Update patient contact information
   */
  async updateContacto(id: string, data: ContactoFormData): Promise<ContactoInfo> {
    try {
      // Try POST first (common for updating related resources)
      try {
        const response = await api.post(`/pacientes/${id}/contacto`, data)
        return response.data
      } catch (postError: any) {
        // If POST fails with 405, try PUT
        if (postError.response && postError.response.status === 405) {
          console.log("POST method not allowed, trying PUT...")
          const response = await api.put(`/pacientes/${id}/contacto`, data)
          return response.data
        }
        throw postError
      }
    } catch (error) {
      console.error(`Error updating contact info for patient with ID ${id}:`, error)
      throw error
    }
  }

  /**
   * Delete patient
   */
  async delete(id: string): Promise<void> {
    try {
      await api.delete(`/pacientes/${id}`)
    } catch (error) {
      console.error(`Error deleting patient with ID ${id}:`, error)
      throw error
    }
  }
}

export const pacientesService = new PacientesService()