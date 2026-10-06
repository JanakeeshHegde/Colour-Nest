import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, MapPin, Calendar, Layers, Sparkles, Sun, Eye, Hammer, Compass } from 'lucide-react';
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

  const storySteps = [
    { number: "01", key: "theSpace", title: "THE SPACE", subtitle: "Spatial Volume & Initial Context", icon: Compass, content: project.story.theSpace },
    { number: "02", key: "theDirection", title: "THE DIRECTION", subtitle: "Design Intent & Architectural Concept", icon: Layers, content: project.story.theDirection },
    { number: "03", key: "theMaterials", title: "THE MATERIALS", subtitle: "Curated Textures, Timber & Stone", icon: Hammer, content: project.story.theMaterials },
    { number: "04", key: "theFinishes", title: "THE FINISHES", subtitle: "Artisanal Plaster, Polycoat & Sheen", icon: CheckCircle2, content: project.story.theFinishes },
    { number: "05", key: "theLight", title: "THE LIGHT", subtitle: "Cove Illuminations & Daylight Dynamics", icon: Sun, content: project.story.theLight },
    { number: "06", key: "theDetails", title: "THE DETAILS", subtitle: "Shadow Reveals, Trim Seams & Hardware", icon: Eye, content: project.story.theDetails },
    { number: "07", key: "theAtmosphere", title: "THE RESULTING ATMOSPHERE", subtitle: "The Complete Living Transformation", icon: Sparkles, content: project.story.theAtmosphere }
  ];

  return (
    <>
      <SEOHead
        title={`${project.title} — Architectural Interior Case Study`}
        description={`${project.title} (${project.location}). ${project.summary} Complete interior transformation by Colour Nest, Jayanagar, Bangalore.`}
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

        {/* Fullscreen Hero Image showing complete space */}
        <div className="container-wide" style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
          <div className="aspect-16-9" style={{ borderRadius: 'var(--radius-xs)', boxShadow: 'var(--shadow-dramatic)', overflow: 'hidden' }}>
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
              <strong style={{ color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>SPATIAL SCOPE:</strong>
              <span style={{ color: 'var(--ink-primary)' }}>{project.space}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>TYPOLOGY:</strong>
              <span style={{ color: 'var(--ink-primary)' }}>{project.clientType}</span>
            </div>
            <div>
              <strong style={{ color: 'var(--ink-muted)', display: 'block', marginBottom: '4px' }}>SUPERVISION:</strong>
              <span style={{ color: 'var(--accent)' }}>Mr. Abhishek Rao, Consultant</span>
            </div>
          </div>
        </div>

        {/* Interior Transformation Sequence Banner */}
        <div style={{ backgroundColor: 'var(--surface-elevated)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '1rem 0', marginBottom: '4rem' }}>
          <div className="container-wide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--ink-secondary)' }}>
            <span>SPACE</span>
            <span style={{ color: 'var(--accent)' }}>→</span>
            <span>DIRECTION</span>
            <span style={{ color: 'var(--accent)' }}>→</span>
            <span>MATERIALS</span>
            <span style={{ color: 'var(--accent)' }}>→</span>
            <span>FINISHES</span>
            <span style={{ color: 'var(--accent)' }}>→</span>
            <span>LIGHT</span>
            <span style={{ color: 'var(--accent)' }}>→</span>
            <span>DETAILS</span>
            <span style={{ color: 'var(--accent)' }}>→</span>
            <strong style={{ color: 'var(--ink-primary)' }}>ATMOSPHERE</strong>
          </div>
        </div>

        {/* 7-Stage Architectural Interior Story Narrative */}
        <section className="section-scene" style={{ backgroundColor: 'var(--surface-secondary)' }}>
          <div className="container-wide">
            <div style={{ maxWidth: '850px', marginBottom: '3.5rem' }}>
              <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                COMPLETE SPATIAL TRANSFORMATION STORY
              </span>
              <h2 className="heading-section">
                HOW THE SPACE <span className="heading-editorial-italic">CAME TOGETHER.</span>
              </h2>
              <ArchitecturalLine label="THE 7 LAYERS OF TRANSFORMATION" coordinates="BREADTH OF DISCIPLINE" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '2rem' }}>
              {storySteps.map((step) => {
                const IconComponent = step.icon;
                const isClimax = step.key === "theAtmosphere";

                return (
                  <div
                    key={step.key}
                    className="arch-card"
                    style={{
                      borderTop: isClimax ? '3px solid var(--accent)' : '1px solid var(--border-subtle)',
                      backgroundColor: isClimax ? 'var(--surface-primary)' : 'var(--surface-elevated)',
                      padding: '2rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span className="oversized-number" style={{ fontSize: '2.5rem', lineHeight: 1 }}>{step.number}</span>
                      <IconComponent size={20} color="var(--accent)" />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-muted)', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>
                      {step.subtitle}
                    </span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '1rem', color: isClimax ? 'var(--accent)' : 'var(--ink-primary)' }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.7 }}>
                      {step.content}
                    </p>
                  </div>
                );
              })}
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
                subtitle="Slide to inspect the complete transition from unfinished shell to liveable luxury."
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
                  INTEGRATED MATERIAL &amp; TONE SPECIFICATION
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

        {/* Supporting Architectural Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="section-scene">
            <div className="container-wide">
              <div style={{ maxWidth: '850px', marginBottom: '2.5rem' }}>
                <span className="meta-tag" style={{ marginBottom: '0.5rem' }}>
                  ARCHITECTURAL DETAILS &amp; ELEVATIONS
                </span>
                <h3 className="heading-section">
                  SUPPORTING PERSPECTIVES.
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {project.gallery.map((imgUrl, i) => (
                  <div key={i} className="aspect-4-3" style={{ borderRadius: 'var(--radius-xs)', overflow: 'hidden', boxShadow: 'var(--shadow-subtle)' }}>
                    <img src={imgUrl} alt={`${project.title} detail ${i + 1}`} className="aspect-fill" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className="section-scene" style={{ borderTop: '1px solid var(--border-subtle)', backgroundColor: 'var(--surface-secondary)' }}>
          <div className="container-narrow" style={{ textAlign: 'center' }}>
            <span className="meta-tag" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>
              SIMILAR ARCHITECTURAL VISION?
            </span>
            <h2 className="heading-section" style={{ marginBottom: '1rem' }}>
              TRANSFORM YOUR SPACE WITH COLOUR NEST.
            </h2>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
              Consult directly with Abhishek Rao for personalized material boards, spatial lighting analysis, and transparent itemized estimates.
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
