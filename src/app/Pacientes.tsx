import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { pacientesService } from "../services/pacientesService"
import type { Paciente } from "../types/paciente"

const Pacientes: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadPacientes()
  }, [])

  const loadPacientes = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await pacientesService.getAll()
      setPacientes(data)
    } catch (err: any) {
      console.error("Error loading patients:", err)
      setError("Error al cargar los pacientes: " + (err.message || "Error desconocido"))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Está seguro que desea eliminar este paciente?")) {
      return
    }

    try {
      setLoading(true)
      await pacientesService.delete(id)
      // Refresh the list after deletion
      await loadPacientes()
    } catch (err: any) {
      console.error("Error deleting patient:", err)
      setError("Error al eliminar el paciente: " + (err.message || "Error desconocido"))
      setLoading(false)
    }
  }

  const testApiConnection = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Test getting all patients
      const patients = await pacientesService.getAll()
      console.log("API Test - Patients:", patients)
      
      alert(`API connection successful! Found ${patients.length} patients.`)
    } catch (err: any) {
      console.error("API Test Error:", err)
      
      let errorMessage = "API connection failed"
      if (err.response) {
        errorMessage += `: ${err.response.status} ${err.response.statusText}`
      } else if (err.request) {
        errorMessage += ": No response received from server"
      } else {
        errorMessage += `: ${err.message}`
      }
      
      alert(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pacientes-container">
      <h1>Pacientes</h1>
      
      <div className="actions-container">
        <Link to="/pacientes/nuevo" className="btn btn-primary">
          Nuevo Paciente
        </Link>
        
        <button 
          className="btn btn-secondary test-api-button" 
          onClick={testApiConnection}
          disabled={loading}
        >
          Test API Connection
        </button>
      </div>

      {loading && <p>Cargando pacientes...</p>}
      
      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={loadPacientes} className="btn btn-primary">
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && pacientes.length === 0 && (
        <p>No hay pacientes registrados.</p>
      )}

      {pacientes.length > 0 && (
        <table className="pacientes-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Documento</th>
              <th>Fecha de Nacimiento</th>
              <th>Género</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((paciente) => (
              <tr key={paciente.id}>
                <td>{paciente.id}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellido}</td>
                <td>{paciente.documento}</td>
                <td>{paciente.fechaNacimiento}</td>
                <td>{paciente.genero}</td>
                <td className="actions-cell">
                  <button
                    onClick={() => navigate(`/pacientes/${paciente.id}`)}
                    className="btn btn-info"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => navigate(`/pacientes/${paciente.id}/editar`)}
                    className="btn btn-warning"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(paciente.id)}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <div className="debug-section">
        <h3>Debug Information</h3>
        <p>Total Patients: {pacientes.length}</p>
        <p>API Status: {error ? "Error" : loading ? "Loading" : "Connected"}</p>
      </div>
    </div>
  )
}

export default Pacientes