'apos;use clientt'apos;apos;

import { motion } from  'apos;apos;framer-motionn'apos;apos;
import { ReactNode } from  'apos;apos;reactt'apos;apos;

interface MotionWrapperProps {
  children: ReactNode
  delay?: number
}

export default function MotionWrapper({ children, delay = 0 }: MotionWrapperProps) {
  return (
    <motion.div
      initial={ { opacity: 0, y: 20 } }
      whileInView={ { opacity: 1, y: 0 } }
      transition={ { duration: 0.8, delay } }
      viewport={ { once: true, margin: "-100px" } }
    >
      { children }
    </motion.div>
  )
}