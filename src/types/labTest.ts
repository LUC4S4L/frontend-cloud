import { Patient } from './patient';

export interface LabTest {
  id: string;
  pacienteId: string;
  paciente?: Patient;
  tipo: string;
  laboratorio: string;
  fecha: string;
  descripcion: string;
  estado: 'pendiente' | 'en_proceso' | 'completado' | 'cancelado';
  resultadoUrl?: string;
}

export interface LabTestFormData {
  pacienteId: string;
  tipo: string;
  laboratorio: string;
  fecha: string;
  descripcion: string;
  estado: string;
  resultadoUrl: string;
}