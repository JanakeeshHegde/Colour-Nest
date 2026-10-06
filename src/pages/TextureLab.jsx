import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Sun, Eye, Layers, ArrowUpRight, Compass, Maximize2, ZoomOut } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { texturesData } from '../data/textures';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

// Complete room context images for each texture
const textureRoomContexts = {
  "stucco": {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
    caption: "Venetian Stucco featured across living hall focal wall, harmonizing with teak paneling and cove illumination."
  },
  "anticco": {
    image: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453115929.jpg",
    caption: "Anticco aged Italian plaster framing master bed chamber, softly diffusing natural garden daylight."
  },
  "royals-play": {
    image: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453044604.jpg",
    caption: "Royals Play metallic stipple glaze framing double-height atrium staircase with shimmer under evening chandeliers."
  },
  "wood-polish": {
    image: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453157525.jpg",
    caption: "Melamyne and PU satin finish across custom fluted credenza and entrance timber portal."
  },
  "polycoat": {
    image: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453573110.jpg",
    caption: "Two-pack Polycoat liquid crystal gloss preserving solid teak dining credenza with diamond scratch resistance."
  },
  "textured-wall": {
    image: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453192427.jpg",
    caption: "Rough-cast architectural exterior stone plaster repelling monsoon downpours along building facade."
  }
};

export const TextureLab = () => {
  const [selectedTexture, setSelectedTexture] = useState(texturesData[0]); // STUCCO
  const [viewMode, setViewMode] = useState('SURFACE'); // 'SURFACE' or 'ROOM'
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });
  const surfaceRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!surfaceRef.current) return;
    const rect = surfaceRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLightPos({ x: Math.round(x), y: Math.round(y) });
  };

  const activeColor = selectedTexture.colorVariations[selectedColorIdx] || selectedTexture.colorVariations[0];
  const roomContext = textureRoomContexts[selectedTexture.id] || textureRoomContexts["stucco"];

  return (
    <>
      <SEOHead
        title="Texture Lab — Surface & Room Context"
        description="Touch the surface at the Colour Nest Texture Lab. Inspect artisan textures up close with virtual grazing light, then zoom out to see them in complete interior room context."
      />

      <section
        style={{
          paddingTop: 'calc(var(--nav-height) + 2.5rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          backgroundColor: 'var(--surface-primary)',
          minHeight: '100vh'
        }}
      >
        <div className="container-wide">
          {/* Header */}
          <div style={{ maxWidth: '960px', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
            <span className="meta-tag" style={{ marginBottom: '1rem' }}>
              TACTILE MATERIAL &amp; SPATIAL SCALE
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              TOUCH <br />
              <span className="heading-editorial-italic">THE SURFACE.</span>
            </h1>
            <ArchitecturalLine label="SURFACE CLOSE-UP $\longleftrightarrow$ COMPLETE ROOM CONTEXT" coordinates="DUAL-SCALE INSPECTION" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              Inspect fine marble aggregates and grain relief with virtual grazing light, then zoom out
              to experience how that finish transforms an entire architectural room.
            </p>
          </div>

          {/* Texture Tabs */}
          <div className="filter-bar" style={{ marginBottom: '2rem' }}>
            {texturesData.map((tex) => (
              <button
                key={tex.id}
                onClick={() => {
                  setSelectedTexture(tex);
                  setSelectedColorIdx(0);
                }}
                className={`filter-pill ${selectedTexture.id === tex.id ? 'active' : ''}`}
                data-cursor="INSPECT"
              >
                {tex.label}
              </button>
            ))}
          </div>

          {/* Dual Scale View Mode Switcher: SURFACE CLOSE-UP vs COMPLETE ROOM CONTEXT */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Perspective:
            </span>
            <button
              onClick={() => setViewMode('SURFACE')}
              className="filter-pill"
              style={{
                backgroundColor: viewMode === 'SURFACE' ? 'var(--accent)' : 'var(--surface-card)',
                color: viewMode === 'SURFACE' ? '#FFFFFF' : 'var(--ink-primary)',
                borderColor: viewMode === 'SURFACE' ? 'var(--accent)' : 'var(--border-subtle)'
              }}
              data-cursor="ZOOM"
            >
              Surface Close-Up (Light Grazing)
            </button>
            <button
              onClick={() => setViewMode('ROOM')}
              className="filter-pill"
              style={{
                backgroundColor: viewMode === 'ROOM' ? 'var(--accent)' : 'var(--surface-card)',
                color: viewMode === 'ROOM' ? '#FFFFFF' : 'var(--ink-primary)',
                borderColor: viewMode === 'ROOM' ? 'var(--accent)' : 'var(--border-subtle)'
              }}
              data-cursor="ROOM"
            >
              Complete Room Context (Full Space)
            </button>
          </div>

          {/* Interactive Stage (Switches between Surface Light Grazing and Room Context) */}
          {viewMode === 'SURFACE' ? (
            <div
              ref={surfaceRef}
              onMouseMove={handleMouseMove}
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                minHeight: '440px',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-dramatic)',
                border: '1px solid var(--border-medium)',
                cursor: 'crosshair',
                marginBottom: '3rem'
              }}
              data-cursor="GRAZE"
            >
              <img
                src={selectedTexture.realImage}
                alt={selectedTexture.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.15) brightness(0.95)' }}
                onError={(e) => (e.currentTarget.src = selectedTexture.highResImage)}
              />

              {/* Dynamic Directional Light Ray Simulation Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255, 255, 255, ${selectedTexture.specular * 0.6}) 0%, rgba(255, 240, 200, ${selectedTexture.specular * 0.3}) 25%, rgba(0, 0, 0, ${selectedTexture.roughness * 0.6}) 70%, rgba(0, 0, 0, 0.85) 100%)`,
                  mixBlendMode: 'overlay',
                  pointerEvents: 'none'
                }}
              />

              {/* Color Wash Overlay */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: activeColor.hex,
                  opacity: 0.35,
                  mixBlendMode: 'multiply',
                  pointerEvents: 'none',
                  transition: 'background-color 0.6s ease'
                }}
              />

              {/* Light Beacon */}
              <div
                style={{
                  position: 'absolute',
                  top: `${lightPos.y}%`,
                  left: `${lightPos.x}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 0 30px 10px rgba(255, 255, 255, 0.6)',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}
              >
                <Sun size={14} />
              </div>

              {/* HUD */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  backgroundColor: 'rgba(18, 18, 19, 0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  zIndex: 10
                }}
              >
                <span>SURFACE DETAIL: {selectedTexture.title.toUpperCase()}</span>
                <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
                <span>LIGHT: {lightPos.x}%, {lightPos.y}%</span>
              </div>
            </div>
          ) : (
            /* Complete Room Context View */
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                minHeight: '440px',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-dramatic)',
                border: '1px solid var(--border-medium)',
                marginBottom: '3rem'
              }}
            >
              <img
                src={roomContext.image}
                alt={`${selectedTexture.title} in Complete Interior Context`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  right: '1.5rem',
                  backgroundColor: 'rgba(18, 18, 19, 0.85)',
                  backdropFilter: 'blur(10px)',
                  padding: '1rem 1.5rem',
                  borderRadius: 'var(--radius-xs)',
                  color: '#FFFFFF'
                }}
              >
                <span className="meta-tag" style={{ color: 'var(--accent)', marginBottom: '0.35rem' }}>
                  COMPLETE INTERIOR HARMONY
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.3rem' }}>
                  {selectedTexture.title} In Living Context
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                  {roomContext.caption}
                </p>
              </div>
            </div>
          )}

          {/* Color Variants & Specification Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
            <div className="arch-card" style={{ padding: '2rem' }}>
              <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
                AVAILABLE TINTS &amp; AGGREGATES
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '1.25rem' }}>
                Architectural Formulations
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedTexture.colorVariations.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIdx(i)}
                    className="arch-card"
                    style={{
                      padding: '0.85rem 1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: selectedColorIdx === i ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                      backgroundColor: selectedColorIdx === i ? 'var(--accent-soft)' : 'var(--surface-elevated)'
                    }}
                    data-cursor="SELECT"
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: c.hex }} />
                      <strong style={{ fontSize: '0.85rem' }}>{c.name}</strong>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                      {c.hex}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="arch-card" style={{ padding: '2rem' }}>
              <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
                TECHNICAL SPECIFICATION
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '1rem' }}>
                Material Properties
              </h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                {selectedTexture.description}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginBottom: '2rem' }}>
                <div><strong>Base Composition:</strong> {selectedTexture.technicalSpec.composition}</div>
                <div><strong>Surface Sheen:</strong> {selectedTexture.technicalSpec.sheenLevel}</div>
                <div><strong>Build Thickness:</strong> {selectedTexture.technicalSpec.thickness}</div>
                <div><strong>Environment:</strong> {selectedTexture.technicalSpec.voc}</div>
              </div>

              <Link
                to={`/services/${selectedTexture.serviceSlug}`}
                className="btn-primary"
                data-cursor="VIEW"
              >
                <span>View Full Service Discipline</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
