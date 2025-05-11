import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./ConsultasMedicas.module.css"

export default function ConsultasMedicas() {
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
          <h1 className="title">Consultas Médicas</h1>
        </div>
        <button className="create-button">+ Nueva Consulta</button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando consultas...</p>
        </div>
      ) : (
        <div className="empty-state">
          <p>No hay consultas registradas</p>
          <button className="btn-primary">Crear primera consulta</button>
        </div>
      )}
    </div>
  )
}
