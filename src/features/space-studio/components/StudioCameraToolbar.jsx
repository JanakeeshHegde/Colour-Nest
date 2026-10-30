import React from 'react';
import { Camera, Eye, Maximize2, RotateCcw } from 'lucide-react';
import { CAMERA_PRESETS } from '../data/cameraPresets';

/**
 * Clean Professional Floating Camera Toolbar
 * Prominently presents FRONT, CORNER, WIDE and RESET VIEW with readable labels and tooltips.
 */
export const StudioCameraToolbar = ({
  cameraPreset,
  setCameraPreset,
  onResetView
}) => {
  const primaryPresets = [
    { id: 'FRONT', label: 'FRONT', icon: Eye, tip: 'Front eye-level architectural perspective' },
    { id: 'CORNER', label: 'CORNER', icon: Camera, tip: 'Diagonal corner 3/4 perspective' },
    { id: 'WIDE', label: 'WIDE', icon: Maximize2, tip: 'Expansive wide-angle room overview' }
  ];

  return (
    <div
      className="studio-camera-toolbar-container"
      style={{
        position: 'absolute',
        top: '1.25rem',
        left: '1.25rem',
        zIndex: 20,
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
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.55)'
        }}
      >
        {primaryPresets.map((preset) => {
          const isActive = cameraPreset === preset.id;
          const Icon = preset.icon;
          return (
            <button
              key={preset.id}
              onClick={() => setCameraPreset(preset.id)}
              className={`camera-preset-btn ${isActive ? 'active' : ''}`}
              title={preset.tip}
              aria-label={`Switch camera to ${preset.label} view`}
              style={{
                backgroundColor: isActive ? 'var(--brand-indigo, #3C2D8C)' : 'transparent',
                color: isActive ? '#FFFFFF' : 'rgba(250, 248, 242, 0.75)',
                border: isActive ? '1px solid #E3D9A4' : '1px solid transparent',
                borderRadius: '999px',
                padding: '6px 14px',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: isActive ? '0 2px 10px rgba(60, 45, 140, 0.5)' : 'none'
              }}
            >
              <Icon size={12} color={isActive ? '#E3D9A4' : 'currentColor'} />
              <span>{preset.label}</span>
            </button>
          );
        })}

        {/* Divider */}
        <div
          style={{
            width: '1px',
            height: '16px',
            backgroundColor: 'rgba(227, 217, 164, 0.25)',
            margin: '0 2px'
          }}
        />

        {/* Reset View Button */}
        <button
          onClick={onResetView}
          title="Reset camera to default front eye-level view"
          aria-label="Reset Camera View"
          className="camera-preset-btn reset-btn"
          style={{
            backgroundColor: 'transparent',
            color: '#E3D9A4',
            border: '1px solid rgba(227, 217, 164, 0.25)',
            borderRadius: '999px',
            padding: '6px 12px',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.66rem',
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
        .camera-preset-btn:hover {
          color: #FFFFFF !important;
          background-color: rgba(60, 45, 140, 0.3) !important;
        }
        .camera-preset-btn.active:hover {
          background-color: var(--brand-indigo, #3C2D8C) !important;
        }
        @media (max-width: 480px) {
          .reset-label {
            display: none !important;
          }
          .camera-preset-btn {
            padding: 6px 10px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StudioCameraToolbar;
