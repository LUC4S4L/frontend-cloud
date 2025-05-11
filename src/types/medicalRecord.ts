import { Patient } from './patient';

export interface MedicalRecord {
  id: string;
  pacienteId: string;
  paciente?: Patient;
  tipo: 'consulta' | 'examen' | 'cirugia' | 'vacuna' | 'otro';
  fecha: string;
  descripcion: string;
  doctor?: string;
  especialidad?: string;
  diagnostico?: string;
  tratamiento?: string;
}

export interface MedicalRecordFormData {
  pacienteId: string;
  tipo: string;
  fecha: string;
  descripcion: string;
  doctor: string;
  especialidad: string;
  diagnostico: string;
  tratamiento: string;
}