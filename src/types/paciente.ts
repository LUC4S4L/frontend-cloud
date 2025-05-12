export interface Paciente {
  id: string;
  nombre: string;
  apellido: string;
  documento: string;
  fechaNacimiento: string;
  genero: string;
}

// Form data for creating/updating a patient (without ID)
export type PacienteFormData = Omit<Paciente, 'id'>;

// Contact information for a patient
export interface ContactoInfo {
  pacienteId: string;
  telefono: string;
  email: string;
  direccion: string;
}

// Form data for creating/updating contact information
export type ContactoFormData = Omit<ContactoInfo, 'pacienteId'>;