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
          
          {/* Navigation menu removed */}
          
          {/* You can also remove this if you want */}
          <div className="user-menu">
            <button className="user-button">
              <span className="user-avatar">👨‍⚕️</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}