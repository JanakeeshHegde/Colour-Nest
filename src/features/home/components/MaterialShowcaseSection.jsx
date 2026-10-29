import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, ChevronRight } from 'lucide-react';
import { SELECTED_MATERIALS } from '../data/homeSectionsData';

export const MaterialShowcaseSection = () => {
  return (
    <section
      style={{
        padding: 'clamp(4rem, 8vw, 6.5rem) 0',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E7E1D6'
      }}
    >
      <div
        className="container-wide"
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '1.5rem',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)'
          }}
        >
          <div style={{ maxWidth: '680px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                color: '#3C2D8C',
                textTransform: 'uppercase',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.75rem'
              }}
            >
              Materiality &amp; Finishes
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                lineHeight: 1.1,
                color: '#211D2D',
                margin: 0
              }}
            >
              Tactile Depth. <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Enduring Surfaces.</span>
            </h2>
          </div>

          <Link
            to="/services"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.76rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#3C2D8C',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>EXPLORE ALL FINISHES</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Curated Material Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}
        >
          {SELECTED_MATERIALS.map((mat) => (
            <Link
              key={mat.id}
              to={mat.link}
              style={{
                backgroundColor: '#FAF8F2',
                borderRadius: '12px',
                border: '1px solid #E7E1D6',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 4px 16px rgba(33, 29, 45, 0.03)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              className="service-overview-card"
            >
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img
                  src={mat.image}
                  alt={mat.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: '1.35rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.64rem',
                    letterSpacing: '0.14em',
                    color: '#3C2D8C',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.4rem'
                  }}
                >
                  {mat.category}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: '1.25rem',
                    color: '#211D2D',
                    margin: '0 0 0.65rem 0'
                  }}
                >
                  {mat.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#6D6877', lineHeight: 1.55, flex: 1, margin: '0 0 1rem 0' }}>
                  {mat.desc}
                </p>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#3C2D8C',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>View Specifications</span>
                  <ChevronRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 3D Space Studio Integrated Banner */}
        <div
          style={{
            borderRadius: '16px',
            backgroundColor: '#211D2D',
            color: '#FAF8F2',
            padding: 'clamp(1.75rem, 4vw, 2.5rem)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            border: '1px solid rgba(227, 217, 164, 0.25)',
            boxShadow: '0 12px 36px rgba(33, 29, 45, 0.12)'
          }}
        >
          <div style={{ maxWidth: '640px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                color: '#E3D9A4',
                textTransform: 'uppercase',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '0.65rem'
              }}
            >
              <Box size={14} color="#E3D9A4" />
              INTERACTIVE 3D SPACE STUDIO
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
                color: '#FAF8F2',
                margin: '0 0 0.5rem 0'
              }}
            >
              Experience These Finishes <span style={{ color: '#E3D9A4', fontStyle: 'italic' }}>in 3D.</span>
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'rgba(250, 248, 242, 0.85)', lineHeight: 1.6, margin: 0 }}>
              Test Italian Stucco on feature walls, toggle White Oak versus Limestone flooring, and view morning versus warm evening illumination.
            </p>
          </div>

          <Link
            to="/space-studio"
            style={{
              backgroundColor: '#3C2D8C',
              color: '#FAF8F2',
              padding: '0.95rem 2rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.76rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(227, 217, 164, 0.4)',
              boxShadow: '0 6px 20px rgba(60, 45, 140, 0.4)'
            }}
          >
            <span>OPEN 3D SPACE STUDIO</span>
            <ArrowRight size={14} color="#E3D9A4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

