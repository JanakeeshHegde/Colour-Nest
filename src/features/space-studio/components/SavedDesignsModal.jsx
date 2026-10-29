import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const SavedDesignsModal = ({ isOpen, onClose, savedDesigns, onRestore }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1100,
            backgroundColor: 'rgba(10, 8, 14, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#1E1C27',
              border: '1px solid rgba(227, 217, 164, 0.3)',
              borderRadius: '16px',
              padding: '2rem',
              maxWidth: '540px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '1.4rem', color: '#FAF8F2', margin: 0 }}>
                Saved Studio Designs
              </h3>
              <button
                onClick={onClose}
                aria-label="Close saved designs modal"
                style={{ background: 'transparent', border: 'none', color: '#B9B4C5', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {savedDesigns.length === 0 ? (
              <p style={{ color: '#B9B4C5', fontSize: '0.85rem' }}>No saved spaces found in this browser session.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {savedDesigns.map((d) => (
                  <div
                    key={d.id}
                    style={{
                      backgroundColor: 'rgba(33, 29, 45, 0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '10px',
                      padding: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '0.95rem', color: '#FAF8F2', margin: '0 0 4px 0' }}>{d.name}</h4>
                      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem', color: '#B9B4C5' }}>
                        Saved on {d.date} • Mood: {d.lighting}
                      </span>
                    </div>
                    <button
                      onClick={() => onRestore(d)}
                      style={{
                        backgroundColor: 'var(--brand-indigo, #3C2D8C)',
                        color: '#FFFFFF',
                        border: '1px solid #E3D9A4',
                        borderRadius: '6px',
                        padding: '6px 12px',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.68rem',
                        cursor: 'pointer',
                        fontWeight: 600
                      }}
                    >
                      RESTORE
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

