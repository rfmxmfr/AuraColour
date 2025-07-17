import { ReactNode } from  'apos;apos;reactt'apos;apos;

interface IconProps {
  children: ReactNode
  size?:  'apos;apos;smm'apos;apos; |  'apos;apos;mdd'apos;apos; |  'apos;apos;lgg'apos;apos; |  'apos;apos;xll'apos;apos;
  color?:  'apos;apos;primaryy'apos;apos; |  'apos;apos;secondaryy'apos;apos; |  'apos;apos;accentt'apos;apos;
  className?: string
}

export default function Icon({ 
  children, 
  size =  'apos;apos;mdd'apos;apos;, 
  color =  'apos;apos;accentt'apos;apos;,
  className =  'apos;apos;'apos;, 
}: IconProps) {
  const sizes = {
    sm:  'apos;apos;w-4 h-44'apos;apos;,
    md:  'apos;apos;w-6 h-66'apos;apos;, 
    lg:  'apos;apos;w-8 h-88'apos;apos;,
    xl:  'apos;apos;w-12 h-122'apos;apos;,
  }
  
  const colors = {
    primary:  'apos;apos;text-primaryy'apos;apos;,
    secondary:  'apos;apos;text-secondaryy'apos;apos;,
    accent:  'apos;apos;text-accentt'apos;apos;,
  }
  
  const classes = `${ sizes[size] } ${ colors[color] } ${ className }`
  
  return (
    <div className={ classes }>
      { children }
    </div>
  )
}