import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Layers, Sparkles, CheckCircle2, Box } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { servicesData, serviceFamilies } from '../data/services';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

const CATEGORIES = [
  { id: 'ALL', label: 'All Services' },
  { id: 'INTERIORS', label: 'Interiors & Decors' },
  { id: 'SURFACES', label: 'Stucco & Textures' },
  { id: 'WOOD', label: 'Wood & Polycoat Polish' },
  { id: 'ARCHITECTURAL', label: 'Ceilings & Lighting' },
  { id: 'EXTERIOR', label: 'Exterior Facades' }
];

export const Services = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filteredServices = servicesData.filter((s) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'INTERIORS') return s.category === 'INTERIORS' || s.id.includes('interior');
    if (activeCategory === 'SURFACES') return s.category === 'PAINTING' || s.id.includes('stucco') || s.id.includes('royals') || s.id.includes('anticco');
    if (activeCategory === 'WOOD') return s.id.includes('wood');
    if (activeCategory === 'ARCHITECTURAL') return s.id.includes('ceiling') || s.id.includes('lighting');
    if (activeCategory === 'EXTERIOR') return s.id.includes('exterior');
    return true;
  });

  return (
    <>
      <SEOHead
        title="Services & Finishing Solutions — Catalogue"
        description="Comprehensive catalogue of painting, interiors, Italian stuccos, woodwork polishing, and false ceilings by Colour Nest, Bangalore."
      />

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#FAF8F2',
          paddingTop: 'calc(var(--nav-height, 84px) + 2rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)'
        }}
      >
        <div className="container-wide" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)' }}>
          {/* Header */}
          <div style={{ maxWidth: '920px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
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
              Architectural Catalogue
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 1.05,
                color: '#211D2D',
                margin: '0 0 1.25rem 0'
              }}
            >
              Complete Interior &amp; <br />
              <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Finishing Solutions.</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#6D6877', lineHeight: 1.65, margin: 0 }}>
              Explore our full spectrum of interior works, Italian lime stuccos, natural wood polish (Melamyne, PU &amp; Polycoat),
              laser-aligned false ceilings, and exterior facade skins.
            </p>
          </div>

          {/* Interactive 3D Studio Banner */}
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E7E1D6',
              padding: 'clamp(1.1rem, 2.5vw, 1.75rem)',
              marginBottom: '2.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              boxShadow: '0 8px 24px rgba(33, 29, 45, 0.04)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: '1 1 280px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '8px',
                  backgroundColor: '#3C2D8C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#E3D9A4',
                  flexShrink: 0
                }}
              >
                <Box size={22} />
              </div>
              <div>
                <strong style={{ fontSize: '0.98rem', color: '#211D2D', display: 'block' }}>
                  Interactive 3D Space Studio Available
                </strong>
                <span style={{ fontSize: '0.82rem', color: '#6D6877', display: 'block', lineHeight: 1.5 }}>
                  Customise wall tints, timber finishes, flooring and lighting atmospheres in real-time.
                </span>
              </div>
            </div>

            <Link
              to="/space-studio"
              style={{
                backgroundColor: '#3C2D8C',
                color: '#FAF8F2',
                padding: '0.65rem 1.4rem',
                borderRadius: '9999px',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                minHeight: '44px'
              }}
            >
              <span>Launch 3D Studio</span>
              <ArrowUpRight size={14} color="#E3D9A4" />
            </Link>
          </div>

          {/* Filter Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.65rem',
              marginBottom: '2.5rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #E7E1D6'
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    padding: '0.55rem 1.15rem',
                    borderRadius: '9999px',
                    border: isActive ? '1px solid #3C2D8C' : '1px solid #E7E1D6',
                    backgroundColor: isActive ? '#3C2D8C' : '#FFFFFF',
                    color: isActive ? '#FAF8F2' : '#211D2D',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontWeight: isActive ? 600 : 500,
                    transition: 'all 0.2s ease'
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Service Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '2rem'
            }}
          >
            {filteredServices.map((service) => (
              <div
                key={service.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E7E1D6',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 8px 24px rgba(33, 29, 45, 0.04)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease'
                }}
              >
                <div style={{ width: '100%', height: 'clamp(180px, 24vw, 240px)', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'rgba(33, 29, 45, 0.85)',
                      color: '#E3D9A4',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.12em',
                      fontWeight: 700
                    }}
                  >
                    {service.number}
                  </div>
                </div>

                <div style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.14em',
                      color: '#3C2D8C',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      marginBottom: '0.5rem'
                    }}
                  >
                    {service.category}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display, serif)',
                      fontSize: 'clamp(1.35rem, 2.5vw, 1.6rem)',
                      color: '#211D2D',
                      margin: '0 0 0.5rem 0'
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: '#3C2D8C',
                      fontWeight: 600,
                      marginBottom: '0.85rem'
                    }}
                  >
                    {service.tagline}
                  </p>

                  <p style={{ fontSize: '0.88rem', color: '#4A4657', lineHeight: 1.6, flex: 1, marginBottom: '1.5rem' }}>
                    {service.shortDescription}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E7E1D6', paddingTop: '1rem', flexWrap: 'wrap', gap: '0.65rem' }}>
                    <Link
                      to={`/services/${service.slug}`}
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.74rem',
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
                      <span>Full Specifications</span>
                      <ArrowRight size={13} />
                    </Link>

                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#6D6877',
                        textDecoration: 'none'
                      }}
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
