import React from "react";
import { FileText } from 'lucide-react';
import Layout from "../components/Layout";
import PageTemplate from "../components/PageTemplate";

const HistoriasClinicasPage: React.FC = () => {
  return (
    <Layout>
      <PageTemplate
        title="Historias Clínicas"
        inputPlaceholder="Buscar historia por paciente o ID"
        buttonText="Buscar Historia"
        icon={<FileText size={20} />}
      />
    </Layout>
  );
};

export default HistoriasClinicasPage;