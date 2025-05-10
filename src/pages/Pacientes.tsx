import React from "react";
import { Users } from 'lucide-react';
import Layout from "../components/Layout";
import PageTemplate from "../components/PageTemplate";

const PacientesPage: React.FC = () => {
  return (
    <Layout>
      <PageTemplate
        title="Pacientes"
        inputPlaceholder="Buscar paciente por nombre o DNI"
        buttonText="Buscar Paciente"
        icon={<Users size={20} />}
      />
    </Layout>
  );
};

export default PacientesPage;