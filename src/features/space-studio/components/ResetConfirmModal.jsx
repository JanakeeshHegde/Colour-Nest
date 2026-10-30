import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, X } from 'lucide-react';

/**
 * ResetConfirmModal
 * Prompts the user with a confirmation dialog before resetting the 3D Studio:
 * "Reset your room design to the original settings?"
 * Buttons: Cancel | Reset
 */
export const ResetConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  // Handle ESC key to dismiss
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-dialog-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(12, 10, 16, 0.78)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '430px',
              backgroundColor: '#211D2D',
              backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(60, 45, 140, 0.25) 0%, rgba(33, 29, 45, 0.98) 70%)',
              border: '1px solid rgba(227, 217, 164, 0.35)',
              borderRadius: '14px',
              padding: 'clamp(1.5rem, 4vw, 2rem)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.65), 0 0 1px rgba(227, 217, 164, 0.5)',
              zIndex: 10
            }}
          >
            {/* Close Cross Button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: '#B9B4C5',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF8F2')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#B9B4C5')}
            >
              <X size={16} />
            </button>

            {/* Circular Icon Accent */}
            <div
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(60, 45, 140, 0.35)',
                border: '1px solid rgba(227, 217, 164, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto'
              }}
            >
              <RotateCcw size={22} color="#E3D9A4" />
            </div>

            {/* Primary Question Heading */}
            <h3
              id="reset-dialog-title"
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: '1.15rem',
                color: '#FAF8F2',
                textAlign: 'center',
                margin: '0 0 0.6rem 0',
                lineHeight: 1.4,
                fontWeight: 600
              }}
            >
              Reset your room design to the original settings?
            </h3>

            {/* Explanatory Reassurance */}
            <p
              style={{
                fontSize: '0.78rem',
                color: '#B9B4C5',
                textAlign: 'center',
                margin: '0 0 1.6rem 0',
                lineHeight: 1.55
              }}
            >
              This will restore all walls, floor, ceiling, wood finishes, lighting, and camera to their initial default configuration.
            </p>

            {/* Action Buttons: Cancel | Reset */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem'
              }}
            >
              <button
                onClick={onClose}
                type="button"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.08em',
                  fontWeight: 600,
                  color: '#FAF8F2',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'background-color 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                }}
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                type="button"
                style={{
                  backgroundColor: 'var(--brand-indigo, #3C2D8C)',
                  border: '1px solid #E3D9A4',
                  borderRadius: '8px',
                  padding: '0.75rem 1rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  color: '#FAF8F2',
                  cursor: 'pointer',
                  textAlign: 'center',
                  boxShadow: '0 4px 16px rgba(60, 45, 140, 0.45)',
                  transition: 'background-color 0.2s ease, transform 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#312475';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#3C2D8C';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                Reset
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResetConfirmModal;

