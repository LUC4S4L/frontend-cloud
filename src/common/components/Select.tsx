import type React from "react"
import { forwardRef } from "react"
import "./Select.css"

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string
  options: SelectOption[]
  error?: string
  fullWidth?: boolean
  onChange?: (e: { target: { name: string; value: string } }) => void
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, fullWidth = false, className, onChange, ...props }, ref) => {
    const selectClasses = ["select", error ? "select-error" : "", fullWidth ? "select-full-width" : "", className || ""]
      .filter(Boolean)
      .join(" ")

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange({
          target: {
            name: e.target.name,
            value: e.target.value,
          },
        })
      }
    }

    return (
      <div className={`select-container ${fullWidth ? "select-container-full-width" : ""}`}>
        {label && (
          <label className="select-label" htmlFor={props.id}>
            {label}
          </label>
        )}
        <select ref={ref} className={selectClasses} onChange={handleChange} {...props}>
          {props.placeholder && (
            <option value="" disabled>
              {props.placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <div className="select-error-message">{error}</div>}
      </div>
    )
  },
)

Select.displayName = "Select"

export default Select