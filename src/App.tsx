import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import ConsultasMedicas from "./app/ConsultasMedicas"
import ExamenesLaboratorio from "./app/ExamenesLaboratorio"
import HistoriasClinicas from "./app/HistoriasClinicas"
import Pacientes from "./app/Pacientes"
import Header from "./components/Header"
import ProtectedRoute from "./components/ProtectedRoute"
import { ROUTES } from "./common/constants/routes"
import "./App.css"

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />

        {/* Protected routes */}
        <Route
          path={ROUTES.HOME}
          element={
            <ProtectedRoute>
              <div className="app">
                <Header />
                <main className="main-content">
                  <HomePage />
                </main>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.PACIENTES}
          element={
            <ProtectedRoute>
              <div className="app">
                <Header />
                <main className="main-content">
                  <Pacientes />
                </main>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.CONSULTAS}
          element={
            <ProtectedRoute>
              <div className="app">
                <Header />
                <main className="main-content">
                  <ConsultasMedicas />
                </main>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.EXAMENES}
          element={
            <ProtectedRoute>
              <div className="app">
                <Header />
                <main className="main-content">
                  <ExamenesLaboratorio />
                </main>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.HISTORIAS}
          element={
            <ProtectedRoute>
              <div className="app">
                <Header />
                <main className="main-content">
                  <HistoriasClinicas />
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
