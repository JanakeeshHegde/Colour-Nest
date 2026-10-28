import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  Compass,
  Maximize2,
  Sliders
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';
import {
  MaterialShowroomCanvas,
  MATERIAL_SLABS
} from '../components/canvas/MaterialShowroomCanvas';
import { TextureShowcaseCanvas } from '../components/canvas/TextureShowcaseCanvas';

export const Materials = () => {
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [selectedSlab, setSelectedSlab] = useState(MATERIAL_SLABS[0]);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  const handleOpenInspector = (slab) => {
    setSelectedSlab(slab);
    setIsInspectorOpen(true);
  };

  return (
    <>
      <SEOHead
        title="3D Material Explorer — Physical Finishes Catalogue"
        description="Inspect genuine architectural plasters, Venetian Stucco, Melamyne & PU timber sealants, and precision ceiling soffits in interactive 3D."
      />

      <div style={{ backgroundColor: '#121213', color: '#FFFFFF', minHeight: '100vh', paddingTop: '6rem' }}>
        {/* ------------------------------------------------------------- */}
        {/* HEADER SECTION                                                */}
        {/* ------------------------------------------------------------- */}
        <section style={{ padding: '2rem 0 clamp(1.5rem, 3vw, 2.5rem)' }}>
          <div className="container-wide">
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                letterSpacing: '0.22em',
                color: 'var(--accent, #B85C38)',
                display: 'block',
                marginBottom: '0.75rem'
              }}
            >
              PHYSICAL MATERIAL CATALOGUE • 3D ARCHITECTURAL SHOWROOM
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
              <div>
                <h1
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                    margin: 0,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.05
                  }}
                >
                  TOUCH <span style={{ fontStyle: 'italic', color: 'var(--accent, #B85C38)' }}>THE SURFACE.</span>
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', maxWidth: '640px', marginTop: '0.75rem', lineHeight: 1.6 }}>
                  Hover floating slabs to inspect micro-relief and light reflection. Click any material to enter the deep 3D tactile laboratory.
                </p>
              </div>

              {/* Category Pills Filter */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['ALL', 'TEXTURE', 'PAINT', 'WOOD', 'WALLPAPER', 'CEILING'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    style={{
                      backgroundColor:
                        filterCategory === cat ? 'var(--accent, #B85C38)' : 'rgba(255,255,255,0.06)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255,255,255,0.12)',
                      padding: '0.5rem 1.1rem',
                      borderRadius: '999px',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.7rem',
                      letterSpacing: '0.14em',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    data-cursor="SELECT"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* 3D FLOATING SLABS SHOWROOM VIEWPORT                           */}
        {/* ------------------------------------------------------------- */}
        <section
          style={{
            position: 'relative',
            width: '100%',
            height: '62vh',
            minHeight: '480px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: '#161718'
          }}
        >
          <MaterialShowroomCanvas
            filterCategory={filterCategory}
            selectedSlab={selectedSlab}
            onSelectSlab={handleOpenInspector}
          />

          <div
            style={{
              position: 'absolute',
              bottom: '1.25rem',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(18, 18, 19, 0.85)',
              backdropFilter: 'blur(10px)',
              padding: '0.5rem 1.25rem',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.12)',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              color: 'rgba(255,255,255,0.7)',
              pointerEvents: 'none'
            }}
          >
            HOVER TO FLOAT • CLICK SLAB TO INSPECT GRAZING LIGHT
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* CURATED SPECIFICATION GRID                                    */}
        {/* ------------------------------------------------------------- */}
        <section style={{ padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
          <div className="container-wide">
            <div style={{ marginBottom: '2.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  color: 'var(--accent, #B85C38)'
                }}
              >
                COMPREHENSIVE SPECIFICATIONS
              </span>
              <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '2rem', marginTop: '0.4rem' }}>
                GENUINE FINISHES CATALOGUE.
              </h2>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '2rem'
              }}
            >
              {MATERIAL_SLABS.map((slab) => (
                <div
                  key={slab.id}
                  onClick={() => handleOpenInspector(slab)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px',
                    padding: '1.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent, #B85C38)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  data-cursor="INSPECT"
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '0.65rem',
                          letterSpacing: '0.15em',
                          color: 'var(--accent, #B85C38)',
                          fontWeight: 700
                        }}
                      >
                        {slab.category}
                      </span>
                      <span
                        style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          backgroundColor: slab.color,
                          border: '1px solid rgba(255,255,255,0.3)'
                        }}
                      />
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '1.4rem', margin: '0 0 0.5rem 0' }}>
                      {slab.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {slab.origin}
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid rgba(255,255,255,0.08)',
                      paddingTop: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.72rem',
                      color: 'var(--accent, #B85C38)'
                    }}
                  >
                    <span>INSPECT 3D RELIEF</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* MODAL 3D LIGHT INSPECTION LABORATORY                          */}
        {/* ------------------------------------------------------------- */}
        <AnimatePresence>
          {isInspectorOpen && selectedSlab && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.88)',
                backdropFilter: 'blur(20px)',
                zIndex: 999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem'
              }}
            >
              <motion.div
                initial={{ scale: 0.92, y: 25 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 25 }}
                style={{
                  width: 'min(980px, 100%)',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  backgroundColor: '#18191A',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '24px',
                  boxShadow: '0 25px 70px rgba(0,0,0,0.8)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                  position: 'relative'
                }}
              >
                <button
                  onClick={() => setIsInspectorOpen(false)}
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    zIndex: 10
                  }}
                >
                  <X size={22} />
                </button>

                {/* Left: 3D Tactile Light Surface Inspection Viewport */}
                <div style={{ height: '420px', minHeight: '380px', position: 'relative', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
                  <TextureShowcaseCanvas
                    presetKey={
                      selectedSlab.id === 'stucco'
                        ? 'stucco'
                        : selectedSlab.id === 'anticco'
                        ? 'anticco'
                        : selectedSlab.id === 'royals-play'
                        ? 'royals-play'
                        : selectedSlab.id === 'teak-pu'
                        ? 'polycoat'
                        : 'wood'
                    }
                  />
                </div>

                {/* Right: Technical Spec Sheet */}
                <div style={{ padding: '2.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.18em',
                        color: 'var(--accent, #B85C38)',
                        display: 'block',
                        marginBottom: '0.35rem'
                      }}
                    >
                      {selectedSlab.category} • MATERIAL LAB
                    </span>

                    <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
                      {selectedSlab.name}
                    </h2>

                    <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {selectedSlab.origin}. Engineered for balanced light refraction across living and dining spaces.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem' }}>
                        <CheckCircle2 size={16} color="var(--accent, #B85C38)" />
                        <span>System: {selectedSlab.spec}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem' }}>
                        <CheckCircle2 size={16} color="var(--accent, #B85C38)" />
                        <span>Application: Hand-applied multi-coat system</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem' }}>
                        <CheckCircle2 size={16} color="var(--accent, #B85C38)" />
                        <span>Suitability: Bangalore residential interiors</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link
                      to="/contact"
                      state={{ materialInterest: selectedSlab.name }}
                      style={{
                        flex: 1,
                        backgroundColor: 'var(--accent, #B85C38)',
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        padding: '0.85rem',
                        borderRadius: '8px',
                        textAlign: 'center',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.14em',
                        fontWeight: 700
                      }}
                    >
                      REQUEST PHYSICAL SWATCH
                    </Link>

                    <Link
                      to="/space-studio"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        padding: '0.85rem 1.25rem',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.75rem',
                        letterSpacing: '0.12em',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}
                    >
                      VIEW IN 3D ROOM
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
