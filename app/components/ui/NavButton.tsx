import Link from  'apos;apos;next/linkk'apos;apos;
import { ReactNode } from  'apos;apos;reactt'apos;apos;

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
  className =  'apos;apos;'apos;, 
}: NavButtonProps) {
  const baseClass = wide ?  'apos;apos;nav-button-widee'apos;apos; :  'apos;apos;nav-buttonn'apos;apos;
  const hiddenClass = hidden ?  'apos;apos;hiddenn'apos;apos; :  'apos;apos;'apos;
  const classes = `${ baseClass } ${ hiddenClass } ${ className }`
  
  const content = (
    <>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 text-sm font-medium text-primary text-slide">
        <span className="main-text">{ children }</span>
        <span className="hover-text">{ children }</span>
      </div>
    </>
  )
  
  if (href) {
    return (
      <Link href={ href } className={ hiddenClass }>
        <button className={ classes }>
          { content }
        </button>
      </Link>
    )
  }
  
  return (
    <button className={ classes } onClick={ onClick }>
      { content }
    </button>
  )
}