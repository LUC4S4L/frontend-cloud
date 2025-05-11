import React from 'react';
import { User, Phone, Mail, MapPin } from 'lucide-react';
import { Paciente } from '../../types/patient';
import styles from './PatientCard.module.css';

interface PatientCardProps {
  patient: Paciente;
  onClick?: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <h3 className={styles.name}>{patient.nombre} {patient.apellido}</h3>
        <span className={styles.dni}>DNI: {patient.dni}</span>
      </div>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <User size={16} className={styles.icon} />
          <span>{patient.edad} años, {patient.genero}</span>
        </div>
        {patient.telefono && (
          <div className={styles.infoItem}>
            <Phone size={16} className={styles.icon} />
            <span>{patient.telefono}</span>
          </div>
        )}
        {patient.email && (
          <div className={styles.infoItem}>
            <Mail size={16} className={styles.icon} />
            <span>{patient.email}</span>
          </div>
        )}
        {patient.direccion && (
          <div className={styles.infoItem}>
            <MapPin size={16} className={styles.icon} />
            <span>{patient.direccion}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientCard;