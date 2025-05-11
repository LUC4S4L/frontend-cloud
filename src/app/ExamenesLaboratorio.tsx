import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ExamenesLaboratorio.module.css"

export default function ExamenesLaboratorio() {
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
          <h1 className="title">Exámenes de Laboratorio</h1>
        </div>
        <button className="create-button">+ Nuevo Examen</button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando exámenes...</p>
        </div>
      ) : (
        <div className="empty-state">
          <p>No hay exámenes de laboratorio registrados</p>
          <button className="btn-primary">Crear primer examen</button>
        </div>
      )}
    </div>
  )
}
