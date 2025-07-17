import { ReactNode } from  'apos;apos;reactt'apos;apos;

import { motion } from  'apos;apos;../framer-motion-fixx'apos;apos;

interface ProcessStepProps {
  number: string
  title: string
  description: string
  icon: ReactNode
  index: number
  isInView: boolean
}

export default function ProcessStep({ 
  number, 
  title, 
  description, 
  icon, 
  index, 
  isInView, 
}: ProcessStepProps) {
  return (
    <motion.div
      className="relative step-hover"
      initial={ { opacity: 0, y: 20 } }
      animate={ isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 } }
      transition={ { duration: 0.8, delay: index * 0.3 } }
      whileHover={ { scale: 1.05 } }
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center mb-6 mx-auto border-4 border-champagne champagne-ring">
          { icon }
        </div>
        <div className="text-6xl font-bold mb-4 champagne-number">{ number }</div>
        <h3 className="text-2xl font-bold mb-4 text-primary">{ title }</h3>
        <p className="text-secondary leading-relaxed">{ description }</p>
      </div>
    </motion.div>
  )
}