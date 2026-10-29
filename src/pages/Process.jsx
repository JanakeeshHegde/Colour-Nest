import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown, ArrowUp, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';
import { IMAGE_MANIFEST } from '../data/imageManifest';

const processSteps = [
  {
    number: "01",
    title: "CONSULTATION",
    subtitle: "Spatial Brief & Lifestyle Dialogue",
    description: "Every interior begins with attentive listening. Mr. Abhishek Rao personally conducts an initial dialogue to understand your family's daily rituals, functional requirements, aesthetic tastes, and project scope — from single-room updates to full turnkey residences.",
    details: [
      "In-depth dialogue on spatial usage, family habits, and sensory preferences",
      "Evaluation of architectural drawings, floor plans, and spatial priorities",
      "Discussion of complete interior components: ceilings, woodwork, lighting, finishes",
      "Clear timeline and budget alignment without ambiguous extras"
    ],
    image: IMAGE_MANIFEST["about-interior-workspace"].url
  },
  {
    number: "02",
    title: "UNDERSTAND THE SPACE",
    subtitle: "Spatial Context & Substrate Audit",
    description: "We rigorously assess the architectural canvas. We inspect room geometry, ceiling heights, ventilation, natural daylight trajectories from sunrise to twilight, and conduct electronic substrate moisture testing before recommending any material.",
    details: [
      "Substrate moisture meter and efflorescence testing across masonry surfaces",
      "Daylight intensity mapping and shadow path analysis across key rooms",
      "Inspection of existing walls, beams, electrical conduits, and floor transitions",
      "Laser-measured dimensional survey for precise surface and joinery calculations"
    ],
    image: IMAGE_MANIFEST["process-spatial-blueprint"].url
  },
  {
    number: "03",
    title: "DESIGN & MATERIAL DIRECTION",
    subtitle: "Holistic Palette & Spatial Harmony",
    description: "True luxury is cohesive. We build an integrated material direction that unites woodwork tones, wallpaper patterns, false ceiling elevations, cove lighting schemes, and artisanal wall plasters into one balanced environment.",
    details: [
      "Tactile mood board synthesis: timber veneers, stone, metal accents, and plaster",
      "False ceiling drop designs coordinated with indirect architectural cove lighting",
      "Hierarchical surface mapping: focal walls, quiet zones, and architectural joinery",
      "3D spatial mood boards and interior lighting zone schematics"
    ],
    image: IMAGE_MANIFEST["material-stucco-finish"].url
  },
  {
    number: "04",
    title: "COLOUR / FINISH SELECTION",
    subtitle: "Live On-Site Swatches & Light Calibration",
    description: "Colour chips on paper can mislead under real-world home illumination. We prepare on-site 2x2 ft physical sample swatches of Italian Stucco, Anticco, Royals Play glazes, and wood stains directly under your home's actual lighting.",
    details: [
      "On-wall live test swatches inspected under 3000K warm vs 4000K ambient light",
      "Selection of tactile surface sheen: velvet Stucco, aged Anticco, or satin wood",
      "Polycoat and PU wood stain testing on target teak and oak timber samples",
      "Final client sign-off on physical tactile samples before material procurement"
    ],
    image: IMAGE_MANIFEST["material-anticco-texture"].url
  },
  {
    number: "05",
    title: "QUOTATION",
    subtitle: "Transparent, Itemized Investment Plan",
    description: "Honesty is the foundation of our studio. You receive a structured, transparent bill of quantities detailing exact material grades, brand tiers, labor stages, protective masking, and clear milestone schedules with zero hidden extras.",
    details: [
      "Transparent line-item breakdown of walls, false ceilings, timber, and finishes",
      "Explicit specification of premium coatings, primers, and Italian plaster formulations",
      "Phase-linked milestone payment schedule tied to verified inspection stages",
      "Structured execution timeline with defined commencement and milestone handover phases"
    ],
    image: IMAGE_MANIFEST["process-spatial-blueprint"].url
  },
  {
    number: "06",
    title: "EXECUTION",
    subtitle: "Protective Masking & Master Craftsmanship",
    description: "We treat your space with surgical care. Floors and furniture are sealed with heavy-duty protective underlayment. Master applicators and interior technicians execute false ceilings, woodwork polishing, surface preparation, and specialized finishes.",
    details: [
      "Multi-layer protective floor masking and zero-bleed tape seal around fixtures",
      "Dustless mechanical vacuum sanding to establish mirror-flat substrates",
      "Laser-aligned false ceiling grid erection and cove lighting installation",
      "Layer-by-layer hand troweling of Italian Stucco and airless spray applications"
    ],
    image: IMAGE_MANIFEST["process-craftsmanship"].url
  },
  {
    number: "07",
    title: "DETAILING",
    subtitle: "Micro-Finishing, Trim Alignment & Lighting Tuning",
    description: "Exceptional spaces are distinguished by meticulous micro-details. We fine-tune joinery interfaces, align switch plates, burnish high-traffic plaster corners, seal wallpaper borders, and calibrate indirect LED cove temperatures.",
    details: [
      "High-intensity raking light inspection across all wall planes and ceiling soffits",
      "Precision caulking between woodwork, stone skirting, and gypsum coves",
      "Dimmer module and 3000K warm LED cove lumen calibration for seamless ambience",
      "Final protective finishing coats applied to architectural wood and plaster accents"
    ],
    image: IMAGE_MANIFEST["architectural-false-ceiling"].url
  },
  {
    number: "08",
    title: "HANDOVER",
    subtitle: "White-Glove Deep Clean & Living Room Reveal",
    description: "The transformation is unveiled. Protective masking is gently removed, surfaces are vacuumed clean, and your space is presented in pristine, move-in ready elegance accompanied by a complete care dossier and touch-up formulas.",
    details: [
      "Residue-free masking removal and comprehensive post-transformation deep cleanup",
      "Client walkthrough with Mr. Abhishek Rao verifying every spatial detail",
      "Handover of touch-up kit and exact tint formula records for future reference",
      "Comprehensive interior care dossier for lasting finish longevity"
    ],
    image: IMAGE_MANIFEST["hero-architectural-main"].url
  }
];

export const Process = () => {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const stageRefs = useRef([]);
  const navContainerRef = useRef(null);

  // Smooth scroll to a target stage by index
  const scrollToStage = (index) => {
    setActiveStageIdx(index);
    const targetEl = stageRefs.current[index];
    if (targetEl) {
      const isReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const navOffset = 140; // Combined height of fixed navbar + sticky stage bar + buffer
      const elementTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementTop - navOffset),
        behavior: isReduced ? 'auto' : 'smooth'
      });
    }
  };

  // Scroll spy: Update active stage indicator as user scrolls naturally through all 8 stages
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      let currentIdx = 0;

      for (let i = 0; i < stageRefs.current.length; i++) {
        const el = stageRefs.current[i];
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentIdx = i;
          }
        }
      }

      setActiveStageIdx(currentIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure active pill in horizontal scrollbar remains visible on mobile
  useEffect(() => {
    if (navContainerRef.current) {
      const activeBtn = navContainerRef.current.children[activeStageIdx];
      if (activeBtn) {
        const container = navContainerRef.current;
        const btnLeft = activeBtn.offsetLeft;
        const btnWidth = activeBtn.offsetWidth;
        const containerWidth = container.offsetWidth;
        const currentScroll = container.scrollLeft;

        if (btnLeft < currentScroll || btnLeft + btnWidth > currentScroll + containerWidth) {
          container.scrollTo({
            left: btnLeft - containerWidth / 2 + btnWidth / 2,
            behavior: 'smooth'
          });
        }
      }
    }
  }, [activeStageIdx]);

  return (
    <>
      <SEOHead
        title="Interior Workflow — 8-Stage Spatial Transformation Process"
        description="From initial consultation to white-glove handover. Discover Colour Nest's disciplined 8-stage interior project workflow in Jayanagar, Bangalore."
      />

      <section
        style={{
          paddingTop: 'calc(var(--nav-height, 84px) + 2rem)',
          paddingBottom: 'clamp(4rem, 8vw, 7rem)',
          backgroundColor: 'var(--surface-primary, #FAF8F2)',
          minHeight: '100vh',
          color: 'var(--ink-primary, #211D2D)'
        }}
      >
        <div className="container-wide">
          {/* Monumental Header */}
          <div style={{ maxWidth: '920px', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
            <span className="meta-tag" style={{ marginBottom: '1rem' }}>
              INTERIOR PROJECT WORKFLOW
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              HOW A COMPLETE SPACE <br />
              <span className="heading-editorial-italic">COMES TOGETHER.</span>
            </h1>
            <ArchitecturalLine label="8-STAGE INTERIOR EXECUTION PROTOCOL" coordinates="STRICT CRAFTSMANSHIP STANDARDS" />
            <p
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
                color: 'var(--ink-secondary, #4A4657)',
                lineHeight: 1.65,
                marginTop: '1.25rem'
              }}
            >
              A disciplined sequence transforms architectural intent into a living, breathing environment.
              From spatial discovery to fine detailing, our 8-stage roadmap ensures effortless execution, clean site conditions, and enduring elegance.
            </p>
          </div>

          {/* Sticky 8-Step Navigator Bar */}
          <div
            style={{
              position: 'sticky',
              top: 'calc(var(--nav-height, 84px) + 0.5rem)',
              zIndex: 80,
              backgroundColor: 'rgba(250, 248, 242, 0.96)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              padding: '0.75rem 0',
              marginBottom: '3rem',
              borderTop: '1px solid var(--border-subtle, #E7E1D6)',
              borderBottom: '1px solid var(--border-subtle, #E7E1D6)',
              transition: 'all 0.3s ease'
            }}
          >
            <div
              ref={navContainerRef}
              style={{
                display: 'flex',
                gap: '0.5rem',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                paddingBottom: '0.2rem',
                WebkitOverflowScrolling: 'touch'
              }}
              className="process-nav-scroller"
            >
              {processSteps.map((step, idx) => (
                <button
                  key={step.number}
                  onClick={() => scrollToStage(idx)}
                  className={`filter-pill ${activeStageIdx === idx ? 'active' : ''}`}
                  style={{
                    padding: '0.65rem 1rem',
                    display: 'inline-flex',
                    flexDirection: 'column',
                    gap: '0.15rem',
                    textAlign: 'left',
                    borderRadius: '8px',
                    flexShrink: 0,
                    border: activeStageIdx === idx ? '1px solid var(--accent, #3C2D8C)' : '1px solid var(--border-subtle, #E7E1D6)',
                    backgroundColor: activeStageIdx === idx ? 'var(--accent, #3C2D8C)' : 'var(--surface-elevated, #FFFFFF)',
                    color: activeStageIdx === idx ? '#FAF8F2' : 'var(--ink-primary, #211D2D)',
                    transition: 'all 0.25s ease',
                    cursor: 'pointer'
                  }}
                  data-cursor="STAGE"
                >
                  <span
                    style={{
                      fontSize: '0.65rem',
                      opacity: activeStageIdx === idx ? 0.9 : 0.65,
                      fontFamily: 'var(--font-mono, monospace)',
                      fontWeight: 700,
                      letterSpacing: '0.08em'
                    }}
                  >
                    STAGE {step.number}
                  </span>
                  <strong style={{ fontSize: '0.75rem', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                    {step.title}
                  </strong>
                </button>
              ))}
            </div>
          </div>

          {/* Sequential 8 Stages Container: Content-driven height, natural wrapping, zero clipping */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '5rem' }}>
            {processSteps.map((step, idx) => (
              <article
                key={step.number}
                id={`stage-${step.number}`}
                ref={(el) => (stageRefs.current[idx] = el)}
                className="arch-card process-stage-card"
                style={{
                  padding: 'clamp(1.75rem, 4.5vw, 3.5rem)',
                  backgroundColor: 'var(--surface-elevated, #FFFFFF)',
                  border: activeStageIdx === idx ? '1px solid rgba(60, 45, 140, 0.45)' : '1px solid var(--border-subtle, #E7E1D6)',
                  borderRadius: '12px',
                  boxShadow: activeStageIdx === idx ? '0 16px 40px rgba(60, 45, 140, 0.08)' : 'var(--shadow-subtle)',
                  scrollMarginTop: '160px',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div className="process-stage-grid">
                  {/* Text & Content Column */}
                  <div className="process-stage-content" style={{ minWidth: 0, width: '100%' }}>
                    {/* Header Tag & Stage Number */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                      <span
                        className="oversized-number"
                        style={{
                          fontSize: 'clamp(2.8rem, 6vw, 4.2rem)',
                          lineHeight: 0.9,
                          color: 'var(--accent, #3C2D8C)',
                          opacity: 0.85
                        }}
                      >
                        {step.number}
                      </span>
                      <span
                        className="meta-tag"
                        style={{
                          backgroundColor: 'var(--surface-secondary, #F3EFE7)',
                          padding: '0.35rem 0.75rem',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          letterSpacing: '0.12em',
                          fontWeight: 600
                        }}
                      >
                        {step.subtitle}
                      </span>
                    </div>

                    {/* Stage Title */}
                    <h2
                      style={{
                        fontFamily: 'var(--font-display, serif)',
                        fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                        marginBottom: '1.25rem',
                        lineHeight: 1.15,
                        color: 'var(--ink-primary, #211D2D)'
                      }}
                    >
                      {step.title}
                    </h2>

                    {/* Complete Unclipped Description */}
                    <p
                      className="process-stage-desc"
                      style={{
                        fontSize: 'clamp(0.98rem, 1.2vw, 1.1rem)',
                        color: 'var(--ink-secondary, #4A4657)',
                        lineHeight: 1.75,
                        marginBottom: '2rem',
                        wordBreak: 'normal',
                        overflowWrap: 'break-word',
                        whiteSpace: 'normal',
                        maxWidth: '100%'
                      }}
                    >
                      {step.description}
                    </p>

                    {/* Milestones & Actions Checklist */}
                    <div style={{ marginBottom: '2.5rem' }}>
                      <h4
                        style={{
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '0.72rem',
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--accent, #3C2D8C)',
                          fontWeight: 700,
                          marginBottom: '1rem'
                        }}
                      >
                        Stage Milestones &amp; Actions:
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {step.details.map((detail, dIdx) => (
                          <div
                            key={dIdx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '0.75rem',
                              lineHeight: 1.55
                            }}
                          >
                            <CheckCircle2
                              size={17}
                              color="var(--accent, #3C2D8C)"
                              style={{ flexShrink: 0, marginTop: '2px' }}
                            />
                            <span style={{ fontSize: '0.92rem', color: 'var(--ink-primary, #211D2D)' }}>
                              {detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Stage Actions */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      {idx < processSteps.length - 1 ? (
                        <button
                          type="button"
                          onClick={() => scrollToStage(idx + 1)}
                          className="btn-primary"
                          style={{ padding: '0.85rem 1.6rem', fontSize: '0.75rem' }}
                        >
                          <span>Advance to Stage 0{idx + 2}</span>
                          <ArrowDown size={14} />
                        </button>
                      ) : (
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <Link
                            to="/contact"
                            className="btn-primary"
                            data-cursor="START"
                            style={{ padding: '0.85rem 1.8rem', fontSize: '0.75rem' }}
                          >
                            <span>Begin Stage 01 Consultation</span>
                            <ArrowRight size={14} />
                          </Link>
                          <button
                            type="button"
                            onClick={() => scrollToStage(0)}
                            className="btn-secondary"
                            style={{ padding: '0.85rem 1.4rem', fontSize: '0.75rem' }}
                          >
                            <ArrowUp size={14} />
                            <span>Return to Stage 01</span>
                          </button>
                        </div>
                      )}

                      <Link
                        to="/contact"
                        className="btn-secondary"
                        style={{ padding: '0.85rem 1.4rem', fontSize: '0.75rem' }}
                      >
                        <span>Consult on Your Space</span>
                      </Link>
                    </div>
                  </div>

                  {/* Visual Stage Photo Column */}
                  <div className="process-stage-visual" style={{ minWidth: 0, width: '100%' }}>
                    <div
                      style={{
                        width: '100%',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-elevated)',
                        backgroundColor: '#FAF8F2',
                        border: '1px solid #E7E1D6',
                        position: 'relative'
                      }}
                    >
                      <img
                        src={step.image}
                        alt={`${step.title} - Colour Nest`}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: 'auto',
                          minHeight: '260px',
                          maxHeight: '460px',
                          objectFit: 'cover',
                          display: 'block'
                        }}
                      />

                      {/* Stage Identifier Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          left: '1rem',
                          backgroundColor: 'rgba(33, 29, 45, 0.9)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          padding: '0.4rem 0.85rem',
                          borderRadius: '4px',
                          fontFamily: 'var(--font-mono, monospace)',
                          fontSize: '0.68rem',
                          color: '#E3D9A4',
                          letterSpacing: '0.12em',
                          fontWeight: 700,
                          pointerEvents: 'none'
                        }}
                      >
                        STAGE {step.number} • {step.title}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Architectural Drawing to Finished Room Climax Banner */}
          <div
            className="arch-card"
            style={{
              padding: 'clamp(2.5rem, 6vw, 4.5rem)',
              backgroundColor: 'var(--surface-secondary, #F3EFE7)',
              border: '1px solid var(--border-medium, rgba(60, 45, 140, 0.15))',
              textAlign: 'center',
              borderRadius: '12px'
            }}
          >
            <span className="meta-tag" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              THE OUTCOME OF DISCIPLINE
            </span>
            <h2 className="heading-display" style={{ marginBottom: '1rem' }}>
              FROM BLUEPRINT TO LIVING HARMONY.
            </h2>
            <p
              style={{
                color: 'var(--ink-secondary, #4A4657)',
                fontSize: '1.05rem',
                maxWidth: '680px',
                margin: '0 auto 2.5rem auto',
                lineHeight: 1.65
              }}
            >
              A disciplined sequence transforms architectural intent into tactile physical reality.
              Zero surprises, zero dust damage, total client satisfaction across Bangalore homes.
            </p>
            <Link to="/contact" className="btn-primary" data-cursor="START">
              <span>Schedule Stage 01 Consultation</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Scoped CSS for responsive grid layout & unclipped descriptions */}
      <style>{`
        .process-stage-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.95fr);
          gap: clamp(2rem, 4.5vw, 4rem);
          align-items: center;
          width: 100%;
        }

        .process-nav-scroller::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 991px) {
          .process-stage-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .process-stage-visual {
            order: 2;
          }
          .process-stage-content {
            order: 1;
          }
        }

        @media (max-width: 768px) {
          .process-stage-desc {
            font-size: 0.95rem !important;
            line-height: 1.65 !important;
          }
        }

        @media (max-width: 480px) {
          .process-stage-card {
            padding: 1.5rem 1.2rem !important;
          }
          .process-stage-desc {
            font-size: 0.9rem !important;
            line-height: 1.6 !important;
          }
        }
      `}</style>
    </>
  );
};

export default Process;
