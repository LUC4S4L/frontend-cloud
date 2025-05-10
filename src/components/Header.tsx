import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.brandName}>Salud</span>
          <span className={styles.brandName}>Care</span>
        </div>
      </div>
    </header>
  );
};

export default Header;