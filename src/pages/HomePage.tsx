import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, Users, Stethoscope, FlaskRoundIcon as Flask, FileText } from 'lucide-react';
import Layout from '../components/common/Layout';
import Card from '../components/ui/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { orquestadorService } from '../services/orquestadorService';
import styles from './HomePage.module.css';
import { Patient } from '../types/patient';
import { Consulta } from '../types/consulta';

interface DashboardStats {
  totalPatients: number;
  totalConsultations: number;
  totalLabTests: number;
  totalRecords: number;
  recentPatients: Patient[];
  upcomingConsultations: Consulta[];
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    totalConsultations: 0,
    totalLabTests: 0,
    totalRecords: 0,
    recentPatients: [],
    upcomingConsultations: []
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardStats = await orquestadorService.getDashboardStats();
        setStats(dashboardStats);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const navigationItems = [
    { path: '/pacientes', label: 'Pacientes', icon: Users, color: '#00b3c7' },
    { path: '/consultas-medicas', label: 'Consultas Médicas', icon: Stethoscope, color: '#5a287d' },
    { path: '/examenes-laboratorio', label: 'Exámenes Laboratorio', icon: Flask, color: '#38a169' },
    { path: '/historias-clinicas', label: 'Historias Clínicas', icon: FileText, color: '#e53e3e' },
  ];

  if (loading) return (
    <Layout>
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
        <p>Cargando información del dashboard...</p>
      </div>
    </Layout>
  );

  if (error) return (
    <Layout>
      <ErrorMessage message={error} />
    </Layout>
  );

  return (
    <Layout>
      <div className={styles.pageHeader}>
        <div className={styles.iconContainer}>
          <HomeIcon size={20} />
        </div>
        <h1 className={styles.pageTitle}>Dashboard</h1>
      </div>

      <div className={styles.navigationGrid}>
        {navigationItems.map((item) => (
          <Card key={item.path} className={styles.navCard} onClick={() => navigate(item.path)}>
            <div className={styles.navIcon} style={{ backgroundColor: `${item.color}20`, color: item.color }}>
              <item.icon size={24} />
            </div>
            <h2 className={styles.navTitle}>{item.label}</h2>
          </Card>
        ))}
      </div>

      <div className={styles.statsGrid}>
        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>{stats.totalPatients}</h3>
            <p className={styles.statLabel}>Pacientes</p>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <Stethoscope size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>{stats.totalConsultations}</h3>
            <p className={styles.statLabel}>Consultas</p>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <Flask size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>{stats.totalLabTests}</h3>
            <p className={styles.statLabel}>Exámenes</p>
          </div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statIcon}>
            <FileText size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3 className={styles.statValue}>{stats.totalRecords}</h3>
            <p className={styles.statLabel}>Historias</p>
          </div>
        </Card>
      </div>

      <div className={styles.dashboardGrid}>
        <Card className={styles.dashboardCard}>
          <h2 className={styles.cardTitle}>Pacientes Recientes</h2>
          {stats.recentPatients.length > 0 ? (
            <ul className={styles.patientsList}>
              {stats.recentPatients.map(patient => (
                <li key={patient.id} className={styles.patientItem}>
                  <div className={styles.patientInfo}>
                    <h4>{patient.nombre} {patient.apellido}</h4>
                    <p>DNI: {patient.dni}</p>
                  </div>
                  <span className={styles.patientDate}>
                    {new Date(patient.fechaRegistro || '').toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyMessage}>No hay pacientes recientes</p>
          )}
        </Card>

        <Card className={styles.dashboardCard}>
          <h2 className={styles.cardTitle}>Próximas Consultas</h2>
          {stats.upcomingConsultations.length > 0 ? (
            <ul className={styles.consultationsList}>
              {stats.upcomingConsultations.map(consultation => (
                <li key={consultation.id} className={styles.consultationItem}>
                  <div className={styles.consultationInfo}>
                    <h4>{consultation.paciente?.nombre} {consultation.paciente?.apellido}</h4>
                    <p>Doctor: {consultation.doctor}</p>
                  </div>
                  <span className={styles.consultationDate}>
                    {new Date(consultation.fecha).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptyMessage}>No hay consultas programadas</p>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default HomePage;