import { motion } from 'framer-motion';
import React from 'react';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

export const AnimatedSection = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string; stepKey: string }
>(({ children, className, stepKey }, ref) => (
  <motion.div
    ref={ref}
    key={stepKey}
    className={className}
    variants={sectionVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
  >
    {children}
  </motion.div>
));

AnimatedSection.displayName = 'AnimatedSection';