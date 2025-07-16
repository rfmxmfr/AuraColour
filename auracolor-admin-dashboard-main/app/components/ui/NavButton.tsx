import { ReactNode } from 'react'
import Link from 'next/link'

interface NavButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  wide?: boolean
  hidden?: boolean
  className?: string
}

export default function NavButton({ 
  href, 
  onClick, 
  children, 
  wide = false, 
  hidden = false,
  className = '' 
}: NavButtonProps) {
  const baseClass = wide ? 'nav-button-wide' : 'nav-button'
  const hiddenClass = hidden ? 'hidden' : ''
  const classes = `${baseClass} ${hiddenClass} ${className}`
  
  const content = (
    <>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10 text-sm font-medium text-primary text-slide">
        <span className="main-text">{children}</span>
        <span className="hover-text">{children}</span>
      </div>
    </>
  )
  
  if (href) {
    return (
      <Link href={href} className={hiddenClass}>
        <button className={classes}>
          {content}
        </button>
      </Link>
    )
  }
  
  return (
    <button className={classes} onClick={onClick}>
      {content}
    </button>
  )
}