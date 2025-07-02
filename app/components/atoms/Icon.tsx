import { ReactNode } from 'react'

interface IconProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'accent'
  className?: string
}

export default function Icon({ 
  children, 
  size = 'md', 
  color = 'accent',
  className = '' 
}: IconProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }
  
  const colors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent'
  }
  
  const classes = `${sizes[size]} ${colors[color]} ${className}`
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}