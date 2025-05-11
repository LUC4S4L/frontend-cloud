"use client"

import { useState, useEffect, useCallback } from "react"
import { consultasService } from "@/services/consultasService"
import type { Consulta, ConsultaFormData } from "@/types/consulta"

export function useConsultas(pacienteId?: string) {
  const [consultas, setConsultas] = useState<Consulta[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchConsultas = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      let data: Consulta[]

      if (pacienteId) {
        data = await consultasService.getByPacienteId(pacienteId)
      } else {
        data = await consultasService.getAll()
      }

      setConsultas(data)
    } catch (err) {
      setError("Error al cargar las consultas")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [pacienteId])

  const getConsultaById = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      return await consultasService.getById(id)
    } catch (err) {
      setError("Error al cargar la consulta")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const createConsulta = useCallback(async (data: ConsultaFormData) => {
    setLoading(true)
    setError(null)
    try {
      const newConsulta = await consultasService.create(data)
      setConsultas((prev) => [...prev, newConsulta])
      return newConsulta
    } catch (err) {
      setError("Error al crear la consulta")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const updateConsulta = useCallback(async (id: string, data: ConsultaFormData) => {
    setLoading(true)
    setError(null)
    try {
      const updatedConsulta = await consultasService.update(id, data)
      setConsultas((prev) => prev.map((c) => (c.id === id ? updatedConsulta : c)))
      return updatedConsulta
    } catch (err) {
      setError("Error al actualizar la consulta")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const deleteConsulta = useCallback(async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await consultasService.delete(id)
      setConsultas((prev) => prev.filter((c) => c.id !== id))
      return true
    } catch (err) {
      setError("Error al eliminar la consulta")
      console.error(err)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const updateConsultaStatus = useCallback(async (id: string, status: string) => {
    setLoading(true)
    setError(null)
    try {
      const updatedConsulta = await consultasService.updateStatus(id, status)
      setConsultas((prev) => prev.map((c) => (c.id === id ? updatedConsulta : c)))
      return updatedConsulta
    } catch (err) {
      setError("Error al actualizar el estado de la consulta")
      console.error(err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchConsultas()
  }, [fetchConsultas])

  return {
    consultas,
    loading,
    error,
    fetchConsultas,
    getConsultaById,
    createConsulta,
    updateConsulta,
    deleteConsulta,
    updateConsultaStatus,
  }
}
