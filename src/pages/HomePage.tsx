import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./HomePage.css"

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500) // Reduced loading time

    return () => clearTimeout(timer)
  }, [])

  const navigateTo = (path: string) => {
    navigate(path)
  }

  return (
    <div className="container">
      <div className="home-header">
        <div>
          <h1 className="home-title">Panel de Control</h1>
          <p className="home-subtitle">Bienvenido al sistema de gestión clínica</p>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="content-grid">
          <div className="card">
            <h2 className="card-title">Acceso Rápido</h2>
            <div className="quick-access">
              <button className="quick-access-btn" onClick={() => navigateTo("/pacientes")}>
                <span className="quick-access-icon">👤</span>
                <span>Pacientes</span>
              </button>
              <button className="quick-access-btn" onClick={() => navigateTo("/consultas")}>
                <span className="quick-access-icon">📅</span>
                <span>Consultas</span>
              </button>
              <button className="quick-access-btn" onClick={() => navigateTo("/examenes")}>
                <span className="quick-access-icon">🧪</span>
                <span>Exámenes</span>
              </button>
              <button className="quick-access-btn" onClick={() => navigateTo("/historias")}>
                <span className="quick-access-icon">📋</span>
                <span>Historias</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}