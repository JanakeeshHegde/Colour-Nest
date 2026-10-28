import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArchitecturalRoom } from '../canvas/ArchitecturalRoom';
import { WebGLErrorBoundary } from '../canvas/WebGLErrorBoundary';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

/**
 * ANIMATION 03 — SCROLL-CONTROLLED INTERIOR JOURNEY
 * 5 Distinct Architectural Walkthrough Stages:
 * STAGE 01 — FULL ROOM
 * STAGE 02 — FEATURE WALL
 * STAGE 03 — MATERIAL DETAIL
 * STAGE 04 — CEILING & LIGHTING
 * STAGE 05 — COMPLETE SPACE
 */
const SCROLL_STAGES = [
  {
    step: '01',
    stageName: 'STAGE 01 — FULL ROOM',
    title: 'THE COMPLETE ARCHITECTURAL INTERIOR',
    category: 'VOLUME & PROPORTION',
    desc: 'The complete contemporary residential interior. Balanced proportions, tailored finishes, and natural daylight coalesce into enduring spatial harmony.',
    pos: [0, 1.7, 7.5],
    look: [0, 1.45, -1.8],
    light: 'BALANCED'
  },
  {
    step: '02',
    stageName: 'STAGE 02 — FEATURE WALL',
    title: 'THE ARTISAN FEATURE ACCENT',
    category: 'SURFACE & TEXTURE',
    desc: 'Moving closer to the feature wall. Hand-troweled Italian Venetian Stucco captures shifting daylight with deep mineral richness and zero specular glare.',
    pos: [0.8, 1.6, 2.0],
    look: [0.8, 1.7, -5.4],
    light: 'BALANCED'
  },
  {
    step: '03',
    stageName: 'STAGE 03 — MATERIAL DETAIL',
    title: 'PRECISION TIMBER JOINERY & GRAIN',
    category: 'JOINERY & ACOUSTICS',
    desc: 'Revealing the tactile timber grain. Precision vertical fluted slats and bespoke floating teak credenza sealed in non-yellowing PU clearcoats.',
    pos: [2.5, 1.3, -1.2],
    look: [4.9, 1.6, -5.4],
    light: 'BALANCED'
  },
  {
    step: '04',
    stageName: 'STAGE 04 — CEILING & LIGHTING',
    title: 'CEILING ARCHITECTURE & COVE ILLUMINATION',
    category: 'LIGHTING & SOFFITS',
    desc: 'Gazing upward into the ceiling architecture. Stepped false ceiling gypsum islands concealing 2700K indirect LED graze channels that sculpt vertical height.',
    pos: [0, 1.5, 0.4],
    look: [0, 3.4, -1.8],
    light: 'WARM EVENING'
  },
  {
    step: '05',
    stageName: 'STAGE 05 — COMPLETE SPACE',
    title: 'THE TURNKEY LIVING SANCTUARY',
    category: 'COMPREHENSIVE FINISH',
    desc: 'Returning to the wide perspective. Every wall finish, honed limestone floor, seasoned teak joinery, and warm light gradient unified into a timeless interior.',
    pos: [0, 1.6, 5.5],
    look: [0, 1.4, -1.8],
    light: 'WARM EVENING'
  }
];

/**
 * Camera controller smoothly interpolating between the 5 stages along the scroll timeline
 */
function ScrollJourneyCamera({ scrollProgress, isReducedMotion }) {
  const currentPos = useRef(new THREE.Vector3(...SCROLL_STAGES[0].pos));
  const currentLook = useRef(new THREE.Vector3(...SCROLL_STAGES[0].look));

  const { targetPos, targetLook } = useMemo(() => {
    const total = SCROLL_STAGES.length;
    const segment = scrollProgress * (total - 1);
    const index = Math.floor(segment);
    const nextIndex = Math.min(index + 1, total - 1);
    const t = segment - index;

    // Hermite smoothstep for cinematic architectural ease
    const smoothT = t * t * (3 - 2 * t);

    const pA = new THREE.Vector3(...SCROLL_STAGES[index].pos);
    const pB = new THREE.Vector3(...SCROLL_STAGES[nextIndex].pos);
    const lA = new THREE.Vector3(...SCROLL_STAGES[index].look);
    const lB = new THREE.Vector3(...SCROLL_STAGES[nextIndex].look);

    return {
      targetPos: pA.lerp(pB, smoothT),
      targetLook: lA.lerp(lB, smoothT)
    };
  }, [scrollProgress]);

  useFrame((state, delta) => {
    if (isReducedMotion) {
      state.camera.position.set(...SCROLL_STAGES[0].pos);
      state.camera.lookAt(...SCROLL_STAGES[0].look);
      return;
    }

    currentPos.current.lerp(targetPos, delta * 3.8);
    currentLook.current.lerp(targetLook, delta * 3.8);

    state.camera.position.copy(currentPos.current);
    state.camera.lookAt(currentLook.current);
  });

  return null;
}

export const ScrollCameraStory = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMedia = () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const mobile = window.innerWidth < 768;
      setIsReducedMotion(reduced);
      setIsMobile(mobile);
    };

    checkMedia();
    window.addEventListener('resize', checkMedia);
    return () => window.removeEventListener('resize', checkMedia);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=3200',
      pin: true,
      scrub: 0.85,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      }
    });

    return () => {
      trigger.kill();
    };
  }, [isReducedMotion]);

  // Compute active stage index (0 to 4)
  const activeIndex = useMemo(() => {
    const segment = scrollProgress * (SCROLL_STAGES.length - 1);
    return Math.min(Math.round(segment), SCROLL_STAGES.length - 1);
  }, [scrollProgress]);

  const activeStage = SCROLL_STAGES[activeIndex];

  // Simplified fallback mode for reduced motion
  if (isReducedMotion) {
    return (
      <section
        style={{
          position: 'relative',
          padding: '4rem 1.5rem',
          backgroundColor: '#17151D',
          color: '#FAF8F2',
          borderTop: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              color: '#E3D9A4',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.75rem'
            }}
          >
            ARCHITECTURAL INTERIOR JOURNEY
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: '2.5rem',
              color: '#FAF8F2',
              margin: '0 0 1.5rem 0'
            }}
          >
            Five Stages of Turnkey Finishing
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {SCROLL_STAGES.map((s) => (
              <div
                key={s.step}
                style={{
                  backgroundColor: 'rgba(33, 29, 45, 0.7)',
                  border: '1px solid rgba(227, 217, 164, 0.2)',
                  borderRadius: '12px',
                  padding: '1.5rem'
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem', color: '#E3D9A4' }}>
                  {s.stageName}
                </span>
                <h3 style={{ fontSize: '1.15rem', color: '#FAF8F2', margin: '0.5rem 0' }}>{s.title}</h3>
                <p style={{ fontSize: '0.88rem', color: '#B9B4C5', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#17151D',
        overflow: 'hidden'
      }}
    >
      {/* 3D Room Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <WebGLErrorBoundary>
          <Canvas
            shadows
            dpr={[1, 1.5]}
            gl={{
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.06
            }}
            camera={{ position: SCROLL_STAGES[0].pos, fov: 44 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ScrollJourneyCamera
              scrollProgress={scrollProgress}
              isReducedMotion={isReducedMotion}
            />

            <ArchitecturalRoom
              wallColorKey="ivory"
              floorKey="stone"
              woodKey="warm"
              ceilingPreset="LAYERED"
              lightMode={activeStage.light}
              showHotspots={false}
            />
          </Canvas>
        </WebGLErrorBoundary>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* FLOATING EDITORIAL HUD OVERLAY                                */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
          padding: 'clamp(1.5rem, 4vw, 3.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        {/* Top Header & Stage Progress Track */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              backgroundColor: 'rgba(33, 29, 45, 0.88)',
              backdropFilter: 'blur(12px)',
              padding: '0.5rem 1.15rem',
              borderRadius: '999px',
              border: '1px solid rgba(227, 217, 164, 0.25)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#E3D9A4'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                color: '#FAF8F2',
                fontWeight: 700
              }}
            >
              SCROLL ARCHITECTURAL JOURNEY • {activeStage.step}/05
            </span>
          </div>

          {/* Stepper Dots (5 Stages) */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {SCROLL_STAGES.map((s, idx) => (
              <div
                key={s.step}
                style={{
                  width: activeIndex === idx ? '26px' : '8px',
                  height: '8px',
                  borderRadius: '999px',
                  backgroundColor:
                    activeIndex === idx ? '#E3D9A4' : 'rgba(255, 255, 255, 0.25)',
                  transition: 'all 0.35s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Story Excerpt Card */}
        <div
          style={{
            maxWidth: '620px',
            backgroundColor: 'rgba(23, 21, 29, 0.94)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(227, 217, 164, 0.25)',
            borderRadius: '16px',
            padding: '1.75rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
            pointerEvents: 'auto'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              color: '#E3D9A4',
              fontWeight: 700,
              display: 'block',
              marginBottom: '0.35rem'
            }}
          >
            {activeStage.stageName} • {activeStage.category}
          </span>

          <h2
            style={{
              fontFamily: 'var(--font-display, serif)',
              fontSize: 'clamp(1.4rem, 2.5vw, 2.1rem)',
              margin: '0 0 0.75rem 0',
              color: '#FAF8F2',
              letterSpacing: '-0.02em'
            }}
          >
            {activeStage.title}
          </h2>

          <p
            style={{
              fontSize: '0.92rem',
              color: '#B9B4C5',
              lineHeight: 1.6,
              margin: '0 0 1.25rem 0'
            }}
          >
            {activeStage.desc}
          </p>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/space-studio"
              style={{
                backgroundColor: 'var(--brand-indigo, #3C2D8C)',
                border: '1px solid #E3D9A4',
                color: '#FFFFFF',
                textDecoration: 'none',
                padding: '0.7rem 1.4rem',
                borderRadius: '8px',
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 16px rgba(60, 45, 140, 0.4)'
              }}
              data-cursor="EXPLORE"
            >
              <Compass size={14} color="#E3D9A4" />
              <span>CUSTOMISE IN 3D STUDIO</span>
            </Link>

            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.68rem',
                color: '#827E91',
                letterSpacing: '0.1em'
              }}
            >
              SCROLL TO ADVANCE JOURNEY ↓
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollCameraStory;
