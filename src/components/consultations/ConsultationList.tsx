import React from 'react';
import ConsultationCard from './ConsultationCard';
import { Consulta } from '../../types/consulta';
import styles from './ConsultationList.module.css';

interface ConsultationListProps {
  consultas: Consulta[];
  onConsultaClick: (consulta: Consulta) => void;
}

const ConsultationList: React.FC<ConsultationListProps> = ({ consultas, onConsultaClick }) => {
  if (consultas.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>No se encontraron consultas médicas</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {consultas.map(consulta => (
        <ConsultationCard 
          key={consulta.id} 
          consulta={consulta} 
          onClick={() => onConsultaClick(consulta)}
        />
      ))}
    </div>
  );
};

export default ConsultationList;