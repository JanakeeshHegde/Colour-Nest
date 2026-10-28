import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  CheckCircle2,
  Maximize2,
  Sparkles,
  Phone,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { IMAGE_MANIFEST } from '../data/imageManifest';
import { siteData } from '../data/siteData';

// 5 Principal Service Categories for Section 03
const SERVICE_CATEGORIES = [
  {
    id: 'interiors',
    title: 'Interior Solutions',
    desc: 'Turnkey residential planning, custom modular joinery, and tailored layouts.',
    image: IMAGE_MANIFEST['space-living-contemporary'].url,
    link: '/services/customised-interiors'
  },
  {
    id: 'textures',
    title: 'Textures & Wallpapers',
    desc: 'Italian Venetian Stucco, Anticco mineral aggregate, and seamless wallcoverings.',
    image: IMAGE_MANIFEST['material-stucco-finish'].url,
    link: '/services/premium-stucco-textures'
  },
  {
    id: 'wood',
    title: 'Wood & Finishes',
    desc: 'Polycoat mirror sheens, Melamyne, and polyurethane protective coatings.',
    image: IMAGE_MANIFEST['material-wood-grain'].url,
    link: '/services/wood-polish-melamyne-pu'
  },
  {
    id: 'ceilings-lighting',
    title: 'Ceilings & Lighting',
    desc: 'Dropped gypsum false ceilings with concealed 3000K indirect cove LED channels.',
    image: IMAGE_MANIFEST['architectural-false-ceiling'].url,
    link: '/services/false-ceilings'
  },
  {
    id: 'exterior',
    title: 'Painting & Exterior Finishes',
    desc: 'Luxury interior emulsions and monsoon-tested elastomeric facade skins.',
    image: IMAGE_MANIFEST['exterior-facade-contemporary'].url,
    link: '/services/exterior-painting-and-textures'
  }
];

// 4 Selected Materials & Finishes for Section 04
const SELECTED_MATERIALS = [
  {
    id: 'stucco',
    title: 'Italian Venetian Stucco',
    category: 'MINERAL PLASTER',
    desc: 'Hand-burnished Italian marble plaster delivering luminous depth, cool tactile presence, and a high-gloss mirror or honed suede sheen.',
    image: IMAGE_MANIFEST['material-stucco-finish'].url,
    link: '/services/premium-stucco-textures'
  },
  {
    id: 'anticco',
    title: 'Anticco Stone Textures',
    category: 'ARCHITECTURAL PATINA',
    desc: 'Slaked lime and micronized marble dust aggregate evoking the weathered grandeur of classical palazzos with natural breathability.',
    image: IMAGE_MANIFEST['material-anticco-texture'].url,
    link: '/services/wallpaper-and-anticco-texture'
  },
  {
    id: 'wood-polycoat',
    title: 'Teak Melamyne & Polycoat',
    category: 'WOOD FINISHES',
    desc: 'Two-pack polyurethane Polycoat sealers and Melamyne treatments providing heat, liquid, and scratch protection with crystal-clear clarity.',
    image: IMAGE_MANIFEST['material-wood-grain'].url,
    link: '/services/wood-polish-melamyne-pu'
  },
  {
    id: 'ceilings-coves',
    title: 'Gypsum Coves & Smart Lighting',
    category: 'CEILING ARCHITECTURE',
    desc: 'Laser-squared false ceiling planes, stepped floating drops, and concealed 3000K warm LED channels grazing textured perimeter walls.',
    image: IMAGE_MANIFEST['architectural-false-ceiling'].url,
    link: '/services/false-ceilings'
  }
];

// 4 Curated Gallery Snapshots for Section 05
const GALLERY_PREVIEW = [
  {
    id: 'gal-liv-01',
    title: 'Double-Height Travertine Pavilion',
    category: 'LIVING SPACES',
    image: '/images/hero/hero_main.jpg',
    tag: 'Travertine & Ambient Daylighting'
  },
  {
    id: 'gal-liv-02',
    title: 'Contemporary Sculpted Lounge',
    category: 'LIVING SPACES',
    image: '/images/interiors/living_room.jpg',
    tag: 'Limewash & Fluted Oak Joinery'
  },
  {
    id: 'gal-bed-01',
    title: 'Japandi Master Suite',
    category: 'BEDROOMS',
    image: '/images/interiors/master_bedroom.jpg',
    tag: 'Acoustic Timber Slats & Coves'
  },
  {
    id: 'gal-kit-01',
    title: 'Architectural Culinary Studio',
    category: 'KITCHEN & DINING',
    image: '/images/interiors/culinary_kitchen.jpg',
    tag: 'Honed Stone & Linear Illumination'
  }
];

// 4 Core Project Phases for Section 06
const PROCESS_PREVIEW = [
  {
    step: '01',
    title: 'Consultation & Spatial Brief',
    desc: 'Dialogue with proprietor Mr. Abhishek Rao to evaluate room geometry, functional routines, and interior aspirations.'
  },
  {
    step: '02',
    title: 'Live Material Swatches',
    desc: 'On-wall 2×2 ft physical samples of Italian Stucco, Anticco, and wood stains tested directly under your home lighting.'
  },
  {
    step: '03',
    title: 'Protective Craft Execution',
    desc: 'Comprehensive multi-layer floor masking, dustless vacuum sanding, and laser-aligned master application.'
  },
  {
    step: '04',
    title: 'Detailing & Handover',
    desc: 'High-intensity raking light inspection across walls and ceiling coves, with complete milestone sign-off.'
  }
];

// 7 Verified Specialities for Section 07 (Directly from Owner reference)
const VERIFIED_STRENGTHS = [
  {
    num: '01',
    title: 'Complete Client Satisfaction',
    desc: 'Dedicated consulting from raw plaster to the final coat, ensuring every space reflects the client’s distinct architectural vision.'
  },
  {
    num: '02',
    title: 'Affordable Pricing',
    desc: 'Transparent, itemized planning without hidden surprises or synthetic markups for premium finishes.'
  },
  {
    num: '03',
    title: 'Reliable Services',
    desc: 'Time-disciplined project timelines executed by master painters and skilled interior technicians.'
  },
  {
    num: '04',
    title: 'Easy Payment Mode',
    desc: 'Flexible milestone-based payment schedules structured around completed project phases.'
  },
  {
    num: '05',
    title: 'Customized Solutions',
    desc: 'Bespoke Italian plaster recipes, custom tint matching, and tailored joinery finishes designed per site lighting.'
  },
  {
    num: '06',
    title: 'Use of Advanced Technology',
    desc: 'Airless spray finishing, laser alignment for false ceilings, and precision moisture testing before primer application.'
  },
  {
    num: '07',
    title: 'A Great Experience with Happy Clients',
    desc: 'Polite, immaculate on-site manners, thorough protective floor masking, and post-application inspection.'
  }
];


export const Home = () => {
  return (
    <>
      <SEOHead
        title="COLOUR NEST — Thoughtful Interiors. Beautifully Finished."
        description="Complete interior design, architectural textures, Italian stucco, woodwork polishing, false ceilings, and turnkey painting by Mr. Abhishek Rao in Jayanagar, Bangalore."
      />

      <div style={{ backgroundColor: '#FAF8F2', color: '#211D2D' }}>
        {/* ========================================================================= */}
        {/* SECTION 01 — HERO (Full-Bleed Full-Viewport Architectural Background)     */}
        {/* ========================================================================= */}
        <section
          style={{
            position: 'relative',
            minHeight: '100svh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: '#211D2D'
          }}
        >
          {/* Full-Bleed Background Image Element */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              overflow: 'hidden'
            }}
          >
            <picture>
              <source media="(max-width: 768px)" srcSet="/images/hero/hero_mobile.jpg" />
              <img
                src="/images/hero/hero_main.jpg"
                alt="COLOUR NEST Architectural Contemporary Interior"
                loading="eager"
                fetchPriority="high"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 45%',
                  display: 'block'
                }}
              />
            </picture>

            {/* Directional Vignette Gradient Overlay - Left-to-right & Top-to-bottom for optimum text contrast */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, rgba(33, 29, 45, 0.94) 0%, rgba(33, 29, 45, 0.78) 45%, rgba(33, 29, 45, 0.35) 100%)'
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(33, 29, 45, 0.55) 0%, transparent 28%, transparent 70%, rgba(33, 29, 45, 0.8) 100%)'
              }}
            />
          </div>

          {/* Hero Content Container */}
          <div
            className="container-wide"
            style={{
              position: 'relative',
              zIndex: 2,
              width: '100%',
              maxWidth: '1440px',
              margin: '0 auto',
              padding: 'clamp(6rem, 13vh, 9.5rem) clamp(1rem, 3.5vw, 2.5rem) clamp(2.5rem, 6vh, 5rem)'
            }}
          >
            <div style={{ maxWidth: '820px' }}>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Brand Monospace Eyebrow Tag */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: 'clamp(0.62rem, 1.8vw, 0.74rem)',
                    letterSpacing: '0.14em',
                    color: '#E3D9A4',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    marginBottom: '1.25rem',
                    backgroundColor: 'rgba(33, 29, 45, 0.65)',
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(227, 217, 164, 0.35)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    maxWidth: '100%'
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: '#E3D9A4',
                      flexShrink: 0
                    }}
                  />
                  <span>COLOUR NEST &bull; PAINTING &amp; INTERIOR DECOR</span>
                </div>

                {/* Main Headline */}
                <h1
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: 'clamp(2.4rem, 6vw, 5.6rem)',
                    lineHeight: 1.08,
                    fontWeight: 400,
                    letterSpacing: '-0.025em',
                    color: '#FAF8F2',
                    margin: '0 0 1.25rem 0',
                    textShadow: '0 4px 24px rgba(0, 0, 0, 0.45)',
                    overflowWrap: 'break-word'
                  }}
                >
                  Beautiful Spaces. <br />
                  <span style={{ color: '#E3D9A4', fontStyle: 'italic' }}>
                    Thoughtfully Finished.
                  </span>
                </h1>

                {/* Supporting Copy */}
                <p
                  style={{
                    fontSize: 'clamp(0.98rem, 2vw, 1.25rem)',
                    color: 'rgba(250, 248, 242, 0.92)',
                    lineHeight: 1.65,
                    maxWidth: '580px',
                    marginBottom: '2.25rem',
                    textShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
                    fontWeight: 350
                  }}
                >
                  Painting, interior decor and distinctive finishes that bring your space together.
                </p>

                {/* CTAs */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '0.85rem'
                  }}
                >
                  <Link
                    to="/services"
                    style={{
                      backgroundColor: '#3C2D8C',
                      color: '#FAF8F2',
                      padding: 'clamp(0.85rem, 2.5vw, 1.05rem) clamp(1.4rem, 4vw, 2.4rem)',
                      borderRadius: '9999px',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: 'clamp(0.72rem, 1.5vw, 0.8rem)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: '1px solid rgba(227, 217, 164, 0.45)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      minHeight: '44px'
                    }}
                  >
                    <span>EXPLORE OUR SERVICES</span>
                    <ArrowRight size={15} color="#E3D9A4" />
                  </Link>

                  <Link
                    to="/contact"
                    style={{
                      backgroundColor: 'rgba(250, 248, 242, 0.12)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      color: '#FAF8F2',
                      padding: 'clamp(0.85rem, 2.5vw, 1.05rem) clamp(1.3rem, 3.5vw, 2.2rem)',
                      borderRadius: '9999px',
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: 'clamp(0.72rem, 1.5vw, 0.8rem)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      border: '1px solid rgba(250, 248, 242, 0.35)',
                      transition: 'background-color 0.2s ease, border-color 0.2s ease',
                      minHeight: '44px'
                    }}
                  >
                    <span>CONTACT US</span>
                    <ArrowUpRight size={15} color="#E3D9A4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 02 — BRAND INTRODUCTION (Concise Narrative)                       */}
        {/* ========================================================================= */}
        <section
          style={{
            padding: 'clamp(3.5rem, 7vw, 6rem) 0',
            borderBottom: '1px solid #E7E1D6'
          }}
        >
          <div
            className="container-wide"
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)'
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                gap: 'clamp(2rem, 5vw, 4.5rem)',
                alignItems: 'center'
              }}
            >
              {/* Studio Workspace Visual */}
              <div
                style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid #E7E1D6',
                  aspectRatio: '4/3',
                  boxShadow: '0 12px 32px rgba(33, 29, 45, 0.06)'
                }}
              >
                <img
                  src={IMAGE_MANIFEST['about-interior-workspace'].url}
                  alt="Architectural Material Curation Studio"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Concise Story */}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    color: '#3C2D8C',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '0.85rem'
                  }}
                >
                  About Colour Nest
                </span>

                <h2
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                    lineHeight: 1.1,
                    color: '#211D2D',
                    margin: '0 0 1.25rem 0'
                  }}
                >
                  Every Detail Shapes <br />
                  <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>the Living Space.</span>
                </h2>

                <p
                  style={{
                    fontSize: '1.02rem',
                    color: '#4A4657',
                    lineHeight: 1.7,
                    marginBottom: '1.25rem'
                  }}
                >
                  Led by proprietor and principal consultant <strong>Mr. Abhishek Rao</strong>, COLOUR NEST
                  delivers bespoke painting, interior decor and turnkey finishing solutions across Bangalore.
                  We unify wall textures, woodwork polishing, false ceilings and lighting into cohesive living environments.
                </p>

                <p
                  style={{
                    fontSize: '0.94rem',
                    color: '#6D6877',
                    lineHeight: 1.7,
                    marginBottom: '2rem'
                  }}
                >
                  Rather than treating painting, carpentry and ceiling works as disconnected contractors, we manage
                  every layer with rigorous on-site quality control and honest craftsmanship.
                </p>

                <Link
                  to="/about"
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#3C2D8C',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>DISCOVER COLOUR NEST</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 03 — SERVICE OVERVIEW (Briefly Showcase 5 Key Offerings)          */}
        {/* ========================================================================= */}
        <section
          style={{
            padding: 'clamp(4rem, 8vw, 6.5rem) 0',
            borderBottom: '1px solid #E7E1D6'
          }}
        >
          <div
            className="container-wide"
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1.5rem',
                marginBottom: 'clamp(2rem, 4vw, 3.5rem)'
              }}
            >
              <div style={{ maxWidth: '640px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    color: '#3C2D8C',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '0.75rem'
                  }}
                >
                  Core Disciplines
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                    lineHeight: 1.1,
                    color: '#211D2D',
                    margin: 0
                  }}
                >
                  Finishing &amp; <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Interior Expertise.</span>
                </h2>
              </div>

              <Link
                to="/services"
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.76rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#3C2D8C',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>VIEW ALL SERVICES</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* 5 Cards Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: '1.5rem'
              }}
            >
              {SERVICE_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={cat.link}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E7E1D6',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: '0 4px 16px rgba(33, 29, 45, 0.03)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  className="service-overview-card"
                >
                  <div style={{ height: '170px', overflow: 'hidden' }}>
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display, serif)',
                        fontSize: '1.3rem',
                        color: '#211D2D',
                        margin: '0 0 0.5rem 0'
                      }}
                    >
                      {cat.title}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: '#6D6877', lineHeight: 1.55, flex: 1, margin: '0 0 1rem 0' }}>
                      {cat.desc}
                    </p>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#3C2D8C',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>Specifications</span>
                      <ChevronRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 04 — SELECTED MATERIAL & FINISHING SHOWCASE                       */}
        {/* ========================================================================= */}
        <section
          style={{
            padding: 'clamp(4rem, 8vw, 6.5rem) 0',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E7E1D6'
          }}
        >
          <div
            className="container-wide"
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1.5rem',
                marginBottom: 'clamp(2rem, 4vw, 3.5rem)'
              }}
            >
              <div style={{ maxWidth: '680px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    color: '#3C2D8C',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '0.75rem'
                  }}
                >
                  Materiality &amp; Finishes
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                    lineHeight: 1.1,
                    color: '#211D2D',
                    margin: 0
                  }}
                >
                  Tactile Depth. <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Enduring Surfaces.</span>
                </h2>
              </div>

              <Link
                to="/services"
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.76rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#3C2D8C',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>EXPLORE ALL FINISHES</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* 4 Curated Material Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem'
              }}
            >
              {SELECTED_MATERIALS.map((mat) => (
                <Link
                  key={mat.id}
                  to={mat.link}
                  style={{
                    backgroundColor: '#FAF8F2',
                    borderRadius: '12px',
                    border: '1px solid #E7E1D6',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: '0 4px 16px rgba(33, 29, 45, 0.03)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  className="service-overview-card"
                >
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img
                      src={mat.image}
                      alt={mat.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '1.35rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.64rem',
                        letterSpacing: '0.14em',
                        color: '#3C2D8C',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '0.4rem'
                      }}
                    >
                      {mat.category}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display, serif)',
                        fontSize: '1.25rem',
                        color: '#211D2D',
                        margin: '0 0 0.65rem 0'
                      }}
                    >
                      {mat.title}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: '#6D6877', lineHeight: 1.55, flex: 1, margin: '0 0 1rem 0' }}>
                      {mat.desc}
                    </p>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#3C2D8C',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>View Specifications</span>
                      <ChevronRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* 3D Space Studio Integrated Banner */}
            <div
              style={{
                borderRadius: '16px',
                backgroundColor: '#211D2D',
                color: '#FAF8F2',
                padding: 'clamp(1.75rem, 4vw, 2.5rem)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
                border: '1px solid rgba(227, 217, 164, 0.25)',
                boxShadow: '0 12px 36px rgba(33, 29, 45, 0.12)'
              }}
            >
              <div style={{ maxWidth: '640px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em',
                    color: '#E3D9A4',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '0.65rem'
                  }}
                >
                  <Box size={14} color="#E3D9A4" />
                  INTERACTIVE 3D SPACE STUDIO
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
                    color: '#FAF8F2',
                    margin: '0 0 0.5rem 0'
                  }}
                >
                  Experience These Finishes <span style={{ color: '#E3D9A4', fontStyle: 'italic' }}>in 3D.</span>
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'rgba(250, 248, 242, 0.85)', lineHeight: 1.6, margin: 0 }}>
                  Test Italian Stucco on feature walls, toggle White Oak versus Limestone flooring, and view morning versus warm evening illumination.
                </p>
              </div>

              <Link
                to="/space-studio"
                style={{
                  backgroundColor: '#3C2D8C',
                  color: '#FAF8F2',
                  padding: '0.95rem 2rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.76rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid rgba(227, 217, 164, 0.4)',
                  boxShadow: '0 6px 20px rgba(60, 45, 140, 0.4)'
                }}
              >
                <span>OPEN 3D SPACE STUDIO</span>
                <ArrowRight size={14} color="#E3D9A4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 05 — SHORT GALLERY PREVIEW                                        */}
        {/* ========================================================================= */}
        <section
          style={{
            padding: 'clamp(4rem, 8vw, 6.5rem) 0',
            backgroundColor: '#FAF8F2',
            borderBottom: '1px solid #E7E1D6'
          }}
        >
          <div
            className="container-wide"
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1.5rem',
                marginBottom: 'clamp(2rem, 4vw, 3.5rem)'
              }}
            >
              <div style={{ maxWidth: '680px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    color: '#3C2D8C',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '0.75rem'
                  }}
                >
                  Gallery Preview
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                    lineHeight: 1.1,
                    color: '#211D2D',
                    margin: 0
                  }}
                >
                  Living Environments. <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Thoughtfully Composed.</span>
                </h2>
              </div>

              <Link
                to="/gallery"
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.76rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#3C2D8C',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>EXPLORE COMPLETE GALLERY</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* 4 Interior Snapshot Tiles */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '1.5rem'
              }}
            >
              {GALLERY_PREVIEW.map((item) => (
                <Link
                  key={item.id}
                  to="/gallery"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E7E1D6',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 16px rgba(33, 29, 45, 0.03)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                  className="service-overview-card"
                >
                  <div style={{ height: '220px', overflow: 'hidden' }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.64rem',
                        letterSpacing: '0.12em',
                        color: '#3C2D8C',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        display: 'block',
                        marginBottom: '0.35rem'
                      }}
                    >
                      {item.category}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display, serif)',
                        fontSize: '1.18rem',
                        color: '#211D2D',
                        margin: '0 0 0.35rem 0'
                      }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#6D6877', margin: 0 }}>
                      {item.tag}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 06 — COMPACT PROJECT-PROCESS INTRODUCTION                         */}
        {/* ========================================================================= */}
        <section
          style={{
            padding: 'clamp(4rem, 8vw, 6.5rem) 0',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E7E1D6'
          }}
        >
          <div
            className="container-wide"
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1.5rem',
                marginBottom: 'clamp(2rem, 4vw, 3.5rem)'
              }}
            >
              <div style={{ maxWidth: '680px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.18em',
                    color: '#3C2D8C',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    display: 'block',
                    marginBottom: '0.75rem'
                  }}
                >
                  Methodology &amp; Delivery
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display, serif)',
                    fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                    lineHeight: 1.1,
                    color: '#211D2D',
                    margin: 0
                  }}
                >
                  From Consultation <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>to Handover.</span>
                </h2>
              </div>

              <Link
                to="/process"
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.76rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#3C2D8C',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>VIEW FULL PROCESS</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* 4 Process Milestone Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                gap: '1.5rem'
              }}
            >
              {PROCESS_PREVIEW.map((p) => (
                <div
                  key={p.step}
                  style={{
                    backgroundColor: '#FAF8F2',
                    borderRadius: '12px',
                    border: '1px solid #E7E1D6',
                    padding: '1.75rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 2px 10px rgba(33, 29, 45, 0.02)'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '1.6rem',
                      color: '#3C2D8C',
                      fontWeight: 700,
                      display: 'block',
                      marginBottom: '0.75rem'
                    }}
                  >
                    {p.step}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display, serif)',
                      fontSize: '1.2rem',
                      color: '#211D2D',
                      margin: '0 0 0.5rem 0'
                    }}
                  >
                    {p.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#6D6877', lineHeight: 1.6, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 07 — WHY COLOUR NEST (7 Verified Business Specialities)            */}
        {/* ========================================================================= */}
        <section
          style={{
            padding: 'clamp(4rem, 8vw, 6.5rem) 0',
            backgroundColor: '#FAF8F2',
            borderBottom: '1px solid #E7E1D6'
          }}
        >
          <div
            className="container-wide"
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)'
            }}
          >
            <div style={{ maxWidth: '640px', marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.18em',
                  color: '#3C2D8C',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: '0.75rem'
                }}
              >
                Why Colour Nest
              </span>
              <h2
                style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                  lineHeight: 1.1,
                  color: '#211D2D',
                  margin: '0 0 0.85rem 0'
                }}
              >
                Honest Commitments. <br />
                <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Proven Craft.</span>
              </h2>
              <p style={{ fontSize: '0.98rem', color: '#6D6877', margin: 0, lineHeight: 1.6 }}>
                Real business values honed through dedicated client consulting and high-grade finishing execution.
              </p>
            </div>

            {/* 7 Verified Specialities Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '1.25rem'
              }}
            >
              {VERIFIED_STRENGTHS.map((s) => (
                <div
                  key={s.num}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '10px',
                    border: '1px solid #E7E1D6',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    boxShadow: '0 2px 10px rgba(33, 29, 45, 0.02)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono, monospace)',
                        fontSize: '0.75rem',
                        color: '#3C2D8C',
                        fontWeight: 700
                      }}
                    >
                      {s.num}
                    </span>
                    <CheckCircle2 size={16} color="#3C2D8C" />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display, serif)',
                      fontSize: '1.25rem',
                      color: '#211D2D',
                      margin: '2px 0 0 0',
                      fontWeight: 500
                    }}
                  >
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#6D6877', lineHeight: 1.55, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 08 — FINAL CTA (Clear, Uncluttered Project Invitation)             */}
        {/* ========================================================================= */}
        <section

          style={{
            padding: 'clamp(4.5rem, 9vw, 7rem) 0',
            backgroundColor: '#FAF8F2',
            textAlign: 'center'
          }}
        >
          <div
            className="container-wide"
            style={{
              maxWidth: '820px',
              margin: '0 auto',
              padding: '0 clamp(1.2rem, 3.5vw, 2.5rem)'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
                color: '#3C2D8C',
                textTransform: 'uppercase',
                fontWeight: 700,
                display: 'inline-block',
                marginBottom: '1rem'
              }}
            >
              START A CONVERSATION
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-display, serif)',
                fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)',
                lineHeight: 1.15,
                color: '#211D2D',
                margin: '0 0 1.25rem 0'
              }}
            >
              Let's Bring Your Space <br />
              <span style={{ color: '#3C2D8C', fontStyle: 'italic' }}>Together.</span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: '#4A4657',
                lineHeight: 1.6,
                marginBottom: '2.5rem'
              }}
            >
              Tell us about your space and the kind of finish you have in mind.
              We'll arrange an on-site consultation and live material review.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={{
                  backgroundColor: '#3C2D8C',
                  color: '#FAF8F2',
                  padding: '1.05rem 2.4rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid rgba(227, 217, 164, 0.4)',
                  boxShadow: '0 8px 24px rgba(60, 45, 140, 0.25)'
                }}
              >
                <span>START A PROJECT</span>
                <ArrowRight size={15} color="#E3D9A4" />
              </Link>

              <a
                href={siteData.urls.whatsappDirect}
                target="_blank"
                rel="noreferrer"
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#211D2D',
                  padding: '1.05rem 2rem',
                  borderRadius: '9999px',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #E7E1D6'
                }}
              >
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Hover transitions for service cards */}
      <style>{`
        .service-overview-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(33, 29, 45, 0.08) !important;
        }
      `}</style>
    </>
  );
};
