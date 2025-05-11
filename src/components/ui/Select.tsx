import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options?: SelectOption[];
  value?: string;
  onChange?: (e: { target: { name: string; value: string } }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
}

const Select: React.FC<SelectProps> = ({ 
  options = [], 
  value = '', 
  onChange, 
  placeholder = 'Select an option', 
  className = '',
  disabled = false,
  name,
  id,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelect = (option: SelectOption) => {
    setSelectedValue(option.value);
    if (onChange) onChange({ target: { name: name || '', value: option.value } });
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <div className={`${styles.selectContainer} ${className}`}>
      <div 
        id={id}
        className={`${styles.selectTrigger} ${disabled ? styles.disabled : ''}`} 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        {...props}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className={styles.icon} />
      </div>
      
      {isOpen && !disabled && (
        <div className={styles.selectOptions}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.selectOption}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;