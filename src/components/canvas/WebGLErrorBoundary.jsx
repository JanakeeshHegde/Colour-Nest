import React, { Component } from 'react';
import { RefreshCw, Image } from 'lucide-react';

// Cache WebGL availability check once to prevent browser WebGL context exhaustion
let cachedWebGLAvailable = null;

export function isWebGLAvailable() {
  if (cachedWebGLAvailable !== null) {
    return cachedWebGLAvailable;
  }
  if (typeof window === 'undefined') {
    return false;
  }
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl', { powerPreference: 'high-performance' }) ||
      canvas.getContext('experimental-webgl');
    const available = !!(window.WebGLRenderingContext && gl);
    if (gl) {
      // Immediately release probe context to avoid counting towards browser's context limit
      const loseExt = gl.getExtension('WEBGL_lose_context');
      if (loseExt) {
        loseExt.loseContext();
      }
    }
    cachedWebGLAvailable = available;
    return available;
  } catch (e) {
    cachedWebGLAvailable = false;
    return false;
  }
}

/**
 * React Error Boundary specifically for Three.js / Canvas scenes.
 * If WebGL crashes, context is lost, or a shader compilation fails,
 * cleanly renders an architectural fallback with recovery options.
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
    console.warn('Colour Nest 3D Space Studio Error Boundary caught:', error, errorInfo);
  }

  handleRetry = () => {
    // Reset cached check and state
    cachedWebGLAvailable = null;
    this.setState({ hasError: false, error: null });
  };

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
            backgroundColor: '#17151D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(33, 29, 45, 0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              borderRadius: '16px',
              border: '1px solid rgba(227, 217, 164, 0.3)',
              maxWidth: '460px',
              textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                color: '#E3D9A4',
                display: 'block',
                marginBottom: '0.75rem',
                fontWeight: 700
              }}
            >
              3D HARDWARE ACCELERATION NOTICE
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: '1.6rem',
                color: '#FAF8F2',
                marginBottom: '0.75rem',
                lineHeight: 1.2
              }}
            >
              Interactive 3D Engine Paused
            </h3>
            <p
              style={{
                fontSize: '0.88rem',
                color: '#B9B4C5',
                lineHeight: 1.6,
                marginBottom: '1.75rem'
              }}
            >
              Hardware graphics acceleration is currently limited on this device or browser session.
              You can retry launching the 3D room, or explore our high-resolution spatial gallery.
            </p>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleRetry}
                style={{
                  backgroundColor: 'var(--brand-indigo, #3C2D8C)',
                  color: '#FAF8F2',
                  border: '1px solid #E3D9A4',
                  borderRadius: '999px',
                  padding: '0.65rem 1.4rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <RefreshCw size={13} />
                <span>RETRY 3D STUDIO</span>
              </button>

              <a
                href="/gallery"
                style={{
                  backgroundColor: 'transparent',
                  color: '#FAF8F2',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '999px',
                  padding: '0.65rem 1.25rem',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Image size={13} />
                <span>VIEW GALLERY</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;
