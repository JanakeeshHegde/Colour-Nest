import React, { useState, useRef } from 'react';
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
  Check,
  ZoomIn,
  Sliders,
  Ruler
} from 'lucide-react';
import { physicalSwatches } from '../../data/colours';
import { texturesData, materialCategories } from '../../data/textures';
import { useTheme } from '../../hooks/useTheme';
import { ArchitecturalLine } from '../common/ArchitecturalLine';
import { IMAGE_MANIFEST } from '../../data/imageManifest';

// Spatial details for Scene 06 (Full Room -> Detail -> Full Room)
const detailFoci = [
  {
    id: 'wood-detail',
    label: 'TEAK JOINERY & PU POLISH',
    category: 'WOOD CRAFT',
    desc: 'High-build polyurethane crystal seal over Burma teak credenza and fluted wall slats.',
    image: IMAGE_MANIFEST["material-wood-grain"].url,
    crop: 'center 40%'
  },
  {
    id: 'texture-detail',
    label: 'STUCCO MARBLE PLASTER',
    category: 'MINERAL RELIEF',
    desc: 'Hand-burnished Italian lime aggregate reflecting ambient morning light with zero specular glare.',
    image: IMAGE_MANIFEST["material-stucco-finish"].url,
    crop: 'center 60%'
  },
  {
    id: 'ceiling-detail',
    label: 'FALSE CEILING & COVE ILLUMINATION',
    category: 'CEILING ARCHITECTURE',
    desc: 'Precision laser-leveled gypsum drop soffit with 3000K warm indirect grazing channel.',
    image: IMAGE_MANIFEST["architectural-false-ceiling"].url,
    crop: 'top center'
  },
  {
    id: 'decor-detail',
    label: 'BESPOKE HARDWARE & MOLDINGS',
    category: 'DECOR ACCENTS',
    desc: 'Architectural skirtings, concealed track lighting, and brushed brass fixture accents.',
    image: IMAGE_MANIFEST["architectural-lighting-pendant"].url,
    crop: 'center'
  }
];

// Complete Transformation Layers for Scene 07
const progressiveTransformationLayers = [
  { step: 1, label: '01 SUBSTRATE PREP', title: 'Laser Flatness & Primer', desc: 'Moisture barrier applied to all vertical and ceiling masonry planes.' },
  { step: 2, label: '02 CEILING ARCHITECTURE', title: 'Gypsum Soffits & Coves', desc: 'Stepped ceiling islands with integrated indirect LED light troughs.' },
  { step: 3, label: '03 WOOD & JOINERY', title: 'Bespoke Timber & PU Finish', desc: 'Custom TV media credenza, teak door polishing and fluted partitions.' },
  { step: 4, label: '04 SURFACE & TEXTURE', title: 'Artisan Venetian Stucco', desc: 'Hand-burnished Italian marble plaster creating deep acoustic and light depth.' },
  { step: 5, label: '05 ARCHITECTURAL LIGHT', title: 'Calibrated Cove & Spot Lighting', desc: '3000K warm dimmable ambience and high-CRI accent spots.' },
  { step: 6, label: '06 FURNISHING & DECOR', title: 'Harmonized Spatial Styling', desc: 'Textured drapes, organic seating, and tactile accents unified as one.' }
];

export const RoomTransformation = () => {
  const { changeAccent } = useTheme();

  // State
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedSwatch, setSelectedSwatch] = useState(physicalSwatches[0]); // CLAY
  const [selectedTexture, setSelectedTexture] = useState(texturesData[0]); // STUCCO
  const [selectedMaterialCategory, setSelectedMaterialCategory] = useState('ALL');
  const [lightingState, setLightingState] = useState('BALANCED'); // 'SOFT', 'BALANCED', 'WARM'
  const [activeDetailIdx, setActiveDetailIdx] = useState(0);
  const [isZoomedDetail, setIsZoomedDetail] = useState(false);
  const [transProgress, setTransProgress] = useState(6); // 1 to 6 layers
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

  // Lighting parameters for Scene 05
  const lightingConfigs = {
    SOFT: {
      tint: 'rgba(235, 240, 245, 0.08)',
      shadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      filter: 'brightness(1.05) contrast(0.96) saturate(0.92)',
      description: 'Morning overcast daylight: balanced, cool-neutral daylight pouring through wide verandah openings.'
    },
    BALANCED: {
      tint: 'rgba(255, 230, 195, 0.12)',
      shadow: '0 30px 60px rgba(0, 0, 0, 0.28)',
      filter: 'brightness(1.0) contrast(1.02) saturate(1.06)',
      description: 'Golden Bangalore afternoon: warm diffused sunlight highlighting timber grain and plaster relief.'
    },
    WARM: {
      tint: 'rgba(255, 170, 85, 0.22)',
      shadow: '0 40px 80px rgba(0, 0, 0, 0.45)',
      filter: 'brightness(0.94) contrast(1.1) saturate(1.22) sepia(0.18)',
      description: 'Evening architectural twilight: 2700K concealed cove LEDs grazing walls and illuminating teak joinery.'
    }
  };

  const currentLighting = lightingConfigs[lightingState];

  const filteredMaterials = selectedMaterialCategory === 'ALL'
    ? texturesData
    : texturesData.filter(m => m.category === selectedMaterialCategory);

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* ------------------------------------------------------------- */}
      {/* SCENE 01 — THE SPACE (Complete Premium Interior Environment)  */}
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
          {/* Deep Architectural Interior Photography (Complete Space: Floor, Walls, Ceiling, Timber, Lighting, Furniture) */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'url("/images/hero/hero_main.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.42) contrast(1.15)',
              transform: 'scale(1.02)',
              transition: 'transform 2.5s ease'
            }}
          />
          {/* Subtle Ambient Radial Lighting */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle at 65% 45%, rgba(184, 92, 56, 0.18) 0%, rgba(18, 18, 19, 0.75) 85%)',
              pointerEvents: 'none'
            }}
          />

          {/* Top Metadata */}
          <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--accent, #B85C38)' }}>
                COLOUR NEST • SCENE 01
              </span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.14em', color: 'rgba(255, 255, 255, 0.75)', marginTop: '2px' }}>
                INTERIORS • PAINT • TEXTURES • LIGHT • DECOR
              </p>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'rgba(255, 255, 255, 0.55)' }}>
              12.9250° N, 77.5938° E • JAYANAGAR 9TH BLOCK
            </div>
          </div>

          {/* Center Space-First Monumental Statement */}
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '1050px', margin: '2rem 0' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.25em',
                color: 'rgba(255, 255, 255, 0.75)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1rem'
              }}
            >
              COMPLETE INTERIOR &amp; FINISHING STUDIO
            </span>
            <h1
              className="heading-monumental"
              style={{
                color: '#FFFFFF',
                letterSpacing: '-0.04em',
                lineHeight: 0.92,
                margin: 0
              }}
            >
              WE TRANSFORM
              <br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent, #B85C38)' }}>HOW SPACES</span>
              <br />
              FEEL.
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                color: 'rgba(255, 255, 255, 0.85)',
                marginTop: '1.75rem',
                maxWidth: '720px',
                lineHeight: 1.6
              }}
            >
              Every space has potential. From raw structural volumes to complete living harmony,
              we orchestrate joinery, gypsum ceilings, architectural illumination, artisan plasters,
              and tailored palettes into a unified sensory sanctuary.
            </p>
          </div>

          {/* Bottom Action: EXPLORE Button */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              paddingTop: '1.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Compass size={18} color="var(--accent)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.14em', color: 'rgba(255, 255, 255, 0.7)' }}>
                HOLISTIC SPATIAL TRANSFORMATION PROTOCOL
              </span>
            </div>

            <button
              onClick={() => {
                setHasEntered(true);
                setTimeout(() => {
                  if (roomViewportRef.current) {
                    roomViewportRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }, 100);
              }}
              className="btn-primary"
              data-cursor="EXPLORE"
              style={{
                padding: '1.15rem 2.8rem',
                fontSize: '0.85rem',
                boxShadow: '0 8px 32px var(--accent-glow)'
              }}
            >
              <span>Step Inside The Space</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------------- */}
      {/* SCENE 02 TO 08 — THE COMPLETE INTERIOR TRANSFORMATION JOURNEY  */}
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
          {/* ----------------------------------------------------------- */}
          {/* SCENE 02 — THE STRUCTURE (Architecture & Spatial Elements)  */}
          {/* ----------------------------------------------------------- */}
          <div style={{ maxWidth: '960px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <span className="meta-tag" style={{ marginBottom: '1rem' }}>
              SCENE 02 • THE STRUCTURE
            </span>
            <h2 className="heading-display" style={{ letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              EVERY SPACE <br />
              <span className="heading-editorial-italic">HAS POTENTIAL.</span>
            </h2>
            <ArchitecturalLine label="BLUEPRINT OVERLAY • 4-ZONE SPATIAL GRID" coordinates="CEILINGS • JOINERY • LIGHT • SURFACES" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              A complete interior is defined by structural hierarchy. We evaluate ceiling heights, window daylight ingress,
              electrical conduit alignments, and timber partitions before selecting materials or finishes.
            </p>
          </div>

          {/* Live Complete Room Viewport with Blueprint Spatial Grid */}
          <div
            ref={roomViewportRef}
            onMouseMove={handleMouseMoveOverRoom}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              minHeight: '440px',
              borderRadius: 'var(--radius-xs)',
              overflow: 'hidden',
              boxShadow: currentLighting.shadow,
              border: '1px solid var(--border-medium)',
              marginBottom: '4.5rem',
              backgroundColor: '#161514',
              cursor: 'crosshair',
              transition: 'box-shadow 0.6s ease'
            }}
            data-cursor="GRAZE"
          >
            {/* Layer 0: Complete Room Photography (Walls, ceiling, lighting, wood joinery, furniture) */}
            <img
              src="/images/hero/hero_main.jpg"
              alt="Complete Architectural Living Environment"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: currentLighting.filter,
                transition: 'filter 0.6s ease'
              }}
            />

            {/* Layer 1: Contextual Wall Colour Accent Mask (Only alters vertical focal wall plane!) */}
            <div
              style={{
                position: 'absolute',
                top: '10%',
                left: '2%',
                width: '42%',
                height: '75%',
                backgroundColor: selectedSwatch.hex,
                opacity: 0.38,
                mixBlendMode: 'multiply',
                clipPath: 'polygon(0 0, 100% 5%, 90% 100%, 0 95%)',
                pointerEvents: 'none',
                transition: 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease'
              }}
            />

            {/* Layer 2: Texture & Dynamic Radial Light Simulation */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: `radial-gradient(circle at ${mouseLight.x}% ${mouseLight.y}%, rgba(255, 255, 255, ${selectedTexture.specular * 0.45}) 0%, rgba(0, 0, 0, ${selectedTexture.roughness * 0.35}) 55%, transparent 100%)`,
                mixBlendMode: 'overlay',
                pointerEvents: 'none',
                transition: 'background 0.08s ease-out'
              }}
            />

            {/* Layer 3: Blueprint Spatial Measurement Lines Overlay */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                pointerEvents: 'none',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(3, 1fr)'
              }}
            >
              <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.08)', borderBottom: '1px dashed rgba(255, 255, 255, 0.08)' }} />
              <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.08)', borderBottom: '1px dashed rgba(255, 255, 255, 0.08)' }} />
              <div style={{ borderRight: '1px dashed rgba(255, 255, 255, 0.08)', borderBottom: '1px dashed rgba(255, 255, 255, 0.08)' }} />
              <div style={{ borderBottom: '1px dashed rgba(255, 255, 255, 0.08)' }} />
            </div>

            {/* Live Context HUD */}
            <div
              style={{
                position: 'absolute',
                top: '1.25rem',
                left: '1.25rem',
                backgroundColor: 'rgba(18, 18, 19, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '0.65rem 1.15rem',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#FAF7F2',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                zIndex: 10
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: selectedSwatch.hex }} />
              <span>COLOUR: {selectedSwatch.name.toUpperCase()}</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
              <span>TEXTURE: {selectedTexture.label}</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>|</span>
              <span>LIGHTING: {lightingState}</span>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '1.25rem',
                right: '1.25rem',
                backgroundColor: 'rgba(18, 18, 19, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-xs)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: '#FAF7F2',
                zIndex: 10
              }}
            >
              MOVE CURSOR TO GRAZE VIRTUAL LIGHT ACROSS ROOM TEXTURES
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* SCENE 03 — THE MATERIALS (Major Immersive Material System)  */}
          {/* ----------------------------------------------------------- */}
          <div style={{ marginBottom: '5.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                  SCENE 03 • PHYSICAL MATERIAL LIBRARY
                </span>
                <h3 className="heading-section">
                  THE MATERIALS: <span className="heading-editorial-italic">TACTILE PRESENCE.</span>
                </h3>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                7 TACTILE DISCIPLINES: WOOD • WALLPAPER • TEXTURE • PAINT • CEILING • LIGHT • DECOR
              </p>
            </div>

            {/* Material Category Tabs */}
            <div className="filter-bar" style={{ marginBottom: '2rem' }}>
              <button
                onClick={() => setSelectedMaterialCategory('ALL')}
                className={`filter-pill ${selectedMaterialCategory === 'ALL' ? 'active' : ''}`}
                data-cursor="FILTER"
              >
                ALL MATERIALS ({texturesData.length})
              </button>
              {materialCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedMaterialCategory(cat.id)}
                  className={`filter-pill ${selectedMaterialCategory === cat.id ? 'active' : ''}`}
                  data-cursor="FILTER"
                >
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Materials Grid with Lighting Response */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.75rem'
              }}
            >
              {filteredMaterials.map((mat) => {
                const isSelected = selectedTexture.id === mat.id;
                return (
                  <div
                    key={mat.id}
                    onClick={() => setSelectedTexture(mat)}
                    className="arch-card"
                    style={{
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? 'var(--accent-soft)' : 'var(--surface-card)',
                      transition: 'all 0.3s ease'
                    }}
                    data-cursor="PICK"
                  >
                    <div className="aspect-16-9" style={{ borderRadius: 'var(--radius-xs)', marginBottom: '1.25rem' }}>
                      <img src={mat.realImage} alt={mat.title} className="aspect-fill" onError={(e) => (e.currentTarget.src = mat.highResImage)} />
                      <div
                        style={{
                          position: 'absolute',
                          top: '0.75rem',
                          left: '0.75rem',
                          backgroundColor: 'rgba(18, 18, 19, 0.75)',
                          backdropFilter: 'blur(6px)',
                          padding: '0.25rem 0.6rem',
                          borderRadius: 'var(--radius-xs)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          color: '#FFFFFF'
                        }}
                      >
                        {mat.category}
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span className="meta-tag" style={{ fontSize: '0.65rem' }}>{mat.origin}</span>
                      {isSelected && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 700 }}>ACTIVE IN ROOM</span>}
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '0.4rem' }}>
                      {mat.title}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                      {mat.subtitle}
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-muted)' }}>
                      <span>DEPTH: {mat.reliefDepth}</span>
                      <span style={{ color: 'var(--accent)' }}>SELECT MATERIAL →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* SCENE 04 — THE COLOUR (Connected to Complete Room Context)  */}
          {/* ----------------------------------------------------------- */}
          <div style={{ marginBottom: '5.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                  SCENE 04 • SPATIAL MOOD SETTER
                </span>
                <h3 className="heading-section">
                  COLOUR <span className="heading-editorial-italic">SETS THE MOOD.</span>
                </h3>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                THE WALL TONE EVOLVES WHILE WOODWORK, CEILINGS &amp; FURNITURE REMAIN
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
                    data-cursor="TINT"
                  >
                    <div className="paint-chip-swatch" style={{ backgroundColor: swatch.hex }}>
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
                            justifyContent: 'center'
                          }}
                        >
                          <Check size={12} color="#1C1A18" />
                        </div>
                      )}
                    </div>
                    <div className="paint-chip-label">{swatch.label}</div>
                    <div className="paint-chip-hex">{swatch.hex}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* SCENE 05 — THE LIGHT (Cinematic Atmospheric Control)        */}
          {/* ----------------------------------------------------------- */}
          <div style={{ marginBottom: '5.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                  SCENE 05 • ILLUMINATION ARCHITECTURE
                </span>
                <h3 className="heading-section">
                  LIGHT <span className="heading-editorial-italic">SHAPES THE SPACE.</span>
                </h3>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                TUNABLE LIGHT TEMPERATURE &amp; INDIRECT COVE RELIEF
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {[
                { id: 'SOFT', title: 'SOFT DAYLIGHT', kelvin: '4000K Neutral' },
                { id: 'BALANCED', title: 'BALANCED AFTERNOON', kelvin: '3200K Natural' },
                { id: 'WARM', title: 'WARM COVE TWILIGHT', kelvin: '2700K Ambient' }
              ].map((light) => {
                const isSelected = lightingState === light.id;
                const cfg = lightingConfigs[light.id];
                return (
                  <div
                    key={light.id}
                    onClick={() => setLightingState(light.id)}
                    className="arch-card"
                    style={{
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                      backgroundColor: isSelected ? 'var(--accent-soft)' : 'var(--surface-card)',
                      transition: 'all 0.3s ease'
                    }}
                    data-cursor="LIGHT"
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span className="meta-tag">{light.kelvin}</span>
                      {isSelected && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 700 }}>ACTIVE SCENE</span>}
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '0.5rem' }}>
                      {light.title}
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
                      {cfg.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* SCENE 06 — THE DETAILS (Full Room -> Detail Zoom Depth)      */}
          {/* ----------------------------------------------------------- */}
          <div style={{ marginBottom: '5.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                  SCENE 06 • FINISHING DEPTH
                </span>
                <h3 className="heading-section">
                  THE DETAILS: <span className="heading-editorial-italic">CLOSER INSPECTION.</span>
                </h3>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                ZOOM TRANSITIONS FROM ROOM CONTEXT TO ARTISAN GRAIN
              </p>
            </div>

            <div className="arch-card" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
                {/* Detail Viewport with Zoom Toggle */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '4/3',
                    borderRadius: 'var(--radius-xs)',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-elevated)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setIsZoomedDetail(!isZoomedDetail)}
                  data-cursor={isZoomedDetail ? 'ZOOM OUT' : 'ZOOM IN'}
                >
                  <img
                    src={detailFoci[activeDetailIdx].image}
                    alt={detailFoci[activeDetailIdx].label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: detailFoci[activeDetailIdx].crop,
                      transform: isZoomedDetail ? 'scale(1.35)' : 'scale(1)',
                      transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      backgroundColor: 'rgba(18, 18, 19, 0.8)',
                      backdropFilter: 'blur(8px)',
                      color: '#FFFFFF',
                      padding: '0.4rem 0.8rem',
                      borderRadius: 'var(--radius-xs)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <ZoomIn size={13} />
                    <span>{isZoomedDetail ? 'CLICK TO RESET' : 'CLICK TO MAGNIFY'}</span>
                  </div>
                </div>

                {/* Detail Selector Controls */}
                <div>
                  <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                    {detailFoci[activeDetailIdx].category}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.75rem' }}>
                    {detailFoci[activeDetailIdx].label}
                  </h3>
                  <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                    {detailFoci[activeDetailIdx].desc}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {detailFoci.map((item, idx) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveDetailIdx(idx);
                          setIsZoomedDetail(false);
                        }}
                        className="arch-card"
                        style={{
                          padding: '0.85rem 1.25rem',
                          textAlign: 'left',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          border: activeDetailIdx === idx ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                          backgroundColor: activeDetailIdx === idx ? 'var(--accent-soft)' : 'var(--surface-elevated)'
                        }}
                        data-cursor="INSPECT"
                      >
                        <strong style={{ fontSize: '0.85rem' }}>0{idx + 1} • {item.label}</strong>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)' }}>
                          {activeDetailIdx === idx ? 'INSPECTING' : 'VIEW'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* SCENE 07 — COMPLETE TRANSFORMATION (Progressive Reveal)     */}
          {/* ----------------------------------------------------------- */}
          <div style={{ marginBottom: '5.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem' }}>
              <div>
                <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                  SCENE 07 • HOLISTIC TRANSFORMATION
                </span>
                <h3 className="heading-section">
                  THE COMPLETE <span className="heading-editorial-italic">ENVIRONMENT.</span>
                </h3>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                6 PROGRESSIVE LAYERS: PLASTER $\rightarrow$ CEILINGS $\rightarrow$ WOOD $\rightarrow$ TEXTURE $\rightarrow$ LIGHT $\rightarrow$ DECOR
              </p>
            </div>

            {/* Step Range Slider Controls */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.65rem', marginBottom: '2rem' }}>
              {progressiveTransformationLayers.map((layer) => (
                <button
                  key={layer.step}
                  onClick={() => setTransProgress(layer.step)}
                  className="filter-pill"
                  style={{
                    padding: '0.85rem 0.5rem',
                    textAlign: 'center',
                    fontSize: '0.7rem',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: transProgress >= layer.step ? 'var(--accent)' : 'var(--surface-elevated)',
                    color: transProgress >= layer.step ? '#FFFFFF' : 'var(--ink-primary)',
                    borderColor: transProgress >= layer.step ? 'var(--accent)' : 'var(--border-subtle)'
                  }}
                  data-cursor="PHASE"
                >
                  {layer.label}
                </button>
              ))}
            </div>

            {/* Transformation Visual Canvas */}
            <div
              style={{
                position: 'relative',
                aspectRatio: '16/9',
                minHeight: '400px',
                borderRadius: 'var(--radius-xs)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-dramatic)',
                border: '1px solid var(--border-medium)',
                marginBottom: '1.5rem'
              }}
            >
              {/* Finished Space Base */}
              <img
                src="/images/hero/hero_main.jpg"
                alt="Complete Spatial Finish"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Unfinished Concrete Overlay modulated by transProgress (step 1 = raw, step 6 = fully transformed) */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: 'url("/images/ceilings/false_ceiling.jpg")',
                  backgroundSize: 'cover',
                  opacity: Math.max(0, (6 - transProgress) * 0.18),
                  mixBlendMode: 'luminosity',
                  transition: 'opacity 0.6s ease',
                  pointerEvents: 'none'
                }}
              />

              {/* Transformation Status Banner */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  backgroundColor: 'rgba(18, 18, 19, 0.85)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.75rem 1.25rem',
                  borderRadius: 'var(--radius-xs)',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem'
                }}
              >
                <span>STAGE: {progressiveTransformationLayers[transProgress - 1].title.toUpperCase()}</span>
                <span style={{ display: 'block', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.68rem', marginTop: '2px' }}>
                  {progressiveTransformationLayers[transProgress - 1].desc}
                </span>
              </div>
            </div>
          </div>

          {/* ----------------------------------------------------------- */}
          {/* SCENE 08 — THE FINISHED INTERIOR                            */}
          {/* ----------------------------------------------------------- */}
          <div
            className="arch-card"
            style={{
              padding: 'clamp(2.5rem, 6vw, 4.5rem)',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border-strong)',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <span className="meta-tag" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
              SCENE 08 • THE LIVING HARMONY
            </span>
            <h2 className="heading-display" style={{ lineHeight: 1.05, marginBottom: '1.5rem' }}>
              A COMPLETE ENVIRONMENT, <br />
              <span className="heading-editorial-italic">MADE COMPLETE.</span>
            </h2>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: 'var(--ink-secondary)',
                maxWidth: '700px',
                margin: '0 auto 2.5rem auto',
                lineHeight: 1.6
              }}
            >
              When partitions, false ceilings, custom teak woodwork, architectural light, and artisan textures
              dialogue in concert, an interior ceases to be just walls—it becomes an enduring living experience.
            </p>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/services" className="btn-primary" data-cursor="EXPLORE">
                <span>Explore Interior Systems &amp; Disciplines</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-secondary" data-cursor="CONSULT">
                <span>Book Mr. Abhishek Rao For Spatial Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
