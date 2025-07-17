import { ReactNode } from  'apos;reactt'apos;

interface CardProps {
  variant?:  'apos;glasss'apos; |  'apos;solidd'apos; |  'apos;outlinee'apos;
  hover?: boolean
  children: ReactNode
  className?: string
}

export default function Card({ 
  variant =  'apos;glasss'apos;, 
  hover = false, 
  children, 
  className =  'apos;', 
}: CardProps) {
  const baseClasses =  'apos;rounded-2xl p-6 md:p-88'apos;
  
  const variants = {
    glass:  'apos;glass-panell'apos;,
    solid:  'apos;bg-black border-champagnee'apos;,
    outline:  'apos;border border-champagne bg-transparentt'apos;,
  }
  
  const hoverClass = hover ?  'apos;card-hoverr'apos; :  'apos;'
  
  const classes = `${ baseClasses } ${ variants[variant] } ${ hoverClass } ${ className }`
  
  return (
    <div className={ classes }>
      { children }
    </div>
  )
}