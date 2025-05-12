import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { pacientesService } from "../services/pacientesService"
import type { Paciente } from "../types"
import PacienteForm from "../components/PacienteForm"
import ContactoForm from "../components/ContactoForm"
import PacienteList from "../components/PacienteList"

export default function Pacientes() {
  const [selectedPatient, setSelectedPatient] = useState<Paciente | null>(null)
  const [showPatientForm, setShowPatientForm] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const navigate = useNavigate()

  const handleReturnToHome = () => {
    navigate("/")
  }

  const handleCreatePatient = () => {
    setSelectedPatient(null)
    setShowPatientForm(true)
  }

  const handlePatientFormSuccess = () => {
    setShowPatientForm(false)
    // Refresh the patient list
  }

  const handleContactFormSuccess = () => {
    setShowContactForm(false)
    // Refresh contact info if needed
  }

  const handleLookupPatient = async (id: string) => {
    try {
      const patient = await pacientesService.getById(id)
      setSelectedPatient(patient)
    } catch (error) {
      console.error("Error fetching patient:", error)
      alert(`Error al buscar el paciente con ID ${id}`)
    }
  }

  const testApiConnection = async () => {
    try {
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
    }
  }

  return (
    <div>
      <div>
        <button onClick={handleReturnToHome}>
          ← Volver
        </button>
        <h1>Pacientes</h1>
        <button onClick={testApiConnection}>
          Test API Connection
        </button>
      </div>

      <div>
        <button onClick={handleCreatePatient}>
          + Nuevo Paciente
        </button>
      </div>

      {/* Patient Lookup Form */}
      <div>
        <h2>Buscar Paciente por ID</h2>
        <input
          type="text"
          placeholder="Ingrese ID del paciente"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleLookupPatient(e.currentTarget.value)
            }
          }}
        />
        <button onClick={(e) => handleLookupPatient((e.currentTarget.previousSibling as HTMLInputElement).value)}>
          Buscar
        </button>
      </div>

      {/* Patient Form */}
      {showPatientForm && (
        <div>
          <PacienteForm 
            paciente={selectedPatient}
            onSuccess={handlePatientFormSuccess} 
            onCancel={() => setShowPatientForm(false)} 
          />
        </div>
      )}

      {/* Contact Form */}
      {showContactForm && selectedPatient && (
        <div>
          <ContactoForm 
            paciente={selectedPatient}
            onSuccess={handleContactFormSuccess} 
            onCancel={() => setShowContactForm(false)} 
          />
        </div>
      )}

      {/* Patient List */}
      <PacienteList />
    </div>
  )
}