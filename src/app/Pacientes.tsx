import React, { useState } from 'react';
import { Users, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import Layout from '../components/common/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import BackButton from '../components/common/BackButton';
import PatientForm from '../components/patients/PatientForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { usePacientes } from '../hooks/usePacientes';
import { Patient, PatientFormData } from '../types/patient';
import styles from './PacientesPage.module.css';

const PacientesPage: React.FC = () => {
  const { 
    patients, 
    loading, 
    error, 
    createPatient, 
    updatePatient, 
    deletePatient, 
    searchPatients 
  } = usePacientes();
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      await searchPatients(searchTerm);
    }
  };

  const handleOpenCreateModal = () => {
    setCurrentPatient(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (patient: Patient) => {
    setCurrentPatient(patient);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (patient: Patient) => {
    setCurrentPatient(patient);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentPatient(null);
  };

  const handleSubmitPatient = async (patientData: PatientFormData) => {
    try {
      if (modalMode === 'create') {
        await createPatient(patientData);
      } else if (modalMode === 'edit' && currentPatient) {
        await updatePatient(currentPatient.id, patientData);
      }
      handleCloseModal();
    } catch (err) {
      console.error('Error saving patient:', err);
      // Handle error (could show an error message in the form)
    }
  };

  const handleDeletePatient = async (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar este paciente?')) {
      try {
        await deletePatient(id);
      } catch (err) {
        console.error('Error deleting patient:', err);
        // Handle error
      }
    }
  };

  return (
    <Layout>
      <BackButton />
      
      <div className={styles.pageHeader}>
        <div className={styles.titleSection}>
          <div className={styles.iconContainer}>
            <Users size={20} />
          </div>
          <h1 className={styles.pageTitle}>Pacientes</h1>
        </div>
        <Button 
          className={styles.addButton} 
          onClick={handleOpenCreateModal}
        >
          <Plus size={16} />
          Nuevo Paciente
        </Button>
      </div>

      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar paciente por nombre o DNI"
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
          <p>Cargando pacientes...</p>
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className={styles.patientsContainer}>
          {patients.length > 0 ? (
            <div className={styles.patientsTable}>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th>
                    <th>Edad</th>
                    <th>Teléfono</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map(patient => (
                    <tr key={patient.id}>
                      <td>{patient.nombre}</td>
                      <td>{patient.apellido}</td>
                      <td>{patient.dni}</td>
                      <td>{patient.edad}</td>
                      <td>{patient.telefono}</td>
                      <td className={styles.actions}>
                        <button 
                          className={styles.viewButton}
                          onClick={() => handleOpenViewModal(patient)}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className={styles.editButton}
                          onClick={() => handleOpenEditModal(patient)}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className={styles.deleteButton}
                          onClick={() => handleDeletePatient(patient.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.noResults}>
              <p>No se encontraron pacientes</p>
            </div>
          )}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={
          modalMode === 'create' ? 'Nuevo Paciente' : 
          modalMode === 'edit' ? 'Editar Paciente' : 
          'Detalles del Paciente'
        }
      >
        <PatientForm 
          patient={currentPatient}
          onSubmit={handleSubmitPatient}
          readOnly={modalMode === 'view'}
        />
      </Modal>
    </Layout>
  );
};

export default PacientesPage;