import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { IMAGE_MANIFEST } from '../../../data/imageManifest';

export const NarrativeSection = () => {
  return (
    <section
      style={{
        padding: 'clamp(3.5rem, 7vw, 6rem) 0',
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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'center'
          }}
        >
          {/* Studio Workspace Visual */}
          <div
            style={{
              borderRadius: '14px',
              overflow: 'hidden',
              border: '1px solid #E7E1D6',
              aspectRatio: '4/3',
              boxShadow: '0 12px 32px rgba(33, 29, 45, 0.06)'
            }}
          >
            <img
              src={IMAGE_MANIFEST['about-interior-workspace'].url}
              alt="Architectural Material Curation Studio"
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Concise Story */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                color: '#3C2D8C',
                textTransform: 'uppercase',
                fontWeight: 700,
                display: 'block',
                marginBottom: '0.85rem'
              }}
            >
              About Colour Nest
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                lineHeight: 1.1,
                color: '#211D2D',
                margin: '0 0 1.25rem 0'
              }}
            >
              Every Detail Shapes <br />
              <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>the Living Space.</span>
            </h2>

            <p
              style={{
                fontSize: '1.02rem',
                color: '#4A4657',
                lineHeight: 1.7,
                marginBottom: '1.25rem'
              }}
            >
              Led by proprietor and principal consultant <strong>Mr. Abhishek Rao</strong>, COLOUR NEST
              delivers bespoke painting, interior decor and turnkey finishing solutions across Bangalore.
              We unify wall textures, woodwork polishing, false ceilings and lighting into cohesive living environments.
            </p>

            <p
              style={{
                fontSize: '0.94rem',
                color: '#6D6877',
                lineHeight: 1.7,
                marginBottom: '2rem'
              }}
            >
              Rather than treating painting, carpentry and ceiling works as disconnected contractors, we manage
              every layer with rigorous on-site quality control and honest craftsmanship.
            </p>

            <Link
              to="/about"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.78rem',
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
              <span>DISCOVER COLOUR NEST</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

