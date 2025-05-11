"use client"

import { useState, useEffect, useCallback } from "react"
import { examenesService } from "@/services/examenesService"
import type { LabTest, LabTestFormData } from "@/types/labTest"

export function useExamenes(pacienteId?: string) {
  const [examenes, setExamenes] = useState<LabTest[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchExamenes = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let data: LabTest[]

      if (pacienteId) {
        data = await examenesService.getByPacienteId(pacienteId)
      } else {
        data = await examenesService.getAll()
      }

      setExamenes(data)
    } catch (err) {
      setError("Error al cargar los exámenes")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [pacienteId])

  const getExamenById = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      return await examenesService.getById(id)
    } catch (err) {
      setError("Error al cargar el examen")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const createExamen = useCallback(async (data: LabTestFormData) => {
    setLoading(true)
    setError(null)
    try {
      const newExamen = await examenesService.create(data)
      setExamenes((prev) => [...prev, newExamen])
      return newExamen
    } catch (err) {
      setError("Error al crear el examen")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateExamen = useCallback(async (id: string, data: LabTestFormData) => {
    setLoading(true)
    setError(null)
    try {
      const updatedExamen = await examenesService.update(id, data)
      setExamenes((prev) => prev.map((e) => (e.id === id ? updatedExamen : e)))
      return updatedExamen
    } catch (err) {
      setError("Error al actualizar el examen")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteExamen = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await examenesService.delete(id)
      setExamenes((prev) => prev.filter((e) => e.id !== id))
      return true
    } catch (err) {
      setError("Error al eliminar el examen")
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const updateExamenStatus = useCallback(async (id: string, status: string) => {
    setLoading(true)
    setError(null)
    try {
      const updatedExamen = await examenesService.updateStatus(id, status)
      setExamenes((prev) => prev.map((e) => (e.id === id ? updatedExamen : e)))
      return updatedExamen
    } catch (err) {
      setError("Error al actualizar el estado del examen")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchExamenes()
  }, [fetchExamenes])

  return {
    examenes,
    loading,
    error,
    fetchExamenes,
    getExamenById,
    createExamen,
    updateExamen,
    deleteExamen,
    updateExamenStatus,
  }
}
