import type React from "react"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuthContext } from "@/context/AuthContext"
import { ROUTES } from "@/common/constants/routes"
import Button from "../common/components/Button"
import Input from "../common/components/Input"
import useForm from "../common/hooks/useForm"
import { isValidEmail, isEmpty } from "../common/utils/validationUtils"

interface LoginFormData {
  email: string
  password: string
}

const LoginForm: React.FC = () => {
  const { login } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [loginError, setLoginError] = useState<string | null>(null)

  // Get the return URL from location state or default to home
  const from = location.state?.from || ROUTES.HOME

  const validate = (values: LoginFormData) => {
    const errors: Record<string, string> = {}

    if (isEmpty(values.email)) {
      errors.email = "El correo electrónico es requerido"
    } else if (!isValidEmail(values.email)) {
      errors.email = "Correo electrónico inválido"
    }

    if (isEmpty(values.password)) {
      errors.password = "La contraseña es requerida"
    }

    return errors
  }

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useForm<LoginFormData>({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      setLoginError(null)
      const success = await login(values)

      if (success) {
        navigate(from, { replace: true })
      } else {
        setLoginError("Credenciales inválidas. Por favor, intente de nuevo.")
      }
    },
  })

  return (
    <div className="login-form-container">
      <h2 className="login-title">Iniciar Sesión</h2>

      {loginError && <div className="login-error">{loginError}</div>}

      <form onSubmit={handleSubmit}>
        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : ""}
          fullWidth
        />

        <Input
          label="Contraseña"
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : ""}
          fullWidth
        />

        <div className="login-actions">
          <Button type="submit" isLoading={isSubmitting} fullWidth>
            Iniciar Sesión
          </Button>
        </div>

        <div className="login-links">
          <a href={ROUTES.FORGOT_PASSWORD} className="login-forgot-link">
            ¿Olvidó su contraseña?
          </a>
          <a href={ROUTES.REGISTER} className="login-register-link">
            Crear una cuenta
          </a>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
