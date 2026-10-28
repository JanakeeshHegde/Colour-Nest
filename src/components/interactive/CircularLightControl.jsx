import React, { useRef, useState, useEffect } from 'react';
import { Sun } from 'lucide-react';

export const CircularLightControl = ({ value, onChange }) => {
  const dialRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // value = { azimuth: -60, elevation: 45 }
  const currentAngle = value?.azimuth || -60;

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    updateAngle(e);
  };

  const updateAngle = (e) => {
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;

    if (clientX == null || clientY == null) return;

    const dx = clientX - centerX;
    const dy = clientY - centerY;
    let rad = Math.atan2(dy, dx);
    let deg = (rad * 180) / Math.PI;

    // Map angle to realistic window ingress azimuth: -140 deg to 40 deg
    // Elevation calculates based on distance from horizon
    const elevation = Math.max(20, Math.min(80, 50 + Math.sin(rad) * 25));

    onChange && onChange({ azimuth: Math.round(deg), elevation: Math.round(elevation) });
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      updateAngle(e);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging]);

  // Node position on circle of radius 42px
  const rad = (currentAngle * Math.PI) / 180;
  const radius = 40;
  const nodeX = 50 + radius * Math.cos(rad);
  const nodeY = 50 + radius * Math.sin(rad);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
      <div
        ref={dialRef}
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1.5px dashed rgba(255, 255, 255, 0.25)',
          position: 'relative',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          boxShadow: 'inset 0 0 16px rgba(0,0,0,0.5)'
        }}
      >
        {/* Center Pivot Marker */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.4)'
          }}
        />

        {/* Outer Draggable Sun Node */}
        <div
          style={{
            position: 'absolute',
            top: `${nodeY}%`,
            left: `${nodeX}%`,
            transform: 'translate(-50%, -50%)',
            width: '26px',
            height: '26px',
            borderRadius: '50%',
            backgroundColor: '#FFAE64',
            boxShadow: '0 0 14px #FFAE64',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#121213',
            transition: isDragging ? 'none' : 'all 0.15s ease'
          }}
        >
          <Sun size={14} />
        </div>
      </div>
      <span
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.65rem',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.7)'
        }}
      >
        DRAG SUN ANGLE ({currentAngle}°)
      </span>
    </div>
  );
};
