"use client"

import type React from "react"

import { useState, useCallback } from "react"

interface FormOptions<T> {
  initialValues: T
  onSubmit: (values: T) => void | Promise<void>
  validate?: (values: T) => Record<string, string>
}

interface FormReturn<T> {
  values: T
  errors: Record<string, string>
  touched: Record<string, boolean>
  isSubmitting: boolean
  handleChange: (e: { target: { name: string; value: string } }) => void
  handleBlur: (e: { target: { name: string } }) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  setFieldValue: (name: string, value: any) => void
  setFieldTouched: (name: string, isTouched?: boolean) => void
  resetForm: () => void
}

function useForm<T extends Record<string, any>>({ initialValues, onSubmit, validate }: FormOptions<T>): FormReturn<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = useCallback(() => {
    if (!validate) return {}
    return validate(values)
  }, [values, validate])

  const handleChange = useCallback((e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleBlur = useCallback(
    (e: { target: { name: string } }) => {
      const { name } = e.target
      setTouched((prev) => ({ ...prev, [name]: true }))
      if (validate) {
        const validationErrors = validate(values)
        setErrors(validationErrors)
      }
    },
    [values, validate],
  )

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const setFieldTouched = useCallback((name: string, isTouched = true) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }))
  }, [])

  const resetForm = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const validationErrors = validateForm()
      setErrors(validationErrors)

      // Mark all fields as touched
      const touchedFields = Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      setTouched(touchedFields)

      if (Object.keys(validationErrors).length === 0) {
        setIsSubmitting(true)
        try {
          await onSubmit(values)
        } catch (error) {
          console.error("Form submission error:", error)
        } finally {
          setIsSubmitting(false)
        }
      }
    },
    [values, validateForm, onSubmit],
  )

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm,
  }
}

export default useForm
