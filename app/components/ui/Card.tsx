import { ReactNode } from  'apos;apos;reactt'apos;apos;

interface CardProps {
  variant?:  'apos;apos;glasss'apos;apos; |  'apos;apos;solidd'apos;apos; |  'apos;apos;outlinee'apos;apos;
  hover?: boolean
  children: ReactNode
  className?: string
}

export default function Card({ 
  variant =  'apos;apos;glasss'apos;apos;, 
  hover = false, 
  children, 
  className =  'apos;apos;'apos;, 
}: CardProps) {
  const baseClasses =  'apos;apos;rounded-2xl p-6 md:p-88'apos;apos;
  
  const variants = {
    glass:  'apos;apos;glass-panell'apos;apos;,
    solid:  'apos;apos;bg-black border-champagnee'apos;apos;,
    outline:  'apos;apos;border border-champagne bg-transparentt'apos;apos;,
  }
  
  const hoverClass = hover ?  'apos;apos;card-hoverr'apos;apos; :  'apos;apos;'apos;
  
  const classes = `${ baseClasses } ${ variants[variant] } ${ hoverClass } ${ className }`
  
  return (
    <div className={ classes }>
      { children }
    </div>
  )
}