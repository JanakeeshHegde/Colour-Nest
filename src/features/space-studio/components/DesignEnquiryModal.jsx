import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import {
  generateDesignEnquiryText,
  getWhatsAppEnquiryUrl,
  getMailtoEnquiryUrl
} from '../../../data/roomStudioConfig';

export const DesignEnquiryModal = ({
  isOpen,
  onClose,
  roomType,
  surfaces,
  lighting
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            backgroundColor: 'rgba(10, 8, 14, 0.85)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem'
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
              border: '1px solid #E3D9A4',
              borderRadius: '16px',
              padding: '2rem',
              maxWidth: '620px',
              width: '100%',
              maxHeight: '88vh',
              overflowY: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.16em',
                    color: '#E3D9A4',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '4px'
                  }}
                >
                  TURNKEY DESIGN SPECIFICATION
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: '1.7rem',
                    color: '#FAF8F2',
                    margin: 0
                  }}
                >
                  Request This Interior Design
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close design enquiry modal"
                style={{ background: 'transparent', border: 'none', color: '#B9B4C5', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Formatted Specification Summary Box */}
            <div
              style={{
                backgroundColor: 'rgba(23, 21, 29, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.74rem',
                color: '#FAF8F2',
                lineHeight: 1.6,
                whiteSpace: 'pre-line'
              }}
            >
              {generateDesignEnquiryText({ roomType, surfaces, lighting })}
            </div>

            {/* Action Buttons: WhatsApp & Mailto */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                href={getWhatsAppEnquiryUrl({ roomType, surfaces, lighting })}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem',
                  boxShadow: '0 4px 16px rgba(37, 211, 102, 0.35)'
                }}
              >
                <MessageCircle size={18} />
                <span>SEND SPECIFICATION VIA WHATSAPP (+91 84949 50088)</span>
              </a>

              <a
                href={getMailtoEnquiryUrl({ roomType, surfaces, lighting })}
                style={{
                  backgroundColor: 'var(--brand-indigo, #3C2D8C)',
                  color: '#FFFFFF',
                  border: '1px solid #E3D9A4',
                  textDecoration: 'none',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem'
                }}
              >
                <Mail size={18} />
                <span>EMAIL SPECIFICATION (info.colournest@gmail.com)</span>
              </a>

              <Link
                to="/contact"
                style={{
                  backgroundColor: 'transparent',
                  color: '#FAF8F2',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  textDecoration: 'none',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.65rem'
                }}
              >
                <span>CONTINUE IN FULL CLIENT ENQUIRY FORM</span>
                <ArrowRight size={16} color="#E3D9A4" />
              </Link>
            </div>

            <p
              style={{
                fontSize: '0.68rem',
                color: '#B9B4C5',
                textAlign: 'center',
                marginTop: '1rem',
                marginBottom: 0
              }}
            >
              Directed by Mr. Abhishek Rao • Physical tint swatches confirmed on-site before execution.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

