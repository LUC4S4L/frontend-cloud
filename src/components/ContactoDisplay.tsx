import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { pacientesService } from "../services/pacientesService"
import type { ContactoInfo } from "../types/paciente"

interface ContactoDisplayProps {
  pacienteId: string
}

const ContactoDisplay: React.FC<ContactoDisplayProps> = ({ pacienteId }) => {
  const [contacto, setContacto] = useState<ContactoInfo | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadContacto()
  }, [pacienteId])

  const loadContacto = async () => {
    if (!pacienteId) return

    try {
      setLoading(true)
      setError(null)
      const data = await pacientesService.getContacto(pacienteId)
      setContacto(data)
    } catch (err: any) {
      console.error("Error loading contact info:", err)
      // If it's a 404, we'll just show the "No contact info" message
      if (err.response && err.response.status === 404) {
        setContacto(null)
      } else {
        setError("Error al cargar la información de contacto: " + (err.message || "Error desconocido"))
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Cargando información de contacto...</div>
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={loadContacto} className="btn btn-primary">
          Reintentar
        </button>
      </div>
    )
  }

  if (!contacto) {
    return (
      <div className="no-contacto">
        <p>No hay información de contacto registrada para este paciente.</p>
        <button
          onClick={() => navigate(`/pacientes/${pacienteId}/contacto/editar`)}
          className="btn btn-primary"
        >
          Agregar Información de Contacto
        </button>
      </div>
    )
  }

  return (
    <div className="contacto-display">
      <h3>Información de Contacto</h3>
      
      <div className="contacto-details">
        <div className="contacto-item">
          <strong>Teléfono:</strong> {contacto.telefono || "No registrado"}
        </div>
        
        <div className="contacto-item">
          <strong>Email:</strong> {contacto.email || "No registrado"}
        </div>
        
        <div className="contacto-item">
          <strong>Dirección:</strong> {contacto.direccion || "No registrada"}
        </div>
      </div>
      
      <div className="contacto-actions">
        <button
          onClick={() => navigate(`/pacientes/${pacienteId}/contacto/editar`)}
          className="btn btn-warning"
        >
          Editar Información de Contacto
        </button>
      </div>
    </div>
  )
}

export default ContactoDisplay