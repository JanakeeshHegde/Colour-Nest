import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROCESS_PREVIEW } from '../data/homeSectionsData';

export const ProcessPreviewSection = () => {
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
              Methodology &amp; Delivery
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
              From Consultation <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>to Handover.</span>
            </h2>
          </div>

          <Link
            to="/process"
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
            <span>VIEW FULL PROCESS</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4 Process Milestone Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: '1.5rem'
          }}
        >
          {PROCESS_PREVIEW.map((p) => (
            <div
              key={p.step}
              style={{
                backgroundColor: '#FAF8F2',
                borderRadius: '12px',
                border: '1px solid #E7E1D6',
                padding: '1.75rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 10px rgba(33, 29, 45, 0.02)'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '1.6rem',
                  color: '#3C2D8C',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '0.75rem'
                }}
              >
                {p.step}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: '1.2rem',
                  color: '#211D2D',
                  margin: '0 0 0.5rem 0'
                }}
              >
                {p.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#6D6877', lineHeight: 1.6, margin: 0 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

