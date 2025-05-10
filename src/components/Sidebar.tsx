import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Users, Stethoscope, FlaskRoundIcon as Flask, FileText } from 'lucide-react';
import styles from "./Sidebar.module.css";

const Sidebar: React.FC = () => {
  const navItems = [
    { path: "/", label: "Inicio", icon: Home },
    { path: "/pacientes", label: "Pacientes", icon: Users },
    { path: "/consultas-medicas", label: "Consultas Médicas", icon: Stethoscope },
    { path: "/examenes-laboratorio", label: "Exámenes Laboratorio", icon: Flask },
    { path: "/historias-clinicas", label: "Historias Clínicas", icon: FileText },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <span className={styles.brandName}>Salud</span>
        <span className={styles.brandName}>Care</span>
      </div>
      
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.path} className={styles.navItem}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
                end={item.path === "/"}
              >
                <item.icon className={styles.navIcon} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className={styles.footer}>
        <p className={styles.footerText}>© 2025 SaludCare</p>
      </div>
    </aside>
  );
};

export default Sidebar;