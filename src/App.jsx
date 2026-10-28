import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

// Providers and Hooks
import { ThemeProvider } from './hooks/useTheme';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Preloader } from './components/common/Preloader';
import { ScrollProgress } from './components/common/ScrollProgress';
import { WhatsAppFab } from './components/common/WhatsAppFab';

// Lazy Loaded Pages for high performance
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { ServiceDetail } from './pages/ServiceDetail';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { ColourStudio } from './pages/ColourStudio';
import { TextureLab } from './pages/TextureLab';
import { StyleFinder } from './pages/StyleFinder';
import { SpaceStudio } from './pages/SpaceStudio';
import { Materials } from './pages/Materials';
import { Process } from './pages/Process';
import { Gallery } from './pages/Gallery';
import { Testimonials } from './pages/Testimonials';
import { Contact } from './pages/Contact';
import { Enquiry } from './pages/Enquiry';
import { DesignBoard } from './pages/DesignBoard';
import { ProjectPlanner } from './pages/ProjectPlanner';
import { NotFound } from './pages/NotFound';

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
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Colour Nest Error Boundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: '#FAF8F2', minHeight: '60vh' }}>
          <h2 style={{ fontFamily: 'var(--font-display, serif)', fontSize: '2rem', color: '#211D2D', marginBottom: '1rem' }}>
            Something went wrong.
          </h2>
          <p style={{ color: '#6D6877', marginBottom: '2rem' }}>
            We encountered a temporary display issue. Please refresh or return to the homepage.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false });
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
              cursor: 'pointer'
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

  return (
    <div className="colournest-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ScrollToTop />
      <Preloader />
      <ScrollProgress />
      <Navbar />

      <main style={{ flex: 1 }}>
        <PageTransitionWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<Navigate to="/gallery" replace />} />
            <Route path="/projects/:slug" element={<Navigate to="/gallery" replace />} />
            <Route path="/space-studio" element={<SpaceStudio />} />
            <Route path="/materials" element={<Materials />} />
            <Route path="/colour-studio" element={<ColourStudio />} />
            <Route path="/texture-lab" element={<TextureLab />} />
            <Route path="/style-finder" element={<StyleFinder />} />
            <Route path="/design-board" element={<DesignBoard />} />
            <Route path="/plan-project" element={<ProjectPlanner />} />
            <Route path="/process" element={<Process />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enquire" element={<Navigate to="/contact" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransitionWrapper>
      </main>

      <Footer />
      <WhatsAppFab />
    </div>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <AppContent />
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
