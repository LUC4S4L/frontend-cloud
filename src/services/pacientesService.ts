import { pacientesApi } from './api';
import { Paciente, PatientFormData } from '../types/patient';

export const pacientesService = {
  // Get all patients
  getAllPatients: async (): Promise<Paciente[]> => {
    const response = await pacientesApi.get<Paciente[]>('/pacientes');
    return response.data;
  },
  
  // Get patient by ID
  getPatientById: async (id: string): Promise<Paciente> => {
    const response = await pacientesApi.get<Paciente>(`/pacientes/${id}`);
    return response.data;
  },
  
  // Create new patient
  createPatient: async (patientData: PatientFormData): Promise<Paciente> => {
    const response = await pacientesApi.post<Paciente>('/pacientes', patientData);
    return response.data;
  },
  
  // Update patient
  updatePatient: async (id: string, patientData: PatientFormData): Promise<Paciente> => {
    const response = await pacientesApi.put<Paciente>(`/pacientes/${id}`, patientData);
    return response.data;
  },
  
  // Delete patient
  deletePatient: async (id: string): Promise<void> => {
    await pacientesApi.delete(`/pacientes/${id}`);
  },
  
  // Search patients
  searchPatients: async (query: string): Promise<Paciente[]> => {
    const response = await pacientesApi.get<Paciente[]>(`/pacientes/search?q=${query}`);
    return response.data;
  }
};