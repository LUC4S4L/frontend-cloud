import React from "react";
import styles from "./Label.module.css";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label className={`${styles.label} ${className || ""}`} {...props}>
      {children}
    </label>
  );
};

export default Label;