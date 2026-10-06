import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Sun, Eye, Layers, ArrowUpRight, Compass } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { texturesData } from '../data/textures';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

export const TextureLab = () => {
  const [selectedTexture, setSelectedTexture] = useState(texturesData[0]); // STUCCO
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

  return (
    <>
      <SEOHead
        title="Texture Lab — Tactile Light Simulation"
        description="Touch the surface at the Colour Nest Texture Lab. Interactive directional light source simulation over Venetian Stucco, Italian Anticco, Royals Play, and Polycoat wood."
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
          <div style={{ maxWidth: '920px', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
            <span className="meta-tag" style={{ marginBottom: '1rem' }}>
              TACTILE SURFACE LABORATORY
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              TOUCH <br />
              <span className="heading-editorial-italic">THE SURFACE.</span>
            </h1>
            <ArchitecturalLine label="VIRTUAL DIRECTIONAL LIGHT SOURCE" coordinates="SURFACE SPECULARITY: 3D SHADOWING" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              Move your cursor across the large architectural surface below. Watch how Venetian marble aggregate,
              combed glazes, and deep Polycoat sealants cast directional micro-shadows as light grazes the relief.
            </p>
          </div>

          {/* Texture Selection Tabs */}
          <div className="filter-bar" style={{ marginBottom: '2.5rem' }}>
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

          {/* Large Interactive 3D Simulated Surface */}
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
            {/* Base High-Resolution Texture Imagery */}
            <img
              src={selectedTexture.realImage}
              alt={selectedTexture.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'contrast(1.15) brightness(0.95)'
              }}
              onError={(e) => {
                e.currentTarget.src = selectedTexture.highResImage;
              }}
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

            {/* Virtual Light Indicator Beacon */}
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

            {/* HUD / Coordinates */}
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
              <span>{selectedTexture.title.toUpperCase()}</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
              <span>LIGHT SOURCE: {lightPos.x}%, {lightPos.y}%</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
              <span>ROUGHNESS: {selectedTexture.roughness}</span>
            </div>
          </div>

          {/* Color Variants & Specification Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'start' }}>
            <div className="arch-card" style={{ padding: '2rem' }}>
              <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
                AVAILABLE ARCHITECTURAL TINTS
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '1.25rem' }}>
                Select Color Recipe
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
                <div><strong>Eco Profile:</strong> {selectedTexture.technicalSpec.voc}</div>
              </div>

              <Link
                to={`/services/${selectedTexture.serviceSlug}`}
                className="btn-primary"
                data-cursor="VIEW"
              >
                <span>View Full Service Details</span>
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
