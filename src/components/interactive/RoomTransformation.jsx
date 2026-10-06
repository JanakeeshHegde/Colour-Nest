import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Compass,
  Layers,
  Sparkles,
  Sun,
  Eye,
  ArrowRight,
  Maximize2,
  ChevronRight,
  Check
} from 'lucide-react';
import { physicalSwatches } from '../../data/colours';
import { texturesData } from '../../data/textures';
import { useTheme } from '../../hooks/useTheme';
import { ArchitecturalLine } from '../common/ArchitecturalLine';

const roomStages = [
  { id: 'wall', label: 'WALL', desc: 'Prepped plaster & primer' },
  { id: 'floor', label: 'FLOOR', desc: 'Polished Italian stone flooring' },
  { id: 'wood', label: 'WOOD', desc: 'Teak doors & Melamyne joinery' },
  { id: 'light', label: 'LIGHT', desc: 'Concealed 3000K warm cove LEDs' },
  { id: 'ceiling', label: 'CEILING', desc: 'Gypsum floating soffits' },
  { id: 'decor', label: 'DECOR', desc: 'Curated architectural furnishings' }
];

export const RoomTransformation = () => {
  const { changeAccent } = useTheme();

  // State
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedSwatch, setSelectedSwatch] = useState(physicalSwatches[0]); // CLAY
  const [selectedTexture, setSelectedTexture] = useState(texturesData[0]); // STUCCO
  const [constructionStage, setConstructionStage] = useState(0); // 0 to 5 (WALL -> DECOR)
  const [lightingState, setLightingState] = useState('BALANCED'); // 'SOFT', 'BALANCED', 'WARM'
  const [mouseLight, setMouseLight] = useState({ x: 50, y: 40 });
  const roomViewportRef = useRef(null);

  // Mouse light tracking over texture
  const handleMouseMoveOverRoom = (e) => {
    if (!roomViewportRef.current) return;
    const rect = roomViewportRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMouseLight({ x: Math.round(x), y: Math.round(y) });
  };

  // Swatch selection updates wall and site accent
  const handleSelectSwatch = (swatch) => {
    setSelectedSwatch(swatch);
    changeAccent(swatch.id);
  };

  // Lighting parameters
  const lightingConfigs = {
    SOFT: {
      tint: 'rgba(235, 240, 245, 0.1)',
      shadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      filter: 'brightness(1.04) contrast(0.96) saturate(0.95)',
      description: 'Morning overcast daylight: balanced, cool-neutral diffusion.'
    },
    BALANCED: {
      tint: 'rgba(255, 230, 195, 0.14)',
      shadow: '0 30px 60px rgba(0, 0, 0, 0.28)',
      filter: 'brightness(1.0) contrast(1.02) saturate(1.05)',
      description: 'Late afternoon Bangalore sun: gentle golden warmth with defined shadow relief.'
    },
    WARM: {
      tint: 'rgba(255, 170, 85, 0.24)',
      shadow: '0 40px 80px rgba(0, 0, 0, 0.45)',
      filter: 'brightness(0.95) contrast(1.1) saturate(1.2) sepia(0.18)',
      description: 'Intimate evening twilight: rich amber cove glow grazing wall textures.'
    }
  };

  const currentLighting = lightingConfigs[lightingState];

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* ------------------------------------------------------------- */}
      {/* SCENE 01 — ENTER (Fullscreen Minimal Warm Dark Architectural) */}
      {/* ------------------------------------------------------------- */}
      {!hasEntered ? (
        <section
          style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 'calc(var(--nav-height) + 2.5rem)',
            paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
            paddingLeft: 'clamp(1.5rem, 5vw, 4rem)',
            paddingRight: 'clamp(1.5rem, 5vw, 4rem)',
            backgroundColor: '#121213',
            color: '#FAF7F2',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Architectural Silhouette Background */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.22) contrast(1.2) grayscale(20%)',
              transform: 'scale(1.04)',
              transition: 'transform 2s ease'
            }}
          />
          {/* Grain and Radial Atmosphere */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 60% 40%, rgba(184, 92, 56, 0.15) 0%, transparent 65%)',
              pointerEvents: 'none'
            }}
          />

          {/* Top Metadata */}
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent, #B85C38)' }}>
                COLOUR NEST • SCENE 01
              </span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.12em', color: 'rgba(255, 255, 255, 0.6)', marginTop: '2px' }}>
                PAINTING • INTERIORS • TEXTURES
              </p>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.45)' }}>
              12.9250° N, 77.5938° E • JAYANAGAR
            </div>
          </div>

          {/* Center Huge Statement: ENTER THE SPACE */}
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '1000px', margin: '2rem 0' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.25em',
                color: 'rgba(255, 255, 255, 0.65)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              AN ARCHITECTURAL EXPERIENCE
            </span>
            <h1
              className="heading-monumental"
              style={{
                color: '#FFFFFF',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                margin: 0
              }}
            >
              ENTER
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent, #B85C38)' }}>THE</span>
              <br />
              SPACE.
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.35rem)',
                color: 'rgba(255, 255, 255, 0.8)',
                marginTop: '2rem',
                maxWidth: '650px',
                lineHeight: 1.6
              }}
            >
              Step inside a living interior laboratory. Watch an unfinished room evolve through
              colour, tactile artisan textures, handcrafted timber, and responsive light.
            </p>
          </div>

          {/* Bottom Action: EXPLORE Camera Zoom Button */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              paddingTop: '2rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Compass size={18} color="var(--accent)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.14em', color: 'rgba(255, 255, 255, 0.6)' }}>
                SURFACE TRANSFORMATION PROTOCOL
              </span>
            </div>

            <button
              onClick={() => {
                setHasEntered(true);
                // Smooth scroll to transformation stage
                setTimeout(() => {
                  if (roomViewportRef.current) {
                    roomViewportRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }, 100);
              }}
              className="btn-primary"
              data-cursor="ENTER"
              style={{
                padding: '1.15rem 2.8rem',
                fontSize: '0.85rem',
                boxShadow: '0 8px 32px var(--accent-glow)'
              }}
            >
              <span>Explore The Space</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------------- */}
      {/* SCENE 02 TO 07 — TRANSFORMATION ENGINE CONTAINER               */}
      {/* ------------------------------------------------------------- */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(3rem, 7vw, 6rem) clamp(1.25rem, 4vw, 3rem)',
          backgroundColor: 'var(--surface-primary)',
          color: 'var(--ink-primary)',
          transition: 'var(--transition-color)'
        }}
      >
        <div className="container-wide">
          {/* Scene 02 Header: EVERY SPACE STARTS SOMEWHERE */}
          <div style={{ maxWidth: '960px', marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            <span className="meta-tag" style={{ marginBottom: '1rem' }}>
              SCENE 02 • THE RAW FOUNDATION
            </span>
            <h2
              className="heading-display"
              style={{
                letterSpacing: '-0.03em',
                marginBottom: '1rem'
              }}
            >
              EVERY SPACE <br />
              <span className="heading-editorial-italic">STARTS SOMEWHERE.</span>
            </h2>
            <ArchitecturalLine label="SURFACE 01 • JAYANAGAR RESIDENCE" coordinates="METRIC ELEVATION: 4.2M" />
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              A room is never just a room. It is a dialogue between{' '}
              <strong style={{ color: 'var(--accent)' }}>COLOUR</strong>,{' '}
              <strong style={{ color: 'var(--accent)' }}>LIGHT</strong>,{' '}
              <strong style={{ color: 'var(--accent)' }}>TEXTURE</strong>,{' '}
              <strong style={{ color: 'var(--accent)' }}>PROPORTION</strong>, and{' '}
              <strong style={{ color: 'var(--accent)' }}>CRAFT</strong>.
            </p>
          </div>

          {/* Interactive Room Showcase (The Live Architectural Room) */}
          <div
            ref={roomViewportRef}
            onMouseMove={handleMouseMoveOverRoom}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              minHeight: '420px',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              boxShadow: currentLighting.shadow,
              border: '1px solid var(--border-medium)',
              marginBottom: '3rem',
              backgroundColor: '#1C1A18',
              cursor: 'crosshair',
              transition: 'box-shadow 0.6s ease'
            }}
            data-cursor="LIGHT"
          >
            {/* Layer 0: Base Architectural Room Geometry */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'url("https://d3k88l35vy59af.cloudfront.net/A001/802/1596453135933.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: currentLighting.filter,
                transition: 'filter 0.6s ease'
              }}
            />

            {/* Layer 1: Physical Color Swatch Wall Mask Overlay (SVG Masking) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: selectedSwatch.hex,
                opacity: 0.52,
                mixBlendMode: 'multiply',
                clipPath: 'polygon(0 0, 75% 0, 68% 85%, 0 95%)',
                pointerEvents: 'none',
                transition: 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease'
              }}
            />

            {/* Layer 2: Texture Lighting Overlay Simulation */}
            {selectedTexture && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `radial-gradient(circle at ${mouseLight.x}% ${mouseLight.y}%, rgba(255, 255, 255, ${selectedTexture.specular * 0.4}) 0%, rgba(0, 0, 0, ${selectedTexture.roughness * 0.35}) 60%, transparent 100%)`,
                  mixBlendMode: 'overlay',
                  pointerEvents: 'none',
                  transition: 'background 0.08s ease-out'
                }}
              />
            )}

            {/* Layer 3: Construction Stages (Wall, Floor, Wood, Light, Ceiling, Decor) */}
            {constructionStage >= 2 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '25%',
                  background: 'linear-gradient(to top, rgba(92, 61, 36, 0.4) 0%, transparent 100%)',
                  mixBlendMode: 'multiply',
                  pointerEvents: 'none'
                }}
              />
            )}

            {constructionStage >= 3 && (
              <div
                style={{
                  position: 'absolute',
                  top: '8%',
                  left: '12%',
                  right: '12%',
                  height: '4px',
                  backgroundColor: 'rgba(255, 220, 150, 0.85)',
                  boxShadow: '0 0 25px 8px rgba(255, 200, 100, 0.65)',
                  borderRadius: '2px',
                  pointerEvents: 'none'
                }}
              />
            )}

            {/* Ambient Room Lighting Tint */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: currentLighting.tint,
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                transition: 'background-color 0.6s ease'
              }}
            />

            {/* Live Interactive In-Room HUD / Technical Metadata */}
            <div
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                backgroundColor: 'rgba(18, 18, 19, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '0.65rem 1.15rem',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                color: '#FAF7F2',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                zIndex: 10
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: selectedSwatch.hex }} />
              <span>COLOUR: {selectedSwatch.name.toUpperCase()} ({selectedSwatch.hex})</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
              <span>TEXTURE: {selectedTexture.label}</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
              <span>LIGHT POS: {mouseLight.x}%, {mouseLight.y}%</span>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                right: '1.5rem',
                backgroundColor: 'rgba(18, 18, 19, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#FAF7F2',
                zIndex: 10
              }}
            >
              STAGE: {roomStages[constructionStage].label} — {roomStages[constructionStage].desc}
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* SCENE 03 — THEN, COLOUR HAPPENS (Physical Paint-Chip Interface) */}
          {/* ------------------------------------------------------------- */}
          <div style={{ marginBottom: '4.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                  SCENE 03 • PHYSICAL SURFACE SWATCHES
                </span>
                <h3 className="heading-section">
                  THEN, <span className="heading-editorial-italic">COLOUR HAPPENS.</span>
                </h3>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                CLICK A SWATCH TO REPAINT ROOM WALL &amp; DYNAMIC SITE ACCENT
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '1rem'
              }}
            >
              {physicalSwatches.slice(0, 6).map((swatch) => {
                const isSelected = selectedSwatch.id === swatch.id;
                return (
                  <div
                    key={swatch.id}
                    onClick={() => handleSelectSwatch(swatch)}
                    className={`paint-chip ${isSelected ? 'active' : ''}`}
                    data-cursor="PICK"
                  >
                    <div
                      className="paint-chip-swatch"
                      style={{ backgroundColor: swatch.hex }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
                          }}
                        >
                          <Check size={12} color="#1C1A18" />
                        </div>
                      )}
                    </div>
                    <div className="paint-chip-label">{swatch.label}</div>
                    <div className="paint-chip-hex">{swatch.hex} • LRV {swatch.lrv}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* SCENE 04 — COLOUR IS ONLY THE BEGINNING (Tactile Textures)    */}
          {/* ------------------------------------------------------------- */}
          <div style={{ marginBottom: '4.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                  SCENE 04 • TACTILE ARTISAN SURFACE
                </span>
                <h3 className="heading-section">
                  COLOUR IS ONLY <span className="heading-editorial-italic">THE BEGINNING.</span>
                </h3>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                MOVE MOUSE OVER THE ROOM VIEWPORT ABOVE TO CONTROL VIRTUAL GRAZING LIGHT
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem'
              }}
            >
              {texturesData.slice(0, 4).map((texture) => {
                const isSelected = selectedTexture.id === texture.id;
                return (
                  <div
                    key={texture.id}
                    onClick={() => setSelectedTexture(texture)}
                    className="arch-card"
                    style={{
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? 'var(--accent-soft)' : 'var(--surface-card)',
                      transition: 'all 0.3s ease'
                    }}
                    data-cursor="PICK"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="meta-tag">{texture.label}</span>
                      {isSelected && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 700 }}>ACTIVE SURFACE</span>}
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                      {texture.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {texture.subtitle}
                    </p>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-muted)' }}>
                      Depth: {texture.reliefDepth}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* SCENE 05 — THE CONSTRUCTION SEQUENCE (WALL -> DECOR)          */}
          {/* ------------------------------------------------------------- */}
          <div style={{ marginBottom: '4.5rem' }}>
            <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
              SCENE 05 • ARCHITECTURAL CRAFT SEQUENCE
            </span>
            <h3 className="heading-section" style={{ marginBottom: '1.5rem' }}>
              HOW THE SPACE <span className="heading-editorial-italic">COMES TO LIFE.</span>
            </h3>

            {/* 6 Stage Construction Buttons */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}
            >
              {roomStages.map((stage, idx) => (
                <button
                  key={stage.id}
                  onClick={() => setConstructionStage(idx)}
                  className="filter-pill"
                  style={{
                    padding: '0.85rem 1rem',
                    textAlign: 'left',
                    borderRadius: 'var(--radius-xs)',
                    border: constructionStage === idx ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                    backgroundColor: constructionStage === idx ? 'var(--accent)' : 'var(--surface-card)',
                    color: constructionStage === idx ? '#FFFFFF' : 'var(--ink-primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem'
                  }}
                  data-cursor="STAGE"
                >
                  <span style={{ fontSize: '0.65rem', opacity: 0.75 }}>STAGE 0{idx + 1}</span>
                  <strong style={{ fontSize: '0.85rem' }}>{stage.label}</strong>
                </button>
              ))}
            </div>

            <div
              className="arch-card"
              style={{
                padding: '1.25rem 1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)' }}>
                  STAGE 0{constructionStage + 1}: {roomStages[constructionStage].label}
                </strong>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '2px' }}>
                  {roomStages[constructionStage].desc}
                </p>
              </div>
              <button
                onClick={() => setConstructionStage((prev) => (prev + 1) % roomStages.length)}
                className="btn-secondary"
                style={{ padding: '0.6rem 1.25rem', fontSize: '0.75rem' }}
              >
                <span>Advance Craft Phase</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* SCENE 06 — LIGHT CHANGES EVERYTHING                           */}
          {/* ------------------------------------------------------------- */}
          <div style={{ marginBottom: '4.5rem' }}>
            <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
              SCENE 06 • ARCHITECTURAL ILLUMINATION
            </span>
            <h3 className="heading-section" style={{ marginBottom: '1.5rem' }}>
              LIGHT <span className="heading-editorial-italic">CHANGES EVERYTHING.</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              {['SOFT', 'BALANCED', 'WARM'].map((stateKey) => {
                const isSelected = lightingState === stateKey;
                const cfg = lightingConfigs[stateKey];
                return (
                  <div
                    key={stateKey}
                    onClick={() => setLightingState(stateKey)}
                    className="arch-card"
                    style={{
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? 'var(--accent-soft)' : 'var(--surface-card)',
                      transition: 'all 0.3s ease'
                    }}
                    data-cursor="LIGHT"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <Sun size={16} color="var(--accent)" />
                      <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{stateKey} LIGHT</strong>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
                      {cfg.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* SCENE 07 — FINISHED SPACE REVEAL                              */}
          {/* ------------------------------------------------------------- */}
          <div
            className="arch-card"
            style={{
              padding: 'clamp(2.5rem, 6vw, 4.5rem)',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border-strong)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <span className="meta-tag" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
              SCENE 07 • TRANSFORMATION REVEAL
            </span>
            <h2
              className="heading-display"
              style={{
                lineHeight: 1.05,
                marginBottom: '1.5rem'
              }}
            >
              NOW, IT FEELS <br />
              <span className="heading-editorial-italic">LIKE YOUR SPACE.</span>
            </h2>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'var(--ink-secondary)',
                maxWidth: '650px',
                margin: '0 auto 2.5rem auto',
                lineHeight: 1.6
              }}
            >
              From raw plaster and uneven seams to an orchestrated harmony of mineral textures,
              natural teak, tailored lighting, and personalized warmth.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/services" className="btn-primary" data-cursor="EXPLORE">
                <span>Discover What We Create</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-secondary" data-cursor="CONSULT">
                <span>Book Abhishek Rao For Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
