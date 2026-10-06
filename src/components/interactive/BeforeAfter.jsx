import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, SlidersHorizontal } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const roomModes = {
  WARM: {
    label: "WARM AMBER",
    filter: "sepia(0.2) saturate(1.2) hue-rotate(-5deg)",
    lightingTint: "rgba(255, 174, 90, 0.12)",
    accentHex: "#B85C38",
    description: "Golden hour glow with rich terracotta undertones and honeyed woodwork."
  },
  CALM: {
    label: "CALM SAGE",
    filter: "saturate(0.9) hue-rotate(45deg) brightness(1.02)",
    lightingTint: "rgba(122, 139, 123, 0.12)",
    accentHex: "#5C6F5D",
    description: "Restorative botanical serenity that diffuses midday Bangalore sunlight."
  },
  EARTH: {
    label: "EARTH SAND",
    filter: "saturate(0.95) sepia(0.15) contrast(1.02)",
    lightingTint: "rgba(168, 141, 86, 0.12)",
    accentHex: "#A88D56",
    description: "Grounded mineral plaster reminiscent of Tuscan limestone and natural sandstone."
  },
  LUXE: {
    label: "LUXE BRONZE",
    filter: "contrast(1.08) saturate(1.15) brightness(0.98)",
    lightingTint: "rgba(140, 109, 70, 0.15)",
    accentHex: "#8C6D46",
    description: "Opulent specular sheen emphasizing burnished Stucco and crystal Polycoat."
  },
  BOLD: {
    label: "BOLD CHARCOAL",
    filter: "contrast(1.2) saturate(0.85) brightness(0.92)",
    lightingTint: "rgba(35, 45, 55, 0.18)",
    accentHex: "#2B3A4A",
    description: "Dramatic nocturnal mood that makes warm cove lighting and joinery sculpturally pop."
  }
};

export const BeforeAfter = ({
  beforeImage = "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80",
  afterImage = "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453135933.jpg",
  title = "THE TRANSFORMATION DIVIDER",
  subtitle = "Drag to experience raw unfinished plaster transforming into burnished luxury."
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activeMode, setActiveMode] = useState("WARM");
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  const modeData = roomModes[activeMode];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Header Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        <div>
          <span className="meta-tag" style={{ marginBottom: '0.4rem' }}>
            DUAL-STATE INTERACTIVE VIEWER
          </span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
            {title}
          </h3>
        </div>

        {/* Spatial Atmosphere Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--ink-muted)',
              textTransform: 'uppercase',
              marginRight: '0.4rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem'
            }}
          >
            <SlidersHorizontal size={12} />
            Atmosphere:
          </span>
          {Object.keys(roomModes).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              data-cursor="PICK"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.1em',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                border: activeMode === mode ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                backgroundColor: activeMode === mode ? 'var(--accent)' : 'var(--surface-card)',
                color: activeMode === mode ? '#FFFFFF' : 'var(--ink-primary)',
                transition: 'all 0.25s ease'
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Main Drag Container */}
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          minHeight: '380px',
          overflow: 'hidden',
          borderRadius: 'var(--radius-xs)',
          cursor: 'ew-resize',
          userSelect: 'none',
          boxShadow: 'var(--shadow-dramatic)',
          border: '1px solid var(--border-subtle)'
        }}
        data-cursor="DRAG"
      >
        {/* Layer 1: AFTER / FINISHED SPACE (Base) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <img
            src={afterImage}
            alt="Transformed Space"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: modeData.filter,
              transition: 'filter 0.5s ease'
            }}
          />
          {/* Ambient Lighting Overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: modeData.lightingTint,
              pointerEvents: 'none',
              mixBlendMode: 'color-dodge',
              transition: 'background-color 0.5s ease'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              right: '1.5rem',
              backgroundColor: 'rgba(18, 18, 19, 0.75)',
              backdropFilter: 'blur(8px)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-xs)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              color: '#FFFFFF',
              zIndex: 3
            }}
          >
            FINISHED CRAFT • {modeData.label}
          </div>
        </div>

        {/* Layer 2: BEFORE / UNFINISHED SPACE (Clipped) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
          }}
        >
          <img
            src={beforeImage}
            alt="Unfinished Raw Space"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(60%) contrast(0.95)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              pointerEvents: 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              backgroundColor: 'rgba(18, 18, 19, 0.75)',
              backdropFilter: 'blur(8px)',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-xs)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              color: '#FFFFFF',
              zIndex: 3
            }}
          >
            RAW CONCRETE &amp; UNFINISHED
          </div>
        </div>

        {/* Divider Handle Line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            width: '2px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 0 12px rgba(0, 0, 0, 0.5)',
            transform: 'translateX(-50%)',
            zIndex: 10
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              color: '#1C1A18',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
              cursor: 'ew-resize',
              fontSize: '0.7rem',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)'
            }}
          >
            {Math.round(sliderPosition)}%
          </div>
        </div>

        {/* 100% Transformation Banner */}
        {sliderPosition >= 98 && (
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--accent)',
              color: '#FFFFFF',
              padding: '0.6rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.16em',
              fontWeight: 700,
              zIndex: 20,
              boxShadow: '0 8px 24px var(--accent-glow)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              animation: 'archFloat 3s ease-in-out infinite'
            }}
          >
            <Sparkles size={15} />
            <span>TRANSFORMATION COMPLETE</span>
          </div>
        )}
      </div>

      {/* Atmospheric Caption */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--ink-secondary)'
        }}
      >
        <span>{subtitle}</span>
        <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
          {sliderPosition < 15 ? 'ORIGINAL UNFINISHED' : sliderPosition > 85 ? 'FULLY TRANSFORMED' : 'TRANSFORMATION IN PROGRESS'}
        </span>
      </div>
    </div>
  );
};
