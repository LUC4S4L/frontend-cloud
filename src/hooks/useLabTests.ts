import { useState, useCallback } from 'react';
import { orquestadorService } from '../services/orquestadorService';
import { LabTest } from '../types/labTest';

export const useLabTests = () => {
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [currentTest, setCurrentTest] = useState<LabTest | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getLabTestsByPatientId = useCallback(async (patientId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await orquestadorService.getLaboratoryTests(patientId);
      setLabTests(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to fetch lab tests for patient ID: ${patientId}`;
      setError(errorMessage);
      console.error(`Error fetching lab tests for patient ID: ${patientId}`, err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createLabTest = async (testData: LabTest) => {
    setLoading(true);
    setError(null);
    try {
      const newTest = await orquestadorService.createLaboratoryTest(testData);
      setLabTests(prev => [...prev, newTest]);
      return newTest;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create lab test';
      setError(errorMessage);
      console.error('Error creating lab test:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    labTests,
    currentTest,
    loading,
    error,
    getLabTestsByPatientId,
    createLabTest
  };
};