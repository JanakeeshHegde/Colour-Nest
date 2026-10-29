import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu as MenuIcon, X, Phone, Mail, MapPin } from 'lucide-react';
import { siteData } from '../../data/siteData';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setIsMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isMenuOpen]);

  const navLinks = siteData.navigation;

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 900,
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: isScrolled
            ? '0.45rem clamp(0.75rem, 2vw, 1.25rem)'
            : '0.75rem clamp(0.85rem, 2.5vw, 2.5rem)'
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.45rem clamp(0.85rem, 2vw, 1.4rem)',
            backgroundColor: isScrolled ? 'rgba(250, 248, 242, 0.95)' : 'rgba(250, 248, 242, 0.9)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '9999px',
            border: '1px solid #E7E1D6',
            boxShadow: isScrolled ? '0 8px 24px rgba(33, 29, 45, 0.08)' : '0 4px 16px rgba(33, 29, 45, 0.04)',
            transition: 'all 0.35s ease'
          }}
        >
          {/* Genuine COLOUR NEST Logo without redundant adjacent text */}
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexShrink: 0,
              padding: '2px 0'
            }}
            aria-label="COLOUR NEST Home"
          >
            <img
              src="/colour-nest-logo.png"
              alt="COLOUR NEST — Painting & Interior Decor"
              style={{
                height: 'clamp(34px, 4.4vw, 44px)',
                width: 'auto',
                maxWidth: 'clamp(120px, 20vw, 180px)',
                objectFit: 'contain',
                display: 'block'
              }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.6rem'
            }}
            className="desktop-nav-links"
            aria-label="Main Navigation"
          >
            {navLinks.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.74rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isActive ? '#3C2D8C' : '#211D2D',
                    fontWeight: isActive ? 700 : 500,
                    position: 'relative',
                    padding: '0.4rem 0',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'color 0.25s ease'
                  }}
                >
                  <span>{item.name}</span>
                  {item.is3D && (
                    <span
                      style={{
                        fontSize: '0.55rem',
                        backgroundColor: '#3C2D8C',
                        color: '#E3D9A4',
                        padding: '1px 5px',
                        borderRadius: '3px',
                        fontWeight: 700,
                        letterSpacing: '0.08em'
                      }}
                    >
                      3D
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: '#3C2D8C'
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: CTA Button and Mobile Menu Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link
              to="/contact"
              className="btn-primary"
              style={{
                display: 'none',
                backgroundColor: '#3C2D8C',
                color: '#FAF8F2',
                padding: '0.65rem 1.35rem',
                borderRadius: '9999px',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 600,
                alignItems: 'center',
                gap: '6px',
                border: '1px solid rgba(227, 217, 164, 0.35)',
                boxShadow: '0 4px 14px rgba(60, 45, 140, 0.25)',
                transition: 'all 0.25s ease'
              }}
              id="desktop-cta-btn"
            >
              <span>Start A Project</span>
              <ArrowUpRight size={14} color="#E3D9A4" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 0.95rem',
                borderRadius: '9999px',
                backgroundColor: isMenuOpen ? '#3C2D8C' : '#FFFFFF',
                color: isMenuOpen ? '#FAF8F2' : '#211D2D',
                border: '1px solid #E7E1D6',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              className="mobile-menu-trigger"
            >
              {isMenuOpen ? <X size={15} /> : <MenuIcon size={15} />}
              <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Responsive media rules */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav-links {
            display: flex !important;
          }
          #desktop-cta-btn {
            display: inline-flex !important;
          }
          .mobile-menu-trigger {
            display: none !important;
          }
        }
      `}</style>

      {/* Refined Mobile Menu Drawer & Dimming Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(33, 29, 45, 0.45)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                zIndex: 890
              }}
              onClick={() => setIsMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: isScrolled ? '62px' : '72px',
                left: 'clamp(0.75rem, 2.5vw, 1.25rem)',
                right: 'clamp(0.75rem, 2.5vw, 1.25rem)',
                zIndex: 895,
                backgroundColor: '#FAF8F2',
                borderRadius: '16px',
                border: '1px solid #E7E1D6',
                boxShadow: '0 20px 48px rgba(33, 29, 45, 0.16)',
                padding: 'clamp(1.25rem, 3.5vw, 1.75rem) clamp(1rem, 3vw, 1.5rem)',
                maxHeight: 'calc(100svh - 90px)',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.16em',
                    color: '#6D6877',
                    textTransform: 'uppercase',
                    marginBottom: '0.5rem'
                  }}
                >
                  Navigation
                </span>

                {navLinks.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        fontFamily: 'var(--font-display, serif)',
                        fontSize: '1.45rem',
                        color: isActive ? '#3C2D8C' : '#211D2D',
                        textDecoration: 'none',
                        padding: '0.45rem 0',
                        borderBottom: '1px solid rgba(231, 225, 214, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{item.name}</span>
                      {item.is3D && (
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontFamily: 'var(--font-mono, monospace)',
                            backgroundColor: '#3C2D8C',
                            color: '#E3D9A4',
                            padding: '2px 7px',
                            borderRadius: '4px'
                          }}
                        >
                          3D Room
                        </span>
                      )}
                    </Link>
                  );
                })}

                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    marginTop: '1.25rem',
                    backgroundColor: '#3C2D8C',
                    color: '#FAF8F2',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 6px 18px rgba(60, 45, 140, 0.25)'
                  }}
                >
                  <span>Start A Project</span>
                  <ArrowUpRight size={16} color="#E3D9A4" />
                </Link>

                {/* Quick Contact Info */}
                <div
                  style={{
                    marginTop: '1.25rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #E7E1D6',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    fontSize: '0.82rem',
                    color: '#6D6877'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={14} color="#3C2D8C" />
                    <a href={`tel:${siteData.contact.phone}`} style={{ color: '#211D2D', textDecoration: 'none' }}>
                      {siteData.contact.phone}
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={14} color="#3C2D8C" />
                    <a href={`mailto:${siteData.contact.email}`} style={{ color: '#211D2D', textDecoration: 'none' }}>
                      {siteData.contact.email}
                    </a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={14} color="#3C2D8C" />
                    <span>{siteData.contact.address.formatted}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

