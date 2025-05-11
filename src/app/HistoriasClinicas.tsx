import React, { useState } from 'react';
import { FileText, Search, Eye } from 'lucide-react';
import Layout from '../components/common/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import BackButton from '../components/common/BackButton';
import MedicalRecordForm from '../components/records/MedicalRecordForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useMedicalRecords } from '../hooks/useMedicalRecords';
import { MedicalRecord } from '../types/medicalRecord';
import styles from './HistoriasClinicasPage.module.css';

const HistoriasClinicasPage: React.FC = () => {
  const { 
    patientHistory, 
    loading, 
    error, 
    getPatientHistory 
  } = useMedicalRecords();
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<MedicalRecord | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      await getPatientHistory(searchTerm);
    }
  };

  const handleOpenViewModal = (record: MedicalRecord) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  return (
    <Layout>
      <BackButton />
      
      <div className={styles.pageHeader}>
        <div className={styles.titleSection}>
          <div className={styles.iconContainer}>
            <FileText size={20} />
          </div>
          <h1 className={styles.pageTitle}>Historias Clínicas</h1>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar historia clínica por ID de paciente"
            className={styles.searchInput}
          />
          <Button type="submit" className={styles.searchButton}>
            <Search size={16} />
            Buscar
          </Button>
        </form>
      </div>

      {loading && (
        <div className={styles.loadingContainer}>
          <LoadingSpinner />
          <p>Cargando historias clínicas...</p>
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && patientHistory && (
        <div className={styles.recordsContainer}>
          {patientHistory.length > 0 ? (
            <div className={styles.recordsTable}>
              <table>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Fecha</th>
                    <th>Doctor</th>
                    <th>Especialidad</th>
                    <th>Descripción</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {patientHistory.map(record => (
                    <tr key={record.id}>
                      <td>{record.tipo}</td>
                      <td>{new Date(record.fecha).toLocaleDateString()}</td>
                      <td>{record.doctor || '-'}</td>
                      <td>{record.especialidad || '-'}</td>
                      <td>{record.descripcion.substring(0, 50)}...</td>
                      <td className={styles.actions}>
                        <button 
                          className={styles.viewButton}
                          onClick={() => handleOpenViewModal(record)}
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>No se encontraron historias clínicas para este paciente</p>
            </div>
          )}
        </div>
      )}

      {!loading && !error && !patientHistory && (
        <div className={styles.initialState}>
          <p>Ingrese el ID de un paciente para ver su historia clínica</p>
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title="Detalles del Registro Médico"
      >
        <MedicalRecordForm 
          record={currentRecord}
          onSubmit={() => {}}
          readOnly={true}
        />
      </Modal>
    </Layout>
  );
};

export default HistoriasClinicasPage;