import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ArchitecturalRoom } from './ArchitecturalRoom';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

// Camera position & mood mapping based on hovered navigation route
const ROUTE_CAMERA_PRESETS = {
  '/': { pos: [0, 2.5, 7.5], look: [0, 2.0, -1.0], wall: 'clay', light: 'evening' },
  '/about': { pos: [-2.0, 2.4, 4.0], look: [-1.0, 2.2, -2.0], wall: 'sand', light: 'day' },
  '/services': { pos: [0, 2.2, 5.0], look: [0, 1.8, -2.5], wall: 'clay', light: 'day' },
  '/projects': { pos: [2.5, 2.0, 3.5], look: [3.8, 2.2, -4.5], wall: 'charcoal', light: 'night' },
  '/space-studio': { pos: [0, 2.4, 5.2], look: [0, 1.9, -2.0], wall: 'clay', light: 'evening' },
  '/materials': { pos: [-2.5, 2.5, 0.5], look: [-2.5, 2.5, -5.5], wall: 'sand', light: 'day' },
  '/colour-studio': { pos: [-1.5, 2.2, 3.8], look: [-2.5, 2.4, -5.0], wall: 'sage', light: 'morning' },
  '/texture-lab': { pos: [-3.0, 2.5, -0.5], look: [-3.0, 2.5, -5.5], wall: 'clay', light: 'day' },
  '/process': { pos: [3.0, 3.2, 4.5], look: [0, 2.0, -1.0], wall: 'sand', light: 'evening' },
  '/gallery': { pos: [1.5, 2.2, 4.5], look: [0, 1.9, -2.5], wall: 'charcoal', light: 'night' },
  '/contact': { pos: [-4.5, 2.6, 2.0], look: [-7.0, 2.6, 0], wall: 'clay', light: 'evening' }
};

function NavCameraRig({ hoveredRoute }) {
  const currentPos = useRef(new THREE.Vector3(...ROUTE_CAMERA_PRESETS['/'].pos));
  const currentLook = useRef(new THREE.Vector3(...ROUTE_CAMERA_PRESETS['/'].look));

  const targetConfig = ROUTE_CAMERA_PRESETS[hoveredRoute] || ROUTE_CAMERA_PRESETS['/'];

  useFrame((state, delta) => {
    const destPos = new THREE.Vector3(...targetConfig.pos);
    const destLook = new THREE.Vector3(...targetConfig.look);

    currentPos.current.lerp(destPos, delta * 3.0);
    currentLook.current.lerp(destLook, delta * 3.0);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLook.current);
  });

  return null;
}

export function NavigationCanvas({ hoveredRoute = '/' }) {
  const targetConfig = ROUTE_CAMERA_PRESETS[hoveredRoute] || ROUTE_CAMERA_PRESETS['/'];

  return (
    <WebGLErrorBoundary>
      <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, opacity: 0.65 }}>
        <Canvas
          shadows
          dpr={[1, 1.25]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.95
          }}
          camera={{ position: ROUTE_CAMERA_PRESETS['/'].pos, fov: 46 }}
          style={{ width: '100%', height: '100%' }}
        >
          <NavCameraRig hoveredRoute={hoveredRoute} />

          <ArchitecturalRoom
            wallColorKey={targetConfig.wall}
            floorKey="stone"
            woodKey="warm"
            ceilingPreset="LAYERED"
            lightMode={targetConfig.light}
            transProgress={100}
            showHotspots={false}
          />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
