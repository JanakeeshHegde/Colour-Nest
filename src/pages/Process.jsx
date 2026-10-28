import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Box } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';
import { ProcessWireframeCanvas } from '../components/canvas/ProcessWireframeCanvas';
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
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const activeStep = processSteps[activeStepIdx];

  return (
    <>
      <SEOHead
        title="Interior Workflow — 8-Stage Spatial Transformation Process"
        description="From initial consultation to white-glove handover. Discover Colour Nest's disciplined 8-stage interior project workflow in Jayanagar, Bangalore."
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
              INTERIOR PROJECT WORKFLOW
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              HOW A COMPLETE SPACE <br />
              <span className="heading-editorial-italic">COMES TOGETHER.</span>
            </h1>
            <ArchitecturalLine label="8-STAGE INTERIOR EXECUTION PROTOCOL" coordinates="STRICT CRAFTSMANSHIP STANDARDS" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              A disciplined sequence transforms architectural intent into a living, breathing environment.
              From spatial discovery to fine detailing, our 8-stage roadmap ensures effortless execution, clean site conditions, and enduring elegance.
            </p>
          </div>

          {/* Interactive 8-Step Navigator */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 120px), 1fr))',
              gap: '0.65rem',
              marginBottom: '3.5rem'
            }}
          >
            {processSteps.map((step, idx) => (
              <button
                key={step.number}
                onClick={() => setActiveStepIdx(idx)}
                className="filter-pill"
                style={{
                  padding: '0.85rem 0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem',
                  textAlign: 'left',
                  borderRadius: 'var(--radius-xs)',
                  border: activeStepIdx === idx ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                  backgroundColor: activeStepIdx === idx ? 'var(--accent)' : 'var(--surface-elevated)',
                  color: activeStepIdx === idx ? '#FFFFFF' : 'var(--ink-primary)',
                  transition: 'all 0.25s ease'
                }}
                data-cursor="PHASE"
              >
                <span style={{ fontSize: '0.65rem', opacity: 0.8, fontFamily: 'var(--font-mono)' }}>STAGE {step.number}</span>
                <strong style={{ fontSize: '0.78rem', lineHeight: 1.25 }}>{step.title}</strong>
              </button>
            ))}
          </div>

          {/* Active Phase Display Card */}
          <div
            className="arch-card"
            style={{
              padding: 'clamp(2rem, 5vw, 4rem)',
              backgroundColor: 'var(--surface-elevated)',
              marginBottom: '4.5rem'
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '3.5rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span className="oversized-number" style={{ fontSize: '4rem' }}>{activeStep.number}</span>
                  <span className="meta-tag">{activeStep.subtitle}</span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '1.25rem' }}>
                  {activeStep.title}
                </h2>
                <p style={{ fontSize: '1.05rem', color: 'var(--ink-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {activeStep.description}
                </p>

                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  Stage Milestones &amp; Actions:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2.5rem' }}>
                  {activeStep.details.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <CheckCircle2 size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '0.92rem', color: 'var(--ink-primary)' }}>{d}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {activeStepIdx < processSteps.length - 1 ? (
                    <button
                      onClick={() => setActiveStepIdx(p => p + 1)}
                      className="btn-primary"
                    >
                      <span>Advance to Stage 0{activeStepIdx + 2}</span>
                      <ArrowRight size={15} />
                    </button>
                  ) : (
                    <Link to="/contact" className="btn-primary" data-cursor="START">
                      <span>Begin Stage 01 Consultation</span>
                      <ArrowRight size={15} />
                    </Link>
                  )}
                  <Link to="/contact" className="btn-secondary">
                    <span>Consult on Your Space</span>
                  </Link>
                </div>
              </div>

              {/* Physical Documentation & Editorial Visual Stage */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div
                  style={{
                    height: 'clamp(240px, 35vw, 420px)',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-dramatic)',
                    overflow: 'hidden',
                    backgroundColor: '#FAF8F2',
                    border: '1px solid #E7E1D6',
                    position: 'relative'
                  }}
                >
                  <img
                    src={activeStep.image}
                    alt={activeStep.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      top: '0.85rem',
                      left: '0.85rem',
                      backgroundColor: 'rgba(33, 29, 45, 0.88)',
                      backdropFilter: 'blur(8px)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: '#E3D9A4',
                      pointerEvents: 'none'
                    }}
                  >
                    STAGE 0{activeStepIdx + 1} • {activeStep.title}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Architectural Drawing to Finished Room Climax */}
          <div
            className="arch-card"
            style={{
              padding: 'clamp(2.5rem, 6vw, 4.5rem)',
              backgroundColor: 'var(--surface-secondary)',
              border: '1px solid var(--border-medium)',
              textAlign: 'center'
            }}
          >
            <span className="meta-tag" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              THE OUTCOME OF DISCIPLINE
            </span>
            <h2 className="heading-display" style={{ marginBottom: '1rem' }}>
              FROM BLUEPRINT TO LIVING HARMONY.
            </h2>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
              A disciplined sequence transforms architectural intent into tactile physical reality.
              Zero surprises, zero dust damage, total client satisfaction.
            </p>
            <Link to="/contact" className="btn-primary" data-cursor="START">
              <span>Schedule Stage 01 Consultation</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

