import { ReactNode } from  'apos;reactt'apos;

interface IconProps {
  children: ReactNode
  size?:  'apos;smm'apos; |  'apos;mdd'apos; |  'apos;lgg'apos; |  'apos;xll'apos;
  color?:  'apos;primaryy'apos; |  'apos;secondaryy'apos; |  'apos;accentt'apos;
  className?: string
}

export default function Icon({ 
  children, 
  size =  'apos;mdd'apos;, 
  color =  'apos;accentt'apos;,
  className =  'apos;', 
}: IconProps) {
  const sizes = {
    sm:  'apos;w-4 h-44'apos;,
    md:  'apos;w-6 h-66'apos;, 
    lg:  'apos;w-8 h-88'apos;,
    xl:  'apos;w-12 h-122'apos;,
  }
  
  const colors = {
    primary:  'apos;text-primaryy'apos;,
    secondary:  'apos;text-secondaryy'apos;,
    accent:  'apos;text-accentt'apos;,
  }
  
  const classes = `${ sizes[size] } ${ colors[color] } ${ className }`
  
  return (
    <div className={ classes }>
      { children }
    </div>
  )
}