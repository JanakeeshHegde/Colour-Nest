import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, X, Sparkles, Layers, Sliders, Info } from 'lucide-react';
import { texturesData, materialCategories } from '../../data/textures';

export const MaterialExplorer = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const filteredMaterials = activeCategory === 'ALL'
    ? texturesData
    : texturesData.filter(m => m.category === activeCategory);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Category Filter Tabs */}
      <div className="filter-bar" style={{ marginBottom: '2.5rem' }}>
        <button
          onClick={() => setActiveCategory('ALL')}
          className={`filter-pill ${activeCategory === 'ALL' ? 'active' : ''}`}
          data-cursor="PICK"
        >
          ALL MATERIALS ({texturesData.length})
        </button>
        {materialCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
            data-cursor="PICK"
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Materials Tactile Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}
      >
        {filteredMaterials.map((material) => (
          <div
            key={material.id}
            onClick={() => setSelectedMaterial(material)}
            className="arch-card"
            style={{
              cursor: 'pointer',
              overflow: 'hidden',
              padding: 0
            }}
            data-cursor="INSPECT"
          >
            {/* Visual Surface with Fixed Aspect Ratio */}
            <div className="aspect-16-9">
              <img
                src={material.realImage}
                alt={material.title}
                className="aspect-fill"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = material.highResImage;
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  backgroundColor: 'rgba(18, 18, 19, 0.75)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: 'var(--radius-xs)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  color: '#FFFFFF'
                }}
              >
                {material.category}
              </div>
            </div>

            {/* Tactile Card Details */}
            <div style={{ padding: '1.75rem' }}>
              <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                {material.origin}
              </span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                {material.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {material.description}
              </p>

              <div
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--accent)'
                }}
              >
                <span>TOUCH &amp; INSPECT</span>
                <ArrowUpRight size={15} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Material Inspection Modal */}
      {selectedMaterial && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 9999,
            backgroundColor: 'rgba(18, 18, 19, 0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(1rem, 4vw, 3rem)'
          }}
          onClick={() => setSelectedMaterial(null)}
        >
          <div
            className="arch-card"
            style={{
              width: '100%',
              maxWidth: '900px',
              maxHeight: '90vh',
              overflowY: 'auto',
              backgroundColor: 'var(--surface-primary)',
              position: 'relative',
              padding: 'clamp(1.5rem, 4vw, 3rem)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMaterial(null)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--surface-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--ink-primary)'
              }}
              aria-label="Close Material Modal"
            >
              <X size={18} />
            </button>

            <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
              MATERIAL SPECIFICATION • {selectedMaterial.category}
            </span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', marginBottom: '0.5rem' }}>
              {selectedMaterial.title}
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '2rem' }}>
              {selectedMaterial.subtitle}
            </p>

            {/* Visual Surface Preview */}
            <div className="aspect-16-9" style={{ borderRadius: 'var(--radius-xs)', marginBottom: '2rem' }}>
              <img
                src={selectedMaterial.realImage}
                alt={selectedMaterial.title}
                className="aspect-fill"
                onError={(e) => {
                  e.currentTarget.src = selectedMaterial.highResImage;
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Artisan Description
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
                  {selectedMaterial.description}
                </p>
              </div>

              <div>
                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Technical Parameters
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  <div><strong>Composition:</strong> {selectedMaterial.technicalSpec.composition}</div>
                  <div><strong>Sheen Level:</strong> {selectedMaterial.technicalSpec.sheenLevel}</div>
                  <div><strong>Thickness:</strong> {selectedMaterial.technicalSpec.thickness}</div>
                  <div><strong>Environment:</strong> {selectedMaterial.technicalSpec.voc}</div>
                </div>
              </div>
            </div>

            {/* Related Service Action */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-muted)' }}>
                EXECUTED UNDER COLOUR NEST SUPERVISION
              </span>
              <Link
                to={`/services/${selectedMaterial.serviceSlug}`}
                className="btn-primary"
                data-cursor="VIEW"
              >
                <span>Explore Related Service</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
