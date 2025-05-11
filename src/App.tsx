import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PacientesPage from './app/Pacientes';
import ConsultasMedicasPage from './app/ConsultasMedicas';
import ExamenesLaboratorioPage from './app/ExamenesLaboratorio';
import HistoriasClinicasPage from './app/HistoriasClinicas';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pacientes" element={<PacientesPage />} />
        <Route path="/consultas-medicas" element={<ConsultasMedicasPage />} />
        <Route path="/examenes-laboratorio" element={<ExamenesLaboratorioPage />} />
        <Route path="/historias-clinicas" element={<HistoriasClinicasPage />} />
      </Routes>
    </Router>
  );
};

export default App;