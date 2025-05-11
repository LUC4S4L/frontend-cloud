// services/consultasService.ts
import { Consulta, ConsultaFormData } from '../types/consulta';
import apiClient from './apiClient';

const API_URL = import.meta.env.VITE_CONSULTAS_URL || 'http://localhost:8001/api';

export const consultasService = {
  getAllConsultas: async (): Promise<Consulta[]> => {
    try {
      const response = await apiClient.get(`${API_URL}/consultas`);
      return response.data;
    } catch (error) {
      console.error('Error fetching consultas:', error);
      throw error;
    }
  },

  getConsultaById: async (id: string): Promise<Consulta> => {
    try {
      const response = await apiClient.get(`${API_URL}/consultas/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching consulta with ID ${id}:`, error);
      throw error;
    }
  },

  getConsultasByPatientId: async (patientId: string): Promise<Consulta[]> => {
    try {
      const response = await apiClient.get(`${API_URL}/consultas?pacienteId=${patientId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching consultas for patient ID ${patientId}:`, error);
      throw error;
    }
  },

  createConsulta: async (consultaData: ConsultaFormData): Promise<Consulta> => {
    try {
      const response = await apiClient.post(`${API_URL}/consultas`, consultaData);
      return response.data;
    } catch (error) {
      console.error('Error creating consulta:', error);
      throw error;
    }
  },

  updateConsulta: async (id: string, consultaData: ConsultaFormData): Promise<Consulta> => {
    try {
      const response = await apiClient.put(`${API_URL}/consultas/${id}`, consultaData);
      return response.data;
    } catch (error) {
      console.error(`Error updating consulta with ID ${id}:`, error);
      throw error;
    }
  },

  deleteConsulta: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`${API_URL}/consultas/${id}`);
    } catch (error) {
      console.error(`Error deleting consulta with ID ${id}:`, error);
      throw error;
    }
  }
};