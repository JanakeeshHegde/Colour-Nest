import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, Bookmark, ArrowRight, Sparkles, SlidersHorizontal, Sun, Layers, Eye } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { roomTypes } from '../data/colours';
import { texturesData } from '../data/textures';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

// 6 Room Mood Modes modulating wall colour, lighting atmosphere, accent, and texture overlay
const roomMoodModes = {
  WARM: {
    id: "WARM",
    label: "WARM AMBER",
    subtitle: "Sun-drenched terracotta, oiled honey teak & candle-like 2700K cove glow",
    wallHex: "#B85C38",
    accentTone: "#B85C38",
    lightTint: "rgba(255, 175, 90, 0.22)",
    textureName: "Stucco Venetian Plaster",
    lightKelvin: "2700K Warm",
    filter: "brightness(0.96) contrast(1.08) saturate(1.2) sepia(0.15)",
    palette: [
      { name: "Terracotta Earth", hex: "#B85C38", role: "Focal Wall" },
      { name: "Oatmeal Plaster", hex: "#E8DEC8", role: "Perimeter Envelope" },
      { name: "Honey Burma Teak", hex: "#8A5428", role: "Joinery & Doors" },
      { name: "Burnished Brass", hex: "#B89648", role: "Light Profiles" },
      { name: "Alabaster White", hex: "#F7F4EC", role: "Gypsum Soffit" }
    ]
  },
  CALM: {
    id: "CALM",
    label: "CALM BOTANICAL",
    subtitle: "Bangalore eucalyptus sage, chalk minerals & diffused 3500K natural daylight",
    wallHex: "#7A8B7B",
    accentTone: "#5C6F5D",
    lightTint: "rgba(122, 139, 123, 0.14)",
    textureName: "Anticco Aged Stone Plaster",
    lightKelvin: "3500K Soft",
    filter: "brightness(1.02) contrast(0.98) saturate(0.92)",
    palette: [
      { name: "Botanical Sage", hex: "#7A8B7B", role: "Accent Plane" },
      { name: "Limestone Sand", hex: "#DFD7C4", role: "Primary Walls" },
      { name: "Bleached Oak", hex: "#BFA98F", role: "Wood Elements" },
      { name: "Dull Pewter", hex: "#6E726D", role: "Trim Detailing" },
      { name: "Morning Chalk", hex: "#FAF8F2", role: "False Ceiling" }
    ]
  },
  MODERN: {
    id: "MODERN",
    label: "MODERN MONOLITH",
    subtitle: "Gallery off-white, basalt slate lines & 4000K high-CRI recessed magnetic tracks",
    wallHex: "#46484A",
    accentTone: "#383B3D",
    lightTint: "rgba(220, 230, 240, 0.1)",
    textureName: "Satin Gyproc Architectural Plane",
    lightKelvin: "4000K Neutral",
    filter: "brightness(1.0) contrast(1.1) saturate(0.95)",
    palette: [
      { name: "Basalt Slate", hex: "#46484A", role: "Media Backdrop" },
      { name: "Gallery White", hex: "#F3F1EA", role: "Perimeter Skin" },
      { name: "Smoked American Walnut", hex: "#4C3322", role: "Floating Credenza" },
      { name: "Matte Black", hex: "#1A1A1B", role: "Concealed Profiles" },
      { name: "Pure Canvas", hex: "#FFFFFF", role: "Ceiling Island" }
    ]
  },
  LUXE: {
    id: "LUXE",
    label: "LUXE BRONZE",
    subtitle: "High-burnish marble luster, champagne mica glazes & rich velvet illumination",
    wallHex: "#8C6D46",
    accentTone: "#8C6D46",
    lightTint: "rgba(220, 180, 110, 0.18)",
    textureName: "Royals Play Dune Metallic Glaze",
    lightKelvin: "3000K Ambient",
    filter: "brightness(0.98) contrast(1.12) saturate(1.15)",
    palette: [
      { name: "Warm Bronze Luster", hex: "#8C6D46", role: "Feature Plaster" },
      { name: "Champagne Glaze", hex: "#D6C7AA", role: "Wall Weave" },
      { name: "Rosewood Polish", hex: "#3E1E19", role: "Entrance Door & Bar" },
      { name: "Antiqued Gold", hex: "#CCA44E", role: "Hardware & Trim" },
      { name: "Warm Ivory", hex: "#F5EFE4", role: "Cove Ceiling" }
    ]
  },
  EARTH: {
    id: "EARTH",
    label: "EARTH STONE",
    subtitle: "Tuscan sandstone, raw lime textures & warm granite plinth reflections",
    wallHex: "#A88D56",
    accentTone: "#A88D56",
    lightTint: "rgba(180, 150, 100, 0.15)",
    textureName: "Rough-Cast Architectural Plaster",
    lightKelvin: "3200K Natural",
    filter: "brightness(0.98) contrast(1.04) saturate(1.02) sepia(0.1)",
    palette: [
      { name: "Jayanagar Sandstone", hex: "#A88D56", role: "Masonry Wall" },
      { name: "Clay Adobe", hex: "#9F634A", role: "Niche Accent" },
      { name: "Weathered Teak", hex: "#7A5030", role: "Door Frames" },
      { name: "Basalt Stone", hex: "#3A3835", role: "Baseboard Skirting" },
      { name: "Travertine Cream", hex: "#EFE8DA", role: "Ceiling Plane" }
    ]
  },
  BOLD: {
    id: "BOLD",
    label: "BOLD NOCTURNE",
    subtitle: "Deep Mysore indigo, midnight charcoal & dramatic perimeter grazing spots",
    wallHex: "#2B3A4A",
    accentTone: "#2A455E",
    lightTint: "rgba(35, 45, 65, 0.24)",
    textureName: "Dark Burnished Stucco Plaster",
    lightKelvin: "2800K Intimate",
    filter: "brightness(0.92) contrast(1.16) saturate(1.1)",
    palette: [
      { name: "Deep Mysore Indigo", hex: "#2B3A4A", role: "Nocturne Wall" },
      { name: "Midnight Charcoal", hex: "#222426", role: "Media Unit" },
      { name: "Warm Greige", hex: "#C8BEAE", role: "Balancing Surface" },
      { name: "Burnished Brass", hex: "#C5A869", role: "Sconce Metal" },
      { name: "Whisper White", hex: "#EAE6DE", role: "Reflective Soffit" }
    ]
  }
};

const roomVisuals = {
  LIVING: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85",
  BEDROOM: "https://d3k88l35vy59af.cloudfront.net/A001/colour-nest/1591620955826.jpg",
  KITCHEN: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=80",
  EXTERIOR: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453192427.jpg"
};

export const ColourStudio = () => {
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState("LIVING");
  const [selectedModeKey, setSelectedModeKey] = useState("WARM");
  const [copiedHex, setCopiedHex] = useState(null);
  const [savedMoods, setSavedMoods] = useState(() => {
    try {
      const saved = localStorage.getItem('colournest_saved_moods');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const activeMood = roomMoodModes[selectedModeKey] || roomMoodModes["WARM"];
  const moodStorageKey = `${selectedRoom}_${selectedModeKey}`;
  const isSaved = savedMoods.some(m => m.key === moodStorageKey);

  const handleCopyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleSaveMood = () => {
    const entry = {
      key: moodStorageKey,
      room: selectedRoom,
      mode: selectedModeKey,
      name: activeMood.label,
      palette: activeMood.palette
    };
    const updated = [entry, ...savedMoods.filter(m => m.key !== moodStorageKey)];
    setSavedMoods(updated);
    localStorage.setItem('colournest_saved_moods', JSON.stringify(updated));
  };

  const handleUseThisLook = () => {
    navigate('/contact', {
      state: {
        roomType: selectedRoom,
        mood: activeMood.label,
        suggestedService: "Customised Interiors & Stucco Finishing",
        notes: `Selected from Room Mood Studio: ${selectedRoom} space in ${activeMood.label} atmosphere with ${activeMood.textureName} and ${activeMood.lightKelvin} lighting.`
      }
    });
  };

  return (
    <>
      <SEOHead
        title="Room Mood Studio — Holistic Spatial Atmosphere"
        description="Room Mood Studio by Colour Nest. Colour is one essential layer of the interior. Test complete room environments across Warm, Calm, Modern, Luxe, Earth and Bold atmospheres."
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
              SPATIAL ATMOSPHERE LABORATORY
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              ROOM MOOD <br />
              <span className="heading-editorial-italic">STUDIO.</span>
            </h1>
            <ArchitecturalLine label="COLOUR IS ONE LAYER OF THE COMPLETE INTERIOR" coordinates="SPATIAL EQUILIBRIUM" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              A paint chip in isolation tells only a fraction of the story. The Room Mood Studio integrates
              wall tone, joinery timber, lighting temperature, and surface texture into a complete living scene.
            </p>
          </div>

          {/* 3-Column Studio Interface (Left: Room & Moods, Center: Full Room Visualizer, Right: Material Palette) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              alignItems: 'start'
            }}
          >
            {/* LEFT: ROOM TYPOLOGY & 6 MOOD MODES */}
            <div style={{ gridColumn: 'span 12' }} className="mood-studio-left">
              {/* Room Typologies */}
              <div className="arch-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>01 • ENVIRONMENT</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.5rem' }}>
                  {roomTypes.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRoom(r.id)}
                      className="filter-pill"
                      style={{
                        padding: '0.75rem 0.5rem',
                        fontSize: '0.7rem',
                        textAlign: 'center',
                        backgroundColor: selectedRoom === r.id ? 'var(--accent)' : 'var(--surface-elevated)',
                        color: selectedRoom === r.id ? '#FFFFFF' : 'var(--ink-primary)',
                        borderColor: selectedRoom === r.id ? 'var(--accent)' : 'var(--border-subtle)'
                      }}
                      data-cursor="SELECT"
                    >
                      {r.id}
                    </button>
                  ))}
                </div>
              </div>

              {/* 6 Mood Modes: WARM, CALM, MODERN, LUXE, EARTH, BOLD */}
              <div className="arch-card" style={{ padding: '1.5rem' }}>
                <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>02 • SPATIAL MOOD MODE</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {Object.keys(roomMoodModes).map((mKey) => {
                    const m = roomMoodModes[mKey];
                    const isSelected = selectedModeKey === mKey;
                    return (
                      <button
                        key={mKey}
                        onClick={() => setSelectedModeKey(mKey)}
                        className="arch-card"
                        style={{
                          padding: '0.85rem 1.15rem',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                          backgroundColor: isSelected ? 'var(--accent-soft)' : 'var(--surface-elevated)'
                        }}
                        data-cursor="MOOD"
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '18px', height: '18px', borderRadius: '50%', backgroundColor: m.wallHex }} />
                          <strong style={{ fontSize: '0.82rem' }}>{m.label}</strong>
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: isSelected ? 'var(--accent)' : 'var(--ink-muted)' }}>
                          {isSelected ? 'ACTIVE' : m.lightKelvin}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CENTER: COMPLETE ROOM VISUALIZER */}
            <div style={{ gridColumn: 'span 12' }} className="mood-studio-center">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/10',
                  minHeight: '380px',
                  borderRadius: 'var(--radius-xs)',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-dramatic)',
                  border: '1px solid var(--border-medium)',
                  backgroundColor: '#161514',
                  marginBottom: '1.25rem'
                }}
              >
                {/* Complete Room Photography Base */}
                <img
                  src={roomVisuals[selectedRoom]}
                  alt={`${selectedRoom} Complete Interior`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: activeMood.filter,
                    transition: 'filter 0.6s ease'
                  }}
                />

                {/* Vertical Focal Wall Tint Layer */}
                <div
                  style={{
                    position: 'absolute',
                    top: '8%',
                    left: '4%',
                    width: '44%',
                    height: '76%',
                    backgroundColor: activeMood.wallHex,
                    opacity: 0.42,
                    mixBlendMode: 'multiply',
                    clipPath: 'polygon(0 0, 100% 5%, 92% 100%, 0 95%)',
                    transition: 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />

                {/* Atmospheric Ambient Lighting Wash */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: activeMood.lightTint,
                    mixBlendMode: 'screen',
                    pointerEvents: 'none',
                    transition: 'background-color 0.6s ease'
                  }}
                />

                {/* In-Room Live HUD */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.25rem',
                    left: '1.25rem',
                    backgroundColor: 'rgba(18, 18, 19, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.65rem 1.15rem',
                    borderRadius: 'var(--radius-xs)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: '#FAF7F2',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem'
                  }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeMood.wallHex }} />
                  <span>MOOD: {activeMood.label}</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
                  <span>SURFACE: {activeMood.textureName}</span>
                </div>
              </div>

              {/* Integrated Atmosphere Blueprint Details */}
              <div
                className="arch-card"
                style={{
                  padding: '1.25rem 1.75rem',
                  backgroundColor: 'var(--surface-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', display: 'block', marginBottom: '2px' }}>
                    LIGHT &amp; TEXTURE INTERACTION:
                  </strong>
                  <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)' }}>
                    {activeMood.subtitle}
                  </p>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                  {activeMood.lightKelvin}
                </div>
              </div>
            </div>

            {/* RIGHT: HARMONIZED SPATIAL PALETTE & ACTIONS */}
            <div style={{ gridColumn: 'span 12' }} className="mood-studio-right">
              <div className="arch-card" style={{ padding: '1.75rem' }}>
                <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                  HARMONIZED SPATIAL PALETTE
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '0.25rem' }}>
                  {activeMood.label}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>
                  Texture: {activeMood.textureName}
                </p>

                {/* 5 Layered Colors */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.75rem' }}>
                  {activeMood.palette.map((c, i) => (
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
                        <div style={{ width: '26px', height: '26px', borderRadius: 'var(--radius-xs)', backgroundColor: c.hex }} />
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
                        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '0.2rem 0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                        data-cursor="COPY"
                      >
                        {copiedHex === c.hex ? <Check size={12} color="var(--accent)" /> : <Copy size={12} />}
                        <span>{copiedHex === c.hex ? 'Copied' : c.hex}</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button
                    onClick={handleUseThisLook}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    data-cursor="USE"
                  >
                    <span>Use This Mood In Consultation</span>
                    <ArrowRight size={15} />
                  </button>

                  <button
                    onClick={handleSaveMood}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    data-cursor="SAVE"
                  >
                    <Bookmark size={15} color={isSaved ? 'var(--accent)' : 'currentColor'} />
                    <span>{isSaved ? 'Mood Saved In Studio' : 'Save Spatial Mood'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 1024px) {
          .mood-studio-left { grid-column: span 3 !important; }
          .mood-studio-center { grid-column: span 5 !important; }
          .mood-studio-right { grid-column: span 4 !important; }
        }
      `}</style>
    </>
  );
};
