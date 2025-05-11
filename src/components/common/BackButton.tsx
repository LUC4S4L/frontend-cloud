import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './BackButton.module.css';

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button 
      className={styles.backButton} 
      onClick={() => navigate('/')}
      aria-label="Return to homepage"
    >
      <ArrowLeft size={16} />
      <span>Volver al inicio</span>
    </button>
  );
};

export default BackButton;