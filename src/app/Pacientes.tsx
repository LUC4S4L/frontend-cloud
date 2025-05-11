import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Pacientes.module.css"

export default function Pacientes() {
  const [loading] = useState(false)
  const navigate = useNavigate()

  const handleReturnToHome = () => {
    navigate("/")
  }

  return (
    <div className="container">
      <div className="header">
        <div className="title-container">
          <button className="back-button" onClick={handleReturnToHome}>
            ← Volver
          </button>
          <h1 className="title">Pacientes</h1>
        </div>
        <button className="create-button">+ Nuevo Paciente</button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando pacientes...</p>
        </div>
      ) : (
        <div className="empty-state">
          <p>No hay pacientes registrados</p>
          <button className="btn-primary">Crear primer paciente</button>
        </div>
      )}
    </div>
  )
}
