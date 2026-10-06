import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = ({ onComplete }) => {
  const [stage, setStage] = useState('initial'); // 'initial', 'painting', 'revealing', 'done'
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Check if seen in this session
    const hasSeen = sessionStorage.getItem('colournest_preloader_seen');
    if (hasSeen) {
      if (onComplete) onComplete();
      return;
    }

    setShouldShow(true);

    // Sequence timeline:
    // 0ms: initial
    // 300ms: paint roller stroke sweeps across
    // 1400ms: title reveal
    // 2400ms: fade into hero
    const timer1 = setTimeout(() => setStage('painting'), 200);
    const timer2 = setTimeout(() => setStage('revealing'), 1300);
    const timer3 = setTimeout(() => {
      setStage('done');
      sessionStorage.setItem('colournest_preloader_seen', 'true');
      if (onComplete) onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (!shouldShow || stage === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 999999,
          backgroundColor: '#161514',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        {/* Paint Roller / Horizontal Brush Stroke Canvas */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: stage === 'painting' || stage === 'revealing' ? 1 : 0
          }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'var(--accent, #B85C38)',
            transformOrigin: 'left center',
            zIndex: 1
          }}
        />

        {/* Content Appearing over the painted surface */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 2rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: stage === 'revealing' ? 1 : 0,
              y: stage === 'revealing' ? 0 : 30
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                letterSpacing: '0.25em',
                color: 'rgba(255, 255, 255, 0.8)',
                display: 'block',
                marginBottom: '1rem',
                textTransform: 'uppercase'
              }}
            >
              Surface • Colour • Light
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 8vw, 6rem)',
                fontWeight: 300,
                color: '#FFFFFF',
                letterSpacing: '0.04em',
                lineHeight: 1,
                textTransform: 'uppercase',
                margin: 0
              }}
            >
              COLOUR NEST
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.75)',
                letterSpacing: '0.12em',
                marginTop: '1.25rem',
                textTransform: 'uppercase'
              }}
            >
              Painting &amp; Interior Decor • Jayanagar, Bangalore
            </p>
          </motion.div>
        </div>

        {/* Subtle Bottom Architectural Coordinate */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === 'revealing' ? 0.6 : 0 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '2rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: '#FFFFFF',
            letterSpacing: '0.15em',
            zIndex: 2
          }}
        >
          12.9250° N, 77.5938° E • BANGALORE
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
