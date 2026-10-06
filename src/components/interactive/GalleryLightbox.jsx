import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GalleryLightbox = ({
  isOpen,
  currentIndex,
  items,
  onClose,
  onNext,
  onPrev
}) => {
  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !items || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: 'rgba(10, 10, 11, 0.95)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(1rem, 3vw, 2.5rem)',
        userSelect: 'none'
      }}
      onClick={onClose}
    >
      {/* Top Header: Counter & Close */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#FAF7F2',
          zIndex: 10
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.15em' }}>
          {currentIndex + 1} / {items.length} • {currentItem.category}
        </div>
        <button
          onClick={onClose}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease'
          }}
          aria-label="Close Lightbox"
          data-cursor="CLOSE"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        style={{
          position: 'relative',
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem 0'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Arrows */}
        <button
          onClick={onPrev}
          style={{
            position: 'absolute',
            left: 0,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
          aria-label="Previous Image"
          data-cursor="PREV"
        >
          <ChevronLeft size={24} />
        </button>

        <div style={{ maxWidth: '85vw', maxHeight: '72vh', position: 'relative' }}>
          <img
            src={currentItem.src}
            alt={currentItem.title}
            style={{
              maxWidth: '100%',
              maxHeight: '72vh',
              objectFit: 'contain',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
              borderRadius: 'var(--radius-xs)'
            }}
            onError={(e) => {
              if (currentItem.fallback) e.currentTarget.src = currentItem.fallback;
            }}
          />
        </div>

        <button
          onClick={onNext}
          style={{
            position: 'absolute',
            right: 0,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10
          }}
          aria-label="Next Image"
          data-cursor="NEXT"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Bottom Caption & Architectural Information */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1rem',
          color: '#FAF7F2',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '1rem',
          zIndex: 10
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.25rem' }}>
            {currentItem.title}
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)' }}>
            {currentItem.caption}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {currentItem.tags && currentItem.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '0.3rem 0.6rem',
                borderRadius: 'var(--radius-xs)',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
