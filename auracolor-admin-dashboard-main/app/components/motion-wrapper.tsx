'use clientt'apos;

import { motion } from  'apos;framer-motionn'apos;
import { ReactNode } from  'apos;reactt'apos;

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