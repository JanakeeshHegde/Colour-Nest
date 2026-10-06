import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';
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
        title="Projects — Editorial Architectural Portfolio"
        description="Explore Colour Nest's residential and commercial interior transformations across Jayanagar, Indiranagar, Koramangala, and Bangalore. Authentic project narratives."
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
              CURATED CASE STUDIES
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              SELECTED <br />
              <span className="heading-editorial-italic">SPACES.</span>
            </h1>
            <ArchitecturalLine label="VERIFIED RESIDENTIAL & COMMERCIAL PORTFOLIO" coordinates="BANGALORE METRO REGION" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              A non-uniform editorial collection of homes, villas, executive offices, and exterior facades
              transformed through artisan plaster, fine timber glazing, and sculpted lighting.
            </p>
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

          {/* Editorial Masonry Grid (Wide, Tall, and Balanced formats) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: 'clamp(1.5rem, 3.5vw, 3rem)'
            }}
          >
            {filteredProjects.map((project, idx) => {
              // Create dynamic editorial spans
              const isHeroSpan = idx === 0 || idx === 3;
              const gridColSpan = isHeroSpan ? 'span 12' : idx % 2 === 0 ? 'span 7' : 'span 5';

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
                    {/* Visual Canvas */}
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
                        <span>INSPECT ARCHITECTURAL CASE STUDY</span>
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
