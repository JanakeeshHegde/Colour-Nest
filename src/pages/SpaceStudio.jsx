import React from 'react';
import { RotateCcw, Undo2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import {
  useSpaceStudioState,
  SpaceStudioCanvas,
  StudioControlPanel,
  StudioCameraToolbar,
  ResetConfirmModal
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
    isResetModalOpen,
    setIsResetModalOpen,
    toastMessage,
    showToast,
    handleUndo,
    handleSelectSurface,
    handleUpdateWallColor,
    handleUpdateWallFinish,
    handleUpdateFloor,
    handleUpdateCeilingColor,
    handleUpdateCeilingStyle,
    handleUpdateWood,
    handleSelectLighting,
    handleResetSelectedSurface,
    handleResetEntireRoom
  } = useSpaceStudioState();

  const currentRoom = ROOM_TYPES[roomType] || ROOM_TYPES.LIVING;

  return (
    <div
      className="studio-page-container"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '640px',
        backgroundColor: '#17151D',
        color: '#FAF8F2',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '68px' // Offset for fixed navbar
      }}
    >
      <SEOHead
        title="3D Room Studio — Interactive Architectural Finishing Studio | COLOUR NEST"
        description="Experience realistic 3D interior customisation with Colour Nest. Change wall colours, textures, wood finishes, false ceilings, and dynamic lighting on actual 3D geometry in real time."
      />

      {/* ------------------------------------------------------------- */}
      {/* TOP STUDIO BAR (Clean Identity & Global Action Controls)       */}
      {/* ------------------------------------------------------------- */}
      <header
        className="studio-top-bar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.65rem clamp(1rem, 2.5vw, 2rem)',
          backgroundColor: 'rgba(23, 21, 29, 0.96)',
          borderBottom: '1px solid rgba(227, 217, 164, 0.2)',
          zIndex: 30,
          flexShrink: 0
        }}
      >
        {/* Left: Studio Badge & Active Space Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              backgroundColor: 'rgba(33, 29, 45, 0.9)',
              border: '1px solid rgba(227, 217, 164, 0.3)',
              borderRadius: '999px',
              padding: '4px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px'
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                backgroundColor: '#E3D9A4'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.68rem',
                letterSpacing: '0.14em',
                color: '#FAF8F2',
                fontWeight: 700
              }}
            >
              3D SPACE STUDIO
            </span>
          </div>

          <span
            className="desktop-room-subtitle"
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.68rem',
              color: '#B9B4C5'
            }}
          >
            {currentRoom.name} • {currentRoom.serviceCategory}
          </span>
        </div>

        {/* Right: Studio Quick Actions (Undo, Reset Studio) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            style={{
              backgroundColor: 'rgba(33, 29, 45, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '6px',
              padding: '6px 10px',
              color: history.length > 0 ? '#FAF8F2' : 'rgba(255,255,255,0.3)',
              cursor: history.length > 0 ? 'pointer' : 'not-allowed',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.66rem'
            }}
            title="Undo last material change"
          >
            <Undo2 size={12} />
            <span className="desktop-btn-label">UNDO</span>
          </button>

          <button
            onClick={() => setIsResetModalOpen(true)}
            style={{
              backgroundColor: 'rgba(33, 29, 45, 0.85)',
              border: '1px solid rgba(227, 217, 164, 0.4)',
              borderRadius: '6px',
              padding: '6px 14px',
              color: '#FAF8F2',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              transition: 'background-color 0.2s ease, border-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(60, 45, 140, 0.4)';
              e.currentTarget.style.borderColor = '#E3D9A4';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(33, 29, 45, 0.85)';
              e.currentTarget.style.borderColor = 'rgba(227, 217, 164, 0.4)';
            }}
            title="Reset your room design to the original settings"
            aria-label="Reset Studio"
          >
            <RotateCcw size={12} color="#E3D9A4" />
            <span className="desktop-btn-label">RESET STUDIO</span>
            <span className="mobile-btn-label">RESET</span>
          </button>
        </div>
      </header>

      {/* ------------------------------------------------------------- */}
      {/* MAIN TWO-PART WORKSPACE (70% 3D Viewport / 30% Design Inspector) */}
      {/* ------------------------------------------------------------- */}
      <div
        className="studio-main-workspace"
        style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          height: 'calc(100% - 48px)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* LEFT / MAIN AREA: 3D VIEWPORT (~70% on Desktop) */}
        <div
          className="studio-viewport-container"
          style={{
            flex: '1 1 70%',
            position: 'relative',
            height: '100%',
            overflow: 'hidden',
            backgroundColor: '#17151D'
          }}
        >
          {/* Floating Camera Toolbar */}
          <StudioCameraToolbar
            cameraPreset={cameraPreset}
            setCameraPreset={setCameraPreset}
            onResetView={() => {
              setCameraPreset('FRONT');
              setResetCameraCounter((c) => c + 1);
              showToast('Reset camera to default view');
            }}
          />

          {/* 3D Canvas */}
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

        {/* RIGHT SIDE: DESIGN INSPECTOR (~30% on Desktop) */}
        <div
          className="studio-inspector-container"
          style={{
            width: 'clamp(340px, 30vw, 420px)',
            height: '100%',
            position: 'relative',
            flexShrink: 0
          }}
        >
          <StudioControlPanel
            roomType={roomType}
            setRoomType={setRoomType}
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
            handleUpdateWallFinish={handleUpdateWallFinish}
            handleUpdateFloor={handleUpdateFloor}
            handleUpdateCeilingColor={handleUpdateCeilingColor}
            handleUpdateCeilingStyle={handleUpdateCeilingStyle}
            handleUpdateWood={handleUpdateWood}
            handleSelectLighting={handleSelectLighting}
            handleResetSelectedSurface={handleResetSelectedSurface}
            onOpenResetConfirm={() => setIsResetModalOpen(true)}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CONFIRMATION MODAL: Reset Studio                               */}
      {/* ------------------------------------------------------------- */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetEntireRoom}
      />

      {/* Responsive Layout Styles */}
      <style>{`
        .mobile-btn-label { display: none; }
        .desktop-btn-label { display: inline; }

        @media (max-width: 1024px) {
          .desktop-room-subtitle { display: none !important; }
          .studio-main-workspace {
            flex-direction: column !important;
          }
          .studio-viewport-container {
            flex: 1 1 58svh !important;
            height: 58svh !important;
            min-height: 320px !important;
          }
          .studio-inspector-container {
            width: 100% !important;
            flex: 1 1 auto !important;
            height: auto !important;
            max-height: 42svh !important;
          }
          .mobile-panel-header {
            display: flex !important;
          }
        }

        @media (max-width: 768px) {
          .desktop-btn-label { display: none !important; }
          .mobile-btn-label { display: inline !important; }
          .studio-top-bar {
            padding: 0.5rem 0.85rem !important;
          }
          .studio-viewport-container {
            height: 54svh !important;
          }
          .studio-inspector-container {
            max-height: 46svh !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SpaceStudio;
