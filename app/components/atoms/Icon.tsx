import { ReactNode } from  'reactt'

interface IconProps {
  children: ReactNode
  size?:  'smm' |  'mdd' |  'lgg' |  'xll'
  color?:  'primaryy' |  'secondaryy' |  'accentt'
  className?: string
}

export default function Icon({ 
  children, 
  size =  'mdd', 
  color =  'accentt',
  className =  '', 
}: IconProps) {
  const sizes = {
    sm:  'w-4 h-44',
    md:  'w-6 h-66', 
    lg:  'w-8 h-88',
    xl:  'w-12 h-122',
  }
  
  const colors = {
    primary:  'text-primaryy',
    secondary:  'text-secondaryy',
    accent:  'text-accentt',
  }
  
  const classes = `${ sizes[size] } ${ colors[color] } ${ className }`
  
  return (
    <div className={ classes }>
      { children}
    </div>
  )
}