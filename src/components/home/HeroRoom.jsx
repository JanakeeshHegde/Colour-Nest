import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Maximize2,
  X,
  Compass,
  Sparkles,
  Layers,
  Palette,
  Sun,
  Moon
} from 'lucide-react';
import { HeroRoomCanvas } from '../canvas/HeroRoomCanvas';
import { IMAGE_MANIFEST } from '../../data/imageManifest';

// Hotspot Information Dataset
const HOTSPOT_DETAILS = {
  wall: {
    title: 'SURFACE & ARTISAN TEXTURE',
    discipline: 'VENETIAN STUCCO & LIME PLASTERS',
    desc: 'Hand-burnished Italian marble aggregate plaster and bespoke mineral glazes that capture shifting natural daylight with organic depth and zero specular glare.',
    serviceSlug: 'premium-stucco-textures',
    serviceTitle: 'Explore Stucco & Textures',
    stats: ['100% Zero-VOC Slaked Lime', 'Steel Trowel Burnished', 'Bespoke Color Tinting']
  },
  wood: {
    title: 'BESPOKE TIMBER JOINERY',
    discipline: 'BURMA TEAK & PU CRYSTAL FINISH',
    desc: 'Architectural vertical fluted timber acoustic paneling and custom credenzas coated with non-yellowing polyurethane crystal sealers for enduring richness.',
    serviceSlug: 'wood-polishing-melamyne-pu',
    serviceTitle: 'Explore Wood & PU Finishes',
    stats: ['Grain-Preserving Lamination', 'High-Build Scratch Resistance', 'Precision Fluting']
  },
  ceiling: {
    title: 'CEILING ARCHITECTURE',
    discipline: 'DROPPED GYPSUM & COVE ILLUMINATION',
    desc: 'Laser-leveled stepped false ceiling islands concealing 3000K high-CRI indirect LED channels to sculpt room height and eliminate harsh overhead glare.',
    serviceSlug: 'false-ceiling-lights-fans',
    serviceTitle: 'Explore False Ceilings & Lighting',
    stats: ['Precision Gypsum Soffits', 'Concealed LED Channels', 'Seamless Acoustic Integration']
  },
  joinery: {
    title: 'BESPOKE LIVING CREDENZA',
    discipline: 'MODULAR CARPENTRY & METALLIC ACCENTS',
    desc: 'Integrated media console crafted from seasoned teakwood and brushed brass hardware, engineered to anchor the visual composition of the living pavilion.',
    serviceSlug: 'space-and-interiors',
    serviceTitle: 'Explore Turnkey Interiors',
    stats: ['Soft-Close Concealed Hardware', 'Brushed Brass Leg Plinths', 'Custom Dimensioning']
  },
  floor: {
    title: 'FLOOR ARCHITECTURE',
    discipline: 'HONED LIMESTONE & EUROPEAN WHITE OAK',
    desc: 'Large-format honed mineral stone and engineered hardwood planks, offering quiet tactile warmth and subtle light dispersion under natural daylight.',
    serviceSlug: 'space-and-interiors',
    serviceTitle: 'Explore Flooring & Execution',
    stats: ['Low-Sheen Honed Finish', 'Acoustic Underlayment', 'Seamless Floor Transitions']
  }
};

// 4 Curated Architectural Wall Finishes for Instant Customisation (Animation 02 lerp)
const QUICK_WALL_FINISHES = [
  { key: 'ivory', name: 'Warm Ivory', hex: '#FAF8F2', label: 'Silk Ivory' },
  { key: 'indigo', name: 'Venetian Indigo', hex: '#3C2D8C', label: 'Indigo' },
  { key: 'clay', name: 'Terracotta Stucco', hex: '#A0522D', label: 'Terracotta' },
  { key: 'sage', name: 'Muted Sage', hex: '#7A8B7B', label: 'Sage' }
];

export const HeroRoom = () => {
  const [viewMode, setViewMode] = useState('3d'); // '3d' | 'photo'
  const [wallColorKey, setWallColorKey] = useState('ivory');
  const [floorKey] = useState('stone');
  const [woodKey] = useState('warm');
  const [ceilingPreset] = useState('LAYERED');
  const [lightMode, setLightMode] = useState('BALANCED');
  const [activeHotspot, setActiveHotspot] = useState(null);

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'var(--surface-primary, #FAF8F2)',
        paddingTop: 'clamp(7.5rem, 11vh, 9.2rem)',
        paddingBottom: 'clamp(3rem, 5vh, 4.5rem)',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-subtle, rgba(33, 29, 45, 0.08))'
      }}
    >
      <div className="container-wide" style={{ maxWidth: '1480px', margin: '0 auto', padding: '0 clamp(1rem, 3vw, 2.5rem)' }}>
        {/* EDITORIAL 2-COLUMN SPLIT LAYOUT */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(2rem, 4.5vw, 4.5rem)',
            alignItems: 'center'
          }}
        >
          {/* ============================================================ */}
          {/* LEFT COLUMN: BRAND LABEL, HEADLINE, COPY, CTAS, CREDENTIALS */}
          {/* ============================================================ */}
          <div style={{ maxWidth: '620px' }}>
            {/* 1. Small COLOUR NEST Brand Label */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'rgba(60, 45, 140, 0.06)',
                border: '1px solid rgba(60, 45, 140, 0.22)',
                padding: '0.4rem 0.95rem',
                borderRadius: '999px',
                marginBottom: '1.75rem'
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--brand-indigo, #3C2D8C)'
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  color: 'var(--brand-indigo, #3C2D8C)',
                  fontWeight: 700,
                  textTransform: 'uppercase'
                }}
              >
                COLOUR NEST • ARCHITECTURAL INTERIORS &amp; FINISHES
              </span>
            </motion.div>

            {/* 2. Strong Headline: "Spaces Designed Around You." */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display, "Playfair Display", Georgia, serif)',
                fontSize: 'clamp(3.0rem, 5.2vw, 5.4rem)',
                fontWeight: 400,
                lineHeight: 1.04,
                letterSpacing: '-0.025em',
                color: 'var(--ink-primary, #211D2D)',
                margin: '0 0 1.5rem 0'
              }}
            >
              Spaces Designed <br />
              <span
                style={{
                  fontStyle: 'italic',
                  color: 'var(--brand-indigo, #3C2D8C)',
                  fontWeight: 400
                }}
              >
                Around You.
              </span>
            </motion.h1>

            {/* 3. Concise Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.6 }}
              style={{
                fontSize: 'clamp(1.02rem, 1.35vw, 1.2rem)',
                color: 'var(--ink-secondary, #524E60)',
                lineHeight: 1.65,
                marginBottom: '2.4rem',
                maxWidth: '540px'
              }}
            >
              From bespoke false ceilings and Italian Venetian stuccos to handcrafted teak joinery and turnkey architectural execution across Bangalore.
            </motion.p>

            {/* 4. Two CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.6 }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '2.8rem'
              }}
            >
              {/* Primary CTA: EXPLORE OUR SERVICES */}
              <Link
                to="/services"
                data-cursor="SERVICES"
                style={{
                  backgroundColor: 'var(--brand-indigo, #3C2D8C)',
                  color: '#FFFFFF',
                  border: '1px solid var(--brand-gold, #E3D9A4)',
                  padding: '1.05rem 2.2rem',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 6px 20px rgba(60, 45, 140, 0.28)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <span>EXPLORE OUR SERVICES</span>
                <ArrowRight size={16} color="var(--brand-gold, #E3D9A4)" />
              </Link>

              {/* Secondary CTA: START A PROJECT */}
              <Link
                to="/contact"
                data-cursor="CONTACT"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--ink-primary, #211D2D)',
                  border: '1.5px solid var(--ink-primary, #211D2D)',
                  padding: '1.0rem 2.0rem',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <span>START A PROJECT</span>
              </Link>
            </motion.div>

            {/* 5. Editorial Micro-Credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.25rem',
                borderTop: '1px solid var(--border-subtle, rgba(33, 29, 45, 0.1))',
                paddingTop: '1.5rem'
              }}
            >
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 600, color: 'var(--brand-indigo, #3C2D8C)', lineHeight: 1 }}>
                  12+
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                  Years Mastery
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 600, color: 'var(--brand-indigo, #3C2D8C)', lineHeight: 1 }}>
                  350+
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                  Homes Delivered
                </div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 600, color: 'var(--brand-indigo, #3C2D8C)', lineHeight: 1 }}>
                  100%
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', color: 'var(--ink-muted)', textTransform: 'uppercase', marginTop: '0.25rem' }}>
                  In-House Artisans
                </div>
              </div>
            </motion.div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: LARGE ARCHITECTURAL INTERIOR VISUAL            */}
          {/* ============================================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(440px, 64vh, 640px)',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: '#1C1A24',
              border: '1px solid rgba(33, 29, 45, 0.14)',
              boxShadow: '0 24px 60px rgba(33, 29, 45, 0.12)'
            }}
          >
            {/* Mode Switcher Pill (Top-Right): 3D REAL-TIME vs PHOTOGRAPHY */}
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 20,
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                backgroundColor: 'rgba(23, 21, 29, 0.82)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.16)',
                padding: '0.25rem',
                borderRadius: '999px'
              }}
            >
              <button
                onClick={() => setViewMode('3d')}
                style={{
                  backgroundColor: viewMode === '3d' ? 'var(--brand-indigo, #3C2D8C)' : 'transparent',
                  color: viewMode === '3d' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                  border: 'none',
                  padding: '0.35rem 0.8rem',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.25s ease'
                }}
              >
                <Compass size={12} />
                <span>3D ROOM</span>
              </button>
              <button
                onClick={() => setViewMode('photo')}
                style={{
                  backgroundColor: viewMode === 'photo' ? 'var(--brand-indigo, #3C2D8C)' : 'transparent',
                  color: viewMode === 'photo' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                  border: 'none',
                  padding: '0.35rem 0.8rem',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.25s ease'
                }}
              >
                <Layers size={12} />
                <span>PHOTO</span>
              </button>
            </div>

            {/* Top-Left Status Pill */}
            <div
              style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                zIndex: 20,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'rgba(23, 21, 29, 0.82)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(227, 217, 164, 0.25)',
                padding: '0.35rem 0.85rem',
                borderRadius: '4px'
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#E3D9A4' }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  color: '#FAF8F2',
                  fontWeight: 600
                }}
              >
                {viewMode === '3d' ? 'INTERACTIVE 3D PAVILION' : 'KEYNOTE ARCHITECTURE'}
              </span>
            </div>

            {/* VIEW MODE 1: LIVE 3D WEBGL ROOM */}
            {viewMode === '3d' && (
              <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                <HeroRoomCanvas
                  wallColorKey={wallColorKey}
                  floorKey={floorKey}
                  woodKey={woodKey}
                  ceilingPreset={ceilingPreset}
                  lightMode={lightMode}
                  onHotspotClick={(spot) => setActiveHotspot(spot)}
                  activeHotspot={activeHotspot}
                  showHotspots={true}
                />
              </div>
            )}

            {/* VIEW MODE 2: HIGH-RESOLUTION ARCHITECTURAL PHOTOGRAPHY */}
            {viewMode === 'photo' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{ position: 'absolute', inset: 0, zIndex: 1 }}
              >
                <img
                  src={IMAGE_MANIFEST['hero-architectural-main'].url}
                  alt={IMAGE_MANIFEST['hero-architectural-main'].name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 45%'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    backgroundColor: 'rgba(23, 21, 29, 0.82)',
                    backdropFilter: 'blur(10px)',
                    padding: '0.5rem 0.9rem',
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#FAF8F2',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem'
                  }}
                >
                  Architectural Double-Height Pavilion • Travertine &amp; Glazing
                </div>
              </motion.div>
            )}

            {/* FLOATING BOTTOM CONTROL BAR (Interactive Finish Selector & Full Studio Link) */}
            {viewMode === '3d' && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1rem',
                  right: '1rem',
                  zIndex: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                  backgroundColor: 'rgba(23, 21, 29, 0.88)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  padding: '0.55rem 0.95rem',
                  borderRadius: '6px'
                }}
              >
                {/* Quick Feature Wall Swatches (Animation 02 lerp preview) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.12em',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}
                  >
                    WALL FINISH:
                  </span>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {QUICK_WALL_FINISHES.map((swatch) => (
                      <button
                        key={swatch.key}
                        onClick={() => setWallColorKey(swatch.key)}
                        title={swatch.name}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          backgroundColor: swatch.hex,
                          border:
                            wallColorKey === swatch.key
                              ? '2px solid #E3D9A4'
                              : '1px solid rgba(255, 255, 255, 0.3)',
                          cursor: 'pointer',
                          transform: wallColorKey === swatch.key ? 'scale(1.15)' : 'scale(1)',
                          transition: 'all 0.2s ease'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Direct Link to Complete 3D Room Studio */}
                <Link
                  to="/space-studio"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    color: '#E3D9A4',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em'
                  }}
                >
                  <span>LAUNCH FULL 3D STUDIO</span>
                  <Maximize2 size={13} />
                </Link>
              </div>
            )}

            {/* ACTIVE HOTSPOT DETAIL MODAL / DRAWER */}
            <AnimatePresence>
              {activeHotspot && HOTSPOT_DETAILS[activeHotspot] && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    top: '4rem',
                    left: '1rem',
                    maxWidth: '380px',
                    zIndex: 30,
                    backgroundColor: 'rgba(33, 29, 45, 0.95)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid #E3D9A4',
                    borderRadius: '6px',
                    padding: '1.25rem',
                    boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
                    color: '#FAF8F2'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em', color: '#E3D9A4', textTransform: 'uppercase' }}>
                      {HOTSPOT_DETAILS[activeHotspot].discipline}
                    </span>
                    <button
                      onClick={() => setActiveHotspot(null)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.7)',
                        cursor: 'pointer',
                        padding: '2px'
                      }}
                    >
                      <X size={15} />
                    </button>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
                    {HOTSPOT_DETAILS[activeHotspot].title}
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.55, marginBottom: '0.85rem' }}>
                    {HOTSPOT_DETAILS[activeHotspot].desc}
                  </p>
                  <Link
                    to={`/services/${HOTSPOT_DETAILS[activeHotspot].serviceSlug}`}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: '#E3D9A4',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <span>{HOTSPOT_DETAILS[activeHotspot].serviceTitle}</span>
                    <ArrowRight size={13} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
