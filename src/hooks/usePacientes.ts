import { useState, useEffect, useCallback } from "react"
import { pacientesService } from "@/services/pacientesService"
import type { Paciente, PacienteFormData } from "@/types/paciente"

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPacientes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await pacientesService.getAll()
      setPacientes(data)
    } catch (err) {
      setError("Error al cargar los pacientes")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const getPacienteById = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      return await pacientesService.getById(id)
    } catch (err) {
      setError("Error al cargar el paciente")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const createPaciente = useCallback(async (data: PacienteFormData) => {
    setLoading(true)
    setError(null)
    try {
      const newPaciente = await pacientesService.create(data)
      setPacientes((prev) => [...prev, newPaciente])
      return newPaciente
    } catch (err) {
      setError("Error al crear el paciente")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePaciente = useCallback(async (id: string, data: PacienteFormData) => {
    setLoading(true)
    setError(null)
    try {
      const updatedPaciente = await pacientesService.update(id, data)
      setPacientes((prev) => prev.map((p) => (p.id === id ? updatedPaciente : p)))
      return updatedPaciente
    } catch (err) {
      setError("Error al actualizar el paciente")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const deletePaciente = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await pacientesService.delete(id)
      setPacientes((prev) => prev.filter((p) => p.id !== id))
      return true
    } catch (err) {
      setError("Error al eliminar el paciente")
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const searchPacientes = useCallback(async (query: string) => {
    setLoading(true)
    setError(null)
    try {
      const results = await pacientesService.search(query)
      return results
    } catch (err) {
      setError("Error al buscar pacientes")
      console.error(err)
      return []
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPacientes()
  }, [fetchPacientes])

  return {
    pacientes,
    loading,
    error,
    fetchPacientes,
    getPacienteById,
    createPaciente,
    updatePaciente,
    deletePaciente,
    searchPacientes,
  }
}
