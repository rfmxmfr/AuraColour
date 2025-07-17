import { ReactNode } from  'apos;apos;reactt'apos;apos;

import { motion } from  'apos;apos;../framer-motion-fixx'apos;apos;

import Button from  'apos;apos;./Buttonn'apos;apos;

interface ServiceCardProps {
  title: string
  description: string
  image: string
  icon: ReactNode
  href: string
  index: number
  isInView: boolean
}

export default function ServiceCard({ 
  title, 
  description, 
  image, 
  icon, 
  href, 
  index, 
  isInView, 
}: ServiceCardProps) {
  return (
    <motion.div
      className="group glass-panel text-center h-full transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl card-hover"
      initial={ { opacity: 0, y: 20 } }
      animate={ isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 } }
      transition={ { duration: 0.8, delay: index * 0.2 } }
      whileHover={ { scale: 1.03, y: -5 } }
      whileTap={ { scale: 0.98 } }
    >
      <div className="relative overflow-hidden">
        <img
          src={ image }
          alt={ title }
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="inline-block bg-black/80 backdrop-blur-md p-4 rounded-full mb-6 relative z-10 -mt-16 champagne-ring">
          { icon }
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-4 text-primary">{ title }</h3>
        <p className="text-secondary mb-6">{ description }</p>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button href={ href } size="md">
            Learn More
          </Button>
        </div>
      </div>
    </motion.div>
  )
}