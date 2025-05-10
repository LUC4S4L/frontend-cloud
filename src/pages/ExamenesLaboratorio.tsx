import React from "react";
import { FlaskRoundIcon as Flask } from 'lucide-react';
import Layout from "../components/Layout";
import PageTemplate from "../components/PageTemplate";

const ExamenesLaboratorioPage: React.FC = () => {
  return (
    <Layout>
      <PageTemplate
        title="Exámenes de Laboratorio"
        inputPlaceholder="Buscar examen por tipo o fecha"
        buttonText="Buscar Examen"
        icon={<Flask size={20} />}
      />
    </Layout>
  );
};

export default ExamenesLaboratorioPage;