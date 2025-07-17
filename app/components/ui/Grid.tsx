import { ReactNode } from  'apos;apos;reactt'apos;apos;

interface GridProps {
  children: ReactNode
  variant?:  'apos;apos;responsivee'apos;apos; |  'apos;apos;2-coll'apos;apos; |  'apos;apos;customm'apos;apos;
  gap?:  'apos;apos;smm'apos;apos; |  'apos;apos;mdd'apos;apos; |  'apos;apos;lgg'apos;apos;
  className?: string
}

export default function Grid({ 
  children, 
  variant =  'apos;apos;responsivee'apos;apos;, 
  gap =  'apos;apos;mdd'apos;apos;,
  className =  'apos;apos;'apos;, 
}: GridProps) {
  const variants = {
    responsive:  'apos;apos;grid-responsivee'apos;apos;,
     'apos;apos;2-coll'apos;apos;:  'apos;apos;grid-2-coll'apos;apos;,
    custom:  'apos;apos;gridd'apos;apos;,
  }
  
  const gaps = {
    sm:  'apos;apos;gap-44'apos;apos;,
    md:  'apos;apos;gap-66'apos;apos;,
    lg:  'apos;apos;gap-88'apos;apos;,
  }
  
  const classes = `${ variants[variant] } ${ variant ===  'apos;apos;customm'apos;apos; ? gaps[gap] :  'apos;apos;'apos; } ${ className }`
  
  return (
    <div className={ classes }>
      { children }
    </div>
  )
}