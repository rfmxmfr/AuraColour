import { ReactNode } from 'react'

interface GridProps {
  children: ReactNode
  variant?: 'responsive' | '2-col' | 'custom'
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Grid({ 
  children, 
  variant = 'responsive', 
  gap = 'md',
  className = '' 
}: GridProps) {
  const variants = {
    responsive: 'grid-responsive',
    '2-col': 'grid-2-col',
    custom: 'grid'
  }
  
  const gaps = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  }
  
  const classes = `${variants[variant]} ${variant === 'custom' ? gaps[gap] : ''} ${className}`
  
  return (
    <div className={classes}>
      {children}
    </div>
  )
}