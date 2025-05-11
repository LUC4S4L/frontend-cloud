"use client"

import { useState, useEffect, useCallback } from "react"
import { expedientesService } from "@/services/expedientesService"
import type { MedicalRecord, MedicalRecordFormData } from "@/types/medicalRecord"

export function useExpedientes(pacienteId?: string) {
  const [expedientes, setExpedientes] = useState<MedicalRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchExpedientes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let data: MedicalRecord[]

      if (pacienteId) {
        data = await expedientesService.getByPacienteId(pacienteId)
      } else {
        data = await expedientesService.getAll()
      }

      setExpedientes(data)
    } catch (err) {
      setError("Error al cargar los expedientes")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [pacienteId])

  const getExpedienteById = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      return await expedientesService.getById(id)
    } catch (err) {
      setError("Error al cargar el expediente")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const createExpediente = useCallback(async (data: MedicalRecordFormData) => {
    setLoading(true)
    setError(null)
    try {
      const newExpediente = await expedientesService.create(data)
      setExpedientes((prev) => [...prev, newExpediente])
      return newExpediente
    } catch (err) {
      setError("Error al crear el expediente")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateExpediente = useCallback(async (id: string, data: MedicalRecordFormData) => {
    setLoading(true)
    setError(null)
    try {
      const updatedExpediente = await expedientesService.update(id, data)
      setExpedientes((prev) => prev.map((e) => (e.id === id ? updatedExpediente : e)))
      return updatedExpediente
    } catch (err) {
      setError("Error al actualizar el expediente")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteExpediente = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await expedientesService.delete(id)
      setExpedientes((prev) => prev.filter((e) => e.id !== id))
      return true
    } catch (err) {
      setError("Error al eliminar el expediente")
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchExpedientes()
  }, [fetchExpedientes])

  return {
    expedientes,
    loading,
    error,
    fetchExpedientes,
    getExpedienteById,
    createExpediente,
    updateExpediente,
    deleteExpediente,
  }
}
