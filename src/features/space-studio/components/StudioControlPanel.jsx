import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCircle2, Download, Sparkles } from 'lucide-react';
import {
  WALL_COLORS,
  FLOOR_PRESETS,
  WOOD_FINISHES,
  CEILING_COLORS,
  CEILING_STYLES,
  LIGHTING_PRESETS,
  CONFIGURABLE_SURFACES
} from '../../../data/roomStudioConfig';

export const StudioControlPanel = ({
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
  handleUpdateFloor,
  handleUpdateCeilingColor,
  handleUpdateCeilingStyle,
  handleUpdateWood,
  handleSelectLighting,
  handleResetSelectedSurface,
  handleResetEntireRoom,
  handleDownloadSummary
}) => {
  const currentSurfaceMeta =
    CONFIGURABLE_SURFACES.find((s) => s.id === selectedSurfaceId) ||
    CONFIGURABLE_SURFACES[0];
  const currentSurfaceState = surfaces[selectedSurfaceId] || {};

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 3D HINT & ACTIVE SELECTION CHIP (Bottom Left)                  */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`studio-selection-chip ${isMobilePanelOpen ? 'mobile-hidden' : ''}`}
        style={{
          position: 'absolute',
          bottom: 'clamp(1rem, 3vw, 2.5rem)',
          left: 'clamp(1rem, 3vw, 2.5rem)',
          zIndex: 15,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem'
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(23, 21, 29, 0.88)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(227, 217, 164, 0.3)',
            borderRadius: '10px',
            padding: '0.65rem 1rem',
            maxWidth: '380px',
            pointerEvents: 'auto',
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '4px' }}>
            <span
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '2px',
                backgroundColor: currentSurfaceState?.color || '#3C2D8C',
                border: '1px solid rgba(255,255,255,0.4)',
                display: 'inline-block'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.68rem',
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
              fontSize: '0.82rem',
              color: '#FAF8F2',
              margin: '0 0 4px 0',
              fontWeight: 500
            }}
          >
            {currentSurfaceState?.name || 'Default Finish'} • {currentSurfaceState?.color?.toUpperCase() || ''}
          </p>
          <span style={{ fontSize: '0.68rem', color: '#B9B4C5', display: 'block', marginBottom: '4px' }}>
            Tip: Click any wall, floor, or timber object in the 3D room to customise it directly.
          </span>
          <span style={{ fontSize: '0.62rem', color: 'rgba(227, 217, 164, 0.75)', display: 'block', fontStyle: 'italic' }}>
            *Conceptual 3D simulation. Actual applied finishes and tints are confirmed with physical swatches on-site.
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FLOATING CUSTOMISATION PANEL (Right or Bottom Floating Dock)   */}
      {/* ------------------------------------------------------------- */}
      <aside
        className={`studio-floating-panel ${!isMobilePanelOpen ? 'mobile-collapsed' : ''}`}
        style={{
          position: 'absolute',
          top: 'calc(76px + 0.85rem)',
          right: 'clamp(1rem, 2.5vw, 2.5rem)',
          width: 'clamp(320px, 28vw, 420px)',
          maxHeight: 'calc(100vh - 116px)',
          zIndex: 25,
          backgroundColor: 'rgba(23, 21, 29, 0.94)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(227, 217, 164, 0.22)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          pointerEvents: 'auto'
        }}
      >
        {/* Mobile Accordion Bar (Visible only on <768px screens) */}
        <div
          className="mobile-panel-header"
          onClick={() => setIsMobilePanelOpen(!isMobilePanelOpen)}
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.7rem 1.1rem',
            background: 'rgba(33, 29, 45, 0.95)',
            borderBottom: '1px solid rgba(227, 217, 164, 0.2)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#E3D9A4' }} />
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.72rem', color: '#FAF8F2', fontWeight: 600 }}>
              {isMobilePanelOpen ? 'FINISHES & SPECIFICATIONS' : 'TAP TO CUSTOMISE FINISHES'}
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.7rem', color: '#E3D9A4', fontWeight: 600 }}>
            {isMobilePanelOpen ? 'MINIMISE ▾' : 'EXPAND ▴'}
          </span>
        </div>

        {/* Panel Tabs Header: WALLS, FLOOR, CEILING, WOOD, LIGHTING */}
        <div
          className="studio-panel-tabs"
          style={{
            display: 'flex',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(33, 29, 45, 0.7)'
          }}
        >
          {[
            { id: 'WALLS', label: 'WALLS' },
            { id: 'FLOOR', label: 'FLOOR' },
            { id: 'CEILING', label: 'CEILING' },
            { id: 'WOOD', label: 'WOOD' },
            { id: 'LIGHTING', label: 'LIGHTING' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '0.75rem 0.2rem',
                  background: isActive ? 'rgba(60, 45, 140, 0.35)' : 'transparent',
                  color: isActive ? '#E3D9A4' : 'rgba(250, 248, 242, 0.65)',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #E3D9A4' : '2px solid transparent',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Panel Scrollable Body */}
        <div
          className="studio-panel-body"
          style={{
            padding: '1.25rem',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 230px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}
        >
          {/* ========================================================= */}
          {/* TAB 1: WALLS                                              */}
          {/* ========================================================= */}
          {activeTab === 'WALLS' && (
            <div>
              {/* Selectable Walls Quick Switcher */}
              <div style={{ marginBottom: '1.2rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.66rem',
                    letterSpacing: '0.14em',
                    color: '#E3D9A4',
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 700
                  }}
                >
                  1. SELECT TARGET WALL
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
                  {[
                    { id: 'wall-feature', label: 'Feature Wall' },
                    { id: 'wall-main', label: 'Main Back Wall' },
                    { id: 'wall-left', label: 'Window Wall' },
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
                          backgroundColor: isTarget ? 'var(--brand-indigo, #3C2D8C)' : 'rgba(33, 29, 45, 0.6)',
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

              {/* Specific Palettes: Warm Ivory, Soft Sand, Muted Sage, Clay, Deep Indigo, Charcoal */}
              <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.66rem',
                      letterSpacing: '0.14em',
                      color: '#E3D9A4',
                      fontWeight: 700
                    }}
                  >
                    2. CHOOSE WALL COLOUR & FINISH
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.65rem', color: '#B9B4C5' }}>
                    {currentSurfaceState?.color?.toUpperCase()}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.55rem' }}>
                  {Object.values(WALL_COLORS).map((c) => {
                    const isSelected = currentSurfaceState?.color?.toLowerCase() === c.hex.toLowerCase();
                    return (
                      <button
                        key={c.id}
                        onClick={() => handleUpdateWallColor(c.id)}
                        style={{
                          backgroundColor: 'rgba(33, 29, 45, 0.7)',
                          border: isSelected ? '2px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '0.55rem 0.45rem',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.35rem',
                          textAlign: 'center',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: c.hex,
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {isSelected && <Check size={14} color={c.id === 'ivory' ? '#211D2D' : '#FFFFFF'} />}
                        </div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '0.62rem',
                            color: isSelected ? '#E3D9A4' : '#FAF8F2',
                            fontWeight: isSelected ? 700 : 500
                          }}
                        >
                          {c.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Colour Picker */}
              <div
                style={{
                  backgroundColor: 'rgba(33, 29, 45, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.68rem',
                      color: '#FAF8F2',
                      display: 'block',
                      fontWeight: 600
                    }}
                  >
                    Custom Colour Picker
                  </span>
                  <span style={{ fontSize: '0.65rem', color: '#B9B4C5' }}>
                    Select any custom hex tone
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="color"
                    value={currentSurfaceState?.color || '#FAF8F2'}
                    onChange={(e) => handleUpdateWallColor('custom', e.target.value)}
                    aria-label="Select custom color"
                    style={{
                      width: '36px',
                      height: '32px',
                      padding: 0,
                      borderRadius: '4px',
                      border: '1px solid #E3D9A4',
                      cursor: 'pointer',
                      backgroundColor: 'transparent'
                    }}
                  />
                  <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.7rem', color: '#E3D9A4' }}>
                    {currentSurfaceState?.color?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: FLOOR                                              */}
          {/* ========================================================= */}
          {activeTab === 'FLOOR' && (
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.66rem',
                  letterSpacing: '0.14em',
                  color: '#E3D9A4',
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontWeight: 700
                }}
              >
                SELECT FLOORING SPECIFICATION
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {Object.values(FLOOR_PRESETS).map((f) => {
                  const isSelected = surfaces['floor-main']?.preset === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => handleUpdateFloor(f.id)}
                      style={{
                        backgroundColor: isSelected ? 'rgba(60, 45, 140, 0.4)' : 'rgba(33, 29, 45, 0.7)',
                        border: isSelected ? '1px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '6px',
                          backgroundColor: f.color,
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {isSelected && <Check size={16} color="#FFFFFF" />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-display, serif)',
                              fontSize: '0.95rem',
                              color: isSelected ? '#E3D9A4' : '#FAF8F2',
                              fontWeight: 600
                            }}
                          >
                            {f.name}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono, monospace)',
                              fontSize: '0.62rem',
                              color: '#B9B4C5',
                              textTransform: 'uppercase'
                            }}
                          >
                            {f.materialType}
                          </span>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: '#B9B4C5', display: 'block', marginTop: '2px' }}>
                          {f.service}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: CEILING                                            */}
          {/* ========================================================= */}
          {activeTab === 'CEILING' && (
            <div>
              {/* Ceiling Architectural Variant */}
              <div style={{ marginBottom: '1.25rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.66rem',
                    letterSpacing: '0.14em',
                    color: '#E3D9A4',
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 700
                  }}
                >
                  1. CEILING ARCHITECTURAL SYSTEM
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                  {Object.values(CEILING_STYLES).map((s) => {
                    const isSelected = (surfaces['ceiling-main']?.stylePreset || 'LAYERED') === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => handleUpdateCeilingStyle(s.id)}
                        style={{
                          backgroundColor: isSelected ? 'rgba(60, 45, 140, 0.4)' : 'rgba(33, 29, 45, 0.6)',
                          border: isSelected ? '1px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '0.65rem 0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textAlign: 'left'
                        }}
                      >
                        <div>
                          <span
                            style={{
                              fontFamily: 'var(--font-mono, monospace)',
                              fontSize: '0.74rem',
                              color: isSelected ? '#E3D9A4' : '#FAF8F2',
                              fontWeight: 600,
                              display: 'block'
                            }}
                          >
                            {s.name}
                          </span>
                          <span style={{ fontSize: '0.68rem', color: '#B9B4C5' }}>
                            {s.description}
                          </span>
                        </div>
                        {isSelected && <CheckCircle2 size={16} color="#E3D9A4" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Ceiling Plaster Colour */}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.66rem',
                    letterSpacing: '0.14em',
                    color: '#E3D9A4',
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 700
                  }}
                >
                  2. CEILING PLASTER FINISH
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.55rem' }}>
                  {Object.values(CEILING_COLORS).map((c) => {
                    const isSelected = surfaces['ceiling-main']?.colorKey === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => handleUpdateCeilingColor(c.id)}
                        style={{
                          backgroundColor: 'rgba(33, 29, 45, 0.7)',
                          border: isSelected ? '2px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '0.6rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          textAlign: 'left'
                        }}
                      >
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            backgroundColor: c.hex,
                            border: '1px solid rgba(255, 255, 255, 0.3)'
                          }}
                        />
                        <span
                          style={{
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '0.65rem',
                            color: isSelected ? '#E3D9A4' : '#FAF8F2'
                          }}
                        >
                          {c.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: WOOD                                               */}
          {/* ========================================================= */}
          {activeTab === 'WOOD' && (
            <div>
              {/* Target Wood Object Selector */}
              <div style={{ marginBottom: '1.2rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.66rem',
                    letterSpacing: '0.14em',
                    color: '#E3D9A4',
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 700
                  }}
                >
                  1. SELECT TIMBER ELEMENT
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.45rem' }}>
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
                          padding: '0.6rem 0.75rem',
                          borderRadius: '6px',
                          border: isTarget ? '1px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                          backgroundColor: isTarget ? 'var(--brand-indigo, #3C2D8C)' : 'rgba(33, 29, 45, 0.6)',
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

              {/* Wood Finishes */}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.66rem',
                    letterSpacing: '0.14em',
                    color: '#E3D9A4',
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontWeight: 700
                  }}
                >
                  2. WOOD POLISH & COAT SPECIFICATION
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {Object.values(WOOD_FINISHES).map((w) => {
                    const isSelected = surfaces[selectedSurfaceId]?.preset === w.id;
                    return (
                      <button
                        key={w.id}
                        onClick={() => handleUpdateWood(w.id)}
                        style={{
                          backgroundColor: isSelected ? 'rgba(60, 45, 140, 0.4)' : 'rgba(33, 29, 45, 0.7)',
                          border: isSelected ? '1px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          padding: '0.75rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          textAlign: 'left'
                        }}
                      >
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '6px',
                            backgroundColor: w.color,
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {isSelected && <Check size={16} color="#FFFFFF" />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-display, serif)',
                              fontSize: '0.95rem',
                              color: isSelected ? '#E3D9A4' : '#FAF8F2',
                              fontWeight: 600,
                              display: 'block'
                            }}
                          >
                            {w.name}
                          </span>
                          <span style={{ fontSize: '0.68rem', color: '#B9B4C5' }}>
                            {w.service}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: LIGHTING                                           */}
          {/* ========================================================= */}
          {activeTab === 'LIGHTING' && (
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.66rem',
                  letterSpacing: '0.14em',
                  color: '#E3D9A4',
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontWeight: 700
                }}
              >
                ROOM LIGHTING ATMOSPHERES
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Object.values(LIGHTING_PRESETS).map((l) => {
                  const isSelected = lighting === l.id;
                  return (
                    <button
                      key={l.id}
                      onClick={() => handleSelectLighting(l.id)}
                      style={{
                        backgroundColor: isSelected ? 'rgba(60, 45, 140, 0.4)' : 'rgba(33, 29, 45, 0.7)',
                        border: isSelected ? '1px solid #E3D9A4' : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        padding: '0.9rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-display, serif)',
                            fontSize: '1.05rem',
                            color: isSelected ? '#E3D9A4' : '#FAF8F2',
                            fontWeight: 600
                          }}
                        >
                          {l.name}
                        </span>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '0.65rem',
                            color: '#E3D9A4',
                            border: '1px solid rgba(227, 217, 164, 0.3)',
                            padding: '2px 6px',
                            borderRadius: '4px'
                          }}
                        >
                          {l.temp}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.72rem', color: '#B9B4C5', margin: 0, lineHeight: 1.45 }}>
                        {l.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Panel Footer Actions: Reset Surface, Reset Entire Room, Download */}
        <div
          style={{
            padding: '0.85rem 1.25rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgba(23, 21, 29, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem'
          }}
        >
          <button
            onClick={handleResetSelectedSurface}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(250, 248, 242, 0.75)',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.65rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            title="Reset only the currently selected surface to default"
          >
            Reset Selected Surface
          </button>

          <button
            onClick={handleResetEntireRoom}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(250, 248, 242, 0.75)',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.65rem',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            title="Reset entire room to default state"
          >
            Reset Entire Room
          </button>

          <button
            onClick={handleDownloadSummary}
            aria-label="Download design summary"
            style={{
              backgroundColor: 'rgba(33, 29, 45, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              padding: '4px 8px',
              color: '#FAF8F2',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.65rem'
            }}
            title="Download design summary"
          >
            <Download size={12} />
          </button>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* TOAST NOTIFICATION                                             */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'fixed',
              bottom: '24px',
              right: '24px',
              zIndex: 1000,
              backgroundColor: 'rgba(33, 29, 45, 0.95)',
              border: '1px solid #E3D9A4',
              color: '#FAF8F2',
              padding: '10px 18px',
              borderRadius: '8px',
              backdropFilter: 'blur(12px)',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.78rem',
              boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Sparkles size={14} color="#E3D9A4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

