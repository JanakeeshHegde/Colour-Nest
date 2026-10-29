import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { siteData } from '../../../data/siteData';

export const StrengthsSection = () => {
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
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)'
        }}
      >
        <div style={{ maxWidth: '640px', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
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
            Why Colour Nest
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
              lineHeight: 1.1,
              color: '#211D2D',
              margin: '0 0 0.85rem 0'
            }}
          >
            Honest Commitments. <br />
            <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Proven Craft.</span>
          </h2>
          <p style={{ fontSize: '0.98rem', color: '#6D6877', margin: 0, lineHeight: 1.6 }}>
            Real business values honed through dedicated client consulting and high-grade finishing execution.
          </p>
        </div>

        {/* 7 Verified Specialities Grid (Direct from single source of truth in siteData) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '1.25rem'
          }}
        >
          {siteData.specialities.map((s) => (
            <div
              key={s.id || s.number}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '10px',
                border: '1px solid #E7E1D6',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
                boxShadow: '0 2px 10px rgba(33, 29, 45, 0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.75rem',
                    color: '#3C2D8C',
                    fontWeight: 700
                  }}
                >
                  {s.number}
                </span>
                <CheckCircle2 size={16} color="#3C2D8C" />
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: '1.25rem',
                  color: '#211D2D',
                  margin: '2px 0 0 0',
                  fontWeight: 500
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontSize: '0.86rem', color: '#6D6877', lineHeight: 1.55, margin: 0 }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

