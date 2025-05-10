import React, { useState } from "react";
import { Heart } from 'lucide-react';
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";
import Checkbox from "./ui/Checkbox";
import Label from "./ui/Label";
import styles from "./RegistrationForm.module.css";

const RegistrationForm: React.FC = () => {
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  const documentOptions = [
    { value: "dni", label: "DNI" },
    { value: "passport", label: "Pasaporte" },
    { value: "other", label: "Otro" }
  ];

  return (
    <div className={styles.formContainer}>
      <div className={styles.discountBadge}>
        <Heart className={styles.heartIcon} />
        <span>Hasta 50% dto.</span>
      </div>

      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          Dale a mamá <span className={styles.highlight}>la protección</span>
        </h1>
        <h2 className={styles.subtitle}>que merece</h2>
      </div>

      <p className={styles.description}>
        Realiza tu afiliación 100% online de forma fácil y rápida.
      </p>

      <div className={styles.formFields}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <Label htmlFor="document-type">Tipo de documento</Label>
            <Select 
              id="document-type" 
              options={documentOptions} 
              value="dni"
            />
          </div>
          <div className={styles.formGroup}>
            <Label htmlFor="document-number">N° de documento</Label>
            <Input id="document-number" placeholder="Ej: 11122333" />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <Label htmlFor="phone">Celular</Label>
            <Input id="phone" placeholder="Ingresa tu número" />
          </div>
          <div className={styles.formGroup}>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input id="email" placeholder="Ingresa tu correo electrónico" />
          </div>
        </div>

        <div className={styles.checkboxGroup}>
          <div className={styles.checkboxRow}>
            <Checkbox 
              id="privacy" 
              checked={privacyChecked} 
              onChange={setPrivacyChecked} 
            />
            <Label htmlFor="privacy" className={styles.checkboxLabel}>
              Acepto la{" "}
              <span className={styles.link}>Política de Privacidad</span>
            </Label>
          </div>
          <div className={styles.checkboxRow}>
            <Checkbox 
              id="terms" 
              checked={termsChecked} 
              onChange={setTermsChecked} 
            />
            <Label htmlFor="terms" className={styles.checkboxLabel}>
              Acepto los{" "}
              <span className={styles.link}>Fines adicionales</span>
            </Label>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <Button variant="outline">Contáctame</Button>
          <Button>Cotizar online</Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;