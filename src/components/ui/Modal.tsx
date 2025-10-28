import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = ({ isOpen, children, onClose }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Cleanup function to ensure the class is removed when the component unmounts
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
          }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={(e) => {
              if (e.target === e.currentTarget && onClose) {
                onClose();
              }
            }}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative z-10 w-full max-w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-3rem)] md:max-w-2xl mx-auto max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-3rem)] md:max-h-[calc(100vh-4rem)] overflow-auto"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
