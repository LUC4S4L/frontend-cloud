export const ROUTES = {
  HOME: "/",

  // Pacientes
  PACIENTES: "/pacientes",
  PACIENTE_DETAIL: (id: string) => `/pacientes/${id}`,
  PACIENTE_CREATE: "/pacientes/crear",
  PACIENTE_EDIT: (id: string) => `/pacientes/${id}/editar`,

  // Consultas
  CONSULTAS: "/consultas",
  CONSULTA_DETAIL: (id: string) => `/consultas/${id}`,
  CONSULTA_CREATE: "/consultas/crear",
  CONSULTA_EDIT: (id: string) => `/consultas/${id}/editar`,

  // Exámenes de Laboratorio
  EXAMENES: "/examenes",
  EXAMEN_DETAIL: (id: string) => `/examenes/${id}`,
  EXAMEN_CREATE: "/examenes/crear",
  EXAMEN_EDIT: (id: string) => `/examenes/${id}/editar`,

  // Historias Clínicas
  HISTORIAS: "/historias",
  HISTORIA_DETAIL: (id: string) => `/historias/${id}`,
  HISTORIA_CREATE: "/historias/crear",
  HISTORIA_EDIT: (id: string) => `/historias/${id}/editar`,

  // Auth
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  // User
  PROFILE: "/profile",
  SETTINGS: "/settings",

  // Error
  NOT_FOUND: "/404",
  SERVER_ERROR: "/500",
}
