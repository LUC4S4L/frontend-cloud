import React, { useState } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import styles from "./PageTemplate.module.css";

interface PageTemplateProps {
  title: string;
  inputPlaceholder: string;
  buttonText: string;
  icon?: React.ReactNode;
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  inputPlaceholder,
  buttonText,
  icon
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Valor ingresado: ${inputValue}`);
    setInputValue("");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageHeader}>
        {icon && <div className={styles.iconContainer}>{icon}</div>}
        <h1 className={styles.pageTitle}>{title}</h1>
      </div>
      
      <div className={styles.card}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={inputPlaceholder}
              className={styles.input}
            />
            <Button type="submit" className={styles.button}>
              {buttonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageTemplate;