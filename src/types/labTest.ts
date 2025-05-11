import type { Paciente } from "./paciente"

export interface LabTest {
  id: string
  pacienteId: string
  paciente?: Paciente
  tipo: string
  fecha: string
  resultadoUrl?: string
  resultados?: string
  observaciones?: string
  estado: "pendiente" | "completado" | "cancelado"
  createdAt?: string
  updatedAt?: string
}

export interface LabTestFormData {
  pacienteId: string
  tipo: string
  fecha: string
  hora?: string
  resultadoUrl?: string
  resultados?: string
  observaciones?: string
  estado: string
}
