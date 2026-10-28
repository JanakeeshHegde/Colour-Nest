import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';
import {
  getPlasterTexture,
  getWoodTexture,
  getStoneTexture,
  getFabricTexture
} from '../../utils/proceduralTextures';

const TEXTURE_PRESETS = {
  stucco: {
    name: 'Venetian Stucco Plaster',
    color: '#EDE8DF',
    roughness: 0.12,
    metalness: 0.0,
    bumpScale: 0.06,
    clearcoat: 0.8,
    clearcoatRoughness: 0.15,
    type: 'plaster'
  },
  anticco: {
    name: 'Anticco Aged Stone',
    color: '#D4C6B2',
    roughness: 0.68,
    metalness: 0.02,
    bumpScale: 0.11,
    clearcoat: 0.0,
    clearcoatRoughness: 0.8,
    type: 'stone'
  },
  'royals-play': {
    name: 'Royals Play Metallic Glaze',
    color: '#A06E55',
    roughness: 0.32,
    metalness: 0.62,
    bumpScale: 0.04,
    clearcoat: 0.5,
    clearcoatRoughness: 0.25,
    type: 'fabric'
  },
  wood: {
    name: 'Teak Wood & Natural Melamyne',
    color: '#BA9265',
    roughness: 0.35,
    metalness: 0.0,
    bumpScale: 0.03,
    clearcoat: 0.2,
    clearcoatRoughness: 0.4,
    type: 'wood'
  },
  polycoat: {
    name: 'Polycoat High-Gloss Crystal',
    color: '#65381D',
    roughness: 0.08,
    metalness: 0.05,
    bumpScale: 0.015,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    type: 'wood-dark'
  }
};

/**
 * Tactile Material Plate Mesh
 */
function TactileSurfaceMesh({ presetKey, lightX, lightY }) {
  const meshRef = useRef();
  const spotLightRef = useRef();
  const preset = TEXTURE_PRESETS[presetKey] || TEXTURE_PRESETS.stucco;

  const bumpTex = useMemo(() => {
    if (preset.type === 'stone') return getStoneTexture('stone');
    if (preset.type === 'wood') return getWoodTexture('natural');
    if (preset.type === 'wood-dark') return getWoodTexture('polished');
    if (preset.type === 'fabric') return getFabricTexture();
    return getPlasterTexture();
  }, [preset.type]);

  useFrame((state, delta) => {
    // Dynamically position grazing spotlight based on lightX and lightY (-1 to 1)
    if (spotLightRef.current) {
      const targetX = lightX * 3.5;
      const targetY = lightY * 3.5;
      spotLightRef.current.position.x = THREE.MathUtils.lerp(
        spotLightRef.current.position.x,
        targetX,
        delta * 6
      );
      spotLightRef.current.position.y = THREE.MathUtils.lerp(
        spotLightRef.current.position.y,
        targetY,
        delta * 6
      );
    }
  });

  return (
    <group>
      {/* Grazing Movable Spotlight */}
      <spotLight
        ref={spotLightRef}
        position={[lightX * 3.5, lightY * 3.5, 2.5]}
        color="#FFF9ED"
        intensity={2.8}
        angle={Math.PI / 3.2}
        penumbra={0.6}
        castShadow
        shadow-bias={-0.001}
      />

      {/* Fill Light for subtle contrast */}
      <ambientLight color="#FFFFFF" intensity={0.5} />
      <directionalLight position={[-3, -2, 1.5]} color="#D4E4F7" intensity={0.4} />

      {/* Main Architectural Tactile Plate */}
      <mesh ref={meshRef} position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.2, 2.4, 0.15]} />
        <meshPhysicalMaterial
          color={preset.color}
          roughness={preset.roughness}
          metalness={preset.metalness}
          map={bumpTex}
          bumpMap={bumpTex}
          bumpScale={preset.bumpScale}
          clearcoat={preset.clearcoat}
          clearcoatRoughness={preset.clearcoatRoughness}
        />
      </mesh>

      {/* Plinth Shadow Backing */}
      <mesh position={[0, 0, -0.1]} receiveShadow>
        <boxGeometry args={[3.3, 2.5, 0.05]} />
        <meshStandardMaterial color="#141516" roughness={0.7} />
      </mesh>
    </group>
  );
}

export function TextureShowcaseCanvas({ presetKey = 'stucco' }) {
  const [lightPos, setLightPos] = React.useState({ x: 0.4, y: 0.5 });
  const containerRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setLightPos({ x, y });
  };

  return (
    <WebGLErrorBoundary>
      <div
        ref={containerRef}
        onMouseMove={handlePointerMove}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          cursor: 'default',
          overflow: 'hidden'
        }}
      >
        <Canvas
          shadows
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1
          }}
          camera={{ position: [0, 0, 3.8], fov: 45 }}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <TactileSurfaceMesh
            presetKey={presetKey}
            lightX={lightPos.x}
            lightY={lightPos.y}
          />
        </Canvas>

        {/* Ambient Overlay Hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            backgroundColor: 'rgba(18, 18, 19, 0.8)',
            backdropFilter: 'blur(8px)',
            padding: '0.4rem 0.85rem',
            borderRadius: '6px',
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.7)',
            pointerEvents: 'none'
          }}
        >
          MOVE CURSOR TO DIRECT LIGHT GRAZE (X: {lightPos.x.toFixed(2)}, Y: {lightPos.y.toFixed(2)})
        </div>
      </div>
    </WebGLErrorBoundary>
  );
}
