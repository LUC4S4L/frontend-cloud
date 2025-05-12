import { useState, useEffect } from "react"
import { pacientesService } from "../services/pacientesService"
import type { Paciente, PacienteFormData } from "../types"

interface PacienteFormProps {
  paciente?: Paciente | null
  onSuccess?: () => void
  onCancel?: () => void
}

export default function PacienteForm({ paciente, onSuccess, onCancel }: PacienteFormProps) {
  const [formData, setFormData] = useState<PacienteFormData>({
    nombre: "",
    apellido: "",
    tipoDocumento: "DNI",
    documento: "", // Make sure this is initialized as empty string, not undefined
    fechaNacimiento: "",
    genero: "masculino"
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Load patient data if editing
  useEffect(() => {
    if (paciente) {
      setFormData({
        nombre: paciente.nombre || "",
        apellido: paciente.apellido || "",
        tipoDocumento: paciente.tipoDocumento || "DNI",
        documento: paciente.documento || paciente.dni || "",
        fechaNacimiento: paciente.fechaNacimiento || paciente.fecha_nac || "",
        genero: paciente.genero || paciente.sexo || "masculino"
      })
    }
  }, [paciente])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido"
    }
    
    // Fix for the TypeScript error - safely check documento
    if (!formData.documento || !formData.documento.trim()) {
      newErrors.documento = "El documento es requerido"
    }
    
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      if (paciente) {
        // Update existing patient
        await pacientesService.update(String(paciente.id), formData)
      } else {
        // Create new patient
        await pacientesService.create(formData)
      }
      
      setSubmitSuccess(true)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      console.error("Error saving patient:", error)
      
      let errorMessage = paciente 
        ? "Error al actualizar el paciente" 
        : "Error al crear el paciente"
        
      if (error.response) {
        errorMessage += `: ${error.response.status} ${error.response.statusText}`
        
        // Special handling for common error codes
        if (error.response.status === 405) {
          errorMessage += " - Método no permitido. El servidor no acepta este tipo de solicitud."
        }
      } else if (error.request) {
        errorMessage += ": No se recibió respuesta del servidor"
      } else {
        errorMessage += `: ${error.message}`
      }
      
      setSubmitError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h2>{paciente ? "Editar Paciente" : "Nuevo Paciente"}</h2>
      
      {submitSuccess && (
        <div>
          {paciente ? "Paciente actualizado exitosamente." : "Paciente creado exitosamente."}
        </div>
      )}
      
      {submitError && (
        <div>
          <p>{submitError}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre*</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <span>{errors.nombre}</span>}
        </div>
        
        <div>
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido || ""}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="tipoDocumento">Tipo de Documento</label>
          <select
            id="tipoDocumento"
            name="tipoDocumento"
            value={formData.tipoDocumento || "DNI"}
            onChange={handleChange}
          >
            <option value="DNI">DNI</option>
            <option value="Pasaporte">Pasaporte</option>
            <option value="Cédula">Cédula</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="documento">Número de Documento*</label>
          <input
            type="text"
            id="documento"
            name="documento"
            value={formData.documento || ""}
            onChange={handleChange}
          />
          {errors.documento && <span>{errors.documento}</span>}
        </div>
        
        <div>
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            name="fechaNacimiento"
            value={formData.fechaNacimiento || ""}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="genero">Género</label>
          <select
            id="genero"
            name="genero"
            value={formData.genero || "masculino"}
            onChange={handleChange}
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        
        <div>
          <button 
            type="button" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : paciente ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  )
}