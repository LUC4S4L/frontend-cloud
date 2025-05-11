export interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  edad: number;
  genero: string;
  telefono: string;
  email: string;
  direccion: string;
  fechaRegistro?: string;
}

export interface PatientFormData {
  nombre: string;
  apellido: string;
  dni: string;
  edad: string | number;
  genero: string;
  telefono: string;
  email: string;
  direccion: string;
}