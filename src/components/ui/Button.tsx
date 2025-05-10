import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "default",
  size = "default",
  ...props
}) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className || ""}`;
  
  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};

export default Button;