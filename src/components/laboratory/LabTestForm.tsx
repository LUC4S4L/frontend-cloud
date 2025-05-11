import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Label from '../ui/Label';
import { LabTest } from '../../types/labTest';
import styles from './LabTestForm.module.css';

// Define a separate interface for the form data that includes hora
interface LabTestFormData {
  pacienteId: string;
  tipo: string;
  laboratorio: string;
  fecha: string;
  hora: string; // Added for form handling
  estado: string;
  resultados: string; // Using plural form to match the type
  observaciones: string; // Using plural form to match the type
}

interface LabTestFormProps {
  test: LabTest | null;
  onSubmit: (data: LabTest) => void;
  readOnly?: boolean;
}

const LabTestForm: React.FC<LabTestFormProps> = ({ test, onSubmit, readOnly = false }) => {
  const [formData, setFormData] = useState<LabTestFormData>({
    pacienteId: '',
    tipo: '',
    laboratorio: '',
    fecha: '',
    hora: '',
    estado: 'pendiente',
    resultados: '',
    observaciones: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (test) {
      // Format date and time from ISO string
      let date = '';
      let time = '';
      if (test.fecha) {
        const dateObj = new Date(test.fecha);
        date = dateObj.toISOString().split('T')[0];
        time = dateObj.toTimeString().slice(0, 5);
      }

      setFormData({
        pacienteId: test.pacienteId || test.paciente?.id || '',
        tipo: test.tipo || '',
        laboratorio: test.laboratorio || '',
        fecha: date,
        hora: time,
        estado: test.estado || 'pendiente',
        resultados: test.resultados || '',
        observaciones: test.observaciones || ''
      });
    }
  }, [test]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when field is filled
    if (formErrors[name] && value.trim()) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.pacienteId.trim()) {
      errors.pacienteId = "El ID del paciente es requerido";
    }

    if (!formData.tipo.trim()) {
      errors.tipo = "El tipo de examen es requerido";
    }

    if (!formData.laboratorio.trim()) {
      errors.laboratorio = "El laboratorio es requerido";
    }

    if (!formData.fecha.trim()) {
      errors.fecha = "La fecha es requerida";
    }

    if (!formData.hora?.trim()) {
      errors.hora = "La hora es requerida";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Combine date and time into a single ISO string
      if (!formData.fecha || !formData.hora) {
        throw new Error("Fecha y hora son requeridos");
      }
      
      const dateTime = new Date(`${formData.fecha}T${formData.hora}`);
      
      // Check if the date is valid
      if (isNaN(dateTime.getTime())) {
        throw new Error("Fecha u hora inválida");
      }
      
      // Create the data to submit, converting from form data to LabTest
      // We need to cast estado to the appropriate type if it's an enum
      const submitData = {
        pacienteId: formData.pacienteId,
        tipo: formData.tipo,
        laboratorio: formData.laboratorio,
        fecha: dateTime.toISOString(),
        estado: formData.estado as any, // Cast to any to avoid type issues
        resultados: formData.resultados,
        observaciones: formData.observaciones,
        id: test?.id || '' // Include id if it exists
      };
      
      onSubmit(submitData as LabTest);
    } catch (error) {
      console.error("Error al procesar la fecha:", error);
      setFormErrors(prev => ({
        ...prev,
        fecha: "Error al procesar la fecha y hora. Por favor verifique el formato."
      }));
    }
  };

  const tipoOptions = [
    { value: 'sangre', label: 'Análisis de Sangre' },
    { value: 'orina', label: 'Análisis de Orina' },
    { value: 'heces', label: 'Análisis de Heces' },
    { value: 'radiografia', label: 'Radiografía' },
    { value: 'tomografia', label: 'Tomografía' },
    { value: 'resonancia', label: 'Resonancia Magnética' },
    { value: 'ecografia', label: 'Ecografía' },
    { value: 'electrocardiograma', label: 'Electrocardiograma' }
  ];

  const estadoOptions = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'completado', label: 'Completado' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <Label htmlFor="pacienteId">ID del Paciente</Label>
          <Input
            id="pacienteId"
            name="pacienteId"
            value={formData.pacienteId}
            onChange={handleChange}
            disabled={readOnly}
            required
          />
          {formErrors.pacienteId && <div className={styles.errorMessage}>{formErrors.pacienteId}</div>}
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="tipo">Tipo de Examen</Label>
          <Select
            id="tipo"
            name="tipo"
            options={tipoOptions}
            value={formData.tipo}
            onChange={handleChange}
            disabled={readOnly}
            placeholder="Seleccione un tipo de examen"
          />
          {formErrors.tipo && <div className={styles.errorMessage}>{formErrors.tipo}</div>}
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="laboratorio">Laboratorio</Label>
          <Input
            id="laboratorio"
            name="laboratorio"
            value={formData.laboratorio}
            onChange={handleChange}
            disabled={readOnly}
            required
          />
          {formErrors.laboratorio && <div className={styles.errorMessage}>{formErrors.laboratorio}</div>}
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="estado">Estado</Label>
          <Select
            id="estado"
            name="estado"
            options={estadoOptions}
            value={formData.estado}
            onChange={handleChange}
            disabled={readOnly}
          />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="fecha">Fecha</Label>
          <Input
            id="fecha"
            name="fecha"
            type="date"
            value={formData.fecha}
            onChange={handleChange}
            disabled={readOnly}
            required
          />
          {formErrors.fecha && <div className={styles.errorMessage}>{formErrors.fecha}</div>}
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="hora">Hora</Label>
          <Input
            id="hora"
            name="hora"
            type="time"
            value={formData.hora || ''}
            onChange={handleChange}
            disabled={readOnly}
            required
          />
          {formErrors.hora && <div className={styles.errorMessage}>{formErrors.hora}</div>}
        </div>
        
        <div className={styles.formGroupFull}>
          <Label htmlFor="resultados">Resultados</Label>
          <textarea
            id="resultados"
            name="resultados"
            value={formData.resultados}
            onChange={handleChange}
            disabled={readOnly}
            className={styles.textarea}
          />
        </div>
        
        <div className={styles.formGroupFull}>
          <Label htmlFor="observaciones">Observaciones</Label>
          <textarea
            id="observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            disabled={readOnly}
            className={styles.textarea}
          />
        </div>
      </div>
      
      {!readOnly && (
        <div className={styles.formActions}>
          <Button type="submit">
            {test ? 'Actualizar Examen' : 'Crear Examen'}
          </Button>
        </div>
      )}
    </form>
  );
};

export default LabTestForm;