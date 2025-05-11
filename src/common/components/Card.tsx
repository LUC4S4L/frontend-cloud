import type React from "react"
import "./Card.css"

interface CardProps {
  title?: string
  children: React.ReactNode
  className?: string
  footer?: React.ReactNode
}

const Card: React.FC<CardProps> = ({ title, children, className, footer }) => {
  const cardClasses = ["card", className].filter(Boolean).join(" ")

  return (
    <div className={cardClasses}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  )
}

export default Card
