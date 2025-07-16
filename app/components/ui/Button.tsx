import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  href?: string
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  href,
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'rounded-full font-semibold transition-all duration-300 flex items-center justify-center'
  
  const variants = {
    primary: 'btn-champagne',
    secondary: 'btn-secondary', 
    outline: 'border-champagne hover:border-champagne-hover text-primary bg-transparent'
  }
  
  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    )
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}