import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PacientesPage from "./pages/Pacientes";
import ConsultasMedicasPage from "./pages/ConsultasMedicas";
import ExamenesLaboratorioPage from "./pages/ExamenesLaboratorio";
import HistoriasClinicasPage from "./pages/HistoriasClinicas";

function App() {
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
}

export default App;