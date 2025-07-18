// Animation variants for consistent motion design
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 },
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export const cardHover = {
  whileHover: { 
    scale: 1.03, 
    y: -5,
    transition: { duration: 0.3 },
  },
  whileTap: { scale: 0.98 },
}

export const stepHover = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.3 },
  },
}

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down' = 'up') => {
  const directions = {
    left: { x: -20 },
    right: { x: 20 },
    up: { y: 20 },
    down: { y: -20 },
  }
  
  return {
    initial: { opacity: 0, ...directions[direction] },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration: 0.8 },
  }
}