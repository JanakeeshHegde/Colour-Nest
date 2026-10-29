import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { GALLERY_PREVIEW } from '../data/homeSectionsData';

export const GalleryPreviewSection = () => {
  return (
    <section
      style={{
        padding: 'clamp(4rem, 8vw, 6.5rem) 0',
        backgroundColor: '#FAF8F2',
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
              Gallery Preview
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
              Living Environments. <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Thoughtfully Composed.</span>
            </h2>
          </div>

          <Link
            to="/gallery"
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
            <span>EXPLORE COMPLETE GALLERY</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Interior Snapshot Tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '1.5rem'
          }}
        >
          {GALLERY_PREVIEW.map((item) => (
            <Link
              key={item.id}
              to="/gallery"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E7E1D6',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 16px rgba(33, 29, 45, 0.03)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
              className="service-overview-card"
            >
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: '1.25rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.64rem',
                    letterSpacing: '0.12em',
                    color: '#3C2D8C',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.35rem'
                  }}
                >
                  {item.category}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: '1.18rem',
                    color: '#211D2D',
                    margin: '0 0 0.35rem 0'
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#6D6877', margin: 0 }}>
                  {item.tag}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

