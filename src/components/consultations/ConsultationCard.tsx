import React from 'react';
import { Calendar, Clock, User, Stethoscope } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';
import { Consulta } from '../../types/consulta';
import styles from './ConsultationCard.module.css';

interface ConsultationCardProps {
  consulta: Consulta;
  onClick?: () => void;
}

const ConsultationCard: React.FC<ConsultationCardProps> = ({ consulta, onClick }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completada':
        return styles.completed;
      case 'cancelada':
        return styles.cancelled;
      default:
        return styles.pending;
    }
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.header}>
        <h3 className={styles.title}>{consulta.especialidad}</h3>
        <span className={`${styles.status} ${getStatusClass(consulta.estado)}`}>
          {consulta.estado}
        </span>
      </div>
      <div className={styles.info}>
        <div className={styles.infoItem}>
          <User size={16} className={styles.icon} />
          <span>{consulta.paciente?.nombre} {consulta.paciente?.apellido}</span>
        </div>
        <div className={styles.infoItem}>
          <Stethoscope size={16} className={styles.icon} />
          <span>Dr. {consulta.doctor}</span>
        </div>
        <div className={styles.infoItem}>
          <Calendar size={16} className={styles.icon} />
          <span>{formatDate(consulta.fecha)}</span>
        </div>
        <div className={styles.infoItem}>
          <Clock size={16} className={styles.icon} />
          <span>{new Date(consulta.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>
      {consulta.motivo && (
        <div className={styles.motivo}>
          <p>{consulta.motivo.substring(0, 100)}{consulta.motivo.length > 100 ? '...' : ''}</p>
        </div>
      )}
    </div>
  );
};

export default ConsultationCard;