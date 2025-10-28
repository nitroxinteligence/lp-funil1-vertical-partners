import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
      
      // Focus trap - focus the modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '';
      
      // Restore focus to previous element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Focus trap handler
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab' && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          event.preventDefault();
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
          style={{ 
            height: '100dvh', // Dynamic viewport height
            minHeight: '100vh', // Fallback for older browsers
            display: 'flex',
            alignItems: 'safe center', // Safe centering
            justifyContent: 'center',
            padding: 'max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left))'
          }}
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative bg-white rounded-lg shadow-xl overflow-auto focus:outline-none"
            style={{
              maxWidth: 'min(calc(100vw - 2rem), 600px)',
              maxHeight: 'calc(100dvh - 2rem)', // Dynamic viewport height
              minHeight: 'auto',
              width: '100%'
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
