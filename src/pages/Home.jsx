import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, CheckCircle2, Shield, Award, Clock, Wrench } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { RoomTransformation } from '../components/interactive/RoomTransformation';
import { BeforeAfter } from '../components/interactive/BeforeAfter';
import { MaterialExplorer } from '../components/interactive/MaterialExplorer';
import { PaintPlanner } from '../components/interactive/PaintPlanner';
import { siteData } from '../data/siteData';
import { projectsData } from '../data/projects';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

export const Home = () => {
  return (
    <>
      <SEOHead
        title="Step Inside"
        description="Step inside Colour Nest — a luxury architectural showroom and interactive interior laboratory in Jayanagar, Bangalore. Explore Venetian Stucco, Royals Play, Melamyne & Polycoat Wood finishes."
      />

      {/* Flagship Complete Interior Room Walkthrough (Scene 01 to Scene 08) */}
      <RoomTransformation />

      {/* ------------------------------------------------------------- */}
      {/* ARCHITECTURAL DISCIPLINES MARQUEE (Broad Interior Spectrum)   */}
      {/* ------------------------------------------------------------- */}
      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--surface-secondary)',
          padding: '1.25rem 0',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div className="marquee-track" style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap' }}>
          {[
            'INTERIORS',
            'TEXTURES',
            'WOOD',
            'LIGHTING',
            'CEILINGS',
            'WALLPAPER',
            'PAINT',
            'DECOR',
            'COMMERCIAL',
            'EXTERIOR',
            'INTERIORS',
            'TEXTURES',
            'WOOD',
            'LIGHTING',
            'CEILINGS',
            'WALLPAPER',
            'PAINT',
            'DECOR',
            'COMMERCIAL',
            'EXTERIOR'
          ].map((item, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                letterSpacing: '0.22em',
                fontWeight: 700,
                color: idx % 2 === 0 ? 'var(--ink-primary)' : 'var(--accent)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.5rem'
              }}
            >
              <span>{item}</span>
              <span style={{ opacity: 0.3 }}>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SCENE 08 — IMMERSIVE BEFORE / AFTER TRANSFORMATION DIVIDER    */}
      {/* ------------------------------------------------------------- */}
      <section className="section-scene arch-grid-bg" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-wide">
          <BeforeAfter
            title="THE RAW TO REFINED DICHOTOMY"
            subtitle="Drag the interactive architectural slider to inspect how raw concrete transforms into light-responsive Italian Stucco."
          />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SCENE 09 — TACTILE MATERIAL EXPLORER                          */}
      {/* ------------------------------------------------------------- */}
      <section className="section-scene" style={{ backgroundColor: 'var(--surface-primary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-wide">
          <div style={{ maxWidth: '850px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
              PHYSICAL MATERIAL CATALOGUE
            </span>
            <h2 className="heading-display">
              TOUCH <span className="heading-editorial-italic">THE SURFACE.</span>
            </h2>
            <ArchitecturalLine label="MINERAL • PIGMENT • GRAIN" coordinates="CRAFT ACCREDITATION" />
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              Inspect genuine architectural plasters, grain-preserving timber sealants, precision wallpapers, and integrated cove lighting used across Bangalore projects.
            </p>
          </div>

          <MaterialExplorer />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* VERIFIED SPECIALITIES (Genuine 7 Specialities)                */}
      {/* ------------------------------------------------------------- */}
      <section className="section-scene" style={{ backgroundColor: 'var(--surface-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-wide">
          <div style={{ maxWidth: '850px', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
              OUR FOUNDATIONAL COMMITMENTS
            </span>
            <h2 className="heading-display">
              WHY ARCHITECTS &amp; CLIENTS <br />
              <span className="heading-editorial-italic">CHOOSE COLOUR NEST.</span>
            </h2>
            <ArchitecturalLine label="VERIFIED OPERATIONAL PRINCIPLES" coordinates="BANGALORE CHAPTER" />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}
          >
            {siteData.specialities.map((item) => (
              <div key={item.id} className="arch-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span className="oversized-number" style={{ fontSize: '3rem' }}>{item.number}</span>
                    <CheckCircle2 size={20} color="var(--accent)" />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '0.75rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* FEATURED PROJECTS MASONRY PREVIEW                             */}
      {/* ------------------------------------------------------------- */}
      <section className="section-scene" style={{ backgroundColor: 'var(--surface-primary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-wide">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
            <div>
              <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
                PORTFOLIO EXCERPT
              </span>
              <h2 className="heading-display">
                SELECTED <span className="heading-editorial-italic">PROJECTS.</span>
              </h2>
            </div>
            <Link to="/projects" className="btn-secondary" data-cursor="VIEW">
              <span>View All Architectural Case Studies</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {projectsData.slice(0, 3).map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.slug}`}
                className="arch-card"
                style={{ padding: 0, overflow: 'hidden', textDecoration: 'none' }}
                data-cursor="INSPECT"
              >
                <div className="aspect-16-9">
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
                      top: '1rem',
                      left: '1rem',
                      backgroundColor: 'rgba(18, 18, 19, 0.8)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-xs)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: '#FFFFFF'
                    }}
                  >
                    {project.category} • {project.location}
                  </div>
                </div>

                <div style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '0.5rem' }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {project.summary}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)' }}>
                    <span>READ ARCHITECTURAL STORY</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* SURFACE & MATERIAL PLANNING ESTIMATOR                         */}
      {/* ------------------------------------------------------------- */}
      <section className="section-scene" style={{ backgroundColor: 'var(--surface-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container-wide">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
            <span className="meta-tag" style={{ marginBottom: '0.75rem', display: 'inline-flex' }}>
              PLANNING &amp; PREPARATION
            </span>
            <h2 className="heading-section">
              ESTIMATE YOUR SPATIAL NEEDS.
            </h2>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
              Calculate paintable wall dimensions and approximate material liters for your upcoming renovation.
            </p>
          </div>

          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <PaintPlanner />
          </div>
        </div>
      </section>
    </>
  );
};
