import { useState, useEffect } from "react"
import { pacientesService } from "../services/pacientesService"
import type { Paciente, ContactoFormData, ContactoInfo } from "../types"

interface ContactoFormProps {
  paciente: Paciente
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ContactoForm({ paciente, onSuccess, onCancel }: ContactoFormProps) {
  const [formData, setFormData] = useState<ContactoFormData>({
    telefono: "",
    email: "",
    direccion: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Try to load existing contact data if available
  useEffect(() => {
    const fetchContacto = async () => {
      setIsLoading(true)
      try {
        const contacto = await pacientesService.getContacto(String(paciente.id))
        setFormData({
          telefono: contacto.telefono || "",
          email: contacto.email || "",
          direccion: contacto.direccion || "",
        })
      } catch (err: any) {
        // If no contact info exists yet, just use empty form
        console.log("No existing contact info found or error occurred, using empty form")
      } finally {
        setIsLoading(false)
      }
    }

    fetchContacto()
  }, [paciente.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido"
    }
    
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido"
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
      await pacientesService.updateContacto(String(paciente.id), formData)
      setSubmitSuccess(true)
      
      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      console.error("Error updating contact info:", error)
      
      let errorMessage = "Error al actualizar la información de contacto"
        
      if (error.response) {
        errorMessage += `: ${error.response.status} ${error.response.statusText}`
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

  if (isLoading) {
    return <div>Cargando información de contacto...</div>
  }

  return (
    <div>
      <h2>Información de Contacto</h2>
      
      {submitSuccess && (
        <div>
          Información de contacto actualizada exitosamente.
        </div>
      )}
      
      {submitError && (
        <div>
          <p>{submitError}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="telefono">Teléfono*</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
          {errors.telefono && <span>{errors.telefono}</span>}
        </div>
        
        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        
        <div>
          <label htmlFor="direccion">Dirección</label>
          <textarea
            id="direccion"
            name="direccion"
            value={formData.direccion || ""}
            onChange={handleChange}
            rows={3}
          />
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
            {isSubmitting ? "Guardando..." : "Guardar Contacto"}
          </button>
        </div>
      </form>
    </div>
  )
}