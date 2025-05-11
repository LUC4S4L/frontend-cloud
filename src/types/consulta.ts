import type { Paciente } from "./paciente"

export interface Consulta {
  id: string
  pacienteId: string
  paciente?: Paciente
  doctor: string
  especialidad: string
  fecha: string
  motivo: string
  diagnostico?: string
  tratamiento?: string
  estado: "pendiente" | "completada" | "cancelada"
  createdAt?: string
  updatedAt?: string
}

export interface ConsultaFormData {
  pacienteId: string
  doctor: string
  especialidad: string
  fecha: string
  hora?: string
  motivo: string
  diagnostico?: string
  tratamiento?: string
  estado: string
}
