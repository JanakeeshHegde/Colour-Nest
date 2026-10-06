import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Ruler, Eye, Compass, Layers, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

const processSteps = [
  {
    number: "01",
    title: "DISCOVER",
    subtitle: "Spatial Context & Light Audit",
    description: "Every interior starts with careful observation. We inspect site orientation, evaluate natural daylight trajectories across rooms, review artificial lighting points, and record humidity conditions before recommending any primer or plaster finish.",
    details: [
      "Substrate moisture meter testing across all masonry surfaces",
      "Daylight intensity mapping from dawn to twilight",
      "Identification of hairline structural fractures and efflorescence",
      "Evaluation of architectural moldings, skirting, and ceiling soffits"
    ],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    number: "02",
    title: "UNDERSTAND",
    subtitle: "Client Lifestyle Brief & Vision Mapping",
    description: "We don't impose generic trends. Mr. Abhishek Rao personally conducts a consultation to understand your family's daily rituals: how spaces are used, sensory preferences (calm vs bold), acoustic requirements, and cleaning maintenance expectations.",
    details: [
      "In-depth dialogue on spatial usage and emotional intent",
      "Analysis of existing furniture timber tones and floor stone",
      "Establishing tactile finish preferences (velvet Stucco vs matte Anticco)",
      "Clear timeline and budget alignment without ambiguous extras"
    ],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
  },
  {
    number: "03",
    title: "PLAN",
    subtitle: "Material Harmony & Physical Sample Boards",
    description: "Colour chips on paper can mislead. We prepare physical onsite 2x2 ft sample swatches showing real plaster texture, metallic glazes, and wood stains under your actual room illumination before any wall is touched.",
    details: [
      "On-wall live test swatches under 3000K warm vs 4000K daylight",
      "Coordinated mood boards uniting ceilings, walls, and woodwork",
      "Structured phase execution schedule with daily milestones",
      "Protective packing plan for existing flooring and precious fixtures"
    ],
    image: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453135933.jpg"
  },
  {
    number: "04",
    title: "PREPARE",
    subtitle: "Immersion Masking & Substrate Perfection",
    description: "Craftsmanship is 70% preparation. Floors are triple-masked with heavy-duty protective sheets; door hardware, switches, and glass panes are sealed with precision painter's tape. Walls are scraped, vacuum-sanded, and stabilized with bonding primer.",
    details: [
      "Full floor protective poly-corrugated sheet underlayment",
      "Edge taping with zero-bleed architectural masking tapes",
      "Fiberglass mesh reinforcement over structural joints and coves",
      "Multi-grit dustless mechanical sanding to glass-like uniformity"
    ],
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80"
  },
  {
    number: "05",
    title: "CRAFT",
    subtitle: "Master Artisan Application",
    description: "Our dedicated master applicators take over. Whether hand-troweling Italian Venetian Stucco with flexible Japanese spatulas, spraying 2-pack Polycoat wood finish in dust-isolated chambers, or laser-squaring gypsum false ceiling grids.",
    details: [
      "Layer-by-layer progressive thickness calibration",
      "Hand-burnishing of marble aggregate using stainless steel trowels",
      "Airless spray execution for flawless acoustic ceiling soffits",
      "Intermediate inspection between every single applied coat"
    ],
    image: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453044604.jpg"
  },
  {
    number: "06",
    title: "FINISH",
    subtitle: "White-Glove Handover & Long-Term Care",
    description: "The transformation is finalized with comprehensive post-application inspection under high-lux inspection lamps. Floors are uncovered and vacuumed, fixtures polished, and a detailed care manual is handed over for enduring beauty.",
    details: [
      "Full-perimeter high-intensity raking light inspection",
      "Complete residue-free protective masking removal & vacuum cleanup",
      "Client walkthrough with touch-up kit and exact color formula records",
      "Ongoing maintenance advice and future care recommendations"
    ],
    image: "https://d3k88l35vy59af.cloudfront.net/A001/802/1596453855356.jpg"
  }
];

export const Process = () => {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const activeStep = processSteps[activeStepIdx];

  return (
    <>
      <SEOHead
        title="Process — Architectural Execution Timeline"
        description="Not just a finish. A process. Discover Colour Nest's 6-phase disciplined execution: Discover, Understand, Plan, Prepare, Craft, Finish in Bangalore."
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
              METHODOLOGY &amp; WORKFLOW
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1rem' }}>
              NOT JUST A FINISH. <br />
              <span className="heading-editorial-italic">A PROCESS.</span>
            </h1>
            <ArchitecturalLine label="6-PHASE EXECUTION PROTOCOL" coordinates="STRICT CRAFTSMANSHIP STANDARDS" />
            <p style={{ fontSize: 'clamp(1.05rem, 2vw, 1.35rem)', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
              Excellence in interior finishing requires methodical discipline. We adhere to a structured
              six-phase roadmap ensuring seamless execution, spotless site conditions, and enduring longevity.
            </p>
          </div>

          {/* Interactive Step Navigator */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '0.75rem',
              marginBottom: '3.5rem'
            }}
          >
            {processSteps.map((step, idx) => (
              <button
                key={step.number}
                onClick={() => setActiveStepIdx(idx)}
                className="filter-pill"
                style={{
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  textAlign: 'left',
                  borderRadius: 'var(--radius-xs)',
                  border: activeStepIdx === idx ? '1px solid var(--accent)' : '1px solid var(--border-subtle)',
                  backgroundColor: activeStepIdx === idx ? 'var(--accent)' : 'var(--surface-elevated)',
                  color: activeStepIdx === idx ? '#FFFFFF' : 'var(--ink-primary)'
                }}
                data-cursor="PHASE"
              >
                <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>PHASE {step.number}</span>
                <strong style={{ fontSize: '0.9rem' }}>{step.title}</strong>
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3.5rem', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <span className="oversized-number" style={{ fontSize: '4rem' }}>{activeStep.number}</span>
                  <span className="meta-tag">{activeStep.subtitle}</span>
                </div>

                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1.25rem' }}>
                  {activeStep.title}
                </h2>
                <p style={{ fontSize: '1.05rem', color: 'var(--ink-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {activeStep.description}
                </p>

                <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  Actionable Phase Benchmarks:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2.5rem' }}>
                  {activeStep.details.map((d, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <CheckCircle2 size={16} color="var(--accent)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span style={{ fontSize: '0.92rem', color: 'var(--ink-primary)' }}>{d}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  {activeStepIdx < processSteps.length - 1 ? (
                    <button
                      onClick={() => setActiveStepIdx(p => p + 1)}
                      className="btn-primary"
                    >
                      <span>Advance to Phase 0{activeStepIdx + 2}</span>
                      <ArrowRight size={15} />
                    </button>
                  ) : (
                    <Link to="/contact" className="btn-primary" data-cursor="START">
                      <span>Initiate Your Project Phase 01</span>
                      <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
              </div>

              {/* Visual Phase Documentation Photo */}
              <div className="aspect-4-3" style={{ borderRadius: 'var(--radius-xs)', boxShadow: 'var(--shadow-dramatic)' }}>
                <img src={activeStep.image} alt={activeStep.title} className="aspect-fill" />
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
              <span>Schedule Initial Spatial Audit</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
