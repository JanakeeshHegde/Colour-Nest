import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../data/homeSectionsData';

export const ServicesShowcaseSection = () => {
  return (
    <section
      style={{
        padding: 'clamp(4rem, 8vw, 6.5rem) 0',
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
          <div style={{ maxWidth: '640px' }}>
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
              Core Disciplines
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
              Finishing &amp; <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Interior Expertise.</span>
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
            <span>VIEW ALL SERVICES</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 5 Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
            gap: '1.5rem'
          }}
        >
          {SERVICE_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link}
              style={{
                backgroundColor: '#FFFFFF',
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
              <div style={{ height: '170px', overflow: 'hidden' }}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: '1.3rem',
                    color: '#211D2D',
                    margin: '0 0 0.5rem 0'
                  }}
                >
                  {cat.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#6D6877', lineHeight: 1.55, flex: 1, margin: '0 0 1rem 0' }}>
                  {cat.desc}
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
                  <span>Specifications</span>
                  <ChevronRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

