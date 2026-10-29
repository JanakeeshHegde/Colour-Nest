import React from 'react';
import { RotateCcw, Video } from 'lucide-react';
import { CAMERA_PRESETS } from '../data/cameraPresets';

export const StudioCameraToolbar = ({
  cameraPreset,
  setCameraPreset,
  onResetView
}) => {
  const presetsList = Object.values(CAMERA_PRESETS);

  return (
    <div
      className="studio-camera-toolbar-container"
      style={{
        position: 'absolute',
        top: 'calc(var(--nav-height, 84px) + 3.8rem)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 28,
        maxWidth: 'calc(100vw - 2rem)',
        pointerEvents: 'auto'
      }}
    >
      <div
        className="studio-camera-toolbar"
        style={{
          backgroundColor: 'rgba(23, 21, 29, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(227, 217, 164, 0.3)',
          borderRadius: '999px',
          padding: '4px 6px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.55)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Camera Indicator Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            padding: '0 8px 0 10px',
            color: '#E3D9A4',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.62rem',
            letterSpacing: '0.14em',
            fontWeight: 700,
            borderRight: '1px solid rgba(227, 217, 164, 0.2)',
            userSelect: 'none'
          }}
          className="desktop-camera-label"
        >
          <Video size={13} color="#E3D9A4" />
          <span>VIEW:</span>
        </div>

        {/* Camera Preset Buttons */}
        {presetsList.map((preset) => {
          const isActive = cameraPreset === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => setCameraPreset(preset.id)}
              className={`camera-preset-btn ${isActive ? 'active' : ''}`}
              title={preset.description || `Switch to ${preset.label} view`}
              style={{
                backgroundColor: isActive ? 'var(--brand-indigo, #3C2D8C)' : 'transparent',
                color: isActive ? '#FFFFFF' : 'rgba(250, 248, 242, 0.8)',
                border: isActive ? '1px solid #E3D9A4' : '1px solid transparent',
                borderRadius: '999px',
                padding: '5px 12px',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: isActive ? '0 2px 10px rgba(60, 45, 140, 0.5)' : 'none'
              }}
            >
              {isActive && (
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: '#E3D9A4',
                    display: 'inline-block'
                  }}
                />
              )}
              <span>{preset.label}</span>
            </button>
          );
        })}

        {/* Divider */}
        <div
          style={{
            width: '1px',
            height: '16px',
            backgroundColor: 'rgba(227, 217, 164, 0.2)',
            margin: '0 2px'
          }}
        />

        {/* Reset View Button */}
        <button
          onClick={onResetView}
          title="Reset Camera to Default Front View"
          className="camera-preset-btn reset-btn"
          style={{
            backgroundColor: 'transparent',
            color: '#E3D9A4',
            border: '1px solid rgba(227, 217, 164, 0.2)',
            borderRadius: '999px',
            padding: '5px 11px',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.65rem',
            letterSpacing: '0.08em',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.2s ease'
          }}
        >
          <RotateCcw size={12} color="#E3D9A4" />
          <span className="reset-label">RESET VIEW</span>
        </button>
      </div>

      <style>{`
        .studio-camera-toolbar::-webkit-scrollbar {
          display: none;
        }
        .camera-preset-btn:hover {
          color: #FFFFFF !important;
          background-color: rgba(60, 45, 140, 0.3) !important;
        }
        .camera-preset-btn.active:hover {
          background-color: var(--brand-indigo, #3C2D8C) !important;
        }
        @media (max-width: 900px) {
          .desktop-camera-label {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .studio-camera-toolbar-container {
            top: calc(var(--nav-height-mobile, 68px) + 3.2rem) !important;
            left: 1rem !important;
            right: 1rem !important;
            transform: none !important;
            max-width: calc(100vw - 2rem) !important;
          }
          .studio-camera-toolbar {
            justify-content: flex-start !important;
            padding: 4px 6px !important;
          }
          .camera-preset-btn {
            padding: 6px 10px !important;
            font-size: 0.65rem !important;
          }
          .reset-label {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StudioCameraToolbar;

