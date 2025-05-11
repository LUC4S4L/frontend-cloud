import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./HistoriasClinicas.module.css"

export default function HistoriasClinicas() {
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
          <h1 className="title">Historias Clínicas</h1>
        </div>
        <button className="create-button">+ Nueva Historia</button>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando historias clínicas...</p>
        </div>
      ) : (
        <div className="empty-state">
          <p>No hay historias clínicas registradas</p>
          <button className="btn-primary">Crear primera historia</button>
        </div>
      )}
    </div>
  )
}
