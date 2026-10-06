import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';

// Providers and Hooks
import { ThemeProvider } from './hooks/useTheme';
import { useSmoothScroll } from './hooks/useSmoothScroll';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { Preloader } from './components/common/Preloader';
import { CustomCursor } from './components/common/CustomCursor';
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
import { Process } from './pages/Process';
import { Gallery } from './pages/Gallery';
import { Testimonials } from './pages/Testimonials';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

// Scroll to top automatically on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

// Animated Page Transition Wrapper
const PageTransitionWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        {children}
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
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main style={{ flex: 1 }}>
        <PageTransitionWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/colour-studio" element={<ColourStudio />} />
            <Route path="/texture-lab" element={<TextureLab />} />
            <Route path="/style-finder" element={<StyleFinder />} />
            <Route path="/process" element={<Process />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
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
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
