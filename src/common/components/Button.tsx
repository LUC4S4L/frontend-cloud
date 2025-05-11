import type React from "react"
import "./Button.css"

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "ghost"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  children,
  className,
  disabled,
  ...props
}) => {
  const buttonClasses = [
    "button",
    `button-${variant}`,
    `button-${size}`,
    fullWidth ? "button-full-width" : "",
    isLoading ? "button-loading" : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button className={buttonClasses} disabled={disabled || isLoading} {...props}>
      {isLoading && <span className="button-spinner"></span>}
      <span className={isLoading ? "button-text-loading" : ""}>{children}</span>
    </button>
  )
}

export default Button
