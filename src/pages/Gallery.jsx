import React, { useState } from 'react';
import { Eye, Maximize2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { galleryItems, galleryFilters } from '../data/gallery';
import { GalleryLightbox } from '../components/interactive/GalleryLightbox';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

export const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const filteredItems = activeFilter === 'ALL'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  const handleOpenLightbox = (index) => {
    setCurrentIdx(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <>
      <SEOHead
        title="Gallery — Architecture Magazine Exhibition"
        description="Authentic project photo exhibition by Colour Nest. Browse plaster textures, false ceilings, teak finishes, and smart lighting installations in Bangalore."
      />

      <section
        style={{
          paddingTop: 'calc(var(--nav-height) + 2.5rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          backgroundColor: 'var(--surface-primary)',
          minHeight: '100vh'
        }}
      >
        <div className="container-wide">
          {/* Header */}
          <div style={{ maxWidth: '920px', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
            <span className="meta-tag" style={{ marginBottom: '1rem' }}>
              VISUAL EXHIBITION ARCHIVE
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              MAGAZINE <br />
              <span className="heading-editorial-italic">GALLERY.</span>
            </h1>
            <ArchitecturalLine label="GENUINE ARCHITECTURAL FIELD DOCUMENTATION" coordinates="BANGALORE PROJECTS" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              A curated photographic record capturing the meeting of light and surface.
              Click any plate to open the full-screen architectural inspection viewer.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="filter-bar" style={{ marginBottom: '3rem' }}>
            {galleryFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
                data-cursor="FILTER"
              >
                {f} {f === 'ALL' ? `(${galleryItems.length})` : ''}
              </button>
            ))}
          </div>

          {/* Architecture Magazine Masonry Grid */}
          <div
            style={{
              columns: '1 320px',
              columnGap: '2rem'
            }}
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(index)}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '2rem',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 'var(--radius-xs)',
                  boxShadow: 'var(--shadow-subtle)',
                  border: '1px solid var(--border-subtle)',
                  backgroundColor: 'var(--surface-card)'
                }}
                className="gallery-masonry-card"
                data-cursor="EXPAND"
              >
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{
                      width: '100%',
                      display: 'block',
                      transition: 'transform 0.6s var(--ease-out-expo)'
                    }}
                    loading="lazy"
                    onError={(e) => {
                      if (item.fallback) e.currentTarget.src = item.fallback;
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '0.75rem',
                      right: '0.75rem',
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(18, 18, 19, 0.75)',
                      backdropFilter: 'blur(6px)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }}
                    className="gallery-expand-icon"
                  >
                    <Maximize2 size={15} />
                  </div>
                </div>

                <div style={{ padding: '1.25rem' }}>
                  <span className="meta-tag" style={{ fontSize: '0.65rem', marginBottom: '0.25rem' }}>
                    {item.category}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.35rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        currentIndex={currentIdx}
        items={filteredItems}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      <style>{`
        .gallery-masonry-card:hover img {
          transform: scale(1.03);
        }
        .gallery-masonry-card:hover .gallery-expand-icon {
          opacity: 1 !important;
        }
      `}</style>
    </>
  );
};
