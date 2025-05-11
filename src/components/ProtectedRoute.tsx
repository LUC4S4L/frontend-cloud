import type React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuthContext } from "@/context/AuthContext"
import { ROUTES } from "@/common/constants/routes"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRoles?: string[]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuthContext()
  const location = useLocation()

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to={ROUTES.LOGIN} state={{ from: location.pathname }} replace />
  }

  // If specific roles are required, check if user has one of them
  if (requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.includes(user.role)
    if (!hasRequiredRole) {
      // User doesn't have the required role
      return <Navigate to={ROUTES.HOME} replace />
    }
  }

  return <>{children}</>
}

export default ProtectedRoute
