import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Sistema de Gestión Clínica</h1>
      
      <div>
        <h2>Módulos</h2>
        <button onClick={() => navigate("/pacientes")}>
          Pacientes
        </button>
      </div>
    </div>
  )
}