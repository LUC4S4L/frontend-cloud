import React from "react";
import { Stethoscope } from 'lucide-react';
import Layout from "../components/Layout";
import PageTemplate from "../components/PageTemplate";

const ConsultasMedicasPage: React.FC = () => {
  return (
    <Layout>
      <PageTemplate
        title="Consultas Médicas"
        inputPlaceholder="Buscar consulta por fecha o especialidad"
        buttonText="Buscar Consulta"
        icon={<Stethoscope size={20} />}
      />
    </Layout>
  );
};

export default ConsultasMedicasPage;