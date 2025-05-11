import React from 'react';
import { AlertTriangle } from 'lucide-react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>
        <AlertTriangle size={20} />
      </div>
      <p className={styles.errorMessage}>{message}</p>
    </div>
  );
};

export default ErrorMessage;