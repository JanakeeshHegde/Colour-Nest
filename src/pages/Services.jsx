import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { servicesData, serviceCategories } from '../data/services';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

export const Services = () => {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [hoveredService, setHoveredService] = useState(null);
  const [expandedServiceId, setExpandedServiceId] = useState(null);

  const filteredServices = activeCategory === 'ALL'
    ? servicesData
    : servicesData.filter(s => s.category === activeCategory);

  return (
    <>
      <SEOHead
        title="Services — Interactive Wall"
        description="Explore Colour Nest's 12 signature interior & painting disciplines: Royals Play, Stucco, Anticco, Melamyne & PU Wood Polish, Smart Lighting, False Ceilings, and Turnkey Solutions in Bangalore."
      />

      <section
        style={{
          paddingTop: 'calc(var(--nav-height) + 3rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          backgroundColor: 'var(--surface-primary)',
          minHeight: '100vh',
          position: 'relative'
        }}
      >
        <div className="container-wide">
          {/* Header */}
          <div style={{ maxWidth: '920px', marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
            <span className="meta-tag" style={{ marginBottom: '1rem' }}>
              COLOUR NEST ARCHITECTURAL MATRIX
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1.25rem' }}>
              SERVICES &amp; <br />
              <span className="heading-editorial-italic">DISCIPLINES.</span>
            </h1>
            <ArchitecturalLine label="12 CORE CAPABILITIES" coordinates="JAYANAGAR SHOWROOM" />
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              A vertical architectural wall of specialized surface crafts, timber preservations,
              integrated illumination, and turnkey residential transformations.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="filter-bar" style={{ marginBottom: '3.5rem' }}>
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedServiceId(null);
                }}
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                data-cursor="FILTER"
              >
                {cat} {cat === 'ALL' ? `(${servicesData.length})` : ''}
              </button>
            ))}
          </div>

          {/* Interactive Vertical Service Wall */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              borderTop: '1px solid var(--border-medium)'
            }}
          >
            {filteredServices.map((service, index) => {
              const isHovered = hoveredService?.id === service.id;
              const isExpanded = expandedServiceId === service.id;
              const isQuiet = hoveredService && !isHovered && !isExpanded;

              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setHoveredService(service)}
                  onMouseLeave={() => setHoveredService(null)}
                  style={{
                    position: 'relative',
                    borderBottom: '1px solid var(--border-medium)',
                    padding: 'clamp(1.75rem, 3.5vw, 2.75rem) 0',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    opacity: isQuiet ? 0.4 : 1
                  }}
                  className="service-wall-row"
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
                    {/* Number */}
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                        fontWeight: 300,
                        color: isHovered || isExpanded ? 'var(--accent)' : 'var(--ink-muted)',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {service.number}
                    </span>

                    {/* Title & Short Description */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                        <span className="meta-tag" style={{ fontSize: '0.65rem' }}>
                          {service.category}
                        </span>
                      </div>
                      <h2
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.5rem, 3.2vw, 2.6rem)',
                          fontWeight: 400,
                          letterSpacing: '-0.02em',
                          color: isHovered || isExpanded ? 'var(--accent)' : 'var(--ink-primary)',
                          transition: 'color 0.3s ease'
                        }}
                      >
                        {service.title}
                      </h2>
                      <p
                        style={{
                          fontSize: '0.92rem',
                          color: 'var(--ink-secondary)',
                          lineHeight: 1.6,
                          maxWidth: '780px',
                          marginTop: '0.4rem'
                        }}
                      >
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* Arrow / Action */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          border: '1px solid var(--border-medium)',
                          backgroundColor: isHovered || isExpanded ? 'var(--accent)' : 'transparent',
                          color: isHovered || isExpanded ? '#FFFFFF' : 'var(--ink-primary)',
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
                          {/* Real Genuine Image from Reference */}
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

                          {/* Full Architectural Description & Features */}
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                              <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                                ARCHITECTURAL APPLICATION
                              </span>
                              <p style={{ fontSize: '0.95rem', color: 'var(--ink-primary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                                {service.fullDescription}
                              </p>

                              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                                Key Engineering Features:
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
                                <span>Dedicated Case Study &amp; Specs</span>
                                <ArrowRight size={15} />
                              </Link>
                              <Link
                                to="/contact"
                                className="btn-secondary"
                              >
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
