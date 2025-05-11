import React from 'react';
import PatientCard from './PatientCard';
import { Paciente } from '../../types/patient';
import styles from './PatientList.module.css';

interface PatientListProps {
  patients: Paciente[];
  onPatientClick: (patient: Paciente) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, onPatientClick }) => {
  if (patients.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No se encontraron pacientes</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {patients.map(patient => (
        <PatientCard 
          key={patient.id} 
          patient={patient} 
          onClick={() => onPatientClick(patient)}
        />
      ))}
    </div>
  );
};

export default PatientList;