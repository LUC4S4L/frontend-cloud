import type React from "react"
import { forwardRef } from "react"
import "./Input.css"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className, ...props }, ref) => {
    const inputClasses = ["input", error ? "input-error" : "", fullWidth ? "input-full-width" : "", className || ""]
      .filter(Boolean)
      .join(" ")

    return (
      <div className={`input-container ${fullWidth ? "input-container-full-width" : ""}`}>
        {label && (
          <label className="input-label" htmlFor={props.id}>
            {label}
          </label>
        )}
        <input ref={ref} className={inputClasses} {...props} />
        {error && <div className="input-error-message">{error}</div>}
      </div>
    )
  },
)

Input.displayName = "Input"

export default Input
