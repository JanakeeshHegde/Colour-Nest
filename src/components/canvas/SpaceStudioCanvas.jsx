import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ArchitecturalRoom } from './ArchitecturalRoom';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';

// Camera Preset Vectors
const CAMERA_PRESETS = {
  FRONT: {
    position: [0, 1.65, 5.8],
    target: [0, 1.45, -2.0],
    fov: 44
  },
  CORNER: {
    position: [4.0, 1.8, 4.4],
    target: [-0.8, 1.45, -1.8],
    fov: 45
  },
  WIDE: {
    position: [0, 1.8, 6.8],
    target: [0, 1.45, -1.5],
    fov: 52
  },
  DETAIL: {
    position: [-0.8, 1.5, 1.8],
    target: [-0.8, 1.6, -4.5],
    fov: 38
  }
};

/**
 * Camera Rig with Smooth Glide on Preset Switch,
 * without fighting manual user OrbitControls interaction.
 */
function StudioCameraRig({ preset = 'FRONT', resetTrigger = 0, isReducedMotion = false }) {
  const controlsRef = useRef();
  const config = CAMERA_PRESETS[preset] || CAMERA_PRESETS.FRONT;
  const targetPos = useRef(new THREE.Vector3(...config.position));
  const targetLook = useRef(new THREE.Vector3(...config.target));
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const c = CAMERA_PRESETS[preset] || CAMERA_PRESETS.FRONT;
    targetPos.current.set(...c.position);
    targetLook.current.set(...c.target);
    isTransitioningRef.current = true;
  }, [preset, resetTrigger]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    // Immediately yield control to user on manual interaction
    const onStart = () => {
      isTransitioningRef.current = false;
    };
    controls.addEventListener('start', onStart);
    return () => {
      controls.removeEventListener('start', onStart);
    };
  }, []);

  useFrame((state, delta) => {
    if (!controlsRef.current) return;

    if (isTransitioningRef.current && !isReducedMotion) {
      // Smooth lerp only during preset transitions
      state.camera.position.lerp(targetPos.current, Math.min(1, delta * 4.0));
      controlsRef.current.target.lerp(targetLook.current, Math.min(1, delta * 4.0));

      if (
        state.camera.position.distanceTo(targetPos.current) < 0.04 &&
        controlsRef.current.target.distanceTo(targetLook.current) < 0.04
      ) {
        state.camera.position.copy(targetPos.current);
        controlsRef.current.target.copy(targetLook.current);
        isTransitioningRef.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={2.4}
      maxDistance={9.0}
      // Safe limits to prevent camera from passing through walls or underground
      minAzimuthAngle={-Math.PI / 1.7}
      maxAzimuthAngle={Math.PI / 1.7}
      minPolarAngle={Math.PI / 4.2}
      maxPolarAngle={Math.PI / 2.05}
      dampingFactor={0.06}
      enableDamping={true}
      rotateSpeed={0.7}
      zoomSpeed={0.9}
      panSpeed={0.7}
      target={config.target}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN
      }}
    />
  );
}

export function SpaceStudioCanvas({
  roomType = 'LIVING',
  surfaces = null,
  selectedSurfaceId = null,
  onSelectSurface = null,
  lighting = 'BALANCED',
  cameraPreset = 'FRONT',
  resetCameraTrigger = 0,
  onHotspotClick = null,
  activeHotspot = null,
  showHotspots = true,
  isReducedMotion = false
}) {
  const initialConfig = CAMERA_PRESETS[cameraPreset] || CAMERA_PRESETS.FRONT;

  return (
    <WebGLErrorBoundary>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            preserveDrawingBuffer: true, // Enables PNG export without canvas clear
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.08
          }}
          camera={{
            position: initialConfig.position,
            fov: initialConfig.fov,
            near: 0.1,
            far: 50
          }}
          style={{ width: '100%', height: '100%', display: 'block' }}
          onCreated={({ gl }) => {
            window.__colourNestGl = gl;
          }}
        >
          <StudioCameraRig
            preset={cameraPreset}
            resetTrigger={resetCameraTrigger}
            isReducedMotion={isReducedMotion}
          />

          <ArchitecturalRoom
            roomType={roomType}
            surfaces={surfaces}
            selectedSurfaceId={selectedSurfaceId}
            onSelectSurface={onSelectSurface}
            lightMode={lighting}
            onHotspotClick={onHotspotClick}
            activeHotspot={activeHotspot}
            showHotspots={showHotspots}
          />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}

export default SpaceStudioCanvas;
