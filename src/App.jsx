import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

// Hooks
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Layout Components
import { Navbar, Footer } from './components/layout';
// Common Components
import { Preloader, ScrollProgress, WhatsAppFab, BackToTop } from './components/common';

// Code-split active pages for fast initial load and token efficiency
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home || m.default })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About || m.default })));
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services || m.default })));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail').then(m => ({ default: m.ServiceDetail || m.default })));
const Gallery = lazy(() => import('./pages/Gallery').then(m => ({ default: m.Gallery || m.default })));
const Process = lazy(() => import('./pages/Process').then(m => ({ default: m.Process || m.default })));
const SpaceStudio = lazy(() => import('./pages/SpaceStudio').then(m => ({ default: m.SpaceStudio || m.default })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact || m.default })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound || m.default })));

// Scroll to top automatically on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Resilient Error Boundary to ensure application never crashes to a blank page
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Colour Nest Error Boundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: '#FAF8F2', minHeight: '60vh' }}>
          <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '2rem', color: '#211D2D', marginBottom: '1rem' }}>
            Something went wrong.
          </h2>
          <p style={{ color: '#6D6877', marginBottom: '1rem' }}>
            We encountered a temporary display issue. Please refresh or return to the homepage.
          </p>
          {this.state.error && (
            <div style={{
              textAlign: 'left',
              backgroundColor: '#211D2D',
              color: '#FAF8F2',
              padding: '1.25rem',
              borderRadius: '8px',
              maxWidth: '800px',
              margin: '0 auto 2rem auto',
              overflowX: 'auto',
              fontFamily: 'monospace',
              fontSize: '0.82rem',
              lineHeight: 1.5,
              border: '1px solid rgba(227, 217, 164, 0.3)'
            }}>
              <strong style={{ color: '#E3D9A4' }}>Error: </strong>{String(this.state.error?.message || this.state.error)}
              {this.state.error?.stack && (
                <pre style={{ marginTop: '0.75rem', fontSize: '0.75rem', opacity: 0.8, whiteSpace: 'pre-wrap' }}>
                  {this.state.error.stack}
                </pre>
              )}
            </div>
          )}
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = '/';
            }}
            style={{
              backgroundColor: '#3C2D8C',
              color: '#FAF8F2',
              padding: '0.85rem 1.8rem',
              borderRadius: '9999px',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: 'pointer',
              border: 'none'
            }}
          >
            Reload Homepage
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Animated Page Transition Wrapper - Non-blocking and instant
const PageTransitionWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="sync" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        <Suspense fallback={<div style={{ minHeight: '80vh', backgroundColor: '#FAF8F2' }} />}>
          {children}
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

const AppContent = () => {
  // Initialize Lenis + GSAP ScrollTrigger
  useSmoothScroll();
  const location = useLocation();
  const is3DStudio = location.pathname === '/space-studio';

  return (
    <div className="colournest-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      <Preloader />
      {!is3DStudio && <ScrollProgress />}
      <Navbar />

      <main style={{ flex: 1 }}>
        <PageTransitionWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            {/* Preserved backward-compatible redirects */}
            <Route path="/projects" element={<Navigate to="/gallery" replace />} />
            <Route path="/projects/:slug" element={<Navigate to="/gallery" replace />} />
            <Route path="/enquire" element={<Navigate to="/contact" replace />} />
            {/* Core Architectural Features */}
            <Route path="/space-studio" element={<SpaceStudio />} />
            <Route path="/process" element={<Process />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransitionWrapper>
      </main>

      {!is3DStudio && <Footer />}
      {!is3DStudio && <WhatsAppFab />}
      <BackToTop />
    </div>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </BrowserRouter>
    </HelmetProvider>
  );
}
