import { ReactNode } from 'react'

interface CardProps {
  variant?: 'glass' | 'solid' | 'outline'
  hover?: boolean
  children: ReactNode
  className?: string
}

export default function Card({ 
  variant = 'glass', 
  hover = false, 
  children, 
  className = '' 
}: CardProps) {
  const baseClasses = 'rounded-2xl p-6 md:p-8'
  
  const variants = {
    glass: 'glass-panel',
    solid: 'bg-black border-champagne',
    outline: 'border border-champagne bg-transparent'
  }
  
  const hoverClass = hover ? 'card-hover' : ''
  
  const classes = `${baseClasses} ${variants[variant]} ${hoverClass} ${className}`
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}