import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  ChevronDown,
  Layers,
  Sparkles,
  RotateCcw,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import {
  ROOM_TYPES,
  WALL_FINISH_TYPES,
  WALL_COLOR_CATEGORIES,
  FLOOR_PRESETS,
  WOOD_FINISHES,
  CEILING_COLORS,
  CEILING_STYLES,
  LIGHTING_PRESETS,
  CONFIGURABLE_SURFACES
} from '../../../data/roomStudioConfig';

export const StudioControlPanel = ({
  roomType,
  setRoomType,
  surfaces,
  selectedSurfaceId,
  setSelectedSurfaceId,
  activeTab,
  setActiveTab,
  lighting,
  isMobilePanelOpen,
  setIsMobilePanelOpen,
  toastMessage,
  handleUpdateWallColor,
  handleUpdateWallFinish,
  handleUpdateFloor,
  handleUpdateCeilingColor,
  handleUpdateCeilingStyle,
  handleUpdateWood,
  handleSelectLighting,
  handleResetSelectedSurface,
  onOpenResetConfirm
}) => {
  const [showAllColors, setShowAllColors] = useState(false);

  const currentSurfaceMeta =
    CONFIGURABLE_SURFACES.find((s) => s.id === selectedSurfaceId) ||
    CONFIGURABLE_SURFACES[0];
  const currentSurfaceState = surfaces[selectedSurfaceId] || {};

  const currentRoom = ROOM_TYPES[roomType] || ROOM_TYPES.LIVING;

  // 5 Main progressive categories
  const categories = [
    {
      id: 'WALLS',
      number: '01',
      title: 'WALLS',
      summary: `${surfaces['wall-feature']?.name || 'Indigo'} & ${surfaces['wall-main']?.name || 'Ivory'}`
    },
    {
      id: 'FLOOR',
      number: '02',
      title: 'FLOOR',
      summary: surfaces['floor-main']?.name || 'Carrara Limestone'
    },
    {
      id: 'CEILING',
      number: '03',
      title: 'CEILING',
      summary: `${surfaces['ceiling-main']?.name || 'Plaster White'} (${surfaces['ceiling-main']?.stylePreset || 'Cove'})`
    },
    {
      id: 'WOOD',
      number: '04',
      title: 'WOOD',
      summary: surfaces['wood-panel']?.name || 'Warm Honey Teak'
    },
    {
      id: 'LIGHTING',
      number: '05',
      title: 'LIGHTING',
      summary: LIGHTING_PRESETS[lighting]?.name || 'Balanced'
    }
  ];

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 3D ACTIVE SELECTION CHIP (Bottom Left of 3D Viewport)          */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`studio-selection-chip ${isMobilePanelOpen ? 'mobile-hidden' : ''}`}
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '1.25rem',
          zIndex: 15,
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(23, 21, 29, 0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(227, 217, 164, 0.3)',
            borderRadius: '10px',
            padding: '0.65rem 1rem',
            maxWidth: '360px',
            pointerEvents: 'auto',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.55)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                backgroundColor: currentSurfaceState?.color || '#3C2D8C',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                display: 'inline-block'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.66rem',
                letterSpacing: '0.14em',
                color: '#E3D9A4',
                fontWeight: 700
              }}
            >
              SELECTED: {currentSurfaceMeta.name.toUpperCase()}
            </span>
          </div>

          <p
            style={{
              fontSize: '0.8rem',
              color: '#FAF8F2',
              margin: '0 0 2px 0',
              fontWeight: 500
            }}
          >
            {currentSurfaceState?.name || 'Default Finish'} • {currentSurfaceState?.color?.toUpperCase() || ''}
          </p>
          <span style={{ fontSize: '0.65rem', color: '#B9B4C5', display: 'block' }}>
            Click any surface in the 3D room to select and customise it.
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RIGHT DESIGN INSPECTOR PANEL (~30% Desktop Width)             */}
      {/* ------------------------------------------------------------- */}
      <aside
        className={`studio-design-inspector ${!isMobilePanelOpen ? 'mobile-collapsed' : ''}`}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#17151D',
          borderLeft: '1px solid rgba(227, 217, 164, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 25,
          position: 'relative'
        }}
      >
        {/* Mobile Accordion Header (<1024px) */}
        <div
          className="mobile-panel-header"
          onClick={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
          style={{
            display: 'none',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 1.25rem',
            backgroundColor: 'rgba(33, 29, 45, 0.98)',
            borderBottom: '1px solid rgba(227, 217, 164, 0.25)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E3D9A4' }} />
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.75rem', color: '#FAF8F2', fontWeight: 700 }}>
              {isMobilePanelOpen ? 'CLOSE DESIGN INSPECTOR' : 'TAP TO CUSTOMISE SPACE'}
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.7rem', color: '#E3D9A4', fontWeight: 600 }}>
            {isMobilePanelOpen ? 'MINIMISE ▾' : 'EXPAND ▴'}
          </span>
        </div>

        {/* Panel Header: YOUR SPACE & Room Switcher */}
        <div
          style={{
            padding: '1.25rem 1.4rem 1rem 1.4rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(33, 29, 45, 0.6)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                color: '#E3D9A4',
                fontWeight: 700
              }}
            >
              YOUR SPACE
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.65rem',
                color: '#B9B4C5'
              }}
            >
              {currentRoom.name}
            </span>
          </div>

          {/* Room Selection Switcher (LIVING ROOM, BEDROOM) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px',
              backgroundColor: 'rgba(23, 21, 29, 0.8)',
              padding: '3px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {Object.values(ROOM_TYPES).map((r) => {
              const isSelected = roomType === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRoomType(r.id)}
                  style={{
                    backgroundColor: isSelected ? 'var(--brand-indigo, #3C2D8C)' : 'transparent',
                    color: isSelected ? '#FFFFFF' : 'rgba(250, 248, 242, 0.7)',
                    border: isSelected ? '1px solid #E3D9A4' : '1px solid transparent',
                    borderRadius: '6px',
                    padding: '6px 8px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.66rem',
                    letterSpacing: '0.08em',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                >
                  {r.badge || r.name.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Categories Accordion */}
        <div
          className="studio-inspector-body"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1rem 1.4rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {categories.map((cat) => {
              const isOpen = activeTab === cat.id;

              return (
                <div
                  key={cat.id}
                  style={{
                    backgroundColor: isOpen ? 'rgba(33, 29, 45, 0.9)' : 'rgba(33, 29, 45, 0.45)',
                    border: isOpen ? '1px solid rgba(227, 217, 164, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    transition: 'border 0.2s ease'
                  }}
                >
                  {/* Category Header Row (Click to toggle / expand) */}
                  <button
                    onClick={() => setActiveTab(isOpen ? '' : cat.id)}
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '0.68rem',
                          color: isOpen ? '#E3D9A4' : 'rgba(227, 217, 164, 0.6)',
                          fontWeight: 700
                        }}
                      >
                        {cat.number}
                      </span>
                      <div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '0.78rem',
                            letterSpacing: '0.1em',
                            color: isOpen ? '#FAF8F2' : 'rgba(250, 248, 242, 0.85)',
                            fontWeight: 700,
                            display: 'block'
                          }}
                        >
                          {cat.title}
                        </span>
                        {!isOpen && (
                          <span style={{ fontSize: '0.68rem', color: '#B9B4C5' }}>
                            {cat.summary}
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronDown
                      size={15}
                      color={isOpen ? '#E3D9A4' : '#B9B4C5'}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.25s ease'
                      }}
                    />
                  </button>

                  {/* Expanded Content for Active Category */}
                  {isOpen && (
                    <div
                      style={{
                        padding: '0.5rem 1rem 1.1rem 1rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      {/* ========================================================= */}
                      {/* STEP 1: WALLS CONFIGURATION                               */}
                      {/* ========================================================= */}
                      {cat.id === 'WALLS' && (
                        <div>
                          {/* 1A: Select Wall */}
                          <div style={{ marginBottom: '1rem' }}>
                            <span
                              style={{
                                fontFamily: 'var(--font-mono, monospace)',
                                fontSize: '0.64rem',
                                letterSpacing: '0.12em',
                                color: '#E3D9A4',
                                display: 'block',
                                marginBottom: '0.45rem',
                                fontWeight: 700
                              }}
                            >
                              CHOOSE WALL
                            </span>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                              {[
                                { id: 'wall-feature', label: 'Feature Wall' },
                                { id: 'wall-main', label: 'Main Wall' },
                                { id: 'wall-left', label: 'Left Wall' },
                                { id: 'wall-right', label: 'Right Wall' }
                              ].map((w) => {
                                const isTarget = selectedSurfaceId === w.id;
                                return (
                                  <button
                                    key={w.id}
                                    onClick={() => setSelectedSurfaceId(w.id)}
                                    style={{
                                      padding: '0.55rem 0.65rem',
                                      borderRadius: '6px',
                                      border: isTarget ? '1px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                                      backgroundColor: isTarget ? 'var(--brand-indigo, #3C2D8C)' : 'rgba(23, 21, 29, 0.7)',
                                      color: '#FFFFFF',
                                      fontFamily: 'var(--font-mono, monospace)',
                                      fontSize: '0.68rem',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      textAlign: 'left'
                                    }}
                                  >
                                    <span>{w.label}</span>
                                    <span
                                      style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        backgroundColor: surfaces[w.id]?.color || '#FAF8F2',
                                        border: '1px solid rgba(255,255,255,0.4)'
                                      }}
                                    />
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* 1B: Choose Wall Finish */}
                          <div style={{ marginBottom: '1rem' }}>
                            <span
                              style={{
                                fontFamily: 'var(--font-mono, monospace)',
                                fontSize: '0.64rem',
                                letterSpacing: '0.12em',
                                color: '#E3D9A4',
                                display: 'block',
                                marginBottom: '0.45rem',
                                fontWeight: 700
                              }}
                            >
                              FINISH / TEXTURE
                            </span>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                              {Object.values(WALL_FINISH_TYPES).map((f) => {
                                const isSelected = (currentSurfaceState?.finishType || 'paint') === f.id;
                                return (
                                  <button
                                    key={f.id}
                                    onClick={() => handleUpdateWallFinish(f.id)}
                                    style={{
                                      padding: '0.5rem',
                                      borderRadius: '6px',
                                      border: isSelected ? '1px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                                      backgroundColor: isSelected ? 'rgba(60, 45, 140, 0.45)' : 'rgba(23, 21, 29, 0.6)',
                                      color: isSelected ? '#E3D9A4' : '#FAF8F2',
                                      fontFamily: 'var(--font-mono, monospace)',
                                      fontSize: '0.64rem',
                                      cursor: 'pointer',
                                      textAlign: 'center'
                                    }}
                                  >
                                    {f.name}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* 1C: Wall Colour Selection (Curated + View All) */}
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                              <span
                                style={{
                                  fontFamily: 'var(--font-mono, monospace)',
                                  fontSize: '0.64rem',
                                  letterSpacing: '0.12em',
                                  color: '#E3D9A4',
                                  fontWeight: 700
                                }}
                              >
                                COLOUR PALETTE
                              </span>

                              <button
                                onClick={() => setShowAllColors(!showAllColors)}
                                style={{
                                  background: 'transparent',
                                  border: 'none',
                                  color: '#E3D9A4',
                                  fontFamily: 'var(--font-mono, monospace)',
                                  fontSize: '0.62rem',
                                  cursor: 'pointer',
                                  textDecoration: 'underline'
                                }}
                              >
                                {showAllColors ? 'SHOW CURATED' : 'VIEW ALL COLOURS'}
                              </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                              {Object.values(WALL_COLOR_CATEGORIES).map((group) => {
                                const list = showAllColors
                                  ? group.colors
                                  : group.colors.filter((c) => c.isCurated);

                                return (
                                  <div key={group.id}>
                                    <span
                                      style={{
                                        fontSize: '0.62rem',
                                        color: '#B9B4C5',
                                        fontFamily: 'var(--font-mono, monospace)',
                                        letterSpacing: '0.08em',
                                        display: 'block',
                                        marginBottom: '3px'
                                      }}
                                    >
                                      {group.label.toUpperCase()}
                                    </span>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5px' }}>
                                      {list.map((c) => {
                                        const isSelected =
                                          currentSurfaceState?.color?.toLowerCase() === c.hex.toLowerCase();
                                        return (
                                          <button
                                            key={c.id}
                                            onClick={() => handleUpdateWallColor(c.id)}
                                            style={{
                                              backgroundColor: isSelected ? 'rgba(60, 45, 140, 0.4)' : 'rgba(23, 21, 29, 0.7)',
                                              border: isSelected ? '1.5px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                                              borderRadius: '6px',
                                              padding: '5px 7px',
                                              cursor: 'pointer',
                                              display: 'flex',
                                              alignItems: 'center',
                                              gap: '7px',
                                              textAlign: 'left'
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: '18px',
                                                height: '18px',
                                                borderRadius: '50%',
                                                backgroundColor: c.hex,
                                                border: '1px solid rgba(255,255,255,0.25)',
                                                flexShrink: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                              }}
                                            >
                                              {isSelected && <Check size={10} color={c.id === 'ivory' ? '#211D2D' : '#FFFFFF'} />}
                                            </div>
                                            <div style={{ overflow: 'hidden' }}>
                                              <span
                                                style={{
                                                  fontFamily: 'var(--font-mono, monospace)',
                                                  fontSize: '0.65rem',
                                                  color: isSelected ? '#E3D9A4' : '#FAF8F2',
                                                  fontWeight: isSelected ? 700 : 500,
                                                  display: 'block',
                                                  whiteSpace: 'nowrap',
                                                  textOverflow: 'ellipsis',
                                                  overflow: 'hidden'
                                                }}
                                              >
                                                {c.name}
                                              </span>
                                              <span style={{ fontSize: '0.58rem', color: '#B9B4C5', display: 'block' }}>
                                                {c.hex}
                                              </span>
                                            </div>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ========================================================= */}
                      {/* STEP 2: FLOOR CONFIGURATION                               */}
                      {/* ========================================================= */}
                      {cat.id === 'FLOOR' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                          {Object.values(FLOOR_PRESETS).map((f) => {
                            const isSelected = surfaces['floor-main']?.preset === f.id;
                            return (
                              <button
                                key={f.id}
                                onClick={() => handleUpdateFloor(f.id)}
                                style={{
                                  backgroundColor: isSelected ? 'rgba(60, 45, 140, 0.4)' : 'rgba(23, 21, 29, 0.7)',
                                  border: isSelected ? '1px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                                  borderRadius: '8px',
                                  padding: '0.65rem 0.75rem',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.75rem',
                                  textAlign: 'left'
                                }}
                              >
                                <div
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '6px',
                                    backgroundColor: f.color,
                                    border: '1px solid rgba(255, 255, 255, 0.25)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                  }}
                                >
                                  {isSelected && <Check size={14} color="#FFFFFF" />}
                                </div>
                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontFamily: 'var(--font-display, serif)', fontSize: '0.9rem', color: isSelected ? '#E3D9A4' : '#FAF8F2', fontWeight: 600 }}>
                                      {f.name}
                                    </span>
                                  </div>
                                  <span style={{ fontSize: '0.65rem', color: '#B9B4C5', display: 'block' }}>
                                    {f.description}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* ========================================================= */}
                      {/* STEP 3: CEILING CONFIGURATION                             */}
                      {/* ========================================================= */}
                      {cat.id === 'CEILING' && (
                        <div>
                          {/* Ceiling Style */}
                          <div style={{ marginBottom: '0.85rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.64rem', color: '#E3D9A4', display: 'block', marginBottom: '0.45rem', fontWeight: 700 }}>
                              CEILING ARCHITECTURAL SYSTEM
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                              {Object.values(CEILING_STYLES).map((s) => {
                                const isSelected = (surfaces['ceiling-main']?.stylePreset || 'LAYERED') === s.id;
                                return (
                                  <button
                                    key={s.id}
                                    onClick={() => handleUpdateCeilingStyle(s.id)}
                                    style={{
                                      backgroundColor: isSelected ? 'rgba(60, 45, 140, 0.4)' : 'rgba(23, 21, 29, 0.6)',
                                      border: isSelected ? '1px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                                      borderRadius: '6px',
                                      padding: '0.55rem 0.75rem',
                                      cursor: 'pointer',
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      textAlign: 'left'
                                    }}
                                  >
                                    <div>
                                      <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.7rem', color: isSelected ? '#E3D9A4' : '#FAF8F2', fontWeight: 600, display: 'block' }}>
                                        {s.name}
                                      </span>
                                      <span style={{ fontSize: '0.62rem', color: '#B9B4C5' }}>{s.description}</span>
                                    </div>
                                    {isSelected && <Check size={14} color="#E3D9A4" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Ceiling Plaster Finish */}
                          <div>
                            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.64rem', color: '#E3D9A4', display: 'block', marginBottom: '0.45rem', fontWeight: 700 }}>
                              PLASTER COAT
                            </span>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
                              {Object.values(CEILING_COLORS).map((c) => {
                                const isSelected = surfaces['ceiling-main']?.colorKey === c.id;
                                return (
                                  <button
                                    key={c.id}
                                    onClick={() => handleUpdateCeilingColor(c.id)}
                                    style={{
                                      backgroundColor: isSelected ? 'rgba(60, 45, 140, 0.45)' : 'rgba(23, 21, 29, 0.7)',
                                      border: isSelected ? '1.5px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                                      borderRadius: '6px',
                                      padding: '0.5rem 0.4rem',
                                      cursor: 'pointer',
                                      textAlign: 'center'
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        backgroundColor: c.hex,
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        margin: '0 auto 4px auto'
                                      }}
                                    />
                                    <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.6rem', color: isSelected ? '#E3D9A4' : '#FAF8F2', display: 'block' }}>
                                      {c.name.split(' ')[0]}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ========================================================= */}
                      {/* STEP 4: WOOD CONFIGURATION                                */}
                      {/* ========================================================= */}
                      {cat.id === 'WOOD' && (
                        <div>
                          {/* Target Wood Object */}
                          <div style={{ marginBottom: '0.85rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.64rem', color: '#E3D9A4', display: 'block', marginBottom: '0.45rem', fontWeight: 700 }}>
                              CHOOSE TIMBER ELEMENT
                            </span>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
                              {[
                                { id: 'wood-panel', label: 'Fluted Slat Wall' },
                                { id: 'cabinet-main', label: 'Living Credenza' }
                              ].map((w) => {
                                const isTarget = selectedSurfaceId === w.id;
                                return (
                                  <button
                                    key={w.id}
                                    onClick={() => setSelectedSurfaceId(w.id)}
                                    style={{
                                      padding: '0.55rem',
                                      borderRadius: '6px',
                                      border: isTarget ? '1px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                                      backgroundColor: isTarget ? 'var(--brand-indigo, #3C2D8C)' : 'rgba(23, 21, 29, 0.6)',
                                      color: '#FFFFFF',
                                      fontFamily: 'var(--font-mono, monospace)',
                                      fontSize: '0.68rem',
                                      cursor: 'pointer',
                                      textAlign: 'center'
                                    }}
                                  >
                                    {w.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Finishes */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            {Object.values(WOOD_FINISHES).map((w) => {
                              const isSelected = surfaces[selectedSurfaceId]?.preset === w.id;
                              return (
                                <button
                                  key={w.id}
                                  onClick={() => handleUpdateWood(w.id)}
                                  style={{
                                    backgroundColor: isSelected ? 'rgba(60, 45, 140, 0.4)' : 'rgba(23, 21, 29, 0.7)',
                                    border: isSelected ? '1px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '6px',
                                    padding: '0.6rem 0.75rem',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    textAlign: 'left'
                                  }}
                                >
                                  <div
                                    style={{
                                      width: '28px',
                                      height: '28px',
                                      borderRadius: '4px',
                                      backgroundColor: w.color,
                                      border: '1px solid rgba(255, 255, 255, 0.25)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      flexShrink: 0
                                    }}
                                  >
                                    {isSelected && <Check size={14} color="#FFFFFF" />}
                                  </div>
                                  <div style={{ flex: 1 }}>
                                    <span style={{ fontFamily: 'var(--font-display, serif)', fontSize: '0.9rem', color: isSelected ? '#E3D9A4' : '#FAF8F2', fontWeight: 600, display: 'block' }}>
                                      {w.name}
                                    </span>
                                    <span style={{ fontSize: '0.62rem', color: '#B9B4C5' }}>{w.service}</span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* ========================================================= */}
                      {/* STEP 5: LIGHTING ATMOSPHERES                              */}
                      {/* ========================================================= */}
                      {cat.id === 'LIGHTING' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {Object.values(LIGHTING_PRESETS).map((l) => {
                            const isSelected = lighting === l.id;
                            return (
                              <button
                                key={l.id}
                                onClick={() => handleSelectLighting(l.id)}
                                style={{
                                  backgroundColor: isSelected ? 'rgba(60, 45, 140, 0.4)' : 'rgba(23, 21, 29, 0.7)',
                                  border: isSelected ? '1px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                                  borderRadius: '8px',
                                  padding: '0.75rem',
                                  cursor: 'pointer',
                                  textAlign: 'left'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                                  <span style={{ fontFamily: 'var(--font-display, serif)', fontSize: '0.95rem', color: isSelected ? '#E3D9A4' : '#FAF8F2', fontWeight: 600 }}>
                                    {l.name}
                                  </span>
                                  <span
                                    style={{
                                      fontFamily: 'var(--font-mono, monospace)',
                                      fontSize: '0.62rem',
                                      color: '#E3D9A4',
                                      border: '1px solid rgba(227, 217, 164, 0.3)',
                                      padding: '1px 5px',
                                      borderRadius: '4px'
                                    }}
                                  >
                                    {l.temp}
                                  </span>
                                </div>
                                <p style={{ fontSize: '0.68rem', color: '#B9B4C5', margin: 0, lineHeight: 1.4 }}>
                                  {l.description}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* ------------------------------------------------------------- */}
            {/* DESIGN SUMMARY CARD: YOUR DESIGN                              */}
            {/* ------------------------------------------------------------- */}
            <div
              style={{
                backgroundColor: 'rgba(33, 29, 45, 0.6)',
                border: '1px solid rgba(227, 217, 164, 0.25)',
                borderRadius: '10px',
                padding: '1rem',
                marginTop: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.66rem',
                    letterSpacing: '0.14em',
                    color: '#E3D9A4',
                    fontWeight: 700
                  }}
                >
                  YOUR DESIGN
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.72rem', color: '#FAF8F2' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#B9B4C5' }}>Space:</span>
                  <span style={{ fontWeight: 600 }}>{currentRoom.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#B9B4C5' }}>Feature Wall:</span>
                  <span style={{ fontWeight: 600 }}>{surfaces['wall-feature']?.name || 'Deep Indigo'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#B9B4C5' }}>Main Wall:</span>
                  <span style={{ fontWeight: 600 }}>{surfaces['wall-main']?.name || 'Warm Ivory'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#B9B4C5' }}>Floor:</span>
                  <span style={{ fontWeight: 600 }}>{surfaces['floor-main']?.name || 'Carrara Limestone'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#B9B4C5' }}>Ceiling:</span>
                  <span style={{ fontWeight: 600 }}>{surfaces['ceiling-main']?.name || 'Plaster White'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#B9B4C5' }}>Wood:</span>
                  <span style={{ fontWeight: 600 }}>{surfaces['wood-panel']?.name || 'Warm Honey Teak'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#B9B4C5' }}>Lighting:</span>
                  <span style={{ fontWeight: 600 }}>{LIGHTING_PRESETS[lighting]?.name || 'Balanced'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Footer Actions: RESET STUDIO */}
        <div
          style={{
            padding: '1rem 1.4rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            backgroundColor: 'rgba(23, 21, 29, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.6rem'
          }}
        >
          <button
            onClick={onOpenResetConfirm}
            style={{
              width: '100%',
              backgroundColor: 'rgba(33, 29, 45, 0.9)',
              color: '#FAF8F2',
              border: '1px solid rgba(227, 217, 164, 0.4)',
              borderRadius: '8px',
              padding: '0.85rem 1rem',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.74rem',
              letterSpacing: '0.12em',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.55rem',
              transition: 'background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(60, 45, 140, 0.4)';
              e.currentTarget.style.borderColor = '#E3D9A4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(33, 29, 45, 0.9)';
              e.currentTarget.style.borderColor = 'rgba(227, 217, 164, 0.4)';
            }}
            aria-label="Reset room design to default settings"
          >
            <RotateCcw size={14} color="#E3D9A4" />
            <span>RESET STUDIO</span>
          </button>
        </div>
      </aside>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              right: '1.5rem',
              zIndex: 1000,
              backgroundColor: 'rgba(33, 29, 45, 0.95)',
              border: '1px solid #E3D9A4',
              color: '#FAF8F2',
              padding: '9px 16px',
              borderRadius: '8px',
              backdropFilter: 'blur(12px)',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.74rem',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              pointerEvents: 'none'
            }}
          >
            <Sparkles size={13} color="#E3D9A4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default StudioControlPanel;
