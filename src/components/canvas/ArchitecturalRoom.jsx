import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  getPlasterTexture,
  getWoodTexture,
  getStoneTexture,
  getFabricTexture
} from '../../utils/proceduralTextures';
import {
  WALL_COLORS,
  FLOOR_PRESETS,
  WOOD_FINISHES,
  LIGHTING_PRESETS,
  DEFAULT_SURFACES_STATE
} from '../../data/roomStudioConfig';

// Re-export constants for backward compatibility
export { WALL_COLORS, FLOOR_PRESETS, WOOD_FINISHES };
export const ROOM_PRESETS = {
  LIVING: {
    id: 'LIVING',
    name: 'Living Pavilion',
    subtitle: 'Contemporary residential pavilion with fluted timber, floating credenza & lounge seating',
    serviceCategory: 'SPACE & INTERIORS'
  },
  BEDROOM: {
    id: 'BEDROOM',
    name: 'Master Suite',
    subtitle: 'Serene Japandi master suite with integrated acoustic timber headboard & floating nightstands',
    serviceCategory: 'INTERIORS'
  },
  KITCHEN: {
    id: 'KITCHEN',
    name: 'Culinary Studio',
    subtitle: 'Architectural kitchen with honed waterfall island & linear illumination',
    serviceCategory: 'CUSTOMISED INTERIORS'
  },
  COMMERCIAL: {
    id: 'COMMERCIAL',
    name: 'Commercial Space',
    subtitle: 'Executive collaborative boardroom with acoustic baffles & presentation wall',
    serviceCategory: 'COMMERCIAL INTERIORS'
  }
};

// Legacy lighting mode mapping for compatibility
export const LIGHT_MODES = {
  morning: LIGHTING_PRESETS['SOFT DAYLIGHT'],
  day: LIGHTING_PRESETS['BALANCED'],
  evening: LIGHTING_PRESETS['WARM EVENING'],
  night: {
    id: 'night',
    name: 'Dramatic Night',
    ambientColor: '#171520',
    ambientIntensity: 0.35,
    sunColor: '#4A5C7A',
    sunIntensity: 0.4,
    sunPos: [-10, 4, 3],
    coveIntensity: 2.2,
    skyColor: '#0E0D14',
    pointFillIntensity: 1.0
  }
};

/**
 * ANIMATED SURFACE MATERIAL (ANIMATION 02 — MATERIAL APPLICATION)
 * Handles smooth color transition and gentle luminous sheen pulse when updated.
 */
function useAnimatedSurfaceMaterial({
  color,
  roughness = 0.85,
  metalness = 0.0,
  map = null,
  bumpMap = null,
  bumpScale = 0.03,
  isSelected = false,
  isHovered = false
}) {
  const materialRef = useRef();
  const targetColor = useMemo(() => new THREE.Color(color), [color]);
  const currentColor = useRef(new THREE.Color(color));
  const sheenProgress = useRef(0);
  const prevColorHex = useRef(color);

  // Trigger material application sheen sweep on color change
  useEffect(() => {
    if (prevColorHex.current !== color) {
      sheenProgress.current = 1.0; // Trigger sheen pulse
      prevColorHex.current = color;
    }
  }, [color]);

  useFrame((_, delta) => {
    if (!materialRef.current) return;

    // Smoothly lerp material color towards target color (Animation 02)
    currentColor.current.lerp(targetColor, Math.min(1, delta * 5.0));
    materialRef.current.color.copy(currentColor.current);

    // Fade sheen pulse
    if (sheenProgress.current > 0) {
      sheenProgress.current = Math.max(0, sheenProgress.current - delta * 2.2);
    }

    // Striking selection & hover visual feedback
    const baseEmissive = isSelected ? 0.28 : isHovered ? 0.10 : 0.0;
    const sheenAdd = sheenProgress.current * 0.16;
    const totalEmissive = baseEmissive + sheenAdd;

    materialRef.current.emissive.set(isSelected ? '#E3D9A4' : '#FAF8F2');
    materialRef.current.emissiveIntensity = totalEmissive;
  });

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: currentColor.current,
      roughness,
      metalness,
      map,
      bumpMap,
      bumpScale,
      emissive: new THREE.Color('#3C2D8C'),
      emissiveIntensity: 0
    });
    materialRef.current = mat;
    return mat;
  }, [roughness, metalness, map, bumpMap, bumpScale]);

  return material;
}

/**
 * 3D Hotspot Interactive Marker with Raycasting and Expandable Tooltip
 */
function HotspotMarker({ position, label, sublabel, onClick, active }) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef();

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.2;
    }
  });

  const pinNumber = label.slice(0, 2);

  return (
    <group position={position}>
      {/* 3D Pulsing Ring */}
      <mesh
        ref={ringRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick();
        }}
      >
        <ringGeometry args={[0.065, 0.095, 24]} />
        <meshBasicMaterial
          color={active ? '#E3D9A4' : '#3C2D8C'}
          transparent
          opacity={hovered ? 1 : 0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Minimalist Pin / Tooltip */}
      <Html
        position={[0, 0, 0]}
        center
        distanceFactor={9}
        zIndexRange={[100, 0]}
        style={{ pointerEvents: 'auto' }}
      >
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onClick && onClick();
          }}
          style={{
            transform: hovered || active ? 'scale(1.08)' : 'scale(1)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: active
              ? 'rgba(60, 45, 140, 0.96)'
              : hovered
              ? 'rgba(33, 29, 45, 0.96)'
              : 'rgba(33, 29, 45, 0.85)',
            border: active
              ? '1.5px solid #E3D9A4'
              : hovered
              ? '1px solid #FAF8F2'
              : '1px solid rgba(227, 217, 164, 0.45)',
            backdropFilter: 'blur(8px)',
            borderRadius: hovered || active ? '4px' : '50%',
            padding: hovered || active ? '3px 8px' : '0',
            width: hovered || active ? 'auto' : '22px',
            height: hovered || active ? 'auto' : '22px',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
            whiteSpace: 'nowrap'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '9px',
              fontWeight: 700,
              color: active ? '#E3D9A4' : '#FFFFFF',
              letterSpacing: '0.04em'
            }}
          >
            {pinNumber}
          </span>

          {(hovered || active) && (
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '8.5px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '0.08em'
                }}
              >
                {label.replace(/^\d+\s*•\s*/, '')}
              </div>
              {sublabel && (
                <div
                  style={{
                    fontSize: '7.5px',
                    color: active ? '#E3D9A4' : '#C8C5D0',
                    letterSpacing: '0.06em'
                  }}
                >
                  {sublabel}
                </div>
              )}
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

/**
 * Architectural Fluted Timber Wall Slats (wood-panel)
 */
function FlutedWoodPanel({
  position,
  width,
  height,
  slatsCount = 24,
  woodMaterial,
  isSelected,
  isHovered,
  onSelect
}) {
  const slatWidth = width / (slatsCount * 1.8);
  const slatSpacing = width / slatsCount;

  const slats = useMemo(() => {
    const items = [];
    const startX = -width / 2 + slatWidth / 2;
    for (let i = 0; i < slatsCount; i++) {
      items.push(startX + i * slatSpacing);
    }
    return items;
  }, [width, slatsCount, slatSpacing, slatWidth]);

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect && onSelect('wood-panel');
      }}
    >
      {/* Backing Sheet */}
      <mesh position={[0, 0, -0.02]} receiveShadow>
        <boxGeometry args={[width, height, 0.02]} />
        <meshStandardMaterial color="#1E1914" roughness={0.9} />
      </mesh>

      {/* Individual Vertical Fluted Slats */}
      {slats.map((xPos, idx) => (
        <mesh
          key={idx}
          position={[xPos, 0, 0.015]}
          castShadow
          receiveShadow
          material={woodMaterial}
        >
          <boxGeometry args={[slatWidth, height, 0.03]} />
        </mesh>
      ))}

      {/* Selection Framing Reveal */}
      {(isSelected || isHovered) && (
        <mesh position={[0, 0, 0.035]}>
          <boxGeometry args={[width + 0.02, height + 0.02, 0.005]} />
          <meshBasicMaterial
            color={isSelected ? '#E3D9A4' : '#3C2D8C'}
            wireframe
            transparent
            opacity={0.65}
          />
        </mesh>
      )}
    </group>
  );
}

/**
 * Modern Minimalist Floating Credenza (cabinet-main)
 */
function ModernCredenza({ position, woodMaterial, isSelected, isHovered, onSelect }) {
  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect && onSelect('cabinet-main');
      }}
    >
      {/* Main Cabinet Box */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow material={woodMaterial}>
        <boxGeometry args={[4.4, 0.65, 0.7]} />
      </mesh>

      {/* Door Reveal Shadow Grooves */}
      {[-1.46, 0, 1.46].map((x, i) => (
        <mesh key={i} position={[x, 0.45, 0.355]}>
          <boxGeometry args={[0.012, 0.63, 0.01]} />
          <meshBasicMaterial color="#181410" />
        </mesh>
      ))}

      {/* Minimalist Brass Handles */}
      {[-1.8, -0.4, 0.4, 1.8].map((x, i) => (
        <mesh key={i} position={[x, 0.62, 0.365]} castShadow>
          <boxGeometry args={[0.015, 0.12, 0.015]} />
          <meshStandardMaterial color="#E3D9A4" metalness={0.85} roughness={0.2} />
        </mesh>
      ))}

      {/* Brass Plinth Cylindrical Feet */}
      {[
        [-1.9, 0.06, 0.25],
        [1.9, 0.06, 0.25],
        [-1.9, 0.06, -0.25],
        [1.9, 0.06, -0.25],
        [0, 0.06, 0]
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.12, 12]} />
          <meshStandardMaterial color="#E3D9A4" metalness={0.85} roughness={0.2} />
        </mesh>
      ))}

      {/* Decorative Ceramic Vase on Credenza */}
      <group position={[-1.2, 0.9, 0.05]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.14, 0.26, 20]} />
          <meshStandardMaterial color="#FAF8F2" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.26, 0]} rotation={[0.1, 0, 0.15]}>
          <cylinderGeometry args={[0.005, 0.005, 0.35, 6]} />
          <meshBasicMaterial color="#7D6F61" />
        </mesh>
      </group>

      {/* Monograph Books on Credenza */}
      <group position={[1.3, 0.8, -0.05]} rotation={[0, 0.08, 0]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.36, 0.045, 0.48]} />
          <meshStandardMaterial color="#211D2D" roughness={0.6} />
        </mesh>
        <mesh position={[0.02, 0.05, -0.01]} castShadow rotation={[0, -0.06, 0]}>
          <boxGeometry args={[0.34, 0.04, 0.44]} />
          <meshStandardMaterial color="#FAF8F2" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * Architectural Lounge Chair
 */
function ArchitecturalLoungeChair({ position, rotation, fabricMaterial }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Seat Cushion */}
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow material={fabricMaterial}>
        <boxGeometry args={[1.1, 0.28, 1.1]} />
      </mesh>
      {/* Backrest Cushion */}
      <mesh position={[0, 0.65, -0.42]} castShadow receiveShadow material={fabricMaterial}>
        <boxGeometry args={[1.1, 0.45, 0.24]} />
      </mesh>
      {/* Left & Right Armrests */}
      <mesh position={[-0.45, 0.48, 0]} castShadow receiveShadow material={fabricMaterial}>
        <boxGeometry args={[0.2, 0.25, 1.0]} />
      </mesh>
      <mesh position={[0.45, 0.48, 0]} castShadow receiveShadow material={fabricMaterial}>
        <boxGeometry args={[0.2, 0.25, 1.0]} />
      </mesh>
      {/* Plinth Base */}
      <mesh position={[0, 0.09, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.16, 1.05]} />
        <meshStandardMaterial color="#211D2D" roughness={0.5} />
      </mesh>
    </group>
  );
}

/**
 * Sculptural Travertine Coffee Table with Decorative Dish
 */
function CoffeeTable({ position }) {
  return (
    <group position={position}>
      {/* Cylindrical Fluted Pedestal */}
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.76, 0.8, 0.28, 36]} />
        <meshStandardMaterial color="#E8DFD1" roughness={0.38} metalness={0.02} />
      </mesh>
      {/* Ceramic Dish on Table */}
      <mesh position={[0.1, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.03, 24]} />
        <meshStandardMaterial color="#211D2D" roughness={0.65} />
      </mesh>
    </group>
  );
}

/**
 * Architectural Floor Lamp with Arched Brass Arm & Linen Diffuser
 */
function FloorLamp({ position }) {
  return (
    <group position={position}>
      {/* Heavy Marble Plinth Base */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.22, 0.1, 24]} />
        <meshStandardMaterial color="#1E1C24" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Vertical Brass Stem */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <cylinderGeometry args={[0.015, 0.015, 2.4, 12]} />
        <meshStandardMaterial color="#E3D9A4" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Arched Overhang Rod */}
      <mesh position={[0.25, 2.45, 0]} rotation={[0, 0, -0.45]} castShadow>
        <cylinderGeometry args={[0.012, 0.012, 0.8, 12]} />
        <meshStandardMaterial color="#E3D9A4" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Cylindrical Linen Shade */}
      <mesh position={[0.5, 2.25, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 0.32, 24]} />
        <meshStandardMaterial color="#FAF8F2" roughness={0.85} />
      </mesh>
      {/* Warm Ambient Lamp Point Light */}
      <pointLight position={[0.5, 2.1, 0]} color="#FFE6B8" intensity={1.1} distance={4.5} decay={2} />
    </group>
  );
}

/**
 * Potted Architectural Plant (Fiddle-Leaf Ficus in Terracotta Planter)
 */
function IndoorPlant({ position }) {
  return (
    <group position={position}>
      {/* Terracotta Planter Pot */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.24, 0.18, 0.6, 20]} />
        <meshStandardMaterial color="#B85C38" roughness={0.85} />
      </mesh>
      {/* Plant Trunk */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.02, 0.025, 0.6, 8]} />
        <meshStandardMaterial color="#4A3B32" roughness={0.9} />
      </mesh>
      {/* Sculptural Broad Green Leaves */}
      {[
        { y: 0.8, r: [0.3, 0.5, 0], scale: [0.32, 0.02, 0.22] },
        { y: 0.95, r: [-0.2, 1.8, 0.2], scale: [0.35, 0.02, 0.24] },
        { y: 1.1, r: [0.4, 3.2, -0.3], scale: [0.38, 0.02, 0.25] },
        { y: 1.25, r: [-0.3, 4.5, 0.1], scale: [0.36, 0.02, 0.23] }
      ].map((leaf, i) => (
        <mesh key={i} position={[0, leaf.y, 0]} rotation={leaf.r} castShadow>
          <boxGeometry args={leaf.scale} />
          <meshStandardMaterial color="#3B533E" roughness={0.65} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Architectural Doorway on Right Wall
 */
function DoorwayEntrance({ position, isSelected, isHovered, onSelect }) {
  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect && onSelect('wall-right');
      }}
    >
      {/* Door Frame Surround (Jamb & Casing) */}
      <mesh position={[0, 1.22, 0]}>
        <boxGeometry args={[0.12, 2.45, 1.3]} />
        <meshStandardMaterial color="#1E1C24" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Inner Recessed Door Opening */}
      <mesh position={[-0.01, 1.2, 0]}>
        <boxGeometry args={[0.08, 2.4, 1.18]} />
        <meshStandardMaterial color="#262232" roughness={0.5} />
      </mesh>
      {/* Warm Corridor Ambient Light Leaking from Doorway */}
      <pointLight position={[0.3, 1.5, 0]} color="#FFE8CC" intensity={0.8} distance={3.5} decay={2} />
    </group>
  );
}

/**
 * Floor-to-Ceiling Window with Bronze Frames and Bright Horizon Vista
 */
function ArchitecturalWindow({ skyColor = '#E8F2FC' }) {
  return (
    <group position={[-6.9, 1.65, 0]} rotation={[0, Math.PI / 2, 0]}>
      {/* Bronze Window Frames */}
      <mesh position={[-3.2, 0, 0]}>
        <boxGeometry args={[0.2, 3.1, 0.3]} />
        <meshStandardMaterial color="#211D2D" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[3.2, 0, 0]}>
        <boxGeometry args={[0.2, 3.1, 0.3]} />
        <meshStandardMaterial color="#211D2D" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[6.6, 0.12, 0.3]} />
        <meshStandardMaterial color="#211D2D" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[0, -1.5, 0]}>
        <boxGeometry args={[6.6, 0.12, 0.4]} />
        <meshStandardMaterial color="#211D2D" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Center Vertical Mullion */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.08, 3.0, 0.2]} />
        <meshStandardMaterial color="#211D2D" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Double-Pane Architectural Glazing */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[6.4, 3.0]} />
        <meshPhysicalMaterial
          color="#F2F8FD"
          transmission={0.92}
          opacity={0.3}
          transparent
          roughness={0.05}
          ior={1.5}
        />
      </mesh>

      {/* Exterior Vista Backdrop Plane (Bright Daylight Atmosphere) */}
      <mesh position={[0, 0, -2.5]}>
        <planeGeometry args={[16, 8]} />
        <meshBasicMaterial color={skyColor} />
      </mesh>
    </group>
  );
}

/**
 * False Ceiling Architecture with Indirect Cove LED & Downlights (ceiling-main)
 */
function CeilingSystem({
  ceilingColor = '#FAF8F5',
  preset = 'LAYERED',
  coveIntensity = 1.0,
  isSelected = false,
  isHovered = false,
  onSelect
}) {
  return (
    <group
      position={[0, 3.45, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect && onSelect('ceiling-main');
      }}
    >
      {/* Primary Structural Ceiling Slab */}
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[14.2, 0.16, 12.2]} />
        <meshStandardMaterial color={ceilingColor} roughness={0.9} />
      </mesh>

      {/* PRESET: DROPPED GYPSUM COVE (LAYERED) */}
      {preset === 'LAYERED' && (
        <group position={[0, -0.16, 0]}>
          <mesh position={[0, 0, 0]} receiveShadow>
            <boxGeometry args={[9.6, 0.12, 7.6]} />
            <meshStandardMaterial color={ceilingColor} roughness={0.88} />
          </mesh>

          {/* Cove Indirect Warm Light Strip */}
          <pointLight
            position={[0, 0.08, 0]}
            color="#FFE5B4"
            intensity={coveIntensity * 2.2}
            distance={7.5}
            decay={2}
          />

          {/* 4 Architectural Recessed Spotlights */}
          {[
            [-3.4, -0.06, -2.4],
            [3.4, -0.06, -2.4],
            [-3.4, -0.06, 2.4],
            [3.4, -0.06, 2.4]
          ].map((pos, idx) => (
            <group key={idx} position={pos}>
              <mesh>
                <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
                <meshStandardMaterial color="#211D2D" metalness={0.7} roughness={0.3} />
              </mesh>
              <pointLight color="#FFF3E0" intensity={0.4} distance={3.0} decay={2} />
            </group>
          ))}
        </group>
      )}

      {/* PRESET: LINEAR ARCHITECTURAL TRACK */}
      {preset === 'LINEAR' && (
        <group position={[0, -0.05, -1.0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[8.0, 0.06, 0.18]} />
            <meshBasicMaterial color="#161718" />
          </mesh>
          {[-2.5, -0.8, 0.8, 2.5].map((x, i) => (
            <group key={i} position={[x, -0.08, 0]}>
              <mesh>
                <cylinderGeometry args={[0.045, 0.045, 0.12, 16]} />
                <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
              </mesh>
              <pointLight color="#FFFFFF" intensity={0.7} distance={4} decay={2} />
            </group>
          ))}
        </group>
      )}

      {/* PRESET: SCULPTURAL BRASS HALO RING */}
      {preset === 'LIGHT-FEATURE' && (
        <group position={[0, -1.0, 0]}>
          <mesh position={[-0.9, 0.5, 0]}>
            <cylinderGeometry args={[0.003, 0.003, 1.0, 6]} />
            <meshBasicMaterial color="#333333" />
          </mesh>
          <mesh position={[0.9, 0.5, 0]}>
            <cylinderGeometry args={[0.003, 0.003, 1.0, 6]} />
            <meshBasicMaterial color="#333333" />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.1, 0.035, 16, 48]} />
            <meshStandardMaterial color="#E3D9A4" metalness={0.85} roughness={0.2} />
          </mesh>
          <pointLight color="#FFF1D6" intensity={1.8} distance={5.5} decay={2} />
        </group>
      )}

      {/* Selection Highlight */}
      {(isSelected || isHovered) && (
        <mesh position={[0, -0.32, 0]}>
          <boxGeometry args={[10.2, 0.02, 8.2]} />
          <meshBasicMaterial
            color={isSelected ? '#E3D9A4' : '#3C2D8C'}
            wireframe
            transparent
            opacity={0.65}
          />
        </mesh>
      )}
    </group>
  );
}

/**
 * Bedroom Furniture Suite (Japandi Platform Bed, Nightstands, Bedside Lights)
 */
function BedroomSuite({ woodMaterial, fabricMaterial }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Platform Bed Frame */}
      <mesh position={[0, 0.2, -1.8]} castShadow receiveShadow material={woodMaterial}>
        <boxGeometry args={[3.4, 0.35, 3.8]} />
      </mesh>

      {/* Linen Mattress & Duvet */}
      <mesh position={[0, 0.52, -1.6]} castShadow receiveShadow material={fabricMaterial}>
        <boxGeometry args={[3.0, 0.42, 3.4]} />
      </mesh>

      {/* Folded Bed Runner */}
      <mesh position={[0, 0.55, -0.6]} castShadow receiveShadow>
        <boxGeometry args={[3.05, 0.04, 0.9]} />
        <meshStandardMaterial color="#9E8D7B" roughness={0.9} />
      </mesh>

      {/* Pillows */}
      {[-0.8, 0.8].map((x, i) => (
        <mesh key={i} position={[x, 0.8, -3.0]} rotation={[-0.3, 0, 0]} castShadow material={fabricMaterial}>
          <boxGeometry args={[0.9, 0.2, 0.6]} />
        </mesh>
      ))}

      {/* Twin Nightstands with Pendant Lights */}
      {[-2.4, 2.4].map((x, i) => (
        <group key={i} position={[x, 0.45, -3.2]}>
          <mesh castShadow receiveShadow material={woodMaterial}>
            <boxGeometry args={[0.9, 0.3, 0.6]} />
          </mesh>
          <mesh position={[0, 1.4, 0]} castShadow>
            <cylinderGeometry args={[0.06, 0.06, 0.3, 16]} />
            <meshStandardMaterial color="#E3D9A4" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 2.6, 0]}>
            <cylinderGeometry args={[0.003, 0.003, 2.1, 6]} />
            <meshBasicMaterial color="#333333" />
          </mesh>
          <pointLight position={[0, 1.2, 0]} color="#FFE0B2" intensity={0.9} distance={3} decay={2} />
        </group>
      ))}
    </group>
  );
}

/**
 * Kitchen Suite (Honed Stone Island, Bar Stools, Rear Cabinetry)
 */
function KitchenSuite({ woodMaterial }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Monolithic Honed Island with Waterfall Edge */}
      <mesh position={[0, 0.6, -0.6]} castShadow receiveShadow>
        <boxGeometry args={[4.8, 1.2, 1.6]} />
        <meshStandardMaterial color="#E0DDD7" roughness={0.25} metalness={0.05} />
      </mesh>
      {/* 3 Modern Bar Stools */}
      {[-1.4, 0, 1.4].map((x, i) => (
        <group key={i} position={[x, 0, 0.8]}>
          <mesh position={[0, 0.75, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.26, 0.08, 20]} />
            <meshStandardMaterial color="#3E2B1E" roughness={0.6} />
          </mesh>
          {[-0.14, 0.14].map((lx, j) => (
            <mesh key={j} position={[lx, 0.36, 0]} castShadow>
              <cylinderGeometry args={[0.015, 0.015, 0.72, 8]} />
              <meshStandardMaterial color="#E3D9A4" metalness={0.85} roughness={0.25} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/**
 * Commercial Boardroom Suite
 */
function CommercialSuite({ woodMaterial }) {
  return (
    <group position={[0, 0, 0]}>
      {/* Conference Table */}
      <mesh position={[0, 0.72, -0.8]} castShadow receiveShadow material={woodMaterial}>
        <boxGeometry args={[5.2, 0.08, 2.0]} />
      </mesh>
      {/* Presentation Screen Wall */}
      <group position={[0, 2.8, -5.38]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.2, 2.2, 0.06]} />
          <meshStandardMaterial color="#111213" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[4.0, 2.0]} />
          <meshBasicMaterial color="#1E232B" />
        </mesh>
      </group>
    </group>
  );
}

/**
 * =====================================================================
 * MAIN ARCHITECTURAL ROOM COMPONENT
 * Implements real 3D objects, independent surface states, raycasting,
 * and high-fidelity PBR lighting.
 * =====================================================================
 */
export function ArchitecturalRoom({
  roomType = 'LIVING',
  surfaces = null,
  selectedSurfaceId = null,
  onSelectSurface = null,
  // Legacy props support for backward compatibility with HeroRoom / ScrollStory
  wallColorKey = 'ivory',
  floorKey = 'stone',
  woodKey = 'warm',
  ceilingPreset = 'LAYERED',
  lightMode = 'BALANCED',
  customLightAngle = null,
  transProgress = 100,
  onHotspotClick = null,
  activeHotspot = null,
  showHotspots = true
}) {
  const [hoveredSurface, setHoveredSurface] = useState(null);

  // Procedural PBR Textures
  const plasterBump = useMemo(() => getPlasterTexture(), []);
  const woodTexture = useMemo(
    () => getWoodTexture(WOOD_FINISHES[woodKey]?.tone || 'warm'),
    [woodKey]
  );
  const stoneTexture = useMemo(
    () => getStoneTexture(floorKey === 'concrete' ? 'concrete' : 'stone'),
    [floorKey]
  );
  const fabricTexture = useMemo(() => getFabricTexture(), []);

  // Compute resolved surfaces state (merging surfaces prop or fallback props)
  const resolvedSurfaces = useMemo(() => {
    if (surfaces) {
      return { ...DEFAULT_SURFACES_STATE, ...surfaces };
    }
    // Fallback if caller used legacy props
    const wallCol = WALL_COLORS[wallColorKey] || WALL_COLORS.ivory;
    const floorCol = FLOOR_PRESETS[floorKey] || FLOOR_PRESETS.stone;
    const woodCol = WOOD_FINISHES[woodKey] || WOOD_FINISHES.warm;
    return {
      'wall-main': {
        color: wallCol.hex,
        roughness: wallCol.roughness,
        name: wallCol.name
      },
      'wall-feature': {
        color: wallColorKey === 'ivory' ? '#3C2D8C' : wallCol.hex,
        roughness: wallCol.roughness,
        name: wallCol.name
      },
      'wall-left': {
        color: wallCol.hex,
        roughness: wallCol.roughness,
        name: wallCol.name
      },
      'wall-right': {
        color: wallCol.hex,
        roughness: wallCol.roughness,
        name: wallCol.name
      },
      'floor-main': {
        color: floorCol.color,
        roughness: floorCol.roughness,
        material: floorCol.materialType
      },
      'ceiling-main': {
        color: '#FAF8F5',
        stylePreset: ceilingPreset
      },
      'wood-panel': {
        color: woodCol.color,
        roughness: woodCol.roughness
      },
      'cabinet-main': {
        color: woodCol.color,
        roughness: woodCol.roughness
      }
    };
  }, [surfaces, wallColorKey, floorKey, woodKey, ceilingPreset]);

  // Lighting Configuration (Supports both 'SOFT DAYLIGHT' / 'BALANCED' / 'WARM EVENING' and legacy 'morning' / 'day' / 'evening')
  const lightConfig = useMemo(() => {
    if (LIGHTING_PRESETS[lightMode]) return LIGHTING_PRESETS[lightMode];
    if (LIGHT_MODES[lightMode]) return LIGHT_MODES[lightMode];
    return LIGHTING_PRESETS.BALANCED;
  }, [lightMode]);

  // Sun Light Vector
  const dirLightPos = useMemo(() => {
    if (customLightAngle) {
      const radius = 12;
      const az = (customLightAngle.azimuth * Math.PI) / 180;
      const el = (customLightAngle.elevation * Math.PI) / 180;
      return [
        radius * Math.cos(el) * Math.sin(az),
        Math.max(2, radius * Math.sin(el)),
        radius * Math.cos(el) * Math.cos(az)
      ];
    }
    return lightConfig.sunPos || [-9, 8.5, 2];
  }, [customLightAngle, lightConfig]);

  // INDEPENDENT SURFACE MATERIALS WITH SMOOTH ANIMATION (ANIMATION 02)
  const wallMainMaterial = useAnimatedSurfaceMaterial({
    color: resolvedSurfaces['wall-main']?.color || '#FAF8F2',
    roughness: resolvedSurfaces['wall-main']?.roughness || 0.85,
    bumpMap: plasterBump,
    bumpScale: 0.03,
    isSelected: selectedSurfaceId === 'wall-main',
    isHovered: hoveredSurface === 'wall-main'
  });

  const wallFeatureMaterial = useAnimatedSurfaceMaterial({
    color: resolvedSurfaces['wall-feature']?.color || '#3C2D8C',
    roughness: resolvedSurfaces['wall-feature']?.roughness || 0.76,
    bumpMap: plasterBump,
    bumpScale: 0.04,
    isSelected: selectedSurfaceId === 'wall-feature',
    isHovered: hoveredSurface === 'wall-feature'
  });

  const wallLeftMaterial = useAnimatedSurfaceMaterial({
    color: resolvedSurfaces['wall-left']?.color || '#FAF8F2',
    roughness: resolvedSurfaces['wall-left']?.roughness || 0.85,
    bumpMap: plasterBump,
    bumpScale: 0.03,
    isSelected: selectedSurfaceId === 'wall-left',
    isHovered: hoveredSurface === 'wall-left'
  });

  const wallRightMaterial = useAnimatedSurfaceMaterial({
    color: resolvedSurfaces['wall-right']?.color || '#FAF8F2',
    roughness: resolvedSurfaces['wall-right']?.roughness || 0.85,
    bumpMap: plasterBump,
    bumpScale: 0.03,
    isSelected: selectedSurfaceId === 'wall-right',
    isHovered: hoveredSurface === 'wall-right'
  });

  const floorMaterial = useAnimatedSurfaceMaterial({
    color: resolvedSurfaces['floor-main']?.color || '#D9D5CD',
    roughness: resolvedSurfaces['floor-main']?.roughness || 0.22,
    map:
      resolvedSurfaces['floor-main']?.material === 'wood' || floorKey === 'wood' || floorKey === 'walnut'
        ? woodTexture
        : stoneTexture,
    bumpMap: stoneTexture,
    bumpScale: 0.015,
    isSelected: selectedSurfaceId === 'floor-main',
    isHovered: hoveredSurface === 'floor-main'
  });

  const woodPanelMaterial = useAnimatedSurfaceMaterial({
    color: resolvedSurfaces['wood-panel']?.color || '#A65E32',
    roughness: resolvedSurfaces['wood-panel']?.roughness || 0.35,
    map: woodTexture,
    bumpMap: woodTexture,
    bumpScale: 0.02,
    isSelected: selectedSurfaceId === 'wood-panel',
    isHovered: hoveredSurface === 'wood-panel'
  });

  const credenzaWoodMaterial = useAnimatedSurfaceMaterial({
    color: resolvedSurfaces['cabinet-main']?.color || '#A65E32',
    roughness: resolvedSurfaces['cabinet-main']?.roughness || 0.35,
    map: woodTexture,
    bumpMap: woodTexture,
    bumpScale: 0.02,
    isSelected: selectedSurfaceId === 'cabinet-main',
    isHovered: hoveredSurface === 'cabinet-main'
  });

  const fabricMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#E8E4DC',
      roughness: 0.85,
      map: fabricTexture
    });
  }, [fabricTexture]);

  // Pointer event handlers for raycasting against actual meshes
  const makeSurfaceProps = (surfaceId) => ({
    onClick: (e) => {
      e.stopPropagation();
      onSelectSurface && onSelectSurface(surfaceId);
    },
    onPointerOver: (e) => {
      e.stopPropagation();
      setHoveredSurface(surfaceId);
      document.body.style.cursor = 'pointer';
    },
    onPointerOut: (e) => {
      e.stopPropagation();
      setHoveredSurface((prev) => (prev === surfaceId ? null : prev));
      document.body.style.cursor = 'auto';
    }
  });

  return (
    <group>
      {/* ------------------------------------------------------------- */}
      {/* HIGH-FIDELITY PBR LIGHTING SETUP                              */}
      {/* ------------------------------------------------------------- */}
      <ambientLight color={lightConfig.ambientColor} intensity={lightConfig.ambientIntensity} />

      {/* Directional Sun Light */}
      <directionalLight
        position={dirLightPos}
        color={lightConfig.sunColor}
        intensity={lightConfig.sunIntensity}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={26}
        shadow-camera-left={-8.5}
        shadow-camera-right={8.5}
        shadow-camera-top={8.5}
        shadow-camera-bottom={-8.5}
        shadow-bias={-0.0004}
      />

      {/* Interior Ambient Fill Bounce */}
      <pointLight
        position={[-1.5, 3.2, 0]}
        color="#FFF2E0"
        intensity={lightConfig.pointFillIntensity || 0.8}
        distance={12}
        decay={2}
      />

      {/* ------------------------------------------------------------- */}
      {/* 1. FLOOR (floor-main)                                         */}
      {/* ------------------------------------------------------------- */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        material={floorMaterial}
        {...makeSurfaceProps('floor-main')}
      >
        <planeGeometry args={[14, 12]} />
      </mesh>

      {/* Skirting / Baseboards along Wall Perimeters */}
      <mesh position={[0, 0.05, -5.48]} receiveShadow>
        <boxGeometry args={[14, 0.1, 0.02]} />
        <meshStandardMaterial color="#211D2D" roughness={0.3} />
      </mesh>
      <mesh position={[6.98, 0.05, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 0.1, 0.02]} />
        <meshStandardMaterial color="#211D2D" roughness={0.3} />
      </mesh>
      <mesh position={[-6.98, 0.05, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[12, 0.1, 0.02]} />
        <meshStandardMaterial color="#211D2D" roughness={0.3} />
      </mesh>

      {/* ------------------------------------------------------------- */}
      {/* 2. BACK WALL (wall-main, wall-feature, wood-panel)            */}
      {/* ------------------------------------------------------------- */}
      {/* Section A: Main Back Wall (Left 42%) */}
      <mesh
        position={[-3.8, 1.725, -5.5]}
        receiveShadow
        material={wallMainMaterial}
        {...makeSurfaceProps('wall-main')}
      >
        <boxGeometry args={[6.4, 3.45, 0.1]} />
      </mesh>

      {/* Section B: Feature Accent Wall (Center 32%) */}
      <mesh
        position={[0.8, 1.725, -5.47]}
        receiveShadow
        material={wallFeatureMaterial}
        {...makeSurfaceProps('wall-feature')}
      >
        <boxGeometry args={[4.2, 3.45, 0.12]} />
      </mesh>

      {/* Section C: Acoustic Fluted Timber Slats (Right 26%) */}
      <FlutedWoodPanel
        position={[4.95, 1.725, -5.44]}
        width={3.9}
        height={3.45}
        slatsCount={22}
        woodMaterial={woodPanelMaterial}
        isSelected={selectedSurfaceId === 'wood-panel'}
        isHovered={hoveredSurface === 'wood-panel'}
        onSelect={onSelectSurface}
      />

      {/* ------------------------------------------------------------- */}
      {/* 3. RIGHT WALL (wall-right) WITH DOORWAY REVEAL                */}
      {/* ------------------------------------------------------------- */}
      <mesh
        position={[7.0, 1.725, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
        material={wallRightMaterial}
        {...makeSurfaceProps('wall-right')}
      >
        <boxGeometry args={[12, 3.45, 0.1]} />
      </mesh>

      {/* Doorway Entrance on Right Wall */}
      <DoorwayEntrance
        position={[6.95, 0, -2.5]}
        isSelected={selectedSurfaceId === 'wall-right'}
        isHovered={hoveredSurface === 'wall-right'}
        onSelect={onSelectSurface}
      />

      {/* Architectural Display Niche on Right Wall */}
      <group position={[6.92, 1.8, 2.2]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh position={[0, 0, -0.08]}>
          <boxGeometry args={[1.5, 1.4, 0.22]} />
          <meshStandardMaterial color="#262232" roughness={0.6} />
        </mesh>
        {/* Niche Shelf & Concealed Warm LED */}
        <mesh position={[0, -0.65, 0]}>
          <boxGeometry args={[1.4, 0.04, 0.18]} />
          <meshStandardMaterial color="#E3D9A4" metalness={0.7} roughness={0.3} />
        </mesh>
        <pointLight position={[0, 0.5, 0.05]} color="#FFE8CC" intensity={0.5} distance={2.5} decay={2} />
        {/* Decorative Vase in Niche */}
        <mesh position={[0, -0.45, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.11, 0.38, 18]} />
          <meshStandardMaterial color="#FAF8F2" roughness={0.8} />
        </mesh>
      </group>

      {/* ------------------------------------------------------------- */}
      {/* 4. LEFT WALL & WINDOW (wall-left, window, frame)              */}
      {/* ------------------------------------------------------------- */}
      <ArchitecturalWindow skyColor={lightConfig.skyColor || '#E8F2FC'} />

      {/* Window Wall Top & Bottom Jamb Reveals */}
      <mesh
        position={[-6.95, 0.1, 0]}
        rotation={[0, Math.PI / 2, 0]}
        material={wallLeftMaterial}
        {...makeSurfaceProps('wall-left')}
      >
        <boxGeometry args={[12, 0.2, 0.1]} />
      </mesh>
      <mesh
        position={[-6.95, 3.35, 0]}
        rotation={[0, Math.PI / 2, 0]}
        material={wallLeftMaterial}
        {...makeSurfaceProps('wall-left')}
      >
        <boxGeometry args={[12, 0.2, 0.1]} />
      </mesh>

      {/* ------------------------------------------------------------- */}
      {/* 5. CEILING SYSTEM (ceiling-main)                              */}
      {/* ------------------------------------------------------------- */}
      <CeilingSystem
        ceilingColor={resolvedSurfaces['ceiling-main']?.color || '#FAF8F5'}
        preset={resolvedSurfaces['ceiling-main']?.stylePreset || ceilingPreset}
        coveIntensity={lightConfig.coveIntensity || 1.0}
        isSelected={selectedSurfaceId === 'ceiling-main'}
        isHovered={hoveredSurface === 'ceiling-main'}
        onSelect={onSelectSurface}
      />

      {/* ------------------------------------------------------------- */}
      {/* 6. ROOM FURNITURE & CONTEMPORARY SCENE OBJECTS                */}
      {/* ------------------------------------------------------------- */}
      {roomType === 'LIVING' && (
        <group>
          {/* Wool Rug on Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0.2]} receiveShadow>
            <planeGeometry args={[6.2, 5.0]} />
            <meshStandardMaterial color="#DDD8CF" roughness={0.92} map={fabricTexture} />
          </mesh>

          {/* Floating Teak Credenza */}
          <ModernCredenza
            position={[-0.8, 0, -4.95]}
            woodMaterial={credenzaWoodMaterial}
            isSelected={selectedSurfaceId === 'cabinet-main'}
            isHovered={hoveredSurface === 'cabinet-main'}
            onSelect={onSelectSurface}
          />

          {/* Framed Minimalist Architectural Canvas Artwork over Credenza (Eye-Level) */}
          <group position={[-0.8, 1.85, -5.39]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[2.8, 1.35, 0.04]} />
              <meshStandardMaterial color="#211D2D" metalness={0.7} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0, 0.022]}>
              <planeGeometry args={[2.65, 1.2]} />
              <meshStandardMaterial color="#FAF8F2" roughness={0.9} />
            </mesh>
            {/* Geometric Art Accent */}
            <mesh position={[-0.35, 0, 0.024]}>
              <circleGeometry args={[0.38, 32]} />
              <meshBasicMaterial color={resolvedSurfaces['wall-feature']?.color || '#3C2D8C'} />
            </mesh>
            <mesh position={[0.42, -0.1, 0.024]}>
              <planeGeometry args={[0.65, 0.55]} />
              <meshBasicMaterial color="#211D2D" />
            </mesh>
          </group>

          {/* Twin Contemporary Lounge Chairs */}
          <ArchitecturalLoungeChair
            position={[-1.7, 0, 0.7]}
            rotation={[0, 0.35, 0]}
            fabricMaterial={fabricMaterial}
          />
          <ArchitecturalLoungeChair
            position={[1.6, 0, 0.5]}
            rotation={[0, -0.4, 0]}
            fabricMaterial={fabricMaterial}
          />

          {/* Travertine Coffee Table */}
          <CoffeeTable position={[0, 0, 0.3]} />

          {/* Arched Floor Lamp */}
          <FloorLamp position={[-3.6, 0, 2.0]} />

          {/* Indoor Architectural Plant */}
          <IndoorPlant position={[-5.2, 0, -3.8]} />
        </group>
      )}

      {/* 2. BEDROOM LAYOUT */}
      {roomType === 'BEDROOM' && (
        <BedroomSuite woodMaterial={credenzaWoodMaterial} fabricMaterial={fabricMaterial} />
      )}

      {/* 3. KITCHEN LAYOUT */}
      {roomType === 'KITCHEN' && (
        <KitchenSuite woodMaterial={credenzaWoodMaterial} />
      )}

      {/* 4. COMMERCIAL / BOARDROOM LAYOUT */}
      {roomType === 'COMMERCIAL' && (
        <CommercialSuite woodMaterial={credenzaWoodMaterial} />
      )}

      {/* ------------------------------------------------------------- */}
      {/* 7. INTERACTIVE 3D HOTSPOTS                                    */}
      {/* ------------------------------------------------------------- */}
      {showHotspots && (
        <>
          <HotspotMarker
            position={[0.8, 1.75, -5.35]}
            label="01 • FEATURE WALL"
            sublabel="Venetian Stucco Texture"
            active={selectedSurfaceId === 'wall-feature' || activeHotspot === 'wall'}
            onClick={() => {
              onSelectSurface && onSelectSurface('wall-feature');
              onHotspotClick && onHotspotClick('wall');
            }}
          />
          <HotspotMarker
            position={[-3.8, 1.75, -5.35]}
            label="02 • MAIN WALL"
            sublabel="Luxury Silk Emulsion"
            active={selectedSurfaceId === 'wall-main'}
            onClick={() => {
              onSelectSurface && onSelectSurface('wall-main');
              onHotspotClick && onHotspotClick('wall');
            }}
          />
          <HotspotMarker
            position={[4.95, 1.7, -5.2]}
            label="03 • TIMBER ELEMENTS"
            sublabel="Fluted Slats & Teak PU"
            active={selectedSurfaceId === 'wood-panel' || activeHotspot === 'wood'}
            onClick={() => {
              onSelectSurface && onSelectSurface('wood-panel');
              onHotspotClick && onHotspotClick('wood');
            }}
          />
          <HotspotMarker
            position={[0, 3.28, -1.2]}
            label="04 • CEILING ARCHITECTURE"
            sublabel="Gypsum Cove & Spotlights"
            active={selectedSurfaceId === 'ceiling-main' || activeHotspot === 'ceiling'}
            onClick={() => {
              onSelectSurface && onSelectSurface('ceiling-main');
              onHotspotClick && onHotspotClick('ceiling');
            }}
          />
          <HotspotMarker
            position={[0, 0.15, 1.2]}
            label="05 • FLOOR FINISH"
            sublabel="Honed Limestone & White Oak"
            active={selectedSurfaceId === 'floor-main' || activeHotspot === 'floor'}
            onClick={() => {
              onSelectSurface && onSelectSurface('floor-main');
              onHotspotClick && onHotspotClick('floor');
            }}
          />
        </>
      )}
    </group>
  );
}

export default ArchitecturalRoom;
