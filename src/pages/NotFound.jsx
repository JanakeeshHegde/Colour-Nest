import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

export const NotFound = () => {
  return (
    <>
      <SEOHead title="404 — This Wall Doesn't Exist" />

      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: 'var(--surface-primary)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Paint Spill Element Slowly Spreading */}
        <div
          style={{
            position: 'absolute',
            width: 'clamp(280px, 45vw, 550px)',
            height: 'clamp(280px, 45vw, 550px)',
            backgroundColor: 'var(--accent)',
            opacity: 0.15,
            filter: 'blur(35px)',
            animation: 'paintSpill 18s ease-in-out infinite alternate',
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px' }}>
          <span className="meta-tag" style={{ marginBottom: '1.25rem' }}>
            ERROR 404 • UNCONSTRUCTED SURFACE
          </span>

          <h1
            className="heading-monumental"
            style={{
              lineHeight: 0.95,
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em'
            }}
          >
            THIS WALL <br />
            <span className="heading-editorial-italic">DOESN'T EXIST.</span>
          </h1>

          <p style={{ fontSize: '1.1rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            You have ventured beyond the architectural blueprint. The surface you requested hasn't been plastered or painted yet.
          </p>

          <Link
            to="/"
            className="btn-primary"
            data-cursor="HOME"
            style={{ padding: '1rem 2.2rem' }}
          >
            <Home size={16} />
            <span>Back To The Studio</span>
          </Link>
        </div>
      </section>
    </>
  );
};
