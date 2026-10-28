import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';
import { ArchitecturalRoom } from './ArchitecturalRoom';

function ProgressiveWireframeMesh({ currentStep = 1 }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  // Wireframe stages
  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Ground Grid lines (always present from Step 1) */}
      <gridHelper args={[8, 16, '#B85C38', '#444444']} position={[0, -1.2, 0]} />

      {/* STEP 1: Spatial Bounding Wireframe Cube */}
      {currentStep >= 1 && (
        <group position={[0, 0.4, 0]}>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(4.8, 3.2, 4.0)]} />
            <lineBasicMaterial
              color={currentStep === 1 ? '#B85C38' : '#666666'}
              linewidth={1.5}
            />
          </lineSegments>
        </group>
      )}

      {/* STEP 2: Laser Measurement Dimension Nodes */}
      {currentStep >= 2 && (
        <group>
          {[-2.4, 2.4].map((x, i) =>
            [-1.6, 1.6].map((y, j) => (
              <mesh key={`${i}-${j}`} position={[x, y + 0.4, 2.0]}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshBasicMaterial color="#FFB020" />
              </mesh>
            ))
          )}
        </group>
      )}

      {/* STEP 3 & 4: Partial Wall Panels & Drop Ceiling Soffit Wireframe */}
      {currentStep >= 3 && currentStep < 6 && (
        <group position={[0, 0.4, 0]}>
          {/* Back Wall Plane */}
          <mesh position={[0, 0, -1.95]}>
            <planeGeometry args={[4.6, 3.0]} />
            <meshStandardMaterial
              color="#3A3C3E"
              wireframe={currentStep < 5}
              roughness={0.8}
            />
          </mesh>
          {/* Ceiling Drop Soffit */}
          <mesh position={[0, 1.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.6, 2.8]} />
            <meshStandardMaterial
              color="#55585B"
              wireframe={currentStep < 5}
            />
          </mesh>
        </group>
      )}

      {/* STEP 5 & 6: Fully Rendered Materialized Space Mini-Scene */}
      {currentStep >= 6 && (
        <group scale={[0.5, 0.5, 0.5]} position={[0, -0.6, 0]}>
          <ArchitecturalRoom
            wallColorKey="clay"
            floorKey="stone"
            woodKey="warm"
            ceilingPreset="LAYERED"
            lightMode="evening"
            transProgress={100}
            showHotspots={false}
          />
        </group>
      )}
    </group>
  );
}

export function ProcessWireframeCanvas({ currentStep = 1 }) {
  return (
    <WebGLErrorBoundary>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
          camera={{ position: [5.2, 4.0, 6.8], fov: 42 }}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} />
          <ProgressiveWireframeMesh currentStep={currentStep} />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
