import React from "react";
import { Check } from 'lucide-react';
import styles from "./Checkbox.module.css";

interface CheckboxProps {
  id?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  checked = false,
  onChange,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.checked);
  };

  return (
    <div className={`${styles.checkboxContainer} ${className || ""}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        className={styles.checkboxInput}
      />
      <div className={styles.checkboxControl}>
        {checked && <Check className={styles.checkIcon} />}
      </div>
    </div>
  );
};

export default Checkbox;