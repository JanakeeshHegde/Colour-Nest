import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Sparkles, ArrowRight, Layers, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/common/SEOHead';
import { GalleryLightbox, galleryItems, GALLERY_CATEGORIES } from '../features/gallery';

export const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filtered items
  const filteredItems = useMemo(() => {
    if (activeCategory === 'ALL') return galleryItems;
    return galleryItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleOpenLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <>
      <SEOHead
        title="Gallery — Spaces. Materials. Details. | COLOUR NEST"
        description="Explore interior inspiration, decorative finishes, Italian stuccos, woodwork polishing, and architectural ceilings for modern residential and commercial spaces."
      />

      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#FAF8F2',
          paddingTop: 'calc(var(--nav-height, 84px) + 2.5rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)'
        }}
      >
        <div
          className="container-wide"
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)'
          }}
        >
          {/* Header */}
          <div style={{ maxWidth: '860px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                color: '#3C2D8C',
                textTransform: 'uppercase',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '1rem'
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  backgroundColor: '#3C2D8C'
                }}
              />
              INTERIOR INSPIRATION &amp; FINISH CONCEPTS
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
                lineHeight: 1.05,
                fontWeight: 400,
                letterSpacing: '-0.03em',
                color: '#211D2D',
                margin: '0 0 1.25rem 0'
              }}
            >
              Spaces. Materials. <br />
              <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Details.</span>
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
                color: '#4A4657',
                lineHeight: 1.65,
                margin: 0
              }}
            >
              Explore interior inspiration, decorative finishes and thoughtful details for different kinds of spaces.
              Browse by spatial category or inspect textures in detail.
            </p>
          </div>

          {/* Category Filter Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.6rem',
              marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
              paddingBottom: '1.25rem',
              borderBottom: '1px solid #E7E1D6'
            }}
            role="tablist"
            aria-label="Gallery Categories"
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              const count = cat === 'ALL'
                ? galleryItems.length
                : galleryItems.filter((i) => i.category === cat).length;

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.55rem 1.15rem',
                    borderRadius: '9999px',
                    border: isActive ? '1px solid #3C2D8C' : '1px solid #E7E1D6',
                    backgroundColor: isActive ? '#3C2D8C' : '#FFFFFF',
                    color: isActive ? '#FAF8F2' : '#211D2D',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontWeight: isActive ? 700 : 500,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: isActive ? '0 4px 14px rgba(60, 45, 140, 0.2)' : 'none',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{cat}</span>
                  <span
                    style={{
                      opacity: isActive ? 0.9 : 0.5,
                      fontSize: '0.65rem'
                    }}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Editorial Masonry Grid */}
          <motion.div
            layout
            className="gallery-editorial-masonry"
            style={{
              columnCount: 3,
              columnGap: '1.75rem'
            }}
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    breakInside: 'avoid',
                    marginBottom: '1.75rem',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E7E1D6',
                    boxShadow: '0 6px 20px rgba(33, 29, 45, 0.04)',
                    cursor: 'pointer',
                    position: 'relative'
                  }}
                  className="gallery-masonry-card"
                  onClick={() => handleOpenLightbox(index)}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenLightbox(index);
                    }
                  }}
                  role="button"
                  aria-label={`View ${item.title}`}
                >
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                      className="gallery-img"
                      onError={(e) => {
                        if (item.fallback) e.currentTarget.src = item.fallback;
                      }}
                    />

                    {/* Subtle Overlay Badge on Hover */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '0.85rem',
                        right: '0.85rem',
                        backgroundColor: 'rgba(33, 29, 45, 0.85)',
                        backdropFilter: 'blur(8px)',
                        color: '#FAF8F2',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.25s ease'
                      }}
                      className="gallery-hover-icon"
                    >
                      <Maximize2 size={14} color="#E3D9A4" />
                    </div>
                  </div>

                  {/* Minimal Caption */}
                  <div style={{ padding: '1.15rem 1.25rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.62rem',
                        letterSpacing: '0.12em',
                        color: '#3C2D8C',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        display: 'block',
                        marginBottom: '0.35rem'
                      }}
                    >
                      {item.category}
                    </span>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display, serif)',
                        fontSize: '1.25rem',
                        color: '#211D2D',
                        margin: '0 0 0.35rem 0',
                        fontWeight: 500,
                        lineHeight: 1.25
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        fontSize: '0.84rem',
                        color: '#6D6877',
                        lineHeight: 1.5,
                        margin: 0
                      }}
                    >
                      {item.caption}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Inspirational Disclaimer Note */}
          <div
            style={{
              marginTop: '4rem',
              padding: '1.5rem',
              backgroundColor: '#FFFFFF',
              borderRadius: '12px',
              border: '1px solid #E7E1D6',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              maxWidth: '850px'
            }}
          >
            <Info size={20} color="#3C2D8C" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.92rem', color: '#211D2D', display: 'block', marginBottom: '0.25rem' }}>
                Interior Inspiration &amp; Material Concepts
              </strong>
              <p style={{ fontSize: '0.84rem', color: '#6D6877', lineHeight: 1.6, margin: 0 }}>
                The imagery above serves as architectural inspiration and finish concepts representing the quality,
                materials, and spatial standards we execute at COLOUR NEST under Mr. Abhishek Rao's consultancy.
                Schedule an on-site consultation to review physical texture swatches and bespoke woodwork samples.
              </p>
            </div>
          </div>

          {/* Interactive Next Steps CTA */}
          <div
            style={{
              marginTop: '3.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              padding: 'clamp(1.25rem, 3.5vw, 2.25rem)',
              backgroundColor: '#3C2D8C',
              color: '#FAF8F2',
              borderRadius: '16px',
              boxShadow: '0 12px 32px rgba(60, 45, 140, 0.25)'
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  color: '#E3D9A4',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '0.4rem'
                }}
              >
                Customise in 3D
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: 'clamp(1.35rem, 3vw, 1.8rem)',
                  margin: '0 0 0.35rem 0'
                }}
              >
                Experience Finishes in the 3D Space Studio
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#E7E1D6', margin: 0, maxWidth: '600px' }}>
                Test wall tints, Italian stucco textures, white oak floors, and lighting atmospheres on our interactive 3D model.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                to="/space-studio"
                style={{
                  backgroundColor: '#E3D9A4',
                  color: '#211D2D',
                  padding: '0.85rem 1.8rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>Launch Space Studio</span>
                <ArrowRight size={14} />
              </Link>

              <Link
                to="/contact"
                style={{
                  backgroundColor: 'transparent',
                  color: '#FAF8F2',
                  padding: '0.85rem 1.6rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  textDecoration: 'none',
                  border: '1px solid rgba(227, 217, 164, 0.5)'
                }}
              >
                <span>Discuss Your Project</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      <GalleryLightbox
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        items={filteredItems}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />

      {/* Responsive layout styles */}
      <style>{`
        .gallery-masonry-card:hover .gallery-img {
          transform: scale(1.03);
        }
        .gallery-masonry-card:hover .gallery-hover-icon {
          opacity: 1 !important;
        }
        @media (max-width: 1024px) {
          .gallery-editorial-masonry {
            column-count: 2 !important;
          }
        }
        @media (max-width: 640px) {
          .gallery-editorial-masonry {
            column-count: 1 !important;
          }
        }
      `}</style>
    </>
  );
};
