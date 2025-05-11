import React, { InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';
import styles from './Checkbox.module.css';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  checked?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  id, 
  checked = false, 
  onChange, 
  className = '',
  disabled = false,
  ...props 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && !disabled) onChange(e);
  };

  return (
    <div className={`${styles.checkboxContainer} ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        className={styles.checkboxInput}
        {...props}
      />
      <div className={`${styles.checkboxControl} ${disabled ? styles.disabled : ''}`}>
        {checked && <Check className={styles.checkIcon} />}
      </div>
    </div>
  );
};

export default Checkbox;