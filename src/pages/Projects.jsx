import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { projectsData, projectFilters } from '../data/projects';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredProjects = activeFilter === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter || p.subCategory === activeFilter);

  return (
    <>
      <SEOHead
        title="Projects — Complete Interior Transformations & Spaces"
        description="Explore Colour Nest's complete interior transformations: double-height penthouses, villa suites, timber pavilions, and executive offices across Bangalore."
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
              COMPLETE SPATIAL PORTFOLIO
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              COMPLETE SPACES. <br />
              <span className="heading-editorial-italic">TRANSFORMED.</span>
            </h1>
            <ArchitecturalLine label="SPACE → MATERIAL → FINISH → ATMOSPHERE" coordinates="BANGALORE METRO REGION" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              We transform entire environments rather than just walls. Explore our curated portfolio of residential double-height penthouses, contemporary villa master suites, grand teak dining pavilions, creative commercial offices, and protective exterior stone facades.
            </p>
          </div>

          {/* Spatial Sequence Ribbon */}
          <div style={{ backgroundColor: 'var(--surface-secondary)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xs)', padding: '1rem 1.5rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
            <span style={{ color: 'var(--ink-muted)' }}>PORTFOLIO ARCHITECTURE:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', color: 'var(--ink-secondary)' }}>
              <span>01 / THE SPACE</span>
              <span style={{ color: 'var(--accent)' }}>→</span>
              <span>02 / THE DIRECTION</span>
              <span style={{ color: 'var(--accent)' }}>→</span>
              <span>03 / THE MATERIALS</span>
              <span style={{ color: 'var(--accent)' }}>→</span>
              <span>04 / THE FINISHES</span>
              <span style={{ color: 'var(--accent)' }}>→</span>
              <span>05 / THE LIGHT</span>
              <span style={{ color: 'var(--accent)' }}>→</span>
              <span>06 / THE DETAILS</span>
              <span style={{ color: 'var(--accent)' }}>→</span>
              <strong style={{ color: 'var(--ink-primary)' }}>07 / ATMOSPHERE</strong>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="filter-bar" style={{ marginBottom: '3.5rem' }}>
            {projectFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
                data-cursor="FILTER"
              >
                {f} {f === 'ALL' ? `(${projectsData.length})` : ''}
              </button>
            ))}
          </div>

          {/* Editorial Masonry Grid (Wide, Tall, and Balanced formats prioritizing complete spaces) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(1.5rem, 3.5vw, 3rem)'
            }}
          >
            {filteredProjects.map((project, idx) => {
              const isHeroSpan = idx === 0 || idx === 3;

              return (
                <div
                  key={project.id}
                  style={{
                    gridColumn: `span 12`
                  }}
                  className={`project-grid-item-${idx}`}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="arch-card"
                    style={{
                      display: 'block',
                      padding: 0,
                      overflow: 'hidden',
                      textDecoration: 'none'
                    }}
                    data-cursor="VIEW"
                  >
                    {/* Visual Complete Space Canvas */}
                    <div
                      className={isHeroSpan ? 'aspect-16-9' : idx % 2 === 0 ? 'aspect-4-3' : 'aspect-3-4'}
                    >
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        className="aspect-fill"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = project.fallbackHero;
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '1.25rem',
                          left: '1.25rem',
                          backgroundColor: 'rgba(18, 18, 19, 0.75)',
                          backdropFilter: 'blur(8px)',
                          padding: '0.4rem 0.85rem',
                          borderRadius: 'var(--radius-xs)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.7rem',
                          color: '#FFFFFF'
                        }}
                      >
                        {project.category} • {project.location}
                      </div>

                      <div
                        style={{
                          position: 'absolute',
                          bottom: '1.25rem',
                          right: '1.25rem',
                          backgroundColor: 'rgba(18, 18, 19, 0.75)',
                          backdropFilter: 'blur(8px)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: 'var(--radius-xs)',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.68rem',
                          color: 'var(--accent)'
                        }}
                      >
                        7-PART TRANSFORMATION STORY
                      </div>
                    </div>

                    {/* Editorial Details */}
                    <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span className="meta-tag">{project.space}</span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                          YEAR: {project.year}
                        </span>
                      </div>

                      <h2
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                          marginBottom: '0.75rem',
                          lineHeight: 1.15
                        }}
                      >
                        {project.title}
                      </h2>
                      <p style={{ fontSize: '0.95rem', color: 'var(--ink-secondary)', lineHeight: 1.6, maxWidth: '850px', marginBottom: '1.5rem' }}>
                        {project.summary}
                      </p>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderTop: '1px solid var(--border-subtle)',
                          paddingTop: '1.25rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.75rem',
                          color: 'var(--accent)'
                        }}
                      >
                        <span>INSPECT COMPLETE ARCHITECTURAL CASE STUDY</span>
                        <ArrowUpRight size={16} />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Responsive Grid Column Helpers */}
      <style>{`
        @media (min-width: 900px) {
          .project-grid-item-1 { grid-column: span 7 !important; }
          .project-grid-item-2 { grid-column: span 5 !important; }
          .project-grid-item-4 { grid-column: span 6 !important; }
          .project-grid-item-5 { grid-column: span 6 !important; }
        }
      `}</style>
    </>
  );
};
