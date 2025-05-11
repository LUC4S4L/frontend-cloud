import { Patient } from './patient';

export interface Consulta {
  id: string;
  pacienteId: string;
  paciente?: Patient;
  doctor: string;
  especialidad: string;
  fecha: string;
  motivo: string;
  diagnostico?: string;
  tratamiento?: string;
  estado: 'pendiente' | 'completada' | 'cancelada';
}

export interface ConsultaFormData {
  pacienteId: string;
  doctor: string;
  especialidad: string;
  fecha: string;
  hora?: string;
  motivo: string;
  diagnostico: string;
  tratamiento: string;
  estado: string;
}