import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Label from '../ui/Label';
import { Paciente, PatientFormData } from '../../types/patient';
import styles from './PatientForm.module.css';

interface PatientFormProps {
  patient: Paciente | null;
  onSubmit: (data: PatientFormData) => void;
  readOnly?: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSubmit, readOnly = false }) => {
  const [formData, setFormData] = useState<PatientFormData>({
    nombre: '',
    apellido: '',
    dni: '',
    edad: '',
    telefono: '',
    direccion: '',
    genero: '',
    email: ''
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        nombre: patient.nombre || '',
        apellido: patient.apellido || '',
        dni: patient.dni || '',
        edad: patient.edad.toString() || '',
        telefono: patient.telefono || '',
        direccion: patient.direccion || '',
        genero: patient.genero || '',
        email: patient.email || ''
      });
    }
  }, [patient]);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const genderOptions = [
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'otro', label: 'Otro' }
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            disabled={readOnly}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="apellido">Apellido</Label>
          <Input
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            disabled={readOnly}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="dni">DNI</Label>
          <Input
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            disabled={readOnly}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="edad">Edad</Label>
          <Input
            id="edad"
            name="edad"
            type="number"
            value={formData.edad}
            onChange={handleChange}
            disabled={readOnly}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="genero">Género</Label>
          <Select
            id="genero"
            name="genero"
            options={genderOptions}
            value={formData.genero}
            onChange={handleChange}
            disabled={readOnly}
          />
        </div>
        
        <div className={styles.formGroup}>
          <Label htmlFor="telefono">Teléfono</Label>
          <Input
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            disabled={readOnly}
          />
        </div>
        
        <div className={styles.formGroupFull}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={readOnly}
          />
        </div>
        
        <div className={styles.formGroupFull}>
          <Label htmlFor="direccion">Dirección</Label>
          <Input
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            disabled={readOnly}
          />
        </div>
      </div>
      
      {!readOnly && (
        <div className={styles.formActions}>
          <Button type="submit">
            {patient ? 'Actualizar Paciente' : 'Crear Paciente'}
          </Button>
        </div>
      )}
    </form>
  );
};

export default PatientForm;