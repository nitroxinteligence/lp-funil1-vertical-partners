import { motion, Variants } from 'framer-motion';
import React from 'react';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
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