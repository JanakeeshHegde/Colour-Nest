import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';
import {
  getPlasterTexture,
  getWoodTexture,
  getStoneTexture,
  getFabricTexture
} from '../../utils/proceduralTextures';

export const MATERIAL_SLABS = [
  {
    id: 'stucco',
    category: 'TEXTURE',
    name: 'Venetian Stucco Plaster',
    origin: 'Italian Slaked Lime Putty',
    roughness: 0.12,
    metalness: 0.0,
    color: '#E4DFD5',
    bumpScale: 0.05,
    textureType: 'plaster',
    spec: '0.8mm System • High-Burnish Spatula Sheen • Zero VOC'
  },
  {
    id: 'anticco',
    category: 'TEXTURE',
    name: 'Anticco Heritage Stone',
    origin: 'Tuscan Coarse Lime Aggregate',
    roughness: 0.65,
    metalness: 0.02,
    color: '#CDBFA9',
    bumpScale: 0.09,
    textureType: 'stone',
    spec: '2.0mm High Relief • Grazing Micro-Shadows • Class A1 Fire'
  },
  {
    id: 'royals-play',
    category: 'PAINT',
    name: 'Royals Play Metallic Glaze',
    origin: 'Artisan Mica Pearl & Copolymer',
    roughness: 0.35,
    metalness: 0.55,
    color: '#8E644E',
    bumpScale: 0.03,
    textureType: 'fabric',
    spec: 'Light-Shifting Metallic Mica • Washable Acrylic Film'
  },
  {
    id: 'teak-pu',
    category: 'WOOD',
    name: 'Burma Teak & PU Crystal',
    origin: 'Natural Heartwood + Polyurethane',
    roughness: 0.15,
    metalness: 0.0,
    color: '#9E5B2E',
    bumpScale: 0.02,
    textureType: 'wood-warm',
    spec: '2-Pack Non-Yellowing Crystal Polycoat • High-Scratch Seal'
  },
  {
    id: 'white-oak',
    category: 'WOOD',
    name: 'European White Oak Veneer',
    origin: 'Quarter-Sawn Natural Grain',
    roughness: 0.38,
    metalness: 0.0,
    color: '#C6A47B',
    bumpScale: 0.025,
    textureType: 'wood-natural',
    spec: 'Grain-Open Matt Melamyne Seal • Low-Gloss Warmth'
  },
  {
    id: 'wallpaper',
    category: 'WALLPAPER',
    name: 'Seamless Botanical Grasscloth',
    origin: 'Natural Plant Fibres on Woven Backing',
    roughness: 0.78,
    metalness: 0.0,
    color: '#DBD2C4',
    bumpScale: 0.04,
    textureType: 'fabric',
    spec: 'Precision Plumb Match • Breathable Acoustic Dampening'
  },
  {
    id: 'gypsum-cove',
    category: 'CEILING',
    name: 'Laser-Drop Gypsum Soffit',
    origin: 'Dense Core Gypsum + Mineral Binder',
    roughness: 0.9,
    metalness: 0.0,
    color: '#FAF8F5',
    bumpScale: 0.01,
    textureType: 'plaster',
    spec: 'Laser-Calibrated Flatness • Hidden 3000K LED Grazing Channel'
  }
];

/**
 * Individual Floating 3D Material Slab
 */
function MaterialSlabMesh({
  slab,
  position,
  rotation,
  isSelected,
  onHover,
  onClick,
  textures
}) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Pick texture based on slab config
  const mapTexture = useMemo(() => {
    if (slab.textureType.startsWith('wood')) {
      return slab.textureType === 'wood-natural' ? textures.woodNatural : textures.woodWarm;
    }
    if (slab.textureType === 'stone') return textures.stone;
    if (slab.textureType === 'fabric') return textures.fabric;
    return textures.plaster;
  }, [slab.textureType, textures]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Gentle float idle bobbing
    const time = state.clock.getElapsedTime();
    const idleY = position[1] + Math.sin(time * 1.5 + position[0]) * 0.08;

    // When hovered: pulls toward camera on Z and floats slightly higher
    const targetZ = hovered || isSelected ? position[2] + 0.5 : position[2];
    const targetY = hovered || isSelected ? idleY + 0.15 : idleY;
    const targetRotX = hovered || isSelected ? rotation[0] - 0.12 : rotation[0];
    const targetRotY = hovered || isSelected ? rotation[1] + (hovered ? 0.15 : 0) : rotation[1];

    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, delta * 4);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, delta * 4);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, delta * 4);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, delta * 4);
  });

  return (
    <group position={[position[0], 0, 0]}>
      <mesh
        ref={meshRef}
        position={[0, position[1], position[2]]}
        rotation={rotation}
        castShadow
        receiveShadow
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover && onHover(slab);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover && onHover(null);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick(slab);
        }}
      >
        {/* Architectural Slab Form (Rectangular panel with depth) */}
        <boxGeometry args={[1.3, 1.85, 0.08]} />
        <meshStandardMaterial
          color={slab.color}
          roughness={slab.roughness}
          metalness={slab.metalness}
          map={mapTexture}
          bumpMap={mapTexture}
          bumpScale={slab.bumpScale}
        />

        {/* Subtle Brass Beveled Edge Framing */}
        <mesh position={[0, 0, -0.045]}>
          <boxGeometry args={[1.34, 1.89, 0.02]} />
          <meshStandardMaterial color="#211E1C" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Metadata Floating Badge */}
        {hovered && (
          <Html position={[0, -1.2, 0.1]} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
            <div
              style={{
                backgroundColor: 'rgba(18, 18, 19, 0.95)',
                border: '1px solid var(--accent, #B85C38)',
                backdropFilter: 'blur(12px)',
                padding: '8px 14px',
                borderRadius: '8px',
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                textAlign: 'center'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '9px',
                  letterSpacing: '0.15em',
                  color: 'var(--accent, #B85C38)',
                  display: 'block'
                }}
              >
                {slab.category}
              </span>
              <div style={{ fontWeight: 700, fontSize: '12px', marginTop: '2px' }}>{slab.name}</div>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                CLICK TO INSPECT SURFACE
              </div>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}

export function MaterialShowroomCanvas({
  selectedSlab = null,
  onSelectSlab = null,
  filterCategory = 'ALL'
}) {
  const [hoveredSlab, setHoveredSlab] = useState(null);

  // Textures
  const textures = useMemo(() => {
    return {
      plaster: getPlasterTexture(),
      woodWarm: getWoodTexture('warm'),
      woodNatural: getWoodTexture('natural'),
      stone: getStoneTexture('stone'),
      fabric: getFabricTexture()
    };
  }, []);

  const filteredSlabs = useMemo(() => {
    if (filterCategory === 'ALL') return MATERIAL_SLABS;
    return MATERIAL_SLABS.filter((s) => s.category === filterCategory);
  }, [filterCategory]);

  return (
    <WebGLErrorBoundary>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15
          }}
          camera={{ position: [0, 0.2, 5.8], fov: 45 }}
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          {/* Studio Lighting */}
          <ambientLight color="#FFFFFF" intensity={0.9} />
          <directionalLight
            position={[4, 5, 5]}
            color="#FFF6E8"
            intensity={2.0}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-4, 3, 3]} color="#D4E6FA" intensity={0.8} />

          {/* Slabs positioned in a shallow panoramic arc */}
          <group position={[0, 0, 0]}>
            {filteredSlabs.map((slab, idx) => {
              const total = filteredSlabs.length;
              const spacing = 1.6;
              const xPos = (idx - (total - 1) / 2) * spacing;
              // Arc curvature on Z
              const zPos = -Math.pow(Math.abs(xPos) * 0.35, 1.8);
              // Slight rotation inward toward center camera
              const yRot = -xPos * 0.08;

              return (
                <MaterialSlabMesh
                  key={slab.id}
                  slab={slab}
                  position={[xPos, 0, zPos]}
                  rotation={[0, yRot, 0]}
                  isSelected={selectedSlab?.id === slab.id}
                  onHover={(s) => setHoveredSlab(s)}
                  onClick={(s) => onSelectSlab && onSelectSlab(s)}
                  textures={textures}
                />
              );
            })}
          </group>

          {/* Architectural Floor Shadow Plane */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} receiveShadow>
            <planeGeometry args={[20, 14]} />
            <shadowMaterial opacity={0.25} />
          </mesh>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
