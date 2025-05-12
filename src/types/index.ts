// Patient interfaces
export interface Paciente {
  id: string | number
  nombre: string
  apellido?: string
  tipoDocumento?: string
  documento?: string
  dni?: string
  fechaNacimiento?: string
  fecha_nac?: string
  genero?: string
  sexo?: string
  createdAt?: string
  updatedAt?: string
}

export interface PacienteFormData {
  nombre: string
  apellido?: string
  tipoDocumento?: string
  documento: string
  fechaNacimiento?: string
  genero?: string
}

// Contact interfaces
export interface ContactoInfo {
  pacienteId?: string | number
  id_paciente?: string | number
  telefono: string
  email?: string
  direccion?: string
  createdAt?: string
  updatedAt?: string
}

export interface ContactoFormData {
  telefono: string
  email?: string
  direccion?: string
}