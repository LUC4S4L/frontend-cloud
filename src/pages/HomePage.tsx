"use client"

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
    }, 1000)

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
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-title">Total Pacientes</div>
              <div className="stat-value">120</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">Total Consultas</div>
              <div className="stat-value">450</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">Exámenes Pendientes</div>
              <div className="stat-value">32</div>
            </div>
            <div className="stat-card">
              <div className="stat-title">Expedientes Médicos</div>
              <div className="stat-value">215</div>
            </div>
          </div>

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
        </>
      )}
    </div>
  )
}
