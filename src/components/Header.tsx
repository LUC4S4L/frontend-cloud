import { Link } from "react-router-dom"
import "./Header.css"

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-text">
              Salud<span className="logo-highlight">Care</span>
            </span>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">
              Inicio
            </Link>
            <Link to="/pacientes" className="nav-link">
              Pacientes
            </Link>
            <Link to="/consultas" className="nav-link">
              Consultas
            </Link>
            <Link to="/examenes" className="nav-link">
              Exámenes
            </Link>
            <Link to="/historias" className="nav-link">
              Historias
            </Link>
          </nav>
          
          {/* Simplified user menu without the name */}
          <div className="user-menu">
            <button className="user-button">
              <span className="user-avatar">👨‍⚕️</span>
              {/* Removed the user name */}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
