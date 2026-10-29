import React from 'react';
import { SEOHead } from '../components/common/SEOHead';
import {
  HeroSection,
  NarrativeSection,
  ServicesShowcaseSection,
  MaterialShowcaseSection,
  GalleryPreviewSection,
  ProcessPreviewSection,
  StrengthsSection,
  ConsultationCtaSection
} from '../features/home';

export const Home = () => {
  return (
    <>
      <SEOHead
        title="COLOUR NEST — Thoughtful Interiors. Beautifully Finished."
        description="Complete interior design, architectural textures, Italian stucco, woodwork polishing, false ceilings, and turnkey painting by Mr. Abhishek Rao in Jayanagar, Bangalore."
      />

      <div style={{ backgroundColor: '#FAF8F2', color: '#211D2D' }}>
        <HeroSection />
        <NarrativeSection />
        <ServicesShowcaseSection />
        <MaterialShowcaseSection />
        <GalleryPreviewSection />
        <ProcessPreviewSection />
        <StrengthsSection />
        <ConsultationCtaSection />
      </div>

      {/* Hover transitions for cards */}
      <style>{`
        .service-overview-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(33, 29, 45, 0.08) !important;
        }
      `}</style>
    </>
  );
};

export default Home;
