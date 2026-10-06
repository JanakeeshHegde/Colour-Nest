import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { servicesData, serviceFamilies } from '../data/services';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

// Visual preview strategy based on selected layer/family
const familyVisuals = {
  "ALL": {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    caption: "Complete Living Room Environment with integrated ceiling soffits, timber joinery, and Stucco finish."
  },
  "SPACE & INTERIORS": {
    image: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453630232.jpg",
    caption: "Full spatial orchestration: bespoke joinery, partition architecture, and turnkey handover."
  },
  "SURFACES & FINISHES": {
    image: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453135933.jpg",
    caption: "Hand-burnished Italian Stucco marble plaster and artisan Royals Play dimensional glazes."
  },
  "WOOD & MATERIAL": {
    image: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453157525.jpg",
    caption: "Grain-preserving Melamyne and Polycoat liquid crystal sealers for Burma teak and veneers."
  },
  "ARCHITECTURAL ELEMENTS": {
    image: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453486066.jpg",
    caption: "Laser-squared gypsum false ceilings, perimeter soffits, and concealed 3000K cove illumination."
  },
  "EXTERIOR": {
    image: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453192427.jpg",
    caption: "Monsoon-proof exterior elastomer coatings and weather-resistant architectural stone textures."
  }
};

// Family mapping for the 12 services
const serviceToFamily = {
  "customised-interiors": "SPACE & INTERIORS",
  "commercial-interiors": "SPACE & INTERIORS",
  "interiors-decors": "SPACE & INTERIORS",
  "one-stop-solution": "SPACE & INTERIORS",
  "royals-play": "SURFACES & FINISHES",
  "wallpaper-anticco": "SURFACES & FINISHES",
  "stucco-texture": "SURFACES & FINISHES",
  "wood-polish-melamyne-pu": "WOOD & MATERIAL",
  "wood-polish-polycoat": "WOOD & MATERIAL",
  "interior-lighting-fans": "ARCHITECTURAL ELEMENTS",
  "false-ceilings": "ARCHITECTURAL ELEMENTS",
  "exterior-painting": "EXTERIOR"
};

export const Services = () => {
  const [activeFamily, setActiveFamily] = useState('ALL');
  const [expandedServiceId, setExpandedServiceId] = useState(null);

  const filteredServices = activeFamily === 'ALL'
    ? servicesData
    : servicesData.filter((s) => serviceToFamily[s.id] === activeFamily);

  const currentVisual = familyVisuals[activeFamily] || familyVisuals["ALL"];

  return (
    <>
      <SEOHead
        title="Interior Systems & Disciplines"
        description="One space. Many layers. Explore Colour Nest's 5 architectural service families: Space & Interiors, Surfaces & Finishes, Wood & Materials, Architectural Elements, and Exterior Facades."
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
          <div style={{ maxWidth: '960px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <span className="meta-tag" style={{ marginBottom: '1rem' }}>
              SPATIAL DISCIPLINES &amp; SYSTEMS
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              ONE SPACE. <br />
              <span className="heading-editorial-italic">MANY LAYERS.</span>
            </h1>
            <ArchitecturalLine label="5 ARCHITECTURAL FAMILIES • 12 SPECIALIZED DISCIPLINES" coordinates="COMPLETE INTERIOR STUDIO" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              We orchestrate the entire environment. Rather than hiring disconnected contractors, Colour Nest integrates
              turnkey interiors, custom woodwork, false ceilings, architectural light, and fine surface plasters into a cohesive sanctuary.
            </p>
          </div>

          {/* Interactive Family Tabs */}
          <div className="filter-bar" style={{ marginBottom: '3rem' }}>
            {["ALL", "SPACE & INTERIORS", "SURFACES & FINISHES", "WOOD & MATERIAL", "ARCHITECTURAL ELEMENTS", "EXTERIOR"].map((fam) => (
              <button
                key={fam}
                onClick={() => {
                  setActiveFamily(fam);
                  setExpandedServiceId(null);
                }}
                className={`filter-pill ${activeFamily === fam ? 'active' : ''}`}
                data-cursor="SELECT"
              >
                {fam} {fam === 'ALL' ? `(${servicesData.length})` : ''}
              </button>
            ))}
          </div>

          {/* Interactive Visual Hero Showcase for the Active Family */}
          <div
            className="arch-card"
            style={{
              padding: 0,
              overflow: 'hidden',
              marginBottom: '4rem',
              backgroundColor: '#121213',
              color: '#FFFFFF'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', alignItems: 'center' }}>
              {/* Dynamic Context Visual */}
              <div className="aspect-16-9" style={{ minHeight: '340px' }}>
                <img
                  src={currentVisual.image}
                  alt={activeFamily}
                  className="aspect-fill"
                  style={{ filter: 'contrast(1.08)' }}
                />
              </div>

              {/* Family Explanation & Breadth Statement */}
              <div style={{ padding: 'clamp(2rem, 4vw, 3.5rem)' }}>
                <span className="meta-tag" style={{ color: 'var(--accent)', marginBottom: '0.75rem' }}>
                  ACTIVE SYSTEM LAYER
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: '#FFFFFF', marginBottom: '0.75rem' }}>
                  {activeFamily === 'ALL' ? 'Integrated Spatial Symphony' : activeFamily}
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {currentVisual.caption}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)' }}>
                  <Layers size={16} />
                  <span>WE HANDLE THE ENVIRONMENT AS A WHOLE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services Vertical Architectural Wall */}
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border-medium)' }}>
            {filteredServices.map((service) => {
              const isExpanded = expandedServiceId === service.id;
              const familyName = serviceToFamily[service.id];

              return (
                <div
                  key={service.id}
                  style={{
                    borderBottom: '1px solid var(--border-medium)',
                    padding: 'clamp(1.75rem, 3.5vw, 2.75rem) 0',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div
                    onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'clamp(40px, 8vw, 80px) 1fr auto',
                      alignItems: 'center',
                      gap: 'clamp(1rem, 3vw, 2.5rem)',
                      cursor: 'pointer'
                    }}
                    data-cursor={isExpanded ? 'COLLAPSE' : 'EXPAND'}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                        fontWeight: 300,
                        color: isExpanded ? 'var(--accent)' : 'var(--ink-muted)'
                      }}
                    >
                      {service.number}
                    </span>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                        <span className="meta-tag" style={{ fontSize: '0.65rem' }}>
                          {familyName}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                          fontWeight: 400,
                          color: isExpanded ? 'var(--accent)' : 'var(--ink-primary)'
                        }}
                      >
                        {service.title}
                      </h3>
                      <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.6, maxWidth: '780px', marginTop: '0.4rem' }}>
                        {service.shortDescription}
                      </p>
                    </div>

                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        border: '1px solid var(--border-medium)',
                        backgroundColor: isExpanded ? 'var(--accent)' : 'transparent',
                        color: isExpanded ? '#FFFFFF' : 'var(--ink-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <ArrowUpRight
                        size={18}
                        style={{
                          transform: isExpanded ? 'rotate(90deg)' : 'none',
                          transition: 'transform 0.3s ease'
                        }}
                      />
                    </div>
                  </div>

                  {/* Expanded Detail Panel */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div
                          style={{
                            paddingTop: '2.5rem',
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '2.5rem',
                            borderTop: '1px dashed var(--border-subtle)',
                            marginTop: '2rem'
                          }}
                        >
                          <div className="aspect-16-9" style={{ borderRadius: 'var(--radius-xs)' }}>
                            <img
                              src={service.image}
                              alt={service.title}
                              className="aspect-fill"
                              onError={(e) => {
                                e.currentTarget.src = service.fallbackImage;
                              }}
                            />
                          </div>

                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                              <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                                ARCHITECTURAL SCOPE &amp; DETAILS
                              </span>
                              <p style={{ fontSize: '0.95rem', color: 'var(--ink-primary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                {service.fullDescription}
                              </p>

                              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                Engineering Features:
                              </h4>
                              <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.5rem', color: 'var(--ink-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                                {service.features.map((feat, i) => (
                                  <li key={i} style={{ marginBottom: '0.35rem' }}>{feat}</li>
                                ))}
                              </ul>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                              <Link
                                to={`/services/${service.slug}`}
                                className="btn-primary"
                                data-cursor="VIEW"
                              >
                                <span>Detailed Specifications &amp; Case Study</span>
                                <ArrowRight size={15} />
                              </Link>
                              <Link to="/contact" className="btn-secondary">
                                <span>Consult On This Service</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
