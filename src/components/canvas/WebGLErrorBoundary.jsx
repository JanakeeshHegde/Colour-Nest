import React, { Component } from 'react';

/**
 * Checks whether WebGL is actually supported and functional
 */
export function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

/**
 * React Error Boundary specifically for Three.js / Canvas scenes.
 * If WebGL crashes or context is lost, cleanly renders the provided fallback
 * without taking down the rest of the application.
 */
export class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Colour Nest 3D Canvas Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError || !isWebGLAvailable()) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#161718',
            backgroundImage:
              'radial-gradient(circle at 60% 40%, rgba(184, 92, 56, 0.15) 0%, rgba(20, 21, 22, 0.95) 70%), url("/images/hero/hero_main.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '2rem'
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(18, 18, 19, 0.85)',
              backdropFilter: 'blur(12px)',
              padding: '1rem 1.5rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              maxWidth: '380px'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                color: 'var(--accent)',
                display: 'block',
                marginBottom: '0.25rem'
              }}
            >
              2.5D ARCHITECTURAL FALLBACK
            </span>
            <p style={{ fontSize: '0.82rem', color: '#FFFFFF', margin: 0 }}>
              Hardware acceleration limited. Viewing high-fidelity architectural gallery.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
