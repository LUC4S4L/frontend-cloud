import { useState, useEffect } from "react"
import { pacientesService } from "../services/pacientesService"
import type { Paciente } from "../types"

export default function PacienteList() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPacientes()
  }, [])

  const fetchPacientes = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await pacientesService.getAll()
      setPacientes(data)
    } catch (err: any) {
      console.error("Error fetching patients:", err)
      setError("Error al cargar los pacientes")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return dateString
      
      return new Intl.DateTimeFormat('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(date)
    } catch (e) {
      return dateString
    }
  }

  if (loading) {
    return <div>Cargando pacientes...</div>
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={fetchPacientes}>Reintentar</button>
      </div>
    )
  }

  if (pacientes.length === 0) {
    return <div>No hay pacientes registrados</div>
  }

  return (
    <div>
      <h2>Lista de Pacientes</h2>
      <button onClick={fetchPacientes}>Actualizar</button>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Documento</th>
            <th>Fecha Nacimiento</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map(paciente => (
            <tr key={paciente.id}>
              <td>{paciente.id}</td>
              <td>{paciente.nombre} {paciente.apellido}</td>
              <td>{paciente.documento || paciente.dni || "N/A"}</td>
              <td>{formatDate(paciente.fechaNacimiento || paciente.fecha_nac)}</td>
              <td>
                {paciente.genero === 'masculino' || paciente.sexo === 'm' ? 'Masculino' : 
                 paciente.genero === 'femenino' || paciente.sexo === 'f' ? 'Femenino' : 'Otro'}
              </td>
              <td>
                <button>Ver</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}