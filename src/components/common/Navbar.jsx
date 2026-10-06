import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, ArrowUpRight, Menu as MenuIcon, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { siteData } from '../../data/siteData';

const menuBackgrounds = {
  "/": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  "/about": "https://d3k88l35vy59af.cloudfront.net/A001/colour-nest/1591620290444.jpeg",
  "/services": "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453135933.jpg",
  "/projects": "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453573110.jpg",
  "/colour-studio": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80",
  "/texture-lab": "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453115929.jpg",
  "/style-finder": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80",
  "/process": "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453486066.jpg",
  "/gallery": "https://d3k88l35vy59af.cloudfront.net/A001/colour-nest/1591620955824.jpg",
  "/contact": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80"
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 900,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          padding: isScrolled
            ? '0.85rem 1.5rem'
            : '1.75rem clamp(1.25rem, 4vw, 3rem)'
        }}
      >
        <div
          style={{
            maxWidth: isScrolled ? '1280px' : 'var(--container-wide)',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isScrolled ? '0.65rem 1.4rem' : '0',
            backgroundColor: isScrolled
              ? 'var(--surface-glass)'
              : 'transparent',
            backdropFilter: isScrolled ? 'blur(16px)' : 'none',
            WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
            borderRadius: isScrolled ? 'var(--radius-full)' : '0',
            border: isScrolled
              ? '1px solid var(--border-subtle)'
              : '1px solid transparent',
            boxShadow: isScrolled ? 'var(--shadow-subtle)' : 'none',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none'
            }}
            data-cursor="HOME"
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: '0 2px 10px var(--accent-soft-hover)'
              }}
            >
              C
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--ink-primary)',
                  display: 'block',
                  lineHeight: 1
                }}
              >
                COLOUR NEST
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.14em',
                  color: 'var(--ink-muted)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '2px'
                }}
              >
                Jayanagar • Bangalore
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.5rem'
            }}
            className="desktop-nav-links"
          >
            {siteData.navigation.slice(0, 7).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  data-cursor="EXPLORE"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--accent)' : 'var(--ink-secondary)',
                    fontWeight: isActive ? 700 : 500,
                    position: 'relative',
                    padding: '0.4rem 0',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: 'var(--accent)'
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle, CTA, and Menu Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle architectural theme"
              data-cursor="THEME"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--surface-elevated)',
                color: 'var(--ink-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* CTA: Start A Project */}
            <Link
              to="/contact"
              className="btn-primary"
              data-cursor="START"
              style={{
                display: 'none',
                padding: '0.65rem 1.4rem',
                fontSize: '0.72rem'
              }}
              id="desktop-cta-btn"
            >
              <span>Start A Project</span>
              <ArrowUpRight size={14} />
            </Link>

            {/* Immersive Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Open immersive menu"
              data-cursor="MENU"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.1rem',
                borderRadius: 'var(--radius-full, 9999px)',
                backgroundColor: isMenuOpen ? 'var(--accent)' : 'var(--surface-card)',
                color: isMenuOpen ? '#FFFFFF' : 'var(--ink-primary)',
                border: '1px solid var(--border-subtle)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                transition: 'all 0.3s ease'
              }}
            >
              {isMenuOpen ? <X size={16} /> : <MenuIcon size={16} />}
              <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Media query helper style for desktop nav visibility */}
      <style>{`
        @media (min-width: 1120px) {
          .desktop-nav-links {
            display: flex !important;
          }
          #desktop-cta-btn {
            display: inline-flex !important;
          }
        }
      `}</style>

      {/* Immersive Fullscreen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 890,
              backgroundColor: 'var(--surface-primary)',
              overflowY: 'auto',
              display: 'flex'
            }}
          >
            {/* Dynamic Background Image Preview when hovering menu item */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50vw',
                height: '100%',
                opacity: hoveredRoute ? 0.35 : 0.08,
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                pointerEvents: 'none',
                overflow: 'hidden',
                zIndex: 0
              }}
              className="menu-preview-layer"
            >
              <img
                src={menuBackgrounds[hoveredRoute || location.pathname] || menuBackgrounds["/"]}
                alt="Room Atmosphere"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(30%)'
                }}
              />
            </div>

            <div
              className="container-wide"
              style={{
                position: 'relative',
                zIndex: 1,
                paddingTop: '7.5rem',
                paddingBottom: '4rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                minHeight: '100%'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
                {/* Primary Huge Navigation Links */}
                <div>
                  <span className="meta-tag" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
                    01 • SPATIAL NAVIGATION
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {siteData.navigation.map((item, idx) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onMouseEnter={() => setHoveredRoute(item.path)}
                        onMouseLeave={() => setHoveredRoute(null)}
                        data-cursor="ENTER"
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '1.25rem',
                          textDecoration: 'none',
                          color: location.pathname === item.path ? 'var(--accent)' : 'var(--ink-primary)',
                          transition: 'transform 0.3s ease, color 0.3s ease'
                        }}
                        className="menu-link-item"
                      >
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.8rem',
                            color: 'var(--ink-muted)'
                          }}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
                            fontWeight: 300,
                            lineHeight: 1.1,
                            textTransform: 'uppercase',
                            letterSpacing: '-0.02em'
                          }}
                        >
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Studio Details & Contact Coordinates */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '1px solid var(--border-subtle)', paddingLeft: 'clamp(1rem, 3vw, 3rem)' }}>
                  <div>
                    <span className="meta-tag" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
                      02 • CONSULTATION &amp; STUDIO
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                      COLOUR NEST
                    </h3>
                    <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                      {siteData.owner.name} • {siteData.owner.title}
                    </p>
                    <p style={{ fontSize: '0.95rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                      {siteData.contact.address.formatted}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                      <a
                        href={`tel:${siteData.contact.phone}`}
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)' }}
                      >
                        {siteData.contact.phone}
                      </a>
                      <a
                        href={`mailto:${siteData.contact.email}`}
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--ink-secondary)' }}
                      >
                        {siteData.contact.email}
                      </a>
                    </div>
                  </div>

                  <div>
                    <Link
                      to="/contact"
                      className="btn-primary"
                      style={{ width: '100%', textAlign: 'center' }}
                      data-cursor="START"
                    >
                      <span>Begin Spatial Consultation</span>
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Metadata */}
              <div
                style={{
                  marginTop: '4rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--ink-muted)'
                }}
              >
                <span>COLOUR NEST © {new Date().getFullYear()}</span>
                <span>PAINTING • TEXTURES • INTERIORS</span>
                <span>JAYANAGAR 9TH BLOCK, BANGALORE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
