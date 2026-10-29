import React from 'react';
import {
  Bookmark,
  Sparkles,
  Undo2
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import {
  useSpaceStudioState,
  SpaceStudioCanvas,
  StudioControlPanel,
  StudioCameraToolbar,
  SavedDesignsModal,
  DesignEnquiryModal
} from '../features/space-studio';
import { ROOM_TYPES } from '../data/roomStudioConfig';

export const SpaceStudio = () => {
  const {
    roomType,
    setRoomType,
    surfaces,
    selectedSurfaceId,
    setSelectedSurfaceId,
    activeTab,
    setActiveTab,
    lighting,
    cameraPreset,
    setCameraPreset,
    resetCameraCounter,
    setResetCameraCounter,
    showHotspots,
    isMobilePanelOpen,
    setIsMobilePanelOpen,
    history,
    savedDesigns,
    isSavedModalOpen,
    setIsSavedModalOpen,
    isEnquiryModalOpen,
    setIsEnquiryModalOpen,
    toastMessage,
    showToast,
    handleUndo,
    handleSelectSurface,
    handleUpdateWallColor,
    handleUpdateFloor,
    handleUpdateCeilingColor,
    handleUpdateCeilingStyle,
    handleUpdateWood,
    handleSelectLighting,
    handleResetSelectedSurface,
    handleResetEntireRoom,
    handleSaveDesign,
    handleRestoreDesign,
    handleDownloadSummary
  } = useSpaceStudioState();

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
        title="3D Room Studio — Interactive Architectural Finishing Studio | COLOUR NEST"
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
      {/* TOP HEADER OVERLAY (Fixed Brand Identity & Studio Controls)   */}
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
              display: 'flex',
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

        {/* Right: Quick Action Buttons (Undo, Save, Request Design) */}
        <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {/* Action Buttons: Undo, Save, Request Design */}
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
      {/* FLOATING CAMERA VIEW CONTROLS (FRONT, CORNER, WIDE, LEFT, RIGHT, TOP, RESET) */}
      {/* ------------------------------------------------------------- */}
      <StudioCameraToolbar
        cameraPreset={cameraPreset}
        setCameraPreset={setCameraPreset}
        onResetView={() => {
          setCameraPreset('FRONT');
          setResetCameraCounter((c) => c + 1);
          showToast('Reset camera to default view');
        }}
      />

      {/* ------------------------------------------------------------- */}
      {/* FLOATING CUSTOMISATION PANEL (Right Dock) & CHIP               */}
      {/* ------------------------------------------------------------- */}
      <StudioControlPanel
        surfaces={surfaces}
        selectedSurfaceId={selectedSurfaceId}
        setSelectedSurfaceId={setSelectedSurfaceId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lighting={lighting}
        isMobilePanelOpen={isMobilePanelOpen}
        setIsMobilePanelOpen={setIsMobilePanelOpen}
        toastMessage={toastMessage}
        handleUpdateWallColor={handleUpdateWallColor}
        handleUpdateFloor={handleUpdateFloor}
        handleUpdateCeilingColor={handleUpdateCeilingColor}
        handleUpdateCeilingStyle={handleUpdateCeilingStyle}
        handleUpdateWood={handleUpdateWood}
        handleSelectLighting={handleSelectLighting}
        handleResetSelectedSurface={handleResetSelectedSurface}
        handleResetEntireRoom={handleResetEntireRoom}
        handleDownloadSummary={handleDownloadSummary}
      />

      {/* ------------------------------------------------------------- */}
      {/* MODALS                                                        */}
      {/* ------------------------------------------------------------- */}
      <SavedDesignsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedDesigns={savedDesigns}
        onRestore={handleRestoreDesign}
      />

      <DesignEnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        roomType={roomType}
        surfaces={surfaces}
        lighting={lighting}
      />

      {/* Responsive Styles */}
      <style>{`
        .mobile-panel-header { display: none; }
        .mobile-btn-label { display: none; }
        .desktop-btn-label { display: inline; }
        @media (max-width: 900px) {
          .desktop-room-selector { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-btn-label { display: none !important; }
          .mobile-btn-label { display: inline !important; }
          .mobile-panel-header { display: flex !important; }
          .studio-selection-chip.mobile-hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default SpaceStudio;
