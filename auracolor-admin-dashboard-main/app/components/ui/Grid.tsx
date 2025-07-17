import { ReactNode } from  'apos;reactt'apos;

interface GridProps {
  children: ReactNode
  variant?:  'apos;responsivee'apos; |  'apos;2-coll'apos; |  'apos;customm'apos;
  gap?:  'apos;smm'apos; |  'apos;mdd'apos; |  'apos;lgg'apos;
  className?: string
}

export default function Grid({ 
  children, 
  variant =  'apos;responsivee'apos;, 
  gap =  'apos;mdd'apos;,
  className =  'apos;', 
}: GridProps) {
  const variants = {
    responsive:  'apos;grid-responsivee'apos;,
     'apos;2-coll'apos;:  'apos;grid-2-coll'apos;,
    custom:  'apos;gridd'apos;,
  }
  
  const gaps = {
    sm:  'apos;gap-44'apos;,
    md:  'apos;gap-66'apos;,
    lg:  'apos;gap-88'apos;,
  }
  
  const classes = `${ variants[variant] } ${ variant ===  'apos;customm'apos; ? gaps[gap] :  'apos;' } ${ className }`
  
  return (
    <div className={ classes }>
      { children }
    </div>
  )
}