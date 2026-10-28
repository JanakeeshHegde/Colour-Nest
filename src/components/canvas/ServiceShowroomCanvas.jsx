import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ArchitecturalRoom } from './ArchitecturalRoom';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

// Camera focal coordinates for each service discipline
const SERVICE_FOCAL_TARGETS = {
  ALL: { pos: [0, 2.4, 5.8], look: [0, 1.8, -2.5], light: 'day' },
  INTERIORS: { pos: [0, 2.1, 5.0], look: [0, 1.7, -2.2], light: 'day' },
  WOOD: { pos: [2.9, 1.8, -1.2], look: [4.6, 2.2, -5.2], light: 'day' },
  LIGHTING: { pos: [-3.0, 2.5, 0.8], look: [-6.8, 2.6, 0], light: 'evening' },
  CEILING: { pos: [0, 3.4, 0.2], look: [0, 5.2, -1.5], light: 'evening' },
  TEXTURE: { pos: [-2.2, 2.5, 0.4], look: [-2.2, 2.5, -5.5], light: 'day' },
  PAINT: { pos: [-1.2, 2.4, 1.5], look: [-2.0, 2.4, -5.5], light: 'morning' },
  EXTERIOR: { pos: [-4.5, 2.5, 1.0], look: [-7.5, 2.6, 0], light: 'morning' }
};

function ServiceFocalCamera({ activeCategory }) {
  const currentPos = useRef(new THREE.Vector3(...SERVICE_FOCAL_TARGETS.ALL.pos));
  const currentLook = useRef(new THREE.Vector3(...SERVICE_FOCAL_TARGETS.ALL.look));

  const targetConfig = SERVICE_FOCAL_TARGETS[activeCategory] || SERVICE_FOCAL_TARGETS.ALL;

  useFrame((state, delta) => {
    const destPos = new THREE.Vector3(...targetConfig.pos);
    const destLook = new THREE.Vector3(...targetConfig.look);

    currentPos.current.lerp(destPos, delta * 3.5);
    currentLook.current.lerp(destLook, delta * 3.5);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLook.current);
  });

  return null;
}

export function ServiceShowroomCanvas({ activeCategory = 'ALL' }) {
  const targetConfig = SERVICE_FOCAL_TARGETS[activeCategory] || SERVICE_FOCAL_TARGETS.ALL;

  return (
    <WebGLErrorBoundary>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1
          }}
          camera={{ position: SERVICE_FOCAL_TARGETS.ALL.pos, fov: 44 }}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <ServiceFocalCamera activeCategory={activeCategory} />

          <ArchitecturalRoom
            wallColorKey="clay"
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
