import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#211D2D'
      }}
    >
      {/* Full-Bleed Background Image Element */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/hero/hero_mobile.jpg" />
          <img
            src="/images/hero/hero_main.jpg"
            alt="COLOUR NEST Architectural Contemporary Interior"
            loading="eager"
            fetchPriority="high"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 45%',
              display: 'block'
            }}
          />
        </picture>

        {/* Directional Vignette Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(33, 29, 45, 0.94) 0%, rgba(33, 29, 45, 0.78) 45%, rgba(33, 29, 45, 0.35) 100%)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(33, 29, 45, 0.55) 0%, transparent 28%, transparent 70%, rgba(33, 29, 45, 0.8) 100%)'
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div
        className="container-wide"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: 'clamp(6rem, 13vh, 9.5rem) clamp(1rem, 3.5vw, 2.5rem) clamp(2.5rem, 6vh, 5rem)'
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Brand Monospace Eyebrow Tag */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 'clamp(0.62rem, 1.8vw, 0.74rem)',
                letterSpacing: '0.14em',
                color: '#E3D9A4',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '1.25rem',
                backgroundColor: 'rgba(33, 29, 45, 0.65)',
                padding: '5px 14px',
                borderRadius: '9999px',
                border: '1px solid rgba(227, 217, 164, 0.35)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                maxWidth: '100%'
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#E3D9A4',
                  flexShrink: 0
                }}
              />
              <span>COLOUR NEST &bull; PAINTING &amp; INTERIOR DECOR</span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(2.4rem, 6vw, 5.6rem)',
                lineHeight: 1.08,
                fontWeight: 400,
                letterSpacing: '-0.025em',
                color: '#FAF8F2',
                margin: '0 0 1.25rem 0',
                textShadow: '0 4px 24px rgba(0, 0, 0, 0.45)',
                overflowWrap: 'break-word'
              }}
            >
              Beautiful Spaces. <br />
              <span style={{ color: '#E3D9A4', fontStyle: 'italic' }}>
                Thoughtfully Finished.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                fontSize: 'clamp(0.98rem, 2vw, 1.25rem)',
                color: 'rgba(250, 248, 242, 0.92)',
                lineHeight: 1.65,
                maxWidth: '580px',
                marginBottom: '2.25rem',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
                fontWeight: 350
              }}
            >
              Painting, interior decor and distinctive finishes that bring your space together.
            </p>

            {/* CTAs */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '0.85rem'
              }}
            >
              <Link
                to="/services"
                style={{
                  backgroundColor: '#3C2D8C',
                  color: '#FAF8F2',
                  padding: 'clamp(0.85rem, 2.5vw, 1.05rem) clamp(1.4rem, 4vw, 2.4rem)',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 'clamp(0.72rem, 1.5vw, 0.8rem)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1px solid rgba(227, 217, 164, 0.45)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  minHeight: '44px'
                }}
              >
                <span>EXPLORE OUR SERVICES</span>
                <ArrowRight size={15} color="#E3D9A4" />
              </Link>

              <Link
                to="/contact"
                style={{
                  backgroundColor: 'rgba(250, 248, 242, 0.12)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#FAF8F2',
                  padding: 'clamp(0.85rem, 2.5vw, 1.05rem) clamp(1.3rem, 3.5vw, 2.2rem)',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: 'clamp(0.72rem, 1.5vw, 0.8rem)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: '1px solid rgba(250, 248, 242, 0.35)',
                  transition: 'background-color 0.2s ease, border-color 0.2s ease',
                  minHeight: '44px'
                }}
              >
                <span>CONTACT US</span>
                <ArrowUpRight size={15} color="#E3D9A4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

