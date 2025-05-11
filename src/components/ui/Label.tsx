import React, { LabelHTMLAttributes, ReactNode } from 'react';
import styles from './Label.module.css';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

const Label: React.FC<LabelProps> = ({ className = '', children, ...props }) => {
  return (
    <label className={`${styles.label} ${className}`} {...props}>
      {children}
    </label>
  );
};

export default Label;