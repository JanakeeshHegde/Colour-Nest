import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { siteData } from '../../../data/siteData';

export const ConsultationCtaSection = () => {
  return (
    <section
      style={{
        padding: 'clamp(4.5rem, 9vw, 7rem) 0',
        backgroundColor: '#FAF8F2',
        textAlign: 'center'
      }}
    >
      <div
        className="container-wide"
        style={{
          maxWidth: '820px',
          margin: '0 auto',
          padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.72rem',
            letterSpacing: '0.18em',
            color: '#3C2D8C',
            textTransform: 'uppercase',
            fontWeight: 700,
            display: 'inline-block',
            marginBottom: '1rem'
          }}
        >
          START A CONVERSATION
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-display, serif)',
            fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)',
            lineHeight: 1.15,
            color: '#211D2D',
            margin: '0 0 1.25rem 0'
          }}
        >
          Let's Bring Your Space <br />
          <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Together.</span>
        </h2>

        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#4A4657',
            lineHeight: 1.6,
            marginBottom: '2.5rem'
          }}
        >
          Tell us about your space and the kind of finish you have in mind.
          We'll arrange an on-site consultation and live material review.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            to="/contact"
            style={{
              backgroundColor: '#3C2D8C',
              color: '#FAF8F2',
              padding: '1.05rem 2.4rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.78rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              fontWeight: 700,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(227, 217, 164, 0.4)',
              boxShadow: '0 8px 24px rgba(60, 45, 140, 0.25)'
            }}
          >
            <span>START A PROJECT</span>
            <ArrowRight size={15} color="#E3D9A4" />
          </Link>

          <a
            href={siteData.urls.whatsappDirect}
            target="_blank"
            rel="noreferrer"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#211D2D',
              padding: '1.05rem 2rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #E7E1D6'
            }}
          >
            <span>Message on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

