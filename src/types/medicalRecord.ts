import type { Paciente } from "./paciente"

export interface MedicalRecord {
  id: string
  pacienteId: string
  paciente?: Paciente
  tipo: string
  titulo: string
  descripcion: string
  fecha: string
  archivos?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface MedicalRecordFormData {
  pacienteId: string
  tipo: string
  titulo: string
  descripcion: string
  fecha: string
  archivos?: string[]
}
