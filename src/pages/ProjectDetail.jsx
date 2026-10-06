import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, MapPin, Calendar, Layers } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { projectsData } from '../data/projects';
import { BeforeAfter } from '../components/interactive/BeforeAfter';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <>
      <SEOHead
        title={`${project.title} — Architectural Narrative`}
        description={`${project.title} (${project.location}). ${project.summary} Executed by Colour Nest, Jayanagar, Bangalore.`}
      />

      <article
        style={{
          paddingTop: 'calc(var(--nav-height) + 1.5rem)',
          backgroundColor: 'var(--surface-primary)',
          color: 'var(--ink-primary)'
        }}
      >
        {/* Navigation Return */}
        <div className="container-wide" style={{ marginBottom: '1.5rem' }}>
          <Link to="/projects" className="btn-ghost">
            <ArrowLeft size={14} />
            <span>Return to Portfolio</span>
          </Link>
        </div>

        {/* Hero Section */}
        <header className="container-wide" style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <div style={{ maxWidth: '980px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span className="meta-tag">{project.category}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                LOCATION: {project.location}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                YEAR: {project.year}
              </span>
            </div>

            <h1 className="heading-display" style={{ marginBottom: '1rem', letterSpacing: '-0.03em' }}>
              {project.title}
            </h1>
            <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--ink-secondary)', lineHeight: 1.6, maxWidth: '850px' }}>
              {project.summary}
            </p>
          </div>
        </header>

        {/* Fullscreen Hero Image */}
        <div className="container-wide" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <div className="aspect-16-9" style={{ borderRadius: 'var(--radius-xs)', boxShadow: 'var(--shadow-dramatic)' }}>
            <img
              src={project.heroImage}
              alt={project.title}
              className="aspect-fill"
              onError={(e) => (e.currentTarget.src = project.fallbackHero)}
            />
          </div>
        </div>

        {/* Architectural Metadata Grid */}
        <div className="container-wide" style={{ marginBottom: '4rem' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              backgroundColor: 'var(--surface-secondary)',
              padding: '2rem',
              borderRadius: 'var(--radius-xs)',
              border: '1px solid var(--border-subtle)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem'
            }}
          >
            <div>
              <strong style={{ color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>PROJECT:</strong>
              <span style={{ color: 'var(--ink-primary)' }}>{project.title}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>CATEGORY / SPACE:</strong>
              <span style={{ color: 'var(--ink-primary)' }}>{project.space}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>CLIENT TYPOLOGY:</strong>
              <span style={{ color: 'var(--ink-primary)' }}>{project.clientType}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>SUPERVISION:</strong>
              <span style={{ color: 'var(--accent)' }}>Mr. Abhishek Rao, Consultant</span>
            </div>
          </div>
        </div>

        {/* 4-Stage Architectural Story Narrative: THE START, DIRECTION, TRANSFORMATION, FINISH */}
        <section className="section-scene" style={{ backgroundColor: 'var(--surface-secondary)' }}>
          <div className="container-wide">
            <div style={{ maxWidth: '850px', marginBottom: '3.5rem' }}>
              <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                SPATIAL NARRATIVE
              </span>
              <h2 className="heading-section">
                HOW THE TRANSFORMATION <span className="heading-editorial-italic">UNFOLDED.</span>
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
              {/* THE START */}
              <div className="arch-card">
                <span className="oversized-number" style={{ fontSize: '3rem' }}>01</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                  The Start
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.7 }}>
                  {project.story.theStart}
                </p>
              </div>

              {/* THE DIRECTION */}
              <div className="arch-card">
                <span className="oversized-number" style={{ fontSize: '3rem' }}>02</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                  The Direction
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.7 }}>
                  {project.story.theDirection}
                </p>
              </div>

              {/* THE TRANSFORMATION */}
              <div className="arch-card">
                <span className="oversized-number" style={{ fontSize: '3rem' }}>03</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                  The Transformation
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.7 }}>
                  {project.story.theTransformation}
                </p>
              </div>

              {/* THE FINISH */}
              <div className="arch-card" style={{ borderLeft: '3px solid var(--accent)' }}>
                <span className="oversized-number" style={{ fontSize: '3rem' }}>04</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
                  The Finish
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.7 }}>
                  {project.story.theFinish}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Before / After Dual-State Viewer */}
        {project.beforeImage && project.afterImage && (
          <section className="section-scene">
            <div className="container-wide">
              <BeforeAfter
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
                title={`${project.title.toUpperCase()} • BEFORE & AFTER`}
                subtitle="Slide to inspect the physical transition from site handover to white-glove finish."
              />
            </div>
          </section>
        )}

        {/* Selected Architectural Palette */}
        {project.palette && (
          <section className="section-scene" style={{ backgroundColor: 'var(--surface-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
            <div className="container-wide">
              <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
                <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                  COLOR &amp; TONE SPECIFICATION
                </span>
                <h3 className="heading-section">
                  THE SPATIAL PALETTE.
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
                {project.palette.map((color) => (
                  <div key={color.hex} className="arch-card" style={{ padding: '1.25rem' }}>
                    <div style={{ height: '70px', borderRadius: 'var(--radius-xs)', backgroundColor: color.hex, marginBottom: '0.75rem', boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.08)' }} />
                    <strong style={{ fontSize: '0.9rem', display: 'block' }}>{color.name}</strong>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-muted)' }}>{color.hex}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className="section-scene" style={{ borderTop: '1px solid var(--border-subtle)' }}>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <span className="meta-tag" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>
              SIMILAR ARCHITECTURAL VISION?
            </span>
            <h2 className="heading-section" style={{ marginBottom: '1rem' }}>
              TRANSFORM YOUR SPACE WITH COLOUR NEST.
            </h2>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
              Consult directly with Abhishek Rao for personalized material boards, site inspection, and transparent milestone estimates.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn-primary" data-cursor="START">
                <span>Start A Spatial Consultation</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/projects" className="btn-secondary">
                <span>Explore Other Case Studies</span>
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};
