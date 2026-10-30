import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, MapPin, Phone, Mail, Layers, Sparkles, Compass } from 'lucide-react';
import { WhatsAppIcon } from '../components/common/WhatsAppIcon';
import { SEOHead } from '../components/common/SEOHead';
import { siteData } from '../data/siteData';
import { ArchitecturalLine } from '../components/common/ArchitecturalLine';

export const About = () => {
  return (
    <>
      <SEOHead
        title="About Us — Complete Interior, Finishing & Decor Studio"
        description="We bring the whole space together. Meet Mr. Abhishek Rao, Proprietor & Consultant at Colour Nest — Complete Interior, Finishing & Painting Studio, Jayanagar, Bangalore."
      />

      <article
        style={{
          paddingTop: 'calc(var(--nav-height) + 2.5rem)',
          backgroundColor: 'var(--surface-primary)',
          color: 'var(--ink-primary)'
        }}
      >
        {/* Monumental Hero */}
        <section className="container-wide" style={{ marginBottom: 'clamp(3rem, 7vw, 6rem)' }}>
          <div style={{ maxWidth: '980px' }}>
            <span className="meta-tag" style={{ marginBottom: '1.25rem' }}>
              COLOUR NEST — NATURE OF BUSINESS: PAINTING &amp; INTERIORS
            </span>
            <h1 className="heading-monumental" style={{ marginBottom: '1.5rem', lineHeight: 1.02 }}>
              Thoughtful Finishes. <br />
              <span className="heading-editorial-italic">Considered Interiors.</span>
            </h1>
            <ArchitecturalLine label="INTERIORS • PAINT • TEXTURES • LIGHT • WOOD • CEILINGS • DECOR" coordinates="JAYANAGAR 9TH BLOCK, BANGALORE" />
            <p style={{ fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)', color: 'var(--ink-secondary)', lineHeight: 1.6, maxWidth: '850px' }}>
              Founded with the conviction that true luxury is not a coat of paint, but the seamless unity of
              space, structure, materials, light, and finish. Colour Nest transforms bare architectural volumes into
              complete, emotionally resonant living environments.
            </p>
          </div>
        </section>

        {/* Integrated Studio Disciplines Banner */}
        <section style={{ backgroundColor: 'var(--surface-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '2.5rem 0' }}>
          <div className="container-wide">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '2rem' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>01 / ARCHITECTURE</span>
                <strong style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', display: 'block', marginBottom: '0.3rem' }}>Interiors &amp; Ceilings</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>Turnkey interior works, spatial planning, and gypsum false ceilings.</p>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>02 / SURFACES</span>
                <strong style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', display: 'block', marginBottom: '0.3rem' }}>Textures &amp; Wallpapers</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>Venetian Stucco, Anticco mineral aggregate, Royals Play, and bespoke papers.</p>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>03 / TIMBER</span>
                <strong style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', display: 'block', marginBottom: '0.3rem' }}>Wood &amp; Polycoat Polish</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>High-build Polycoat, polyurethane lacquers, and Melamyne timber preservation.</p>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>04 / ILLUMINATION</span>
                <strong style={{ fontSize: '1.1rem', fontFamily: 'var(--font-display)', display: 'block', marginBottom: '0.3rem' }}>Smart Light &amp; Fans</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: 1.5 }}>Architectural cove profiles, magnetic track illumination, and balanced mood scenes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Leadership & Consultant Presentation */}
        <section className="section-scene">
          <div className="container-wide">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '4rem', alignItems: 'center' }}>
              {/* Authentic Colour Nest Brand Image */}
              <div className="aspect-1-1" style={{ maxWidth: '500px', borderRadius: 'var(--radius-xs)', boxShadow: 'var(--shadow-dramatic)', overflow: 'hidden' }}>
                <img
                  src={siteData.brandImages.profile}
                  alt="Architectural Studio Consultation & Design Concept — Colour Nest"
                  className="aspect-fill"
                />
              </div>

              <div>
                <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
                  PROPRIETOR &amp; CONSULTANT
                </span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.2rem)', marginBottom: '0.5rem' }}>
                  {siteData.owner.name}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.75rem' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', margin: 0 }}>
                    {siteData.owner.title} • {siteData.name}
                  </p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--ink-secondary)', textTransform: 'uppercase', margin: 0 }}>
                    <strong>Nature of Business:</strong> Painting &amp; Interiors
                  </p>
                </div>

                <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  Leading Colour Nest from our studio in 9th Block Jayanagar, Mr. Abhishek Rao approaches every project as a holistic spatial transformation.
                  Rather than treating painting as simple maintenance or outsourced labor, Abhishek orchestrates the entire dialogue between interior architecture,
                  rich woodwork, tactile wall textures, cove illumination, and curated color palettes.
                </p>

                <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                  Whether executing customized false ceilings with flush magnetic tracks, hand-burnishing Italian Venetian Stucco, restoring heirloom teak with liquid-glass Polycoat, or coating multi-story exterior facades against Bangalore monsoons, client satisfaction and obsessive attention to detail remain our trademark.
                </p>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href={`tel:${siteData.contact.phone}`} className="btn-primary" data-cursor="CALL">
                    <Phone size={15} />
                    <span>Call Abhishek Rao</span>
                  </a>
                  <a href={siteData.urls.whatsappDirect} target="_blank" rel="noreferrer" className="btn-secondary" data-cursor="WHATSAPP" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <WhatsAppIcon size={15} color="#25D366" />
                    <span>Message on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Spatial Transformation Ratio & Holistic Philosophy */}
        <section className="section-scene" style={{ backgroundColor: 'var(--surface-secondary)' }}>
          <div className="container-wide">
            <div style={{ maxWidth: '850px', marginBottom: '3.5rem' }}>
              <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
                SPATIAL BALANCE
              </span>
              <h2 className="heading-display">
                THE MULTI-LAYERED <span className="heading-editorial-italic">SPACE.</span>
              </h2>
              <ArchitecturalLine label="HOW WE COMPOSE AN ENVIRONMENT" coordinates="BALANCE & HARMONY" />
              <p style={{ color: 'var(--ink-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
                Painting is one essential brushstroke within a grander canvas. We engineer environments through a balanced ratio of spatial architecture, tactile materials, and curated atmosphere.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}>
              <div className="arch-card" style={{ padding: '2rem', borderTop: '3px solid var(--accent)' }}>
                <span className="oversized-number" style={{ fontSize: '3rem' }}>45%</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '0.5rem 0' }}>
                  Interiors &amp; Spatial Structure
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
                  Room geometry, false ceiling profiles, drywall partitions, acoustic zoning, and overall spatial proportion form the architectural backbone.
                </p>
              </div>

              <div className="arch-card" style={{ padding: '2rem', borderTop: '3px solid var(--accent)' }}>
                <span className="oversized-number" style={{ fontSize: '3rem' }}>30%</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '0.5rem 0' }}>
                  Materials, Finishes &amp; Decor
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
                  Tactile Italian marble plasters, textured wallpapers, natural wood polish (Polycoat &amp; PU), and decorative elements that invite touch.
                </p>
              </div>

              <div className="arch-card" style={{ padding: '2rem', borderTop: '3px solid var(--accent)' }}>
                <span className="oversized-number" style={{ fontSize: '3rem' }}>25%</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', margin: '0.5rem 0' }}>
                  Colour &amp; Illumination
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', lineHeight: 1.6 }}>
                  Curated tonal palettes, high-opacity matte coatings, calibrated daylight trajectories, and indirect 3000K warm cove light dynamics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Specialities (Source of truth) */}
        <section className="section-scene">
          <div className="container-wide">
            <div style={{ maxWidth: '850px', marginBottom: '4rem' }}>
              <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
                PROVEN PRACTICE
              </span>
              <h2 className="heading-display">
                OUR VERIFIED <span className="heading-editorial-italic">SPECIALITIES.</span>
              </h2>
              <ArchitecturalLine label="VERIFIED SOURCE OF TRUTH VALUES" coordinates="HONEST COMMITMENTS" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--border-medium)' }}>
              {siteData.specialities.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'clamp(50px, 8vw, 100px) clamp(220px, 28vw, 340px) 1fr',
                    gap: '2rem',
                    alignItems: 'baseline',
                    padding: '2rem 0',
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                  className="about-speciality-row"
                >
                  <span className="oversized-number" style={{ fontSize: '2.5rem' }}>{item.number}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Studio Location & Verified Coordinates */}
        <section className="section-scene" style={{ backgroundColor: 'var(--surface-secondary)', borderTop: '1px solid var(--border-subtle)' }}>
          <div className="container-wide">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '3rem', alignItems: 'center' }}>
              <div>
                <span className="meta-tag" style={{ marginBottom: '0.75rem' }}>
                  STUDIO HEADQUARTERS
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', marginBottom: '1rem' }}>
                  Jayanagar, Bangalore.
                </h3>
                <p style={{ fontSize: '1rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  Conveniently situated in 9th Block Jayanagar, serving high-end residential apartments,
                  heritage villas, penthouses, and commercial establishments throughout Bengaluru.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  <div>
                    <strong style={{ color: 'var(--ink-primary)' }}>Address:</strong> {siteData.contact.address.formatted}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--ink-primary)' }}>Phone / WhatsApp:</strong> {siteData.contact.phone}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--ink-primary)' }}>Email:</strong> {siteData.contact.email}
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <a
                    href={siteData.urls.googleMaps}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                    data-cursor="DIRECTIONS"
                  >
                    <MapPin size={15} />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>

              {/* Architectural Card */}
              <div className="arch-card" style={{ padding: '2.5rem', backgroundColor: 'var(--surface-primary)' }}>
                <span className="meta-tag" style={{ marginBottom: '1rem' }}>
                  SPATIAL TRANSFORMATION CONSULTATION
                </span>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '1rem' }}>
                  Ready to Reimagine Your Entire Environment?
                </h4>
                <p style={{ fontSize: '0.92rem', color: 'var(--ink-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                  From single-room feature ceilings and Italian Stucco to full turnkey interior decor, woodwork, and exterior protection,
                  we provide dedicated on-site assessments and live material swatches.
                </p>
                <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <span>Book Initial Spatial Assessment</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </article>

      {/* Responsive helper for about rows */}
      <style>{`
        @media (max-width: 768px) {
          .about-speciality-row {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </>
  );
};
