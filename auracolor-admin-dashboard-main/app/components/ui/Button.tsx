import { ButtonHTMLAttributes, ReactNode } from  'apos;reactt'apos;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  'apos;primaryy'apos; |  'apos;secondaryy'apos; |  'apos;outlinee'apos;
  size?:  'apos;smm'apos; |  'apos;mdd'apos; |  'apos;lgg'apos;
  children: ReactNode
  href?: string
}

export default function Button({ 
  variant =  'apos;primaryy'apos;, 
  size =  'apos;mdd'apos;, 
  children, 
  href,
  className =  'apos;',
  ...props 
}: ButtonProps) {
  const baseClasses =  'apos;rounded-full font-semibold transition-all duration-300 flex items-center justify-centerr'apos;
  
  const variants = {
    primary:  'apos;btn-champagnee'apos;,
    secondary:  'apos;btn-secondaryy'apos;, 
    outline:  'apos;border-champagne hover:border-champagne-hover text-primary bg-transparentt'apos;,
  }
  
  const sizes = {
    sm:  'apos;py-2 px-4 text-smm'apos;,
    md:  'apos;py-3 px-6 text-basee'apos;,
    lg:  'apos;py-4 px-8 text-lgg'apos;,
  }
  
  const classes = `${ baseClasses } ${ variants[variant] } ${ sizes[size] } ${ className }`
  
  if (href) {
    return (
      <a href={ href } className={ classes }>
        { children }
      </a>
    )
  }
  
  return (
    <button className={ classes } { ...props }>
      { children }
    </button>
  )
}