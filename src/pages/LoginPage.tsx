"use client"

import type React from "react"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "@/context/AuthContext"
import { ROUTES } from "@/common/constants/routes"
import LoginForm from "@/components/LoginForm"
import "./LoginPage.css"

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuthContext()
  const navigate = useNavigate()

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME)
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <span className="logo-text">
            Salud<span className="logo-highlight">Care</span>
          </span>
        </div>

        <div className="login-card">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
