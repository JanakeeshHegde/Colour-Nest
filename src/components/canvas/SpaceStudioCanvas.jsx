import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ArchitecturalRoom } from './ArchitecturalRoom';
import { WebGLErrorBoundary } from './WebGLErrorBoundary';
import { CAMERA_PRESETS } from '../../features/space-studio/data/cameraPresets';

/**
 * Camera Rig with Smooth Glide on Preset Switch,
 * seamlessly coordinated with OrbitControls so they never fight.
 */
function StudioCameraRig({ preset = 'FRONT', resetTrigger = 0, isReducedMotion = false }) {
  const controlsRef = useRef();
  const config = CAMERA_PRESETS[preset] || CAMERA_PRESETS.FRONT;
  const targetPos = useRef(new THREE.Vector3(...config.position));
  const targetLook = useRef(new THREE.Vector3(...config.target));
  const targetFov = useRef(config.fov);
  const isTransitioningRef = useRef(false);
  const transitionStartRef = useRef(0);

  // Initialize controls target once on mount
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(...config.target);
      controlsRef.current.update();
    }
  }, []);

  // When preset or resetTrigger changes, smoothly glide to new preset
  useEffect(() => {
    const c = CAMERA_PRESETS[preset] || CAMERA_PRESETS.FRONT;
    targetPos.current.set(...c.position);
    targetLook.current.set(...c.target);
    targetFov.current = c.fov;
    isTransitioningRef.current = true;
    transitionStartRef.current = performance.now();
  }, [preset, resetTrigger]);

  // Immediately yield control to user on manual interaction
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const onStart = () => {
      isTransitioningRef.current = false;
    };
    controls.addEventListener('start', onStart);
    return () => {
      controls.removeEventListener('start', onStart);
    };
  }, []);

  useFrame((state, delta) => {
    const controls = controlsRef.current;
    if (!controls) return;

    if (isTransitioningRef.current) {
      if (isReducedMotion) {
        state.camera.position.copy(targetPos.current);
        controls.target.copy(targetLook.current);
        state.camera.fov = targetFov.current;
        state.camera.updateProjectionMatrix();
        controls.update();
        isTransitioningRef.current = false;
        return;
      }

      // Smooth exponential lerp
      const speed = Math.min(1, delta * 4.2);
      state.camera.position.lerp(targetPos.current, speed);
      controls.target.lerp(targetLook.current, speed);

      if (Math.abs(state.camera.fov - targetFov.current) > 0.05) {
        state.camera.fov += (targetFov.current - state.camera.fov) * speed;
        state.camera.updateProjectionMatrix();
      }

      const elapsed = performance.now() - transitionStartRef.current;
      const posDist = state.camera.position.distanceTo(targetPos.current);
      const lookDist = controls.target.distanceTo(targetLook.current);

      // Settle when close enough, or after 1.1s watchdog timeout to prevent infinite lerping
      if ((posDist < 0.03 && lookDist < 0.03) || elapsed > 1100) {
        state.camera.position.copy(targetPos.current);
        controls.target.copy(targetLook.current);
        state.camera.fov = targetFov.current;
        state.camera.updateProjectionMatrix();
        isTransitioningRef.current = false;
      }

      controls.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      minDistance={1.8}
      maxDistance={9.5}
      minPolarAngle={0.08}
      maxPolarAngle={Math.PI / 2.04}
      minAzimuthAngle={-Math.PI / 1.45}
      maxAzimuthAngle={Math.PI / 1.45}
      dampingFactor={0.06}
      enableDamping={true}
      rotateSpeed={0.7}
      zoomSpeed={0.85}
      panSpeed={0.7}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN
      }}
    />
  );
}

/**
 * Lightweight Loading Overlay for 3D Room Initialisation
 */
function CanvasLoadingIndicator({ isReady }) {
  if (isReady) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 5,
        backgroundColor: '#17151D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        pointerEvents: 'none',
        transition: 'opacity 0.4s ease'
      }}
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          border: '2px solid rgba(227, 217, 164, 0.2)',
          borderTopColor: '#E3D9A4',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '0.7rem',
          letterSpacing: '0.16em',
          color: '#E3D9A4',
          fontWeight: 700
        }}
      >
        LOADING 3D ARCHITECTURAL ROOM...
      </span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
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
  const [isSceneReady, setIsSceneReady] = useState(false);
  const initialConfig = CAMERA_PRESETS[cameraPreset] || CAMERA_PRESETS.FRONT;

  return (
    <WebGLErrorBoundary>
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
        <CanvasLoadingIndicator isReady={isSceneReady} />

        <Canvas
          shadows
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            preserveDrawingBuffer: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.08
          }}
          camera={{
            position: initialConfig.position,
            fov: initialConfig.fov,
            near: 0.1,
            far: 60
          }}
          style={{ width: '100%', height: '100%', display: 'block' }}
          onCreated={({ gl }) => {
            window.__colourNestGl = gl;
            setIsSceneReady(true);
          }}
        >
          <Suspense fallback={null}>
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
              cameraPreset={cameraPreset}
              onHotspotClick={onHotspotClick}
              activeHotspot={activeHotspot}
              showHotspots={showHotspots}
            />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}

export default SpaceStudioCanvas;
