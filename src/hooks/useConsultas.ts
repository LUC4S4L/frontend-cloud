import { useState, useEffect, useCallback } from 'react';
import { consultasService } from '../services/consultasService';
import { Consulta, ConsultaFormData } from '../types/consulta';

export const useConsultas = () => {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [currentConsulta, setCurrentConsulta] = useState<Consulta | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchConsultas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await consultasService.getAllConsultas();
      setConsultas(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch consultations';
      setError(errorMessage);
      console.error('Error fetching consultations:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getConsultaById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await consultasService.getConsultaById(id);
      setCurrentConsulta(data);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to fetch consultation with ID: ${id}`;
      setError(errorMessage);
      console.error(`Error fetching consultation with ID: ${id}`, err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createConsulta = async (consultaData: ConsultaFormData) => {
    setLoading(true);
    setError(null);
    try {
      const newConsulta = await consultasService.createConsulta(consultaData);
      setConsultas(prev => [...prev, newConsulta]);
      return newConsulta;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create consultation';
      setError(errorMessage);
      console.error('Error creating consultation:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateConsulta = async (id: string, consultaData: ConsultaFormData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedConsulta = await consultasService.updateConsulta(id, consultaData);
      setConsultas(prev => prev.map(c => c.id === id ? updatedConsulta : c));
      if (currentConsulta?.id === id) {
        setCurrentConsulta(updatedConsulta);
      }
      return updatedConsulta;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to update consultation with ID: ${id}`;
      setError(errorMessage);
      console.error(`Error updating consultation with ID: ${id}`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteConsulta = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await consultasService.deleteConsulta(id);
      setConsultas(prev => prev.filter(c => c.id !== id));
      if (currentConsulta?.id === id) {
        setCurrentConsulta(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to delete consultation with ID: ${id}`;
      setError(errorMessage);
      console.error(`Error deleting consultation with ID: ${id}`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getConsultasByPatientId = async (patientId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await consultasService.getConsultasByPatientId(patientId);
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : `Failed to fetch consultations for patient ID: ${patientId}`;
      setError(errorMessage);
      console.error(`Error fetching consultations for patient ID: ${patientId}`, err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultas();
  }, [fetchConsultas]);

  return {
    consultas,
    currentConsulta,
    loading,
    error,
    fetchConsultas,
    getConsultaById,
    createConsulta,
    updateConsulta,
    deleteConsulta,
    getConsultasByPatientId
  };
};