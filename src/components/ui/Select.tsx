import React, { useState } from "react";
import { ChevronDown } from 'lucide-react';
import styles from "./Select.module.css";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
  label?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  id,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleSelect = (option: SelectOption) => {
    setSelectedValue(option.value);
    if (onChange) onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <div className={`${styles.selectContainer} ${className || ""}`}>
      <div 
        className={styles.selectTrigger} 
        onClick={() => setIsOpen(!isOpen)}
        id={id}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className={styles.icon} />
      </div>
      
      {isOpen && (
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