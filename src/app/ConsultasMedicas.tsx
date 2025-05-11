import React, { useState } from 'react';
import { Stethoscope, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import Layout from '../components/common/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import BackButton from '../components/common/BackButton';
import ConsultationForm from '../components/consultations/ConsultationForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useConsultas } from '../hooks/useConsultas';
import { Consulta, ConsultaFormData } from '../types/consulta';
import styles from './ConsultasMedicasPage.module.css';

const ConsultasMedicasPage: React.FC = () => {
  const { 
    consultas, 
    loading, 
    error, 
    createConsulta, 
    updateConsulta, 
    deleteConsulta 
  } = useConsultas();
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentConsulta, setCurrentConsulta] = useState<Consulta | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
  };

  const handleOpenCreateModal = () => {
    setCurrentConsulta(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (consulta: Consulta) => {
    setCurrentConsulta(consulta);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (consulta: Consulta) => {
    setCurrentConsulta(consulta);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentConsulta(null);
  };

  const handleSubmitConsulta = async (consultaData: ConsultaFormData) => {
    try {
      if (modalMode === 'create') {
        await createConsulta(consultaData);
      } else if (modalMode === 'edit' && currentConsulta) {
        await updateConsulta(currentConsulta.id, consultaData);
      }
      handleCloseModal();
    } catch (err) {
      console.error('Error saving consultation:', err);
      // Handle error
    }
  };

  const handleDeleteConsulta = async (id: string) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta consulta?')) {
      try {
        await deleteConsulta(id);
      } catch (err) {
        console.error('Error deleting consultation:', err);
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
            <Stethoscope size={20} />
          </div>
          <h1 className={styles.pageTitle}>Consultas Médicas</h1>
        </div>
        <Button 
          className={styles.addButton} 
          onClick={handleOpenCreateModal}
        >
          <Plus size={16} />
          Nueva Consulta
        </Button>
      </div>

      <div className={styles.searchContainer}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar consulta por paciente o doctor"
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
          <p>Cargando consultas...</p>
        </div>
      )}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className={styles.consultasContainer}>
          {consultas.length > 0 ? (
            <div className={styles.consultasTable}>
              <table>
                <thead>
                  <tr>
                    <th>Paciente</th>
                    <th>Doctor</th>
                    <th>Especialidad</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {consultas.map(consulta => (
                    <tr key={consulta.id}>
                      <td>{consulta.paciente?.nombre} {consulta.paciente?.apellido}</td>
                      <td>{consulta.doctor}</td>
                      <td>{consulta.especialidad}</td>
                      <td>{new Date(consulta.fecha).toLocaleDateString()}</td>
                      <td>
                        <span className={`${styles.status} ${styles[consulta.estado]}`}>
                          {consulta.estado}
                        </span>
                      </td>
                      <td className={styles.actions}>
                        <button 
                          className={styles.viewButton}
                          onClick={() => handleOpenViewModal(consulta)}
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className={styles.editButton}
                          onClick={() => handleOpenEditModal(consulta)}
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          className={styles.deleteButton}
                          onClick={() => handleDeleteConsulta(consulta.id)}
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
              <p>No se encontraron consultas médicas</p>
            </div>
          )}
        </div>
      )}

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title={
          modalMode === 'create' ? 'Nueva Consulta' : 
          modalMode === 'edit' ? 'Editar Consulta' : 
          'Detalles de la Consulta'
        }
      >
        <ConsultationForm 
          consulta={currentConsulta}
          onSubmit={handleSubmitConsulta}
          readOnly={modalMode === 'view'}
        />
      </Modal>
    </Layout>
  );
};

export default ConsultasMedicasPage;