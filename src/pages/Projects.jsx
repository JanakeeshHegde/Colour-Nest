import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { projectsData, projectFilters } from '../data/projects';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';
import { ProjectDepthWall } from '../components/interactive/ProjectDepthWall';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [viewMode, setViewMode] = useState('3D_DEPTH'); // '3D_DEPTH' or 'GRID'

  const filteredProjects = activeFilter === 'ALL'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter || p.subCategory === activeFilter);

  return (
    <>
      <SEOHead
        title="Projects — Complete Interior Transformations & Spaces"
        description="Explore Colour Nest's complete interior transformations: double-height penthouses, villa suites, timber pavilions, and executive offices across Bangalore in 3D depth."
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
          <div style={{ maxWidth: '920px', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}>
            <span className="meta-tag" style={{ marginBottom: '1rem' }}>
              DESIGN CONCEPTS &amp; SPATIAL INSPIRATION
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              SPATIAL CONCEPTS. <br />
              <span className="heading-editorial-italic">INSPIRATION.</span>
            </h1>
            <ArchitecturalLine label="SPACE → MATERIAL → FINISH → ATMOSPHERE" coordinates="ARCHITECTURAL INSPIRATION" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              Curated architectural design concepts demonstrating our complete interior execution: double-height living pavilions, contemporary master suites, fluted teak joinery, and executive corporate spaces.
            </p>
          </div>

          {/* View Mode & Filter Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {/* Filters Bar */}
            <div className="filter-bar" style={{ margin: 0 }}>
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

            {/* View Mode Switcher */}
            <div style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--surface-secondary)', padding: '0.35rem', borderRadius: '999px', border: '1px solid var(--border-subtle)' }}>
              <button
                onClick={() => setViewMode('3D_DEPTH')}
                style={{
                  backgroundColor: viewMode === '3D_DEPTH' ? 'var(--accent)' : 'transparent',
                  color: viewMode === '3D_DEPTH' ? '#FFFFFF' : 'var(--ink-secondary)',
                  border: 'none',
                  padding: '0.4rem 1rem',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                3D DEPTH WALL
              </button>
              <button
                onClick={() => setViewMode('GRID')}
                style={{
                  backgroundColor: viewMode === 'GRID' ? 'var(--accent)' : 'transparent',
                  color: viewMode === 'GRID' ? '#FFFFFF' : 'var(--ink-secondary)',
                  border: 'none',
                  padding: '0.4rem 1rem',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                EDITORIAL GRID
              </button>
            </div>
          </div>

          {/* Render 3D Depth Wall or Editorial Grid */}
          {viewMode === '3D_DEPTH' ? (
            <ProjectDepthWall projects={filteredProjects} />
          ) : (
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
          )}
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
