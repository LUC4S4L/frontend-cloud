import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Label from '../ui/Label';
import { Consulta, ConsultaFormData } from '../../types/consulta';
import styles from './ConsultationForm.module.css';

interface ConsultationFormProps {
  consulta: Consulta | null;
  onSubmit: (data: ConsultaFormData) => void;
  readOnly?: boolean;
}

const ConsultationForm: React.FC<ConsultationFormProps> = ({ consulta, onSubmit, readOnly = false }) => {
  const [formData, setFormData] = useState<ConsultaFormData>({
    pacienteId: '',
    doctor: '',
    especialidad: '',
    fecha: '',
    hora: '',
    motivo: '',
    diagnostico: '',
    tratamiento: '',
    estado: 'pendiente'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (consulta) {
      // Format date and time from ISO string
      let date = '';
      let time = '';
      if (consulta.fecha) {
        const dateObj = new Date(consulta.fecha);
        date = dateObj.toISOString().split('T')[0];
        time = dateObj.toTimeString().slice(0, 5);
      }

      setFormData({
        pacienteId: consulta.pacienteId || consulta.paciente?.id || '',
        doctor: consulta.doctor || '',
        especialidad: consulta.especialidad || '',
        fecha: date,
        hora: time,
        motivo: consulta.motivo || '',
        diagnostico: consulta.diagnostico || '',
        tratamiento: consulta.tratamiento || '',
        estado: consulta.estado || 'pendiente'
      });
    }
  }, [consulta]);

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

    if (!formData.doctor.trim()) {
      errors.doctor = "El nombre del doctor es requerido";
    }

    if (!formData.especialidad.trim()) {
      errors.especialidad = "La especialidad es requerida";
    }

    if (!formData.fecha.trim()) {
      errors.fecha = "La fecha es requerida";
    }

    if (!formData.hora?.trim()) {
      errors.hora = "La hora es requerida";
    }

    if (!formData.motivo.trim()) {
      errors.motivo = "El motivo de la consulta es requerido";
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
      // Make sure both fecha and hora are defined and not empty
      if (!formData.fecha || !formData.hora) {
        throw new Error("Fecha y hora son requeridos");
      }
      
      const dateTime = new Date(`${formData.fecha}T${formData.hora}`);
      
      // Check if the date is valid
      if (isNaN(dateTime.getTime())) {
        throw new Error("Fecha u hora inválida");
      }
      
      const submitData = {
        ...formData,
        fecha: dateTime.toISOString(),
      };
      
      // Create a new object without the hora property
      const { hora, ...dataWithoutHora } = submitData;
      
      onSubmit(dataWithoutHora);
    } catch (error) {
      console.error("Error al procesar la fecha:", error);
      setFormErrors(prev => ({
        ...prev,
        fecha: "Error al procesar la fecha y hora. Por favor verifique el formato."
      }));
    }
  };

  const especialidadOptions = [
    { value: 'medicina_general', label: 'Medicina General' },
    { value: 'cardiologia', label: 'Cardiología' },
    { value: 'dermatologia', label: 'Dermatología' },
    { value: 'ginecologia', label: 'Ginecología' },
    { value: 'pediatria', label: 'Pediatría' },
    { value: 'neurologia', label: 'Neurología' },
    { value: 'oftalmologia', label: 'Oftalmología' },
    { value: 'psiquiatria', label: 'Psiquiatría' }
  ];

  const estadoOptions = [
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'completada', label: 'Completada' },
    { value: 'cancelada', label: 'Cancelada' }
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
          <Label htmlFor="doctor">Doctor</Label>
          <Input
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            disabled={readOnly}
            required
          />
          {formErrors.doctor && <div className={styles.errorMessage}>{formErrors.doctor}</div>}
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="especialidad">Especialidad</Label>
          <Select
            id="especialidad"
            name="especialidad"
            options={especialidadOptions}
            value={formData.especialidad}
            onChange={handleChange}
            disabled={readOnly}
            placeholder="Seleccione una especialidad"
          />
          {formErrors.especialidad && <div className={styles.errorMessage}>{formErrors.especialidad}</div>}
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
          <Label htmlFor="motivo">Motivo de la consulta</Label>
          <textarea
            id="motivo"
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
            disabled={readOnly}
            className={styles.textarea}
            required
          />
          {formErrors.motivo && <div className={styles.errorMessage}>{formErrors.motivo}</div>}
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
            {consulta ? 'Actualizar Consulta' : 'Crear Consulta'}
          </Button>
        </div>
      )}
    </form>
  );
};

export default ConsultationForm;