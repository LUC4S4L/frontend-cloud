import { useState, useCallback } from 'react';
import { orquestadorService } from '../services/orquestadorService';
import { MedicalRecord } from '../types/medicalRecord';

export const useMedicalRecords = () => {
  const [patientHistory, setPatientHistory] = useState<MedicalRecord[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getPatientHistory = useCallback(async (patientId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await orquestadorService.getPatientHistory(patientId);
      setPatientHistory(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to fetch medical records for patient ID: ${patientId}`;
      setError(errorMessage);
      console.error(`Error fetching medical records for patient ID: ${patientId}`, err);
      setPatientHistory(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    patientHistory,
    loading,
    error,
    getPatientHistory
  };
};