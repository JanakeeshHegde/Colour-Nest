import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Layers,
  Palette,
  Sun,
  RotateCcw,
  Undo2,
  Bookmark,
  Share2,
  MessageCircle,
  Mail,
  Camera,
  Maximize2,
  Check,
  CheckCircle2,
  X,
  ArrowRight,
  Download,
  Info,
  Sliders,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { SpaceStudioCanvas } from '../components/canvas/SpaceStudioCanvas';
import {
  ROOM_TYPES,
  WALL_COLORS,
  FLOOR_PRESETS,
  WOOD_FINISHES,
  CEILING_COLORS,
  CEILING_STYLES,
  LIGHTING_PRESETS,
  CONFIGURABLE_SURFACES,
  DEFAULT_SURFACES_STATE,
  DEFAULT_ROOM_CONFIG,
  generateDesignEnquiryText,
  getWhatsAppEnquiryUrl,
  getMailtoEnquiryUrl
} from '../data/roomStudioConfig';

export const SpaceStudio = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initial State from URL params or defaults
  const initialRoom = searchParams.get('room') && ROOM_TYPES[searchParams.get('room')]
    ? searchParams.get('room')
    : 'LIVING';

  // Configurator Independent States
  const [roomType, setRoomType] = useState(initialRoom);
  const [surfaces, setSurfaces] = useState(() => {
    try {
      const saved = localStorage.getItem('colournest_active_room_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.surfaces && typeof parsed.surfaces === 'object') {
          return { ...DEFAULT_SURFACES_STATE, ...parsed.surfaces };
        }
      }
    } catch {
      // Fallback
    }
    return { ...DEFAULT_SURFACES_STATE };
  });

  const [selectedSurfaceId, setSelectedSurfaceId] = useState('wall-feature');
  const [activeTab, setActiveTab] = useState('WALLS'); // WALLS, FLOOR, CEILING, WOOD, LIGHTING, SUMMARY
  const [lighting, setLighting] = useState('BALANCED'); // SOFT DAYLIGHT, BALANCED, WARM EVENING
  const [cameraPreset, setCameraPreset] = useState('FRONT'); // FRONT, CORNER, WIDE
  const [resetCameraCounter, setResetCameraCounter] = useState(0);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  // Undo History Stack
  const [history, setHistory] = useState([]);

  // Saved Designs in LocalStorage
  const [savedDesigns, setSavedDesigns] = useState(() => {
    try {
      const data = localStorage.getItem('colournest_saved_designs');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  });

  // UI Modals & Toast
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Synchronize active config to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        'colournest_active_room_config',
        JSON.stringify({ roomType, surfaces, lighting })
      );
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [roomType, surfaces, lighting]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Push state to undo history
  const pushHistory = () => {
    setHistory((prev) => [...prev.slice(-15), JSON.parse(JSON.stringify(surfaces))]);
  };

  // Undo Last Change
  const handleUndo = () => {
    if (history.length === 0) {
      showToast('No previous changes to undo');
      return;
    }
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setSurfaces(previous);
    showToast('Reverted last material change');
  };

  // Raycast Mesh Click Handler: selects surface and opens appropriate tab
  const handleSelectSurface = (surfaceId) => {
    setSelectedSurfaceId(surfaceId);
    if (surfaceId.startsWith('wall-')) {
      setActiveTab('WALLS');
    } else if (surfaceId === 'floor-main') {
      setActiveTab('FLOOR');
    } else if (surfaceId === 'ceiling-main') {
      setActiveTab('CEILING');
    } else if (surfaceId === 'wood-panel' || surfaceId === 'cabinet-main') {
      setActiveTab('WOOD');
    }
    setIsMobilePanelOpen(true);
    const surfaceObj = CONFIGURABLE_SURFACES.find((s) => s.id === surfaceId);
    showToast(`Selected: ${surfaceObj?.name || surfaceId}`);
  };

  // 1. UPDATE WALL COLOUR (Only changes the selected surface!)
  const handleUpdateWallColor = (colorKey, customHex = null) => {
    const wallPreset = WALL_COLORS[colorKey];
    const hex = customHex || wallPreset?.hex || '#FAF8F2';
    const name = customHex ? `Custom (${customHex.toUpperCase()})` : wallPreset?.name || 'Custom Finish';
    const finish = wallPreset?.service || 'Luxury Architectural Coating';

    pushHistory();
    setSurfaces((prev) => ({
      ...prev,
      [selectedSurfaceId]: {
        ...prev[selectedSurfaceId],
        material: 'paint',
        colorKey: customHex ? 'custom' : colorKey,
        color: hex,
        name,
        finish,
        roughness: wallPreset?.roughness || 0.82
      }
    }));

    showToast(`Applied ${name} to ${CONFIGURABLE_SURFACES.find((s) => s.id === selectedSurfaceId)?.name || 'surface'}`);
  };

  // 2. UPDATE FLOOR MATERIAL
  const handleUpdateFloor = (floorKey) => {
    const preset = FLOOR_PRESETS[floorKey];
    if (!preset) return;

    pushHistory();
    setSurfaces((prev) => ({
      ...prev,
      'floor-main': {
        ...prev['floor-main'],
        material: preset.materialType,
        preset: floorKey,
        color: preset.color,
        name: preset.name,
        finish: preset.service,
        roughness: preset.roughness
      }
    }));
    showToast(`Applied ${preset.name} to Floor`);
  };

  // 3. UPDATE CEILING MATERIAL & STYLE
  const handleUpdateCeilingColor = (colorKey) => {
    const preset = CEILING_COLORS[colorKey];
    if (!preset) return;

    pushHistory();
    setSurfaces((prev) => ({
      ...prev,
      'ceiling-main': {
        ...prev['ceiling-main'],
        colorKey,
        color: preset.hex,
        name: preset.name,
        finish: preset.description,
        roughness: preset.roughness
      }
    }));
    showToast(`Applied ${preset.name} to Ceiling`);
  };

  const handleUpdateCeilingStyle = (styleKey) => {
    const preset = CEILING_STYLES[styleKey];
    if (!preset) return;

    pushHistory();
    setSurfaces((prev) => ({
      ...prev,
      'ceiling-main': {
        ...prev['ceiling-main'],
        stylePreset: styleKey
      }
    }));
    showToast(`Ceiling style: ${preset.name}`);
  };

  // 4. UPDATE WOOD FINISH
  const handleUpdateWood = (woodKey) => {
    const preset = WOOD_FINISHES[woodKey];
    if (!preset) return;

    const targetWoodId = selectedSurfaceId === 'cabinet-main' ? 'cabinet-main' : 'wood-panel';

    pushHistory();
    setSurfaces((prev) => ({
      ...prev,
      [targetWoodId]: {
        ...prev[targetWoodId],
        material: 'wood',
        preset: woodKey,
        color: preset.color,
        name: preset.name,
        finish: preset.service,
        roughness: preset.roughness
      }
    }));
    showToast(`Applied ${preset.name} to ${targetWoodId === 'cabinet-main' ? 'Credenza' : 'Timber Slats'}`);
  };

  // 5. UPDATE LIGHTING PRESET (Changes 3D lighting without modifying material values!)
  const handleSelectLighting = (modeKey) => {
    setLighting(modeKey);
    const light = LIGHTING_PRESETS[modeKey];
    showToast(`Atmosphere set to: ${light?.name || modeKey}`);
  };

  // 6. RESET SELECTED SURFACE ACTION
  const handleResetSelectedSurface = () => {
    const defaultSurface = DEFAULT_SURFACES_STATE[selectedSurfaceId];
    if (!defaultSurface) return;

    pushHistory();
    setSurfaces((prev) => ({
      ...prev,
      [selectedSurfaceId]: { ...defaultSurface }
    }));
    showToast(`Reset ${CONFIGURABLE_SURFACES.find((s) => s.id === selectedSurfaceId)?.name || 'surface'} to default`);
  };

  // 7. RESET ENTIRE ROOM ACTION
  const handleResetEntireRoom = () => {
    pushHistory();
    setSurfaces({ ...DEFAULT_SURFACES_STATE });
    setLighting('BALANCED');
    setCameraPreset('FRONT');
    setResetCameraCounter((c) => c + 1);
    showToast('Reset entire room to default contemporary interior');
  };

  // 8. SAVE DESIGN TO LOCALSTORAGE
  const handleSaveDesign = () => {
    const newDesign = {
      id: 'design-' + Date.now(),
      name: `${ROOM_TYPES[roomType]?.name} — ${surfaces['wall-feature']?.name}`,
      roomType,
      surfaces: JSON.parse(JSON.stringify(surfaces)),
      lighting,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      timestamp: Date.now()
    };

    const updated = [newDesign, ...savedDesigns.slice(0, 9)];
    setSavedDesigns(updated);
    try {
      localStorage.setItem('colournest_saved_designs', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
    showToast('Design saved to local storage portfolio');
    setIsSavedModalOpen(true);
  };

  // 9. RESTORE SAVED DESIGN
  const handleRestoreDesign = (design) => {
    if (!design) return;
    if (design.roomType) setRoomType(design.roomType);
    if (design.surfaces) setSurfaces(design.surfaces);
    if (design.lighting) setLighting(design.lighting);
    setIsSavedModalOpen(false);
    showToast(`Restored: ${design.name}`);
  };

  // 10. DOWNLOAD DESIGN SUMMARY SPECIFICATION
  const handleDownloadSummary = () => {
    const summaryText = generateDesignEnquiryText({ roomType, surfaces, lighting });
    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `COLOUR_NEST_${roomType}_DESIGN_SPECIFICATION.txt`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Downloaded design specification sheet');
  };

  // 11. SHARE SHARABLE URL
  const handleShareUrl = () => {
    const shareUrl = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast('Link copied to clipboard');
      }).catch(() => {
        showToast('Sharable URL: ' + shareUrl);
      });
    } else {
      showToast('Sharable URL: ' + shareUrl);
    }
  };

  // Active selected surface metadata
  const currentSurfaceMeta = CONFIGURABLE_SURFACES.find((s) => s.id === selectedSurfaceId) || CONFIGURABLE_SURFACES[0];
  const currentSurfaceState = surfaces[selectedSurfaceId] || DEFAULT_SURFACES_STATE[selectedSurfaceId];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        backgroundColor: '#17151D',
        color: '#FAF8F2',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <SEOHead
        title="3D Room Studio — Interactive Architectural Finishing Studio | Colour Nest"
        description="Experience realistic 3D interior customisation with Colour Nest. Change wall colours, textures, wood finishes, false ceilings, and dynamic lighting on actual 3D geometry in real time."
      />

      {/* ------------------------------------------------------------- */}
      {/* 3D CANVAS VIEWPORT AREA                                        */}
      {/* ------------------------------------------------------------- */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <SpaceStudioCanvas
          roomType={roomType}
          surfaces={surfaces}
          selectedSurfaceId={selectedSurfaceId}
          onSelectSurface={handleSelectSurface}
          lighting={lighting}
          cameraPreset={cameraPreset}
          resetCameraTrigger={resetCameraCounter}
          onHotspotClick={handleSelectSurface}
          activeHotspot={selectedSurfaceId}
          showHotspots={showHotspots}
        />
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER OVERLAY (Fixed Brand Identity & Studio Breadcrumbs) */}
      {/* ------------------------------------------------------------- */}
      <header
        className="studio-top-header"
        style={{
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'calc(76px + 0.85rem) clamp(1rem, 2.5vw, 2.5rem) 0.65rem',
          background: 'linear-gradient(180deg, rgba(23, 21, 29, 0.95) 0%, rgba(23, 21, 29, 0) 100%)',
          pointerEvents: 'none'
        }}
      >
        {/* Left: Studio Identity & Room Switcher */}
        <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div
            style={{
              backgroundColor: 'rgba(33, 29, 45, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(227, 217, 164, 0.25)',
              borderRadius: '999px',
              padding: '0.45rem 1.1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#E3D9A4'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                letterSpacing: '0.16em',
                color: '#FAF8F2',
                fontWeight: 700
              }}
            >
              3D SPACE STUDIO
            </span>
          </div>

          {/* Room Selector Pill */}
          <div
            style={{
              backgroundColor: 'rgba(33, 29, 45, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '3px',
              gap: '4px'
            }}
            className="desktop-room-selector"
          >
            {Object.values(ROOM_TYPES).map((r) => (
              <button
                key={r.id}
                onClick={() => setRoomType(r.id)}
                style={{
                  background: roomType === r.id ? 'var(--brand-indigo, #3C2D8C)' : 'transparent',
                  color: roomType === r.id ? '#FFFFFF' : 'rgba(250, 248, 242, 0.7)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease'
                }}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Camera Presets & Reset Camera */}
        <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Camera Presets (FRONT, CORNER, WIDE) */}
          <div
            style={{
              backgroundColor: 'rgba(33, 29, 45, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '3px',
              display: 'flex',
              gap: '3px'
            }}
          >
            {[
              { id: 'FRONT', label: 'FRONT' },
              { id: 'CORNER', label: 'CORNER' },
              { id: 'WIDE', label: 'WIDE' }
            ].map((cam) => (
              <button
                key={cam.id}
                onClick={() => setCameraPreset(cam.id)}
                style={{
                  background: cameraPreset === cam.id ? 'var(--brand-indigo, #3C2D8C)' : 'transparent',
                  color: cameraPreset === cam.id ? '#FFFFFF' : 'rgba(250, 248, 242, 0.7)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  fontWeight: cameraPreset === cam.id ? 700 : 500
                }}
                title={`Switch camera to ${cam.label} view`}
              >
                {cam.label}
              </button>
            ))}

            <button
              onClick={() => {
                setCameraPreset('FRONT');
                setResetCameraCounter((c) => c + 1);
                showToast('Reset camera angle');
              }}
              style={{
                background: 'transparent',
                color: 'rgba(250, 248, 242, 0.75)',
                border: 'none',
                borderRadius: '6px',
                padding: '5px 8px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.65rem'
              }}
              title="Reset Camera"
            >
              <RotateCcw size={12} />
            </button>
          </div>

          {/* Action Buttons: Undo, Reset Room, Save, Enquiry */}
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            style={{
              backgroundColor: 'rgba(33, 29, 45, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '6px 10px',
              color: history.length > 0 ? '#FAF8F2' : 'rgba(255,255,255,0.3)',
              cursor: history.length > 0 ? 'pointer' : 'not-allowed',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.68rem'
            }}
            title="Undo last change"
          >
            <Undo2 size={13} />
            <span className="desktop-btn-label">UNDO</span>
          </button>

          <button
            onClick={handleSaveDesign}
            style={{
              backgroundColor: 'rgba(33, 29, 45, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#FAF8F2',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.68rem',
              fontWeight: 600
            }}
          >
            <Bookmark size={13} />
            <span className="desktop-btn-label">SAVE</span>
          </button>

          <button
            onClick={() => setIsEnquiryModalOpen(true)}
            style={{
              backgroundColor: 'var(--brand-indigo, #3C2D8C)',
              border: '1px solid #E3D9A4',
              borderRadius: '8px',
              padding: '6px 14px',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              boxShadow: '0 4px 14px rgba(60, 45, 140, 0.4)'
            }}
          >
            <Sparkles size={13} color="#E3D9A4" />
            <span className="desktop-btn-label">REQUEST THIS DESIGN</span>
            <span className="mobile-btn-label">ENQUIRE</span>
          </button>
        </div>
      </header>

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
          onClick={() => setIsMobilePanelOpen((prev) => !prev)}
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

      {/* ------------------------------------------------------------- */}
      {/* SAVED DESIGNS MODAL (Portfolio Persistence)                    */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isSavedModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1100,
              backgroundColor: 'rgba(10, 8, 14, 0.8)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem'
            }}
            onClick={() => setIsSavedModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#1E1C27',
                border: '1px solid rgba(227, 217, 164, 0.3)',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '540px',
                width: '100%',
                maxHeight: '80vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '1.4rem', color: '#FAF8F2', margin: 0 }}>
                  Saved Studio Designs
                </h3>
                <button
                  onClick={() => setIsSavedModalOpen(false)}
                  style={{ background: 'transparent', border: 'none', color: '#B9B4C5', cursor: 'pointer' }}
                >
                  <X size={18} />
                </button>
              </div>

              {savedDesigns.length === 0 ? (
                <p style={{ color: '#B9B4C5', fontSize: '0.85rem' }}>No saved spaces found in this browser session.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {savedDesigns.map((d) => (
                    <div
                      key={d.id}
                      style={{
                        backgroundColor: 'rgba(33, 29, 45, 0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        padding: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <h4 style={{ fontSize: '0.95rem', color: '#FAF8F2', margin: '0 0 4px 0' }}>{d.name}</h4>
                        <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem', color: '#B9B4C5' }}>
                          Saved on {d.date} • Mood: {d.lighting}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRestoreDesign(d)}
                        style={{
                          backgroundColor: 'var(--brand-indigo, #3C2D8C)',
                          color: '#FFFFFF',
                          border: '1px solid #E3D9A4',
                          borderRadius: '6px',
                          padding: '6px 12px',
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '0.68rem',
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        RESTORE
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------- */}
      {/* DESIGN ENQUIRY MODAL (WhatsApp + Email Flow)                  */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isEnquiryModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1200,
              backgroundColor: 'rgba(10, 8, 14, 0.85)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.25rem'
            }}
            onClick={() => setIsEnquiryModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#1E1C27',
                border: '1px solid #E3D9A4',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '620px',
                width: '100%',
                maxHeight: '88vh',
                overflowY: 'auto'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.68rem',
                      letterSpacing: '0.16em',
                      color: '#E3D9A4',
                      fontWeight: 700,
                      display: 'block',
                      marginBottom: '4px'
                    }}
                  >
                    TURNKEY DESIGN SPECIFICATION
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display, serif)',
                      fontSize: '1.7rem',
                      color: '#FAF8F2',
                      margin: 0
                    }}
                  >
                    Request This Interior Design
                  </h3>
                </div>
                <button
                  onClick={() => setIsEnquiryModalOpen(false)}
                  style={{ background: 'transparent', border: 'none', color: '#B9B4C5', cursor: 'pointer' }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Formatted Specification Summary Box */}
              <div
                style={{
                  backgroundColor: 'rgba(23, 21, 29, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.74rem',
                  color: '#FAF8F2',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line'
                }}
              >
                {generateDesignEnquiryText({ roomType, surfaces, lighting })}
              </div>

              {/* Action Buttons: WhatsApp & Mailto */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a
                  href={getWhatsAppEnquiryUrl({ roomType, surfaces, lighting })}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#25D366',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.65rem',
                    boxShadow: '0 4px 16px rgba(37, 211, 102, 0.35)'
                  }}
                >
                  <MessageCircle size={18} />
                  <span>SEND SPECIFICATION VIA WHATSAPP (+91 84949 50088)</span>
                </a>

                <a
                  href={getMailtoEnquiryUrl({ roomType, surfaces, lighting })}
                  style={{
                    backgroundColor: 'var(--brand-indigo, #3C2D8C)',
                    color: '#FFFFFF',
                    border: '1px solid #E3D9A4',
                    textDecoration: 'none',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.65rem'
                  }}
                >
                  <Mail size={18} />
                  <span>EMAIL SPECIFICATION (info.colournest@gmail.com)</span>
                </a>

                <Link
                  to="/contact"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#FAF8F2',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    textDecoration: 'none',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '8px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.65rem'
                  }}
                >
                  <span>CONTINUE IN FULL CLIENT ENQUIRY FORM</span>
                  <ArrowRight size={16} color="#E3D9A4" />
                </Link>
              </div>

              <p
                style={{
                  fontSize: '0.68rem',
                  color: '#B9B4C5',
                  textAlign: 'center',
                  marginTop: '1rem',
                  lineHeight: 1.5
                }}
              >
                Clicking will open WhatsApp or your mail client with your selected room finishes pre-filled.
                Colour Nest will review your architectural specification and arrange an on-site inspection.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpaceStudio;
