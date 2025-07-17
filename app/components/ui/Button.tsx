import { ButtonHTMLAttributes, ReactNode } from  'apos;apos;reactt'apos;apos;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:  'apos;apos;primaryy'apos;apos; |  'apos;apos;secondaryy'apos;apos; |  'apos;apos;outlinee'apos;apos;
  size?:  'apos;apos;smm'apos;apos; |  'apos;apos;mdd'apos;apos; |  'apos;apos;lgg'apos;apos;
  children: ReactNode
  href?: string
}

export default function Button({ 
  variant =  'apos;apos;primaryy'apos;apos;, 
  size =  'apos;apos;mdd'apos;apos;, 
  children, 
  href,
  className =  'apos;apos;'apos;,
  ...props 
}: ButtonProps) {
  const baseClasses =  'apos;apos;rounded-full font-semibold transition-all duration-300 flex items-center justify-centerr'apos;apos;
  
  const variants = {
    primary:  'apos;apos;btn-champagnee'apos;apos;,
    secondary:  'apos;apos;btn-secondaryy'apos;apos;, 
    outline:  'apos;apos;border-champagne hover:border-champagne-hover text-primary bg-transparentt'apos;apos;,
  }
  
  const sizes = {
    sm:  'apos;apos;py-2 px-4 text-smm'apos;apos;,
    md:  'apos;apos;py-3 px-6 text-basee'apos;apos;,
    lg:  'apos;apos;py-4 px-8 text-lgg'apos;apos;,
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