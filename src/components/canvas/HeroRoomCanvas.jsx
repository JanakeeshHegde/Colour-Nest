import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ArchitecturalRoom } from './ArchitecturalRoom';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

/**
 * ANIMATION 01 — CINEMATIC ROOM REVEAL CAMERA RIG
 * Starts with a clean architectural perspective, dollies smoothly forward on reveal,
 * introduces lighting gracefully, and responds to subtle mouse parallax.
 */
function HeroCameraRig({ mousePos, isMobile }) {
  const currentPos = useRef(new THREE.Vector3(0, 1.65, 8.2));
  const currentLookAt = useRef(new THREE.Vector3(0, 1.45, -1.5));
  const timeElapsed = useRef(0);

  useFrame((state, delta) => {
    timeElapsed.current += delta;

    // Subtle breathing parallax
    const idleSwayX = Math.sin(timeElapsed.current * 0.35) * 0.06;
    const idleSwayY = Math.cos(timeElapsed.current * 0.25) * 0.03;

    const targetX = isMobile ? 0 : mousePos.current.x * 0.35 + idleSwayX;
    const targetY = isMobile ? 0 : mousePos.current.y * 0.18 + idleSwayY;

    // Seated eye-level architectural perspective
    const destPos = new THREE.Vector3(targetX, 1.65 + targetY * 0.25, 8.2);
    const destLookAt = new THREE.Vector3(targetX * 0.12, 1.45, -1.5);

    currentPos.current.lerp(destPos, Math.min(1, delta * 2.8));
    currentLookAt.current.lerp(destLookAt, Math.min(1, delta * 2.8));

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLookAt.current);
  });

  return null;
}

export function HeroRoomCanvas({
  hasEntered = false,
  wallColorKey = 'ivory',
  floorKey = 'stone',
  woodKey = 'warm',
  ceilingPreset = 'LAYERED',
  lightMode = 'BALANCED',
  onHotspotClick = null,
  activeHotspot = null,
  showHotspots = true
}) {
  const mousePos = useRef({ x: 0, y: 0 });
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;

    const handleMouseMove = (e) => {
      if (isMobileRef.current) return;
      // Normalized between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mousePos.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <WebGLErrorBoundary>
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.06
          }}
          camera={{ position: [0, 1.65, 8.2], fov: 42, near: 0.1, far: 50 }}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <HeroCameraRig
            mousePos={mousePos}
            isMobile={isMobileRef.current}
          />

          <ArchitecturalRoom
            wallColorKey={wallColorKey}
            floorKey={floorKey}
            woodKey={woodKey}
            ceilingPreset={ceilingPreset}
            lightMode={lightMode}
            onHotspotClick={onHotspotClick}
            activeHotspot={activeHotspot}
            showHotspots={showHotspots}
          />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}

export default HeroRoomCanvas;
