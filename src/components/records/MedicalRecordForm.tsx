import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Label from '../ui/Label';
import { MedicalRecord } from '../../types/medicalRecord';
import styles from './MedicalRecordForm.module.css';

// Define a separate interface for the form data to handle type issues
interface MedicalRecordFormData {
  id: string;
  pacienteId: string;
  tipo: string;
  fecha: string;
  doctor: string;
  especialidad: string;
  descripcion: string;
  diagnostico: string;
  tratamiento: string;
  archivos: any[];
}

interface MedicalRecordFormProps {
  record: MedicalRecord | null;
  onSubmit: (data: MedicalRecord) => void;
  readOnly?: boolean;
}

const MedicalRecordForm: React.FC<MedicalRecordFormProps> = ({ record, onSubmit, readOnly = false }) => {
  const [formData, setFormData] = useState<MedicalRecordFormData>({
    id: '',
    pacienteId: '',
    tipo: '',
    fecha: '',
    doctor: '',
    especialidad: '',
    descripcion: '',
    diagnostico: '',
    tratamiento: '',
    archivos: []
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (record) {
      setFormData({
        ...record,
        fecha: record.fecha ? new Date(record.fecha).toISOString().split('T')[0] : '',
        tipo: record.tipo || '' // Ensure tipo is a string for the form
      });
    }
  }, [record]);

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
      errors.tipo = "El tipo de registro es requerido";
    }

    if (!formData.fecha.trim()) {
      errors.fecha = "La fecha es requerida";
    }

    if (!formData.descripcion.trim()) {
      errors.descripcion = "La descripción es requerida";
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
      // Validate the date
      if (!formData.fecha) {
        throw new Error("La fecha es requerida");
      }
      
      const dateObj = new Date(formData.fecha);
      
      // Check if the date is valid
      if (isNaN(dateObj.getTime())) {
        throw new Error("Fecha inválida");
      }
      
      // Create the data to submit, using type assertion to handle the tipo field
      const submitData = {
        ...formData,
        fecha: dateObj.toISOString(),
        tipo: formData.tipo as any // Use type assertion to avoid type issues
      };
      
      onSubmit(submitData as MedicalRecord);
    } catch (error) {
      console.error("Error al procesar la fecha:", error);
      setFormErrors(prev => ({
        ...prev,
        fecha: "Error al procesar la fecha. Por favor verifique el formato."
      }));
    }
  };

  // Define the options for the tipo field
  // These values should match the allowed values in the MedicalRecord type
  const tipoOptions = [
    { value: 'consulta', label: 'Consulta Médica' },
    { value: 'examen', label: 'Examen de Laboratorio' },
    { value: 'cirugia', label: 'Cirugía' },
    { value: 'hospitalizacion', label: 'Hospitalización' },
    { value: 'emergencia', label: 'Emergencia' }
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
          <Label htmlFor="tipo">Tipo de Registro</Label>
          <Select
            id="tipo"
            name="tipo"
            options={tipoOptions}
            value={formData.tipo}
            onChange={handleChange}
            disabled={readOnly}
            placeholder="Seleccione un tipo de registro"
          />
          {formErrors.tipo && <div className={styles.errorMessage}>{formErrors.tipo}</div>}
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
          <Label htmlFor="doctor">Doctor</Label>
          <Input
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            disabled={readOnly}
          />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="especialidad">Especialidad</Label>
          <Input
            id="especialidad"
            name="especialidad"
            value={formData.especialidad}
            onChange={handleChange}
            disabled={readOnly}
          />
        </div>
        
        <div className={styles.formGroupFull}>
          <Label htmlFor="descripcion">Descripción</Label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            disabled={readOnly}
            className={styles.textarea}
            required
          />
          {formErrors.descripcion && <div className={styles.errorMessage}>{formErrors.descripcion}</div>}
        </div>
        
        <div className={styles.formGroupFull}>
          <Label htmlFor="diagnostico">Diagnóstico</Label>
          <textarea
            id="diagnostico"
            name="diagnostico"
            value={formData.diagnostico}
            onChange={handleChange}
            disabled={readOnly}
            className={styles.textarea}
          />
        </div>
        
        <div className={styles.formGroupFull}>
          <Label htmlFor="tratamiento">Tratamiento</Label>
          <textarea
            id="tratamiento"
            name="tratamiento"
            value={formData.tratamiento}
            onChange={handleChange}
            disabled={readOnly}
            className={styles.textarea}
          />
        </div>
      </div>
      
      {!readOnly && (
        <div className={styles.formActions}>
          <Button type="submit">
            {record ? 'Actualizar Registro' : 'Crear Registro'}
          </Button>
        </div>
      )}
    </form>
  );
};

export default MedicalRecordForm;