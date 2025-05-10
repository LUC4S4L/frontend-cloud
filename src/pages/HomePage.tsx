import React from "react";
import { HomeIcon } from 'lucide-react';
import Layout from "../components/Layout";
import RegistrationForm from "../components/RegistrationForm";
import styles from "./HomePage.module.css";

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <div className={styles.iconContainer}>
            <HomeIcon size={20} />
          </div>
          <h1 className={styles.pageTitle}>Inicio</h1>
        </div>
        
        <div className={styles.contentGrid}>
          <div className={styles.imageContainer}>
            <img
              src="https://placehold.co/600x500"
              alt="Healthcare image"
              className={styles.image}
            />
            <div className={styles.imageOverlay}>
              <div className={styles.pulseCircle}></div>
            </div>
          </div>

          <RegistrationForm />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;