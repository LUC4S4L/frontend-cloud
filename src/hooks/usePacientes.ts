import { useState, useEffect, useCallback } from 'react';
import { pacientesService } from '../services/pacientesService';
import { Paciente, PatientFormData } from '../types/patient';

export const usePacientes = () => {
  const [patients, setPatients] = useState<Paciente[]>([]);
  const [currentPatient, setCurrentPatient] = useState<Paciente | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await pacientesService.getAllPatients();
      setPatients(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch patients';
      setError(errorMessage);
      console.error('Error fetching patients:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getPatientById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await pacientesService.getPatientById(id);
      setCurrentPatient(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to fetch patient with ID: ${id}`;
      setError(errorMessage);
      console.error(`Error fetching patient with ID: ${id}`, err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createPatient = async (patientData: PatientFormData) => {
    setLoading(true);
    setError(null);
    try {
      const newPatient = await pacientesService.createPatient(patientData);
      setPatients(prev => [...prev, newPatient]);
      return newPatient;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create patient';
      setError(errorMessage);
      console.error('Error creating patient:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePatient = async (id: string, patientData: PatientFormData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedPatient = await pacientesService.updatePatient(id, patientData);
      setPatients(prev => prev.map(p => p.id === id ? updatedPatient : p));
      if (currentPatient?.id === id) {
        setCurrentPatient(updatedPatient);
      }
      return updatedPatient;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to update patient with ID: ${id}`;
      setError(errorMessage);
      console.error(`Error updating patient with ID: ${id}`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePatient = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await pacientesService.deletePatient(id);
      setPatients(prev => prev.filter(p => p.id !== id));
      if (currentPatient?.id === id) {
        setCurrentPatient(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to delete patient with ID: ${id}`;
      setError(errorMessage);
      console.error(`Error deleting patient with ID: ${id}`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchPatients = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await pacientesService.searchPatients(query);
      setPatients(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search patients';
      setError(errorMessage);
      console.error('Error searching patients:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return {
    patients,
    currentPatient,
    loading,
    error,
    fetchPatients,
    getPatientById,
    createPatient,
    updatePatient,
    deletePatient,
    searchPatients
  };
};