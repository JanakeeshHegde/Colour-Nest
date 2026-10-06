import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, Bookmark, ArrowRight, Sparkles, SlidersHorizontal, Sun } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { roomTypes, moodTypes, curatedPalettes } from '../data/colours';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

const roomVisuals = {
  LIVING: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453135933.jpg",
  BEDROOM: "https://d3k88l35vy59af.cloudfront.net/A001/colour-nest/1591620955826.jpg",
  KITCHEN: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80",
  EXTERIOR: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453192427.jpg"
};

export const ColourStudio = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState("LIVING");
  const [selectedMood, setSelectedMood] = useState("CALM");
  const [copiedHex, setCopiedHex] = useState(null);
  const [savedPalettes, setSavedPalettes] = useState(() => {
    try {
      const saved = localStorage.getItem('colournest_saved_palettes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isSavedCurrent, setIsSavedCurrent] = useState(false);

  const paletteKey = `${selectedRoom}_${selectedMood}`;
  const currentPalette = curatedPalettes[paletteKey] || curatedPalettes["LIVING_CALM"];

  useEffect(() => {
    const isSaved = savedPalettes.some(p => p.key === paletteKey);
    setIsSavedCurrent(isSaved);
  }, [paletteKey, savedPalettes]);

  const handleCopyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleSavePalette = () => {
    const newEntry = {
      key: paletteKey,
      room: selectedRoom,
      mood: selectedMood,
      name: currentPalette.name,
      colors: currentPalette.colors
    };
    const updated = [newEntry, ...savedPalettes.filter(p => p.key !== paletteKey)];
    setSavedPalettes(updated);
    localStorage.setItem('colournest_saved_palettes', JSON.stringify(updated));
    setIsSavedCurrent(true);
  };

  const handleUseThisLook = () => {
    // Navigate to contact with state
    navigate('/contact', {
      state: {
        paletteName: currentPalette.name,
        roomType: selectedRoom,
        mood: selectedMood,
        colors: currentPalette.colors
      }
    });
  };

  return (
    <>
      <SEOHead
        title="Colour Studio — Architectural Palettes"
        description="Explore curated 5-colour architectural interior palettes in contextual 3D spaces. Living, bedroom, culinary and exterior tones designed for Bangalore light."
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
              FLAGSHIP COLOUR LABORATORY
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              COLOUR, <br />
              <span className="heading-editorial-italic">IN CONTEXT.</span>
            </h1>
            <ArchitecturalLine label="CURATED 5-COLOUR HARMONIES" coordinates="LIGHT-INDEXED EQUATIONS" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              Paint chips in isolation deceive the eye. The Colour Studio tests pigment performance
              directly inside rooms under daylight simulation.
            </p>
          </div>

          {/* 3-Column Studio Interface (Left: Room Type, Center: Visualizer, Right: Palette) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              alignItems: 'start'
            }}
          >
            {/* LEFT: ROOM TYPE & MOOD SELECTOR (3 cols) */}
            <div
              style={{
                gridColumn: 'span 12',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
              }}
              className="studio-left-col"
            >
              <div className="arch-card" style={{ padding: '1.75rem' }}>
                <span className="meta-tag" style={{ marginBottom: '1rem' }}>
                  01 • SPATIAL TYPOLOGY
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.65rem' }}>
                  {roomTypes.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id)}
                      className="filter-pill"
                      style={{
                        padding: '0.75rem 0.5rem',
                        textAlign: 'center',
                        fontSize: '0.7rem',
                        backgroundColor: selectedRoom === room.id ? 'var(--accent)' : 'var(--surface-elevated)',
                        color: selectedRoom === room.id ? '#FFFFFF' : 'var(--ink-primary)',
                        borderColor: selectedRoom === room.id ? 'var(--accent)' : 'var(--border-subtle)'
                      }}
                      data-cursor="SELECT"
                    >
                      {room.id}
                    </button>
                  ))}
                </div>
              </div>

              <div className="arch-card" style={{ padding: '1.75rem' }}>
                <span className="meta-tag" style={{ marginBottom: '1rem' }}>
                  02 • ATMOSPHERE / MOOD
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.65rem' }}>
                  {moodTypes.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => setSelectedMood(mood.id)}
                      className="filter-pill"
                      style={{
                        padding: '0.75rem 0.5rem',
                        textAlign: 'center',
                        fontSize: '0.7rem',
                        backgroundColor: selectedMood === mood.id ? 'var(--accent)' : 'var(--surface-elevated)',
                        color: selectedMood === mood.id ? '#FFFFFF' : 'var(--ink-primary)',
                        borderColor: selectedMood === mood.id ? 'var(--accent)' : 'var(--border-subtle)'
                      }}
                      data-cursor="SELECT"
                    >
                      {mood.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CENTER: ROOM VISUALIZER (6 cols on desktop) */}
            <div
              style={{
                gridColumn: 'span 12',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
              className="studio-center-col"
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/10',
                  minHeight: '360px',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-dramatic)',
                  border: '1px solid var(--border-medium)',
                  backgroundColor: '#161514'
                }}
              >
                {/* Room Geometry Image */}
                <img
                  src={roomVisuals[selectedRoom]}
                  alt={`${selectedRoom} Room View`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'contrast(1.05)'
                  }}
                />

                {/* Primary Feature Accent Tint Layer */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: currentPalette.colors[2]?.hex || '#B85C38',
                    opacity: 0.42,
                    mixBlendMode: 'multiply',
                    clipPath: 'polygon(0 0, 70% 0, 60% 100%, 0 100%)',
                    transition: 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />

                {/* Secondary Wall Tint Layer */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '45%',
                    height: '100%',
                    backgroundColor: currentPalette.colors[1]?.hex || '#E2D9C5',
                    opacity: 0.35,
                    mixBlendMode: 'multiply',
                    transition: 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />

                {/* In-Room Context HUD */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.25rem',
                    backgroundColor: 'rgba(18, 18, 19, 0.8)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.6rem 1rem',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#FAF7F2',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: currentPalette.colors[2]?.hex || '#B85C38'
                    }}
                  />
                  <span>{currentPalette.name.toUpperCase()}</span>
                </div>
              </div>

              {/* Architectural Recommendation Box */}
              <div
                className="arch-card"
                style={{
                  padding: '1.25rem 1.75rem',
                  backgroundColor: 'var(--surface-secondary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                  <Sun size={15} color="var(--accent)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700 }}>
                    FINISH &amp; LIGHTING GUIDANCE
                  </span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
                  {currentPalette.recommendedFinish} — {currentPalette.lightingTip}
                </p>
              </div>
            </div>

            {/* RIGHT: SELECTED PALETTE (5-COLOURS, COPY, SAVE, USE LOOK) */}
            <div
              style={{
                gridColumn: 'span 12',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
              className="studio-right-col"
            >
              <div className="arch-card" style={{ padding: '1.75rem' }}>
                <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                  CURATED 5-COLOUR FORMULA
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '0.4rem' }}>
                  {currentPalette.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', marginBottom: '1.5rem', lineHeight: 1.4 }}>
                  {currentPalette.concept}
                </p>

                {/* 5 Colors List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {currentPalette.colors.map((c, i) => (
                    <div
                      key={c.hex + i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.65rem 0.85rem',
                        backgroundColor: 'var(--surface-primary)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-xs)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: 'var(--radius-xs)',
                            backgroundColor: c.hex,
                            boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <div>
                          <strong style={{ fontSize: '0.85rem', display: 'block' }}>{c.name}</strong>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--ink-muted)' }}>
                            {c.role}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopyHex(c.hex)}
                        className="btn-ghost"
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.72rem',
                          padding: '0.2rem 0.5rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem'
                        }}
                        data-cursor="COPY"
                      >
                        {copiedHex === c.hex ? <Check size={13} color="var(--accent)" /> : <Copy size={13} />}
                        <span>{copiedHex === c.hex ? 'Copied' : c.hex}</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Action Buttons: Save Palette & Use This Look */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    onClick={handleUseThisLook}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    data-cursor="USE"
                  >
                    <span>Use This Look In Consultation</span>
                    <ArrowRight size={15} />
                  </button>

                  <button
                    onClick={handleSavePalette}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    data-cursor="SAVE"
                  >
                    <Bookmark size={15} color={isSavedCurrent ? 'var(--accent)' : 'currentColor'} />
                    <span>{isSavedCurrent ? 'Palette Saved to Studio' : 'Save Palette to Studio'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive layout CSS for Studio */}
      <style>{`
        @media (min-width: 1024px) {
          .studio-left-col {
            grid-column: span 3 !important;
          }
          .studio-center-col {
            grid-column: span 5 !important;
          }
          .studio-right-col {
            grid-column: span 4 !important;
          }
        }
      `}</style>
    </>
  );
};
